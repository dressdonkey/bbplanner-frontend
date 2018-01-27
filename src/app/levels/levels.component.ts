import { Component, OnInit } from '@angular/core';
import { LevelsService } from "./levels.service";
import { Level } from "./../interfaces/level";
import { MatDialog } from "@angular/material/dialog";
import { CreateLevelFormComponent } from './create-level-form/create-level-form.component';
import { EditLevelFormComponent } from './edit-level-form/edit-level-form.component';
import { DeleteLevelComponent } from './delete-level/delete-level.component';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'rxjs/Rx';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})

export class LevelsComponent implements OnInit {
  
  displayedColumns = ['name', 'menu'];
  dataSource: LevelDataSource | null;
  levels: Array<any>;
  levelsDatabase = new LevelsDatabase(this.levelsService);

  constructor(
    private dialog: MatDialog, 
    private dialogedit: MatDialog, 
    private dialogdelete: MatDialog, 
    private dialogeditimage: MatDialog,
    private levelsService: LevelsService,
    public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.dataSource = new LevelDataSource(this.levelsDatabase);

    /**
     * 
     */

    this.levelsService.addedLevel.subscribe(
      (data) => {
        this.levelsDatabase.addLevel(data.level);
        
        this.snackBar.open(data.message, null, {
          duration: 2000,
        });
      },
      error => console.log('Problem Creating Level')
    );

    /**
     * 
     */

    this.levelsService.updatedLevel.subscribe(
      (data) => {
        
        this.snackBar.open(data.message, null, {
          duration: 2000,
        });
        
        this.levelsDatabase.updateLevel(data.level);
      },
      error => console.log('Problem Updating Level')
      
    );

    /**
     * 
     */

    this.levelsService.deletedLevel.subscribe(
      (data) => {
        
        this.snackBar.open(data.message, null, {
          duration: 2000,
        });

        this.levelsDatabase.deleteLevel(data.level);
      },
      error => console.log('Problem Deleting Level')
      
    );
  }

  /**
   *  Open Dialog to create a new Level
   */

  openCreateLevelDialog(){
    this.dialog.open(CreateLevelFormComponent, 
    {
      width: '500px'
    })
  }

  /**
   *  Open Dialog to edit a new Level
   */

  openEditLevelDialog(level: Level){
    this.dialog.open(EditLevelFormComponent, 
    {
      width: '500px',
      data : level
    })
  }

  /**
   * Open Dialog to delete player
   * @param player players data in json
   */
  
  private openDeleteLevelDialog(level: Level) {
    
    let dialogDeleteRef = this.dialogdelete.open(DeleteLevelComponent, {
      width: '500px',
      data: level
    });

  }

}

export class LevelsDatabase{
  levels: Array<any>;
  dataChange:BehaviorSubject<Level[]> = new BehaviorSubject<Level[]>([]);

  constructor(
    private levelsService: LevelsService
  ){

    this.levelsService.getAllLevels()
      .subscribe(data => {
        
        this.levels = data; 

        for (let level of this.levels) {
            this.addLevel(level); 
        }

      },err => {
        console.log('ERROR');
      }
    );

  }

  get data(): Level[] {
    return this.dataChange.value; 
  }

  /**
   * 
   * @param level 
   */

  addLevel(level){
    const copiedData = this.data.slice();
    
    copiedData.push(level);

    this.dataChange.next(copiedData);
  }

  /**
   * 
   * @param competition 
   */

  updateLevel(level){
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (levelEl: Level) => {
        return levelEl.id == level.id;
      }
    );

    copiedData[position] = level;
    this.dataChange.next(copiedData);
  }

  /**
   * 
   * @param competition 
   */

  deleteLevel(level){
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (levelEl: Level) => {
        return levelEl.id == level.id;
      }
    );

    copiedData.splice(position, 1);

    this.dataChange.next(copiedData);

  }
}

export class LevelDataSource extends DataSource<any> {

  constructor(private _levelsDatabase: LevelsDatabase) {
      super();
  }

  ngOnInit() {
    
  }

  connect(): Observable<Level[]> {
    
    return this._levelsDatabase.dataChange;

  }

  disconnect() {}
}
