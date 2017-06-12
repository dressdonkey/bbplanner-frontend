import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { CompetitionsService } from "./../competitions.service";
import { AuthService } from "./../../auth/auth.service";
import { Competition } from "./../../interfaces/competition";

@Component({
  selector: 'app-edit-competition-form',
  templateUrl: './edit-competition-form.component.html',
  styleUrls: ['./edit-competition-form.component.css']
})
export class EditCompetitionFormComponent implements OnInit {
  competition: Competition;
  formcompetition: FormGroup;
  key: string;

  constructor(
    public dialogEditRef: MdDialogRef<EditCompetitionFormComponent>, 
    public competitionsService: CompetitionsService,
    @Inject(MD_DIALOG_DATA) public data: any,
    public fb: FormBuilder
  ) { 
      this.formcompetition = this.fb.group({
        name : ['', Validators.required],
        avatar : '',
        users_id : ''
      })
  }

  ngOnInit() {
    this.formcompetition.setValue({
      name : this.data.name,
      avatar : this.data.avatar,
      users_id : this.data.users_id
    })

    this.key = this.data.$key;
  }

  onSubmitCompetition(competition): void {
    
    this.competitionsService.editCompetition(this.key, competition);
    this.dialogEditRef.close();
  }

}
