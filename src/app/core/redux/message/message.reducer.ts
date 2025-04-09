import { createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { MessageModel } from "../../models/message.model";
import { MessageActions, MessageActionTypes } from "./message.actions";

export interface State extends EntityState<MessageModel> {
  ids: string[];
  editId: string;
  loading: boolean;
  entities: any;
}

export const adapter: EntityAdapter<MessageModel> =
  createEntityAdapter<MessageModel>({
    selectId: (message: MessageModel) => message.id,
    sortComparer: false,
  });

export const initialState: State = adapter.getInitialState({
  ids: [],
  editId: null,
  loading: false,
  entities: {},
});

export function reducer(state = initialState, action: MessageActions): State {
  switch (action.type) {
    case MessageActionTypes.SearchSuccessAction: {
      return adapter.addMany(action.payload, state);
    }

    case MessageActionTypes.DeleteSuccessAction: {
      return adapter.removeOne(action.payload.id, state);
    }

    case MessageActionTypes.CreateAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case MessageActionTypes.CreateSuccessAction: {
      return adapter.addOne(
        action.payload,
        Object.assign({}, state, {
          loading: false,
          editId: null,
        })
      );
    }

    case MessageActionTypes.SaveAction: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case MessageActionTypes.SaveSuccessAction: {
      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities, {
          [action.payload.id]: action.payload,
        }),
        loading: false,
        editId: null,
      });
    }

    case MessageActionTypes.LikeSuccessAction: {
      const entity: MessageModel = state.entities[action.payload.id];
      entity.likes = action.payload.likes;

      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities, {
          [action.payload.id]: entity,
        }),
      });
    }

    case MessageActionTypes.PinSuccessAction: {
      const entity: MessageModel = state.entities[action.payload.id];
      entity.isPin = action.payload.isPin;

      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities, {
          [action.payload.id]: entity,
        }),
      });
    }

    case MessageActionTypes.SetEditId: {
      return Object.assign({}, state, {
        editId: action.payload,
      });
    }

    case MessageActionTypes.MessageClearAction: {
      return { ...initialState };
    }

    default:
      return state;
  }
}

export const getEditId = (state: State) => state.editId;
export const getEntities = (state: State) => state.entities;
export const getIds = (state: State) => state.ids;
export const getEntitiesArray = createSelector(
  getEntities,
  getIds,
  (entities, ids) => ids.map((id: string) => entities[id])
);
export const getEntityEdit = createSelector(
  getEntities,
  getEditId,
  (entities, id) => entities[id]
);
export const getEntitiesArrayByTaskId = (taskId: string) =>
  createSelector(getEntitiesArray, (entities: MessageModel[]) => {
    return entities.filter((item: MessageModel) => item.taskId === taskId);
  });
export const getEntitiesArrayPinned = createSelector(
  getEntitiesArray,
  (entities: MessageModel[]) => {
    return entities.filter((item: MessageModel) => item.isPin === true);
  }
);
