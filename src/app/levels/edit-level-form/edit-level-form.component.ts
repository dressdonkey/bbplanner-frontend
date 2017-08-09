import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { AuthService } from "./../../auth/auth.service";
import { LevelsService } from "./../levels.service";
import { Level } from "./../../interfaces/level";

@Component({
  selector: 'app-edit-level-form',
  templateUrl: './edit-level-form.component.html',
  styleUrls: ['./edit-level-form.component.css']
})
export class EditLevelFormComponent implements OnInit {
  formlevel: FormGroup;
  key: string;

  constructor(
    private fb: FormBuilder,
    public dialogEditRef: MdDialogRef<EditLevelFormComponent>,
    public levelsService: LevelsService,
    public authService: AuthService,
    @Inject(MD_DIALOG_DATA) public data: any) { 
      this.formlevel = this.fb.group({
        name : ['', Validators.required],
        users_id : ''
      });
        
    }

  ngOnInit() {
    this.formlevel.setValue({
      name: this.data.name,
      users_id: this.data.users_id
    })

    this.key = this.data.$key;
  }

  onSubmitEditLevel(level): void{
    this.levelsService.editLevel(this.key, level);
    this.dialogEditRef.close();
  }

}
