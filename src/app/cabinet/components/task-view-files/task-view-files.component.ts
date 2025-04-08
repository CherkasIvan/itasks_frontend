import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {TaskViewComponent} from '../task-view/task-view.component';

@Component({
  selector: 'app-task-view-files',
  templateUrl: './task-view-files.component.html',
  styleUrls: ['./task-view-files.component.less']
})
export class TaskViewFilesComponent implements OnInit {
  @ViewChild('inputUploadFiles') inputUploadFiles: any;

  @Input()
  set files(files) {
    this.filesList = files;
  }

  @Input()
  set loadingFiles(files) {
    this.loadingFilesList = files;
  }

  isShowMenu = false;
  filesList = [];
  loadingFilesList = [];

  constructor(public taskView: TaskViewComponent) {

  }

  ngOnInit() {
  }

  onStopUploadAndDeleteFile(file: any) {
    const index = _.findIndex(this.loadingFilesList, {name: file.name});
    this.loadingFilesList[index].subscription.unsubscribe();
    this.loadingFilesList.splice(index, 1);
  }

  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  onClose() {
    this.isShowMenu = false;
  }
}
