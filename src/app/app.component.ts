import { Component, ViewChild } from '@angular/core';
import { AuthService } from "./auth/auth.service";
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  //@ViewChild('loggedIn') isLoggedIn: Boolean;
  //@ViewChild('userName') userName: Boolean;

  seasonID: number = 1; //@TODO Get season default

  constructor(public authService: AuthService, private router: Router) {

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
