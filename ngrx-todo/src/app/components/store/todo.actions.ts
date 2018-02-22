import { Action } from "@ngrx/store";
import { Todo } from "../../models";

export const LOAD_TODOS = '[Todo] Load Todos';
export const TODOS_LOADED = '[Todo] Todos Loaded';

export const ADD_TODO = '[Todo] Add Todo';
export const TODO_ADDED = '[Todo] Todo Added';

export const UPDATE_TODO = '[Todo] Update Todo';
export const TODO_UPDATED = '[Todo] Todo Updated';

export const DELETE_TODO = '[Todo] Delete Todo';
export const TODO_DELETED = '[Todo] Todo Deleted';

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

export class DeleteTodo implements Action {
    readonly type = DELETE_TODO;
    constructor(public payload: number) { }
}

export class TodoDeleted implements Action {
    readonly type = TODO_DELETED;
    constructor(public payload: number) { }
}

export type Actions =
    | LoadTodos
    | TodosLoaded
    | AddTodo
    | TodoAdded
    | UpdateTodo
    | TodoUpdated
    | DeleteTodo
    | TodoDeleted;