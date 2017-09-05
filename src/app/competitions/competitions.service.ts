import { Injectable } from '@angular/core';
import { Competition } from "./../interfaces/competition";
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class CompetitionsService {
  public addedCompetition: Subject<any> = new Subject<any>();
  public deletedCompetition: Subject<any> = new Subject<any>();
  public updatedCompetition: Subject<any> = new Subject<any>();

  constructor(private http: Http) { 
  }

  getAllCompetitions(): Observable<any>{
    return this.http.get('http://192.168.33.10/api/competitions')
      .map(
        (response : Response) => {
          
          return response.json().competitions;
          
        }
      );
  }

  /**
   * Create a new competition
   * @param competition 
   */

  addCompetition(competition: Competition){
    
    const body = JSON.stringify(competition);
    const hds = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.33.10/api/competitions', body, { headers: hds })
      .map(
        (response: Response) => {
          
          this.addedCompetition.next(response.json());
          
        }
      );

  }

  editCompetition(key, competition){
  }
}
