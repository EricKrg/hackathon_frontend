import { Component, OnInit, EventEmitter } from '@angular/core';
import { Food } from '../../../shared/Food';
import { LocatorService } from '../../../locator.service';
import { DataFetcherService } from '../../../data-fetcher.service';


@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
  public foodData: Food[];
  public name: string = "Food & Drinks";
  public posEmitter: EventEmitter<Food> = new EventEmitter<Food>();
  constructor(public locService: LocatorService,
              public dataService: DataFetcherService) { }

  mouseEnter(el: Food){
    console.log(el)
    this.dataService.activePos.emit(el);

  }

  mouseLeave(el: Food){
    console.log(el)
  }

  ngOnInit() {
    console.log("food init");
    this.locService.posEmit.subscribe((res: Coordinates) => {
      let coords = res;
      this.dataService.fetchFood(coords.latitude,coords.longitude ,5000).subscribe(res => {
        this.foodData = res;
      });
      
    })
    
  
  }


}
