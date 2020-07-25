import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ISignin } from 'src/app/models/sigin.interface';
import { TaskService } from 'src/app/services/task.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fbForm: FormBuilder,
    private readonly _authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fbForm.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signin() {
    this.spinner.show();
    const user: ISignin = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this._authService.signin(user).subscribe((token) => {
      localStorage.setItem('token', JSON.stringify(token));
      this.router.navigateByUrl('/home');
    });

    this.spinner.hide();
  }
}
