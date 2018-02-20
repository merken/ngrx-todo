import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '../material';

import { AppComponent } from './components/app.component';
import { HttpService } from './services/http.service';
import { SignalRService } from './services/signalr.service';

const services = [
  HttpService,
  SignalRService
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MaterialModule,

    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot(effects),
  ],
  providers: [...services],
  bootstrap: [AppComponent]
})
export class AppModule { }
