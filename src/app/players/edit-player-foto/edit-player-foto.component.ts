import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { Player } from './../../interfaces/player';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-player-foto',
  templateUrl: './edit-player-foto.component.html',
  styleUrls: ['./edit-player-foto.component.css']
})

export class EditPlayerFotoComponent implements OnInit {
  player: Player;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  filename: string;
  errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditPlayerFotoComponent>,
    public snackBar: MatSnackBar
  ) {
      this.files = []; // local uploading files array
      this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
      this.humanizeBytes = humanizeBytes;
      this.player = this.data;
  }

  ngOnInit() {

  }

  onUploadOutput(output: UploadOutput): void {

    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' },
      //   concurrency: 0
      // };
      // this.uploadInput.emit(event);
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

        this.player.avatar = output.file.response.player.avatar;
        this.dialogRef.close();

        this.snackBar.open(output.file.response.message, null, {
            duration: 2000,
        });


        this.files = [];

      }

      this.removeAllFiles();

    }
  }

  startUpload(id): void {

    const event: UploadInput = {
      type: 'uploadFile',
      url: 'http://192.168.33.10/api/players/upload/' + id,
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

}
