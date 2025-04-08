import {Action} from '@ngrx/store';
import {LayoutActionTypes} from './layout.actions';

export interface State {
  isOpenSidebar: boolean;
  isOpenSidebarFavorite: boolean;
  isOpenSidebarChat: boolean;
  isOpenSidebarFilter: boolean;
  isOpenBackLog: boolean;
}

export const initialState: State = {
  isOpenSidebar: true,
  isOpenSidebarFavorite: true,
  isOpenSidebarChat: true,
  isOpenSidebarFilter: false,
  isOpenBackLog: false,
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case LayoutActionTypes.OpenSidebar:
      return Object.assign({}, state, {
        isOpenSidebar: true
      });

    case LayoutActionTypes.CloseSidebar:
      return Object.assign({}, state, {
        isOpenSidebar: false
      });

    case LayoutActionTypes.ToggleSidebar:
      return Object.assign({}, state, {
        isOpenSidebar: !state.isOpenSidebar
      });

    case LayoutActionTypes.ToggleSidebarFavorite:
      return Object.assign({}, state, {
        isOpenSidebarFavorite: !state.isOpenSidebarFavorite
      });

    case LayoutActionTypes.ToggleSidebarChat:
      return Object.assign({}, state, {
        isOpenSidebarChat: !state.isOpenSidebarChat
      });

    case LayoutActionTypes.OpenSidebarFilter:
      return Object.assign({}, state, {
        isOpenSidebarFilter: true
      });

    case LayoutActionTypes.CloseSidebarFilter:
      return Object.assign({}, state, {
        isOpenSidebarFilter: false
      });

      case LayoutActionTypes.ToggleBackLog:
      return Object.assign({}, state, {
        isOpenBackLog: !state.isOpenBackLog
      });


    default:
      return state;
  }
}

export const getShowSidebar = (state: State) => state.isOpenSidebar;
export const getShowSidebarFavorite = (state: State) => state.isOpenSidebarFavorite;
export const getShowSidebarChat = (state: State) => state.isOpenSidebarChat;
export const getShowSidebarFilter = (state: State) => state.isOpenSidebarFilter;
export const getShowBackLog = (state: State) => state.isOpenBackLog;
