import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss'],
})
export class ShowTaskComponent implements OnInit {
  @Output() showTask = new EventEmitter<boolean>();
  @Input() taskId: number;
  task: Task;
  constructor(private _taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTask();
  }

  async loadTask() {
    this._taskService.getTask(this.taskId).subscribe((task) => {
      this.task = task;
    });
  }

  closeTask() {
    this.showTask.emit(false);
  }
}
