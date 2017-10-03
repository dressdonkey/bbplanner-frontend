import { Component, OnInit } from '@angular/core';
import { LevelsService } from "./levels.service";
import { Level } from "./../interfaces/level";
import { MdDialog } from "@angular/material";
import { CreateLevelFormComponent } from './create-level-form/create-level-form.component';
import { EditLevelFormComponent } from './edit-level-form/edit-level-form.component';
import { DeleteLevelComponent } from './delete-level/delete-level.component';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar } from '@angular/material';
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

  constructor(
    private dialog: MdDialog, 
    private dialogedit: MdDialog, 
    private dialogdelete: MdDialog, 
    private dialogeditimage: MdDialog,
    private levelsService: LevelsService,
    public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.dataSource = new LevelDataSource(this.levelsService);

    /**
     * 
     */

    this.levelsService.addedLevel.subscribe(
      (data) => {
        this.dataSource.addLevel(data.level);
        
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
        
        this.dataSource.updateLevel(data.level);
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

        this.dataSource.deleteLevel(data.level);
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

export class LevelDataSource extends DataSource<any> {
  levels: Array<any>;
  dataChange: BehaviorSubject<Level[]> = new BehaviorSubject<Level[]>([]);

  constructor(private levelsService: LevelsService) {
      super();
  }

  get data(): Level[] {
    return this.dataChange.value; 
  }

  ngOnInit() {
    
  }

  connect(): Observable<Level[]> {
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
    
    return this.dataChange;
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

  disconnect() {}
}
