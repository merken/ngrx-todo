import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { filter, switchMap } from 'rxjs/operators';

import { TodoService } from '../../services/todo.service';
import * as fromApp from '../../store/app.actions';
import * as fromActions from './todo.actions';

@Injectable()
export class TodoEffects {
    constructor(
        private actions$: Actions,
        private todoService: TodoService) { }

    @Effect()
    subscriptionCompleted$ = this.actions$.ofType(fromApp.SUBSCRIPTION_COMPLETED).pipe(
        switchMap(() =>  Observable.of(new fromActions.LoadTodos()))
    );

    @Effect()
    todoAdded$ = this.actions$.ofType(fromApp.MESSAGE_RECEIVED).pipe(
        filter((action: fromApp.MessageReceived) => action.messageType === "TODO_ADDED"),
        switchMap((action: fromApp.MessageReceived) => Observable.of(new fromActions.TodoAdded(action.payload))));
    
    @Effect()
    todoDeleted$ = this.actions$.ofType(fromApp.MESSAGE_RECEIVED).pipe(
        filter((action: fromApp.MessageReceived) => action.messageType === "TODO_DELETED"),
        switchMap((action: fromApp.MessageReceived) => Observable.of(new fromActions.TodoDeleted(action.payload))));

    @Effect()
    todoUpdated$ = this.actions$.ofType(fromApp.MESSAGE_RECEIVED).pipe(
        filter((action: fromApp.MessageReceived) => action.messageType === "TODO_UPDATED"),
        switchMap((action: fromApp.MessageReceived) => Observable.of(new fromActions.TodoUpdated(action.payload))));

    @Effect()
    loadTodos$ = this.actions$.ofType(fromActions.LOAD_TODOS).pipe(
        switchMap(() => {
            return this.todoService.getTodos()
                .map(res => new fromActions.TodosLoaded(res));
        })
    );

    @Effect()
    addTodo$ = this.actions$.ofType(fromActions.ADD_TODO)
        .map((action: fromActions.AddTodo) => action.payload)
        .switchMap((todo) => {
            return this.todoService.createTodo(todo)
                .map(res => new fromApp.RequestDispatched());
        });

    @Effect()
    updateTodo$ = this.actions$.ofType(fromActions.UPDATE_TODO)
        .map((action: fromActions.UpdateTodo) => action.payload)
        .switchMap((todo) => {
            return this.todoService.updateTodo(todo)
                .map(res => new fromApp.RequestDispatched());
        });

    @Effect()
    deleteTodo$ = this.actions$.ofType(fromActions.DELETE_TODO)
        .map((action: fromActions.DeleteTodo) => action.payload)
        .switchMap((id) => {
            return this.todoService.deleteTodo(id)
                .map(res => new fromApp.RequestDispatched());
        });
}
