import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models';
import * as selectors from '../../store/app.selectors';
import * as fromActions from '../../store/app.actions';

@Component({
    selector: 'app-todo-board',
    templateUrl: './todo-board.component.html',
    styleUrls: ['./todo-board.component.scss']
})
export class TodoBoardComponent implements OnInit {
    isLoading$: Observable<boolean>;
    todos$: Observable<Todo[]>;

    constructor(private signalRService: TodoService, private store: Store<AppState>) { }

    ngOnInit(): void {
        this.isLoading$ = this.store.select(selectors.selectIsLoading);
        this.todos$ = this.store.select(selectors.selectTodos);
    }

    droppedInTodo(event){
        this.store.dispatch(new fromActions.UpdateTodo({
            ...event.dragData,
            status:'Todo'
        }));
    }

    droppedInDoing(event){
        this.store.dispatch(new fromActions.UpdateTodo({
            ...event.dragData,
            status:'Doing'
        }));
    }

    droppedInDone(event){
        this.store.dispatch(new fromActions.UpdateTodo({
            ...event.dragData,
            status:'Done'
        }));
    }
}
