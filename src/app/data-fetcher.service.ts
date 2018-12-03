import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocatorService } from './locator.service';


@Injectable({
  providedIn: 'root'
})
export class DataFetcherService {
  instaEndpoint: string = "api/instagram";
  instaResponse: EventEmitter<any> = new EventEmitter<any>();

  twitterEndpoint: string = "api/twitter";
  twitterResponse: EventEmitter<any> = new EventEmitter<any>();

  foodEndpoint: string = "api/googleplacerestaurant"
  foodResponse: EventEmitter<any> = new EventEmitter<any>();

  poiEndpoint: string = "api/googleplacesight"
  poiResponse: EventEmitter<any> = new EventEmitter<any>();

  tlsEndpoint: string = "api/googledistanceroute";
  tlsResponse: EventEmitter<any> = new EventEmitter<any>();

  weatherEndpoint: string = "api/weather";
  weatherResponse: EventEmitter<any> = new EventEmitter<any>();


  activePos: EventEmitter<any> = new EventEmitter<any>();
  route: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient, private locService: LocatorService) {
    this.locService.posEmit.subscribe((res: Coordinates) => {
      this.fetchInsta(res.latitude,res.longitude, 5000).subscribe((res) => {
        this.instaResponse.emit(res);
      });
      this.fetchTwitter(res.latitude,res.longitude,5000).subscribe((res) => {
        this.twitterResponse.emit(res);
        console.log(res)
      })
      this.fetchFood(res.latitude,res.longitude,5000).subscribe((res) => {
        this.foodResponse.emit(res);
        console.log(res)
      })
      this.fetchPoi(res.latitude,res.longitude,5000).subscribe((res) => {
        this.poiResponse.emit(res);
        console.log(res)
      })
      this.fetchTls(res.latitude,res.longitude,5000).subscribe((res) => {
        this.tlsResponse.emit(res);
        console.log(res)
      })
      this.fetchWeather(res.latitude,res.longitude,5000).subscribe((res) => {
        this.weatherResponse.emit(res);
        console.log(res)
      })
      
    })

   }

  fetchInsta(lat: number, lng: number, radius: number): Observable<any> {
    const apiReq = this.instaEndpoint + "?lat=" + lat + "&lng=" + lng + "&rad="+radius;
    console.log(apiReq)
    return this.http.get(apiReq).pipe(
      map(res => res as JSON)
    )
  }

  fetchTwitter(lat: number, lng: number, radius: number): Observable<any> {
    const apiReq = this.twitterEndpoint + "?lat=" + lat + "&lng=" + lng + "&rad="+radius;
    console.log(apiReq)
    return this.http.get(apiReq).pipe(
      map(res => res as JSON)
    )
  }

  fetchFood(lat: number, lng: number, radius: number): Observable<any> {
    const apiReq = this.foodEndpoint + "?lat=" + lat + "&lng=" + lng + "&rad="+radius;
    console.log(apiReq)
    return this.http.get(apiReq).pipe(
      map(res => res as JSON)
    )
  }

  fetchPoi(lat: number, lng: number, radius: number): Observable<any> {
    const apiReq = this.poiEndpoint + "?lat=" + lat + "&lng=" + lng + "&rad="+radius;
    console.log(apiReq)
    return this.http.get(apiReq).pipe(
      map(res => res as JSON)
    )
  }
  fetchTls(lat: number, lng: number, radius: number): Observable<any> {
    const apiReq = this.tlsEndpoint + "?lat=" + lat + "&lng=" + lng + "&rad="+radius;
    console.log(apiReq)
    return this.http.get(apiReq).pipe(
      map(res => res as JSON)
    )
  }
  fetchWeather(lat: number, lng: number, radius: number): Observable<any> {
    const apiReq = this.weatherEndpoint + "?lat=" + lat + "&lng=" + lng + "&rad="+radius;
    console.log(apiReq)
    return this.http.get(apiReq).pipe(
      map(res => res as JSON)
    )
  }
}
