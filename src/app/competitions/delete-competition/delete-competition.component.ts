import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { CompetitionsService } from './../../competitions/competitions.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { Competition } from "./../../interfaces/competition";

@Component({
  selector: 'app-delete-competition',
  templateUrl: './delete-competition.component.html',
  styleUrls: ['./delete-competition.component.css']
})
export class DeleteCompetitionComponent implements OnInit {
  competition: Competition;

  constructor(
    public dialogRef: MdDialogRef<DeleteCompetitionComponent>, 
    private competitionService: CompetitionsService,
    @Inject(MD_DIALOG_DATA) public data:any
  ) { 
      this.competition = this.data;
  }

  ngOnInit() {
  }

  /**
   * Delete Competition
   * @param id competition id
   */

  onDelete(id: number){
    this.competitionService.deleteCompetition(id)
      .subscribe((data) => {
          
          console.log('Competition Deleted');          

        },
        error => console.log('Problems deleting Competition!')  
      );

    this.dialogRef.close();
  }

}
