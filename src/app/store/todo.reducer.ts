import { Todo } from './../class/todo';
import { TodoActions, ActionTypes } from './todo.actions';

const initialState: Todo = {
  id: 1,
  title: 'dinner',
  date: '2019-11-18',
  complete: false
};

export function todoReducer(state = [initialState], action: TodoActions) {
  console.log(state, action);
  switch (action.type) {
    case ActionTypes.LOAD_TODO:
      return [...state, action.payload];

    case ActionTypes.ADD_TODO:
      action.payload.id = state.length + 1;
      return [...state, action.payload];

    case ActionTypes.UPDATE_TODO:
      return state.map(todo => {
        return todo.id === action.payload.id ? action.payload.newTodo : todo;
      });

    // look for particular object we want to toggle
    case ActionTypes.TOGGLE_TODO:
      return state.map(todo => {
        return todo.id === action.payload.id ? Object.assign({}, todo, {complete: !action.payload.complete}) : todo;
      });

    // filter todos to return all except target todo
    case ActionTypes.DELETE_TODO:
      return state.filter(todo => todo.id !== action.payload.id);


    default:
      return state;
  }
}
