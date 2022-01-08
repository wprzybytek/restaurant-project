import { Component, OnInit} from '@angular/core';
import {Dish} from "../../dish";
import {DishService} from "../../services/dish.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  modelForm!: FormGroup

  formErrors = {
    name: '',
    cuisine: '',
    category: '',
    products: '',
    quantity: '',
    price: '',
    description: '',
    images: ''
  }

  private validationMessages = {
    name: {
      required: 'Name is required'
    },
    cuisine: {
      required: 'Cuisine is required'
    },
    category: {
      required: 'Category is required'
    },
    products: {
      required: 'Products are required'
    },
    quantity: {
      required: 'Quantity is required',
      min: 'Quantity must be a number greater than 0',
      pattern: 'Quantity must be a number'
    },
    price: {
      required: 'Price is required',
      min: 'Price must be a number greater than 0',
      pattern: 'Price must be a number'
    },
    description: {
      required: 'Description is required'
    },
    images: {
      required: 'Images path is required'
    }
  }

  constructor(private dishService: DishService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.modelForm = this.fb.group({
      name: ['', Validators.required],
      cuisine: ['', Validators.required],
      category: ['', Validators.required],
      products: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1), Validators.pattern(new RegExp('^[0-9]+$'))]],
      price: ['', [Validators.required, Validators.min(1), Validators.pattern(new RegExp('^[0-9]+$'))]],
      description: ['', Validators.required],
      images: ['', Validators.required]
    })
  }

  onSubmit() {
    this.formErrors = {
      name: '',
      cuisine: '',
      category: '',
      products: '',
      quantity: '',
      price: '',
      description: '',
      images: ''
    }

    if(this.modelForm.valid) {
      let newDish: Dish
      newDish = {
        id: this.dishList.length,
        name: this.modelForm.get('name')?.value,
        cuisine: this.modelForm.get('cuisine')?.value,
        category: this.modelForm.get('category')?.value,
        products: this.modelForm.get('products')?.value.split(', '),
        quantity: this.modelForm.get('quantity')?.value,
        price: this.modelForm.get('price')?.value,
        description: this.modelForm.get('description')?.value,
        images: this.modelForm.get('images')?.value,
        rating: 0,
        reviews: 0
      }
      this.dishService.addDish(newDish)
      this.dishList.push(newDish)
      this.dishListCopy.push(newDish)
      this.modelForm.reset()
    }
    else {
      let form = this.modelForm
      for(let field in this.formErrors) {
        let control = form.get(field)

        if(control) {
          //@ts-ignore
          let validationMessages = this.validationMessages[field]
          for(let error in control?.errors) {
            //@ts-ignore
            this.formErrors[field] += validationMessages[error] + ' '
          }
        }
      }
    }

  }
}
