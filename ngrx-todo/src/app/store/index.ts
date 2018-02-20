import { AppState, AppReducer } from "./app.reducers";
import { ActionReducerMap } from "@ngrx/store";

export interface AllState {
    app: AppState;
}

export const reducers: ActionReducerMap<AllState> = {
    app: AppReducer
};

export const effects = [AppEffects];
