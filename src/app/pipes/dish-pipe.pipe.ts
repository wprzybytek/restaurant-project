import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../dish";

@Pipe({
  name: 'dishPipe'
})
export class DishPipePipe implements PipeTransform {

  transform(dishList: Dish[], cuisine: string[], price: number[], rating: number[], category: string[]): Dish[] {

    return dishList
      .filter((dish) => {
      if(cuisine.length > 0) {
        return cuisine.filter(data => {return data == dish.cuisine}).length > 0
      }
      else {
        return true
      }
    })
      .filter((dish) => {
        if(price.length > 0) {
          return price.filter(data => {return data == dish.price}).length > 0
        }
        else {
          return true
        }
      })
      .filter((dish) => {
        if(rating.length > 0) {
          return rating.filter(data => {return data == Math.round(dish.rating/dish.reviews)}).length > 0
        }
        else {
          return true
        }
      })
      .filter((dish) => {
        if(category.length > 0) {
          return category.filter(data => {return data == dish.category}).length > 0
        }
        else {
          return true
        }
      })
  }

}
