import { Injectable, EventEmitter } from '@angular/core';
import { Map, map, SVG } from 'leaflet';
@Injectable({
  providedIn: 'root'
})
export class LocatorService {
  pos: Coordinates;
  posEmit: EventEmitter<any> = new EventEmitter<any>();

  getPos(){
    return this.pos;
  }
  constructor() {
    navigator.geolocation.getCurrentPosition((p) => {
      this.pos = p["coords"];
      this.posEmit.emit(this.pos);
      console.log(this.pos);
    })
   }
}
