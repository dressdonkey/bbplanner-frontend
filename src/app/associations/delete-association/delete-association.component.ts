import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssociationsService } from './../../associations/associations.service';
import { Association } from "./../../interfaces/association";

@Component({
  selector: 'app-delete-association',
  templateUrl: './delete-association.component.html',
  styleUrls: ['./delete-association.component.css']
})
export class DeleteAssociationComponent implements OnInit {
  association: Association;

  constructor(
    public dialogRef: MatDialogRef<DeleteAssociationComponent>, 
    private associationService: AssociationsService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
      this.association = this.data;
  }

  ngOnInit() {
  }

  /**
   * Delete Association
   * @param id association id
   */

  onDelete(id: number){
    this.associationService.deleteAssociation(id)
      .subscribe((data) => {
          
          console.log('Association Deleted');          

        },
        error => console.log('Problems deleting Association!')  
      );

    this.dialogRef.close();
  }

}
