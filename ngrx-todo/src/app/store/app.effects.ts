import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

import { TodoService } from '../services/todo.service';
import * as fromActions from './app.actions';

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions, private todoService:TodoService) { }

    @Effect()
    loadTodos$ = this.actions$.ofType(fromActions.LOAD_TODOS).pipe(
        switchMap(() => {
            return this.todoService
              .getTodos()
              .map(res => new fromActions.TodosLoaded(res));
          })
    );

    // @Effect()
    // todosLoaded$ = this.actions$.ofType(fromActions.TODOS_LOADED).pipe(
    //     switchMap(() => {
    //         return this.todoService
    //           .getTodos()
    //           .map(res => new fromActions.TodosLoaded(res));
    //       })
    // );
}
