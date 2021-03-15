import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { TodoList } from './todo.model';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

    /** GET: get all todos from the server */
    getTodos(): Observable<TodoList[]> {
      return this.http.get<TodoList[]>(environment.apiUrl).
      pipe(
        map((data: TodoList[]) => {
          return data;
        }), catchError(error => {
          return  throwError('Something went wrong');
        }))
    }

   /** POST: add a new Todo to the server */
   addTodo(todo: TodoList): Observable<TodoList> {
    return this.http.post<TodoList>(environment.apiUrl, todo, this.httpOptions);
  }

  /** DELETE: delete a Todo of the selected id in the server */
  deleteTodo(id: number) {
    const url = `${environment.apiUrl}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }

  /** PUT: update a Todo details of the selected id in the server */
  updateTodo(todo: TodoList, id: number): Observable<any> {
    const url = `${environment.apiUrl}/${id}`;
    return this.http.put(url, todo, this.httpOptions);
  }

}
