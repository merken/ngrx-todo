import { Component, OnInit } from '@angular/core';

import { Todo } from './models';
import { SignalRService } from './services/signalr.service';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NGRX - TODO';

  todos: Todo[] = [];
  connected = false;

  constructor(private signalRService: SignalRService, private todoService: TodoService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.signalRService.initializeConnection().subscribe(initialized => {
        this.connected = true;
        if (!initialized) {
          console.error('SignalR failed to initialize');
        } else {
          this.signalRService.subscribe('TODO_ADDED', (todo) => {
            this.todos.push(todo);
            this.sortTodos();
            this.triggerChange();
          });
          this.signalRService.subscribe('TODO_UPDATED', (todo) => {
            this.removeTodo(todo.id);
            this.todos.push(todo);
            this.sortTodos();
            this.triggerChange();
          });
          this.signalRService.subscribe('TODO_DELETED', (id) => {
            this.removeTodo(id);
            this.sortTodos();
            this.triggerChange();
          });

          this.todoService.getTodos().subscribe(todos => {
            this.todos = todos;
          });
        }
      });
    }, 2500);
  }

  private removeTodo(id: number) {
    const updatedIndex = this.todos.findIndex(t => t.id === id);
    this.todos.splice(updatedIndex, 1);
  }

  private sortTodos() {
    this.todos = this.todos.sort((a, b) => b.id - a.id);
  }

  private triggerChange() {
    this.todos = [...this.todos];
  }
}
