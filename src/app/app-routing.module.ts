import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {DishesComponent} from "./components/dishes/dishes.component";
import {BasketComponent} from "./components/basket/basket.component";
import {AddDishComponent} from "./components/add-dish/add-dish.component";
import {DishViewComponent} from "./components/dish-view/dish-view.component";
import {SignupComponent} from "./components/signup/signup.component";
import {SigninComponent} from "./components/signin/signin.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'menu', component: DishesComponent},
  {path: 'add', component: AddDishComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: BasketComponent, canActivate: [AuthGuard]},
  {path: 'menu/:id', component: DishViewComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
