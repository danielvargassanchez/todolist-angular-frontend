import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  showModal: boolean = false;

  constructor(private fbForm: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fbForm.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  showForm() {
    this.showModal = !this.showModal;
  }

  addTask() {}
}
