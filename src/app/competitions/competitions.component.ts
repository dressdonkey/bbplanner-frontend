import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  constructor() { }

  competitions = [
    {
      name: 'Under 20 Mens World Championship',
      avatar: 'assets/images/avatar-1.png',
    },
    {
      name: 'Under 18 Mens World Championship',
      avatar: 'assets/images/avatar-2.png',
    },
    {
      name: 'Under 20 Mens World Championship',
      avatar: 'assets/images/avatar-3.png',
    }
  ];

  ngOnInit() {
  }

}
