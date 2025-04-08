import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {getToken} from '@core/utils/getToken';
import {environment} from '../../../../environments/environment';
import {FileModel} from '@core/models/file.model';
import {saveAs} from "file-saver";
import {Subscription} from "rxjs";
import {FileService} from "@core/services/file.service";

@Component({
  selector: 'ux-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.less']
})
export class PreviewFileComponent implements OnInit, OnDestroy {
  private _subscriptions$: Subscription = new Subscription();

  @Input() file: FileModel;

  isShowMenu = false;

  link: string;
  token = getToken();

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
    this.link = `${environment.apiUrl}files/${this.file.id}?projectId=${this.file.projectId}&access-token=${this.token}`;
  }

  ngOnDestroy() {
    this._subscriptions$.unsubscribe();
  }

  onToggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  onCloseMenu() {
    this.isShowMenu = false;
  }

  onDownloadFile() {
    this._subscriptions$.add(
      this.fileService
        .getBlobFromUrl(this.link)
        .subscribe((response) => saveAs(response, `${this.file.originalName}`))
    );
  }
}
