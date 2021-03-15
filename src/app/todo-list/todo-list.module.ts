import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoOverviewComponent } from './todo-overview/todo-overview.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';


@NgModule({
  declarations: [
    TodoOverviewComponent,
    DialogBoxComponent
  ],
  imports: [
    CommonModule,
    TodoListRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class TodoListModule { }
