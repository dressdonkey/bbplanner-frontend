import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AssociationsService } from "./../associations.service";
import { AuthService } from "./../../auth/auth.service";
import { Association } from "./../../interfaces/association";

@Component({
  selector: 'app-edit-association-form',
  templateUrl: './edit-association-form.component.html',
  styleUrls: ['./edit-association-form.component.css']
})
export class EditAssociationFormComponent implements OnInit {
  association: Association;
  formassociation: FormGroup;
  key: string;
  associationId: number;

  constructor(
    public dialogEditRef: MatDialogRef<EditAssociationFormComponent>, 
    public associationsService: AssociationsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder
  ) { 
      this.formassociation = this.fb.group({
        name : ['', Validators.required],
        logo : '',
        user_id : ''
      })
  }

  ngOnInit() {
    
    this.formassociation.setValue({
      name : this.data.name,
      logo : this.data.logo,
      user_id : this.data.user_id
    })

    this.associationId = this.data.id;
  }

  onSubmitAssociation(association): void {
    
    this.associationsService.editAssociation(this.associationId, association)
      .subscribe();
    this.dialogEditRef.close();

  }

}
