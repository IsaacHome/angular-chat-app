import { Injectable } from '@angular/core';

import {ChatMessage} from '../models/chat-message.model';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: Observable<string>;
  var1$;
  var2$;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth != undefined && auth != null) {
        this.user = auth;
      }

      this.getUser().forEach((u) => {
        this.userName = u[0];
        //    console.log(this.userName);
      });

    });
  }

  getUser() {
    const userId = this.user.uid;
    //console.log(userId);
    const path = `users/${userId}`;
    this.db.list('users/userId')
    const itemsRef: AngularFireList<ChatMessage> = this.db.list(path);

    this.var1$ = itemsRef.snapshotChanges();
    this.var2$ = itemsRef.valueChanges();

    return this.var2$;
  }


  getUsers() {
    const path = `users/`;
    const itemsRef: AngularFireList<ChatMessage> = this.db.list(path);
    this.var1$ = itemsRef.snapshotChanges();
    this.var2$ = itemsRef.valueChanges();

    return this.var2$;
    //return this.db.list(path);
  }

  sendMessage(msg: string) {
    const timeStamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();

    var message = {
      message: msg,
      timeSent: timeStamp,
      userName: this.userName,
      email: email
    };
    const item = this.db.list('/messages');
    item.push(message);
  }

  getMessages(): AngularFireList<ChatMessage> {
    // query to create our message feed binding
    const itemsRef: AngularFireList<ChatMessage> = this.db.list('/messages');
    this.var1$ = itemsRef.snapshotChanges();
    this.var2$ = itemsRef.valueChanges();
    return this.var2$;
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();
    return (date + ' ' + time);
  }

}
