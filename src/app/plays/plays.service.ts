import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Play } from '../interfaces/play';

@Injectable()
export class PlaysService {

  constructor(
    private http: HttpClient
  ) { }

  getPlays(): Observable<any> {

    return this.http.get('http://192.168.33.10/api/plays');

  }

  getPlay(drillID: number): Observable<any>{

    return this.http.get('http://192.168.33.10/api/plays/'+drillID);
    
  }

}
