import {AuthActions, AuthActionTypes} from './auth.actions';
import {IdentityModel} from '../../models/identity.model';
import {createSelector} from '@ngrx/store';
import {getEntities, getIds} from '@core/redux/invite/invite.reducer';

export interface State {
  loading: boolean;
  isAuth: boolean;
  token: string;
  step: string;
  errors: any;
  user: IdentityModel;
}

export const initialState: State = {
  loading: false,
  isAuth: false,
  token: null,
  step: null,
  errors: {},
  user: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {

    case AuthActionTypes.GetUserAction:
      return Object.assign({}, state, {
        loading: true,
        errors: {}
      });

    case AuthActionTypes.GetUserSuccessAction:
      return Object.assign({}, state, {
        loading: false,
        user: action.payload,
        step: action.payload.step,
        errors: {}
      });

    case AuthActionTypes.GetUserFailureAction:
      return Object.assign({}, state, initialState);

    case AuthActionTypes.SignInAction:
      return Object.assign({}, state, {
        loading: true,
        errors: {}
      });

    case AuthActionTypes.SignInSuccessAction:
      return Object.assign({}, state, {
        loading: false,
        isAuth: true,
        errors: {},
        token: action.payload.token,
        step: action.payload.step,
        user: action.payload
      });

    case AuthActionTypes.SignInFailureAction:
      return Object.assign({}, state, {
        loading: false,
        errors: action.payload.error,
      });

    case AuthActionTypes.SignUpAction:
      return Object.assign({}, state, {
        loading: true,
        errors: {}
      });

    case AuthActionTypes.SignUpSuccessAction:
      return Object.assign({}, state, {
        loading: false,
        isAuth: true,
        errors: {},
        token: action.payload.token,
        step: action.payload.step,
        user: action.payload
      });

    case AuthActionTypes.InviteConfirmationAction:
      return Object.assign({}, state, {
        loading: true,
        errors: {},
      });

    case AuthActionTypes.InviteConfirmationSuccessAction:
      return Object.assign({}, state, {
        loading: false,
        isAuth: true,
        errors: {},
        token: action.payload.token,
        step: action.payload.step,
        user: action.payload
      });

    case AuthActionTypes.InviteConfirmationFailureAction:
      return Object.assign({}, state, {
        loading: false,
        errors: action.payload.error,
      });

    case AuthActionTypes.SignUpFailureAction:
      return Object.assign({}, state, {
        loading: false,
        errors: action.payload.error,
      });

    case AuthActionTypes.SignUpStepPersonalDataAction:
      return Object.assign({}, state, {
        loading: true,
      });

    case AuthActionTypes.SignUpStepPersonalDataSuccessAction:
      return Object.assign({}, state, {
        loading: false,
        isAuth: true,
        errors: {},
        step: action.payload.step,
        user: action.payload
      });

    case AuthActionTypes.SignUpStepPersonalDataFailureAction:
      return Object.assign({}, state, {
        loading: false,
        errors: action.payload.error,
      });

    case AuthActionTypes.SignUpStepSecurityAction:
      return Object.assign({}, state, {
        loading: true,
      });

    case AuthActionTypes.SignUpStepSecuritySuccessAction:
      return Object.assign({}, state, {
        loading: false,
        isAuth: true,
        errors: {},
        step: action.payload.step,
        user: action.payload
      });

    case AuthActionTypes.SignUpStepSecurityFailureAction:
      return Object.assign({}, state, {
        loading: false,
        errors: action.payload.error,
      });

    case AuthActionTypes.SignUpStepInterviewAction:
      return Object.assign({}, state, {
        loading: true,
      });

    case AuthActionTypes.SignUpStepInterviewSuccessAction:
      return Object.assign({}, state, {
        loading: false,
        isAuth: true,
        errors: {},
        step: action.payload.step,
        user: action.payload
      });

    case AuthActionTypes.SignUpStepInterviewFailureAction:
      return Object.assign({}, state, {
        loading: false,
        errors: action.payload.error,
      });

    case AuthActionTypes.SignOutAction:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
}

export const getIsAuth = (state: State) => state.isAuth;
export const getStep = (state: State) => state.step;
export const getToken = (state: State) => state.token;
export const getErrors = (state: State) => state.errors;
export const getLoading = (state: State) => state.loading;
export const getUser = (state: State) => state.user;
export const getCanAdmin = createSelector(getUser, (user) => user ? user.canAdmin : false);
