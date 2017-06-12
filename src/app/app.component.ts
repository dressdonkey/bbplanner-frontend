import { Component, ViewChild } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from "./auth/auth.service";
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('loggedIn') isLoggedIn: Boolean;
  @ViewChild('userName') userName: Boolean;

  user: Observable<firebase.User>;

  constructor(public authService: AuthService, private router: Router) {
    authService.afAuth.auth.onAuthStateChanged(user => {
      if(user){
        this.userName = user.uid;
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    });

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
