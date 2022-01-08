import { Injectable } from '@angular/core';
import {Dish} from "../dish";

export interface Review {
  nick: string,
  title: string,
  body: string,
  date?: number
}

@Injectable({
  providedIn: 'root'
})

export class ReviewsService {
  reviews: Map<Dish, Review[]> = new Map<Dish, Review[]>()
  constructor() { }

  getReviews(dish: Dish): Review[] {
    if(this.reviews.has(dish)) return (this.reviews.get(dish) as Review[])
    return []
  }

  addReview(dish: Dish, review: Review) {
    if(this.reviews.has(dish)) {
      let array = (this.reviews.get(dish) as Review[])
      array = array.concat(review)
      this.reviews.delete(dish)
      this.reviews.set(dish, array)
    }
    else {
      this.reviews.set(dish, [review])
    }
  }
}
