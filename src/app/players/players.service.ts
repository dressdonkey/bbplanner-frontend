import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Player } from './../interfaces/player';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlayersService {
  public addedPlayer: Subject<any> = new Subject<any>();
  public deletedPlayer: Subject<any> = new Subject<any>();
  public updatedPlayer: Subject<any> = new Subject<any>();

  constructor(private http: Http) {

  }

  /**
   * Get all the players
   */

  getAllPlayers(): Observable<any> {
    return this.http.get('http://192.168.33.10/api/players')
      .map(
        (response: Response) => {

          return response.json().players;

        }
      );
  }

  /**
   * Create new player
   * @param player player data json
   */

  addPlayer(player: Player) {

    const body = JSON.stringify(player);
    const hds = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.33.10/api/players', body, { headers: hds })
      .map(
        (response: Response) => {

          this.addedPlayer.next(response.json());

        }
      );

  }

  /**
   *
   * @param id player id
   * @param player player data json
   */

  updatePlayer(id: number, player: Player) {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(player);

    return this.http.post('http://192.168.33.10/api/players/' + id, body, options)
      .map(
        (response: Response) => {

          this.updatedPlayer.next(response.json());

        }
      );
  }

  /**
   * Delete Player
   * @param id player id
   */

  deletePlayer(id: number) {

    return this.http.delete('http://192.168.33.10/api/players/' + id)
      .map(
        (response: Response) => {
          this.deletedPlayer.next(response.json());
        }
      );

  }

}
