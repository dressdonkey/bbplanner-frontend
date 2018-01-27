import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from "./../interfaces/player";
import { Practice } from "./../interfaces/practice";
import { AuthService } from '../auth/auth.service';
import { SeasonsService } from "./../seasons/seasons.service";
//import { RosterService } from "./../roster/roster.service";
//import { PracticesService} from './../practices/practices.service';
import { Season } from "./../interfaces/season";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from './../message/message.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';
import { forEach } from '@angular/router/src/utils/collection';
import { log } from 'util';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  //displayedColumns = ['avatar', 'userName', 'dateOfBirth', 'active', 'menu'];
  //displayedColumns2 = ['duration', 'practice_date', 'practice_time', 'objective', 'menu'];
  //dataSource: RostersDataSource | null;
  //dataSource1: PracticeDataSource | null;
  //rosterDatabase = new RostersDatabase(this.rosterService, this.seasonsService);
  //practiceDatabase = new PracticesDatabase(this.practicesService);
  user_id: number = 1;
  seasonName: string;
  observations: string;
  practices: Array<any>;

  constructor(
    private authService: AuthService,
    //private rosterService: RosterService,
    private seasonsService: SeasonsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    //private practicesService: PracticesService
  ) {
    
  }

  ngOnInit() {

    //this.dataSource = new RostersDataSource(this.rosterDatabase);
    //this.dataSource1 = new PracticeDataSource(this.practiceDatabase);
    

    /*this.seasonsService.getDefaultSeason(this.user_id)
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

            this.snackBar.openFromComponent(MessageComponent, {
              duration: 5000,
              data: 'Problems getting season!'
            });

          }

      }

    );*/
    

  }

  /*
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
  */

  /*
  private openAddPlayerDialog() {
    
    let dialogRef = this.dialog.open(AddPlayerComponent, {
      width: '500px',
    });
    
  }

  */
}


/*
export class PracticesDatabase{
  dataChange: BehaviorSubject<Practice[]> = new BehaviorSubject<Practice[]>([]);
  practices: Array<any>;
  user_id: number = 1;

  get data(): Practice[] {
    return this.dataChange.value; 
  }

  constructor(
    private practicesService: PracticesService
  ){

    this.practicesService.getPractices(1)
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

            this.snackBar.openFromComponent(MessageComponent, {
              duration: 5000,
              data: 'Problems getting season!'
            });

          }

        }

    );
      
  }

  addPractice(practice){

    const copiedData = this.data.slice();
    copiedData.push(practice);
    this.dataChange.next(copiedData);

  }

}
*/

/*
export class PracticeDataSource extends DataSource<any> {

  constructor(private _practiceDatabase: PracticesDatabase) {
    super();
  }

  connect(): Observable<Practice[]> {

    return this._practiceDatabase.dataChange;

  }

  disconnect() {}
}
*/
/*
export class RostersDatabase{
  seasonID: number;
  dataChange: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
  roster: Array<any>;
  user_id: number = 1;
  seasonName: string;

  get data(): Player[] {
    return this.dataChange.value; 
  }

  constructor(
    private rosterService:RosterService,
    private seasonsService: SeasonsService
  ){

    this.seasonsService.getDefaultSeason(this.user_id)
      .subscribe(

        data => {
          this.seasonName = data.season.name;
          this.seasonID = data.id;
          
          this.roster = data.roster;

          for (let players of this.roster) {
            this.addPlayer(players.player); 
          }

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
      
  }

  addPlayer(player){

    const copiedData = this.data.slice();

    if(player.active == 1){
      player.active = "Active";
    }else{
      player.active = "Not Active";
    }
    copiedData.push(player);
    this.dataChange.next(copiedData);

  }

}
*/

/*export class RostersDataSource extends DataSource<any> {
  
    constructor(private _rostersDatabase: RostersDatabase) {
        super();
    }
  
  
    ngOnInit() {
      
    }
  
    connect(): Observable<Player[]> {
      
      return this._rostersDatabase.dataChange;
  
    }
  
    disconnect() {}
    
}*/