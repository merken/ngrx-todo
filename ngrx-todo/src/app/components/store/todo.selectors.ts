import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TodoState } from './todo.reducers';

export const todoFeature = createFeatureSelector<TodoState>(
    'todo'
);

export const selectIsLoading = createSelector(
    todoFeature,
    (state) => state.isLoading
);

export const selectTodos = createSelector(
    todoFeature,
    (state) => state.todos
);
