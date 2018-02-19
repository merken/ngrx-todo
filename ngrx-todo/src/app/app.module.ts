import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './components/app.component';
import { HttpService } from './services/http.service.';
import { SignalRService } from './services/signalr.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [HttpService, SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
