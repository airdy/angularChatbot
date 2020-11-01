import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Message} from "../models/message.model";
import {Bots} from "../models/bots.model";
import {Chuck} from "../models/chuck.model";
import {Observable, Subject} from "rxjs";
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  readonly ROOT_URL;

  constructor(private httpClient: HttpClient) {
    this.ROOT_URL = "http://localhost:3000"
  }

  private _chatRefresher$ = new Subject<void>();

  get chatRefresher$() {
    return this._chatRefresher$;
  }

  getBots() {
    return this.httpClient.get<Bots[]>(`${this.ROOT_URL}/`);
  }

  getMessages(botsId: string) {
    return this.httpClient.get<Message[]>(`${this.ROOT_URL}/${botsId}`)
  }

  addMessages(message: Message[], botsId: string): Observable<Message[]> {
    return this.httpClient
      .post<Message[]>(`${this.ROOT_URL}/${botsId}`, message)
      .pipe(
        tap(() => {
          this._chatRefresher$.next();
        })
      )
  }

  addJoke(joke: Chuck[], botsId: string): Observable<Chuck[]> {
    return this.httpClient
      .post<Chuck[]>(`${this.ROOT_URL}/${botsId}`, joke)
      .pipe(
        tap(() => {
          this._chatRefresher$.next();
        })
      )
  }
}
