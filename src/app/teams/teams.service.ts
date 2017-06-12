import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class TeamsService {
  public newTeamSubject = new Subject<any>();
  public newEditTeamSubject = new Subject<any>();

  constructor(
    public http: Http,
    private db: AngularFireDatabase
  ) { }

  getTeams(){
    //return this.http.get('data/teams.json')
    //.map(res => res.json());
    
    return this.db.list('/teams');
  }

  addTeam(data){
    data.users_id = 1;
    this.newTeamSubject.next(data);
  }

  editTeam(data){
    
  }
}
