import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { Task } from '../models/task';
import { ErrorResposeService } from './error-respose.service';
import { IToken } from '../models/token';
import { ICreateTask } from '../models/create-task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  url: string = 'http://localhost:5000/api/tasks';
  token: IToken = JSON.parse(localStorage.getItem('token'));

  constructor(
    private readonly http: HttpClient,
    private _errorRespose: ErrorResposeService
  ) {}

  createTask(task: ICreateTask): Observable<Task> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token.token}`,
      }),
    };
    return this.http
      .post<Task>(`${this.url}`, task, httpOptions)
      .pipe(catchError((error) => this._errorRespose.error(error)));
  }

  getTask(id: number): Observable<Task> {
    return this.http
      .get<Task>(`${this.url}/${id}`)
      .pipe(catchError((error) => this._errorRespose.error(error)));
  }

  finalizeTask(taskId: number): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.url}/finalize/${taskId}`)
      .pipe(catchError((error) => this._errorRespose.error(error)));
  }

  deleteTask(taskId: number): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token.token}`,
      }),
    };
    return this.http.delete<boolean>(`${this.url}/${taskId}`, httpOptions);
  }
}
