import { ProjectActions, ProjectActionTypes } from "./project.actions";
import { createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { ProjectModel } from "../../models/project.model";
import * as _ from "lodash";

export interface State extends EntityState<ProjectModel> {
  ids: string[];
  loading: boolean;
  selectedId: string | null;
  selectedIdUpdateItem: string | null;
  entities: any;
}

export const adapter: EntityAdapter<ProjectModel> =
  createEntityAdapter<ProjectModel>({
    selectId: (project: ProjectModel) => project.id,
    sortComparer: false,
  });

export const initialState: State = adapter.getInitialState({
  ids: [],
  loading: false,
  selectedId: null,
  selectedIdUpdateItem: null,
  entities: {},
});

export function reducer(state = initialState, action: ProjectActions): State {
  switch (action.type) {
    case ProjectActionTypes.SearchSuccessAction: {
      return adapter.addMany(action.payload, state);
    }

    case ProjectActionTypes.SelectUpdateAction:
      return Object.assign({}, state, {
        selectedIdUpdateItem: action.payload,
      });

    case ProjectActionTypes.SelectAction:
      return Object.assign({}, state, {
        selectedId: action.payload,
      });

    case ProjectActionTypes.CreateAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case ProjectActionTypes.CreateSuccessAction: {
      return adapter.addOne(
        action.payload,
        Object.assign({}, state, {
          loading: false,
        })
      );
    }

    case ProjectActionTypes.SaveAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case ProjectActionTypes.SaveSuccessAction: {
      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities, {
          [action.payload.id]: action.payload,
        }),
        loading: false,
      });
    }

    case ProjectActionTypes.DeleteAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case ProjectActionTypes.DeleteSuccessAction: {
      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities, {
          [action.payload.id]: action.payload,
        }),
        loading: false,
      });
    }

    case ProjectActionTypes.RestoreAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case ProjectActionTypes.RestoreSuccessAction: {
      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities, {
          [action.payload.id]: action.payload,
        }),
        loading: false,
      });
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
export const getActiveEntities = createSelector(getEntitiesArray, (entities) =>
  entities.filter((item) => item.isArchive === false)
);
export const getArchiveEntities = createSelector(getEntitiesArray, (entities) =>
  entities.filter((item) => item.isArchive === true)
);
export const getSelectedIdForUpdate = (state: State) =>
  state.selectedIdUpdateItem;
export const getSelectedId = (state: State) => state.selectedId;
export const getSelectedEntityForUpdate = createSelector(
  getEntities,
  getSelectedIdForUpdate,
  (entities, selectedId) => entities[selectedId]
);
export const getSelectedEntity = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => entities[selectedId]
);
