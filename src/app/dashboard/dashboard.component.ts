import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromRoot from "@core/redux/index";
import * as ProjectActions from "@core/redux/project/project.actions";
import * as PopupActions from "@core/redux/popup/popup.actions";
import { IdentityModel } from "@core/models/identity.model";
import { Observable, Subscription } from "rxjs";
import * as AuthActions from "@core/redux/auth/auth.actions";
import { ProjectModel } from "@core/models/project.model";
import { NgClass, NgSwitch } from "@angular/common";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  standalone: true,
  styleUrls: ["./dashboard.component.less"],
  imports: [NgSwitch, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _subscriptions$: Subscription = new Subscription();

  popupProjectMenu$: Observable<any>;
  popupProjectForm$: Observable<any>;
  subscription$: Subscription = new Subscription();
  isArchiveProjectList = false;
  isOpenChangeProjectListPopup = false;
  user: IdentityModel;

  activeProjectList: ProjectModel[] = [];
  archiveProjectList: ProjectModel[] = [];

  constructor(private store: Store<fromRoot.State>) {
    this.popupProjectMenu$ = store.pipe(select(fromRoot.getPopupProjectMenu));
    this.popupProjectForm$ = store.pipe(select(fromRoot.getPopupProjectForm));
  }

  ngOnInit() {
    this.store.dispatch(new ProjectActions.SearchAction());
    this.store.dispatch(new AuthActions.GetUserAction());

    this.subscription$.add(
      this.store
        .pipe(select(fromRoot.getUser))
        .subscribe((user) => (this.user = user))
    );

    this._subscriptions$.add(
      this.store
        .pipe(select(fromRoot.getProjectActiveEntities))
        .subscribe((projects) => (this.activeProjectList = projects))
    );

    this._subscriptions$.add(
      this.store
        .pipe(select(fromRoot.getProjectArchiveEntities))
        .subscribe((projects) => (this.archiveProjectList = projects))
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
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
    this.store.dispatch(new PopupActions.OpenProjectFormMenu(position, 100));
  }

  onOpenProjectMenu($event, projectId) {
    $event.stopPropagation();
    $event.preventDefault();
    const bottom = window.innerHeight - $event.pageY - 67;
    const position = bottom < 15 ? 15 : bottom;
    this.store.dispatch(new ProjectActions.SelectUpdateAction(projectId));
    this.store.dispatch(new PopupActions.OpenProjectMenu(position));
  }

  onChangeProjectList(isArchiveProjectList) {
    this.isArchiveProjectList = isArchiveProjectList;
    this.isOpenChangeProjectListPopup = false;
  }

  onOpenChangeProjectListPopup() {
    this.isOpenChangeProjectListPopup = !this.isOpenChangeProjectListPopup;
  }
}
