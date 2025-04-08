import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserModel} from '@core/models/user.model';

@Component({
  selector: 'ux-avatar-select',
  templateUrl: './avatar-select.component.html',
  styleUrls: ['./avatar-select.component.less']
})
export class AvatarSelectComponent implements OnInit {

  @Input() popupStyle = {};
  @Output() select = new EventEmitter<string>();
  @Output() remove = new EventEmitter();

  private _user: UserModel;
  private _value: any;

  @Input()
  set value(value) {
    this._value = value;
  }

  get value(): any {
    return this._value;
  }

  @Input()
  set user(user: UserModel) {
    this._user = user;
  }

  get user(): UserModel {
    return this._user;
  }

  isOpenPopup = false;

  constructor() {
  }

  ngOnInit() {
  }

  onTogglePopup(): void {
    this.isOpenPopup = !this.isOpenPopup;
  }

  onClosePopup(): void {
    this.isOpenPopup = false;
  }

  onSelect(user: UserModel) {
    this.onClosePopup();
    this.select.emit(user.id);
  }
}
