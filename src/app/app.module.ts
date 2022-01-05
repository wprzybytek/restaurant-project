import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { RatingComponent } from './components/rating/rating.component';
import { DishPipePipe } from './pipes/dish-pipe.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { UniquePipe } from './pipes/unique.pipe';
import { BasketComponent } from './components/basket/basket.component';

@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    AddDishComponent,
    RatingComponent,
    DishPipePipe,
    FilterComponent,
    UniquePipe,
    BasketComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
