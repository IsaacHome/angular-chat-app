import {Component, OnChanges, OnInit} from '@angular/core';
import {ChatService} from '../services/chat.service';
import {AngularFireList} from '@angular/fire/database';
import {ChatMessage} from '../models/chat-message.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit,OnChanges {

  feed$:AngularFireList<ChatMessage>;

  constructor(private chat:ChatService) { }

  ngOnInit() {
    console.log("feed initialing.....")
    this.feed$=this.chat.getMessages();
  }

  ngOnChanges(): void {
    this.feed$ = this.chat.getMessages();
  }

  print( ){
    console.log(this.feed$);
  }

}
