import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from "./../interfaces/player";
import { Practice } from "./../interfaces/practice";
import { AuthService } from '../auth/auth.service';
import { SeasonsService } from "./../seasons/seasons.service";
import { RosterService } from "./../roster/roster.service";
import { PracticesService} from './../practices/practices.service';
import { Season } from "./../interfaces/season";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from './../message/message.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-practices',
  templateUrl: './practices.component.html',
  styleUrls: ['./practices.component.css']
})

export class PracticesComponent implements OnInit {
  
  displayedColumns2 = ['duration', 'practice_date', 'practice_time', 'objective', 'menu'];
  dataSource1: PracticeDataSource | null;
  practicesDatabase = new PracticesDatabase(this.practicesService);
  user_id: number = 1;
  seasonName: string;
  observations: string;
  practices: Array<any>;

  constructor(
    private authService: AuthService,
    private rosterService: RosterService,
    private seasonsService: SeasonsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private practicesService: PracticesService
  ) {
    
  }

  ngOnInit() {

    this.dataSource1 = new PracticeDataSource(this.practicesDatabase);
    

    this.seasonsService.getDefaultSeason(this.user_id)
      .subscribe(

        data => {
          
          this.seasonName = data.season.name; 
          this.observations = data.season.observations;       

        },
        err  => {
          
          if(err.status === 422){

            this.snackBar.openFromComponent(MessageComponent, {
              duration: 5000,
              data: 'Problems getting season!'
            });

          }

        }

    );

    this.practicesService.getPractices(1)
      .subscribe(

        data => {
          
          this.practices = data.practices;

        },
        err  => {
          
          if(err.status === 422){

            /*this.snackBar.openFromComponent(MessageComponent, {
              duration: 5000,
              data: 'Problems getting season!'
            });*/

          }

        }

    );
    

  }

}

export class PracticesDatabase{
  dataChange: BehaviorSubject<Practice[]> = new BehaviorSubject<Practice[]>([]);
  practices: Array<any>;
  user_id: number = 1;
  seasonID: number = 1;

  get data(): Practice[] {
    return this.dataChange.value; 
  }

  constructor(
    private practicesService: PracticesService
  ){

    this.practicesService.getPractices(this.seasonID)
      .subscribe(

        data => {
          
          this.practices = data.practices;

          console.log(data);

          for (let practice of this.practices) {
            this.addPractice(practice); 
          }

        },
        err  => {
          
          if(err.status === 422){

            /*this.snackBar.openFromComponent(MessageComponent, {
              duration: 5000,
              data: 'Problems getting season!'
            });*/

          }

        }

    );
      
  }

  /**
   * 
   * @param player 
   */

  addPractice(practice){

    const copiedData = this.data.slice();
    copiedData.push(practice);
    this.dataChange.next(copiedData);

  }

}

export class PracticeDataSource extends DataSource<any> {

  constructor(private _practiceDatabase: PracticesDatabase) {
    super();
  }

  connect(): Observable<Practice[]> {

    return this._practiceDatabase.dataChange;

  }

  disconnect() {}
}