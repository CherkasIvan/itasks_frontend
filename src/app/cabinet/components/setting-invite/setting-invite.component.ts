import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {InviteService} from '@core/services/invite.service';
import {IdentityModel} from '@core/models/identity.model';
import {InviteModel, RoleInterface} from '@core/models/invite.model';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, Validators} from '@angular/forms';
import {Validation} from '@core/validation/validation.abstract.class';
import * as InviteActions from '@core/redux/invite/invite.actions';
import * as fromRoot from '@core/redux';
import {Actions, ofType} from '@ngrx/effects';
import 'rxjs/add/operator/do';
import {InviteActionTypes} from '@core/redux/invite/invite.actions';

@Component({
  selector: 'app-setting-invite',
  templateUrl: './setting-invite.component.html',
  styleUrls: ['./setting-invite.component.less']
})
export class SettingInviteComponent extends Validation implements OnInit, OnDestroy {
  roles: RoleInterface[] = [];

  user: IdentityModel;
  subscription$: Subscription = new Subscription;
  isLoadingForm = false;
  activeInvite: InviteModel[] = [];
  notActiveInvite: InviteModel[] = [];

  constructor(private store: Store<fromRoot.State>,
              private updates: Actions,
              private formBuilder: FormBuilder,
              private inviteService: InviteService) {
    super();

    this.subscription$.add(this
      .store
      .pipe(select(fromRoot.getInviteNoDeleteEntities))
      .subscribe(invites => {
        this.activeInvite = invites.filter((invite) => invite.status === 'active');
        this.notActiveInvite = invites.filter((invite) => invite.status === 'noActive');
      }));
    this.roles = inviteService.findAllRoles();
    this.subscription$.add(this
      .store
      .pipe(select(fromRoot.getUser))
      .subscribe((user) => this.user = user));
    this.subscription$.add(this
      .store
      .pipe(select(fromRoot.getInviteErrors))
      .subscribe((errors) => this.validateErrors = errors));
    this.subscription$.add(this
      .store
      .pipe(select(fromRoot.getInviteLoading))
      .subscribe((isLoading) => this.isLoadingForm = isLoading));

    this.subscription$.add(updates
      .pipe(ofType(InviteActionTypes.CreateSuccessAction))
      .subscribe(() => {
        this._initForm();
      })
    );

    this.subscription$.add(updates
      .pipe(ofType(InviteActionTypes.ResendEmailFailureAction))
      .subscribe(() => {
        alert('Ошибка повторной отправки приглашения');
      })
    );

    this._initForm();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(new InviteActions.CreateAction(this.form.getRawValue()));
    }
  }

  onResend(id) {
    this.store.dispatch(new InviteActions.ResendEmailAction(id));
  }

  onDelete(id) {
    this.store.dispatch(new InviteActions.DeleteAction(id));
  }

  onChangeRole(invite: InviteModel) {
    this.store.dispatch(new InviteActions.SaveAction(invite));
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      role: [this.roles[0].id, Validators.compose([Validators.required])]
    });
  }
}
