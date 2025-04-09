import { Component, OnDestroy, OnInit } from "@angular/core";
import { CabinetComponent } from "../../cabinet.component";
import { ActivatedRoute, Router } from "@angular/router";
import { UserModel } from "@core/models/user.model";
import { select, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { TaskQueryService } from "@core/services/query/task.query.service";
import * as fromRoot from "@core/redux";

@Component({
  selector: "app-sidebar-user",
  templateUrl: "./sidebar-user.component.html",
  styleUrls: ["./sidebar-user.component.less"],
})
export class SidebarUserComponent implements OnInit, OnDestroy {
  /** Подписки */
  subscription$: Subscription = new Subscription();
  isAdmin = false;

  /**
   *
   * @param {CabinetComponent} cabinetComponent
   * @param {Store<State>} store
   * @param taskQueryService
   * @param {Router} router
   * @param {ActivatedRoute} route
   */
  constructor(
    public cabinetComponent: CabinetComponent,
    private store: Store<fromRoot.State>,
    private taskQueryService: TaskQueryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription$.add(
      this.store
        .pipe(select(fromRoot.getUserCanAdmin))
        .subscribe((isAdmin: boolean) => (this.isAdmin = isAdmin))
    );
  }

  /**
   * Отписываемся от всех подписок
   */
  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  /**
   * Открыть настройки пользователей, форма приглашения
   */
  onOpenSettings() {
    this.router.navigate([{ outlets: { popup: ["settings", "user"] } }], {
      relativeTo: this.route,
    });
  }

  /**
   * Фильтрация задач по пользователю (исполнителю задачи)
   *
   * @param {UserModel} user
   */
  onFilterByUser(user: UserModel) {
    this.taskQueryService.toggleResponsible(user.id);
  }

  /**
   * Активированный пользователь
   *
   * @param user
   */
  getInActive(user: UserModel) {
    return this.taskQueryService.isActiveResponsible(user.id);
  }
}
