import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Practice } from '../interfaces/practice';
import { Subject } from 'rxjs';

@Injectable()
export class PracticesService {
  practices: Array<Practice>;

  public deletedDrill: Subject<any> = new Subject<any>();
  public updatedDrillPractice: Subject<any> = new Subject<any>();
  public addedDrillPractice: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  getPractices(seasonID: number): Observable<any> {

    return this.http.get('http://192.168.33.10/api/practices/season/' + seasonID);

  }

  getPractice(practiceID: number): Observable<any> {

    return this.http.get('http://192.168.33.10/api/practices/' + practiceID);

  }

  getPracticeDrills(practiceID: number): Observable<any> {

    return this.http.get('http://192.168.33.10/api/practices/drills/' + practiceID);

  }

  deleteDrillFromPractice(drillID: number) {

    return this.http.delete('http://192.168.33.10/api/practices/' + drillID)
      .subscribe(
        data => {
          this.deletedDrill.next(data);
        }
      );

  }

  editDrillFromPractice(drill: any) {

    return this.http.post('http://192.168.33.10/api/practices/edit/' + drill.id, {
      'duration' : drill.duration,
      'id' : drill.id
    }).subscribe(
      data => {
        this.updatedDrillPractice.next(data);
      }
    );

  }

  moveDiagramUp(position: number, practiceID: number, drillID: number): Observable<any> {

    return this.http.post('http://192.168.33.10/api/practices/moveup/' + position, {
      'practiceID' : practiceID,
      'drillID' : drillID
    });

  }

  moveDiagramDown(position: number, practiceID: number, drillID: number): Observable<any> {

    return this.http.post('http://192.168.33.10/api/practices/movedown/' + position, {
      'practiceID' : practiceID,
      'drillID' : drillID
    });

  }

  addDrillToPractice(drillID: number, practiceID: number) {
    return this.http.post('http://192.168.33.10/api/practices/add-drill/' + drillID, {
      'practiceID' : practiceID
    }).subscribe(
      data => {
        this.addedDrillPractice.next(data);
      }
    );
  }

}
