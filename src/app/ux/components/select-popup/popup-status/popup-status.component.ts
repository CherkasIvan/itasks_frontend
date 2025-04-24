import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import * as _ from "lodash";
import { UserModel } from "@core/models/user.model";
import { Subscription } from "rxjs";
import * as fromRoot from "@core/redux";
import { InviteModel } from "@core/models/invite.model";
import { select, Store } from "@ngrx/store";
import { IdentityModel } from "@core/models/identity.model";
import { StatusModel } from "@core/models/status.model";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "ux-popup-status",
  templateUrl: "./popup-status.component.html",
  styleUrls: ["./popup-status.component.less"],
  imports: [FormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupStatusComponent implements OnInit, OnDestroy {
  @Input() header = "Статус задачи";
  @Input() selected = [];
  @Input() multiple = false;
  @Output() selectItem = new EventEmitter<StatusModel>();
  @Output() changeItems = new EventEmitter<string[]>();

  private _value: any;

  @Input()
  set value(value) {
    this._value = value;
  }

  get value(): any {
    return this._value;
  }

  items: StatusModel[] = [];
  match: string;
  selectIndex = -1;

  subscription$: Subscription = new Subscription();

  constructor(private store: Store<fromRoot.State>) {
    this.subscription$.add(
      this.store
        .pipe(select(fromRoot.getStatusEntities))
        .subscribe((statuses) => (this.items = statuses))
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  hasSelected(id: string) {
    if (this.multiple) {
      return _.indexOf(this.value, id) > -1;
    } else {
      return this.value === id;
    }
  }

  onSelect(item) {
    if (this.multiple) {
      const index = _.indexOf(this.value, item.id);
      if (index > -1) {
        this.value.splice(index, 1);
      } else {
        this.value.push(item.id);
      }
    } else {
      this.value = item.id;
    }
    this.selectItem.emit(item);
    this.changeItems.emit(this._value);
  }

  onArrowUp() {
    let selectIndex = this.selectIndex;
    --selectIndex;

    if (selectIndex < 0) {
      selectIndex = this.items.length - 1;
    }

    this.selectIndex = selectIndex;
  }

  onArrowDown() {
    let selectIndex = this.selectIndex;
    ++selectIndex;

    if (selectIndex > this.items.length - 1) {
      selectIndex = 0;
    }

    this.selectIndex = selectIndex;
  }
}
