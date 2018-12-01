import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tripadvisor',
  templateUrl: './tripadvisor.component.html',
  styleUrls: ['./tripadvisor.component.css']
})
export class TripadvisorComponent implements OnInit {
  name: string = "Tripadvisor";
  total: number = 0;
  constructor() { }

  ngOnInit() {
  }

}
