import * as fromActions from './todo.actions';
import { Todo } from '../../models';

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
            return {
                ...state,
                isLoading: true
            };

        case fromActions.TODOS_LOADED:
            return {
                ...state,
                isLoading: false,
                todos: action.payload.sort((a, b) => b.id - a.id)
            };

        case fromActions.ADD_TODO:
            return {
                ...state,
                isLoading: true
            };

        case fromActions.TODO_ADDED:
            return {
                ...state,
                isLoading: false,
                todos: ([
                    ...state.todos,
                    action.payload
                ] as Todo[]).sort((a, b) => b.id - a.id)
            };

        case fromActions.UPDATE_TODO:
            return {
                ...state,
                isLoading: true
            };

        case fromActions.TODO_UPDATED:
            return {
                ...state,
                isLoading: false,
                todos: ([
                    ...state.todos.filter(t => t.id !== action.payload.id),
                    action.payload
                ] as Todo[]).sort((a, b) => b.id - a.id)
            };

        case fromActions.TODO_DELETED:
            return {
                ...state,
                isLoading: false,
                todos: ([
                    ...state.todos.filter(t => t.id !== action.payload)
                ] as Todo[]).sort((a, b) => b.id - a.id)
            };

    }
    return state;
}
