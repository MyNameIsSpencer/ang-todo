import { Action } from '@ngrx/store';
import { Todo } from './../class/todo';

export const ActionTypes = {
  ADD_TODO: 'ADD_TODO',
  UPDATE_TODO: 'UPDATE_TODO'
};

export class AddTodo implements Action {
  readonly type = ActionTypes.ADD_TODO;

  constructor(public payload: any) {}  //  <<<< previously payload was type Todo, but caused issues
}

export class UpdateTodo implements Action {
  readonly type = ActionTypes.UPDATE_TODO;

  constructor(public payload: { id: number; todo: Todo }) {}
}

export type TodoActions = AddTodo | UpdateTodo;
