import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Practice } from '../interfaces/practice';

@Injectable()
export class PracticesService {
  practices : Array<Practice>;

  constructor(
    private http: HttpClient
  ) { }

  getPractices(seasonID: number): Observable<any> {

    return this.http.get('http://192.168.33.10/api/practices/season/'+seasonID);

  }

  getPractice(practiceID: number): Observable<any>{

    return this.http.get('http://192.168.33.10/api/practices/'+practiceID);
    
  }

  getPracticeDrills(practiceID: number): Observable<any>{

    return this.http.get('http://192.168.33.10/api/practices/drills/'+practiceID);
    
  }

}
