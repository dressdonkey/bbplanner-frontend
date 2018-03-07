import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Drill } from '../interfaces/drill';
import { Subject } from 'rxjs';

@Injectable()
export class DrillDiagramService {

  public deletedDiagram: Subject<any> = new Subject<any>();
  public updatedDiagram: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  getDrillDiagrams(idDrill: number): Observable<any> {

    return this.http.get('http://192.168.33.10/api/drills-diagram/' + idDrill);

  }

  updateDrillDiagram(id: number, diagram_drill_note) {

    const body = JSON.stringify(diagram_drill_note);

    return this.http.post('http://192.168.33.10/api/drills-diagram/' + id,
        diagram_drill_note
      )
      .subscribe(
        data => {
          this.updatedDiagram.next(data);
        }
      );

  }

  /**
   * Delete Diagram
   * @param id player id
   */

  deleteDrillDiagram(id: number) {

    return this.http.delete('http://192.168.33.10/api/drills-diagram/' + id)
      .subscribe(
        data => {
          this.deletedDiagram.next(data);
        }
      );

  }

  moveDiagramUp(id: number, drillID: number) {

    return this.http.post('http://192.168.33.10/api/drills-diagram/moveup/' + id, {
      'drill_id' : drillID
    }).subscribe();

  }

  moveDiagramDown(id: number, drillID: number) {

    return this.http.post('http://192.168.33.10/api/drills-diagram/movedown/' + id, {
      'drill_id' : drillID
    }).subscribe();

  }

}
