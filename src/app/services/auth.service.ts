import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ISignin } from '../models/sigin.interface';
import { catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { ISignUp } from '../models/signup.interface';
import { ErrorResposeService } from './error-respose.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://localhost:5000/api/auth/';
  constructor(
    private readonly http: HttpClient,
    private _errorRespose: ErrorResposeService
  ) {}

  signin(signin: ISignin): Observable<{ token: string }> {
    return this.http
      .post<any>(`${this.url}signin`, signin)
      .pipe(catchError((error) => this._errorRespose.error(error)));
  }

  signup(signup: ISignUp): Observable<{ token: string }> {
    return this.http
      .post<any>(`${this.url}signup`, signup)
      .pipe(catchError((error) => this._errorRespose.error(error)));
  }
}
