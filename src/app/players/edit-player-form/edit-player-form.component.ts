import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { MdDialogRef, MdDatepickerModule } from '@angular/material';
import { PlayersService } from "./../players.service";
import { MD_DIALOG_DATA } from '@angular/material';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-player-form',
  templateUrl: './edit-player-form.component.html',
  styleUrls: ['./edit-player-form.component.css']
})
export class EditPlayerFormComponent implements OnInit {
  formplayer: FormGroup;
  key: string;
  showMore: Boolean = false;
  showMoreText: string = "Show More";
  imageUrl: string;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MdDialogRef<EditPlayerFormComponent>, 
    public playersService: PlayersService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {

    this.formplayer = this.fb.group({
      name: ['', Validators.required],
      email : ['', Validators.email],
      active : '',
      data_nascimento : '',
      avatar : '',
      users_id : '',
      mothers_name : ['', Validators.compose([Validators.maxLength(255)])],
      fathers_name : ['', Validators.compose([Validators.maxLength(255)])],
      mothers_name_email : ['', Validators.compose([Validators.maxLength(255)])],
      fathers_name_email : ['', Validators.compose([Validators.maxLength(255)])],
      mothers_name_number : ['', Validators.compose([Validators.maxLength(255)])],
      fathers_name_number : ['', Validators.compose([Validators.maxLength(255)])]
    });
  }

  ngOnInit() {
    this.formplayer.setValue({
      name: this.data.name,
      email: this.data.email,
      active: this.data.active,
      data_nascimento: this.data.data_nascimento,
      avatar: this.data.avatar,
      users_id: this.data.users_id,
      mothers_name : (this.data.mothers_name) ? this.data.mothers_name : '',
      fathers_name : (this.data.fathers_name) ? this.data.fathers_name : '',
      mothers_name_email : (this.data.mothers_name_email) ? this.data.mothers_name_email : '',
      fathers_name_email : (this.data.fathers_name_email) ? this.data.fathers_name_email : '',
      mothers_name_number : (this.data.mothers_name_number) ? this.data.mothers_name_number : '',
      fathers_name_number : (this.data.fathers_name_number) ? this.data.fathers_name_number : ''
    });

    const storageRef = firebase.storage().ref().child(this.data.path);
    storageRef.getDownloadURL().then(url => this.imageUrl = url);

    this.key = this.data.$key;
  }

  onSubmitEditPlayer(player): void {
    this.playersService.editPlayer(this.key, player);
    this.dialogRef.close();
  }

  toggleShowMore(){
    this.showMore = !this.showMore;

    this.showMoreText = (!this.showMore) ? 'Show More' : 'Show Less';
  }

}
