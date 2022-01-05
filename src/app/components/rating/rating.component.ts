import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Dish} from "../../dish";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() dish!: Dish
  @Output() onRated: EventEmitter<Dish> = new EventEmitter

  constructor() { }

  ngOnInit(): void {

  }

  addRating(star: number) {
    this.dish.rating += star
    this.dish.reviews += 1
    this.onRated.emit(this.dish)
  }
}
