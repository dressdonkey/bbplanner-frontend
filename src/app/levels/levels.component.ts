import { Component, OnInit } from '@angular/core';
import { MdDialog } from "@angular/material";
import { LevelsService } from "./levels.service";
import { Level } from "./../interfaces/level";
import { CreateLevelFormComponent } from './create-level-form/create-level-form.component';
import { EditLevelFormComponent } from './edit-level-form/edit-level-form.component';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements OnInit {
  levels: Array<Level>;

  constructor(
    public dialogCreate: MdDialog,
    public dialogEdit: MdDialog,
    public levelsSerice: LevelsService
  ) { 
    this.levelsSerice.getLevels().subscribe(data => {
      this.levels = data;
    });
  }

  ngOnInit() {
  }

  openDialogCreateLevel(){
    let dialogCreateRef = this.dialogCreate.open(CreateLevelFormComponent, {
      width: '500px'
    });
  }

  openDialogEditLevel(level){
    let dialogEditRef = this.dialogEdit.open(EditLevelFormComponent, {
      width: '500px',
      data: level
    });
  }

}
