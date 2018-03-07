import { Component, OnInit, Inject } from '@angular/core';
import { DrillService } from 'app/drill/drill.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-drill',
  templateUrl: './delete-drill.component.html',
  styleUrls: ['./delete-drill.component.css']
})
export class DeleteDrillComponent implements OnInit {
  drill: any;

  constructor(
    private drillService: DrillService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteDrillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.drill = this.data;

  }

  ngOnInit() {
  }

  onDeleteDrill(drillID: number) {
    this.drillService.deleteDrill(drillID);
    this.dialogRef.close();
  }

}
