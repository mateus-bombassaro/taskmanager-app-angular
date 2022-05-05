import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError, of, pipe, } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { TaskLists } from '../models/taskLists';
import {Tasks} from '../models/tasks';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = environment.baseUrl;
  private jsonHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getLists(): Observable<TaskLists[]> {
    return this.http.get<TaskLists[]>(`${this.urlApi}/lists`).pipe(
      catchError(() => {
        throw 'Erro ao carregar listas de tarefas';
      })
    );
  }

  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.urlApi}/tasks`).pipe(
      catchError(() => {
        throw 'Erro ao carregar tarefas';
      })
    );
  }

  getList(id:string): Observable<TaskLists> {
    return this.http.get<TaskLists>(`${this.urlApi}/lists/${id}`)
    .pipe(
      catchError(() => {
        throw 'Erro ao carregar lista'
      })
    );
  }

  getTask(id:string): Observable<Tasks> {
    return this.http.get<Tasks>(`${this.urlApi}/tasks/${id}`)
    .pipe(
      catchError(() => {
        throw 'Erro ao carregar tarefa'
      })
    );
  }

  postTask(task:Tasks) {
    return this.http.post<Tasks>(`${this.urlApi}/tasks`, task, {headers: this.jsonHeaders})
    .pipe(
      catchError(() => {
        throw 'Erro ao salvar tarefa';
      })
    );
  }

  putTask(task:Tasks) {
    return this.http.put<Tasks>(`${this.urlApi}/tasks/${task.id}`, task, {headers: this.jsonHeaders})
    .pipe(
      catchError(() => {
        throw 'Erro ao atualizar tarefa';
      })
    );
  }

  deleteTask(id:string) {
    return this.http.delete<Tasks>(`${this.urlApi}/tasks/${id}`, {headers: this.jsonHeaders})
    .pipe(
      catchError(() => {
        throw 'Erro ao deletar tarefa';
      })
    );
  }

  postList(list:TaskLists) {
    return this.http.post<TaskLists>(`${this.urlApi}/lists`, list, {headers: this.jsonHeaders})
    .pipe(
      catchError(() => {
        throw 'Erro ao salvar tarefa';
      })
    );
  }

  putList(list:TaskLists) {
    return this.http.put<TaskLists>(`${this.urlApi}/lists/${list.id}`, list, {headers: this.jsonHeaders})
    .pipe(
      catchError(() => {
        throw 'Erro ao atualizar tarefa';
      })
    );
  }

  deleteList(id:string) {
    return this.http.delete<Tasks>(`${this.urlApi}/lists/${id}`, {headers: this.jsonHeaders})
    .pipe(
      catchError(() => {
        throw 'Erro ao deletar tarefa';
      })
    );
  }
}
