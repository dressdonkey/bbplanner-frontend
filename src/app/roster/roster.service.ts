import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from "rxjs";

@Injectable()
export class RosterService {

  constructor(
    private http: Http
  ) { }

  getRoster($roster_id: number){

    return this.http.get('http://192.168.33.10/api/rosters/'+$roster_id)
      .map(
        (response: Response) => {

          return response.json().roster;

        }
      );
  }
}
