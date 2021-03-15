import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoOverviewComponent } from './todo-overview/todo-overview.component';

const routes: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full' },
  { path: 'todo', component: TodoOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoListRoutingModule { }
