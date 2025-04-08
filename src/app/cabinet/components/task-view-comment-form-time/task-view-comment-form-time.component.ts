import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-view-comment-form-time',
  templateUrl: './task-view-comment-form-time.component.html',
  styleUrls: ['./task-view-comment-form-time.component.less']
})
export class TaskViewCommentFormTimeComponent {
  @Output() clear = new EventEmitter();
  private _time: number;

  hours = 0;
  minutes = 0;

  @Input()
  set time(value) {
    this._time = value;
    this._updateTime();
  }

  get time(): number {
    return this._time;
  }

  constructor() {
  }

  private _updateTime() {
    this.hours = Math.floor(this.time);
    this.minutes = Math.round((this.time - this.hours) * 60);
  }
}
