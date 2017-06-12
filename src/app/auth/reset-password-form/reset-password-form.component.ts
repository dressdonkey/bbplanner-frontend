import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {
  resetform: FormGroup;
  
  constructor(public fb: FormBuilder) { 
    this.resetform = this.fb.group({
      email: ['', Validators.compose([ Validators.required, Validators.email ])]
    })
  }

  ngOnInit() {
  }

}
