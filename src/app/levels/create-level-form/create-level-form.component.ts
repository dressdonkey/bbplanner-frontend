import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MdDialog, MdDialogRef } from "@angular/material";
import { Level } from "./../../interfaces/level";
import { AuthService } from "./../../auth/auth.service";
import { LevelsService } from "./../levels.service";

@Component({
  selector: 'app-create-level-form',
  templateUrl: './create-level-form.component.html',
  styleUrls: ['./create-level-form.component.css']
})
export class CreateLevelFormComponent implements OnInit {
  formlevel: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogCreateRef: MdDialogRef<CreateLevelFormComponent>,
    public levelsService: LevelsService,
    public authService: AuthService
  ) { 
    this.formlevel = this.fb.group({
      name : ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  onSubmitCreateLevel(level: Level){
    //level.users_id = this.authService.getCurrentUserID();
    this.levelsService.addLevel(level);

    this.formlevel.reset({
      name : ''
    });
    this.dialogCreateRef.close();
  }

}
