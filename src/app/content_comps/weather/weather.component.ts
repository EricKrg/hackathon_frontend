import { Component, OnInit } from '@angular/core';
import { Weather } from '../../shared/Weather';
import { LocatorService } from '../../locator.service';
import { DataFetcherService } from '../../data-fetcher.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public weatherData: Weather;
  public name: string = "Twitter";
  constructor(public locService: LocatorService,
              public dataService: DataFetcherService) { }

  ngOnInit(): void {
    console.log("twitter init");
    this.locService.posEmit.subscribe((res: Coordinates) => {
      this.dataService.weatherResponse.subscribe(res => {
        this.weatherData = res[0];
        console.log(this.weatherData)
      });
      
    })
    
  
}
