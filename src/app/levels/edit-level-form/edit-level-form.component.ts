import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { LevelsService } from "./../levels.service";
import { AuthService } from "./../../auth/auth.service";
import { Level } from "./../../interfaces/level";

@Component({
  selector: 'app-edit-level-form',
  templateUrl: './edit-level-form.component.html',
  styleUrls: ['./edit-level-form.component.css']
})
export class EditLevelFormComponent implements OnInit {
  level: Level;
  formlevel: FormGroup;
  key: string;
  levelId: number;

  constructor(
    public dialogEditRef: MdDialogRef<EditLevelFormComponent>, 
    public levelsService: LevelsService,
    @Inject(MD_DIALOG_DATA) public data: any,
    public fb: FormBuilder
  ) { 
      this.formlevel = this.fb.group({
        name : ['', Validators.required],
        user_id : ''
      })
  }

  ngOnInit() {
    
    this.formlevel.setValue({
      name : this.data.name,
      user_id : this.data.user_id
    })

    this.levelId = this.data.id;
  }

  onSubmitEditLevel(level): void {
    
    this.levelsService.editLevel(this.levelId, level)
      .subscribe();
    this.dialogEditRef.close();

  }

}
