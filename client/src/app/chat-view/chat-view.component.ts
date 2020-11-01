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
import { ToastrService } from 'ngx-toastr';

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
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {
  }

  ngOnInit() {

    //automated refresher with stream Subject
    this.chatsService.chatRefresher$
      .subscribe(() => {
        this.getAllMessages();
      });
    this.getAllMessages();
  }

  //getting all messages in stream
  private getAllMessages() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.chatsService.getMessages(params.botsId).subscribe((messages: Message[]) => {
            this.messages = messages;
          })
        },
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      )

    //subscription to changes in selected botsID routing
    this.route.params
      .subscribe(
        (params: Params) => {
          this.botsId = params['botsId'];
        },
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      )

    //getting list of all bots
    this.chatsService.getBots()
      .subscribe((bots: Bots[]) => {
          this.bots = bots;
          //this.mergeArrays()
        }, catchError(err => {
          console.log(err);
          return throwError(err);
        })
      )

    //resetting form input
    this.messageFormGroup = this.formBuilder.group({
      value: ""
    })
  }

  //submit form handler which adds new inputed message and getting bot message from external API
  handleSubmit() {
    this.chatsService.addMessages(this.messageFormGroup.value, this.botsId)
      .subscribe(
        messages => {
          console.log(`Saved, ${JSON.stringify(messages)}`);
          this.messageFormGroup.reset({name: ''});
        },
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      )
    setTimeout(() => {
      this.jokeAdding();
      this.toastr.success("You have new message")
    }, 10000);
  }
  jokeAdding() {
    this._chuckService.getJoke()
      .subscribe(
        data => {
          this.chatsService.addMessages(data, this.botsId)
            .subscribe(
              jokes => {
                console.log(`Joke added, ${JSON.stringify(jokes)}`);
              }
            )
        }
      )
  }
  ngOnDestroy() {
    if (this.chatsService.chatRefresher$) {
      this.chatsService.chatRefresher$.unsubscribe();
    }
  }
}
