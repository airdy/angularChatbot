import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChatViewComponent} from './chat-view/chat-view.component';
import {HttpClientModule} from '@angular/common/http';
import {TruncateModule} from "@yellowspot/ng-truncate";
import {ChuckService} from "./services/chuck.service";

@NgModule({
  declarations: [
    AppComponent,
    ChatViewComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TruncateModule
    ],
  providers: [ChuckService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
