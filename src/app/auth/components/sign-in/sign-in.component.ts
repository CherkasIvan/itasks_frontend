import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {select, Store} from '@ngrx/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as fromRoot from '@core/redux';
import * as AuthActions from '@core/redux/auth/auth.actions';

declare var gapi: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit, OnDestroy, AfterViewInit {
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
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, [Validators.required]],
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
    this.store.dispatch(new AuthActions.SignInAction(this.form.getRawValue()));
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
