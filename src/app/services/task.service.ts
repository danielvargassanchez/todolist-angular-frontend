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

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  url: string = 'http://localhost:5000/api/tasks';
  token: string = JSON.parse(localStorage.getItem('token'));

  constructor(
    private readonly http: HttpClient,
    private _alert: AlertService
  ) {}

  getMyTasks(): Observable<Task[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token['token']}`,
      }),
    };

    return this.http
      .get<Task[]>(`${this.url}/myTasks`, httpOptions)
      .pipe(catchError((error) => this.error(error)));
  }

  error(error: HttpErrorResponse) {
    this._alert.alertError('Error', error.error.message);
    return throwError('Error');
  }
}
