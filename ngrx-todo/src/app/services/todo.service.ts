import { Injectable } from '@angular/core';

import { Todo } from '../models';
import { HttpService } from './http.service';

@Injectable()
export class TodoService {

    constructor(private httpService: HttpService) { }

    public getTodos() {
        return this.httpService.makeRequest('GET', '/api/todos');
    }

    public createTodo(todo: Todo) {
        return this.httpService.makeRequest('POST', '/api/todos', { body: todo });
    }

    public updateTodo(todo: Todo) {
        return this.httpService.makeRequest('PUT', `/api/todos/${todo.id}`, { body: todo });
    }

    public deleteTodo(id: number) {
        return this.httpService.makeRequest('DELETE', `/api/todos/${id}`);
    }
}
