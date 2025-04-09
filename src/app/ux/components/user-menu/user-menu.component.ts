import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { IdentityModel } from "@core/models/identity.model";
import * as fromRoot from "@core/redux";
import { CabinetComponent } from "@cabinet/cabinet.component";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { HeaderComponent } from "@cabinet/components/header/header.component";
import * as AuthActions from "@core/redux/auth/auth.actions";
import { AvatarComponent } from "../avatar/avatar.component";

@Component({
  selector: "ux-user-menu",
  templateUrl: "./user-menu.component.html",
  imports: [AvatarComponent],
  standalone: true,
  styleUrls: ["./user-menu.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent implements OnInit, OnDestroy {
  user: IdentityModel;
  subscription$: Subscription = new Subscription();

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private route: ActivatedRoute,
    private headerComponent: HeaderComponent,
    public cabinetComponent: CabinetComponent
  ) {
    this.subscription$.add(
      this.store
        .pipe(select(fromRoot.getUser))
        .subscribe((user) => (this.user = user))
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onLogout() {
    this.router.navigate(["/auth/sign-in"]);
    this.store.dispatch(new AuthActions.SignOutAction());
  }

  /**
   * Открыть настройки пользователей, форма приглашения
   */
  onOpenSettings() {
    this.headerComponent.onClose();
    this.router.navigate([{ outlets: { popup: ["settings", "user"] } }], {
      relativeTo: this.route,
    });
  }
}
