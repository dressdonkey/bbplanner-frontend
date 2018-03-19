import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { DrillService } from './../../../drill/drill.service';
import { PracticesService } from './../../../practices/practices.service';
import { Drill } from './../../../interfaces/drill';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-drill-to-practice',
  templateUrl: './add-drill-to-practice.component.html',
  styleUrls: ['./add-drill-to-practice.component.css']
})
export class AddDrillToPracticeComponent implements OnInit {

  displayedColumns = ['name', 'menu'];
  drillDatabase = new DrillDatabase(this.drillService);
  dataSource: DrillDataSource | null;
  practiceID: number;

  @ViewChild('filter') filter: ElementRef;

  constructor(
    private drillService: DrillService,
    private addDialog: MatDialog,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddDrillToPracticeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public practicesService: PracticesService
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

      this.practiceID = this.data;

  }

  addDrillToPractice(drillID: number) {

    this.practicesService.addDrillToPractice(drillID, this.practiceID);

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
