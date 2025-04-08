import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import * as AuthActions from '@core/redux/auth/auth.actions';
import * as fromRoot from '@core/redux/index';
import {SignUpSecurityModel} from '@core/models/sign-up-security.model';

@Component({
  selector: 'app-sign-up-step-2',
  templateUrl: './sign-up-step-2.component.html',
  styleUrls: ['./sign-up-step-2.component.less']
})
export class SignUpStep2Component implements OnInit, OnDestroy {
  subscription$: Subscription = new Subscription;
  model: SignUpSecurityModel = new SignUpSecurityModel();
  isSending = false;
  validateErrors: any = {};

  constructor(private store: Store<fromRoot.State>) {
    this.subscription$.add(this.store
      .pipe(select(fromRoot.getAuthErrors))
      .subscribe((errors) => {
        this.validateErrors = errors;
      }));

    this.subscription$.add(this.store
      .pipe(select(fromRoot.getLoading))
      .subscribe((isSending) => {
        this.isSending = isSending;
      }));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onSubmit() {
    this.store.dispatch(new AuthActions.SignUpStepSecurityAction(this.model));
  }
}
