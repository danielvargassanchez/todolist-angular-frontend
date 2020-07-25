import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';
import { ErrorResposeService } from './error-respose.service';
import { IToken } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:5000/api/users';
  token: IToken = JSON.parse(localStorage.getItem('token'));
  constructor(
    private http: HttpClient,
    private _errorResponse: ErrorResposeService
  ) {}

  getMyInfo(): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token.token}`,
      }),
    };
    return this.http
      .get<User>(`${this.url}`, httpOptions)
      .pipe(catchError((error) => this._errorResponse.error(error)));
  }
}
