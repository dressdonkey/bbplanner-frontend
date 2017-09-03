import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdDatepickerModule } from '@angular/material';
import { PlayersService } from './../../players/players.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators, FormGroup } from "@angular/forms";
import { Player } from "./../../interfaces/player";

@Component({
  selector: 'app-create-player-form',
  templateUrl: './create-player-form.component.html',
  styleUrls: ['./create-player-form.component.css']
})

export class CreatePlayerFormComponent implements OnInit {
  formplayer: FormGroup;
  player: Player;
  showMore: Boolean = false;
  showMoreText: string = "Show More";

  constructor(
    public dialogRef: MdDialogRef<CreatePlayerFormComponent>, 
    public playersService: PlayersService,
    public fb: FormBuilder
  ) { 

    this.formplayer = this.fb.group({
      name: ['', Validators.required],
      email : ['', Validators.email],
      active : '',
      data_nascimento : '',
      avatar : '',
      mothers_name : ['', Validators.compose([Validators.maxLength(255)])],
      fathers_name : ['', Validators.compose([Validators.maxLength(255)])],
      mothers_name_email : ['', Validators.compose([Validators.maxLength(255)])],
      fathers_name_email : ['', Validators.compose([Validators.maxLength(255)])],
      mothers_name_number : ['', Validators.compose([Validators.maxLength(255)])],
      fathers_name_number : ['', Validators.compose([Validators.maxLength(255)])]
    });
    
  }

  ngOnInit() {
  }

  onSubmitCreatePlayer(player): void {

    if(player.data_nascimento != '')
      player.data_nascimento = this.convertDate(player.data_nascimento);

    //player.avatar = 'assets/images/avatar-2.png'; //@TODO - Find a default image
    player.user_id = 1 // @TODO - modify to dynamic user - logged in user
    player.gender_id = 1

    this.playersService.addPlayer(player)
      .subscribe(
        //data => this.players = data,
        //error => this.error = error.statusText
      );
    
    this.formplayer.reset({
      name : '',
      email : ''
    });

    this.dialogRef.close();
    
  }

  toggleShowMore(){
    this.showMore = !this.showMore;

    this.showMoreText = (!this.showMore) ? 'Show More' : 'Show Less';
  }

  convertDate(dataToConvert){
    return dataToConvert.getFullYear() + '-' + dataToConvert.getMonth() + '-'+ dataToConvert.getDay();
  }

}
