import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable} from "rxjs";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userData: Observable<firebase.User | null>
  public isLoggedIn: boolean = false
  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState
  }

  async signIn(email: string, password: string) {
    await this.angularFireAuth.signInWithEmailAndPassword(email, password)
    this.isLoggedIn = true
  }

  async signUp(email: string, password: string) {
    await this.angularFireAuth.createUserWithEmailAndPassword(email, password)
  }

  logout() {
    this.angularFireAuth.signOut().then()
    this.isLoggedIn = false
  }
}
