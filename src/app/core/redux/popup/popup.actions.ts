import {Action} from '@ngrx/store';

export enum PopupActionTypes {
  OpenProjectMenu = '[Popup] Open Project Menu',
  CloseProjectMenu = '[Popup] Close Project Menu',

  OpenProjectFormMenu = '[Popup] Open Project Form Menu',
  CloseProjectFormMenu = '[Popup] Close Project Form Menu',
}

export class OpenProjectMenu implements Action {
  readonly type = PopupActionTypes.OpenProjectMenu;

  constructor(public position: number) {
  }
}

export class CloseProjectMenu implements Action {
  readonly type = PopupActionTypes.CloseProjectMenu;
}

export class OpenProjectFormMenu implements Action {
  readonly type = PopupActionTypes.OpenProjectFormMenu;

  constructor(public top: number, public left: number) {
  }
}

export class CloseProjectFormMenu implements Action {
  readonly type = PopupActionTypes.CloseProjectFormMenu;
}

export type PopupActions = OpenProjectMenu
  | CloseProjectMenu
  | OpenProjectFormMenu
  | CloseProjectFormMenu
  ;
