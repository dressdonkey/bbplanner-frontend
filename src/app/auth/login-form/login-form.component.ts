import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators, FormGroup } from "@angular/forms";
import { AngularFireModule } from "angularfire2";
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthService } from "./../auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  loginform: FormGroup;
  user: Observable<firebase.User>;
  result: firebase.Promise<any>;

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

    this.authService.loginWithEmail(data.email, data.password)
      .then( data => {
        this.router.navigate(['home']);
      })
      .catch( err => {
        //@TODO
      });
    
    //this.router.navigate(['home']);
  }

  logout() {
    this.result = this.authService.logout();
  }

}
