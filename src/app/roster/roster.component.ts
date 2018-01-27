import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from "./../interfaces/player";
import { AuthService } from '../auth/auth.service';
import { SeasonsService } from "./../seasons/seasons.service";
import { RosterService } from "./../roster/roster.service";
import { Season } from "./../interfaces/season";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from './../message/message.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { AddPlayerComponent } from './add-player/add-player.component';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  displayedColumns = ['avatar', 'userName', 'dateOfBirth', 'active', 'menu'];
  
  dataSource: RostersDataSource | null;
  rosterDatabase = new RostersDatabase(this.rosterService, this.seasonsService);

  constructor(
    private authService: AuthService,
    private rosterService: RosterService,
    private seasonsService: SeasonsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.dataSource = new RostersDataSource(this.rosterDatabase);
  }

  private openAddPlayerDialog() {
    
    let dialogRef = this.dialog.open(AddPlayerComponent, {
      width: '500px',
    });
    
  }

}

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

            /*this.snackBar.openFromComponent(MessageComponent, {
              duration: 5000,
              data: 'Problems getting season!'
            });*/

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

export class RostersDataSource extends DataSource<any> {
  
  constructor(private _rostersDatabase: RostersDatabase) {
      super();
  }


  ngOnInit() {
    
  }

  connect(): Observable<Player[]> {
    
    return this._rostersDatabase.dataChange;

  }

  disconnect() {}
  
}
