import {Component, OnInit} from '@angular/core';
import {TaskViewCommentsFormComponent} from '../task-view-comments-form/task-view-comments-form.component';

@Component({
  selector: 'app-task-view-comment-form-file',
  templateUrl: './task-view-comment-form-file.component.html',
  styleUrls: ['./task-view-comment-form-file.component.less']
})
export class TaskViewCommentFormFileComponent implements OnInit {

  constructor(public taskViewCommentsFormComponent: TaskViewCommentsFormComponent) {
  }

  ngOnInit() {
  }

}
