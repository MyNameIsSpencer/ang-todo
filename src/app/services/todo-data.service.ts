import { Todo } from './../class/todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  lastId = 0;
  todos: Todo[] = []

  constructor() {}

  addTodos(todo: Todo): TodoDataService {
    if(!todo.id) {
      todo.id = ++this.lastId;
    }
    const todos = this.getAllTodos();
    todos.push(todo);

    return this;
  }

  getAllTodos(): Todo[] {
    const storageItem = JSON.parse(window.localStorage.getItem('app-todos'));
    if (storageItem === null) {
      return [];
    } else {
      return storageItem.todos;
    }
  }
}
