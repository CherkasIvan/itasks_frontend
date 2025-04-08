import {TagActions, TagActionTypes} from './tag.actions';
import {createSelector} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {TagModel} from '../../models/tag.model';

export interface State extends EntityState<TagModel> {
  ids: string[];
  loading: boolean;
  entities: any;
}

export const adapter: EntityAdapter<TagModel> = createEntityAdapter<TagModel>({
  selectId: (tag: TagModel) => tag.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  ids: [],
  loading: false,
  entities: {}
});

export function reducer(state = initialState, action: TagActions): State {
  switch (action.type) {

    case TagActionTypes.SearchSuccessAction: {
      return adapter.addAll(action.payload, state);
    }

    case TagActionTypes.SaveAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case TagActionTypes.CreateAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case TagActionTypes.CreateSuccessAction: {
      return adapter.addOne(action.payload, Object.assign({}, state, {
        loading: false,
      }));
    }

    case TagActionTypes.SaveSuccessAction: {
      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities, {[action.payload.id]: action.payload}),
        loading: false
      });
    }

    case TagActionTypes.DeleteAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case TagActionTypes.DeleteSuccessAction: {
      return adapter.removeOne(action.payload, Object.assign({}, state, {
        loading: false,
      }));
    }

    case TagActionTypes.TagClearAction: {
      return {...initialState};
    }

    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;
export const getIds = (state: State) => state.ids;
export const getLoading = (state: State) => state.loading;
export const getEntitiesArray = createSelector(getEntities, getIds, (entities, ids) => {
  return ids
    .map(id => entities[id])
    .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
});
