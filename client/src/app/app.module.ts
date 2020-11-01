import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChatViewComponent} from './chat-view/chat-view.component';
import {HttpClientModule} from '@angular/common/http';
import {TruncateModule} from "@yellowspot/ng-truncate";
import {ChuckService} from "./services/chuck.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ChatViewComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TruncateModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
  providers: [ChuckService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
