import 'rxjs/add/operator/debounceTime';

import { Component, HostListener, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Todo } from '../../models';
import * as fromActions from '../store/todo.actions';
import { TodoState } from '../store/todo.reducers';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
    @Input() todo: Todo;
    isEdit: boolean;

    @Output() todoUpdated = new EventEmitter<Todo>();
    @Output() todoDeleted = new EventEmitter<Todo>();

    constructor(private store: Store<TodoState>) { }

    ngOnInit(): void {
    }

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
        this.isEdit = false;
    }

    editMode() {
        if (!this.isEdit) {
            this.isEdit = true;
        }
    }

    saveTodo() {
        if (this.isEdit) {
            this.todoUpdated.emit(this.todo);
        }
    }

    deleteTodo() {
        if (this.isEdit) {
            this.todoDeleted.emit(this.todo);
        }
    }
}
