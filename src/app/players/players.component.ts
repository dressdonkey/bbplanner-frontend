import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { PlayersService } from "./players.service";
import { Player } from "./../interfaces/player";
import { CreatePlayerFormComponent } from './create-player-form/create-player-form.component';
import { EditPlayerFormComponent } from './edit-player-form/edit-player-form.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: Array<any>; 
  error: string;
  storageRef : any;

  constructor(
    private dialog: MdDialog, 
    private dialogedit: MdDialog, 
    private playersService: PlayersService
  ) { 
    playersService.getAllPlayers()
      .subscribe(
        data => this.players = data,
        error => this.error = error.statusText
      );

    console.log(firebase.storage().ref().child("playerimages"));
  }

  ngOnInit() {
  }

  private openCreatePlayerFormDialog() {
    let dialogRef = this.dialog.open(CreatePlayerFormComponent, {
      width: '500px',
    });
  }

  private openEditPlayerFormDialog(key, player: Player) {

    let dialogEditRef = this.dialogedit.open(EditPlayerFormComponent, {
      width: '500px',
      data: player
    });
  }

  getImageUrl(player) {
    /*this.storageRef = firebase.storage().ref().child(player.path);
    this.storageRef.getDownloadURL().then(
      url => {
        return url
      }
    );*/

    
    
    
  }

}
