import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { MdDialogRef } from '@angular/material';
import { AssociationsService } from "./../associations.service";
import { Association } from "./../../interfaces/association";

@Component({
  selector: 'app-create-association-form',
  templateUrl: './create-association-form.component.html',
  styleUrls: ['./create-association-form.component.css']
})
export class CreateAssociationFormComponent implements OnInit {
  formassociation: FormGroup;
  association: Association;
  
  constructor(
    private fb:FormBuilder, 
    private associationsService:AssociationsService, 
    private dialogRef:MdDialogRef<CreateAssociationFormComponent>
    ) { 
      this.formassociation = this.fb.group({
        name : ['', Validators.compose([Validators.maxLength(255), Validators.required])]
      })
  }

  ngOnInit() {
  }

  onSubmitAssociation(association){

    association.avatar = 'assets/images/avatar-2.png'; //TODO - Find a default imge
    association.users_id = 1 // TODO - modify to dynamic user - logged in user
    this.associationsService.addAssociation(association);
    this.formassociation.reset({
      name : ''
    });
    this.dialogRef.close();
    
  }

}
