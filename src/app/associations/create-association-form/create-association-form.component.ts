import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AssociationsService } from "./../associations.service";
import { AuthService } from "./../../auth/auth.service";
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
    public dialogCreateRef: MatDialogRef<CreateAssociationFormComponent>, 
    public associationsService: AssociationsService,
    public fb: FormBuilder,
    public authService: AuthService
  ) { 

    this.formassociation = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(255)])]
    });
    
  }

  ngOnInit() {
  }

  onSubmitAssociation(association): void {
    console.log('csdcdscds');
    
    association.user_id = 1
    
    this.associationsService.addAssociation(association)
      .subscribe();

    this.formassociation.reset({
      name : ''
    });

    this.dialogCreateRef.close();
  }
}
