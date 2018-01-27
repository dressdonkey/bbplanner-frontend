import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AttendanceService } from 'app/practices/attendance/attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})

export class AttendanceComponent implements OnInit {

  displayedColumns = ['avatar', 'name', 'must_attend', 'attended'];
  attendanceDatabase = new AttendanceDatabase(this.attendanceService, this.route);
  dataSource: AttendanceDataSource | null;

  constructor(
    private attendanceService: AttendanceService,
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit() {
    this.dataSource = new AttendanceDataSource(this.attendanceDatabase);
  }

}

export class AttendanceDatabase{
  
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  players: Array<any>;
  practiceID: number;
  seasonID: number;

  get data(): any[] { 
    return this.dataChange.value; 
  }

  constructor(
    private attendanceService: AttendanceService,
    private route: ActivatedRoute
  ) {
    
    this.route.params.subscribe(params => {

      this.practiceID = params['practiceID'];

      this.attendanceService.getPlayerAttendance(this.practiceID)
        .subscribe(data => {
          
          this.players = data.attendance; 
          this.seasonID = data.season_id;

          for (let player of this.players) {
              this.addPlayer(player); 
          }

        },err => {
          console.log('ERROR');
        });
    
    });

 }

  addPlayer(player) {
    
    const copiedData = this.data.slice();    
    copiedData.push(player);
    this.dataChange.next(copiedData);
    
  }

}

export class AttendanceDataSource extends DataSource<any>{

  constructor(private _attendanceDatabase: AttendanceDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {

    return this._attendanceDatabase.dataChange;

  }

  disconnect() {}

}
