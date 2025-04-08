import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CabinetComponent} from '../../cabinet.component';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '@core/redux/index';
import * as PopupAction from '@core/redux/popup/popup.actions';
import * as LayoutAction from '@core/redux/layout/layout.actions';
import * as ProjectAction from '@core/redux/project/project.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskModel} from '@core/models/task.model';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent implements OnInit {
  private _subscriptions$: Subscription = new Subscription();
  isShowSidebarFavorite = false;
  isShowSidebarChat = false;
  projectSelectedIdUpdateItem: string;
  notificationsTask: TaskModel[] = [];
  favoriteTask: TaskModel[] = [];

  constructor(public cabinetComponent: CabinetComponent,
              private deviceService: DeviceDetectorService,
              private store: Store<fromRoot.State>,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this._subscriptions$
      .add(this
        .store
        .pipe(select(fromRoot.getFavoritesTask))
        .subscribe((tasks: TaskModel[]) => this.favoriteTask = tasks));

    this._subscriptions$
      .add(this
        .store
        .pipe(select(fromRoot.getShowSidebarFavorite))
        .subscribe((isShow: boolean) => this.isShowSidebarFavorite = isShow));

    this._subscriptions$
      .add(this
        .store
        .pipe(select(fromRoot.getShowSidebarChat))
        .subscribe((isShow: boolean) => this.isShowSidebarChat = isShow));

    this._subscriptions$
      .add(this
        .store
        .pipe(select(fromRoot.getProjectSelectedIdForUpdate))
        .subscribe((id: string) => this.projectSelectedIdUpdateItem = id));

    this._subscriptions$
      .add(this
        .store
        .pipe(select(fromRoot.getNotificationsTask))
        .subscribe((tasks: TaskModel[]) => this.notificationsTask = tasks));
  }

  onOpenProjectMenu($event, projectId) {
    $event.stopPropagation();
    $event.preventDefault();
    const bottom = window.innerHeight - $event.pageY - 67;
    const position = bottom < 15 ? 15 : bottom;
    this.store.dispatch(new ProjectAction.SelectUpdateAction(projectId));
    this.store.dispatch(new PopupAction.OpenProjectMenu(position));
  }

  onOpenCreateForm($event) {
    let position = 0;
    const popupHeight = 295;
    const halfPopupHeight = popupHeight / 2;
    const screenHeight = window.innerHeight;
    const topHeight = $event.pageY;
    const bottomHeight = screenHeight - topHeight;

    if (halfPopupHeight <= topHeight && halfPopupHeight <= bottomHeight) {
      position = topHeight - halfPopupHeight;
    } else if (halfPopupHeight > topHeight) {
      position = 15;
    } else if (halfPopupHeight > bottomHeight) {
      position = screenHeight - popupHeight - 15;
    }
    this.store.dispatch(new PopupAction.OpenProjectFormMenu(position, 100));
  }

  onCloseSidebar() {
    this.store.dispatch(new LayoutAction.CloseSidebar());
  }

  onToggleFavorite() {
    this.store.dispatch(new LayoutAction.ToggleSidebarFavorite());
  }

  onToggleChat() {
    this.store.dispatch(new LayoutAction.ToggleSidebarChat());
  }

  onOpenTask(task: TaskModel) {
    if (this.cabinetComponent.layout === 'board') {
      this.router.navigate(['/cabinet', task.projectId, 'load', {outlets: {task: ['view', task.id]}}], {
        queryParamsHandling: 'merge'
      });
    } else {
      this.router.navigate(['/cabinet', task.projectId, 'load', 'list'], {
        queryParams: {id: task.id},
        queryParamsHandling: 'merge'
      });
    }
    if (this.deviceService.isMobile()) {
      this.onCloseSidebar();
    }
  }

  onChangeProject(id) {
    if (this.cabinetComponent.layout === 'board') {
      this.router.navigate(['/cabinet', id, 'load']);
    } else {
      this.router.navigate(['/cabinet', id, 'load', 'list']);
    }
    if (this.deviceService.isMobile()) {
      this.onCloseSidebar();
    }
  }
}
