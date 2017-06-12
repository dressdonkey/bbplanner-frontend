import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { AssociationsService } from "./../associations.service";
import { MD_DIALOG_DATA } from '@angular/material';
import { Association } from "./../../interfaces/association";

@Component({
  selector: 'app-edit-association-form',
  templateUrl: './edit-association-form.component.html',
  styleUrls: ['./edit-association-form.component.css']
})
export class EditAssociationFormComponent implements OnInit {
  formassociation: FormGroup;
  key: string;

  constructor(
    private associationsService: AssociationsService,
    private dialogRef: MdDialogRef<EditAssociationFormComponent>,
    private fb: FormBuilder,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { 
      this.formassociation = this.fb.group({
        id: [''],
        name : ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
        avatar : ['', Validators.maxLength(255)],
        users_id : ['']
      })
  }

  ngOnInit() {
    this.formassociation.setValue({
      id : this.data.id,
      name : this.data.name,
      avatar : this.data.avatar,
      users_id : this.data.users_id
    });

    this.key = this.data.$key;
  }

  onSubmitEditAssociation(association: Association): void {   
    this.associationsService.editAssociation(this.key, association);
    this.dialogRef.close();
  }

}
