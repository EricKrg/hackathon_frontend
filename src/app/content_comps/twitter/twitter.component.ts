import { Component, OnInit } from '@angular/core';
import { DataFetcherService } from '../../data-fetcher.service';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {
  name: string = "Twitter";
  total: number = 0;
  content: any;
  constructor(private dataFetcher: DataFetcherService) { }

  ngOnInit() {
    this.dataFetcher.twitterResponse.subscribe((res) => {
      this.content = res;
      this.total = this.content.length
    })
  }

}
