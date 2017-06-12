import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from "@angular/material";
import { DomSanitizer } from '@angular/platform-browser';
import { AssociationsService } from "./associations.service";
import { Association } from "./../interfaces/association";
import { CreateAssociationFormComponent } from './create-association-form/create-association-form.component';
import { EditAssociationFormComponent } from './edit-association-form/edit-association-form.component';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
  styleUrls: ['./associations.component.css']
})
export class AssociationsComponent implements OnInit {
  associations: Array<any>;
  error: string;

  constructor(
    private associationsService: AssociationsService,
    private dialogAdd: MdDialog,
    private dialogEdit: MdDialog
  ) { }

  ngOnInit() {
    this.associationsService.getAssociations()
      .subscribe(
        data => this.associations = data,
        error => this.error = error.statusText
      )

    this.associationsService.newAssociationSubject .subscribe(
      data => this.associations.push(data)
    )

    this.associationsService.newEditAssociationSubject.subscribe(
      (data) => {
        this.associations[data.id-1] = data;
      }
    )
  }

  openCreateAssociationFormDialog(){
    let dialogRef = this.dialogAdd.open(CreateAssociationFormComponent, {
      width: "500px"
    })
  }

  openEditAssociationFormDialog(association: Association){
    let dialogRefEdit = this.dialogEdit.open(EditAssociationFormComponent, {
      width: "500px",
      data: association
    })
  }

}
