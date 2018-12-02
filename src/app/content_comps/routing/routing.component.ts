import { Component, OnInit, EventEmitter } from '@angular/core';
import { LocatorService } from '../../locator.service';
import { DataFetcherService } from '../../data-fetcher.service';
import { Poi } from '../../shared/Poi';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css']
})
export class RoutingComponent implements OnInit {
  public routingData: Poi[];
  public name: string = "Routing";
  public posEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor(public locService: LocatorService,
              public dataService: DataFetcherService) { }

  mouseEnter(el: Poi){
    console.log(el)
    this.dataService.activePos.emit(el);
  }

  ngOnInit() {
    console.log("route init");
    this.locService.posEmit.subscribe((res: Coordinates) => {
      this.dataService.tlsResponse.subscribe((res) => {
        this.routingData = res
      });
    })
  }
}
