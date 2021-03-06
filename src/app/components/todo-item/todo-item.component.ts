import { Component, OnInit, Input, Output, EventEmitter,} from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';

import { Todo } from 'src/app/models/Todos';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo:Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  //Set Dynamic Classes
  setClasses(){
    let classes = {
      todo:true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  onToggle(todo){
    // Toggle on UI
    todo.completed = !todo.completed;
    //Toggle on server
    this.todoService.toggleCompleted(todo).subscribe();
  }

  onDelete(todo){
    this.deleteTodo.emit(todo);
  }

}
