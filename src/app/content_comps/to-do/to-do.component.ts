import { Component, OnInit } from '@angular/core';
import { DataFetcherService } from '../../data-fetcher.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  name: string = "Things to Visit";
  total: number = 0;
  content: any;
  constructor(private dataFetcher: DataFetcherService) { }

  ngOnInit() {
    this.dataFetcher.poiResponse.subscribe((res) => {
      this.content = res;
      this.total = this.content.length
    })    
  }
}
