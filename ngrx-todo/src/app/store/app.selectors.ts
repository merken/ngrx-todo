import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '.';

export const appFeature = createFeatureSelector<AppState>(
    'app'
);

export const selectSignalRConnectionEstablished = createSelector(
    appFeature,
    (state) => state.signalRConnectionEstablished
);
