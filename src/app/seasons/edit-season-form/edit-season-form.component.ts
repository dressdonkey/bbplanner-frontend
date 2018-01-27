import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { SeasonsService } from "./../../seasons/seasons.service";
import { TeamsService } from "./../../teams/teams.service";
import { LevelsService } from "./../../levels/levels.service";
import { GenderService } from "./../../gender/gender.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Season } from "./../../interfaces/season";

@Component({
  selector: 'app-edit-season-form',
  templateUrl: './edit-season-form.component.html',
  styleUrls: ['./edit-season-form.component.css']
})
export class EditSeasonFormComponent implements OnInit {
  
  formseason: FormGroup;
  teams: Array<any>;
  levels: Array<any>;
  genders: Array<any>;
  error: string;
  seasonId: number;

  constructor(
    public dialogEditRef: MatDialogRef<EditSeasonFormComponent>,
    public teamsService: TeamsService,
    public seasonsService: SeasonsService,
    public levelsService: LevelsService,
    public genderService: GenderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb:FormBuilder
  ) { 
      this.formseason = this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
        team_id : ['', Validators.required ],
        gender_id : ['', Validators.required ],
        level_id : ['', Validators.required ],
        observations : [''],
        user_id : ''
      });
      
  }

  ngOnInit() {
    this.teamsService.getAllTeams()
      .subscribe( 
        data => this.teams = data,
        error => this.error = error.statusText
      );
    
    this.levelsService.getAllLevels()
      .subscribe( 
        data => this.levels = data,
        error => this.error = error.statusText
      );

    this.genderService.getAllGenders()
      .subscribe(data => {
        
        this.genders = data; 

      },err => {
        console.log('ERROR');
      }
    );

    this.formseason.setValue({
      name : this.data.name,
      gender_id : this.data.gender_id,
      team_id : this.data.team_id,
      level_id : this.data.level_id,
      user_id: this.data.user_id,
      observations : this.data.observations
    })

    this.seasonId = this.data.id;
  }

  onSubmitEditTeam(season): void {
    
    this.seasonsService.updateSeason(this.seasonId, season)
      .subscribe();
    this.dialogEditRef.close();

  }
}
