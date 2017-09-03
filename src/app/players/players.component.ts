import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { PlayersService } from "./players.service";
import { Player } from "./../interfaces/player";
import { CreatePlayerFormComponent } from './create-player-form/create-player-form.component';
import { EditPlayerFormComponent } from './edit-player-form/edit-player-form.component';
import { DeletePlayerComponent } from './delete-player/delete-player.component';
import { EditPlayerFotoComponent } from "./edit-player-foto/edit-player-foto.component";
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar } from '@angular/material';
import 'rxjs/Rx';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})

export class PlayersComponent {
  displayedColumns = ['avatar', 'userName', 'email', 'dateOfBirth', 'menu'];
  dataSource: ExampleDataSource | null;
  players: Array<any>;

  constructor(
    private dialog: MdDialog, 
    private dialogedit: MdDialog, 
    private dialogdelete: MdDialog, 
    private dialogeditimage: MdDialog,
    private playersService: PlayersService,
    public snackBar: MdSnackBar){
  }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.playersService);

    /**
     * 
     */

    this.playersService.addedPlayer.subscribe(
      (data) => {
        this.dataSource.addUser(data.player);
        
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

        this.dataSource.deleteUser(data.player);
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
        
        console.log(data.player);
        
        this.dataSource.updateUser(data.player);
      },
      error => console.log('Problem Updating Player')
      
    );
    
  }

  /**
   * Open Dialog to create a new player
   */

  private openCreatePlayerFormDialog() {

    let dialogRef = this.dialog.open(CreatePlayerFormComponent, {
      width: '500px',
    });
    
  }

  /**
   * Open Dialog to update player data
   * @param player player data json
   */

  private openEditPlayerFormDialog(player: Player) {
    
    let dialogEditRef = this.dialogedit.open(EditPlayerFormComponent, {
      width: '500px',
      data: player
    });

  }

  /**
   * Open Dialog to delete player
   * @param player players data in json
   */
  
  private openDeletePlayerDialog(player: Player) {
    
    let dialogDeleteRef = this.dialogdelete.open(DeletePlayerComponent, {
      width: '500px',
      data: player
    });

  }

  /**
   * Open Dialog to edit or insert player foto
   * @param player players data in json
   */
  
  private openEditPlayerFotoDialog(player: Player) {
    
    let dialogEditImageRef = this.dialogeditimage.open(EditPlayerFotoComponent, {
      width: '500px',
      data: player
    });

  }

}

export class ExampleDataSource extends DataSource<any> {
  players: Array<any>;
  dataChange: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
     
  constructor(
    private playersService: PlayersService) {
      super();
  }

  get data(): Player[] {
    return this.dataChange.value; 
  }

  ngOnInit() {
    
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Player[]> {

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

    return this.dataChange;

  }

  addUser(player) {
    
    const copiedData = this.data.slice();
    
    copiedData.push(player);

    this.dataChange.next(copiedData);
    
  }

  deleteUser(player){
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (playerEl: Player) => {
        return playerEl.id == player.id;
      }
    );

    copiedData.splice(position, 1);

    this.dataChange.next(copiedData);

  }

  updateUser(player){
    const copiedData = this.data.slice();

    const position = copiedData.findIndex(
      (playerEl: Player) => {
        return playerEl.id == player.id;
      }
    );

    copiedData[position] = player;
    this.dataChange.next(copiedData);
  }

  disconnect() {}
}
