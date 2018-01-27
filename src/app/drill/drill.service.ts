import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Drill } from '../interfaces/drill';
import { Subject } from 'rxjs';
import { log } from 'util';

@Injectable()
export class DrillService {

  public addedDrill: Subject<any> = new Subject<any>();
  
  constructor(
    private http: HttpClient
  ) { }

  getDrills(): Observable<any> {

    return this.http.get('http://192.168.33.10/api/drills');

  }

  getDrill(drillID: number): Observable<any>{

    return this.http.get('http://192.168.33.10/api/drills/'+drillID);
    
  }

  addDrill(drill: Drill){
    
    return this.http.post('http://192.168.33.10/api/drills', drill)
    .map(
      data => {
        console.log(data);
        this.addedDrill.next(data);
      }
      
    );

  }

}
