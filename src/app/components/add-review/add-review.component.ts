import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Review} from "../../services/reviews.service";
@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  @Output() onSubmit: EventEmitter<Review> = new EventEmitter<Review>()
  modelForm!: FormGroup

  formErrors = {
    nick: '',
    title: '',
    body: ''
  }

  private validationMessages = {
    nick: {
      required: 'Nick is required'
    },
    title: {
      required: 'Title is required'
    },
    body: {
      required: 'Review description is required',
      minlength: 'Review description must be at least 50 characters',
      maxlength: 'Review description must be at most 500 characters'
    }
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.modelForm = this.fb.group({
      nick: ['', Validators.required],
      title: ['', Validators.required],
      body: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      date: ''
    })
  }

  submit() {
    this.formErrors = {
      nick: '',
      title: '',
      body: ''
    }

    if(this.modelForm.valid) {
      let review = {
        nick: this.modelForm.get('nick')?.value,
        title: this.modelForm.get('title')?.value,
        body: this.modelForm.get('body')?.value,
        date: this.modelForm.get('date')?.value
      }
      this.onSubmit.emit(review)
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
