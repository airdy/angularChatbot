import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ChatsService} from "../services/chats.service";
import {ChuckService} from "../services/chuck.service";
import {Message} from "../models/message.model";
import {Bots} from "../models/bots.model";
import {Chuck} from "../models/chuck.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

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
  messageFormGroup: FormGroup;
  error: any;

  constructor(private chatsService: ChatsService,
              private _chuckService: ChuckService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit()  {
    this.chatsService.chatRefresher$
      .subscribe(() => {
      this.getAllMessages();
      });
    this.getAllMessages();
  }
  private getAllMessages() {

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
        //this.mergeArrays()
      })

    this.messageFormGroup = this.formBuilder.group({
      value: ""
    })

  }
/*
  mergeArrays() {
    let merged = [];
    for (let i = 0; i < this.bots.length; i++) {
      merged.push({
          ...this.bots[i],
          ...(this.messages.find((itmInner) => itmInner._botsId === this.messages[i]._id))
        }
      );
    }
    console.log(merged);
  }*/

  handleSubmit() {
    this.chatsService.addMessages(this.messageFormGroup.value, this.botsId)
      .subscribe(
        messages => {
          console.log(`Saved , ${JSON.stringify(messages)}`);
          this.messageFormGroup.reset({name: ''});
        },
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      )
    this._chuckService.getJoke()
      .subscribe(
        data => {
          this.jokes = data;
          console.log(data);
        }
      )
    /*this.chatsService.addJoke(data ,this.botsId)
      .subscribe(
        jokes => {
          console.log(`Joke added , ${JSON.stringify(jokes)}`);
        }
      )*/
  }

}
