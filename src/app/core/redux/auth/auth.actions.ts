import {Action} from '@ngrx/store';
import {SignInModel} from '../../models/sign-in.model';
import {IdentityModel} from '../../models/identity.model';
import {SignUpModel} from '../../models/sign-up.model';
import {SignUpPersonalDataModel} from '../../models/sign-up-personal-data.model';
import {SignUpSecurityModel} from '../../models/sign-up-security.model';
import {SignUpInterviewModel} from '../../models/sign-up-interview.model';

export enum AuthActionTypes {
  GetUserAction = '[Auth] Get User',
  GetUserSuccessAction = '[Auth] Get User Success',
  GetUserFailureAction = '[Auth] Get User Failure',

  SignUpAction = '[Auth] Sign Up',
  SignUpSuccessAction = '[Auth] Sign Up Success',
  SignUpFailureAction = '[Auth] Sign Up Failure',

  SignUpGoogleAction = '[Auth] Sign Up Google',
  SignOutAction = '[Auth] Sign Out',

  SignUpStepPersonalDataAction = '[Auth] Sign Up Personal Data',
  SignUpStepPersonalDataSuccessAction = '[Auth] Sign Up Personal Data Success',
  SignUpStepPersonalDataFailureAction = '[Auth] Sign Up Personal Data Failure',

  SignUpStepSecurityAction = '[Auth] Sign Up Security',
  SignUpStepSecuritySuccessAction = '[Auth] Sign Up Security Success',
  SignUpStepSecurityFailureAction = '[Auth] Sign Up Security Failure',

  SignUpStepInterviewAction = '[Auth] Sign Up Interview',
  SignUpStepInterviewSuccessAction = '[Auth] Sign Up Interview Success',
  SignUpStepInterviewFailureAction = '[Auth] Sign Up Interview Failure',

  SignInAction = '[Auth] Sign In',
  SignInSuccessAction = '[Auth] Sign In Success',
  SignInFailureAction = '[Auth] Sign In Failure',

  InviteConfirmationAction = '[Auth] Invite Confirmation',
  InviteConfirmationSuccessAction = '[Auth] Invite Confirmation Success',
  InviteConfirmationFailureAction = '[Auth] Invite Confirmation Failure',
}

export class SignOutAction implements Action {
  readonly type = AuthActionTypes.SignOutAction;
}

export class GetUserAction implements Action {
  readonly type = AuthActionTypes.GetUserAction;
}

export class GetUserSuccessAction implements Action {
  readonly type = AuthActionTypes.GetUserSuccessAction;

  constructor(public payload: IdentityModel) {
  }
}

export class GetUserFailureAction implements Action {
  readonly type = AuthActionTypes.GetUserFailureAction;

  constructor(public payload: any) {
  }
}

export class SignInAction implements Action {
  readonly type = AuthActionTypes.SignInAction;

  constructor(public payload: SignInModel) {
  }
}

export class SignInSuccessAction implements Action {
  readonly type = AuthActionTypes.SignInSuccessAction;

  constructor(public payload: IdentityModel) {
  }
}

export class SignInFailureAction implements Action {
  readonly type = AuthActionTypes.SignInFailureAction;

  constructor(public payload: any) {
  }
}

export class SignUpAction implements Action {
  readonly type = AuthActionTypes.SignUpAction;

  constructor(public payload: SignUpModel) {
  }
}

export class SignUpSuccessAction implements Action {
  readonly type = AuthActionTypes.SignUpSuccessAction;

  constructor(public payload: IdentityModel) {
  }
}

export class SignUpFailureAction implements Action {
  readonly type = AuthActionTypes.SignUpFailureAction;

  constructor(public payload: any) {
  }
}

export class SignUpGoogleAction implements Action {
  readonly type = AuthActionTypes.SignUpGoogleAction;

  constructor(public payload: { code }) {
  }
}

export class SignUpStepPersonalDataAction implements Action {
  readonly type = AuthActionTypes.SignUpStepPersonalDataAction;

  constructor(public payload: SignUpPersonalDataModel) {
  }
}

export class SignUpStepPersonalDataSuccessAction implements Action {
  readonly type = AuthActionTypes.SignUpStepPersonalDataSuccessAction;

  constructor(public payload: IdentityModel) {
  }
}

export class SignUpStepPersonalDataFailureAction implements Action {
  readonly type = AuthActionTypes.SignUpStepPersonalDataFailureAction;

  constructor(public payload: any) {
  }
}

export class SignUpStepSecurityAction implements Action {
  readonly type = AuthActionTypes.SignUpStepSecurityAction;

  constructor(public payload: SignUpSecurityModel) {
  }
}

export class SignUpStepSecuritySuccessAction implements Action {
  readonly type = AuthActionTypes.SignUpStepSecuritySuccessAction;

  constructor(public payload: IdentityModel) {
  }
}

export class SignUpStepSecurityFailureAction implements Action {
  readonly type = AuthActionTypes.SignUpStepSecurityFailureAction;

  constructor(public payload: any) {
  }
}

export class SignUpStepInterviewAction implements Action {
  readonly type = AuthActionTypes.SignUpStepInterviewAction;

  constructor(public payload: SignUpInterviewModel) {
  }
}

export class SignUpStepInterviewSuccessAction implements Action {
  readonly type = AuthActionTypes.SignUpStepInterviewSuccessAction;

  constructor(public payload: IdentityModel) {
  }
}

export class SignUpStepInterviewFailureAction implements Action {
  readonly type = AuthActionTypes.SignUpStepInterviewFailureAction;

  constructor(public payload: any) {
  }
}

export class InviteConfirmationAction implements Action {
  readonly type = AuthActionTypes.InviteConfirmationAction;

  constructor(public payload: string) {
  }
}

export class InviteConfirmationSuccessAction implements Action {
  readonly type = AuthActionTypes.InviteConfirmationSuccessAction;

  constructor(public payload: IdentityModel) {
  }
}

export class InviteConfirmationFailureAction implements Action {
  readonly type = AuthActionTypes.InviteConfirmationFailureAction;

  constructor(public payload: any) {
  }
}

export type AuthActions = SignOutAction
  | GetUserAction
  | GetUserSuccessAction
  | GetUserFailureAction
  | SignInAction
  | SignInSuccessAction
  | SignInFailureAction
  | SignUpAction
  | SignUpSuccessAction
  | SignUpFailureAction
  | SignUpGoogleAction
  | SignUpStepPersonalDataAction
  | SignUpStepPersonalDataSuccessAction
  | SignUpStepPersonalDataFailureAction
  | SignUpStepSecurityAction
  | SignUpStepSecuritySuccessAction
  | SignUpStepSecurityFailureAction
  | SignUpStepInterviewAction
  | SignUpStepInterviewSuccessAction
  | SignUpStepInterviewFailureAction
  | InviteConfirmationAction
  | InviteConfirmationSuccessAction
  | InviteConfirmationFailureAction
  ;
