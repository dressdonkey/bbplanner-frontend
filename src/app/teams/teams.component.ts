import { Component, OnInit } from '@angular/core';
import { TeamsService } from "./teams.service";
import { Team } from "./../interfaces/team";
import { MdDialog } from "@angular/material";
import { CreateTeamFormComponent } from './create-team-form/create-team-form.component';
import { EditTeamFormComponent } from './edit-team-form/edit-team-form.component';
import { EditTeamLogoComponent } from './edit-team-logo/edit-team-logo.component';
import { DeleteTeamComponent } from './delete-team/delete-team.component';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar } from '@angular/material';
import 'rxjs/Rx';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})

export class TeamsComponent implements OnInit {
  
  displayedColumns = ['logo', 'name', 'menu'];
  dataSource: TeamDataSource | null;
  teams: Array<any>;

  constructor(
    private dialog: MdDialog, 
    private dialogedit: MdDialog, 
    private dialogdelete: MdDialog, 
    private dialogeditimage: MdDialog,
    private teamsService: TeamsService,
    public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.dataSource = new TeamDataSource(this.teamsService);

    /**
     * 
     */

    this.teamsService.addedTeam.subscribe(
      (data) => {
        this.dataSource.addTeam(data.team);
        
        this.snackBar.open(data.message, null, {
          duration: 2000,
        });
      },
      error => console.log('Problem Creating Team')
    );

    /**
     * 
     */

    this.teamsService.updatedTeam.subscribe(
      (data) => {
        
        this.snackBar.open(data.message, null, {
          duration: 2000,
        });
        
        this.dataSource.updateTeam(data.team);
      },
      error => console.log('Problem Updating Team')
      
    );

    /**
     * 
     */

    this.teamsService.deletedTeam.subscribe(
      (data) => {
        
        this.snackBar.open(data.message, null, {
          duration: 2000,
        });

        this.dataSource.deleteTeam(data.team);
      },
      error => console.log('Problem Deleting Team')
      
    );
  }

  /**
   *  Open Dialog to create a new team
   */

  openCreateTeamDialog(){
    this.dialog.open(CreateTeamFormComponent, 
    {
      width: '500px'
    })
  }

  /**
   *  Open Dialog to edit a new team
   */

  openEditTeamDialog(team: Team){
    this.dialog.open(EditTeamFormComponent, 
    {
      width: '500px',
      data : team
    })
  }

  /**
   * Open Dialog to edit or insert team foto
   * @param team teams data in json
   */
  
  private openEditTeamLogoDialog(team: Team) {
    
    let dialogEditImageRef = this.dialogeditimage.open(EditTeamLogoComponent, {
      width: '500px',
      data: team
    });

  }

  /**
   * Open Dialog to delete team
   * @param team teams data in json
   */
  
  private openDeleteTeamDialog(team: Team) {
    
    let dialogDeleteRef = this.dialogdelete.open(DeleteTeamComponent, {
      width: '500px',
      data: team
    });

  }

}

export class TeamDataSource extends DataSource<any> {
  teams: Array<any>;
  dataChange: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);

  constructor(private teamsService: TeamsService) {
      super();
  }

  get data(): Team[] {
    return this.dataChange.value; 
  }

  ngOnInit() {
    
  }

  connect(): Observable<Team[]> {
    this.teamsService.getAllTeams()
      .subscribe(data => {
        
        this.teams = data; 

        for (let team of this.teams) {
            this.addTeam(team); 
        }

      },err => {
        console.log('ERROR');
      }
    );
    
    return this.dataChange;
  }

  /**
   * 
   * @param team 
   */

  addTeam(team){
    const copiedData = this.data.slice();
    
    copiedData.push(team);

    this.dataChange.next(copiedData);
  }

  /**
   * 
   * @param team 
   */

  updateTeam(team){
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (teamEl: Team) => {
        return teamEl.id == team.id;
      }
    );

    copiedData[position] = team;
    this.dataChange.next(copiedData);
  }

  /**
   * 
   * @param team 
   */

  deleteTeam(team){
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (teamEl: Team) => {
        return teamEl.id == team.id;
      }
    );

    copiedData.splice(position, 1);

    this.dataChange.next(copiedData);

  }

  disconnect() {}
}
