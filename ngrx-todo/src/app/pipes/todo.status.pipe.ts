import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models';

@Pipe({ name: 'todoStatus' })
export class TodoStatusPipe implements PipeTransform {
  transform(todos: Todo[], status: string) {
    return todos.filter(todo => todo.status === status);
  }
}
