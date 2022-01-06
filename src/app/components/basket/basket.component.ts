import { Component, OnInit } from '@angular/core';
import {BasketService} from "../../services/basket.service";
import {Dish} from "../../dish";
import {CurrencyService} from "../../services/currency.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basketItems!: Map<Dish, number>

  constructor(public basketService: BasketService, public currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.basketItems = this.basketService.getBasketItems()
  }

  getCurrency():string {
    return this.currencyService.getCurrency()
  }
}
