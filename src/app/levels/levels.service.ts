import { Injectable } from '@angular/core';
import { Level } from "./../interfaces/level";
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { Observable } from "rxjs";


@Injectable()
export class LevelsService {
  public addedLevel: Subject<any> = new Subject<any>();
  public deletedLevel: Subject<any> = new Subject<any>();
  public updatedLevel: Subject<any> = new Subject<any>();

  constructor(private http: Http) { 
    
  }

  /**
   * Get All Levels
   */

  getAllLevels(): Observable<any>{
    return this.http.get('http://192.168.33.10/api/levels')
      .map(
        (response : Response) => {
          
          return response.json().levels;
          
        }
      );
  }

  /**
   * Create a new Level
   * @param level 
   */

  addLevel(level: Level){
    
    const body = JSON.stringify(level);
    const hds = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.33.10/api/levels', body, { headers: hds })
      .map(
        (response: Response) => {
          
          this.addedLevel.next(response.json());
          
        }
      );

  }

  /**
   * Edit Level
   * @param id level id
   * @param level 
   */

  editLevel(id: number, level: Level){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(level);
    
    return this.http.put('http://192.168.33.10/api/levels/'+id, body, options)
      .map(
        (response: Response) => {
          
          this.updatedLevel.next(response.json());
          
        }
      );

  }

  /**
   * Delete Level
   * @param id level id
   */

  deleteLevel(id: number){
    
    return this.http.delete('http://192.168.33.10/api/levels/' + id)
      .map(
        (response: Response) => {
          this.deletedLevel.next(response.json());
        }
      );
  
  }

}
