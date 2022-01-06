import { Component, OnInit} from '@angular/core';
import {Dish} from "../../dish";
import {DishService} from "../../services/dish.service";

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
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

  name!: string
  cuisine!: string
  category!: string
  products!: string
  quantity!: string
  price!: string
  description!: string
  images!: string

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.name || !this.cuisine || !this.category || !this.products || !this.quantity || !this.price || !this.description || !this.images) {
      alert("Enter missing inputs!")
      return;
    }

    let newDish: Dish
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
      this.dishService.addDish(newDish).subscribe(dish => {
        this.dishList.push(dish)
        this.dishListCopy.push(dish)
      })
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
