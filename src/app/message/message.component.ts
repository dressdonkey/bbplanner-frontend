import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message:string = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { 

  }

  ngOnInit() {
    this.message = this.data;
  }

}
