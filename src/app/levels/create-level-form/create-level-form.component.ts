import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { MdDialogRef } from "@angular/material";
import { LevelsService } from "./../levels.service";
import { AuthService } from "./../../auth/auth.service";
import { Level } from "./../../interfaces/level";

@Component({
  selector: 'app-create-level-form',
  templateUrl: './create-level-form.component.html',
  styleUrls: ['./create-level-form.component.css']
})

export class CreateLevelFormComponent implements OnInit {
  formlevel: FormGroup;
  Level: Level;

  constructor(
    public dialogCreateRef: MdDialogRef<CreateLevelFormComponent>, 
    public levelsService: LevelsService,
    public fb: FormBuilder,
    public authService: AuthService
  ) { 

    this.formlevel = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(255)])]
    });
    
  }

  ngOnInit() {
  }

  onSubmitCreateLevel(level): void {
    level.user_id = 1
    
    this.levelsService.addLevel(level)
      .subscribe();

    this.formlevel.reset({
      name : ''
    });

    this.dialogCreateRef.close();
  }
}
