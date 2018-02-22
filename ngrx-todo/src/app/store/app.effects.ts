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

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private signalRService: SignalRService,
        private todoService: TodoService) { }

}
