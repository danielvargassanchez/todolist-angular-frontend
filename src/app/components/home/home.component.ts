import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  showModal: boolean = false;
  tasks: Task[] = new Array<Task>();

  constructor(
    private fbForm: FormBuilder,
    private router: Router,
    private _taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.form = this.fbForm.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.loadTasks();
  }

  showForm() {
    this.showModal = !this.showModal;
  }

  addTask() {}

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  async loadTasks() {
    this.tasks.length = 0;
    this._taskService.getMyTasks().subscribe((tasks) => {
      tasks.forEach((task) => {
        let newTask: Task = task;
        this.tasks.push(newTask);
      });
    });
  }
}
