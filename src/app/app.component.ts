import { Component } from '@angular/core';
import { Todo } from './class/todo';
import { TodoDataService } from  './services/todo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTodo: Todo = new Todo();
  constructor(private todoService: TodoDataService) {}

  addTodo() {
    if (this.newTodo.title && this.newTodo.date) {
      this.todoService.addTodos(this.newTodo);
    }
    // console.log(this.newTodo);
  }
}
