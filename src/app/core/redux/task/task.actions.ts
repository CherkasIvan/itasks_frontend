import {Action} from '@ngrx/store';
import {TaskModel} from '../../models/task.model';

export enum TaskActionTypes {
  UpdateNotificationAction = '[Task] Update Notification Action',

  SearchAction = '[Task] Search Action',
  SearchSuccessAction = '[Task] Search Success Action',
  SearchFailureAction = '[Task] Search Failure Action',

  ArchiveAction = '[Task] Archive Action',
  ArchiveSuccessAction = '[Task] Archive Success Action',
  ArchiveFailureAction = '[Task] Archive Failure Action',

  ParticleAction = '[Task] Particle Action',
  ParticleSuccessAction = '[Task] Particle Success Action',
  ParticleFailureAction = '[Task] Particle Failure Action',

  SearchNotificationAction = '[Task] Search Notification Action',
  SearchNotificationSuccessAction = '[Task] Search Notification Success Action',
  SearchNotificationFailureAction = '[Task] Search Notification Failure Action',

  SearchFavoriteAction = '[Task] Search Favorite Action',
  SearchFavoriteSuccessAction = '[Task] Search Favorite Success Action',
  SearchFavoriteFailureAction = '[Task] Search Favorite Failure Action',

  OpenAction = '[Task] Open Action',
  CloseAction = '[Task] Close Action',

  FindOneAction = '[Task] Find One Action',
  FindOneSuccessAction = '[Task] Find One Success Action',
  FindOneFailureAction = '[Task] Find One Failure Action',

  SaveAction = '[Task] Save Action',
  SaveSuccessAction = '[Task] Save Success Action',
  SaveFailureAction = '[Task] Save Failure Action',

  FavoriteAction = '[Task] Favorite Action',
  FavoriteSuccessAction = '[Task] Favorite Success Action',
  FavoriteFailureAction = '[Task] Favorite Failure Action',

  CreateAction = '[Task] Create Action',
  CreateSuccessAction = '[Task] Create Success Action',
  CreateFailureAction = '[Task] Create Failure Action',

  OrderAction = '[Task] Order Action',
  OrderSuccessAction = '[Task] Order Success Action',
  OrderFailureAction = '[Task] Order Failure Action',

  TempInsertAction = '[Task] Temp Insert Action',
  TempDestroyAction = '[Task] Temp Destroy Action',

  ClearNotificationsAction = '[Task] Clear Notifications Action',

  TaskClearAction = '[Task] Clear',
}

export class UpdateNotificationAction implements Action {
  readonly type = TaskActionTypes.UpdateNotificationAction;

  constructor(public payload: TaskModel) {
  }
}

export class OpenAction implements Action {
  readonly type = TaskActionTypes.OpenAction;

  constructor(public payload: string) {
  }
}

export class CloseAction implements Action {
  readonly type = TaskActionTypes.CloseAction;
}

export class SearchAction implements Action {
  readonly type = TaskActionTypes.SearchAction;

  constructor(public payload: any) {
  }
}

export class SearchSuccessAction implements Action {
  readonly type = TaskActionTypes.SearchSuccessAction;

  constructor(public payload: TaskModel[]) {
  }
}

export class SearchFailureAction implements Action {
  readonly type = TaskActionTypes.SearchFailureAction;

  constructor(public payload: any) {
  }
}

export class ArchiveAction implements Action {
  readonly type = TaskActionTypes.ArchiveAction;

  constructor(public payload: TaskModel) {
  }
}

export class ArchiveSuccessAction implements Action {
  readonly type = TaskActionTypes.ArchiveSuccessAction;

  constructor(public payload: TaskModel) {
  }
}

export class ArchiveFailureAction implements Action {
  readonly type = TaskActionTypes.ArchiveFailureAction;

  constructor(public payload: any) {
  }
}

export class ParticleAction implements Action {
  readonly type = TaskActionTypes.ParticleAction;

  constructor(public payload: any) {
  }
}

export class ParticleSuccessAction implements Action {
  readonly type = TaskActionTypes.ParticleSuccessAction;

  constructor(public payload: TaskModel[]) {
  }
}

export class ParticleFailureAction implements Action {
  readonly type = TaskActionTypes.ParticleFailureAction;

  constructor(public payload: any) {
  }
}

export class SearchNotificationAction implements Action {
  readonly type = TaskActionTypes.SearchNotificationAction;
}

export class SearchNotificationSuccessAction implements Action {
  readonly type = TaskActionTypes.SearchNotificationSuccessAction;

  constructor(public payload: TaskModel[]) {
  }
}

