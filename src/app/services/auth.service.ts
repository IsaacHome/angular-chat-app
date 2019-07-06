import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private authState: any;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {
    this.user = afAuth.authState;
  }

  authUser() {
    return this.user;
  }

  currentUserId() {
    return this.afAuth.authState
  }


  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.setUserStatus('online');
        this.router.navigate(['chat']);
      });
  }

  logout() {

    this.setUserStatus('offline');
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);

  }

  signUp(email: string, password: string, displayName: string) {

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
      }).catch(error => console.log(error));
  }

  setUserData(email: string, displayName: string, status: string): void {

    this.currentUserId()
      .subscribe(user => {
        if (user) {
          firebase.database().ref().child('users').child(`${user.uid}`).set({
            displayName: displayName,
            email: email,
            status: status
          });
        }
      });
  }

  setUserStatus(status: string): void {
    console.log("set user called ", status)
    this.currentUserId()
      .subscribe(user => {
        if (user) {
          console.log("Hi", status);
          firebase.database().ref().child('users').child(`${user.uid}`).update({
            status: status
          });
        }
      });

  }
}
