import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChatViewComponent} from './chat-view/chat-view.component';

const routes: Routes = [
  {path: '', redirectTo: '5f970d19834c161410edf4be', pathMatch: 'full'},
  {path: ':botsId', component: ChatViewComponent},
  {path: ':botsId/chats', component: ChatViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
