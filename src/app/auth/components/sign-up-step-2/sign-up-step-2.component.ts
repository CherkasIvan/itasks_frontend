import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as AuthActions from "@core/redux/auth/auth.actions";
import * as fromRoot from "@core/redux/index";
import { SignUpSecurityModel } from "@core/models/sign-up-security.model";
import { NgClass, NgSwitch } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PasswordStrengthComponent } from "@ux/components/password-strength/password-strength.component";

@Component({
  selector: "app-sign-up-step-2",
  templateUrl: "./sign-up-step-2.component.html",
  standalone: true,
  imports: [NgClass, NgSwitch, FormsModule, PasswordStrengthComponent],
  styleUrls: ["./sign-up-step-2.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpStep2Component implements OnInit, OnDestroy {
  subscription$: Subscription = new Subscription();
  model: SignUpSecurityModel = new SignUpSecurityModel();
  isSending = false;
  validateErrors: any = {};

  constructor(private store: Store<fromRoot.State>) {
    this.subscription$.add(
      this.store.pipe(select(fromRoot.getAuthErrors)).subscribe((errors) => {
        this.validateErrors = errors;
      })
    );

    this.subscription$.add(
      this.store.pipe(select(fromRoot.getLoading)).subscribe((isSending) => {
        this.isSending = isSending;
      })
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onSubmit() {
    this.store.dispatch(new AuthActions.SignUpStepSecurityAction(this.model));
  }
}
