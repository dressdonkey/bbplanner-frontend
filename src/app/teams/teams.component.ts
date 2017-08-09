import { Component, OnInit } from '@angular/core';
import { TeamsService } from "./teams.service";
import { MdDialog } from "@angular/material";
import { Team } from "./../interfaces/team";
import { CreateTeamFormComponent } from "./create-team-form/create-team-form.component";
import { EditTeamFormComponent } from "./edit-team-form/edit-team-form.component";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Array<any>;
  error: string;

  constructor(
    public teamsService: TeamsService,
    public dialogCreate: MdDialog,
    public dialogEdit: MdDialog
  ) { 
    this.teamsService.getTeams()
      .subscribe( 
        data => this.teams = data,
        error => this.error = error.statusText
       );
  }

  ngOnInit() {
    
  }

  openCreateTeamFormDialog(){
    let dialogRefCreate = this.dialogCreate.open(CreateTeamFormComponent, {
      width: "500px"
    });
  }

  openEditTeamFormDialog(team: Team){
    let dialogRefEdit = this.dialogEdit.open(EditTeamFormComponent, {
      width: "500px",
      data : team
    });
  }

}
