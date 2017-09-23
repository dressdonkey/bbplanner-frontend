import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material";
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { Competition } from "./../../interfaces/competition";
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-competition-logo',
  templateUrl: './edit-competition-logo.component.html',
  styleUrls: ['./edit-competition-logo.component.css']
})

export class EditCompetitionLogoComponent implements OnInit {
  competition: Competition;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  filename: string;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<EditCompetitionLogoComponent>,
    public snackBar: MdSnackBar
  ) { 
      this.files = []; // local uploading files array
      this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
      this.humanizeBytes = humanizeBytes;
      this.competition = this.data;
      
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
      this.files.push(output.file);

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
      this.competition.avatar = output.file.response.competition.avatar;  
      this.dialogRef.close();

      this.snackBar.open(output.file.response.message, null, {
          duration: 2000,
      });   
    }
  }

  startUpload(id): void {
    
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://192.168.33.10/api/competitions/upload/'+id,
      method: 'POST',
      data: { 
        id: id 
      },
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
