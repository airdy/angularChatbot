import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ChuckService {
  constructor(private httpClient: HttpClient) {
  }

  getJoke(): Observable<any> {
      return this.httpClient.get('https://api.chucknorris.io/jokes/random');
  }

}
