import {Action} from '@ngrx/store';
import {MessageModel} from '../../models/message.model';

export enum MessageActionTypes {
  SearchAction = '[Message] Search Action',
  SearchSuccessAction = '[Message] Search Success Action',
  SearchFailureAction = '[Message] Search Failure Action',

  SaveAction = '[Message] Save Action',
  SaveSuccessAction = '[Message] Save Success Action',
  SaveFailureAction = '[Message] Save Failure Action',

  LikeAction = '[Message] Like Action',
  LikeSuccessAction = '[Message] Like Success Action',
  LikeFailureAction = '[Message] Like Failure Action',

  PinAction = '[Message] Pin Action',
  PinSuccessAction = '[Message] Pin Success Action',
  PinFailureAction = '[Message] Pin Failure Action',


  CreateAction = '[Message] Create Action',
  CreateSuccessAction = '[Message] Create Success Action',
  CreateFailureAction = '[Message] Create Failure Action',

  DeleteAction = '[Message] Delete Action',
  DeleteSuccessAction = '[Message] Delete Success Action',
  DeleteFailureAction = '[Message] Delete Failure Action',

  SetEditId = '[Message] Set Edit ID',

  MessageClearAction = '[Status] Clear',
}

export class SearchAction implements Action {
  readonly type = MessageActionTypes.SearchAction;

  constructor(public payload: string) {
  }
}

export class SearchSuccessAction implements Action {
  readonly type = MessageActionTypes.SearchSuccessAction;

  constructor(public payload: MessageModel[]) {
  }
}

export class SearchFailureAction implements Action {
  readonly type = MessageActionTypes.SearchFailureAction;

  constructor(public payload: any) {
  }
}

export class SaveAction implements Action {
  readonly type = MessageActionTypes.SaveAction;

  constructor(public payload: MessageModel) {
  }
}

export class SaveSuccessAction implements Action {
  readonly type = MessageActionTypes.SaveSuccessAction;

  constructor(public payload: MessageModel) {
  }
}

export class SaveFailureAction implements Action {
  readonly type = MessageActionTypes.SaveFailureAction;

  constructor(public payload: any) {
  }
}

export class LikeAction implements Action {
  readonly type = MessageActionTypes.LikeAction;

  constructor(public payload: MessageModel) {
  }
}

export class LikeSuccessAction implements Action {
  readonly type = MessageActionTypes.LikeSuccessAction;

  constructor(public payload: MessageModel) {
  }
}

export class LikeFailureAction implements Action {
  readonly type = MessageActionTypes.LikeFailureAction;

  constructor(public payload: any) {
  }
}

export class PinAction implements Action {
  readonly type = MessageActionTypes.PinAction;

  constructor(public payload: MessageModel) {
  }
}

export class PinSuccessAction implements Action {
  readonly type = MessageActionTypes.PinSuccessAction;

  constructor(public payload: MessageModel) {
  }
}

export class PinFailureAction implements Action {
  readonly type = MessageActionTypes.PinFailureAction;

  constructor(public payload: any) {
  }
}

export class CreateAction implements Action {
  readonly type = MessageActionTypes.CreateAction;

  constructor(public payload: MessageModel) {
  }
}

export class CreateSuccessAction implements Action {
  readonly type = MessageActionTypes.CreateSuccessAction;

  constructor(public payload: MessageModel) {
  }
}

export class CreateFailureAction implements Action {
  readonly type = MessageActionTypes.CreateFailureAction;

  constructor(public payload: any) {
  }
}

export class DeleteAction implements Action {
  readonly type = MessageActionTypes.DeleteAction;

  constructor(public payload: MessageModel) {
  }
}

export class DeleteSuccessAction implements Action {
  readonly type = MessageActionTypes.DeleteSuccessAction;

  constructor(public payload: MessageModel) {
  }
}

export class DeleteFailureAction implements Action {
  readonly type = MessageActionTypes.DeleteFailureAction;

  constructor(public payload: any) {
  }
}

export class SetEditId implements Action {
  readonly type = MessageActionTypes.SetEditId;

  constructor(public payload: string) {
  }
}

export class MessageClearAction implements Action {
  readonly type = MessageActionTypes.MessageClearAction;
}

export type MessageActions = SearchAction
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
  | LikeAction
  | LikeSuccessAction
  | LikeFailureAction
  | PinAction
  | PinSuccessAction
  | PinFailureAction
  | SetEditId
  | MessageClearAction
  ;
