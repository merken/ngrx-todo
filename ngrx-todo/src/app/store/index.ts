import { ActionReducerMap, compose, combineReducers, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { storeLogger } from 'ngrx-store-logger';
import { AppReducer } from './app.reducers';
import { AppEffects } from './app.effects';
import { TodoState, TodoReducer } from '../components/store/todo.reducers';
import { TodoEffects } from '../components/store/todo.effects';

export interface AppState {
    signalRConnectionEstablished: boolean;
}

export interface AllState {
    app: AppState;
    todo: TodoState;
}

export const reducers: ActionReducerMap<AllState> = {
    app: AppReducer,
    todo: TodoReducer
};

const developmentReducer: Function = compose(storeLogger(), combineReducers)(
    reducers
);

export function logger(reducer: ActionReducer<AllState>): ActionReducer<AllState> {
    return function (state: AllState, action: any): AllState {
        return developmentReducer(state, action);
    };
}

export const metaReducers: MetaReducer<AllState>[] = !environment.production
    ? [logger]
    : [];

export const effects = [AppEffects, TodoEffects];
