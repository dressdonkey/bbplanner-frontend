import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class TeamsService {
  teams: FirebaseListObservable<any>;

  constructor(
    public http: Http,
    public af: AngularFireDatabase
  ) { 
    this.teams = this.af.list('/teams') as FirebaseListObservable<any>;
  }

  getTeams(){
    return this.teams;
  }

  addTeam(team){
    const teams = this.af.list('/teams');
    teams.push(team);
  }

  editTeam(key, team){
    this.teams.update(key, team);
  }
}
