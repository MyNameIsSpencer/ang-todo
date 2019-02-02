import { TodoDataService } from './services/todo-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { todoReducer } from './store/todo.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    StoreModule.forRoot({
      todos: todoReducer
    })
  ],
  providers: [],  //[TodoDataServices],   <<< Don't need cuz already injected in root
  bootstrap: [AppComponent]
})
export class AppModule { }
