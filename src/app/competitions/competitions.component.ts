import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from "./competitions.service";
import { Competition } from "./../interfaces/competition";
import { MatDialog } from "@angular/material/dialog";
import { CreateCompetitionFormComponent } from './create-competition-form/create-competition-form.component';
import { EditCompetitionFormComponent } from './edit-competition-form/edit-competition-form.component';
import { EditCompetitionLogoComponent } from './edit-competition-logo/edit-competition-logo.component';
import { DeleteCompetitionComponent } from './delete-competition/delete-competition.component';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  competitionDatabase = new CompetitionsDatabase(this.competitionsService);
  dataSource: CompetitionsDataSource | null;
  competitions: Array<any>;

  constructor(
    private dialog: MatDialog, 
    private dialogedit: MatDialog, 
    private dialogdelete: MatDialog, 
    private dialogeditimage: MatDialog,
    private competitionsService: CompetitionsService,
    public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.dataSource = new CompetitionsDataSource(this.competitionDatabase);

    /**
     * 
     */

    this.competitionsService.addedCompetition.subscribe(
      (data) => {
        this.competitionDatabase.addCompetition(data.competition);
        
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
        
        this.competitionDatabase.updateCompetition(data.competition);
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

        this.competitionDatabase.deleteCompetition(data.competition);
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

export class CompetitionsDatabase{
  dataChange: BehaviorSubject<Competition[]> = new BehaviorSubject<Competition[]>([]);
  competitions: Array<any>;

  get data(): Competition[] {
    return this.dataChange.value; 
  }

  constructor(private competitionsService:CompetitionsService){

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

}

export class CompetitionsDataSource extends DataSource<any> {

  constructor(private _competitionsDatabase: CompetitionsDatabase) {
      super();
  }


  ngOnInit() {
    
  }

  connect(): Observable<Competition[]> {
    
    return this._competitionsDatabase.dataChange;

  }

  disconnect() {}
  
}
