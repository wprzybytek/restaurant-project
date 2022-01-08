import { Component, OnInit, Input } from '@angular/core';
import {Dish} from "../../dish";
import {Review, ReviewsService} from "../../services/reviews.service";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Input() dish!: Dish

  constructor(public reviewService: ReviewsService) { }

  ngOnInit(): void {
  }

  addReview(review: Review): void {
    this.reviewService.addReview(this.dish, review)
  }

}
