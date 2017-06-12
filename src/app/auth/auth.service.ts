import { Injectable } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthProvider } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth) { 
    this.user = afAuth.authState;
  }

  createUser(email: string, password: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  getCurrentUser(){
    return this.user;
  }

  getCurrentUserID(){

    return this.afAuth.auth.currentUser.uid;

  }

  loginWithGoogle() {

    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  }

  loginWithEmail(email:string, password: string) {

    return this.afAuth.auth.signInWithEmailAndPassword(email, password);

  }

  logout() {

    return this.afAuth.auth.signOut();

  }

}