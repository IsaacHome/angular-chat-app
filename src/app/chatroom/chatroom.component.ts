import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  @ViewChild('scroller') private feedContainer: ElementRef;

  constructor() { }

  ngOnInit() {
  }
  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop
      = this.feedContainer.nativeElement.scrollHeight;

  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

}
