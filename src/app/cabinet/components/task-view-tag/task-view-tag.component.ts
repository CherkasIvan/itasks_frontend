import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { TagModel } from "@core/models/tag.model";

@Component({
  selector: "app-task-view-tag",
  templateUrl: "./task-view-tag.component.html",
  styleUrls: ["./task-view-tag.component.less"],
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskViewTagComponent implements OnInit {
  private _tagList: TagModel[] = [];
  private _tags: string[] = [];
  @Output() onChangeTags: EventEmitter<string[]> = new EventEmitter();

  @Input()
  set tags(value: string[]) {
    this._tags = value;
  }

  get tags(): string[] {
    return this._tags;
  }

  @Input()
  set tagList(value: TagModel[]) {
    this._tagList = value;
  }

  get tagList(): TagModel[] {
    return this._tagList;
  }

  isOpen = false;

  constructor() {}

  ngOnInit() {}

  onSelect(event) {
    this.onChangeTags.emit(event);
  }

  onOpen() {
    this.isOpen = true;
  }

  onClose() {
    this.isOpen = false;
  }
}
