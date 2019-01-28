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
    this.setTodo(todos);
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

  getTodoById(id: number): Todo {
    const todos = this.getAllTodos();
    return todos.filter(todo => todo.id === id).pop();
  }

  updateTodo(id: number, values: Object = {}) {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    let todos = this.getAllTodos();
    todos = todos.filter(t => t.id !== todo.id);
    const todoValues = Object.assign(todo, values);
    todos.push(todoValues);
    this.setTodo(todos);
  }

  setTodo(usertodos: Todo[]) {
    window.localStorage.setItem('app-todos',
      JSON.stringify({todos: usertodos})   // getting todos from getAllTodos() return
    );
  }


// class End
}
