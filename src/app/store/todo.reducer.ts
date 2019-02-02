import { Todo } from './../class/todo';
import { TodoActions, ActionTypes } from './todo.actions';

const initialState: Todo = {
  id: 1,
  title: dinner,
  date: '2019-11-18',
  complete: false
};

export function todoReducer(state = [initialState], action: TodoActions) {
  console.log(state, action);
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      action.payload.id = state.length + 1;
      return[...state, action.payload];

      default:
        return state;
  }
}
