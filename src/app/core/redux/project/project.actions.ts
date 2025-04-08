import {Action} from '@ngrx/store';
import {ProjectModel} from '../../models/project.model';

export enum ProjectActionTypes {
  SearchAction = '[Project] Search Action',
  SearchSuccessAction = '[Project] Search Success Action',
  SearchFailureAction = '[Project] Search Failure Action',

  SelectAction = '[Project] Select Action',
  SelectUpdateAction = '[Project] Select Update Action',

  SaveAction = '[Project] Save Action',
  SaveSuccessAction = '[Project] Save Success Action',
  SaveFailureAction = '[Project] Save Failure Action',


  CreateAction = '[Project] Create Action',
  CreateSuccessAction = '[Project] Create Success Action',
  CreateFailureAction = '[Project] Create Failure Action',

  DeleteAction = '[Project] Delete Action',
  DeleteSuccessAction = '[Project] Delete Success Action',
  DeleteFailureAction = '[Project] Delete Failure Action',

  RestoreAction = '[Project] Restore Action',
  RestoreSuccessAction = '[Project] Restore Success Action',
  RestoreFailureAction = '[Project] Restore Failure Action',
}

export class SearchAction implements Action {
  readonly type = ProjectActionTypes.SearchAction;
}

export class SearchSuccessAction implements Action {
  readonly type = ProjectActionTypes.SearchSuccessAction;

  constructor(public payload: ProjectModel[]) {
  }
}

export class SearchFailureAction implements Action {
  readonly type = ProjectActionTypes.SearchFailureAction;

  constructor(public payload: any) {
  }
}

export class SelectUpdateAction implements Action {
  readonly type = ProjectActionTypes.SelectUpdateAction;

  constructor(public payload: string) {
  }
}

export class SelectAction implements Action {
  readonly type = ProjectActionTypes.SelectAction;

  constructor(public payload: string) {
  }
}

export class SaveAction implements Action {
  readonly type = ProjectActionTypes.SaveAction;

  constructor(public payload: ProjectModel) {
  }
}

export class SaveSuccessAction implements Action {
  readonly type = ProjectActionTypes.SaveSuccessAction;

  constructor(public payload: ProjectModel) {
  }
}

export class SaveFailureAction implements Action {
  readonly type = ProjectActionTypes.SaveFailureAction;

  constructor(public payload: any) {
  }
}

export class CreateAction implements Action {
  readonly type = ProjectActionTypes.CreateAction;

  constructor(public payload: ProjectModel) {
  }
}

export class CreateSuccessAction implements Action {
  readonly type = ProjectActionTypes.CreateSuccessAction;

  constructor(public payload: ProjectModel) {
  }
}

export class CreateFailureAction implements Action {
  readonly type = ProjectActionTypes.CreateFailureAction;

  constructor(public payload: any) {
  }
}

export class DeleteAction implements Action {
  readonly type = ProjectActionTypes.DeleteAction;

  constructor(public payload: ProjectModel) {
  }
}

export class DeleteSuccessAction implements Action {
  readonly type = ProjectActionTypes.DeleteSuccessAction;

  constructor(public payload: ProjectModel) {
  }
}

export class DeleteFailureAction implements Action {
  readonly type = ProjectActionTypes.DeleteFailureAction;

  constructor(public payload: any) {
  }
}

export class RestoreAction implements Action {
  readonly type = ProjectActionTypes.RestoreAction;

  constructor(public payload: ProjectModel) {
  }
}

export class RestoreSuccessAction implements Action {
  readonly type = ProjectActionTypes.RestoreSuccessAction;

  constructor(public payload: ProjectModel) {
  }
}

export class RestoreFailureAction implements Action {
  readonly type = ProjectActionTypes.RestoreFailureAction;

  constructor(public payload: any) {
  }
}

export type ProjectActions = SearchAction
  | SearchSuccessAction
  | SearchFailureAction
  | SelectUpdateAction
  | SelectAction
  | SaveAction
  | SaveSuccessAction
  | SaveFailureAction
  | CreateAction
  | CreateSuccessAction
  | CreateFailureAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailureAction
  | RestoreAction
  | RestoreSuccessAction
  | RestoreFailureAction
  ;
