import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  lastId = 0;
  todos: Todo[] = []

  constructor() {}

  getAllTodos(): Todo[] {
    const storageItem = JSON.parse(window.localStorage.getItem('app-todos'));
    if (storageItem === null) {
      return [];
    } else {
      return stroageItem.todos;
    }
  }
}
