import {PopupActions, PopupActionTypes} from './popup.actions';

export interface State {
  popupProjectMenu: {
    isOpen: boolean,
    position: number
  };

  popupProjectForm: {
    isOpen: boolean,
    top: number,
    left: number,
  };

}

export const initialState: State = {
  popupProjectMenu: {
    isOpen: false,
    position: 15
  },

  popupProjectForm: {
    isOpen: false,
    top: 0,
    left: 0
  },
};

export function reducer(state = initialState, action: PopupActions): State {
  switch (action.type) {

    case PopupActionTypes.OpenProjectMenu:
      return Object.assign({}, state, {
        popupProjectMenu: {
          isOpen: true,
          position: action.position
        },
        popupProjectForm: {
          isOpen: false,
          top: 0,
          left: 0
        }
      });

    case PopupActionTypes.CloseProjectMenu:
      return Object.assign({}, state, {
        popupProjectMenu: {
          isOpen: false,
          position: 15
        },
        popupProjectForm: {
          isOpen: false,
          top: 0,
          left: 0
        }
      });

    case PopupActionTypes.OpenProjectFormMenu: {
      return Object.assign({}, state, {
        popupProjectForm: {
          isOpen: true,
          top: action.top,
          left: action.left,
        }
      });
    }

    case PopupActionTypes.CloseProjectFormMenu: {
      return Object.assign({}, state, {
        popupProjectForm: {
          isOpen: false,
          top: 0,
          left: 0
        }
      });
    }

    default:
      return state;
  }
}

export const getPopupProjectMenu = (state: State) => state.popupProjectMenu;
export const getPopupProjectForm = (state: State) => state.popupProjectForm;
