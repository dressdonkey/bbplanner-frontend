import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlayersService } from './players.service';
import { Player } from './../interfaces/player';
import { CreatePlayerFormComponent } from './create-player-form/create-player-form.component';
import { EditPlayerFormComponent } from './edit-player-form/edit-player-form.component';
import { DeletePlayerComponent } from './delete-player/delete-player.component';
import { EditPlayerFotoComponent } from './edit-player-foto/edit-player-foto.component';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'rxjs/Rx';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})

export class PlayersComponent {
  displayedColumns = ['avatar', 'userName', 'email', 'dateOfBirth', 'menu'];
  playerDatabase = new PlayerDatabase(this.playersService);
  dataSource: PlayerDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  constructor(
    private playersService: PlayersService,
    private dialog: MatDialog,
    private dialogedit: MatDialog,
    private dialogdelete: MatDialog,
    private dialogeditimage: MatDialog,
    public snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {

    this.dataSource = new PlayerDataSource(this.playerDatabase);

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });

    /**
     *
     */

    this.playersService.addedPlayer.subscribe(
      (data) => {
        this.playerDatabase.addPlayer(data.player);

        this.snackBar.open(data.message, null, {
          duration: 2000,
        });
      },
      error => console.log('Problem Creating Player')

    );

    /**
     *
     */

    this.playersService.deletedPlayer.subscribe(
      (data) => {

        this.snackBar.open(data.message, null, {
          duration: 2000,
        });

        this.playerDatabase.deletePlayer(data.player);
      },
      error => console.log('Problem Deleting Player')

    );

    /**
     *
     */

    this.playersService.updatedPlayer.subscribe(
      (data) => {

        this.snackBar.open(data.message, null, {
          duration: 2000,
        });

        this.playerDatabase.updatePlayer(data.player);
      },
      error => console.log('Problem Updating Player')

    );

  }

  /**
   * Open Dialog to create a new player
   */

  private openCreatePlayerFormDialog() {

    const dialogRef = this.dialog.open(CreatePlayerFormComponent, {
      width: '500px',
    });

  }

  /**
   * Open Dialog to update player data
   * @param player player data json
   */

  private openEditPlayerFormDialog(player: Player) {

    const dialogEditRef = this.dialogedit.open(EditPlayerFormComponent, {
      width: '500px',
      data: player
    });

  }

  /**
   * Open Dialog to delete player
   * @param player players data in json
   */

  private openDeletePlayerDialog(player: Player) {

    const dialogDeleteRef = this.dialogdelete.open(DeletePlayerComponent, {
      width: '500px',
      data: player
    });

  }

  /**
   * Open Dialog to edit or insert player foto
   * @param player players data in json
   */

  private openEditPlayerFotoDialog(player: Player) {

    const dialogEditImageRef = this.dialogeditimage.open(EditPlayerFotoComponent, {
      width: '500px',
      data: player
    });

  }

}

/** An example database that the data source uses to retrieve data for the table. */
export class PlayerDatabase {

  dataChange: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
  players: Array<any>;

  get data(): Player[] {
    return this.dataChange.value;
  }

  constructor(private playersService: PlayersService) {

    this.playersService.getAllPlayers()
      .subscribe(data => {

        this.players = data;

        for (let player of this.players) {
            this.addPlayer(player);
        }

      }, err => {
        console.log('ERROR');
      }
    );

  }

  addPlayer(player) {

    const copiedData = this.data.slice();

    copiedData.push(player);

    this.dataChange.next(copiedData);

  }

  deletePlayer(player) {
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (playerEl: Player) => {
        return playerEl.id === player.id;
      }
    );

    copiedData.splice(position, 1);

    this.dataChange.next(copiedData);

  }

  updatePlayer(player) {
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (playerEl: Player) => {
        return playerEl.id === player.id;
      }
    );

    copiedData[position] = player;
    this.dataChange.next(copiedData);
  }

}

export class PlayerDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(private _playerDatabase: PlayerDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Player[]> {
    const displayDataChanges = [
      this._playerDatabase.dataChange,
      this._filterChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._playerDatabase.data.slice().filter((player: Player) => {
        const searchStr = (player.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
    });

  }

  disconnect() {}

}
