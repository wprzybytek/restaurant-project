import { Component, OnInit } from '@angular/core';
import {DishService} from "../../services/dish.service";
import {Dish} from "../../dish";
import {ActivatedRoute} from "@angular/router";
import {CurrencyService} from "../../services/currency.service";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-dish-view',
  templateUrl: './dish-view.component.html',
  styleUrls: ['./dish-view.component.css']
})
export class DishViewComponent implements OnInit {
  dish!: Dish
  dishCopy!: Dish
  dishPhotos: string[] = []
  activePath: number = 0
  currency: string = ''

  constructor(private route: ActivatedRoute,
              private dishService: DishService,
              private currencyService: CurrencyService,
              private basketService: BasketService) { }

  ngOnInit(): void {
    this.dish = this.dishService.getDishById(this.route.snapshot.paramMap.get('id'), false)
    this.dishCopy = this.dishService.getDishById(this.route.snapshot.paramMap.get('id'), true)
    this.dishPhotos = [`${this.dish.images}/main.jpg`,
      `${this.dish.images}/1.jpg`,
      `${this.dish.images}/2.jpg`]
    this.currency = this.currencyService.getCurrency()
  }

  changePhoto(direction: number): void {
    this.activePath = (this.activePath + direction + this.dishPhotos.length)%this.dishPhotos.length
  }

  toString(array: string[]): string {
    let desc = ''
    array.forEach(elem => {
      desc += elem + ' '
    })
    return desc
  }

  getRating(): number {
    return Math.round((this.dish.rating/this.dish.reviews)*10)/10
  }

  setRating(): void {
    this.dishService.setRating(this.dish)
  }
  addToBasket(dish: Dish): void {
    this.dishService.removeOne(dish)
    this.basketService.addToBasket(dish)
  }

  removeFromBasket(dish: Dish): void {
    this.dishService.addOne(dish)
    this.basketService.removeFromBasket(dish)
  }
}
