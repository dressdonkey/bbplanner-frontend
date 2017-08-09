import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";

@Injectable()
export class LevelsService {
  levels: FirebaseListObservable<any>;

  constructor(public afAuth: AngularFireDatabase) { 
    this.levels = this.afAuth.list('/levels') as FirebaseListObservable<any>;
  }

  getLevels(){
    return this.levels;
  }

  addLevel(data){
    const levels = this.afAuth.list('/levels');
    levels.push(data);
  }

  editLevel(key, level){
    this.levels.update(key, level);
  }

}
