import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-airbnb',
  templateUrl: './airbnb.component.html',
  styleUrls: ['./airbnb.component.css']
})
export class AirbnbComponent implements OnInit {
  name: string = "AirBnB"
  total: number = 0;
  constructor() { }

  ngOnInit() {
  }

}
