import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from "./competitions.service";
import { Competition } from "./../interfaces/competition";
import { MdDialog } from "@angular/material";
import { CreateCompetitionFormComponent } from './create-competition-form/create-competition-form.component';
import { EditCompetitionFormComponent } from './edit-competition-form/edit-competition-form.component';
import { EditCompetitionLogoComponent } from './edit-competition-logo/edit-competition-logo.component';
import { DeleteCompetitionComponent } from './delete-competition/delete-competition.component';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar } from '@angular/material';
import 'rxjs/Rx';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})

export class CompetitionsComponent implements OnInit {
  
  displayedColumns = ['avatar', 'name', 'menu'];
  dataSource: CompetitionDataSource | null;
  competitions: Array<any>;

  constructor(
    private dialog: MdDialog, 
    private dialogedit: MdDialog, 
    private dialogdelete: MdDialog, 
    private dialogeditimage: MdDialog,
    private competitionsService: CompetitionsService,
    public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.dataSource = new CompetitionDataSource(this.competitionsService);

    /**
     * 
     */

    this.competitionsService.addedCompetition.subscribe(
      (data) => {
        this.dataSource.addCompetition(data.competition);
        
        this.snackBar.open(data.message, null, {
          duration: 2000,
        });
      },
      error => console.log('Problem Creating Competition')
    );

    /**
     * 
     */

    this.competitionsService.updatedCompetition.subscribe(
      (data) => {
        
        this.snackBar.open(data.message, null, {
          duration: 2000,
        });
        
        this.dataSource.updateCompetition(data.competition);
      },
      error => console.log('Problem Updating Competition')
      
    );

    /**
     * 
     */

    this.competitionsService.deletedCompetition.subscribe(
      (data) => {
        
        this.snackBar.open(data.message, null, {
          duration: 2000,
        });

        this.dataSource.deleteCompetition(data.competition);
      },
      error => console.log('Problem Deleting Competition')
      
    );
  }

  /**
   *  Open Dialog to create a new competition
   */

  openCreateCompetitionDialog(){
    this.dialog.open(CreateCompetitionFormComponent, 
    {
      width: '500px'
    })
  }

  /**
   *  Open Dialog to edit a new competition
   */

  openEditCompetitionDialog(competition: Competition){
    this.dialog.open(EditCompetitionFormComponent, 
    {
      width: '500px',
      data : competition
    })
  }

  /**
   * Open Dialog to edit or insert player foto
   * @param player players data in json
   */
  
  private openEditCompetitionLogoDialog(competition: Competition) {
    
    let dialogEditImageRef = this.dialogeditimage.open(EditCompetitionLogoComponent, {
      width: '500px',
      data: competition
    });

  }

  /**
   * Open Dialog to delete player
   * @param player players data in json
   */
  
  private openDeleteCompetitionDialog(competition: Competition) {
    
    let dialogDeleteRef = this.dialogdelete.open(DeleteCompetitionComponent, {
      width: '500px',
      data: competition
    });

  }

}

export class CompetitionDataSource extends DataSource<any> {
  competitions: Array<any>;
  dataChange: BehaviorSubject<Competition[]> = new BehaviorSubject<Competition[]>([]);

  constructor(private competitionsService: CompetitionsService) {
      super();
  }

  get data(): Competition[] {
    return this.dataChange.value; 
  }

  ngOnInit() {
    
  }

  connect(): Observable<Competition[]> {
    this.competitionsService.getAllCompetitions()
      .subscribe(data => {
        
        this.competitions = data; 

        for (let competition of this.competitions) {
            this.addCompetition(competition); 
        }

      },err => {
        console.log('ERROR');
      }
    );
    
    return this.dataChange;
  }

  /**
   * 
   * @param competition 
   */

  addCompetition(competition){
    const copiedData = this.data.slice();
    
    copiedData.push(competition);

    this.dataChange.next(copiedData);
  }

  /**
   * 
   * @param competition 
   */

  updateCompetition(competition){
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (competitionEl: Competition) => {
        return competitionEl.id == competition.id;
      }
    );

    copiedData[position] = competition;
    this.dataChange.next(copiedData);
  }

  /**
   * 
   * @param competition 
   */

  deleteCompetition(competition){
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (competitionEl: Competition) => {
        return competitionEl.id == competition.id;
      }
    );

    copiedData.splice(position, 1);

    this.dataChange.next(copiedData);

  }

  disconnect() {}
}