export class SearchNotificationFailureAction implements Action {
  readonly type = TaskActionTypes.SearchNotificationFailureAction;

  constructor(public payload: any) {
  }
}

export class FindOneAction implements Action {
  readonly type = TaskActionTypes.FindOneAction;

  constructor(public payload: string) {
  }
}

export class FindOneSuccessAction implements Action {
  readonly type = TaskActionTypes.FindOneSuccessAction;

  constructor(public payload: TaskModel) {
  }
}

export class FindOneFailureAction implements Action {
  readonly type = TaskActionTypes.FindOneFailureAction;

  constructor(public payload: any) {
  }
}

export class SearchFavoriteAction implements Action {
  readonly type = TaskActionTypes.SearchFavoriteAction;
}

export class SearchFavoriteSuccessAction implements Action {
  readonly type = TaskActionTypes.SearchFavoriteSuccessAction;

  constructor(public payload: TaskModel[]) {
  }
}

export class SearchFavoriteFailureAction implements Action {
  readonly type = TaskActionTypes.SearchFavoriteFailureAction;

  constructor(public payload: any) {
  }
}

export class SaveAction implements Action {
  readonly type = TaskActionTypes.SaveAction;

  constructor(public payload: TaskModel) {
  }
}

export class SaveSuccessAction implements Action {
  readonly type = TaskActionTypes.SaveSuccessAction;

  constructor(public payload: TaskModel) {
  }
}

export class SaveFailureAction implements Action {
  readonly type = TaskActionTypes.SaveFailureAction;

  constructor(public payload: any) {
  }
}

export class FavoriteAction implements Action {
  readonly type = TaskActionTypes.FavoriteAction;

  constructor(public payload: TaskModel) {
  }
}

export class FavoriteSuccessAction implements Action {
  readonly type = TaskActionTypes.FavoriteSuccessAction;

  constructor(public payload: TaskModel) {
  }
}

export class FavoriteFailureAction implements Action {
  readonly type = TaskActionTypes.FavoriteFailureAction;

  constructor(public payload: any) {
  }
}

export class CreateAction implements Action {
  readonly type = TaskActionTypes.CreateAction;

  constructor(public payload: TaskModel) {
  }
}

export class CreateSuccessAction implements Action {
  readonly type = TaskActionTypes.CreateSuccessAction;

  constructor(public payload: TaskModel) {
  }
}

export class CreateFailureAction implements Action {
  readonly type = TaskActionTypes.CreateFailureAction;

  constructor(public payload: any) {
  }
}

export class OrderAction implements Action {
  readonly type = TaskActionTypes.OrderAction;

  constructor(public payload: TaskModel) {
  }
}

export class OrderSuccessAction implements Action {
  readonly type = TaskActionTypes.OrderSuccessAction;

  constructor(public payload: TaskModel) {
  }
}

export class OrderFailureAction implements Action {
  readonly type = TaskActionTypes.OrderFailureAction;

  constructor(public payload: any) {
  }
}


export class TempInsertAction implements Action {
  readonly type = TaskActionTypes.TempInsertAction;

  constructor(public payload: TaskModel) {
  }
}

export class TempDestroyAction implements Action {
  readonly type = TaskActionTypes.TempDestroyAction;

  constructor(public payload: TaskModel) {
  }
}

export class ClearNotificationsAction implements Action {
  readonly type = TaskActionTypes.ClearNotificationsAction;

  constructor(public payload: TaskModel) {
  }
}

export class TaskClearAction implements Action {
  readonly type = TaskActionTypes.TaskClearAction;
}

export type TaskActions = UpdateNotificationAction
  | TaskClearAction
  | SearchAction
  | SearchSuccessAction
  | SearchFailureAction
  | ArchiveAction
  | ArchiveSuccessAction
  | ArchiveFailureAction
  | ParticleAction
  | ParticleSuccessAction
  | ParticleFailureAction
  | SearchFavoriteAction
  | SearchFavoriteSuccessAction
  | SearchFavoriteFailureAction
  | FindOneAction
  | FindOneSuccessAction
  | FindOneFailureAction
  | FavoriteAction
  | FavoriteSuccessAction
  | FavoriteFailureAction
  | SaveAction
  | SaveSuccessAction
  | SaveFailureAction
  | CreateAction
  | CreateSuccessAction
  | CreateFailureAction
  | OrderAction
  | OrderSuccessAction
  | OrderFailureAction
  | TempInsertAction
  | TempDestroyAction
  | OpenAction
  | CloseAction
  | SearchNotificationAction
  | SearchNotificationSuccessAction
  | SearchNotificationFailureAction
  | ClearNotificationsAction
  ;
