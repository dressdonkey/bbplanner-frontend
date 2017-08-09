import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Player } from "./../interfaces/player";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class PlayersService {


  constructor(private http: Http) { 
    
  }

  getAllPlayers(): Observable<any>{
    return this.http.get('http://192.168.33.10/api/players')
      .map(
        (response : Response) => {
          
          return response.json().players;
          
        }
      );
  }

  addPlayer(player: Player){
    
  }

  editPlayer(key, player: Player){
    
  }

}
