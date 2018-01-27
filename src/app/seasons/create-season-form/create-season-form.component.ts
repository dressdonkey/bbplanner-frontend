import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { SeasonsService } from "./../../seasons/seasons.service";
import { TeamsService } from "./../../teams/teams.service";
import { LevelsService } from "./../../levels/levels.service";
import { GenderService } from "./../../gender/gender.service";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "./../../auth/auth.service";
import { Season } from "./../../interfaces/season";
import { Association } from "./../../interfaces/association";

@Component({
  selector: 'app-create-season-form',
  templateUrl: './create-season-form.component.html',
  styleUrls: ['./create-season-form.component.css']
})
export class CreateSeasonFormComponent implements OnInit {
  formseason: FormGroup;
  season: Season;
  teams: Array<any>;
  levels: Array<any>;
  genders: Array<any>;

  constructor(
    public dialogRef: MatDialogRef<CreateSeasonFormComponent>, 
    public seasonsService: SeasonsService,
    public teamsService: TeamsService,
    public levelsService: LevelsService,
    public genderService: GenderService,
    public fb: FormBuilder,
    public authService: AuthService
  ) {  
      this.formseason = this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
        team_id : ['', Validators.required ],
        gender_id : ['', Validators.required ],
        level_id : ['', Validators.required ],
        observations : ['']
      });

      this.teamsService.getAllTeams()
        .subscribe(data => {
          
          this.teams = data; 

        },err => {
          console.log('ERROR');
        }
      );

      this.levelsService.getAllLevels()
        .subscribe(data => {
          
          this.levels = data; 

        },err => {
          console.log('ERROR');
        }
      );

      this.genderService.getAllGenders()
        .subscribe(data => {
          
          this.genders = data; 

        },err => {
          console.log('ERROR');
        }
      );
      
  }

  ngOnInit() {
  }

  onSubmitCreateSeason(season): void {

    //player.avatar = 'assets/images/avatar-2.png'; //@TODO - Find a default image
    season.user_id = 1 // @TODO - modify to dynamic user - logged in user

    this.seasonsService.addSeason(season)
      .subscribe(
        //data => this.players = data,
        //error => this.error = error.statusText
      );
    
    this.formseason.reset({
      name : '',
      email : ''
    });

    this.dialogRef.close();
    
  }

}


