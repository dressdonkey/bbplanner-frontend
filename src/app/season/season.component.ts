import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { GenderService } from "./../gender/gender.service";
import { SeasonService } from "./../season/season.service";
import { Season } from "./../interfaces/season";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from 'app/message/message.component';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})

export class SeasonComponent implements OnInit {
  @Input() message: string;
  
  errorMsg: any;

  formSeason: FormGroup;
  season: Season;
  genders: Array<any>;

  constructor(
    private _formBuilder: FormBuilder, 
    public seasonService: SeasonService,
    public genderService: GenderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.formSeason = this._formBuilder.group({
      name: [''],
      team: [''],
      association: [''],
      level: [''],
      gender_id: ['']
    });

    this.genderService.getAllGenders()
      .subscribe(data => {
        
        this.genders = data; 

      },err => {
        console.log('ERROR');
      }
    );

    
  }

  closeAlert(){
    this.errorMsg = '';
  }

  onSubmitSeason(season: Season){

    season.user_id = 1 // @TODO - modify to dynamic user - logged in user

    this.seasonService.createFirstSeason(season)
      .subscribe(
        
        data => {

            this.router.navigate(['/home']);
          
        },
        err  => {
          
          if(err.status === 422){

            this.snackBar.openFromComponent(MessageComponent, {
              duration: 5000,
              data: 'All fields must be filled!'
            });

          }

        }
        
      );
    }
}
