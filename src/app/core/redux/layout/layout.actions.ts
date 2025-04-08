import {Action} from '@ngrx/store';

export enum LayoutActionTypes {
  OpenSidebar = '[Layout] Open Sidebar',
  CloseSidebar = '[Layout] Close Sidebar',
  ToggleSidebar = '[Layout] Toggle Sidebar',
  ToggleSidebarFavorite = '[] Toggle Sidebar Favorite',
  ToggleSidebarChat = '[Layout] Toggle Sidebar Chat',
  OpenSidebarFilter = '[Layout] Open Sidebar Filter',
  CloseSidebarFilter = '[Layout] Close Sidebar Filter',
  ToggleBackLog = '[Layout] Toggle BackLog',
}

export class OpenSidebar implements Action {
  readonly type = LayoutActionTypes.OpenSidebar;
}

export class CloseSidebar implements Action {
  readonly type = LayoutActionTypes.CloseSidebar;
}

export class ToggleSidebar implements Action {
  readonly type = LayoutActionTypes.ToggleSidebar;
}

export class ToggleSidebarFavorite implements Action {
  readonly type = LayoutActionTypes.ToggleSidebarFavorite;
}

export class ToggleSidebarChat implements Action {
  readonly type = LayoutActionTypes.ToggleSidebarChat;
}


export class ToggleBackLog implements Action {
  readonly type = LayoutActionTypes.ToggleBackLog;
}

export class OpenSidebarFilter implements Action {
  readonly type = LayoutActionTypes.OpenSidebarFilter;
}

export class CloseSidebarFilter implements Action {
  readonly type = LayoutActionTypes.CloseSidebarFilter;
}

export type LayoutActions =
  OpenSidebar
  | CloseSidebar
  | ToggleSidebar
  | ToggleSidebarFavorite
  | ToggleSidebarChat
  | OpenSidebarFilter
  | CloseSidebarFilter
  | ToggleBackLog
  ;
