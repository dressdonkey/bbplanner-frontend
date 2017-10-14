import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Team } from "./../interfaces/team";
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class TeamsService {
  public addedTeam: Subject<any> = new Subject<any>();
  public deletedTeam: Subject<any> = new Subject<any>();
  public updatedTeam: Subject<any> = new Subject<any>();

  constructor(private http: Http) { 
    
  }

  /**
   * Get all the players
   */

  getAllTeams(): Observable<any>{
    return this.http.get('http://192.168.33.10/api/teams')
      .map(
        (response : Response) => {
          
          return response.json().teams;
          
        }
      );
  }

  /**
   * Create new team
   * @param team team data json
   */

  addTeam(team: Team){
    
    const body = JSON.stringify(team);
    const hds = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.33.10/api/teams', body, { headers: hds })
      .map(
        (response: Response) => {
          
          this.addedTeam.next(response.json());
          
        }
      );

  }

  /**
   * 
   * @param id team id
   * @param team team data json
   */

  updateTeam(id: number, team: Team){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(team);
    
    return this.http.put('http://192.168.33.10/api/teams/'+id, body, options)
      .map(
        (response: Response) => {
          
          this.updatedTeam.next(response.json());
          
        }
      );
  }

  /**
   * Delete Team
   * @param id team id
   */

  deleteTeam(id: number){
    
    return this.http.delete('http://192.168.33.10/api/teams/' + id)
      .map(
        (response: Response) => {
          this.deletedTeam.next(response.json());
        }
      );
  
  }

}
