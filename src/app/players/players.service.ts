import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database";
import { Player } from "./../interfaces/player";
import * as firebase from 'firebase';

@Injectable()
export class PlayersService {
  players: FirebaseListObservable<any>;
  player: FirebaseObjectObservable<any>;
  folder: any;

  constructor(private db: AngularFireDatabase) { 
    this.players = db.list('/players') as FirebaseListObservable<Player[]>
    this.folder = 'playerimages';
  }

  getAllPlayers(){
    return this.players;
  }

  addPlayer(player: Player){
    //const players = this.db.list('/players');

    //players.push(player);

    let storageRef = firebase.storage().ref();

    for(let selectedFile of [(<HTMLInputElement>document.getElementById('avatar')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        player.avatar = selectedFile.name;
        player.path = path;
        this.players.push(player);
      })
    }

  }

  editPlayer(key, player: Player){
    this.players.update(key, player);
  }

}
