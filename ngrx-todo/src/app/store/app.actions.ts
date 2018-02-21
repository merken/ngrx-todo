import { Action } from '@ngrx/store';

import { Todo } from '../models';

export const CONNECTION_ESTABLISHED = '[App] Connection Established';
export const SUBSCRIPTION_COMPLETED = '[App] Subscription Completed';
export const REQUEST_DISPATCHED = '[App] Request Dispatched';

export const LOAD_TODOS = '[App] Load Todos';
export const TODOS_LOADED = '[App] Todos Loaded';

export const ADD_TODO = '[App] Add Todo';
export const TODO_ADDED = '[App] Todo Added';

export const UPDATE_TODO = '[App] Update Todo';
export const TODO_UPDATED = '[App] Todo Updated';

export const DELETE_TODO = '[App] Delete Todo';
export const TODO_DELETED = '[App] Todo Deleted';

export class ConnectionEstablished implements Action {
    readonly type = CONNECTION_ESTABLISHED;
}

export class SubscriptionCompleted implements Action {
    readonly type = SUBSCRIPTION_COMPLETED;
}

export class RequestDispatched implements Action {
    readonly type = REQUEST_DISPATCHED;
}

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
    | ConnectionEstablished
    | SubscriptionCompleted
    | LoadTodos
    | TodosLoaded
    | AddTodo
    | TodoAdded
    | UpdateTodo
    | TodoUpdated
    | DeleteTodo
    | TodoDeleted;
