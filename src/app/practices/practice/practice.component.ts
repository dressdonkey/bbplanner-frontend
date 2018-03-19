import { Component, OnInit } from '@angular/core';
import { PracticesService} from './../practices.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Practice } from 'app/interfaces/practice';
import { Drill } from 'app/interfaces/drill';
import { DeleteDrillFromPracticeComponent } from 'app/practices/delete-drill-from-practice/delete-drill-from-practice.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditPracticeDrillFormComponent } from 'app/practices/practice/edit-practice-drill-form/edit-practice-drill-form.component';
import * as moment from 'moment';
import { AddDrillToPracticeComponent } from 'app/practices/practice/add-drill-to-practice/add-drill-to-practice.component';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
  practice: Practice;
  drills: Array<Drill>;
  cols = 1;
  rowheight = 400;
  practiceID: number;
  practiceTime: any;

  constructor(
    private practicesService: PracticesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.practiceID = params['id'];

      this.practicesService.getPractice(params['id'])
        .subscribe(
          data => {

            this.practice = data.practice;
            this.drills =  data.drills;

          },
          err  => {

            if (err.status === 422) {

            }

          }

        );

    });

    this.practicesService.deletedDrill.subscribe(
      (data) => {

        this.snackBar.open(data.message, null, {
          duration: 2000,
        });

        this.deleteDrill(data.drill);
      },
      error => console.log('Problem Deleting Diagram')

    );

    this.practicesService.updatedDrillPractice.subscribe(
      (data) => {

        this.snackBar.open(data.message, null, {
          duration: 2000,
        });

        console.log(data.drill);

        this.updateDrillPractice(data.drill);
      },
      error => console.log('Problem Deleting Diagram')

    );

    this.practicesService.addedDrillPractice.subscribe(
      (data) => {

        this.snackBar.open(data.message, null, {
          duration: 2000,
        });

        this.addDrillToPractice(data.drill);
      },
      error => console.log('Problem Deleting Diagram')

    );
  }

  /**
   *
   * @param association
   */

  updateDrillPractice(drill) {

    const position = this.drills.findIndex(
      (drills) => {
        return drills.id === drill.id;
      }
    );

    this.drills[position] = drill;

  }

  addDrillToPractice(drill) {

    this.drills.push(drill);

  }

  moveUp(position: number, drillID: number) {

    const dia1 = this.drills[position];
    const dia2 = this.drills[position - 1];

    this.drills[position] = dia2;
    this.drills[position - 1] = dia1;

    this.practicesService.moveDiagramUp(position + 1, this.practiceID, drillID)
      .subscribe(
        (data) => {

          this.snackBar.open(data.message, null, {
            duration: 2000,
          });

        },
        (error) => {

          this.snackBar.open('Error swapping drills.', null, {
            duration: 2000,
          });

        }
      );

  }

  moveDown(position: number, drillID: number) {
    console.log(position)
    const dia1 = this.drills[position];
    const dia2 = this.drills[position + 1];

    this.drills[position] = dia2;
    this.drills[position + 1] = dia1;

    this.practicesService.moveDiagramDown(position + 1, this.practiceID, drillID)
      .subscribe(
        (data) => {

          this.snackBar.open(data.message, null, {
            duration: 2000,
          });

        },
        (error) => {

          this.snackBar.open('Error swapping drills.', null, {
            duration: 2000,
          });

        }
      );
  }

  openDeleteDrillFromPracticeDialog(idDrill: number) {
    const dialogDeleteRef = this.dialog.open(DeleteDrillFromPracticeComponent, {
      width: '600px',
      data: idDrill
    });

  }

  openEditDrillFromPracticeDialog(drill) {

    const dialogEditRef = this.dialog.open(EditPracticeDrillFormComponent, {
      width: '600px',
      data: drill
    });

  }

  openAddDrillToPracticeDialog() {
    console.log(this.practiceID);
    const dialogRef = this.dialog.open(AddDrillToPracticeComponent, {
      width: '600px',
      data: this.practiceID
    });

  }

  deleteDrill(drill) {

    const position = this.drills.findIndex(
      (drills) => {
        return drills.id === drill.id;
      }
    );

    this.drills.splice(position, 1);

  }

}
