import {Component, Input, OnInit} from '@angular/core';
import {MessageModel} from '@core/models/message.model';
import {Store} from '@ngrx/store';
import * as MessageActions from '@core/redux/message/message.actions';
import * as fromRoot from '@core/redux';
import * as _ from 'lodash';
import {getUserId} from '@core/utils/getUserId';
import {ImageService} from '@core/services/image/image.service';

@Component({
  selector: 'app-task-view-comment-item',
  templateUrl: './task-view-comment-item.component.html',
  styleUrls: ['./task-view-comment-item.component.less']
})
export class TaskViewCommentItemComponent implements OnInit {
  /**
   * Сообщение
   */
  @Input() message: MessageModel;

  /**
   * ID автора предыдущего сообщения
   */
  @Input() prevUserId: string | boolean;

  /**
   * Показывать или не показывать меню сообщения
   * @type {boolean}
   */
  isShowMenu = false;

  /**
   * Флаг подтверждения удаления сообщения
   * @type {number}
   */
  deleteConfirm = 0;

  /**
   *
   * @type {any[]}
   */
  images = [];

  /**
   *
   * @type {any[]}
   */
  files = [];

  userId: string;

  /**
   * Конструктор
   * @param {Store<State>} store
   * @param imageService
   */
  constructor(private store: Store<fromRoot.State>,
              public imageService: ImageService) {
    this.userId = getUserId();
  }

  /**
   * Инициализация компонента
   */
  ngOnInit() {
    this.images = this.message.files.filter((file) => file.isImage);
    this.files = this.message.files.filter((file) => !file.isImage);
    this.images = _.chunk(this.images, Math.ceil(this.images.length / 4));
  }

  /**
   * Показать / спрятать меню
   */
  onToggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  /**
   * Закрыть меню
   */
  onCloseMenu() {
    this.isShowMenu = false;
  }

  /**
   * Закрепить сообщение
   */
  onPin() {
    this.message.isPin = !this.message.isPin;
    this.store.dispatch(new MessageActions.PinAction(this.message));
  }

  /**
   * Поставить / снять лайк сообщению
   */
  onLike() {
    this.message.isLike = !this.message.isLike;
    this.store.dispatch(new MessageActions.LikeAction(this.message));
  }

  /**
   * Удалить сообщение
   */
  onDelete() {
    ++this.deleteConfirm;
    if (this.deleteConfirm === 2) {
      this.store.dispatch(new MessageActions.DeleteAction(this.message));
    }
  }

  onEdit() {
    this.store.dispatch(new MessageActions.SetEditId(this.message.id));
  }

  /**
   * Сохранить сообщение
   */
  private _save() {
    this.store.dispatch(new MessageActions.SaveAction(this.message));
  }
}
