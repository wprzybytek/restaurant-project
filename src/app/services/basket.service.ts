import { Injectable } from '@angular/core';
import {Dish} from "../dish";

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

  getPortions(): number {
    let portions = 0
    for(let [key, value] of this.basketItems.entries()) {
      portions += value
    }
    return portions
  }

  getPrice(): number {
    let price = 0
    for(let [key, value] of this.basketItems.entries()) {
      price += value * key.price
    }
    return Math.round(price * 100)/100
  }
}
