import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { SeasonsService } from './../../seasons/seasons.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators, FormGroup } from "@angular/forms";
import { Season } from "./../../interfaces/season";
import { AuthService } from "./../../auth/auth.service";

@Component({
  selector: 'app-create-season-form',
  templateUrl: './create-season-form.component.html',
  styleUrls: ['./create-season-form.component.css']
})
export class CreateSeasonFormComponent implements OnInit {
  form: FormGroup;
  season: Season;

  constructor(
    public dialogRef: MdDialogRef<CreateSeasonFormComponent>, 
    public seasonsService: SeasonsService,
    public fb: FormBuilder,
    public authService: AuthService
  ) { 

    this.form = this.fb.group({
      name: ['', Validators.required]
    });
    
  }

  ngOnInit() {
  }

  onSubmitSeason(season): void {
    season.avatar = 'assets/images/avatar-2.png'; //TODO - Find a default imge
    season.users_id = this.authService.getCurrentUserID();
    this.seasonsService.addSeason(season);
    this.form.reset({
      name : ''
    });
    this.dialogRef.close();
  }

}


