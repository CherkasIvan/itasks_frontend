import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { UserModel } from "@core/models/user.model";
import * as _ from "lodash";
import * as fromRoot from "@core/redux";
import { select, Store } from "@ngrx/store";
import { InviteModel } from "@core/models/invite.model";
import { Subscription } from "rxjs";
import { IdentityModel } from "@core/models/identity.model";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "ux-popup-user",
  templateUrl: "./popup-user.component.html",
  imports: [FormsModule],
  standalone: true,
  styleUrls: ["./popup-user.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupUserComponent implements OnInit, OnDestroy {
  @Input() header = "Исполнитель";
  @Input() multiple = false;
  @Output() selectItem = new EventEmitter<UserModel | IdentityModel>();
  @Output() changeItems = new EventEmitter<string[]>();

  private _value: any;

  @Input()
  set value(value) {
    this._value = value;
  }

  get value(): any {
    return this._value;
  }

  items: InviteModel[] = [];
  user: UserModel | IdentityModel;
  match: string;
  selectIndex = -1;

  subscription$: Subscription = new Subscription();

  constructor(private store: Store<fromRoot.State>) {
    this.subscription$.add(
      this.store
        .pipe(select(fromRoot.getInviteActiveEntities))
        .subscribe((invites) => (this.items = invites))
    );

    this.subscription$.add(
      this.store
        .pipe(select(fromRoot.getUser))
        .subscribe((user: IdentityModel) => (this.user = user))
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
      const index = _.indexOf(this._value, item.id);
      if (index > -1) {
        this._value.splice(index, 1);
      } else {
        this._value.push(item.id);
      }
    } else {
      this._value = item.id;
    }
    this.selectItem.emit(item);
    this.changeItems.emit(this._value);
  }

  onSelectOwner() {
    this.onSelect(this.user);
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
