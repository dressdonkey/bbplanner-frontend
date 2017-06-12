import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { MdDialogRef } from "@angular/material";
import { CompetitionsService } from "./../competitions.service";
import { AuthService } from "./../../auth/auth.service";
import { Competition } from "./../../interfaces/competition";

@Component({
  selector: 'app-create-competition-form',
  templateUrl: './create-competition-form.component.html',
  styleUrls: ['./create-competition-form.component.css']
})
export class CreateCompetitionFormComponent implements OnInit {
  formcompetition: FormGroup;
  competition: Competition;

  constructor(
    public dialogCreateRef: MdDialogRef<CreateCompetitionFormComponent>, 
    public competitionsService: CompetitionsService,
    public fb: FormBuilder,
    public authService: AuthService
  ) { 

    this.formcompetition = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(255)])]
    });
    
  }

  ngOnInit() {
  }

  onSubmitCompetition(competition): void {
    competition.avatar = 'assets/images/avatar-default.png'; //@TODO - Find a default image
    competition.users_id = this.authService.getCurrentUserID();
    this.competitionsService.addCompetition(competition);
    this.formcompetition.reset({
      name : ''
    });
    this.dialogCreateRef.close();
  }
}
