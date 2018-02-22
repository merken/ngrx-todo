import { Pipe, PipeTransform } from '@angular/core';

import { Todo } from '../models';

@Pipe({ name: 'todoStatus' })
export class TodoStatusPipe implements PipeTransform {
  transform(todos: Todo[], status: string) {
    if (todos === null) {
      return [];
    }
    return todos.filter(todo => todo.status === status);
  }
}
