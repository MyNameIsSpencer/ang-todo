import { Action } from '@ngrx/store';
import { Todo } from './../class/todo';

export const ActionTypes = {
  ADD_TODO: 'ADD_TODO';
};

export class AddTodo implements Action {
  readonly type = ActionTypes.ADD_TODO;

  constructor(public payload: Todo) {}
}

export type TodoActions = AddTodo;
