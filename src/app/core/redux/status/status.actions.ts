import {Action} from '@ngrx/store';
import {StatusModel} from '../../models/status.model';
import {StatusSortModel} from '../../models/status-sort.model';

export enum StatusActionTypes {
  SearchAction = '[Status] Search Action',
  SearchSuccessAction = '[Status] Search Success Action',
  SearchFailureAction = '[Status] Search Failure Action',
  SelectUpdateAction = '[Status] Select Update Action',

  SaveAction = '[Status] Save Action',
  SaveSuccessAction = '[Status] Save Success Action',
  SaveFailureAction = '[Status] Save Failure Action',


  CreateAction = '[Status] Create Action',
  CreateSuccessAction = '[Status] Create Success Action',
  CreateFailureAction = '[Status] Create Failure Action',

  DeleteAction = '[Status] Delete Action',
  DeleteSuccessAction = '[Status] Delete Success Action',
  DeleteFailureAction = '[Status] Delete Failure Action',

  SortAction = '[Status] Sort Action',
  SortSuccessAction = '[Status] Sort Success Action',
  SortFailureAction = '[Status] Sort Failure Action',

  StatusClearAction = '[Status] Clear',
}

export class SearchAction implements Action {
  readonly type = StatusActionTypes.SearchAction;
}

export class SearchSuccessAction implements Action {
  readonly type = StatusActionTypes.SearchSuccessAction;

  constructor(public payload: StatusModel[]) {
  }
}

export class SearchFailureAction implements Action {
  readonly type = StatusActionTypes.SearchFailureAction;

  constructor(public payload: any) {
  }
}

export class SelectUpdateAction implements Action {
  readonly type = StatusActionTypes.SelectUpdateAction;

  constructor(public payload: string) {
  }
}

export class SaveAction implements Action {
  readonly type = StatusActionTypes.SaveAction;

  constructor(public payload: StatusModel) {
  }
}

export class SaveSuccessAction implements Action {
  readonly type = StatusActionTypes.SaveSuccessAction;

  constructor(public payload: StatusModel) {
  }
}

export class SaveFailureAction implements Action {
  readonly type = StatusActionTypes.SaveFailureAction;

  constructor(public payload: any) {
  }
}

export class CreateAction implements Action {
  readonly type = StatusActionTypes.CreateAction;

  constructor(public payload: StatusModel) {
  }
}

export class CreateSuccessAction implements Action {
  readonly type = StatusActionTypes.CreateSuccessAction;

  constructor(public payload: StatusModel) {
  }
}

export class CreateFailureAction implements Action {
  readonly type = StatusActionTypes.CreateFailureAction;

  constructor(public payload: any) {
  }
}

export class DeleteAction implements Action {
  readonly type = StatusActionTypes.DeleteAction;

  constructor(public payload: StatusModel) {
  }
}

export class DeleteSuccessAction implements Action {
  readonly type = StatusActionTypes.DeleteSuccessAction;

  constructor(public payload: string) {
  }
}

export class DeleteFailureAction implements Action {
  readonly type = StatusActionTypes.DeleteFailureAction;

  constructor(public payload: any) {
  }
}

export class SortAction implements Action {
  readonly type = StatusActionTypes.SortAction;

  constructor(public payload: StatusSortModel) {
  }
}

export class SortSuccessAction implements Action {
  readonly type = StatusActionTypes.SortSuccessAction;

  constructor(public payload: StatusSortModel) {
  }
}

export class SortFailureAction implements Action {
  readonly type = StatusActionTypes.SortFailureAction;

  constructor(public payload: any) {
  }

}

export class StatusClearAction implements Action {
  readonly type = StatusActionTypes.StatusClearAction;
}

export type StatusActions = SearchAction
  | SearchSuccessAction
  | SearchFailureAction
  | SelectUpdateAction
  | SaveAction
  | SaveSuccessAction
  | SaveFailureAction
  | CreateAction
  | CreateSuccessAction
  | CreateFailureAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailureAction
  | SortAction
  | SortSuccessAction
  | SortFailureAction
  | StatusClearAction
  ;
