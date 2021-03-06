import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstaDetailComponent } from './content_comps/instagramm/insta-detail/insta-detail.component';
import { HomeComponent } from './content_comps/home/home.component';
import { TwitterDetailComponent } from './content_comps/twitter/twitter-detail/twitter-detail.component';
import { FoodDetailComponent } from './content_comps/food/food-detail/food-detail.component';
import { ToDoDetailComponent } from './content_comps/to-do/to-do-detail/to-do-detail.component';
import { RoutingComponent } from './content_comps/routing/routing.component';

const appRoutes = [
    // main routes
    {path: '', component: HomeComponent},
    {path: 'instagram', component: InstaDetailComponent},
    {path: 'twitter', component: TwitterDetailComponent},
    {path: 'food', component: FoodDetailComponent},
    {path: 'poi', component: ToDoDetailComponent},
    {path: 'routing', component: RoutingComponent},

]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    exports: [RouterModule]
})


export class AppRoutingModule {

}