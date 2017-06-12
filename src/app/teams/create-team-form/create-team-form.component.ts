import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { AssociationsService } from "./../../associations/associations.service";
import { TeamsService } from "./../../teams/teams.service";
import { MdDialogRef } from "@angular/material";

@Component({
  selector: 'app-create-team-form',
  templateUrl: './create-team-form.component.html',
  styleUrls: ['./create-team-form.component.css']
})
export class CreateTeamFormComponent implements OnInit {
  formteam: FormGroup;
  associations: Array<any>;
  error: string;
  showMore: Boolean = false;
  showMoreText: string = "Show More";

  constructor(
    public fb:FormBuilder,
    public associationsService: AssociationsService, 
    private dialogRef: MdDialogRef<CreateTeamFormComponent>,
    public teamsService: TeamsService
  ) { 
      this.formteam = this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
        associations_id : ['', Validators.required ],
        email: ['', Validators.compose([Validators.maxLength(255), Validators.email])],
        website : ['', Validators.maxLength(255)],
        facebook : ['', Validators.maxLength(255)],
        twitter : ['', Validators.maxLength(255)],
        googleplus : ['', Validators.maxLength(255)],
        address : ['', Validators.maxLength(255)],
        arena : ['', Validators.maxLength(255)]
      });
      
      this.associationsService.getAssociations()
        .subscribe( 
          data => this.associations = data,
          error => this.error = error.statusText
        );
  }

  ngOnInit() {
    
  }

  onSubmitCreateTeam(data){
    this.teamsService.addTeam(data);
    this.formteam.reset();
    this.dialogRef.close();
  }

  toggleShowMore(){
    this.showMore = !this.showMore;

    this.showMoreText = (!this.showMore) ? 'Show More' : 'Show Less';
  }

}