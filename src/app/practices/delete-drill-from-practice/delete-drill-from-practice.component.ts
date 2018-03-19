import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PracticesService } from 'app/practices/practices.service';

@Component({
  selector: 'app-delete-drill-from-practice',
  templateUrl: './delete-drill-from-practice.component.html',
  styleUrls: ['./delete-drill-from-practice.component.css']
})
export class DeleteDrillFromPracticeComponent implements OnInit {

  drillID: number;

  constructor(
    public dialogDeleteRef: MatDialogRef<DeleteDrillFromPracticeComponent>,
    public prcticeService: PracticesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {

    this.drillID = this.data;

  }

  onDeleteDrillFromPractice(idDrill: number) {

    this.prcticeService.deleteDrillFromPractice(idDrill);
    this.dialogDeleteRef.close();

  }

}
