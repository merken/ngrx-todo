import * as fromActions from "./todo.actions";
import { Todo } from "../../models";

export interface TodoState {
    isLoading: boolean;
    todos: Todo[];
}

export const initialState: TodoState = {
    isLoading: false,
    todos: []
};

export function TodoReducer(
    state = initialState,
    action: fromActions.Actions
): TodoState {
    switch (action.type) {
        case fromActions.LOAD_TODOS:
            state = {
                ...state,
                isLoading: true
            };
            break;
        case fromActions.TODOS_LOADED:
            state = {
                ...state,
                isLoading: false,
                todos: action.payload.sort((a, b) => b.id - a.id)
            };
            break;

        case fromActions.ADD_TODO:
            state = {
                ...state,
                isLoading: true
            };
            break;
        case fromActions.TODO_ADDED:
            state = {
                ...state,
                isLoading: false,
                todos: ([
                    ...state.todos,
                    action.payload
                ] as Todo[]).sort((a, b) => b.id - a.id)
            };
            break;

        case fromActions.UPDATE_TODO:
            state = {
                ...state,
                isLoading: true
            };
            break;
        case fromActions.TODO_UPDATED:
            state = {
                ...state,
                isLoading: false,
                todos: ([
                    ...state.todos.filter(t => t.id != action.payload.id),
                    action.payload
                ] as Todo[]).sort((a, b) => b.id - a.id)
            };
            break;

        case fromActions.TODO_DELETED:
            state = {
                ...state,
                isLoading: false,
                todos: ([
                    ...state.todos.filter(t => t.id != action.payload)
                ] as Todo[]).sort((a, b) => b.id - a.id)
            };
            break;
        default:
            return state;
    }
    return state;
}