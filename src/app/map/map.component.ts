import { Component, OnInit, EventEmitter } from '@angular/core';
import {latLng, Leaflet ,tileLayer, map, Map, locationfound, geoJSON, polygon, circle, Path, DomEvent, DomUtil, control, InteractiveLayerOptions,
  CRS, Layer, GeoJSON, layerGroup, FeatureGroup, LayerGroup, LeafletMouseEvent, popup, circleMarker, TileLayer, latLngBounds,
  LatLng, GeoJSONOptions, SVG} from 'leaflet';

import 'leaflet-routing-machine';
import { LocatorService } from '../locator.service';
import { DataFetcherService } from '../data-fetcher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../shared/Food';
import { Poi } from '../shared/Poi';

declare var L: Leaflet;

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
  private route;
  

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
  goto(): void {
    this.datafetcher.activePos.subscribe((res) => { 
      console.log(res)
      this.geojsonLayers.clearLayers();
      let poiCircle = circle([res.lat,res.lng],{color:"#00C9A7",fillOpacity: 0.5, radius: 30 }).bindPopup(res.name);
      poiCircle.addTo(this.geojsonLayers)
      this.geojsonLayers.addTo(this.map)
      this.map.setView([res.lat,res.lng],16)
    });
  }
  addInsta(): void {
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
  addTwitter(): void {
    this.locator.posEmit.subscribe((res: Coordinates) => {
      console.log(res.longitude)
      let tweet = circle([res.latitude,res.longitude],{color: '#1dcaff',fillOpacity: 0.1, radius: 5000 })
      tweet.addTo(this.map);
      this.map.setView([res.latitude,res.longitude],11)
    for(let i = 0; i < 30; i++){
      let a= Math.random()*2*Math.PI;
      let r = 0.04 * Math.sqrt(Math.random())
      let x = r * Math.cos(a);
      let y = r * Math.sin(a);
      let tweetRand = circle([res.latitude+ x,res.longitude + y],{color: '#1dcaff',fillOpacity: 1, radius: 5 })
      tweetRand.addTo(this.map);
    }
    })
  }
  addFood(): void {
    this.datafetcher.foodResponse.subscribe((res: Food[]) => {
      for (const food of res) {
        console.log(food)
        let foodCircle = circle([food.lat,food.lng],{color: '#ffc107 ',fillOpacity: 0.5, radius: 10 }).bindPopup(food.name);
        foodCircle.addTo(this.map);
      }
      })
  }
  addPoi(): void {
    this.datafetcher.poiResponse.subscribe((res: Poi[]) => {
      for (const p of res) {
        let poiCircle = circle([p.lat,p.lng],{color: '#17a2b8',fillOpacity: 0.5, radius: 10 }).bindPopup(p.name);
        poiCircle.addTo(this.map);
      }
      })
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
    console.log(this.router.url)
    if(this.router.url === "/"){
      this.addInsta();
      this.addTwitter();
      this.addFood();
      this.addPoi();
      }
    // insta 
    if(this.router.url === "/instagram"){
      this.addInsta()
      this.goto();
    }
    // twitter
    if(this.router.url === "/twitter"){
      this.addTwitter()
    }
  
    //fooood
    if(this.router.url === "/food"){
      this.addFood();
      this.goto();
      // route to --> make fun out of this mess
      this.datafetcher.route.subscribe((res: Food) => { 
        if(res){
          let aPos: Coordinates = this.locator.getPos()
          if(this.route){ this.route.spliceWaypoints(0, 2);}
          this.route = L.Routing.control({
            waypoints: [[aPos.latitude,aPos.longitude],[res.lat,res.lng]],
              router : L.Routing.mapbox('pk.eyJ1IjoiZXJpY2tyZyIsImEiOiJjanA2NWo5czExNnVrM2tyd21naXB5bzEyIn0.C6tFWXLcr_6zibH_uDoL6A'),
          }).addTo(this.map);
        }
      })

    }
    // pois
    if(this.router.url === "/poi"){
      this.addPoi()
      this.goto()
      // route to
      this.datafetcher.route.subscribe((res: Poi) => { 
        if(res){
          let aPos: Coordinates = this.locator.getPos()
          if(this.route){ this.route.spliceWaypoints(0, 2);}
          this.route = L.Routing.control({
            waypoints: [[aPos.latitude,aPos.longitude],[res.lat,res.lng]],
              router : L.Routing.mapbox('pk.eyJ1IjoiZXJpY2tyZyIsImEiOiJjanA2NWo5czExNnVrM2tyd21naXB5bzEyIn0.C6tFWXLcr_6zibH_uDoL6A'),
          }).addTo(this.map);
        }
      })
    }

  if(this.router.url =="/routing"){
    this.datafetcher.tlsResponse.subscribe((res: Poi[]) => {
      let temp= [];
      for (const p of res) {
        temp.push([p.lat, p.lng]);
        let poiCircle = circle([p.lat,p.lng],{color: '#eb5424', fillOpacity: 1, radius: 30 }).bindPopup(p.name);
        poiCircle.addTo(this.map)
      }      
      L.Routing.control({
        waypoints: temp,
          router : L.Routing.mapbox('pk.eyJ1IjoiZXJpY2tyZyIsImEiOiJjanA2NWo5czExNnVrM2tyd21naXB5bzEyIn0.C6tFWXLcr_6zibH_uDoL6A'),
      }).addTo(this.map); 
      this.goto();
    })

    //this.map.removeControl(routingControl);
  }
  }

}
