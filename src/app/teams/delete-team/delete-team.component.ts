import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TeamsService } from './../../teams/teams.service';
import {  } from '@angular/material';
import { Team } from "./../../interfaces/team";

@Component({
  selector: 'app-delete-team',
  templateUrl: './delete-team.component.html',
  styleUrls: ['./delete-team.component.css']
})
export class DeleteTeamComponent implements OnInit {
  team: Team;

  constructor(
    public dialogRef: MatDialogRef<DeleteTeamComponent>, 
    private teamService: TeamsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.team = this.data;
           
    }

  ngOnInit() {
  }

  /**
   * Delete Team
   * @param id team id
   */

  onDelete(id: number){

    this.teamService.deleteTeam(id)
      .subscribe((data) => {
          
          console.log('Team Deleted');          

        },
        error => console.log('Problems deleting Team!')  
      );

    this.dialogRef.close();

  }
}
