import { Component, OnInit } from '@angular/core';
import { SeasonsService } from "./seasons.service";
import { Season } from "./../interfaces/season";
import { MatDialog } from "@angular/material/dialog";
import { CreateSeasonFormComponent } from './create-season-form/create-season-form.component';
import { EditSeasonFormComponent } from './edit-season-form/edit-season-form.component';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'rxjs/Rx';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})

export class SeasonsComponent implements OnInit {
  
  displayedColumns = ['name', 'team', 'agelevel', 'gender', 'menu'];
  dataSource: SeasonDataSource | null;
  seasons: Array<any>;
  seasonsDatabase = new SeasonsDatabase(this.seasonsService);

  constructor(
    private dialog: MatDialog, 
    private dialogedit: MatDialog, 
    private dialogdelete: MatDialog, 
    private dialogeditimage: MatDialog,
    private seasonsService: SeasonsService,
    public snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.dataSource = new SeasonDataSource(this.seasonsDatabase);

    /**
     * 
     */

    this.seasonsService.addedSeason.subscribe(
      (data) => {
        this.seasonsDatabase.addSeason(data.season);
        
        this.snackBar.open(data.message, null, {
          duration: 2000,
        });
      },
      error => console.log('Problem Creating Season')
    );

    /**
     * 
     */

    this.seasonsService.updatedSeason.subscribe(
      (data) => {
        
        this.snackBar.open(data.message, null, {
          duration: 2000,
        });
        
        this.seasonsDatabase.updateSeason(data.season);
      },
      error => console.log('Problem Updating Season')
      
    );

  }

  /**
   *  Open Dialog to create a new Season
   */

  openCreateSeasonDialog(){
    this.dialog.open(CreateSeasonFormComponent, 
    {
      width: '500px'
    })
  }

  /**
   *  Open Dialog to edit a new Season
   */

  openEditSeasonDialog(season: Season){
    this.dialog.open(EditSeasonFormComponent, 
    {
      width: '500px',
      data : season
    })
  }
  
}

export class SeasonsDatabase{
  seasons: Array<any>;
  dataChange: BehaviorSubject<Season[]> = new BehaviorSubject<Season[]>([]);
  
  get data(): Season[] {
    return this.dataChange.value; 
  }

  constructor(
    private seasonsService: SeasonsService
  ){

    this.seasonsService.getAllSeasons()
      .subscribe(data => {
        
        this.seasons = data; 

        for (let season of this.seasons) {
            this.addSeason(season); 
        }

      },err => {
        console.log('ERROR');
      }
    );

  }


  /**
   * 
   * @param season 
   */

  addSeason(season){
    const copiedData = this.data.slice();
    
    copiedData.push(season);

    this.dataChange.next(copiedData);
  }

  /**
   * 
   * @param season 
   */

  updateSeason(season){
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (seasonEl: Season) => {
        return seasonEl.id == season.id;
      }
    );

    copiedData[position] = season;
    this.dataChange.next(copiedData);
  }

  /**
   * 
   * @param season 
   */

  deleteSeason(season){
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (seasonEl: Season) => {
        return seasonEl.id == season.id;
      }
    );

    copiedData.splice(position, 1);

    this.dataChange.next(copiedData);

  }
}

export class SeasonDataSource extends DataSource<any> {
  

  constructor(
    private _seasonsDatabase: SeasonsDatabase
  ) {
      super();
  }

  ngOnInit() {
    
  }

  connect(): Observable<Season[]> {
    
    return this._seasonsDatabase.dataChange;

  }

  disconnect() {}
}
