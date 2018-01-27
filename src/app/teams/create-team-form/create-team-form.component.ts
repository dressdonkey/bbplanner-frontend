import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { AssociationsService } from "./../../associations/associations.service";
import { TeamsService } from "./../../teams/teams.service";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "./../../auth/auth.service";
import { Team } from "./../../interfaces/team";
import { Association } from "./../../interfaces/association";

@Component({
  selector: 'app-create-team-form',
  templateUrl: './create-team-form.component.html',
  styleUrls: ['./create-team-form.component.css']
})


export class CreateTeamFormComponent implements OnInit {
  formteam: FormGroup;
  team: Team;
  showMore: Boolean = false;
  showMoreText: string = "Show More";
  associations: Array<any>;

  constructor(
    public associationsService: AssociationsService,
    public dialogRef: MatDialogRef<CreateTeamFormComponent>, 
    public teamsService: TeamsService,
    public fb: FormBuilder,
    public authService: AuthService
  ) {  
      this.formteam = this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
        association_id : ['', Validators.required ],
        email: ['', Validators.compose([Validators.maxLength(255), Validators.email])],
        website : ['', Validators.maxLength(255)],
        facebook : ['', Validators.maxLength(255)],
        twitter : ['', Validators.maxLength(255)],
        googleplus : ['', Validators.maxLength(255)],
        address : ['', Validators.maxLength(255)],
        arena : ['', Validators.maxLength(255)]
      });

      this.associationsService.getAllAssociations()
      .subscribe(data => {
        
        this.associations = data; 

      },err => {
        console.log('ERROR');
      }
    );
      
  }

  ngOnInit() {

  }

  onSubmitCreateTeam(team): void {

    //player.avatar = 'assets/images/avatar-2.png'; //@TODO - Find a default image
    team.user_id = 1 // @TODO - modify to dynamic user - logged in user

    this.teamsService.addTeam(team)
      .subscribe(
        //data => this.players = data,
        //error => this.error = error.statusText
      );
    
    this.formteam.reset({
      name : '',
      email : ''
    });

    this.dialogRef.close();
    
  }

  toggleShowMore(){
    this.showMore = !this.showMore;

    this.showMoreText = (!this.showMore) ? 'Show More' : 'Show Less';
  }

}
