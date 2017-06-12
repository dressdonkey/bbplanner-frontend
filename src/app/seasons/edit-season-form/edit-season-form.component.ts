import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { SeasonsService } from './../../seasons/seasons.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators, FormGroup } from "@angular/forms";
import { MD_DIALOG_DATA } from '@angular/material';
import { Season } from "./../../interfaces/season";

@Component({
  selector: 'app-edit-season-form',
  templateUrl: './edit-season-form.component.html',
  styleUrls: ['./edit-season-form.component.css']
})
export class EditSeasonFormComponent implements OnInit {
  
  season: Season;
  form: FormGroup;
  key: string;

  constructor(
    public dialogEditRef: MdDialogRef<EditSeasonFormComponent>, 
    public seasonsService: SeasonsService,
    @Inject(MD_DIALOG_DATA) public data: any,
    public fb: FormBuilder
  ) { 
      this.form = this.fb.group({
        name : ['', Validators.required],
        avatar : '',
        users_id : ''
      })
  }

  ngOnInit() {
    this.form.setValue({
      name : this.data.name,
      avatar : this.data.avatar,
      users_id : this.data.users_id
    })

    this.key = this.data.$key;
  }

  onSubmitSeason(season): void {
    
    this.seasonsService.editSeason(this.key, season);
    this.dialogEditRef.close();
  }
}
