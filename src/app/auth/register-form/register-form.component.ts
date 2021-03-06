import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { AuthService } from "./../auth.service";
import { Router } from "@angular/router";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

function passwordMatcher(c:AbstractControl){
  return c.get('password').value === c.get('confirm').value ? null : { 'nomatch' : true };
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent implements OnInit {
  registerform: FormGroup;
  user: any;
  error: any;

  constructor( 
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { 

    this.registerform = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])],
      confirm : ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])]
    },{ validator: passwordMatcher });
  }

  ngOnInit() {
  }

  onSubmitUser(user){

  }

  showError(error){
    console.log(error)
    let snackBarRef = this.snackBar.open('error');
  }

}
