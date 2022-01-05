import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {DishesComponent} from "./components/dishes/dishes.component";
import {BasketComponent} from "./components/basket/basket.component";
import {AddDishComponent} from "./components/add-dish/add-dish.component";

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'menu', component: DishesComponent},
  {path: 'add', component: AddDishComponent},
  {path: 'cart', component: BasketComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
