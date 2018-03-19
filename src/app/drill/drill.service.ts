import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Drill } from '../interfaces/drill';
import { Subject } from 'rxjs';

@Injectable()
export class DrillService {

  public addedDrill: Subject<any> = new Subject<any>();
  public updatedDrill: Subject<any> = new Subject<any>();
  public deletedDrill: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  getDrills(): Observable<any> {

    return this.http.get('http://192.168.33.10/api/drills');

  }

  getDrill(drillID: number): Observable<any> {

    return this.http.get('http://192.168.33.10/api/drills/' + drillID);

  }

  addDrill(drill: Drill) {

    return this.http.post('http://192.168.33.10/api/drills', drill)
    .map(
      data => {
        this.addedDrill.next(data);
      }

    );

  }

  updateDrill(drill: Drill) {

    return this.http.put('http://192.168.33.10/api/drills/' + drill.id, drill)
    .map(
      data => {

        this.updatedDrill.next(data);

      }

    );

  }

  deleteDrill(drillID: number) {

    return this.http.delete('http://192.168.33.10/api/drills/' + drillID)
      .subscribe(
        data => {
          this.deletedDrill.next(data);
        }
      );

  }

}
