import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DndModule } from 'ng2-dnd';

import { MaterialModule } from '../material';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.module.routing';
import { TodoBoardComponent } from './components/todo-board/todo-board.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { ContentTypeInterceptor } from './interceptors/contenttype.interceptor';
import { TodoStatusPipe } from './pipes/todo.status.pipe';
import { HttpService } from './services/http.service';
import { SignalRService } from './services/signalr.service';
import { TodoService } from './services/todo.service';
import { effects, metaReducers, reducers } from './store';

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

    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
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
