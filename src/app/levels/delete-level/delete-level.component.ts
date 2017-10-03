import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { LevelsService } from './../../levels/levels.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { Level } from "./../../interfaces/level";

@Component({
  selector: 'app-delete-level',
  templateUrl: './delete-level.component.html',
  styleUrls: ['./delete-level.component.css']
})
export class DeleteLevelComponent implements OnInit {
  level: Level;

  constructor(
    public dialogRef: MdDialogRef<DeleteLevelComponent>, 
    private levelsService: LevelsService,
    @Inject(MD_DIALOG_DATA) public data:any
  ) { 
      this.level = this.data;
  }

  ngOnInit() {
  }

  /**
   * Delete Level
   * @param id level id
   */

  onDelete(id: number){
    this.levelsService.deleteLevel(id)
      .subscribe((data) => {
          
          console.log('Level Deleted');          

        },
        error => console.log('Problems deleting Level!')  
      );

    this.dialogRef.close();
  }

}
