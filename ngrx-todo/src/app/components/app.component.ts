import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signalr.service';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../store/app.reducers';
import { Store } from '@ngrx/store';
import { ConnectionEstablished } from '../store/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NGRX - TODO';

  constructor(private signalRService: SignalRService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.signalRService.initializeConnection().subscribe(initialized => {
      if (!initialized)
        console.error("SignalR failed to initialize");
      else {
        this.store.dispatch(new ConnectionEstablished());
      }
    });
  }
}
