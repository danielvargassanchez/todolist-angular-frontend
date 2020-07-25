import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorResposeService {
  constructor(private _alert: AlertService) {}

  error(error: HttpErrorResponse) {
    this._alert.alertError('Error', error.error.message);
    return throwError('Error');
  }
}
