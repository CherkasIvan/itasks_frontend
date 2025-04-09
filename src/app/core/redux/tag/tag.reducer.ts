import { TagActions, TagActionTypes } from "./tag.actions";
import { createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { TagModel } from "../../models/tag.model";

export interface State extends EntityState<TagModel> {
  loading: boolean;
}

export const adapter: EntityAdapter<TagModel> = createEntityAdapter<TagModel>({
  selectId: (tag: TagModel) => tag.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  loading: false,
});

export function reducer(state = initialState, action: TagActions): State {
  switch (action.type) {
    case TagActionTypes.SearchSuccessAction: {
      return adapter.addMany(action.payload, state); // Используйте addMany вместо addAll
    }

    case TagActionTypes.SaveAction: {
      return { ...state, loading: true };
    }

    case TagActionTypes.CreateAction: {
      return { ...state, loading: true };
    }

    case TagActionTypes.CreateSuccessAction: {
      return adapter.addOne(action.payload, { ...state, loading: false });
    }

    case TagActionTypes.SaveSuccessAction: {
      return adapter.upsertOne(action.payload, { ...state, loading: false }); // Используйте upsertOne для обновления или добавления
    }

    case TagActionTypes.DeleteAction: {
      return { ...state, loading: true };
    }

    case TagActionTypes.DeleteSuccessAction: {
      return adapter.removeOne(action.payload, { ...state, loading: false });
    }

    case TagActionTypes.TagClearAction: {
      return { ...initialState };
    }

    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;
export const getLoading = (state: State) => state.loading;
export const getEntitiesArray = createSelector(getEntities, (entities) => {
  return Object.values(entities).sort((a, b) => (a.name > b.name ? 1 : -1));
});
