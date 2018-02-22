import * as fromApp from './app.actions';
import { Todo } from '../models';
import { AppState } from '.';

export const initialState: AppState = {
    signalRConnectionEstablished: false
};

export function AppReducer(
    state = initialState,
    action: fromApp.Actions
): AppState {
    switch (action.type) {
        case fromApp.CONNECTION_ESTABLISHED:
            state = {
                ...state,
                signalRConnectionEstablished: true
            };
            break;
    }
    
    return state;
}