import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { CreateSeasonFormComponent } from './create-season-form/create-season-form.component';
import { EditSeasonFormComponent } from './edit-season-form/edit-season-form.component';
import { SeasonsService } from './../seasons/seasons.service';
import { Season } from "./../interfaces/season";

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})

export class SeasonsComponent implements OnInit {
  seasons: Array<any>;
  error: string;

  constructor(
    private dialog: MdDialog, 
    private dialogedit: MdDialog, 
    private seasonsService: SeasonsService
  ) { }

  ngOnInit() {
    this.seasonsService.getAllSeasons()
      .subscribe(
        data => this.seasons = data,
        error => this.error = error.statusText
      )
      console.log(this.seasons);
      
    this.seasonsService.newSeasonSubject.subscribe(
      data => this.seasons.push(data)
    )

    this.seasonsService.newEditSeasonSubject.subscribe(
      (data) => {
        this.seasons[data.id-1] = data;
      }
    )
  }

  private openCreateSeasonFormDialog() {
    let dialogRef = this.dialog.open(CreateSeasonFormComponent, {
      width: '500px',
    });
  }

  private openEditSeasonFormDialog(key, season: Season) {

    let dialogEditRef = this.dialogedit.open(EditSeasonFormComponent, {
      width: '500px',
      data: season
    });
  }
  
}
