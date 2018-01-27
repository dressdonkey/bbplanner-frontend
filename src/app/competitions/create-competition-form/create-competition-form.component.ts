import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
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
    public dialogCreateRef: MatDialogRef<CreateCompetitionFormComponent>, 
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
    competition.user_id = 1
    
    this.competitionsService.addCompetition(competition)
      .subscribe();

    this.formcompetition.reset({
      name : ''
    });

    this.dialogCreateRef.close();
  }
}
