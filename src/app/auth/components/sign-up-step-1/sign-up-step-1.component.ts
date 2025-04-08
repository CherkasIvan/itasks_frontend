import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {FileService} from '@core/services/file.service';
import {select, Store} from '@ngrx/store';
import * as AuthActions from '@core/redux/auth/auth.actions';
import * as fromRoot from '@core/redux/index';
import {AppComponent} from '../../../app.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-sign-up-step-1',
  templateUrl: './sign-up-step-1.component.html',
  styleUrls: ['./sign-up-step-1.component.less']
})
export class SignUpStep1Component implements OnInit, OnDestroy {
  form: FormGroup;
  subscription$: Subscription = new Subscription;
  isSending = false;
  validateErrors: any = {};
  avatarChangedEvent: any = '';
  croppedAvatar: any = '';
  showCrop = false;

  constructor(private store: Store<fromRoot.State>,
              private fileService: FileService,
              private formBuilder: FormBuilder,
              private appComponent: AppComponent) {
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
      phone: [null, Validators.required],
      firstName: [null, Validators.compose([Validators.required, Validators.min(2)])],
      lastName: [null, Validators.min(2)],
      avatarId: [null]
    });

    this.form.setValue({
      phone: null,
      avatarId: null,
      firstName: this.appComponent.userIdentity.firstName,
      lastName: this.appComponent.userIdentity.lastName
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onSubmit() {
    if (this.croppedAvatar) {
      this
        .fileService
        .uploadAvatar(this.croppedAvatar)
        .subscribe((response) => {
          this.form.controls['avatarId'].setValue(response['id']);
          this.store.dispatch(new AuthActions.SignUpStepPersonalDataAction(this.form.getRawValue()));
        });
    } else {
      this.store.dispatch(new AuthActions.SignUpStepPersonalDataAction(this.form.getRawValue()));
    }
  }

  onFileChangeEvent(event: any) {
    this.showCrop = true;
    this.avatarChangedEvent = event;
  }

  onImageCropped(event: ImageCroppedEvent) {
    this.croppedAvatar = event.base64;
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'input_theme-1_error': this.isFieldValid(field),
    };
  }
}
