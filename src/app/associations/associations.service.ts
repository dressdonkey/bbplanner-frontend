import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Association } from "./../interfaces/association";

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class AssociationsService {
  public newAssociationSubject = new Subject<any>();
  public newEditAssociationSubject = new Subject<any>();
  associations: FirebaseListObservable<any>;
  association: FirebaseObjectObservable<any>;

  constructor(
    private http: Http,
    private db: AngularFireDatabase
  ) { 
    this.associations = this.db.list('/associations') as FirebaseListObservable<Association[]>
  }

  getAssociations(){
    return this.associations;
  }

  getAssociation(id: number){
    
  }

  addAssociation(data){
    const associations = this.db.list('/associations');
    associations.push(data);
  }

  editAssociation(key, association){
    this.associations.update(key, association);
  }

}
