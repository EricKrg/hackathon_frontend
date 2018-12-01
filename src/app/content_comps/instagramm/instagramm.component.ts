import { Component, OnInit } from '@angular/core';
import { DataFetcherService } from '../../data-fetcher.service';
import { LocatorService } from '../../locator.service';

@Component({
  selector: 'app-instagramm',
  templateUrl: './instagramm.component.html',
  styleUrls: ['./instagramm.component.css']
})
export class InstagrammComponent implements OnInit {
  name: string = "Instagram"
  total: number = 0;
  content: any[];
  constructor(
    private dataFetcher: DataFetcherService,
    ) { }

  ngOnInit() {
    this.dataFetcher.instaResponse.subscribe((res) => {
      this.content = res;
      this.total = this.content.length
    })
  }

}
