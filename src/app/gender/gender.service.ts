import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class GenderService {

  constructor(private http: Http) { }

  getAllGenders(): Observable<any>{
    return this.http.get('http://192.168.33.10/api/genders')
      .map(
        (response : Response) => {
          
          return response.json().genders;
          
        }
      );
  }

}
