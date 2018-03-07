import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DrillService } from '../drill.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/RX';

@Component({
  selector: 'app-create-drill-form',
  templateUrl: './create-drill-form.component.html',
  styleUrls: ['./create-drill-form.component.css']
})

export class CreateDrillFormComponent implements OnInit {
  formdrill: FormGroup;

  constructor(

    public drillService: DrillService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateDrillFormComponent>
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
      });
  }

  ngOnInit() {

  }

  onSubmitCreateDrill(drill): void {
    drill.user_id = 1

    this.drillService.addDrill(drill)
      .subscribe();

    this.formdrill.reset({
      name : ''
    });

    this.dialogRef.close();
  }

}
