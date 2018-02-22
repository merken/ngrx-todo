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
import { TodoService } from '../services/todo.service';
import { map } from 'rxjs/operator/map';
import { AppState } from '.';

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private signalRService: SignalRService) { }

    @Effect()
    connectionEstablished$ = this.actions$.ofType(fromActions.CONNECTION_ESTABLISHED).map((action) => {
        this.signalRService.subscribe('TODO_ADDED', (todo) => {
            this.store.dispatch(new fromActions.MessageReceived('TODO_ADDED', todo));
        });
        this.signalRService.subscribe('TODO_UPDATED', (todo) => {
            this.store.dispatch(new fromActions.MessageReceived('TODO_UPDATED', todo));
        });
        this.signalRService.subscribe('TODO_DELETED', (id) => {
            this.store.dispatch(new fromActions.MessageReceived('TODO_DELETED', id));
        });
        return new fromActions.SubscriptionCompleted();
    });
}
