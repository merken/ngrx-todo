import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import { SignalRService } from '../services/signalr.service';
import * as fromActions from './app.actions';
import { AppState } from './app.reducers';
import { TodoService } from '../services/todo.service';
import { map } from 'rxjs/operator/map';

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private signalRService: SignalRService,
        private todoService: TodoService) { }

    @Effect()
    connectionEstablished$ = this.actions$.ofType(fromActions.CONNECTION_ESTABLISHED).map((action) => {
        this.signalRService.subscribe("TODO_ADDED", (todo) => {
            this.store.dispatch(new fromActions.TodoAdded(todo));
        });
        this.signalRService.subscribe("TODO_UPDATED", (todo) => {
            this.store.dispatch(new fromActions.TodoUpdated(todo));
        });
        this.signalRService.subscribe("TODO_DELETED", (id) => {
            this.store.dispatch(new fromActions.TodoDeleted(id));
        });
        return new fromActions.SubscriptionCompleted();
    });

    @Effect()
    subscriptionCompleted$ = this.actions$.ofType(fromActions.SUBSCRIPTION_COMPLETED).pipe(
        switchMap(() => {
            return Observable.of(new fromActions.LoadTodos());
        })
    );

    @Effect()
    loadTodos$ = this.actions$.ofType(fromActions.LOAD_TODOS).pipe(
        switchMap(() => {
            return this.todoService.getTodos()
                .map(res => new fromActions.TodosLoaded(res));
        })
    );

    @Effect()
    updateTodo$ = this.actions$.ofType(fromActions.UPDATE_TODO)
        .map((action: fromActions.UpdateTodo) => action.payload)
        .switchMap((todo) => {
            return this.todoService.updateTodo(todo)
                .map(res => new fromActions.RequestDispatched());
        });
}
