import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Season } from "./../interfaces/season";

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class SeasonsService {

  public newSeasonSubject = new Subject<any>();
  public newEditSeasonSubject = new Subject<any>();
  seasons: FirebaseListObservable<any>;
  season: FirebaseObjectObservable<any>;

  constructor(
    private db: AngularFireDatabase
  ) { 
      this.seasons = this.db.list('/seasons') as FirebaseListObservable<Season[]>
  }

  getAllSeasons(){
    return this.seasons;
  }

  addSeason(data){
    const seasons = this.db.list('/seasons');
    seasons.push(data);
  }

  editSeason(key, season){
    this.seasons.update(key, season);
  }

}