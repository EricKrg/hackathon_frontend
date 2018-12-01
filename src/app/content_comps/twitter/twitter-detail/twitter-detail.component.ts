import { Component, OnInit } from '@angular/core';
import { LocatorService } from '../../../locator.service';
import { DataFetcherService } from '../../../data-fetcher.service';
import { Tweets } from '../../../shared/tweets';

@Component({
  selector: 'app-twitter-detail',
  templateUrl: './twitter-detail.component.html',
  styleUrls: ['./twitter-detail.component.css']
})
export class TwitterDetailComponent implements OnInit {
  public twitterData: Tweets[];
  public name: string = "Twitter";
  constructor(public locService: LocatorService,
              public dataService: DataFetcherService) { }

  ngOnInit() {
    console.log("twitter init");
    this.locService.posEmit.subscribe((res: Coordinates) => {
      let coords = res;
      this.dataService.fetchTwitter(coords.latitude,coords.longitude ,5000).subscribe(res => {
        this.twitterData = res;
        console.log(this.twitterData)
      });
      
    })
    
  
  }

}
