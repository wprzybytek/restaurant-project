import { Injectable } from '@angular/core';
import {Dish} from "../dish";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  constructor(private httpClient: HttpClient) { }

  getDishes(): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(this.url)
  }

  deleteDish(dish: Dish): Observable<Dish> {
    const dishUrl = `${this.url}/${dish.id}`
    return this.httpClient.delete<Dish>(dishUrl)
  }

  addDish(dish: Dish):Observable<Dish> {
    return this.httpClient.post<Dish>(this.url, dish, httpOptions)
  }

  setRating(dish: Dish):Observable<Dish> {
    const dishUrl = `${this.url}/${dish.id}`
    return this.httpClient.put<Dish>(dishUrl, dish, httpOptions)
  }
}
