import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ICreateTask } from 'src/app/models/create-task';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { finished } from 'src/app/models/finished.enum';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  showModal: boolean = false;
  tasks: Task[] = new Array<Task>();
  myInfo: User;
  showTask: boolean = false;
  taskId: number = 0;
  constructor(
    private fbForm: FormBuilder,
    private router: Router,
    private _taskService: TaskService,
    private _userService: UserService,
    private spinner: NgxSpinnerService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.form = this.fbForm.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.myInfo = new User();
    this.loadMyInfo();
  }

  async loadMyInfo() {
    this.spinner.show();
    this._userService.getMyInfo().subscribe((user) => {
      this.myInfo = user;
      user.tasks.forEach((task) => {
        this.tasks.push(task);
      });
      this.spinner.hide();
    });
    this.spinner.hide();
  }

  addTask() {
    this.spinner.show();
    let newTask: ICreateTask = {
      title: this.form.value.title,
      description: this.form.value.description,
    };
    this._taskService.createTask(newTask).subscribe((task) => {
      this.tasks.push(task);
      this.form.reset();
      this.showForm();
    });

    this.spinner.hide();
  }

  finalizeTask(taskId: number) {
    this._taskService.finalizeTask(taskId).subscribe((result) => {
      if (result) {
        this.tasks.forEach((task) => {
          if (task.id == taskId) {
            task.finished = finished.FINISHED;
            this.alert.alertSuccess(
              'Finalized task',
              'Task has been finalized'
            );
          }
        });
      }
    });
  }

  deleteTask(taskId: number) {
    this._taskService.deleteTask(taskId).subscribe((result) => {
      if (result) {
        this.tasks.forEach((task, index) => {
          if (task.id == taskId) {
            this.tasks.splice(index);
            this.alert.alertSuccess('Deleted', 'Task has been canceled');
          }
        });
      }
    });
  }

  logout() {
    localStorage.clear();
    this.myInfo = new User();
    this.router.navigateByUrl('/login');
  }
  showForm() {
    this.showModal = !this.showModal;
  }
  openTask(taskId: number) {
    this.showTask = true;
    this.taskId = taskId;
  }
}
