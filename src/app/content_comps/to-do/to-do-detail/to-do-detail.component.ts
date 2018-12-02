import { Component, OnInit, EventEmitter } from '@angular/core';
import { Poi } from '../../../shared/Poi';
import { LocatorService } from '../../../locator.service';
import { DataFetcherService } from '../../../data-fetcher.service';

@Component({
  selector: 'app-to-do-detail',
  templateUrl: './to-do-detail.component.html',
  styleUrls: ['./to-do-detail.component.css']
})
export class ToDoDetailComponent implements OnInit {
  public poiData: Poi[];
  public name: string = "Things to visit";
  public posEmitter: EventEmitter<Poi> = new EventEmitter<Poi>();
  constructor(public locService: LocatorService,
              public dataService: DataFetcherService) { }

  mouseEnter(el: Poi){
    console.log(el)
    this.dataService.activePos.emit(el);
  }
  mouseClick(el:Poi){
    console.log("click")
    this.dataService.route.emit(el)
  }

  ngOnInit() {
    console.log("food init");
    this.locService.posEmit.subscribe((res: Coordinates) => {
      let coords = res;
      this.dataService.fetchPoi(coords.latitude,coords.longitude ,5000).subscribe(res => {
        this.poiData = res;
      });
    })
  }
}
