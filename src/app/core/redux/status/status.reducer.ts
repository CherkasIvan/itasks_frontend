import {StatusActions, StatusActionTypes} from './status.actions';
import {createSelector} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {StatusModel} from '../../models/status.model';

export interface State extends EntityState<StatusModel> {
  ids: string[];
  loading: boolean;
  selectedIdUpdateItem: string | null;
  entities: any;
}

export const adapter: EntityAdapter<StatusModel> = createEntityAdapter<StatusModel>({
  selectId: (status: StatusModel) => status.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  ids: [],
  loading: false,
  selectedIdUpdateItem: null,
  entities: {}
});

export function reducer(state = initialState, action: StatusActions): State {
  switch (action.type) {

    case StatusActionTypes.SearchSuccessAction: {
      return adapter.addAll(action.payload, state);
    }

    case StatusActionTypes.SelectUpdateAction:
      return Object.assign({}, state, {
        selectedIdUpdateItem: action.payload,
      });

    case StatusActionTypes.SaveAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case StatusActionTypes.CreateAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case StatusActionTypes.CreateSuccessAction: {
      return adapter.addOne(action.payload, Object.assign({}, state, {
        loading: false,
      }));
    }

    case StatusActionTypes.SaveSuccessAction: {
      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities, {[action.payload.id]: action.payload}),
        loading: false
      });
    }

    case StatusActionTypes.DeleteAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case StatusActionTypes.DeleteSuccessAction: {
      return adapter.removeOne(action.payload, Object.assign({}, state));
    }

    case StatusActionTypes.SortAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case StatusActionTypes.SortSuccessAction: {
      return Object.assign({}, state, {
        ids: action.payload.id,
        loading: false
      });
    }

    case StatusActionTypes.StatusClearAction: {
      return {...initialState};
    }

    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;
export const getIds = (state: State) => state.ids;
export const getLoading = (state: State) => state.loading;
export const getEntitiesArray = createSelector(getEntities, getIds, (entities, ids) => ids.map(id => entities[id]));
export const getSelectedIdForUpdate = (state: State) => state.selectedIdUpdateItem;
export const getSelectedEntityForUpdate = createSelector(getEntities, getSelectedIdForUpdate, (entities, selectedId) => entities[selectedId]);
export const getBackLog = createSelector(getEntitiesArray, (entities) => entities.filter(_ => _.isBackLog)[0]);
