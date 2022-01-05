import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Dish} from "../../dish";

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  @Output() onAddDish: EventEmitter<Dish> = new EventEmitter()
  name!: string
  cuisine!: string
  category!: string
  products!: string
  quantity!: string
  price!: string
  description!: string
  images!: string

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.name || !this.cuisine || !this.category || !this.products || !this.quantity || !this.price || !this.description || !this.images) {
      alert("Enter missing inputs!")
      return;
    }

    let newDish: object
    try {
      newDish = {
        name: this.name,
        cuisine: this.cuisine,
        category: this.category,
        products: this.products.split(', '),
        quantity: Number(this.quantity),
        price: Number(this.price),
        description: this.description,
        images: this.images,
        rating: 0,
        reviews: 0
      }
      this.onAddDish.emit((newDish as Dish))
    }
    catch (error) {
      alert("Wrong data format!")
    }

    this.name = ''
    this.cuisine = ''
    this.category = ''
    this.products = ''
    this.quantity = ''
    this.price = ''
    this.description = ''
    this.images! = ''
  }
}
