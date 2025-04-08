import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as AuthActions from '@core/redux/auth/auth.actions';
import * as fromRoot from '@core/redux/index';

declare var gapi: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
})
export class SignUpComponent implements OnInit, OnDestroy, AfterViewInit {
  form: FormGroup;
  subscription$: Subscription = new Subscription;
  validateErrors: any = {};
  isSending = false;
  googleAuth: any;

  constructor(private store: Store<fromRoot.State>,
              private formBuilder: FormBuilder,
              private zone: NgZone) {
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
    this.form = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  ngAfterViewInit() {
    this.zone.run(() => {
      gapi.load('auth2', () => {
        this.googleAuth = gapi.auth2.init({
          clientId: '1049746922847-fk4hg4fb1787947gjnkcaadd7nn4p4gd.apps.googleusercontent.com',
          scope: 'email profile'
        });
      });
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onGoogleAuth() {
    this.googleAuth
      .grantOfflineAccess()
      .then((result) => this._signInSuccessHandler(result));
  }

  onSubmit() {
    this.store.dispatch(new AuthActions.SignUpAction(this.form.getRawValue()));
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'input_theme-1_error': this.isFieldValid(field),
    };
  }

  private _signInSuccessHandler(result: { code }) {
    this.zone.run(() => {
      this.store.dispatch(new AuthActions.SignUpGoogleAction(result));
    });
  }
}
