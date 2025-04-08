import {createSelector} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState, Update} from '@ngrx/entity';
import {TaskModel} from '../../models/task.model';
import {TaskActions, TaskActionTypes} from './task.actions';
import * as _ from 'lodash';
import {TaskClearAction} from '@core/redux/task/task.actions';

export interface State extends EntityState<TaskModel> {
  idsFavorites: string[];
  idsNotifications: string[];
  ids: string[];
  loading: boolean;
  loadingOrder: boolean;
  selectedIdUpdateItem: string | null;
  openId: string | null;
  entities: any;
}

export const adapter: EntityAdapter<TaskModel> = createEntityAdapter<TaskModel>({
  selectId: (task: TaskModel) => task.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  idsFavorites: [],
  idsNotifications: [],
  ids: [],
  loading: false,
  loadingOrder: false,
  selectedIdUpdateItem: null,
  openId: null,
  entities: {},
});

export function reducer(state = initialState, action: TaskActions): State {
  switch (action.type) {
    case TaskActionTypes.TaskClearAction: {
      const allowIds = [...state.idsFavorites, ...state.idsNotifications];
      const entities = state.entities;

      const filtered = Object.keys(entities)
        .filter(key => allowIds.includes(key))
        .reduce((obj, key) => {
          obj[key] = entities[key];
          return obj;
        }, {});

      return {
        ...initialState,
        idsFavorites: state.idsFavorites,
        idsNotifications: state.idsNotifications,
        entities: filtered
      };
    }

    case TaskActionTypes.SearchFavoriteSuccessAction: {
      const newEntities = action
        .payload
        .filter(entity => !state.entities[entity.id])
        .reduce((entities, entity) => {
            return Object.assign(entities, {
              [entity.id]: entity
            });
          },
          {});

      return Object.assign({}, state, {
        idsFavorites: action.payload.map(entity => entity.id),
        entities: Object.assign({}, state.entities, newEntities),
      });
    }

    case TaskActionTypes.SearchNotificationSuccessAction: {
      const entitiesNew = action
        .payload
        .reduce((entities, entity) => {
            return Object.assign(entities, {
              [entity.id]: entity
            });
          },
          {});

      return Object.assign({}, state, {
        idsNotifications: action.payload.map(entity => entity.id),
        entities: Object.assign({}, state.entities, entitiesNew),
      });
    }

    case TaskActionTypes.UpdateNotificationAction: {
      const model = action.payload;
      const index = state.idsNotifications.indexOf(model.id);
      const ids = state.idsNotifications;
      if (index > -1) {
        ids.splice(index, 1);
        ids.unshift(model.id);
      } else {
        ids.unshift(model.id);
      }

      return Object.assign({}, state, {
        idsNotifications: ids,
        entities: Object.assign({}, state.entities, {[model.id]: model}),
      });
    }

    case TaskActionTypes.ClearNotificationsAction: {
      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities, {[action.payload.id]: action.payload}),
        loading: false
      });
    }

    case TaskActionTypes.SearchSuccessAction: {
      const newEntities = action
        .payload
        .reduce((entities, entity) => {
            return Object.assign(entities, {
              [entity.id]: entity
            });
          },
          {});

      return Object.assign({}, state, {
        ids: action.payload.map(entity => entity.id),
        entities: Object.assign({}, state.entities, newEntities),
        loading: false,
      });
    }

    case TaskActionTypes.ParticleAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case TaskActionTypes.ParticleSuccessAction: {
      const newEntities = action
        .payload
        .reduce((entities, entity) => {
            return Object.assign(entities, {
              [entity.id]: entity
            });
          },
          {});

      let ids = state.ids;
      ids.push(...action.payload.map(entity => entity.id));
      ids = Array.from(new Set(ids));

      return Object.assign({}, state, {
        ids: ids,
        entities: Object.assign({}, state.entities, newEntities),
        loading: false,
      });
    }

    case TaskActionTypes.FindOneAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case TaskActionTypes.FindOneSuccessAction: {
      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities, {[action.payload.id]: action.payload}),
        loading: false,
      });
    }

    case TaskActionTypes.OpenAction: {
      return Object.assign({}, state, {
        openId: action.payload,
      });
    }

    case TaskActionTypes.CloseAction: {
      return Object.assign({}, state, {
        openId: null,
      });
    }

    case TaskActionTypes.SaveAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case TaskActionTypes.SaveSuccessAction: {
      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities, {[action.payload.id]: action.payload}),
        loading: false
      });
    }

    case TaskActionTypes.ArchiveAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case TaskActionTypes.ArchiveSuccessAction: {
      const idsFavorites = state.idsFavorites;
      idsFavorites.splice(idsFavorites.indexOf(action.payload.id), 1);

      const idsNotifications = state.idsNotifications;
      idsNotifications.splice(idsNotifications.indexOf(action.payload.id), 1);

      return adapter.removeOne(action.payload.id, {
        ...state,
        idsFavorites: idsFavorites,
        idsNotifications: idsNotifications
      });
    }

    case TaskActionTypes.FavoriteAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case TaskActionTypes.FavoriteSuccessAction: {
      const ids = state.idsFavorites;
      if (action.payload.isFavorite) {
        ids.push(action.payload.id);
      } else {
        ids.splice(_.indexOf(ids, action.payload.id), 1);
      }

      return Object.assign({}, state, {
        idsFavorites: ids,
        entities: Object.assign({}, state.entities, {[action.payload.id]: action.payload}),
        loading: false
      });
    }

    case TaskActionTypes.CreateAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case TaskActionTypes.CreateSuccessAction: {
      const index = state.ids.indexOf(action.payload.afterId);
      const ids = state.ids;
      ids.splice(index + 1, 0, action.payload.id);

      return Object.assign({}, state, {
        ids: ids,
        loading: false,
        entities: Object.assign({}, state.entities, {[action.payload.id]: action.payload}),
      });
    }

    case TaskActionTypes.OrderAction: {
      return Object.assign({}, state, {
        loading: true,
        loadingOrder: true,
      });
    }

    case TaskActionTypes.OrderSuccessAction: {
      const ids = state.ids;
      const taskIndex = state.ids.indexOf(action.payload.id);
      ids.splice(taskIndex, 1);
      const afterTaskIndex = state.ids.indexOf(action.payload.afterId);
      const beforeTaskIndex = state.ids.indexOf(action.payload.beforeId);
      const task = state.entities[action.payload.id];
      task.statusId = action.payload.statusId;

      if (afterTaskIndex > -1) {
        ids.splice(afterTaskIndex + 1, 0, action.payload.id);
      } else if (beforeTaskIndex > -1) {
        ids.splice(beforeTaskIndex, 0, action.payload.id);
      } else {
        ids.push(action.payload.id);
      }

      return Object.assign({}, state, {
        ids: ids,
        loading: false,
        loadingOrder: false,
        entities: Object.assign({}, state.entities, {[action.payload.id]: task}),
      });
    }

    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;
export const getIds = (state: State) => state.ids;
export const getIdsFavorites = (state: State) => state.idsFavorites;
export const getIdsNotifications = (state: State) => state.idsNotifications;
export const getLoading = (state: State) => state.loading;
export const getLoadingOrder = (state: State) => state.loadingOrder;
export const getEntitiesArray = createSelector(getEntities, getIds, (entities, ids) => ids.map(id => entities[id]));
export const getEntitiesFavoritesArray = createSelector(getEntities, getIdsFavorites, (entities, ids) => ids
  .map(id => entities[id])
  .sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }));

export const getEntitiesNotificationsArray = createSelector(getEntities, getIdsNotifications, (entities, ids) => ids.map(id => entities[id]));
export const getEntitiesArrayByStatusId = (statusId) => createSelector(getEntitiesArray, (entities) => {
  return entities.filter(item => item.statusId === statusId);
});

export const getOpen = (state: State) => state.entities[state.openId];
export const getSelectedId = (state: State) => state.openId;

