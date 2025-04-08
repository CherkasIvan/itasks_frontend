import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {SocketService} from '@core/services/socket.service';
import {MessageService} from '@core/services/message.service';
import {InviteModel} from '@core/models/invite.model';
import {TaskModel} from '@core/models/task.model';
import {ProjectModel} from '@core/models/project.model';
// import {ElectronService} from '@core/services/electron.service';
import * as fromRoot from '@core/redux/index';
import * as ProjectActions from '@core/redux/project/project.actions';
import * as StatusActions from '@core/redux/status/status.actions';
import * as TagActions from '@core/redux/tag/tag.actions';
import * as TaskActions from '@core/redux/task/task.actions';
import * as InviteActions from '@core/redux/invite/invite.actions';
import * as FilterActions from '@core/redux/filter/filter.actions';
import 'rxjs/add/operator/filter';
import {ImageService} from '@core/services/image/image.service';
import {animate, style, transition, trigger} from '@angular/animations';
import * as AuthActions from '@core/redux/auth/auth.actions';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.less'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({marginLeft: -220}),
          animate('152ms ease-in', style({marginLeft: 0}))
        ]),
        transition(':leave', [
          style({marginLeft: 0}),
          animate('152ms ease-out', style({marginLeft: -220}))
        ])
      ]
    )
  ]
})
export class CabinetComponent implements OnInit, OnDestroy {
  /** Показывать ли сайдбар */
  isShowSidebar$: Observable<boolean>;
  /** Показывать ли сайдбар фильтров*/
  isShowSidebarFilter$: Observable<boolean>;
  /** Попап меню проекта */
  popupProjectMenu$: Observable<any>;
  /** Попап управления проектом */
  popupProjectForm$: Observable<any>;
  /** Список проектов */
  projectList$: Observable<ProjectModel[]>;
  /** Список статусов */
  statusList$: Observable<TaskModel[]>;
  /** Список инвайтов */
  inviteList$: Observable<InviteModel[]>;
  /** Подписки */
  subscription$: Subscription = new Subscription;
  /** ID открытого проекта */
  projectSelectedId: string;
  /** ID открытой задачи */
  taskOpenId: string;
  layout: 'board' | 'table';

  /**
   *
   * @param {Store<State>} store
   * @param {SocketService} socket
   * @param {MessageService} messageService
   // * @param {ElectronService} electronService
   * @param {SocketService} socketService
   * @param {Router} router
   * @param {ActivatedRoute} route
   */
  constructor(private store: Store<fromRoot.State>,
              private socket: SocketService,
              private messageService: MessageService,
              // private electronService: ElectronService,
              public imageService: ImageService,
              private router: Router,
              private route: ActivatedRoute) {
    this.isShowSidebar$ = store.pipe(select(fromRoot.getShowSidebar));
    this.isShowSidebarFilter$ = store.pipe(select(fromRoot.getShowSidebarFilter));
    this.popupProjectMenu$ = store.pipe(select(fromRoot.getPopupProjectMenu));
    this.popupProjectForm$ = store.pipe(select(fromRoot.getPopupProjectForm));
    this.projectList$ = store.pipe(select(fromRoot.getProjectActiveEntities));
    this.statusList$ = store.pipe(select(fromRoot.getStatusEntities));
    this.inviteList$ = store.pipe(select(fromRoot.getInviteActiveEntities));

    this
      .subscription$
      .add(this
        .store
        .pipe(select(fromRoot.getTaskSelectedId))
        .subscribe(id => this.taskOpenId = id)
      );

    // Получаем из стора ID проекта, загружаем данные и подписываемся на получение пользователей онлайн для проекта
    this
      .subscription$
      .add(store
        .pipe(select(fromRoot.getProjectSelectedId))
        .subscribe((id) => {
          this.projectSelectedId = id;
          setTimeout(() => {
            this._initData();
            this.socket.listenOnline(id);
          });
        }));


    // Как только авторизовались подписываемся на сокет
    this
      .subscription$
      .add(store
        .pipe(select(fromRoot.getToken))
        .filter((token) => !!token)
        .subscribe((token: string) => {
          this.socket.listen(token);
        }));

    // Подписываемся на роутинг params
    this
      .subscription$
      .add(route
        .params
        .pluck('projectId')
        .filter((projectId) => !!projectId)
        .subscribe((projectId: string) => {
          this.store.dispatch(new ProjectActions.SelectAction(projectId));
        }));

    // Если это APP
    // if (electronService.isElectron()) {
    //   this
    //     .subscription$
    //     .add(store
    //       .pipe(select(fromRoot.getNotificationsTask))
    //       .subscribe((tasks) => {
    //         this._updateBadge(tasks);
    //       }));
    //
    //   // Как только возобновили апп из дока сразу загружаем все данные с апи
    //   this
    //     .electronService
    //     .remote
    //     .powerMonitor
    //     .on('resume', () => {
    //       if (this.projectSelectedId) {
    //         this._initData();
    //       }
    //     });
    // }
  }

  ngOnInit() {
    this.store.dispatch(new ProjectActions.SearchAction());
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  /**
   * Обновление badge в MacOs
   * @param tasks
   * @private
   */
  private _updateBadge(tasks) {
    let count = 0;

    if (tasks) {
      tasks.forEach((task) => {
        count += task.countNotifications;
      });
    }

    // this.electronService.remote.app.dock.setBadge(count ? count.toString() : '');
  }

  /**
   * Инициализация загрузки данных
   * @private
   */
  private _initData() {
    this.store.dispatch(new AuthActions.GetUserAction());
    this.store.dispatch(new FilterActions.SearchAction());
    this.store.dispatch(new TagActions.SearchAction());
    this.store.dispatch(new StatusActions.SearchAction());
    this.store.dispatch(new TaskActions.SearchFavoriteAction());
    this.store.dispatch(new TaskActions.SearchNotificationAction());
    this.store.dispatch(new InviteActions.SearchAction({}));
  }
}
