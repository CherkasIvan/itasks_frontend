import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TaskModel} from '@core/models/task.model';
import {BoardColumnComponent} from '../board-column/board-column.component';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {select, Store} from '@ngrx/store';
import * as TaskActions from '@core/redux/task/task.actions';
import * as fromRoot from '@core/redux';
import {UserModel} from '@core/models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TagModel} from '@core/models/tag.model';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardCardComponent implements OnDestroy {
  /** Модель задачи */
  @Input() model: TaskModel;
  /** ID задачи */
  @Input() taskId: string;
  /** Индекс в списке */
  @Input() index: number;

  /** Подписываемся на стор уведомления загрузки данных */
  taskLoading$: Observable<any>;
  /** Подписки */
  subscription$: Subscription = new Subscription;
  /** Отправка, блокируем кнопки */
  isSending = false;

  /**
   *
   * @param {BoardColumnComponent} boardColumnComponent
   * @param {Store<State>} store
   * @param {Router} router
   * @param {ActivatedRoute} route
   */
  constructor(public boardColumnComponent: BoardColumnComponent,
              private store: Store<fromRoot.State>,
              private router: Router,
              private route: ActivatedRoute) {
    this.taskLoading$ = this.store.pipe(select(fromRoot.getTaskLoading));
    this.subscription$.add(this.taskLoading$.subscribe(loading => this.isSending = loading));
  }

  /**
   * Выполняется перед уничтожением компонента
   */
  ngOnDestroy() {
    this._allowUpdateList();
    this.subscription$.unsubscribe();
  }

  /**
   * Убрали фокус с поля ввода названия задачи
   * Если есть что-то в поле тогда отправляем на сохранение задачи иначе закрываем форму
   *
   * @param {TaskModel} model
   */
  onBlur(model: TaskModel) {
    this._allowUpdateList();
    if (model.name.length === 0) {
      this.boardColumnComponent.items.splice(model.insertIndex, 1);
    } else {
      this.store.dispatch(new TaskActions.CreateAction(model));
    }
  }

  /**
   * Создание задачи
   *
   * @param {TaskModel} model
   * @param {Event} event
   */
  onSave(model: TaskModel, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.isSending) {
      this._allowUpdateList();
      this.store.dispatch(new TaskActions.CreateAction(model));
    }
  }

  /**
   * Фильтрация задач по пользователю (исполнителю задачи)
   *
   * @param {UserModel} user
   * @param {Event} event
   */
  onFilterByUser(user: UserModel, event: Event) {
    event.stopPropagation();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {responsibleId: user.id}
    });
  }

  onFilterByTag(tag: TagModel, event: Event) {
    event.stopPropagation();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {tagId: tag.id}
    });
  }

  /**
   * Блокируем редактирование доски
   * @private
   */
  private _allowUpdateList() {
    this.boardColumnComponent.allowUpdate = true;
  }
}
