import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Todo } from './models';
import { SignalRService } from './services/signalr.service';
import { TodoService } from './services/todo.service';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { Observable } from 'rxjs/Observable';
import * as fromActions from './store/app.actions';
import * as selectors from './store/app.selectors';
import { timeout } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NGRX - TODO';
  connected$: Observable<boolean>;

  constructor(private signalRService: SignalRService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.connected$ = this.store.select(selectors.selectSignalRConnectionEstablished);
    setTimeout(() => {
      this.signalRService.initializeConnection().subscribe(initialized => {
        if (initialized) {
          this.store.dispatch(new fromActions.ConnectionEstablished());
        } else {
          console.error('SignalR failed to initialize');
        }
      });
    }, 2500);
  }
}
