import {Injectable} from '@angular/core';
import {Dish} from "../dish";
import {Observable, of} from "rxjs";
import {CurrencyService} from "./currency.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class DishService {
  dishes!: Dish[]
  dishesCopy!: Dish[]

  constructor(public currencyService: CurrencyService,
              private db: AngularFireDatabase) {
  }

  getDishes(): Observable<Dish[]> {
    if(!this.dishes) {
      this.db.list('dishes').valueChanges().subscribe(data => {
        this.dishes = (data as Dish[])
      })
    }
    return of(this.dishes)
  }

  getDishesCopy(): Observable<Dish[]> {
    if(!this.dishesCopy) {
      this.db.list('dishes').valueChanges().subscribe(data => {
        this.dishesCopy = (data as Dish[])
      })
    }
    return of(this.dishesCopy)
  }

  getDishById(id: string | null, copy: boolean): Dish {
    if(!copy) return this.dishes.filter(dish => dish.id == Number(id))[0]
    return this.dishesCopy.filter(dish => dish.id == Number(id))[0]
  }

  deleteDish(dish: Dish): void {
    this.db.list('dishes').remove(`${dish.id}`).then(() => {
      this.dishes = this.dishes.filter(entry => entry.id != dish.id)
      this.dishesCopy = this.dishesCopy.filter(entry => entry.id != dish.id)
    })
  }

  addDish(dish: Dish): void {
    this.db.list('dishes').set(`${this.dishes.length}`, dish).then()
  }

  setRating(dish: Dish): void {
    this.db.list('dishes').set(`${dish.id}`, dish).then()
  }

  changeCurrency(): void {
    if(this.currencyService.getCurrency() == '$') {
      this.dishes.forEach(dish => {dish.price = Number((dish.price * this.currencyService.getUSDRatio()).toFixed(2))})
    }
    else {
      this.dishes.forEach(dish => {dish.price = this.dishesCopy.filter(entry => {
            return entry.name == dish.name
          })[0].price})
    }
  }

  removeOne(dish: Dish) {
    dish.quantity -= 1
  }

  addOne(dish: Dish) {
    dish.quantity += 1
  }
}
