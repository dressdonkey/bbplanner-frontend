import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { Competition } from "./../interfaces/competition";

@Injectable()
export class CompetitionsService {
  competitions: FirebaseListObservable<any>;
  competition: FirebaseObjectObservable<any>;

  constructor(public af: AngularFireDatabase) { 
    this.competitions = this.af.list('/competitions') as FirebaseListObservable<any>;
  }

  getCompetitions(){
    return this.competitions;
  }

  addCompetition(data){
    const competitions = this.af.list('/competitions');
    competitions.push(data);
  }

  editCompetition(key, competition){
    this.competitions.update(key, competition);
  }
}
