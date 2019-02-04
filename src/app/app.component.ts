import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import * as TodoActions from './store/todo.actions';
import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TodoDataService } from  './services/todo-data.service';
import { Todo } from './class/todo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos$: Observable<Todo[]>;
  newTodo: Todo = new Todo();
  closeResult: string;
  todo: any;
  edit: FormGroup;
  editForm: FormGroup;
  isEdited = false;
  dateValue: string;
  titleValue: string;
  isEmpty = false;

  constructor(
    private todoService: TodoDataService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  get todos() {  // <<< a getter
    return this.todoService.getAllTodos();
  }

  addTodo() {
    if (this.newTodo.title && this.newTodo.date) {
      // this.todoService.addTodos(this.newTodo);     //  <<<< old
      // this.TodoDataService.addTodos(this.newTodo);   //  replaced by this.store.dispatch VVVVV
      this.store.dispatch(new TodoActions.AddTodo(this.newTodo));
      this.newTodo = new Todo();
      this.newTodo.date = '';
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }

  completeTodo(todo) {
    this.todoService.completeTodo(todo);
  }

  deleteTodo(todo) {
    this.todoService.deleteTodoById(todo.id);
  }

  initForm(todo) {
    if (todo.date.year && todo.date.month) {
      this.editForm = this.fb.group({
        title: [`${todo.title}`, Validators.required],
        date: [`${todo.date.year}-${todo.date.month}-${todo.date.day}`, Validators.required]
      });
    } else if (todo.date && !todo.date.month) {
      this.editForm = this.fb.group({
        title: [`${todo.title}`, Validators.required],
        date: [`${todo.date}`, Validators.required]
      });
    }
  }

  open(content, todo) {
    console.log(todo);
    this.isEdited = false;
    this.initForm(todo);
    this.todo = {
      id: todo.id,
      title: todo.title,
      date: todo.date,
      complete: todo.complete
    };
    if (todo.date.year && todo.date.month) {
      this.titleValue = `${todo.title}`;
      this.dateValue = `${todo.date.year}-${todo.date.month}-${todo.date.day}`;
    }
    if (todo.date && !todo.date.month) {
      this.titleValue = `${todo.title}`;
      this.dateValue = `${this.todo.date}`;
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  updateTodo() {
    // this.todoService.updateTodo(this.todo.id, this.editForm.value);
    const updatedTodo = {
      id: this.todo.id,
      title: this.edit.value.title,
      date: this.edit.value.date,
      complete: false
    };

    this.store.dispatch(new TodoActions.UpdateTodo({
      id: this.todo.id,
      newTodo: updatedTodo
    }));

    this.isEdited = true;
    setTimeout(() => {
      this.modalService.dismissAll();   //  <<<<< comes from ng modalService
    }, 2000);
  }
}
