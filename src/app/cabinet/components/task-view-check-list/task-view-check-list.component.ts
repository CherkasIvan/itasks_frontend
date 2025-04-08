import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-task-view-check-list',
  templateUrl: './task-view-check-list.component.html',
  styleUrls: ['./task-view-check-list.component.less']
})
export class TaskViewCheckListComponent implements OnInit {

  isShowMenu = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  close() {
    this.isShowMenu = false;
  }
}
