import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../dish";

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {

  transform(dishes: Dish[], type: string): any {
    let set = new Set()
    for(let dish of dishes) {
      if (type == 'category') {
        set.add(dish.category)
      } else if (type == 'cuisine') {
        set.add(dish.cuisine)
      }
      else if(type == 'rating') {
        set.add(Math.round(dish.rating/dish.reviews))
      }
      else if(type == 'price') {
        set.add(Number(dish.price))
      }
    }
    let array = Array.from(set)
    if(type == 'price'){
      array.sort((a, b) => {return Number(a) - Number(b)})
    }
    return array
  }

}
