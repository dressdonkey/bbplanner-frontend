import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  result;
  public isAuthenticated = false;
  public email: string = '';
  public uid: string = '';

  constructor() { 
    
  }

  createUser(email: string, password: string){
    
  }

  getUser(){
    
  }

  logout() {

    

  }

}