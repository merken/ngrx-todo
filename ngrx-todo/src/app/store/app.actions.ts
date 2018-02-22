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
