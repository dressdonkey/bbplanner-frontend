import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DrillService } from './drill.service';
import { Drill } from './../interfaces/drill';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateDrillFormComponent } from './create-drill-form/create-drill-form.component';
import { AddDiagramToDrillFormComponent } from './add-diagram-to-drill-form/add-diagram-to-drill-form.component';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { EditDrillFormComponent } from 'app/drill/edit-drill-form/edit-drill-form.component';
import { DeleteDrillComponent } from 'app/drill/delete-drill/delete-drill.component';

@Component({
  selector: 'app-drill',
  templateUrl: './drill.component.html',
  styleUrls: ['./drill.component.css']
})
export class DrillComponent implements OnInit {
  displayedColumns = ['name', 'menu'];
  drillDatabase = new DrillDatabase(this.drillService);
  dataSource: DrillDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  constructor(
    private drillService: DrillService,
    private createDialog: MatDialog,
    private dialogedit: MatDialog,
    private dialogdelete: MatDialog,
    private dialogeditimage: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.dataSource = new DrillDataSource(this.drillDatabase);

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });

    this.drillService.addedDrill.subscribe(
      (data) => {
        this.drillDatabase.addDrill(data.drill);

        this.snackBar.open(data.message, null, {
          duration: 2000,
        });
      },
      error => console.log('Problem Creating Drill')
    );

    this.drillService.updatedDrill.subscribe(
      (data) => {

        this.snackBar.open(data.message, null, {
          duration: 2000,
        });

        this.drillDatabase.updateDrill(data.drill);
      },
      error => console.log('Problem Updating Drill')

    );

    this.drillService.deletedDrill.subscribe(
      (data) => {

        this.snackBar.open(data.message, null, {
          duration: 2000,
        });

        this.drillDatabase.deleteDrill(data.drill);
      },
      error => console.log('Problem Deleting Drill')

    );
  }

  private openCreateDrillFormDialog() {

    const dialogRef = this.createDialog.open(CreateDrillFormComponent, {
      height: '80%',
      width: '50%',
      maxHeight: '80%'
    });

  }

  private openEditDrillFormDialog(drill) {

    const dialogRef = this.createDialog.open(EditDrillFormComponent, {
      height: '80%',
      width: '90%',
      maxHeight: '80%',
      data: drill
    });

  }

  private openDeleteDrillDialog(drill) {
    const dialogRef = this.createDialog.open(DeleteDrillComponent, {
      data: drill
    });
  }

  private openAddDiagramToDrillFormDialog(drillID) {

    const dialogRef = this.createDialog.open(AddDiagramToDrillFormComponent, {
      height: '80%',
      width: '90%',
      maxHeight: '80%',
      data: drillID
    });
  }

}

/** An example database that the data source uses to retrieve data for the table. */
export class DrillDatabase {

  dataChange: BehaviorSubject<Drill[]> = new BehaviorSubject<Drill[]>([]);
  drills: Array<any>;

  get data(): Drill[] {
    return this.dataChange.value;
  }

  constructor(private drillService: DrillService) {

    this.drillService.getDrills()
      .subscribe(data => {

        this.drills = data.drills;

        console.log(data);

        for (const drill of this.drills) {
            this.addDrill(drill);
        }

      }, err => {
        console.log('ERROR');
      }
    );


  }

  addDrill(drill) {

    const copiedData = this.data.slice();

    copiedData.push(drill);

    this.dataChange.next(copiedData);

  }

  updateDrill(drill) {
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (drillEl) => {
        return drillEl.id === drill.id;
      }
    );

    copiedData[position] = drill;
    this.dataChange.next(copiedData);
  }

  deleteDrill(drill) {
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (drillEl) => {
        return drillEl.id === drill.id;
      }
    );

    copiedData.splice(position, 1);

    this.dataChange.next(copiedData);

  }
}

export class DrillDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(private _drillDatabase: DrillDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Drill[]> {
    const displayDataChanges = [
      this._drillDatabase.dataChange,
      this._filterChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._drillDatabase.data.slice().filter((drill: Drill) => {
        const searchStr = (drill.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
    });

    // return this._exampleDatabase.dataChange;
  }

  disconnect() {}

}
