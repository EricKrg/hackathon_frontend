import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TwitterComponent } from './content_comps/twitter/twitter.component';
import { TripadvisorComponent } from './content_comps/tripadvisor/tripadvisor.component';
import { FoodComponent } from './content_comps/food/food.component';
import { ToDoComponent } from './content_comps/to-do/to-do.component';
import { MapComponent } from './map/map.component';
import { AirbnbComponent } from './content_comps/airbnb/airbnb.component';
import { InstagrammComponent } from './content_comps/instagramm/instagramm.component';
import { DataFetcherService } from './data-fetcher.service';
import { InstaDetailComponent } from './content_comps/instagramm/insta-detail/insta-detail.component';
import { HomeComponent } from './content_comps/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LocatorService } from './locator.service';
import { TwitterDetailComponent } from './content_comps/twitter/twitter-detail/twitter-detail.component';
import { FoodDetailComponent } from './content_comps/food/food-detail/food-detail.component';
import { ToDoDetailComponent } from './content_comps/to-do/to-do-detail/to-do-detail.component';
import { RoutingComponent } from './content_comps/routing/routing.component';
import { WeatherComponent } from './content_comps/weather/weather.component';

@NgModule({
  declarations: [
    AppComponent,
    TwitterComponent,
    TripadvisorComponent,
    FoodComponent,
    ToDoComponent,
    MapComponent,
    AirbnbComponent,
    InstagrammComponent,
    InstaDetailComponent,
    HomeComponent,
    TwitterDetailComponent,
    FoodDetailComponent,
    ToDoDetailComponent,
    RoutingComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DataFetcherService, LocatorService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
