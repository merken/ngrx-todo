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

  todos: Todo[] = [];

  connected$: Observable<boolean>;

  constructor(private signalRService: SignalRService,
    private store: Store<AppState>, private todoService: TodoService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.connected$ = this.store.select(selectors.selectSignalRConnectionEstablished);
    setTimeout(() => {
      this.signalRService.initializeConnection().subscribe(initialized => {
        if (!initialized)
          console.error("SignalR failed to initialize");
        else {
          this.store.dispatch(new fromActions.ConnectionEstablished())
        }
      });
    }, 2500);
  }

  private removeTodo(id: number) {
    var updatedIndex = this.todos.findIndex(t => t.id == id);
    this.todos.splice(updatedIndex, 1);
  }

  private sortTodos() {
    this.todos = this.todos.sort((a, b) => b.id - a.id)
  }

  private triggerChange() {
    this.todos = [...this.todos];
  }
}
