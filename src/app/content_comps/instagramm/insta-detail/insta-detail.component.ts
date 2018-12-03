import { Component, OnInit } from '@angular/core';
import { DataFetcherService } from '../../../data-fetcher.service';
import { LocationData } from '../../../shared/locationData';
import { LocatorService } from '../../../locator.service';

@Component({
  selector: 'app-insta-detail',
  templateUrl: './insta-detail.component.html',
  styleUrls: ['./insta-detail.component.css']
})
export class InstaDetailComponent implements OnInit {
  public instaData: LocationData[];
  public name: string = "Instagram";
  constructor(
    public dataService: DataFetcherService,
    public locService: LocatorService) {  
     }
  mouseOver(el: LocationData): void{
    this.dataService.activePos.emit(el);
  }

  ngOnInit(): void {
    console.log("insta init");
    this.locService.posEmit.subscribe((res: Coordinates) => {
      let coords = res;
      this.dataService.fetchInsta(coords.latitude,coords.longitude ,5000).subscribe(res => {
        console.log(res)
        this.instaData = res;
        console.log(this.instaData)
      });
    })    
  }

}
