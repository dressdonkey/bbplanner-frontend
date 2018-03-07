import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PlayersService } from "./../players.service";

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
  playerId: number;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EditPlayerFormComponent>,
    public playersService: PlayersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.formplayer = this.fb.group({
      name: ['', Validators.required],
      email : ['', Validators.email],
      active : '',
      data_nascimento : '',
      avatar : '',
      user_id : '',
      gender_id : '',
      mothers_name : ['', Validators.compose([Validators.maxLength(255)])],
      fathers_name : ['', Validators.compose([Validators.maxLength(255)])],
      mothers_name_email : ['', Validators.compose([Validators.maxLength(255)])],
      fathers_name_email : ['', Validators.compose([Validators.maxLength(255)])],
      mothers_name_number : ['', Validators.compose([Validators.maxLength(255)])],
      fathers_name_number : ['', Validators.compose([Validators.maxLength(255)])],
      phone_number : ['', Validators.compose([Validators.maxLength(255)])]
    });
  }

  ngOnInit() {
    this.formplayer.setValue({
      name: this.data.name,
      email: this.data.email,
      active: this.data.active,
      data_nascimento: this.data.data_nascimento,
      avatar: (this.data.avatar) ? this.data.avatar : '/assets/images/avatar-default.png',
      user_id: this.data.user_id,
      gender_id: this.data.gender_id,
      mothers_name : (this.data.mothers_name) ? this.data.mothers_name : '',
      fathers_name : (this.data.fathers_name) ? this.data.fathers_name : '',
      mothers_name_email : (this.data.mothers_name_email) ? this.data.mothers_name_email : '',
      fathers_name_email : (this.data.fathers_name_email) ? this.data.fathers_name_email : '',
      mothers_name_number : (this.data.mothers_name_number) ? this.data.mothers_name_number : '',
      fathers_name_number : (this.data.fathers_name_number) ? this.data.fathers_name_number : '',
      phone_number : (this.data.phone_number) ? this.data.phone_number : ''
    });

    this.playerId = this.data.id;
  }

  onSubmitEditPlayer(player): void {

    this.playersService.updatePlayer(this.playerId, player)
      .subscribe();
    this.dialogRef.close();

  }

  toggleShowMore() {
    this.showMore = !this.showMore;

    this.showMoreText = (!this.showMore) ? 'Show More' : 'Show Less';
  }

}
