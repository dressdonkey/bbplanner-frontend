import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { PracticesService } from 'app/practices/practices.service';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-edit-practice-drill-form',
  templateUrl: './edit-practice-drill-form.component.html',
  styleUrls: ['./edit-practice-drill-form.component.css']
})

export class EditPracticeDrillFormComponent implements OnInit {

  drillID: number;
  formpracticedrill: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditPracticeDrillFormComponent>,
    private practiceService: PracticesService,
    private fb: FormBuilder
  ) {

    this.formpracticedrill = this.fb.group({
      duration : [''],
      id : ['']
    });

  }

  ngOnInit() {

    this.formpracticedrill.setValue({

      duration : this.data.duration,
      id : this.data.id

    });

  }

  onSubmitEditPracticeDrill(drill) {

    this.practiceService.editDrillFromPractice(drill);

    this.dialogRef.close();

  }

}
