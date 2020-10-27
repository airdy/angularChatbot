import {Injectable} from '@angular/core';
import {WebRequestsService} from "./web-requests.service";

@Injectable({
  providedIn: 'root'
})
export class BotsService {

  constructor(private webRequestService: WebRequestsService) {
  }

  getBots() {
    return this.webRequestService.get('');
  }

  getMessages(botsId: string) {
    return this.webRequestService.get(`${botsId}/chats`)
  }

  addMessages(value: string, botsId: string) {
    return this.webRequestService.post(`${botsId}/chats`, {value})
  }
}
