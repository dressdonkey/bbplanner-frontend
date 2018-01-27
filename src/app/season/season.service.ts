import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Season } from "./../interfaces/season";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SeasonService {
  public addedFirstSeason: Subject<any> = new Subject<any>();

  constructor(private http: Http) { 

  }

  createFirstSeason(season: Season){
    const body = JSON.stringify(season);
    const hds = new Headers({'Content-Type': 'application/json'}); 
    return this.http.post('http://192.168.33.10/api/seasons/first', body, { headers: hds })
      .map( 
        response => {
            return response.json();
        } 
      )
  }

}
