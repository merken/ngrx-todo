import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signalr.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  todos: Array<any> = [];

  constructor(private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.signalRService.initializeConnection().subscribe(initialized => {
      if (!initialized)
        console.error("SignalR failed to initialize");
      else {
        this.signalRService.subscribe('todo-added').subscribe(todo => {
          this.todos.push(todo);
        })
      }
    });
  }

  addTodo() {
    this.signalRService.publish('addTodo', { title: 'Hello', content: 'todo' });
  }
}
