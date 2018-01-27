import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LevelsService } from './../../levels/levels.service';
import { Level } from "./../../interfaces/level";

@Component({
  selector: 'app-delete-level',
  templateUrl: './delete-level.component.html',
  styleUrls: ['./delete-level.component.css']
})
export class DeleteLevelComponent implements OnInit {
  level: Level;

  constructor(
    public dialogRef: MatDialogRef<DeleteLevelComponent>, 
    private levelsService: LevelsService,
    @Inject(MAT_DIALOG_DATA) public data:any
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
