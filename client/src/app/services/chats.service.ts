import {Injectable} from '@angular/core';
import {WebRequestsService} from "./web-requests.service";

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private webRequestService: WebRequestsService){
  }

  getBots() {
    return this.webRequestService.get('');
  }

  getMessages(botsId: string) {
    return this.webRequestService.get(`${botsId}`)
  }

  addMessages(value: string, botsId: string) {
    return this.webRequestService.post(`${botsId}`, {value})
  }

}
