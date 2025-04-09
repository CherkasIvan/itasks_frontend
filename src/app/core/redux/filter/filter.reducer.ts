import { FilterActions, FilterActionTypes } from "./filter.actions";
import { createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { ProjectModel } from "@core/models/project.model";
import { FilterModel } from "@core/models/filter.model";

export interface State extends EntityState<ProjectModel> {
  ids: string[];
  loading: boolean;
  selectedId: string | null;
  entities: any;
}

export const adapter: EntityAdapter<FilterModel> =
  createEntityAdapter<FilterModel>({
    selectId: (filter: FilterModel) => filter.id,
    sortComparer: false,
  });

export const initialState: State = adapter.getInitialState({
  ids: [],
  loading: false,
  selectedId: null,
  entities: {},
});

export function reducer(state = initialState, action: FilterActions): State {
  switch (action.type) {
    case FilterActionTypes.SelectAction: {
      return Object.assign({}, state, {
        selectedId: action.payload,
      });
    }

    case FilterActionTypes.SearchSuccessAction: {
      return adapter.addMany(action.payload, state);
    }

    case FilterActionTypes.CreateAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case FilterActionTypes.CreateSuccessAction: {
      return adapter.addOne(
        action.payload,
        Object.assign({}, state, {
          loading: false,
        })
      );
    }

    case FilterActionTypes.SaveAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case FilterActionTypes.SaveSuccessAction: {
      return adapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        Object.assign({}, state, { loading: false })
      );
    }

    case FilterActionTypes.DeleteAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case FilterActionTypes.DeleteSuccessAction: {
      return adapter.removeOne(
        action.payload.id,
        Object.assign({}, state, { loading: false })
      );
    }

    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;
export const getIds = (state: State) => state.ids;
export const getLoading = (state: State) => state.loading;
export const getEntitiesArray = createSelector(
  getEntities,
  getIds,
  (entities, ids) => ids.map((id) => entities[id])
);
export const getSelectedId = (state: State) => state.selectedId;
export const getSelectedEntity = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => entities[selectedId]
);
