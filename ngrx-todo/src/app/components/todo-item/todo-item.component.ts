import 'rxjs/add/operator/debounceTime';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models';
import * as selectors from '../../store/app.selectors';
import * as fromActions from '../../store/app.actions';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
    @Input() todo: Todo;
    isEdit: boolean;

    constructor(private todoService: TodoService) { }

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
        if (this.isEdit)
            this.todoService.updateTodo(this.todo).subscribe();
    }

    deleteTodo() {
        if (this.isEdit)
            this.todoService.deleteTodo(this.todo.id).subscribe();
    }
}
