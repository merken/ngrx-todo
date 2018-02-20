import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from './app.reducers';

export const appFeature = createFeatureSelector<AppState>(
    'app'
);

export const selectIsLoading = createSelector(
    appFeature,
    (state) => state.isLoading
);

export const selectTodos = createSelector(
    appFeature,
    (state) => state.todos
);
