import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DndModule } from 'ng2-dnd';

import { MaterialModule } from '../material';
import { AppRoutingModule } from './app.module.routing';
import { AppComponent } from './components/app.component';
import { TodoBoardComponent } from './components/todo-board/todo-board.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { ContentTypeInterceptor } from './interceptors/contenttype.interceptor';
import { TodoStatusPipe } from './pipes/todo.status.pipe';
import { HttpService } from './services/http.service';
import { SignalRService } from './services/signalr.service';
import { TodoService } from './services/todo.service';

const components = [
  AppComponent,
  TodoBoardComponent,
  TodoItemComponent
];

const services = [
  HttpService,
  SignalRService,
  TodoService
];

@NgModule({
  declarations: [
    ...components,
    TodoStatusPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,

    DndModule.forRoot(),

    MaterialModule,

    AppRoutingModule,

    // StoreModule.forRoot(reducers, { metaReducers }),
    // EffectsModule.forRoot(effects),
  ],
  providers: [
    ...services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentTypeInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
