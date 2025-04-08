import {Action} from '@ngrx/store';
import {TagModel} from '../../models/tag.model';

export enum TagActionTypes {
  SearchAction = '[Tag] Search Action',
  SearchSuccessAction = '[Tag] Search Success Action',
  SearchFailureAction = '[Tag] Search Failure Action',

  SaveAction = '[Tag] Save Action',
  SaveSuccessAction = '[Tag] Save Success Action',
  SaveFailureAction = '[Tag] Save Failure Action',

  CreateAction = '[Tag] Create Action',
  CreateSuccessAction = '[Tag] Create Success Action',
  CreateFailureAction = '[Tag] Create Failure Action',

  DeleteAction = '[Tag] Delete Action',
  DeleteSuccessAction = '[Tag] Delete Success Action',
  DeleteFailureAction = '[Tag] Delete Failure Action',

  TagClearAction = '[Tag] Clear',
}

export class SearchAction implements Action {
  readonly type = TagActionTypes.SearchAction;
}

export class SearchSuccessAction implements Action {
  readonly type = TagActionTypes.SearchSuccessAction;

  constructor(public payload: TagModel[]) {
  }
}

export class SearchFailureAction implements Action {
  readonly type = TagActionTypes.SearchFailureAction;

  constructor(public payload: any) {
  }
}

export class SaveAction implements Action {
  readonly type = TagActionTypes.SaveAction;

  constructor(public payload: TagModel) {
  }
}

export class SaveSuccessAction implements Action {
  readonly type = TagActionTypes.SaveSuccessAction;

  constructor(public payload: TagModel) {
  }
}

export class SaveFailureAction implements Action {
  readonly type = TagActionTypes.SaveFailureAction;

  constructor(public payload: any) {
  }
}

export class CreateAction implements Action {
  readonly type = TagActionTypes.CreateAction;

  constructor(public payload: TagModel) {
  }
}

export class CreateSuccessAction implements Action {
  readonly type = TagActionTypes.CreateSuccessAction;

  constructor(public payload: TagModel) {
  }
}

export class CreateFailureAction implements Action {
  readonly type = TagActionTypes.CreateFailureAction;

  constructor(public payload: any) {
  }
}

export class DeleteAction implements Action {
  readonly type = TagActionTypes.DeleteAction;

  constructor(public payload: TagModel) {
  }
}

export class DeleteSuccessAction implements Action {
  readonly type = TagActionTypes.DeleteSuccessAction;

  constructor(public payload: string) {
  }
}

export class DeleteFailureAction implements Action {
  readonly type = TagActionTypes.DeleteFailureAction;

  constructor(public payload: any) {
  }
}

export class TagClearAction implements Action {
  readonly type = TagActionTypes.TagClearAction;
}


export type TagActions = SearchAction
  | TagClearAction
  | SearchSuccessAction
  | SearchFailureAction
  | SaveAction
  | SaveSuccessAction
  | SaveFailureAction
  | CreateAction
  | CreateSuccessAction
  | CreateFailureAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailureAction
  ;
