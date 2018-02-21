import 'rxjs/add/operator/debounceTime';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store/app.reducers';
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
    todoForm: FormGroup;

    constructor(private todoService: TodoService, private store: Store<AppState>) { }

    ngOnInit(): void {
        this.todoForm = new FormGroup({
            title: new FormControl(null),
            content: new FormControl(null)
        });
        this.subscribeToFormChanges();
    }

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
        this.todoForm.reset();
        this.isEdit = false;
    }

    private subscribeToFormChanges() {
        this.todoForm.valueChanges.debounceTime(1000).subscribe(() => {
            if (this.isEdit)
                this.store.dispatch(new fromActions.TodoUpdated(
                    {
                        id: this.todo.id,
                        status: this.todo.status,
                        ...this.todoForm.value
                    }
                ));
        });
    }

    editMode() {
        if (!this.isEdit) {
            this.todoForm.patchValue(this.todo, { onlySelf: true, emitEvent: false });
            this.isEdit = true;
        }
    }

    deleteTodo() {
        if (this.isEdit)
            this.store.dispatch(new fromActions.DeleteTodo(this.todo.id));
    }
}
