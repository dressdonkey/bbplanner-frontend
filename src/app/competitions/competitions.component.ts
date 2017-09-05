import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from "./competitions.service";
import { Competition } from "./../interfaces/competition";
import { MdDialog } from "@angular/material";
import { CreateCompetitionFormComponent } from './create-competition-form/create-competition-form.component';
import { EditCompetitionFormComponent } from './edit-competition-form/edit-competition-form.component';
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

  addCompetition(competition){
    const copiedData = this.data.slice();
    
    copiedData.push(competition);

    this.dataChange.next(copiedData);
  }

  disconnect() {}
}
