import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "./../auth/auth.service";
import { MdSidenav } from '@angular/material';
import { Router } from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input('userName') userName: string;
  @Input('loggedIn') isLoggedIn: Boolean;

  constructor(private authService:AuthService, private router: Router) { 
    
  }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
