import { Component, OnInit } from '@angular/core';
import {BasketService} from "../../services/basket.service";
import {Dish} from "../../dish";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basketItems!: Map<Dish, number>

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketItems = this.basketService.getBasketItems()
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

  getCurrency():string {
    return this.basketService.getCurrency()
  }
}
