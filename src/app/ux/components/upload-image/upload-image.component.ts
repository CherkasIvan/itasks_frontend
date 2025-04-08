import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'ux-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.less']
})
export class UploadImageComponent implements OnInit {
  @Input() image: any;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  // onDelete() {
  //   this.image.cancelUpload(this.image.index);
  // }
}
