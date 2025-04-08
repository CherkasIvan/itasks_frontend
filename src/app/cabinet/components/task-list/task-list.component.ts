import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TaskModel} from '@core/models/task.model';
import {StoreTaskService} from '@core/services/store-task.service';
import {Subscription} from 'rxjs/Subscription';
import * as TaskActions from '@core/redux/task/task.actions';
import * as fromRoot from '@core/redux/index';
import {select, Store} from '@ngrx/store';
import {StatusModel} from '@core/models/status.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from '@core/models/user.model';
import {TagModel} from '@core/models/tag.model';
import {combineLatest} from 'rxjs/internal/observable/combineLatest';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Output() particleLoad: EventEmitter<void> = new EventEmitter<void>();
  private _subscriptions$: Subscription = new Subscription();
  items: TaskModel[] = [];
  itemsShow: TaskModel[] = [];
  statuses: StatusModel[] = [];
  isLoading = false;
  model = new TaskModel();
  openTaskId: string;
  isOpenCreateForm = false;
  isShowBacklog = false;
  /** Статус бэклога */
  backLogStatus: StatusModel;

  backlogStatus$: Observable<StatusModel>;
  taskList$: Observable<TaskModel[]>;

  constructor(private taskService: StoreTaskService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRoot.State>) {
    this.backlogStatus$ = this.store.pipe(select(fromRoot.getStatusBackLog), filter(_ => !!_));
    this.taskList$ = this.taskService.getTaskList();
  }

  ngOnInit() {
    this._subscribeTaskList();

    this._subscriptions$.add(this
      .route
      .queryParams
      .subscribe((params) => {
        if (params['responsibleId'] && Array.isArray(params['responsibleId'])) {
          this.model.responsibleId = params['responsibleId'][0];
        } else if (params['responsibleId']) {
          this.model.responsibleId = params['responsibleId'];
        } else {
          this.model.responsibleId = null;
        }

        if (params['statusId'] && Array.isArray(params['statusId'])) {
          this.model.statusId = params['statusId'][0];
        } else if (params['statusId']) {
          this.model.statusId = params['statusId'];
        } else {
          this.model.statusId = null;
        }
      }));

    this._subscriptions$.add(this
      .route
      .queryParams
      .subscribe((params) => {
        this.openTaskId = params['id'] || null;
      }));


    this._subscriptions$.add(this
      .store
      .pipe(select(fromRoot.getStatusEntities))
      .subscribe(items => this.statuses = items));

    this._subscriptions$.add(this
      .store
      .pipe(select(fromRoot.getTaskLoading))
      .subscribe(loading => this.isLoading = loading)
    );
  }

  onCreate() {
    if (!this.isLoading && this.model.name) {
      if (!this.model.statusId) {
        this.model.statusId = this.backLogStatus.id;
        this.isShowBacklog = true;
      }
      this.store.dispatch(new TaskActions.CreateAction(this.model));
      this.model.name = '';
    }
  }

  onToggleCreateForm() {
    this.isOpenCreateForm = !this.isOpenCreateForm;
  }

  /**
   * Фильтрация задач по пользователю (исполнителю задачи)
   *
   * @param {UserModel | null} user
   * @param {Event} event
   */
  onFilterByUser(user: UserModel | null, event: Event) {
    event.stopPropagation();
    if (user) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {responsibleId: user.id},
        queryParamsHandling: 'merge'
      });
    }
  }

  onFilterByTag(tag: TagModel, event: Event) {
    event.stopPropagation();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {tagId: tag.id},
      queryParamsHandling: 'merge'
    });
  }

  onFilterByStatus(status: StatusModel, event: Event) {
    event.stopPropagation();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {statusId: status.id},
      queryParamsHandling: 'merge'
    });
  }

  onToggleBacklog() {
    this.isShowBacklog = !this.isShowBacklog;
    this._filterTasks();
  }


  ngOnDestroy() {
    this._subscriptions$.unsubscribe();
  }

  private _filterTasks() {
    if (this.isShowBacklog) {
      this.itemsShow = this.items.slice(0);
    } else {
      this.itemsShow = this.items.filter(_ => _.statusId !== this.backLogStatus.id);
    }
  }

  private _subscribeTaskList() {
    this._subscriptions$
      .add(combineLatest(this.backlogStatus$, this.taskList$)
        .subscribe(results => {
          this.backLogStatus = results[0];
          this.items = results[1];
          this._filterTasks();
        })
      );
  }
}
