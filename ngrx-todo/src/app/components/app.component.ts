import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.signalRService.initializeConnection().subscribe(initialized => {
      if (!initialized)
        console.error("SignalR failed to initialize");
    });
  }
}
