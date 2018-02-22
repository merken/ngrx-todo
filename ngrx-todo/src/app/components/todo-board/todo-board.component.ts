import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Todo } from '../../models';
import * as fromActions from '../store/todo.actions';
import { TodoState } from '../store/todo.reducers';
import * as selectors from '../store/todo.selectors';

@Component({
    selector: 'app-todo-board',
    templateUrl: './todo-board.component.html',
    styleUrls: ['./todo-board.component.scss']
})
export class TodoBoardComponent implements OnInit {
    isLoading$: Observable<boolean>
    todos$: Observable<Todo[]>

    constructor(private store: Store<TodoState>) { }

    ngOnInit(): void {
        this.isLoading$ = this.store.select(selectors.selectIsLoading);
        this.todos$ = this.store.select(selectors.selectTodos);
    }

    droppedInTodo(event) {
        this.store.dispatch(new fromActions.UpdateTodo({
            ...event.dragData,
            status: 'Todo'
        }));
    }

    droppedInDoing(event) {
        this.store.dispatch(new fromActions.UpdateTodo({
            ...event.dragData,
            status: 'Doing'
        }));
    }

    droppedInDone(event) {
        this.store.dispatch(new fromActions.UpdateTodo({
            ...event.dragData,
            status: 'Done'
        }));
    }

    addNewTodo() {
        this.store.dispatch(new fromActions.AddTodo({ title: '<title>', content: '<content>', status: 'Todo' } as Todo));
    }
}
