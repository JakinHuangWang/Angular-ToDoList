import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { Todo } from '../../models/Todos';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];
  T:any[];

  constructor(private todoService:TodoService, app:FirebaseApp) {}

  ngOnInit(): void {
    this.getTodos();
  }

  drop(event: CdkDragDrop<Todo[]>){
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  getTodos(): void {
    let tempTd: Todo[] = []
    this.todoService.getTodos().subscribe(todos => {
      if(todos){
        Object.keys(todos).forEach( key => {
          if(tempTd.length > 0){
            tempTd.unshift({
              "id" : key,
              "title" : todos[key]["title"],
              "completed" : todos[key]["completed"]
            });
          }else{
            tempTd.push({
              "id" : key,
              "title" : todos[key]["title"],
              "completed" : todos[key]["completed"]
            });
          }
        });
      }
    });
    this.todos = tempTd;
  }

  deleteTodo(todo:Todo) {
    // Remove from Server then remove from UI
    this.todoService.deleteTodo(todo).subscribe(
      todos => {
        this.todos =this.todos.filter(t => t.id !== todo.id);
    });
  }

  addTodo(todo:Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.getTodos();
    });
  }
}
