import { AppState, AppReducer } from "./app.reducers";
import { ActionReducerMap, compose, combineReducers, ActionReducer, MetaReducer } from "@ngrx/store";
import { AppEffects } from "./app.effects";
import { environment } from "../../environments/environment";
import { storeLogger } from 'ngrx-store-logger';

export interface AllState {
    app: AppState;
}

export const reducers: ActionReducerMap<AllState> = {
    app: AppReducer
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

export const effects = [AppEffects];
