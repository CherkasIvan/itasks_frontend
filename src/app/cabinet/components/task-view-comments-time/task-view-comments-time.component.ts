import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-view-comments-time',
  templateUrl: './task-view-comments-time.component.html',
  styleUrls: ['./task-view-comments-time.component.less']
})
export class TaskViewCommentsTimeComponent implements OnInit {
  @Output() save = new EventEmitter();
  private _data = {
    hours: 0,
    minutes: 0
  };

  constructor() {
  }

  ngOnInit() {
  }

  onSetHour(hours) {
    this._data.hours = +hours;
  }

  onSetMinute(minutes) {
    this._data.minutes = +minutes;
  }

  onSubmit() {
    const time = this._data.hours + (Math.floor(this._data.minutes / 60 * 100) / 100);
    this.save.emit(time);
  }
}
