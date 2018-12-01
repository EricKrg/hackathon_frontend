import { Component, OnInit } from '@angular/core';
import { DataFetcherService } from '../../data-fetcher.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  name: string = "Food & Drinks";
  total: number = 0;
  content: any;
  constructor(private dataFetcher: DataFetcherService) { }

  ngOnInit() {
    this.dataFetcher.foodResponse.subscribe((res) => {
      this.content = res;
      this.total = this.content.length
    })
    
  }

}
