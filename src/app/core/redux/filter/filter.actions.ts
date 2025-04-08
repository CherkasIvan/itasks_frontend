import {Action} from '@ngrx/store';
import {FilterModel} from '../../models/filter.model';

export enum FilterActionTypes {
  SelectAction = '[Filter] Select Action',

  SearchAction = '[Filter] Search Action',
  SearchSuccessAction = '[Filter] Search Success Action',
  SearchFailureAction = '[Filter] Search Failure Action',

  SaveAction = '[Filter] Save Action',
  SaveSuccessAction = '[Filter] Save Success Action',
  SaveFailureAction = '[Filter] Save Failure Action',

  CreateAction = '[Filter] Create Action',
  CreateSuccessAction = '[Filter] Create Success Action',
  CreateFailureAction = '[Filter] Create Failure Action',

  DeleteAction = '[Filter] Delete Action',
  DeleteSuccessAction = '[Filter] Delete Success Action',
  DeleteFailureAction = '[Filter] Delete Failure Action',
}

export class SelectAction implements Action {
  readonly type = FilterActionTypes.SelectAction;

  constructor(public payload: string | null) {
  }
}

export class SearchAction implements Action {
  readonly type = FilterActionTypes.SearchAction;
}

export class SearchSuccessAction implements Action {
  readonly type = FilterActionTypes.SearchSuccessAction;

  constructor(public payload: FilterModel[]) {
  }
}

export class SearchFailureAction implements Action {
  readonly type = FilterActionTypes.SearchFailureAction;

  constructor(public payload: any) {
  }
}

export class SaveAction implements Action {
  readonly type = FilterActionTypes.SaveAction;

  constructor(public payload: FilterModel) {
  }
}

export class SaveSuccessAction implements Action {
  readonly type = FilterActionTypes.SaveSuccessAction;

  constructor(public payload: FilterModel) {
  }
}

export class SaveFailureAction implements Action {
  readonly type = FilterActionTypes.SaveFailureAction;

  constructor(public payload: any) {
  }
}

export class CreateAction implements Action {
  readonly type = FilterActionTypes.CreateAction;

  constructor(public payload: FilterModel) {
  }
}

export class CreateSuccessAction implements Action {
  readonly type = FilterActionTypes.CreateSuccessAction;

  constructor(public payload: FilterModel) {
  }
}

export class CreateFailureAction implements Action {
  readonly type = FilterActionTypes.CreateFailureAction;

  constructor(public payload: any) {
  }
}

export class DeleteAction implements Action {
  readonly type = FilterActionTypes.DeleteAction;

  constructor(public payload: FilterModel) {
  }
}

export class DeleteSuccessAction implements Action {
  readonly type = FilterActionTypes.DeleteSuccessAction;

  constructor(public payload: FilterModel) {
  }
}

export class DeleteFailureAction implements Action {
  readonly type = FilterActionTypes.DeleteFailureAction;

  constructor(public payload: any) {
  }
}

export type FilterActions = SelectAction
  | SearchAction
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
