import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { CabinetComponent } from "../../cabinet.component";
import * as fromRoot from "@core/redux/index";
import * as LayoutAction from "@core/redux/layout/layout.actions";
import { IdentityModel } from "@core/models/identity.model";
import { Subscription } from "rxjs";
import { FastSearchComponent } from "../fast-search/fast-search.component";
import { MenuComponent } from "../menu/menu.component";
import { AvatarComponent } from "@ux/components/avatar/avatar.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"],
  imports: [FastSearchComponent, MenuComponent, AvatarComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: IdentityModel;
  subscription$: Subscription = new Subscription();
  isOpenMenu = false;

  constructor(
    private store: Store<fromRoot.State>,
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

  onToggleSidebar() {
    this.store.dispatch(new LayoutAction.OpenSidebar());
  }

  onToggleMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  onClose() {
    this.isOpenMenu = false;
  }
}
