import { NgClass } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";

@Component({
  selector: "ux-upload-image",
  templateUrl: "./upload-image.component.html",
  imports: [NgClass],
  standalone: true,
  styleUrls: ["./upload-image.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadImageComponent implements OnInit {
  @Input() image: any;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  // onDelete() {
  //   this.image.cancelUpload(this.image.index);
  // }
}
