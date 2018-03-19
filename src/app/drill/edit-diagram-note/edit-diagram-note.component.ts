import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DrillDiagramService } from 'app/drill-diagram/drill-diagram.service';

@Component({
  selector: 'app-edit-diagram-note',
  templateUrl: './edit-diagram-note.component.html',
  styleUrls: ['./edit-diagram-note.component.css']
})
export class EditDiagramNoteComponent implements OnInit {

  formdiagram: FormGroup;
  diagramID: number;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDiagramNoteComponent>,
    public drillDiagramService: DrillDiagramService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.formdiagram = this.fb.group({
      drill_diagram_note: ['']
    });

  }

  ngOnInit() {

    this.formdiagram.setValue({
      drill_diagram_note: this.data.drill_diagram_note
    });

    this.diagramID = this.data.id;

  }

  onSubmitEditDiagram(diagram) {

    this.drillDiagramService.updateDrillDiagram(this.diagramID, diagram);
    this.dialogRef.close();

  }

}
