import {EventEmitter, Injectable, Output} from '@angular/core';
import {Dish} from "../dish";
import {Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrencyService} from "./currency.service";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private url = 'http://localhost:3000/dishes'
  dishes!: Dish[]
  dishesCopy!: Dish[]

  constructor(private httpClient: HttpClient, public currencyService: CurrencyService) {
  }

  getDishes(): Observable<Dish[]> {
    if(this.dishes) {return of(this.dishes)}
    return this.httpClient.get<Dish[]>(this.url).pipe(tap(this.dishes))
  }

  getDishesCopy(): Observable<Dish[]> {
    if(this.dishesCopy) {return of(this.dishesCopy)}
    return this.httpClient.get<Dish[]>(this.url).pipe(tap(this.dishesCopy))
  }

  deleteDish(dish: Dish): void {
    const dishUrl = `${this.url}/${dish.id}`
    this.httpClient.delete<Dish>(dishUrl).subscribe(() => this.dishes = this.dishes.filter(entry => entry.id != dish.id))
  }

  addDish(dish: Dish): Observable<Dish> {
    return this.httpClient.post<Dish>(this.url, dish, httpOptions)
  }

  setRating(dish: Dish): void {
    const dishUrl = `${this.url}/${dish.id}`
    this.httpClient.put<Dish>(dishUrl, dish, httpOptions).subscribe()
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
