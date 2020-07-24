import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fbForm: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fbForm.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signin() {
    console.log('click');
  }
}
