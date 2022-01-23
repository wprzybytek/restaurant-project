import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FirebaseService} from "../../services/firebase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  modelForm!: FormGroup

  formErrors = {
    email: '',
    password: ''
  }

  private validationMessages = {
    email: {
      required: 'Email is required',
      email: 'Must be an email'
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be at least 6 characters long'
    }
  }

  constructor(private firebaseService: FirebaseService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.modelForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  submit() {
    this.formErrors = {
      email: '',
      password: ''
    }

    if(this.modelForm.valid) {
      this.firebaseService.signIn(this.modelForm.get('email')?.value, this.modelForm.get('password')?.value)
        .then(() => {
          this.router.navigate(['/menu'])
        })
        .catch(error => {
        switch(error.code) {
          case "auth/user-not-found": {
            this.formErrors.email = "Wrong Email or password"
            break
          }
          default: {
            this.formErrors.email = "Something went wrong"
            break
          }
        }
      })
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
