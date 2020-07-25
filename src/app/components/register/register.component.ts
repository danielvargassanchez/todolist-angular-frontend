import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISignUp } from 'src/app/models/signup.interface';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fbForm: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fbForm.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signup() {
    const user: ISignUp = {
      email: this.form.value.email,
      password: this.form.value.password,
      name: this.form.value.name,
    };

    this._authService.signup(user).subscribe((token) => {
      localStorage.setItem('token', JSON.stringify(token));
      this.router.navigateByUrl('/home');
    });
  }
}
