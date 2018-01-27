import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AuthService } from "./../auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  loginform: FormGroup;

  constructor( 
    public fb: FormBuilder,
    public authService: AuthService,
    private router:Router
  ) { 
      this.loginform = this.fb.group({
        email: ['el.estebes@gmail.com', Validators.compose([Validators.email, Validators.required])],
        password : ['xpto2000', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])]
      });
  }

  ngOnInit() {
  }

  loginWithEmail(data) {

  }

  logout() {
    
  }

}
