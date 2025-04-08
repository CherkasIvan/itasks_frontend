import {createSelector} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState, Update} from '@ngrx/entity';
import {StatusModel} from '../../models/status.model';
import {InviteActions, InviteActionTypes} from './invite.actions';
import {InviteModel} from '../../models/invite.model';
import * as _ from 'lodash';
import {ResendEmailAction} from '@core/redux/invite/invite.actions';

export interface State extends EntityState<StatusModel> {
  ids: string[];
  loading: boolean;
  entities: any;
  errors: {};
}

export const adapter: EntityAdapter<InviteModel> = createEntityAdapter<InviteModel>({
  selectId: (status: InviteModel) => status.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  ids: [],
  loading: false,
  entities: {},
  errors: {}
});

export function reducer(state = initialState, action: InviteActions): State {
  switch (action.type) {

    case InviteActionTypes.SetOnlineAction: {
      const change: Update<InviteModel>[] = [];
      action.payload.forEach(item => {
        const invite: any = _.find(state.entities, {userId: item.id as any});
        if (invite) {
          invite.user.activityAt = item.activityAt;
          change.push({
            id: invite.id,
            changes: invite
          });
        }
      });

      return adapter.updateMany(change, state);
    }

    case InviteActionTypes.SearchAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case InviteActionTypes.SearchSuccessAction: {
      return adapter.addAll(action.payload, Object.assign({}, state, {
        loading: false,
      }));
    }

    case InviteActionTypes.DeleteSuccessAction: {
      const change: Update<InviteModel> = {id: action.payload.id, changes: action.payload};
      return adapter.updateOne(change, Object.assign({}, state, {
        loading: false,
      }));
    }

    case InviteActionTypes.CreateAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case InviteActionTypes.CreateSuccessAction: {
      // const change: Update<InviteModel> = {id: action.payload.id, changes: action.payload};
      return adapter.upsertOne(action.payload, Object.assign({}, state, {
        loading: false,
        errors: {}
      }));
    }

    case InviteActionTypes.CreateFailureAction: {
      return Object.assign({}, state, {
        errors: action.payload.error,
        loading: false
      });
    }

    case InviteActionTypes.SaveSuccessAction: {
      const change: Update<InviteModel> = {id: action.payload.id, changes: action.payload};
      return adapter.updateOne(change, Object.assign({}, state, {
        loading: false,
      }));
    }

    case InviteActionTypes.SaveAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case InviteActionTypes.SaveFailureAction: {
      return Object.assign({}, state, {
        errors: action.payload.error,
        loading: false
      });
    }

    case InviteActionTypes.ResendEmailAction: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case InviteActionTypes.ResendEmailSuccessAction: {
      return Object.assign({}, state, {
        loading: false
      });
    }

    case InviteActionTypes.ResendEmailFailureAction: {
      return Object.assign({}, state, {
        loading: false
      });
    }


    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;
export const getIds = (state: State) => state.ids;
export const getLoading = (state: State) => state.loading;
export const getErrors = (state: State) => state.errors;
export const getEntitiesArray = createSelector(getEntities, getIds, (entities, ids) => ids.map(id => entities[id]));
export const getEntitiesNoDelete = createSelector(getEntitiesArray, (entities) => entities.filter(item => item.status !== 'delete'));
export const getEntitiesActive = createSelector(getEntitiesArray, (entities) => entities.filter(item => item.status === 'active'));
