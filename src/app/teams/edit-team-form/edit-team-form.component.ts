import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { AssociationsService } from "./../../associations/associations.service";
import { TeamsService } from "./../../teams/teams.service";
import { MdDialogRef } from "@angular/material";
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-team-form',
  templateUrl: './edit-team-form.component.html',
  styleUrls: ['./edit-team-form.component.css']
})
export class EditTeamFormComponent implements OnInit {
  formteam: FormGroup;
  associations: Array<any>;
  error: string;
  showMore: Boolean = false;
  showMoreText: string = "Show More";
  key: string;

  constructor(
    public dialogEditRef: MdDialogRef<EditTeamFormComponent>,
    public associationsService: AssociationsService,
    public teamsService: TeamsService,
    @Inject(MD_DIALOG_DATA) public data: any,
    public fb:FormBuilder
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
        arena : ['', Validators.maxLength(255)],
        logo : ['', Validators.maxLength(255)]
      });
      
  }

  ngOnInit() {
    this.associationsService.getAssociations()
        .subscribe( 
          data => this.associations = data,
          error => this.error = error.statusText
        );

    this.formteam.setValue({
      name : this.data.name,
      associations_id : this.data.associations_id,
      email : this.data.email,
      website : this.data.website,
      facebook : this.data.facebook,
      twitter : this.data.twitter,
      googleplus : this.data.googleplus,
      address : this.data.address,
      arena : this.data.arena,
      logo : (this.data.logo) ? this.data.logo : ''
    });

    this.key = this.data.$key;
    
  }

  onSubmitEditTeam(team){
    this.teamsService.editTeam(this.key, team);
    this.dialogEditRef.close();
  }

  toggleShowMore(){
    this.showMore = !this.showMore;

    this.showMoreText = (!this.showMore) ? 'Show More' : 'Show Less';
  }

}
