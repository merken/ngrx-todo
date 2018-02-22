import 'rxjs/add/operator/debounceTime';

import { Component, HostListener, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
    todoForm: FormGroup;

    @Output() todoUpdated = new EventEmitter<Todo>();
    @Output() todoDeleted = new EventEmitter<Todo>();

    constructor() { }

    ngOnInit(): void {
        this.todoForm = new FormGroup({
            title: new FormControl(null),
            content: new FormControl(null)
        });
        this.subscribeToFormChanges();
    }

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
        this.isEdit = false;
    }

    private subscribeToFormChanges() {
        this.todoForm.valueChanges.debounceTime(2000).subscribe(() => {
            this.saveTodo();
        });
    }

    editMode() {
        if (!this.isEdit) {
            this.todoForm.patchValue(this.todo, { onlySelf: true, emitEvent: false });
            this.isEdit = true;
        }
    }

    saveTodo() {
        if (this.isEdit) {
            this.todoUpdated.emit({
                id: this.todo.id,
                status: this.todo.status,
                ...this.todoForm.value
            });
        }
    }

    deleteTodo() {
        if (this.isEdit) {
            this.todoDeleted.emit(this.todo);
        }
    }
}
