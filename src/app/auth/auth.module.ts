/**
 * Core
 */
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/**
 * Modules
 */
import {UxModule} from '@ux/ux.module';
import {AuthRoutingModule} from './auth-routing.module';
import {ImageCropperModule} from 'ngx-image-cropper';
/**
 * Components
 */
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpStep1Component} from './components/sign-up-step-1/sign-up-step-1.component';
import {SignUpStep2Component} from './components/sign-up-step-2/sign-up-step-2.component';
import {SignUpStep3Component} from './components/sign-up-step-3/sign-up-step-3.component';
import {AuthComponent} from './auth.component';
import {InviteConfirmComponent} from './components/invite-confirm/invite-confirm.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    UxModule,
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
  ],
  providers: [],
  declarations: [
    SignUpComponent,
    SignInComponent,
    SignUpStep1Component,
    SignUpStep2Component,
    SignUpStep3Component,
    AuthComponent,
    InviteConfirmComponent
  ]
})
export class AuthModule {
}
