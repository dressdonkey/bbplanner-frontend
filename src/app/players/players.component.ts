import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { PlayersService } from "./players.service";
import { Player } from "./../interfaces/player";
import { CreatePlayerFormComponent } from './create-player-form/create-player-form.component';
import { EditPlayerFormComponent } from './edit-player-form/edit-player-form.component';
import 'rxjs/Rx';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})


export class PlayersComponent {
  displayedColumns = ['avatar', 'userName', 'email', 'id'];
  
  playerDatabase = new PlayerDatabase(this.playersService);
  dataSource: ExampleDataSource | null;

  constructor(
    private dialog: MdDialog, 
    private dialogedit: MdDialog, 
    private playersService: PlayersService){
  }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.playerDatabase);
  }

  private openCreatePlayerFormDialog() {

    let dialogRef = this.dialog.open(CreatePlayerFormComponent, {
      width: '500px',
    });
    
  }

  private openEditPlayerFormDialog(player: Player) {
    
    let dialogEditRef = this.dialogedit.open(EditPlayerFormComponent, {
      width: '500px',
      data: player
    });

  }

}

/** An example database that the data source uses to retrieve data for the table. */
export class PlayerDatabase {
  players: Array<any>;
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);

  get data(): Player[] {     
    return this.dataChange.value; 
  }

  constructor(private playersService: PlayersService) {
    
    this.playersService.getAllPlayers()
      .subscribe(data => {
        
        this.players = data; 

        for (let player of this.players) {
            this.addUser(player);
        }

      },err => {
        console.log('ERROR');
      }
    );
  }

  /** Adds a new user to the database. */
  addUser(player) {
    
    const copiedData = this.data.slice();
    
    copiedData.push(player);

    this.dataChange.next(copiedData);

  }

  /** Builds and returns a new User. */
  private createNewUser() {

  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, PlayerDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */

export class ExampleDataSource extends DataSource<any> {
  
  constructor(private _playerDatabase: PlayerDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Player[]> {
    
    return this._playerDatabase.dataChange;

  }

  disconnect() {}
}
