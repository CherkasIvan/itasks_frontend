import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SignUpStep1Component} from './components/sign-up-step-1/sign-up-step-1.component';
import {AuthComponent} from './auth.component';
import {SignUpStep2Component} from './components/sign-up-step-2/sign-up-step-2.component';
import {SignUpStep3Component} from './components/sign-up-step-3/sign-up-step-3.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {AuthGuardService} from '@core/services/auth-guard.service';
import {InviteConfirmComponent} from './components/invite-confirm/invite-confirm.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      },
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'sign-up/step-1',
        component: SignUpStep1Component,
        canActivate: [AuthGuardService],
      },
      {
        path: 'sign-up/step-2',
        component: SignUpStep2Component,
        canActivate: [AuthGuardService],
      },
      {
        path: 'sign-up/step-3',
        component: SignUpStep3Component,
        canActivate: [AuthGuardService],
      },
      {
        path: 'invite-confirmation/:token',
        component: InviteConfirmComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
