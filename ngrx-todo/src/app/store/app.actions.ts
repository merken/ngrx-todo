import { Action } from '@ngrx/store';

import { Todo } from '../models';

export const LOAD_TODOS = '[App] Load Todos';
export const TODOS_LOADED = '[App] Todos Loaded';

export const ADD_TODO = '[App] Add Todo';
export const TODO_ADDED = '[App] Todo Added';

export const TODO_UPDATED = '[App] Todo Updated';
export const UPDATE_TODO = '[App] Update Todo';

export class LoadTodos implements Action {
    readonly type = LOAD_TODOS;
}

export class TodosLoaded implements Action {
    readonly type = TODOS_LOADED;
    constructor(public payload: Todo[]) { }
}

export class AddTodo implements Action {
    readonly type = ADD_TODO;
    constructor(public payload: Todo) { }
}

export class TodoAdded implements Action {
    readonly type = TODO_ADDED;
    constructor(public payload: Todo) { }
}

export class UpdateTodo implements Action {
    readonly type = UPDATE_TODO;
    constructor(public payload: Todo) { }
}

export class TodoUpdated implements Action {
    readonly type = TODO_UPDATED;
    constructor(public payload: Todo) { }
}

export type Actions = | LoadTodos
    | TodosLoaded
    | AddTodo
    | TodoAdded
    | TodosLoaded
    | UpdateTodo
    | TodoUpdated;
