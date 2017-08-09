import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userID: any;
  userEmail: any;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {
    
  }

  ngOnInit() {
    /*this.authService.getCurrentUser().subscribe(data => {
      this.userID = data.uid;
      this.userEmail = data.email;
    });*/
    this.userID = this.authService.getCurrentUserID();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}