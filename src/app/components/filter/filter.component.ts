import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Dish} from "../../dish";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() dishList: Dish[] = []
  @Output() onFilter: EventEmitter<any> = new EventEmitter
  cuisines: string[] = []
  prices: number[] = []
  rating: number[] = []
  categories: string[] = []

  constructor() { }

  ngOnInit(): void {
  }

  cuisineCheck(cuisine: string) {
    if(this.cuisines.filter(data => data == cuisine).length == 0){
      this.cuisines = this.cuisines.concat(cuisine)
    }
    else {
      this.cuisines = this.cuisines.filter(data => data != cuisine)
    }
    console.log(this.dishList)
    this.filterDishes()
  }

  categoryCheck(category: string) {
    if(this.categories.filter(data => data == category).length == 0){
      this.categories = this.categories.concat(category)
    }
    else {
      this.categories = this.categories.filter(data => data != category)
    }
    this.filterDishes()
  }

  priceCheck(price: number){
    if(this.prices.filter(data => data == price).length == 0){
      this.prices = this.prices.concat(price)
    }
    else {
      this.prices = this.prices.filter(data => data != price)
    }
    this.filterDishes()
  }


  selectRating(rating: number) {
    if(this.rating.filter(data => data == rating).length == 0){
      this.rating = this.rating.concat(rating)
    }
    else {
      this.rating = this.rating.filter(data => data != rating)
    }
    this.filterDishes()
  }

  getPrices(): number[] {
    let set = new Set
    for(let dish of this.dishList) {
      set.add(Number(dish.price))
    }
    let array = Array.from(set)
    array.sort((a, b) => {return Number(a) - Number(b)})
    return (array as number[])
  }

  filterDishes() {
    this.onFilter.emit([this.cuisines, this.prices, this.rating, this.categories])
  }

}
