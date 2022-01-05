import { Injectable } from '@angular/core';
import {Dish} from "../dish";
import {DishService} from "./dish.service";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basketItems: Map<Dish, number> = new Map()
  currency: string = "€"

  constructor() { }

  addToBasket(dish: Dish): void {
    if(this.basketItems.has(dish)) {
      let quantity = this.basketItems.get(dish)
      this.basketItems.delete(dish)
      this.basketItems.set(dish, 1 + (quantity as number))
    }
    else {
      this.basketItems.set(dish, 1)
    }
  }

  removeFromBasket(dish: Dish): void {
    if(this.basketItems.get(dish) == 1) {
      this.basketItems.delete(dish)
    }
    else {
      let quantity = this.basketItems.get(dish)
      this.basketItems.delete(dish)
      this.basketItems.set(dish, (quantity as number) - 1)
    }
  }

  removeAll(dish: Dish) : void {
    this.basketItems.delete(dish)
  }

  getBasketItems(): Map<Dish, number> {
    return this.basketItems
  }
  getCurrency(): string {
    return this.currency
  }

  setCurrency(currency: string) {
    this.currency = currency
  }
}
