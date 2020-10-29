import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ChatsService} from "../services/chats.service";
import {ChuckService} from "../services/chuck.service";
import {Message} from "../models/message.model";
import {Bots} from "../models/bots.model";
import {Chuck} from "../models/chuck.model";

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {

  bots: Bots[];
  messages: Message[];
  botsId: string;
  jokes: Chuck[];

  constructor(private chatsService: ChatsService,
              private _chuckService: ChuckService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.chatsService.getMessages(params.botsId).subscribe((messages: Message[]) => {
            this.messages = messages;
          })
        }
      )

    this.route.params
      .subscribe(
        (params: Params) => {
          this.botsId = params['botsId'];
        }
      )

    this.chatsService.getBots()
      .subscribe((bots: Bots[]) => {
        this.bots = bots;
        this.mergeArrays()
      })


  }
    mergeArrays() {
      let merged = [];
      for(let i=0; i<this.bots.length; i++) {
        merged.push({
          ...this.bots[i],
          ...(this.messages.find((itmInner) => itmInner._botsId === this.messages[i]._id))}
        );
      }
      console.log(merged);
  }

  addNewMessage(value: string) {
    this.chatsService.addMessages(value, this.botsId)
      .subscribe((newMessage: Message[]) => {
        this.router.navigate([''], {relativeTo: this.route})
        console.log(newMessage);
      })
    this._chuckService.getJoke()
      .subscribe(
        data => {
          this.jokes = data;
          console.log(data);
        }
      )
  }

}
