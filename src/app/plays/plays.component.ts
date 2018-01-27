import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlaysService } from "./plays.service";
import { Play } from "./../interfaces/play";
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

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.css']
})
export class PlaysComponent implements OnInit {
  displayedColumns = ['title', 'menu'];
  playsDatabase = new PlaysDatabase(this.playsService);
  dataSource: PlaysDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  constructor(
    private playsService: PlaysService,
    private dialog: MatDialog, 
    private dialogedit: MatDialog, 
    private dialogdelete: MatDialog, 
    private dialogeditimage: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.dataSource = new PlaysDataSource(this.playsDatabase);

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { 
          return; 
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}

/** An example database that the data source uses to retrieve data for the table. */
export class PlaysDatabase {

  dataChange: BehaviorSubject<Play[]> = new BehaviorSubject<Play[]>([]);
  plays: Array<any>;

  get data(): Play[] { 
    return this.dataChange.value; 
  }

  constructor(private playsService: PlaysService) {
    
    this.playsService.getPlays()
      .subscribe(data => {
        
        this.plays = data.plays; 

        console.log(data);

        for (let play of this.plays) {
            this.addPlay(play); 
        }

      },err => {
        console.log('ERROR');
      }
    );
    
    
  }

  addPlay(play) {
    
    const copiedData = this.data.slice();
    
    copiedData.push(play);

    this.dataChange.next(copiedData);
    
  }
}

export class PlaysDataSource extends DataSource<any>{
  _filterChange = new BehaviorSubject('');

  get filter(): string { 
    return this._filterChange.value; 
  }

  set filter(filter: string) { 
    this._filterChange.next(filter); 
  }

  constructor(private _playsDatabase: PlaysDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Play[]> {
    const displayDataChanges = [
      this._playsDatabase.dataChange,
      this._filterChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._playsDatabase.data.slice().filter((play: Play) => {
        let searchStr = (play.title).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });

    //return this._exampleDatabase.dataChange;
  }

  disconnect() {}

}
