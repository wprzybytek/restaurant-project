import {Component, OnInit} from '@angular/core';
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
  dishList: Dish[] = []
  dishListCopy: Dish[] = []
  currency: string = "€"
  USDRatio: number = 0
  filterValues: any = [[], [], 0, []]

  constructor(private dishService: DishService, private currencyService: CurrencyService, private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe((data) => {
      this.dishList = data
      this.dishListCopy = JSON.parse(JSON.stringify(data))
    })
    this.currencyService.getExchangeRates().subscribe((data) => {
      this.USDRatio = (data as any).data.USD
    })
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
    if(this.currency == '€') {
      this.currency = '$'
      this.dishList.forEach(dish => {dish.price = Number((dish.price * this.USDRatio).toFixed(2))})
    }
    else {
      this.currency = '€'
      this.dishList.forEach(dish => {dish.price = this.dishListCopy.filter(entry => {
        return entry.name == dish.name
      })[0].price})
    }
    this.basketService.setCurrency(this.currency)
  }

  addToBasket(dish: Dish): void {
    dish.quantity -= 1
    this.basketService.addToBasket(dish)
    this.checkButtonStatus(dish)
  }

  removeFromBasket(dish: Dish): void {
    dish.quantity += 1
    this.basketService.removeFromBasket(dish)
    this.checkButtonStatus(dish)
  }

  checkButtonStatus(dish: Dish): void {
    let addButton = document.querySelector(`#${(dish.name).split(' ').join('-')} .add`)
    let removeButton = document.querySelector(`#${(dish.name).split(' ').join('-')} .remove`)
    if (this.dishListCopy.filter(entry => {
      return entry.name == dish.name
    })[0].quantity == dish.quantity) {
      (removeButton as Element).setAttribute('disabled', 'disabled')
    } else if ((removeButton as Element).hasAttribute('disabled')) {
      (removeButton as Element).removeAttribute('disabled')
    }
    else if (dish.quantity == 0) {
      (addButton as Element).setAttribute('disabled', 'disabled')
    } else if ((addButton as Element).hasAttribute('disabled')) {
      (addButton as Element).removeAttribute('disabled')
    }
  }

  deleteDish(dish: Dish) {
    this.dishService
      .deleteDish(dish)
      .subscribe(() => this.dishList = this.dishList.filter(entry => entry.id != dish.id))
    this.basketService.removeAll(dish)
  }

  addDish(dish: Dish) {
    this.dishService.addDish(dish).subscribe((dish) => {
      this.dishList.push(dish)
    })
  }

  setRating(dish: Dish) {
    this.dishService.setRating(dish).subscribe()
  }

  setFilters(values: any) {
    this.filterValues = values
  }
}
