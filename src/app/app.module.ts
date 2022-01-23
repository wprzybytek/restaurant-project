import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";

import { AppComponent } from './app.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { RatingComponent } from './components/rating/rating.component';
import { DishPipePipe } from './pipes/dish-pipe.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { UniquePipe } from './pipes/unique.pipe';
import { BasketComponent } from './components/basket/basket.component';
import { MainComponent } from './components/main/main.component';
import { DishViewComponent } from './components/dish-view/dish-view.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

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
    MainComponent,
    DishViewComponent,
    ReviewsComponent,
    AddReviewComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
