import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import {tap, map, switchMap, catchError} from 'rxjs/operators';
import {
  AuthActionTypes,
  SignUpAction,
  SignUpSuccessAction,
  SignUpFailureAction,
  SignUpStepPersonalDataAction,
  SignUpStepPersonalDataSuccessAction,
  SignUpStepPersonalDataFailureAction,
  SignUpStepSecurityAction,
  SignUpStepSecuritySuccessAction,
  SignUpStepSecurityFailureAction,
  SignUpStepInterviewAction,
  SignUpStepInterviewSuccessAction,
  SignUpStepInterviewFailureAction,
  SignUpGoogleAction, SignInAction, SignInSuccessAction, SignInFailureAction, InviteConfirmationAction,
  InviteConfirmationFailureAction, InviteConfirmationSuccessAction, GetUserSuccessAction, GetUserFailureAction,
} from './auth.actions';
import {AuthService} from '../../services/auth.service';
import {InviteService} from '@core/services/invite.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private inviteService: InviteService,
              private router: Router) {
  }

  @Effect()
  inviteConfirmation$ = this.actions$.pipe(
    ofType(AuthActionTypes.InviteConfirmationAction),
    map((action: InviteConfirmationAction) => action.payload),
    switchMap((token) => {
        return this.inviteService
          .confirmation(token)
          .pipe(
            map((user) => new InviteConfirmationSuccessAction(user)),
            catchError((errors) => of(new InviteConfirmationFailureAction(errors)))
          );
      }
    )
  );

  @Effect({dispatch: false})
  inviteConfirmationSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.InviteConfirmationSuccessAction),
    tap(() => this.router.navigate(['/dashboard']))
  );

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(AuthActionTypes.GetUserAction),
    switchMap(() => {
        return this.authService
          .getUser()
          .pipe(
            map((user) => new GetUserSuccessAction(user)),
            catchError((errors) => of(new GetUserFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  signUp$ = this.actions$.pipe(
    ofType(AuthActionTypes.SignUpAction),
    map((action: SignUpAction) => action.payload),
    switchMap((model) => {
        return this.authService
          .signUp(model)
          .pipe(
            map((user) => new SignUpSuccessAction(user)),
            catchError((errors) => of(new SignUpFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  signIn$ = this.actions$.pipe(
    ofType(AuthActionTypes.SignInAction),
    map((action: SignInAction) => action.payload),
    switchMap((model) => {
        return this.authService
          .signIn(model)
          .pipe(
            map((user) => new SignInSuccessAction(user)),
            catchError((errors) => of(new SignInFailureAction(errors)))
          );
      }
    )
  );

  @Effect({dispatch: false})
  signInSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.SignInSuccessAction),
    tap(() => this.router.navigate(['/dashboard']))
  );

  @Effect()
  signUpGoogle$ = this.actions$.pipe(
    ofType(AuthActionTypes.SignUpGoogleAction),
    map((action: SignUpGoogleAction) => action.payload),
    switchMap((model) => {
        return this.authService
          .signUpGoogle(model)
          .pipe(
            map((user) => new SignUpSuccessAction(user)),
            catchError((errors) => of(new SignUpFailureAction(errors)))
          );
      }
    )
  );

  @Effect({dispatch: false})
  signUpSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.SignUpSuccessAction),
    tap(() => this.router.navigate(['/dashboard']))
  );

  @Effect()
  signUpStepPersonalData$ = this.actions$.pipe(
    ofType(AuthActionTypes.SignUpStepPersonalDataAction),
    map((action: SignUpStepPersonalDataAction) => action.payload),
    switchMap((model) => {
        return this.authService
          .signUpStepPersonalData(model)
          .pipe(
            map((user) => new SignUpStepPersonalDataSuccessAction(user)),
            catchError((errors) => of(new SignUpStepPersonalDataFailureAction(errors)))
          );
      }
    )
  );

  @Effect({dispatch: false})
  signUpStepPersonalDataSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.SignUpStepPersonalDataSuccessAction),
    tap(() => this.router.navigate(['/auth/sign-up/step-2']))
  );

  @Effect()
  signUpStepSecurity$ = this.actions$.pipe(
    ofType(AuthActionTypes.SignUpStepSecurityAction),
    map((action: SignUpStepSecurityAction) => action.payload),
    switchMap((model) => {
        return this.authService
          .signUpStepSecurity(model)
          .pipe(
            map((user) => new SignUpStepSecuritySuccessAction(user)),
            catchError((errors) => of(new SignUpStepSecurityFailureAction(errors)))
          );
      }
    )
  );

  @Effect({dispatch: false})
  signUpStepSecuritySuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.SignUpStepSecuritySuccessAction),
    tap(() => this.router.navigate(['/auth/sign-up/step-3']))
  );

  @Effect()
  signUpStepInterview$ = this.actions$.pipe(
    ofType(AuthActionTypes.SignUpStepInterviewAction),
    map((action: SignUpStepInterviewAction) => action.payload),
    switchMap((model) => {
        return this.authService
          .signUpStepInterview(model)
          .pipe(
            map((user) => new SignUpStepInterviewSuccessAction(user)),
            catchError((errors) => of(new SignUpStepInterviewFailureAction(errors)))
          );
      }
    )
  );

  @Effect({dispatch: false})
  signUpStepInterviewSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.SignUpStepInterviewSuccessAction),
    tap(() => this.router.navigate(['/dashboard']))
  );
}
