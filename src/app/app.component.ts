import { Component, ViewChild } from '@angular/core';
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


  constructor(public authService: AuthService, private router: Router) {

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
