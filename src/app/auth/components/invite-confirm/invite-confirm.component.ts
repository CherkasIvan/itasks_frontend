import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { pluck, filter } from "rxjs/operators"; // Импортируйте pluck и filter
import { select, Store } from "@ngrx/store";
import * as fromRoot from "@core/redux";
import * as AuthActions from "@core/redux/auth/auth.actions";
import { getToken } from "@core/utils/getToken";

@Component({
  selector: "app-invite-confirm",
  templateUrl: "./invite-confirm.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  styleUrls: ["./invite-confirm.component.less"],
})
export class InviteConfirmComponent implements OnInit, OnDestroy {
  subscription$: Subscription = new Subscription();
  nextButton: string;
  errors: { token: string };

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) {
    this.subscription$.add(
      route.params
        .pipe(
          pluck("token"),
          filter((token) => !!token)
        )
        .subscribe((token: string) => {
          this.store.dispatch(new AuthActions.InviteConfirmationAction(token));
        })
    );

    this.subscription$.add(
      store.pipe(select(fromRoot.getAuthErrors)).subscribe((errors) => {
        this.errors = errors;
        if (errors) {
          const token = getToken();
          if (token) {
            this.nextButton = "goCabinet";
          } else {
            this.nextButton = "goSignIn";
          }
        }
      })
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
