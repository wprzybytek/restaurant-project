import { Component } from '@angular/core';
import {FirebaseService} from "./services/firebase.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurant-project';
  nav: string = 'hide-nav'

  constructor(public firebaseService: FirebaseService) {
  }

  onShowNav(): void {
    if(this.nav == 'hide-nav') {
      this.nav = 'show-nav'
      //@ts-ignore
      document.querySelector('.menu-button').innerHTML = '^'
    }
    else  {
      this.nav = 'hide-nav'
      //@ts-ignore
      document.querySelector('.menu-button').innerHTML = 'v'
    }
  }
}
