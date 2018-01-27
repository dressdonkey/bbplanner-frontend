import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Season } from "./../interfaces/season";
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class SeasonsService {
  public addedSeason: Subject<any> = new Subject<any>();
  public updatedSeason: Subject<any> = new Subject<any>();

  constructor(private http: Http) { 
    
  }

  /**
   * Get all the seasons
   */

  getAllSeasons(): Observable<any>{
    return this.http.get('http://192.168.33.10/api/seasons')
      .map(
        (response : Response) => {
          
          return response.json().seasons;
          
        }
      );
  }

  /**
   * Get a specific season
   * @param id season id
   */

  getDefaultSeason(user_id: number): Observable<any>{
    return this.http.get('http://192.168.33.10/api/seasons/'+user_id)
    .map(
      (response : Response) => {
        
        return response.json();
        
      }
    );
  }

  /**
   * Create new season
   * @param season season data json
   */

  addSeason(season: Season){
    
    const body = JSON.stringify(season);
    const hds = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.33.10/api/seasons', body, { headers: hds })
      .map(
        (response: Response) => {
          
          this.addedSeason.next(response.json());
          
        }
      );

  }

  /**
   * 
   * @param id season id
   * @param season season data json
   */

  updateSeason(id: number, season: Season){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(season);
    
    return this.http.put('http://192.168.33.10/api/seasons/'+id, body, options)
      .map(
        (response: Response) => {
          
          this.updatedSeason.next(response.json());
          
        }
      );
  }

}
