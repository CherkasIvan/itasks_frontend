import { StatusActions, StatusActionTypes } from "./status.actions";
import { createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { StatusModel } from "../../models/status.model";

export interface State extends EntityState<StatusModel> {
  loading: boolean;
  selectedIdUpdateItem: string | null;
}

export const adapter: EntityAdapter<StatusModel> =
  createEntityAdapter<StatusModel>({
    selectId: (status: StatusModel) => status.id,
    sortComparer: false,
  });

export const initialState: State = adapter.getInitialState({
  loading: false,
  selectedIdUpdateItem: null,
});

export function reducer(state = initialState, action: StatusActions): State {
  switch (action.type) {
    case StatusActionTypes.SearchSuccessAction: {
      return adapter.addMany(action.payload, state);
    }

    case StatusActionTypes.SelectUpdateAction:
      return {
        ...state,
        selectedIdUpdateItem: action.payload,
      };

    case StatusActionTypes.SaveAction: {
      return {
        ...state,
        loading: true,
      };
    }

    case StatusActionTypes.CreateAction: {
      return {
        ...state,
        loading: true,
      };
    }

    case StatusActionTypes.CreateSuccessAction: {
      return adapter.addOne(action.payload, {
        ...state,
        loading: false,
      });
    }

    case StatusActionTypes.SaveSuccessAction: {
      return adapter.upsertOne(action.payload, {
        ...state,
        loading: false,
      });
    }

    case StatusActionTypes.DeleteAction: {
      return {
        ...state,
        loading: true,
      };
    }

    case StatusActionTypes.DeleteSuccessAction: {
      return adapter.removeOne(action.payload, {
        ...state,
      });
    }

    case StatusActionTypes.SortAction: {
      return {
        ...state,
        loading: true,
      };
    }

    case StatusActionTypes.SortSuccessAction: {
      return {
        ...state,
        ids: action.payload.id,
        loading: false,
      };
    }

    case StatusActionTypes.StatusClearAction: {
      return { ...initialState };
    }

    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;
export const getLoading = (state: State) => state.loading;
export const getEntitiesArray = createSelector(getEntities, (entities) =>
  Object.values(entities)
);
export const getSelectedIdForUpdate = (state: State) =>
  state.selectedIdUpdateItem;
export const getSelectedEntityForUpdate = createSelector(
  getEntities,
  getSelectedIdForUpdate,
  (entities, selectedId) => entities[selectedId]
);
export const getBackLog = createSelector(
  getEntitiesArray,
  (entities) => entities.filter((_) => _.isBackLog)[0]
);
