import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ImagePreviewPipe} from '@ux/pipes/image-preview.pipe';
import {ImageService} from '@core/services/image/image.service';
import {saveAs} from 'file-saver';
import {FileModel} from '@core/models/file.model';
import {FileService} from '@core/services/file.service';
import {Subscription} from 'rxjs/Subscription';
import * as fromRoot from '@core/redux/index';
import {Store} from '@ngrx/store';

@Component({
  selector: 'ux-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.less']
})
export class PreviewImageComponent implements OnInit, OnDestroy {
  @Input() image: FileModel;
  isShowMenu = false;
  url: string;
  downloadUrl: string;
  private _subscriptions$: Subscription = new Subscription();

  constructor(private imagePreviewPipe: ImagePreviewPipe,
              private fileService: FileService,
              public imageService: ImageService) {
  }

  ngOnInit() {
    this.url = this.imagePreviewPipe.transform(this.image, 150, 150);
    this.downloadUrl = this.imagePreviewPipe.transform(this.image, false, false);
  }

  ngOnDestroy() {
    this._subscriptions$.unsubscribe();
  }

  onDownloadFile() {
    this._subscriptions$.add(
      this.fileService
        .getBlobFromUrl(this.downloadUrl)
        .subscribe((response) => saveAs(response, `${this.image.originalName}`))
    );
  }

  onToggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  onCloseMenu() {
    this.isShowMenu = false;
  }
}
