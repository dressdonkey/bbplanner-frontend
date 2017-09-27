import { Injectable } from '@angular/core';
import { Association } from "./../interfaces/association";
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { Observable } from "rxjs";


@Injectable()
export class AssociationsService {
  public addedAssociation: Subject<any> = new Subject<any>();
  public deletedAssociation: Subject<any> = new Subject<any>();
  public updatedAssociation: Subject<any> = new Subject<any>();

  constructor(private http: Http) { 
    
  }

  /**
   * Get All Associations
   */

  getAllAssociations(): Observable<any>{
    return this.http.get('http://192.168.33.10/api/associations')
      .map(
        (response : Response) => {
          
          return response.json().associations;
          
        }
      );
  }

  /**
   * Create a new competition
   * @param association 
   */

  addAssociation(association: Association){
    
    const body = JSON.stringify(association);
    const hds = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.33.10/api/associations', body, { headers: hds })
      .map(
        (response: Response) => {
          
          this.addedAssociation.next(response.json());
          
        }
      );

  }

  /**
   * Edit Association
   * @param id association id
   * @param association 
   */

  editAssociation(id: number, association: Association){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(association);
    
    return this.http.put('http://192.168.33.10/api/associations/'+id, body, options)
      .map(
        (response: Response) => {
          
          this.updatedAssociation.next(response.json());
          
        }
      );

  }

  /**
   * Delete Association
   * @param id association id
   */

  deleteAssociation(id: number){
    
    return this.http.delete('http://192.168.33.10/api/associations/' + id)
      .map(
        (response: Response) => {
          this.deletedAssociation.next(response.json());
        }
      );
  
  }

}
