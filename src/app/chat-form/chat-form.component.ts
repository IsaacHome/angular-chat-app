import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message: string;
  constructor(private  chat:ChatService) { }

  ngOnInit() {
  }

  send(){
    return  this.chat.sendMessage(this.message);
    this.empty();
  }

  handleSubmit(event){
    if(event.keyCode == 13){
       this.send();
    }

  }

  empty (){
    this.message='';
  }
}
