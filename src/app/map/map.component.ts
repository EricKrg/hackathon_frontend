import { Component, OnInit, EventEmitter } from '@angular/core';
import {latLng, tileLayer, map, Map, locationfound, geoJSON, polygon, circle, Path, DomEvent, DomUtil, control, InteractiveLayerOptions,
  CRS, Layer, GeoJSON, layerGroup, FeatureGroup, LayerGroup, LeafletMouseEvent, popup, circleMarker, TileLayer, latLngBounds,
  LatLng, GeoJSONOptions, SVG} from 'leaflet';
import { LocatorService } from '../locator.service';
import { DataFetcherService } from '../data-fetcher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../shared/Food';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: Map;
  private pos: number[];
  public instaData; 
  private geojsonLayers: LayerGroup = layerGroup();
  

  // base maps
  cartoDB_DarkMatter: TileLayer = tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
  });
  cartoDB_Voyager: TileLayer = tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
  });

  baseMaps: any = {
    'light' : this.cartoDB_Voyager,
    'dark' : this.cartoDB_DarkMatter,
    
    };

  overlayMaps: any = {
  };

  locateCircle(e): void {
    this.pos = e.latLng;
    let radius = e.accuracy / 2;
    circle(e.latlng, radius).addTo(this.map);
  }

  constructor(
      private datafetcher: DataFetcherService,
      private router: Router,
      private locator: LocatorService
  ) { }

  ngOnInit(): void {
    console.log("map init")
    // inital map creation
    this.map = this.map = map('map', {
      center: [52.5, 13.4],
      zoom: 14,
      renderer: new SVG( {
        padding: 1
      } ),
      layers: [this.cartoDB_Voyager]
    });
    control.layers(this.baseMaps).addTo(this.map);
    
    this.map.locate({setView: true, maxZoom: 16});

    this.map.on('locationfound',(e) => {
      let radius = e.accuracy / 2;
      circle(e.latlng,{color: 'red',fillOpacity: 0.5,radius: radius }).addTo(this.map);
    });

    //-----map init


    // insta 
    if(this.router.url === "/instagram"){
      this.datafetcher.instaResponse.subscribe((res) => {
        this.instaData = res;
        for (const el of res) {
          console.log(el)
          console.log(el["lng"])
          let insta = circle([el["lat"],el["lng"]],{color: '#8a3ab9',fillOpacity: 0.5 }).bindPopup(el.name);
          insta.addTo(this.map);
        }
      })
    }
    // twitter
    if(this.router.url === "/twitter"){
      this.locator.posEmit.subscribe((res: Coordinates) => {
        console.log(res.longitude)
        let tweet = circle([res.latitude,res.longitude],{color: '#1dcaff',fillOpacity: 0.5, radius: 5000 })
        tweet.addTo(this.map);
        this.map.setView([res.latitude,res.longitude],12)
      })
    }
  
    //fooood
    if(this.router.url === "/food"){
      this.locator.posEmit.subscribe((res: Coordinates) => {
        console.log(res.longitude)
      this.datafetcher.foodResponse.subscribe((res: Food[]) => {
        for (const food of res) {
          console.log(food)
          let foodCircle = circle([food.lat,food.lng],{color: '#ffc107 ',fillOpacity: 0.5, radius: 10 }).bindPopup(food.name);
          foodCircle.addTo(this.map);
        }
        })
        
      })
      this.datafetcher.activePos.subscribe((res) => { 
        console.log(res)
        this.geojsonLayers.clearLayers();
        let foodCircle = circle([res.lat,res.lng],{color:"red",fillOpacity: 0.5, radius: 30 }).bindPopup(res.name);
        foodCircle.addTo(this.geojsonLayers)
        this.geojsonLayers.addTo(this.map)
        this.map.setView([res.lat,res.lng],16)
      });
    }
  

 
    
  }

}
