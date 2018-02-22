import { ActionReducerMap, compose, combineReducers, ActionReducer, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { storeLogger } from 'ngrx-store-logger';
import { AppState, AppReducer } from "./app.reducers";

export interface AllState{
}

export const reducers : ActionReducerMap<AllState> = {
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
