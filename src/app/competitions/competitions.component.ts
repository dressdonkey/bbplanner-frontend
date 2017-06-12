import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from "./competitions.service";
import { Competition } from "./../interfaces/competition";
import { MdDialog } from "@angular/material";
import { CreateCompetitionFormComponent } from './create-competition-form/create-competition-form.component';
import { EditCompetitionFormComponent } from './edit-competition-form/edit-competition-form.component';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  competitions: Array<any>;

  constructor(
    public competitionsService: CompetitionsService,
    public dialogCreate: MdDialog,
    public dialogEdit: MdDialog
  ) { 
    this.competitionsService.getCompetitions().subscribe(data => {
      this.competitions = data;
    });
  }

  ngOnInit() {
  }

  openDialogCreateCompetitionForm(){
    let dialogCreateRef = this.dialogCreate.open(CreateCompetitionFormComponent, {
      width: '500px'
    });
  }

  openDialogEditCompetitionForm(key, competition: Competition){
    let dialogEditRef = this.dialogEdit.open(EditCompetitionFormComponent, {
      width: '500px',
      data: competition
    });
  }

}
