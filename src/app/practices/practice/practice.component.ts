import { Component, OnInit } from '@angular/core';
import { PracticesService} from './../practices.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Practice } from 'app/interfaces/practice';
import { Drill } from 'app/interfaces/drill';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
  practice: Practice;
  drills: Array<Drill>;
  cols: number = 1;
  rowheight: number = 400;
  practiceID: number;

  constructor(
    private practicesService: PracticesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.practiceID = params['id'];

      this.practicesService.getPractice(params['id'])
        .subscribe(
          data => {

            this.practice = data.practice;
            this.drills =  data.drills;

            console.log(data);

          },
          err  => {

            if (err.status === 422) {

              /*this.snackBar.openFromComponent(MessageComponent, {
                duration: 5000,
                data: 'Problems getting season!'
              });*/

            }

          }

        );

    });
  }

}
