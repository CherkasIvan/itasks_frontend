import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
} from "@angular/core";
import { DatePipe, NgClass } from "@angular/common";
import { UserModel } from "@core/models/user.model";
import { ImagePreviewPipe } from "@ux/pipes/image-preview.pipe";
import * as moment from "moment";
import { getUserId } from "@core/utils/getUserId";

@Component({
  selector: "ux-avatar",
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.less"],
  imports: [DatePipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {
  private _user: UserModel;
  private _authUserId: string;
  private _active = false;
  @Input() showDeleteBtn = false;
  @Output() remove = new EventEmitter();

  @Input()
  set active(value: boolean) {
    this._active = value;
    this._setStyle();
  }

  @Input()
  set user(user: UserModel) {
    this._user = user;
    this._setStyle();
    this._setAvatarUrl();
    this._setUserName();
  }

  get user() {
    return this._user;
  }

  shortUserName: string;
  image: string;

  constructor(
    @Self()
    private ngClass: NgClass,
    private imagePreviewPipe: ImagePreviewPipe
  ) {
    this._authUserId = getUserId();
  }

  ngOnInit(): void {}

  get isOnline() {
    if (!this.user) {
      return false;
    }

    if (this.user.id === this._authUserId) {
      return true;
    }

    const lastActiveDate = moment(this.user.activityAt)
      .add(5, "minutes")
      .valueOf();
    const currentDate = moment().valueOf();

    return lastActiveDate >= currentDate;
  }

  private _setAvatarUrl() {
    if (this._user && this._user.avatar) {
      this.image = this.imagePreviewPipe.transform(
        this._user.avatar,
        150,
        150,
        true
      );
    } else {
      this.image = null;
    }
  }

  private _setUserName() {
    if (this._user) {
      this.shortUserName = this._user.firstName ? this._user.firstName[0] : "?";
    } else {
      this.shortUserName = null;
    }
  }

  private _setStyle() {
    const classes = [];

    if (this._user) {
      classes.push(this._user.avatarCssStyle);
    } else {
      classes.push("avatar_bg-empty");
    }

    if (this._active) {
      classes.push("avatar_active");
    }

    this.ngClass.ngClass = classes;
    this.ngClass.ngDoCheck();
  }
}
