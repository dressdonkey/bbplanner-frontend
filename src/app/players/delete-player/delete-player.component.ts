import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MdDatepickerModule } from '@angular/material';
import { PlayersService } from './../../players/players.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { Player } from "./../../interfaces/player";

@Component({
  selector: 'app-delete-player',
  templateUrl: './delete-player.component.html',
  styleUrls: ['./delete-player.component.css']
})
export class DeletePlayerComponent implements OnInit {
  player: Player;

  constructor(
    public dialogRef: MdDialogRef<DeletePlayerComponent>, 
    private playerService: PlayersService,
    @Inject(MD_DIALOG_DATA) public data: any) { 

      this.player = this.data;
           
    }

  ngOnInit() {
  }

  /**
   * Delete Player
   * @param id player id
   */

  onDelete(id: number){

    this.playerService.deletePlayer(id)
      .subscribe((data) => {
          
          console.log('Player Deleted');          

        },
        error => console.log('Problems deleting Player!')  
      );

    this.dialogRef.close();

  }
}
