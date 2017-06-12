import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements OnInit {

  constructor() { }

  levels = [
    {
      name: 'Under 16',
      avatar: 'assets/images/avatar-1.png',
    },
    {
      name: 'Under 18',
      avatar: 'assets/images/avatar-2.png',
    },
    {
      name: 'Under 20',
      avatar: 'assets/images/avatar-3.png',
    }
  ];

  ngOnInit() {
  }

}
