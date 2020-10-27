import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ChatsService} from "../chats.service";
import {Message} from "../models/message.model";
import {Bots} from "../models/bots.model";


@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {

  bots: Bots[];
  messages: Message[];
  botsId: string;

  constructor(private chatsService: ChatsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        this.chatsService.getMessages(params.botsId).subscribe((messages: Message[]) => {
          this.messages = messages;
        })
      }
    )
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        this.botsId = params['botsId'];
      }
    )

    this.chatsService.getBots().subscribe((bots: Bots[]) => {
      this.bots = bots;
    })
  }
    addNewMessage(value: string){
      this.chatsService.addMessages(value, this.botsId).subscribe((newMessage: Message[]) => {
        console.log(newMessage);
      })
    }
}
