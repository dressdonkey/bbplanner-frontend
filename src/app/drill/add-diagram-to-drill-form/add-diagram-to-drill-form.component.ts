import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { DrillService } from 'app/drill/drill.service';
import { DrillDiagramService } from 'app/drill-diagram/drill-diagram.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDiagramFromDrillComponent } from 'app/drill/delete-diagram-from-drill/delete-diagrma-from-drill.component'
import { EditDiagramNoteComponent } from 'app/drill/edit-diagram-note/edit-diagram-note.component'
import { EditDiagramDrillComponent } from 'app/drill/edit-diagram-drill/edit-diagram-drill.component'
import { DrillDiagramComponent } from 'app/drill-diagram/drill-diagram.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-diagram-to-drill-form',
  templateUrl: './add-diagram-to-drill-form.component.html',
  styleUrls: ['./add-diagram-to-drill-form.component.css']
})
export class AddDiagramToDrillFormComponent implements OnInit {

  drillID: number;
  drill_diagrams: Array<any>;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  filename: string;
  errorMessage = '';

  constructor(
    private drillDiagramService: DrillDiagramService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddDiagramToDrillFormComponent>,
    public dialogDeleteRef: MatDialogRef<AddDiagramToDrillFormComponent>,
    public dialog: MatDialog

  ) {
      this.files = []; // local uploading files array
      this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
      this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.drillID = this.data;

      this.drillDiagramService.getDrillDiagrams(this.drillID)
        .subscribe(
          data => {

            this.drill_diagrams =  data.drill_diagrams;

            console.log(data);

          },
          err  => {

            if (err.status === 422) {

              /*this.snackBar.openFromComponent(MessageComponent, {
                duration: 5000,
                data: 'Problems getting season!'
              });*/

            }

          }

        );

    });

    /**
     *
     */

    this.drillDiagramService.updatedDiagram.subscribe(
      (data) => {

        this.snackBar.open(data.message, null, {
          duration: 2000,
        });

        this.updateDiagram(data.drill_diagram);
      },
      error => console.log('Problem Updating Diagram')

    );


    this.drillDiagramService.deletedDiagram.subscribe(
      (data) => {

        this.snackBar.open(data.message, null, {
          duration: 2000,
        });

        this.deleteDiagram(data.drill_diagram);
      },
      error => console.log('Problem Deleting Diagram')

    );

  }

  onUploadOutput(output: UploadOutput): void {

    if (output.type === 'allAddedToQueue') {

    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added

      this.files[0] = output.file;

      // split string
      const array: Array<any> = this.files[0].name.split('.');

      // get last value in array. Hopefully the file extension
      const extension = array[array.length - 1];

      // check to see if file is a valid file
      const index = ['jpeg', 'gif', 'png', 'jpg'].indexOf(extension.toLowerCase());

      if (index < 1) {

        this.filename = '';
        this.errorMessage = 'Not a valid image file. Only jpeg, jpg, png or gif files are allowed!';
        this.files = [];

      } else {

        this.errorMessage = '';

      }

      this.filename = this.files[0].name;

    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {

      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;

    } else if (output.type === 'removed') {

      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);

    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'done') {

      // check to see if the file is valid
      if (output.file.responseStatus === 400) {

        this.filename = '';
        this.errorMessage = output.file.response.message;
        this.files = [];

      } else {

        // this.player.avatar = output.file.response.player.avatar;
        // this.dialogRef.close();
        this.drill_diagrams.push(output.file.response.drill_diagram);

        this.snackBar.open(output.file.response.message, null, {
            duration: 2000,
        });

        this.filename = '';
        this.files = [];

      }

      this.removeAllFiles();

    }
  }

  startUpload(id): void {

    const event: UploadInput = {
      type: 'uploadFile',
      url: 'http://192.168.33.10/api/drills-diagram/upload/' + id,
      method: 'POST',
      data: {
        id: id
      },
      file: this.files[0],
      concurrency: 1
    };

    this.uploadInput.emit(event);

  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  deleteDiagramFromDrill(id: number) {

    const dialogDeleteRef = this.dialog.open(DeleteDiagramFromDrillComponent, {
      width: '600px',
      data: id
    });

  }

  editDiagramNote(diagram) {

    const dialogDeleteRef = this.dialog.open(EditDiagramNoteComponent, {
      width: '600px',
      data: diagram
    });

  }

  editDiagramDrill(diagram) {

    const dialogDeleteRef = this.dialog.open(EditDiagramDrillComponent, {
      width: '600px',
      data: diagram
    });

  }

  deleteDiagram(drill_diagram) {

    const position = this.drill_diagrams.findIndex(
      (drill_diagrams) => {
        return drill_diagrams.id === drill_diagram.id;
      }
    );

    this.drill_diagrams.splice(position, 1);

  }

  updateDiagram(drill_diagram) {

    const position = this.drill_diagrams.findIndex(
      (drill_diagrams) => {
        return drill_diagrams.id === drill_diagram.id;
      }
    );

    this.drill_diagrams[position] = drill_diagram;

  }

  moveUp(position: number) {

    const dia1 = this.drill_diagrams[position];
    const dia2 = this.drill_diagrams[position - 1];

    this.drill_diagrams[position] = dia2;
    this.drill_diagrams[position - 1] = dia1;

    this.drillDiagramService.moveDiagramUp(this.drill_diagrams[position - 1].id, this.drill_diagrams[position - 1].drill_id);

  }

  moveDown(position: number) {
    console.log(position)
    const dia1 = this.drill_diagrams[position];
    const dia2 = this.drill_diagrams[position + 1];

    this.drill_diagrams[position] = dia2;
    this.drill_diagrams[position + 1] = dia1;

    this.drillDiagramService.moveDiagramDown(this.drill_diagrams[position].id, this.drill_diagrams[position].drill_id);
  }

}
