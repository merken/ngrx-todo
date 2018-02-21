import * as fromApp from './app.actions';
import { Todo } from '../models';

export interface AppState {
    isLoading: boolean;
    todos: Todo[];
}

export const initialState: AppState = {
    isLoading: false,
    todos: []
};

export function AppReducer(
    state = initialState,
    action: fromApp.Actions
): AppState {
    switch (action.type) {
        case fromApp.LOAD_TODOS:
            state = {
                ...state,
                isLoading: true
            };
            break;
        case fromApp.TODOS_LOADED:
            state = {
                ...state,
                isLoading: false,
                todos: action.payload
            };
            break;

        case fromApp.ADD_TODO:
            state = {
                ...state,
                isLoading: true
            };
            break;
        case fromApp.TODO_ADDED:
            state = {
                ...state,
                isLoading: false,
                todos: [
                    ...state.todos,
                    action.payload
                 ] as Todo[]
            };
            break;

        case fromApp.UPDATE_TODO:
            state = {
                ...state,
                isLoading: true
            };
            break;
        case fromApp.TODO_UPDATED:
            state = {
                ...state,
                isLoading: false,
                todos: [
                    ...state.todos.filter(t => t.id != action.payload.id),
                    action.payload
                 ] as Todo[]
            };
            break;
        default:
            return state;
    }
    return state;
}
