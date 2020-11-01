import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ChatsService} from "../services/chats.service";
import {ChuckService} from "../services/chuck.service";
import {Message} from "../models/message.model";
import {Bots} from "../models/bots.model";
import {Chuck} from "../models/chuck.model";
import {FormBuilder, FormGroup, NgModel} from "@angular/forms";
import {catchError, debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {
  @ViewChild('filterInput', {static: true}) filterInput: NgModel;
  searchTerm: string;
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

    //subscribing to changes in search input
    this.filterInput.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(term => {
        if (term) {
          this.getMessageBySearch(term);
        } else {
          this.getAllMessages();
        }
      });

    //automated refresher with stream Subject
    this.chatsService.chatRefresher$
      .pipe(
        tap(() => this.filterInput.reset(null))
      )
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

  //getting messages by input term
  private getMessageBySearch(term: string) {
    this.chatsService.getMessagesBySearch(term, this.botsId)
      .subscribe(
        (messages: Message[]) => this.messages = messages
      )
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
          this.jokes = data;
          this.chatsService.addJoke(data, this.botsId)
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
