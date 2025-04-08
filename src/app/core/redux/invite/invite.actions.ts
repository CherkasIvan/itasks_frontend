import {Action} from '@ngrx/store';
import {InviteModel, SetOnlineInterface} from '../../models/invite.model';

export enum InviteActionTypes {
  SearchAction = '[Invite] Search Action',
  SearchSuccessAction = '[Invite] Search Success Action',
  SearchFailureAction = '[Invite] Search Failure Action',

  CreateAction = '[Invite] Create Action',
  CreateSuccessAction = '[Invite] Create Success Action',
  CreateFailureAction = '[Invite] Create Failure Action',

  SaveAction = '[Invite] Save Action',
  SaveSuccessAction = '[Invite] Save Success Action',
  SaveFailureAction = '[Invite] Save Failure Action',

  SetOnlineAction = '[Invite] Batch Save Success Action',

  ResendEmailAction = '[Invite] Resend Email Action',
  ResendEmailSuccessAction = '[Invite] Resend Email Success Action',
  ResendEmailFailureAction = '[Invite] Resend Email Failure Action',


  DeleteAction = '[Invite] Delete Action',
  DeleteSuccessAction = '[Invite] Delete Success Action',
  DeleteFailureAction = '[Invite] Delete Failure Action',
}

export class SearchAction implements Action {
  readonly type = InviteActionTypes.SearchAction;

  constructor(public payload: any) {
  }
}

export class SearchSuccessAction implements Action {
  readonly type = InviteActionTypes.SearchSuccessAction;

  constructor(public payload: InviteModel[]) {
  }
}

export class SearchFailureAction implements Action {
  readonly type = InviteActionTypes.SearchFailureAction;

  constructor(public payload: any) {
  }
}

export class CreateAction implements Action {
  readonly type = InviteActionTypes.CreateAction;

  constructor(public payload: InviteModel) {
  }
}

export class CreateSuccessAction implements Action {
  readonly type = InviteActionTypes.CreateSuccessAction;

  constructor(public payload: InviteModel) {
  }
}

export class CreateFailureAction implements Action {
  readonly type = InviteActionTypes.CreateFailureAction;

  constructor(public payload: any) {
  }
}

export class DeleteAction implements Action {
  readonly type = InviteActionTypes.DeleteAction;

  constructor(public payload: string) {
  }
}

export class DeleteSuccessAction implements Action {
  readonly type = InviteActionTypes.DeleteSuccessAction;

  constructor(public payload: InviteModel) {
  }
}

export class DeleteFailureAction implements Action {
  readonly type = InviteActionTypes.DeleteFailureAction;

  constructor(public payload: any) {
  }
}

export class SaveAction implements Action {
  readonly type = InviteActionTypes.SaveAction;

  constructor(public payload: InviteModel) {
  }
}

export class SaveSuccessAction implements Action {
  readonly type = InviteActionTypes.SaveSuccessAction;

  constructor(public payload: InviteModel) {
  }
}

export class SaveFailureAction implements Action {
  readonly type = InviteActionTypes.SaveFailureAction;

  constructor(public payload: any) {
  }
}

export class SetOnlineAction implements Action {
  readonly type = InviteActionTypes.SetOnlineAction;

  constructor(public payload: SetOnlineInterface[]) {
  }
}

export class ResendEmailAction implements Action {
  readonly type = InviteActionTypes.ResendEmailAction;

  constructor(public payload: string) {
  }
}

export class ResendEmailSuccessAction implements Action {
  readonly type = InviteActionTypes.ResendEmailSuccessAction;

  constructor() {
  }
}

export class ResendEmailFailureAction implements Action {
  readonly type = InviteActionTypes.ResendEmailFailureAction;

  constructor(public payload: any) {
  }
}

export type InviteActions = SearchAction
  | SearchSuccessAction
  | SearchFailureAction
  | CreateAction
  | CreateSuccessAction
  | CreateFailureAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailureAction
  | SaveAction
  | SaveSuccessAction
  | SaveFailureAction
  | ResendEmailAction
  | ResendEmailSuccessAction
  | ResendEmailFailureAction
  | SetOnlineAction
  ;
