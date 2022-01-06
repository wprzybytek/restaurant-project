import {Component, OnInit, SimpleChanges} from '@angular/core';
import {Dish} from "src/app/dish"
import {DishService} from "../../services/dish.service";
import {CurrencyService} from "../../services/currency.service";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  get dishList() {
    return this.dishService.dishes
  }
  set dishList(dishes) {
    this.dishService.dishes = dishes
  }

  get dishListCopy() {
    return this.dishService.dishesCopy
  }
  set dishListCopy(dishes) {
    this.dishService.dishesCopy = dishes
  }

  currency: string = "€"
  filterValues: any = [[], [], 0, []]

  constructor(private dishService: DishService, public currencyService: CurrencyService, public basketService: BasketService) {
  }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(data => {
      this.dishList = data
    })
    this.dishService.getDishesCopy().subscribe(data => {
      this.dishListCopy = data
    })
    this.currency = this.currencyService.getCurrency()
  }

  getMaxPrice(): number {
    let maxPrice = 0
    for(let dish of this.dishList) {
      maxPrice = Math.max(maxPrice, dish.price)
    }
    return maxPrice
  }

  getMinPrice(): number {
    let minPrice = Infinity
    for(let dish of this.dishList) {
      minPrice = Math.min(minPrice, dish.price)
    }
    return minPrice
  }

  getRating(dish: Dish): number {
    return Math.round((dish.rating/dish.reviews)*10)/10
  }

  changeCurrency():void {
    this.currencyService.changeCurrency()
    this.dishService.changeCurrency()
    this.currency = this.currencyService.getCurrency()
  }

  addToBasket(dish: Dish): void {
    this.dishService.removeOne(dish)
    this.basketService.addToBasket(dish)
  }

  removeFromBasket(dish: Dish): void {
    this.dishService.addOne(dish)
    this.basketService.removeFromBasket(dish)
  }

  hideRemoveButton(dish: Dish): boolean {
    return this.dishListCopy.filter(entry => {
      return entry.name == dish.name
    })[0].quantity == dish.quantity
  }

  hideAddButton(dish: Dish): boolean {
    return dish.quantity == 0
  }

  deleteDish(dish: Dish) {
    this.dishService.deleteDish(dish)
  }

  setRating(dish: Dish) {
    this.dishService.setRating(dish)
  }

  setFilters(values: any) {
    this.filterValues = values
  }
}
