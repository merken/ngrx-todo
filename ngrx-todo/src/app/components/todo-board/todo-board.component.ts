import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

    @Input() todos: Todo[];

    constructor(private todoService: TodoService) { }

    ngOnInit(): void {
    }

    droppedInTodo(event) {
        var updatedTodo = event.dragData;
        updatedTodo.status = 'Todo';
        this.todoService.updateTodo(updatedTodo).subscribe();
    }

    droppedInDoing(event) {
        var updatedTodo = event.dragData;
        updatedTodo.status = 'Doing';
        this.todoService.updateTodo(updatedTodo).subscribe();
    }

    droppedInDone(event) {
        var updatedTodo = event.dragData;
        updatedTodo.status = 'Done';
        this.todoService.updateTodo(updatedTodo).subscribe();
    }

    addNewTodo() {
        var newTodo = { title: '<title>', content: '<content>', status: 'Todo' } as Todo;
        this.todoService.createTodo(newTodo).subscribe();
    }
}
