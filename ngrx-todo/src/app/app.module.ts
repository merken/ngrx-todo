import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '../material';

import { AppComponent } from './components/app.component';
import { HttpService } from './services/http.service';
import { SignalRService } from './services/signalr.service';
import { reducers, effects, metaReducers } from './store';
import { RouterModule } from '@angular/router';
import { TodoService } from './services/todo.service';
import { AppRoutingModule } from './app.module.routing';

const services = [
  HttpService,
  SignalRService,
  TodoService
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,

    MaterialModule,

    AppRoutingModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
  ],
  providers: [...services],
  bootstrap: [AppComponent]
})
export class AppModule { }
