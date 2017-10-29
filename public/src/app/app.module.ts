import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VoteComponent } from './vote/vote.component';
import { CreateComponent } from './create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { UserService } from './user.service';
import { QuestionService } from './question.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VoteComponent,
    CreateComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [UserService,
  QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
