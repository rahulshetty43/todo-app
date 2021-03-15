import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable} from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { TodoList } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-overview',
  templateUrl: './todo-overview.component.html',
  styleUrls: ['./todo-overview.component.scss']
})
export class TodoOverviewComponent implements OnInit {
  dataSource?: TodoList[];

  displayedColumns : string[] = ['title','text', 'actions'];
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  
  constructor(public dialog: MatDialog, private todoService: TodoService) {
   }

  ngOnInit(): void {
    this.getTodos();
  }

  /** Fetch all the todos */
  getTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.dataSource = todos;
    }
    ); 
  }

   /** Pop up Dialog to add/update/delete todo */
  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
        this.table.renderRows();
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  /** add new todo */
  addRowData(row_obj){
    const todo: TodoList = {
      title:row_obj.title,
      text:row_obj.text
    }
    this.todoService.addTodo(todo).subscribe();
  }

  /** update the existing todo */
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value)=>{
      if(value.id == row_obj.id){
        const todo: TodoList = {
          title:row_obj.title,
          text:row_obj.text
        }
        this.todoService.updateTodo(todo,row_obj.id ).subscribe();
        value.title = row_obj.title; 
        value.text = row_obj.text;
      }
      return true;
    });
  }

  /** delete the todo */
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value)=>{
      this.todoService.deleteTodo(row_obj.id).subscribe(
        res => console.log(res)
      );
      return value.id != row_obj.id;
    });
  }

}
