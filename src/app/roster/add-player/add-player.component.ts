import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlayersService } from "./../../players/players.service";
import { Player } from "./../../interfaces/player";
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
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent {
  displayedColumns = ['avatar', 'userName', 'dateOfBirth', 'menu'];
  playerDatabase = new PlayerDatabase(this.playersService);
  dataSource: PlayerDataSource | null;

  color = 'accent';

  @ViewChild('filter') filter: ElementRef;
  
  constructor(
    private playersService: PlayersService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddPlayerComponent>, 
    public snackBar: MatSnackBar
  ){
    
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

      },err => {
        console.log('ERROR');
      }
    );
    
  }

  addPlayer(player) {
    
    const copiedData = this.data.slice();
    
    copiedData.push(player);

    this.dataChange.next(copiedData);
    
  }

}

export class PlayerDataSource extends DataSource<any>{
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
        let searchStr = (player.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });

    //return this._exampleDatabase.dataChange;
  }

  disconnect() {}

}
