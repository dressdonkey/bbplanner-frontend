import { Injectable } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthProvider } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  result;
  public isAuthenticated = false;
  public email: string = '';
  public uid: string = '';

  constructor(public afAuth: AngularFireAuth) { 
    this.user = afAuth.authState;
  }

  createUser(email: string, password: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  getCurrentUser(){
    return this.user;
  }

  getCurrentUserID(): string{
    return this.uid;

  }

  loginWithEmail(email:string, password: string): firebase.Promise<firebase.User> {

      return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((authState) => {
        return this.storeAuthInfo(authState);
      }).catch((err) => {
        console.log("Error with auth token: " + err, " Clearing cached token..");
      });
  }

  private storeAuthInfo(authState: firebase.User): firebase.User {
    if (authState) {
      this.email = authState.email;
      this.uid = authState.uid;
      this.isAuthenticated = true;
    }

    return authState;
  }

  logout() {

    return this.afAuth.auth.signOut();

  }

}