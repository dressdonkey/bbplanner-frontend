import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DrillService } from '../drill.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/RX';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-drill-form',
  templateUrl: './edit-drill-form.component.html',
  styleUrls: ['./edit-drill-form.component.css']
})
export class EditDrillFormComponent implements OnInit {

  formdrill: FormGroup;
  drillId: number;

  constructor(
    private drillService: DrillService,
    public dialogRef: MatDialogRef<EditDrillFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.formdrill = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      balls : [''],
      baskets : '',
      cones : '',
      other : '',
      description : [''],
      variations : [''],
      goals : [''],
      tips : [''],
      id : [''],
      used : [''],
    });

  }

  ngOnInit() {

    this.formdrill.setValue({
      name: this.data.name,
      balls : this.data.balls,
      baskets : this.data.baskets,
      cones : this.data.cones,
      other : this.data.other,
      description : this.data.description,
      variations : this.data.variations,
      goals : this.data.goals,
      tips : this.data.tips,
      id : this.data.id,
      used : this.data.used
    });

    this.drillId = this.data.id;

  }

  onSubmitEditDrill(drill): void {

    this.drillService.updateDrill(drill)
      .subscribe();

    this.formdrill.reset({
      name : ''
    });

    this.dialogRef.close();

  }

}
