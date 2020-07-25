import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  alertError(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
    });
  }
  alertSuccess(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
    });
  }
  alertWarning(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
    });
  }
}
