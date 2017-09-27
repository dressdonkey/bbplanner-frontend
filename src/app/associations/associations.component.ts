import { Component, OnInit } from '@angular/core';
import { AssociationsService } from "./associations.service";
import { Association } from "./../interfaces/association";
import { MdDialog } from "@angular/material";
import { CreateAssociationFormComponent } from './create-association-form/create-association-form.component';
import { EditAssociationFormComponent } from './edit-association-form/edit-association-form.component';
import { EditAssociationLogoComponent } from './edit-association-logo/edit-association-logo.component';
import { DeleteAssociationComponent } from './delete-association/delete-association.component';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar } from '@angular/material';
import 'rxjs/Rx';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
  styleUrls: ['./associations.component.css']
})
export class AssociationsComponent implements OnInit {
  displayedColumns = ['logo', 'name', 'menu'];
  dataSource: AssociationDataSource | null;
  associations: Array<any>;

  constructor(
    private dialog: MdDialog, 
    private dialogedit: MdDialog, 
    private dialogdelete: MdDialog, 
    private dialogeditimage: MdDialog,
    private associationsService: AssociationsService,
    public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.dataSource = new AssociationDataSource(this.associationsService);

    /**
     * 
     */

    this.associationsService.addedAssociation.subscribe(
      (data) => {
        this.dataSource.addAssociation(data.association);
        
        this.snackBar.open(data.message, null, {
          duration: 2000,
        });
      },
      error => console.log('Problem Creating Association')
    );

    /**
     * 
     */

    this.associationsService.updatedAssociation.subscribe(
      (data) => {
        
        this.snackBar.open(data.message, null, {
          duration: 2000,
        });
        
        this.dataSource.updateAssociation(data.association);
      },
      error => console.log('Problem Updating Association')
      
    );

    /**
     * 
     */

    this.associationsService.deletedAssociation.subscribe(
      (data) => {
        
        this.snackBar.open(data.message, null, {
          duration: 2000,
        });

        this.dataSource.deleteAssociation(data.association);
      },
      error => console.log('Problem Deleting Association')
      
    );
  }

/**
   *  Open Dialog to create a new competition
   */

  openCreateAssociationDialog(){
    this.dialog.open(CreateAssociationFormComponent, 
    {
      width: '500px'
    })
  }

  /**
   *  Open Dialog to edit a new competition
   */

  openEditAssociationDialog(association: Association){
    this.dialog.open(EditAssociationFormComponent, 
    {
      width: '500px',
      data : association
    })
  }

  /**
   * Open Dialog to edit or insert player foto
   * @param association players data in json
   */
  
  private openEditAssociationLogoDialog(association: Association) {
    
    let dialogEditImageRef = this.dialogeditimage.open(EditAssociationLogoComponent, {
      width: '500px',
      data: association
    });

  }

  /**
   * Open Dialog to delete player
   * @param association players data in json
   */
  
  private openDeleteAssociationDialog(association: Association) {
    
    let dialogDeleteRef = this.dialogdelete.open(DeleteAssociationComponent, {
      width: '500px',
      data: association
    });

  }

}

export class AssociationDataSource extends DataSource<any> {
  associations: Array<any>;
  dataChange: BehaviorSubject<Association[]> = new BehaviorSubject<Association[]>([]);

  constructor(private associationsService: AssociationsService) {
      super();
  }

  get data(): Association[] {
    return this.dataChange.value; 
  }

  ngOnInit() {
    
  }

  connect(): Observable<Association[]> {
    this.associationsService.getAllAssociations()
      .subscribe(data => {
        
        this.associations = data; 

        for (let association of this.associations) {
            this.addAssociation(association); 
        }

      },err => {
        console.log('ERROR');
      }
    );
    
    return this.dataChange;
  }

  /**
   * 
   * @param association 
   */

  addAssociation(association){
    const copiedData = this.data.slice();
    
    copiedData.push(association);

    this.dataChange.next(copiedData);
  }

  /**
   * 
   * @param association 
   */

  updateAssociation(association){
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (associationEl: Association) => {
        return associationEl.id == association.id;
      }
    );

    copiedData[position] = association;
    this.dataChange.next(copiedData);
  }

  /**
   * 
   * @param association 
   */

  deleteAssociation(association){
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (associationEl: Association) => {
        return associationEl.id == association.id;
      }
    );

    copiedData.splice(position, 1);

    this.dataChange.next(copiedData);

  }

  disconnect() {}
}
