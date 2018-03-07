import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DrillDiagramService } from 'app/drill-diagram/drill-diagram.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-diagrma-from-drill',
  templateUrl: './delete-diagrma-from-drill.component.html',
  styleUrls: ['./delete-diagrma-from-drill.component.css']
})
export class DeleteDiagramFromDrillComponent implements OnInit {

  diagramID: number;
  public deleteDrillDiag: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public dialogDeleteRef: MatDialogRef<DeleteDiagramFromDrillComponent>,
    private drillDiagramService: DrillDiagramService
  ) { }

  ngOnInit() {
    this.diagramID = this.data;
  }

  onDelete(id: number) {

    this.drillDiagramService.deleteDrillDiagram(id);
      /*.subscribe((data) => {

          console.log('Diagram Deleted');
          this.snackBar.open(data.message, null, {
            duration: 2000,
          });

          // this.deleteDrillDiag.next(data.json());

        },
        error => console.log('Problems deleting Driagram from Drill!')
      );*/

    this.dialogDeleteRef.close();

  }

}
