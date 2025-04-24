import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
// import {localStorageSync} from 'ngrx-store-localstorage';
import { environment } from "../../../environments/environment";
import * as fromProject from "./project/project.reducer";
import * as fromPopup from "./popup/popup.reducer";
import * as fromLayout from "./layout/layout.reducer";
import * as fromAuth from "./auth/auth.reducer";
import * as fromStatus from "./status/status.reducer";
import * as fromTask from "./task/task.reducer";
import * as fromMessage from "./message/message.reducer";
import * as fromInvite from "./invite/invite.reducer";
import * as fromTag from "./tag/tag.reducer";
import * as fromFilter from "./filter/filter.reducer";

export interface State {
  layout: fromLayout.State;
  popup: fromPopup.State;
  project: fromProject.State;
  auth: fromAuth.State;
  status: fromStatus.State;
  task: fromTask.State;
  message: fromMessage.State;
  invite: fromInvite.State;
  tag: fromTag.State;
  filter: fromFilter.State;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  popup: fromPopup.reducer,
  project: fromProject.reducer,
  auth: fromAuth.reducer,
  status: fromStatus.reducer,
  task: fromTask.reducer,
  message: fromMessage.reducer,
  invite: fromInvite.reducer,
  tag: fromTag.reducer,
  filter: fromFilter.reducer,
};

// export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
//   return localStorageSync({keys: ['layout', 'auth'], rehydrate: true})(reducer);
// }

// export const metaReducers: MetaReducer<State>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];

/**
 * Project Reducers
 */
export const getProjectState =
  createFeatureSelector<fromProject.State>("project");
export const getProjectEntities = createSelector(
  getProjectState,
  fromProject.getEntitiesArray
);
export const getProjectActiveEntities = createSelector(
  getProjectState,
  fromProject.getActiveEntities
);
export const getProjectArchiveEntities = createSelector(
  getProjectState,
  fromProject.getArchiveEntities
);
export const getProjectSelectedId = createSelector(
  getProjectState,
  fromProject.getSelectedId
);
export const getProjectSelectedIdForUpdate = createSelector(
  getProjectState,
  fromProject.getSelectedIdForUpdate
);
export const getProjectSelectedEntityForUpdate = createSelector(
  getProjectState,
  fromProject.getSelectedEntityForUpdate
);
export const getProjectLoading = createSelector(
  getProjectState,
  fromProject.getLoading
);

/**
 * Status Reducers
 */
export const getStatusState = createFeatureSelector<fromStatus.State>("status");
export const getStatusEntities = createSelector(
  getStatusState,
  fromStatus.getEntitiesArray
);
export const getStatusSelectedIdForUpdate = createSelector(
  getStatusState,
  fromStatus.getSelectedIdForUpdate
);
export const getStatusSelectedEntityForUpdate = createSelector(
  getStatusState,
  fromStatus.getSelectedEntityForUpdate
);
export const getStatusLoading = createSelector(
  getStatusState,
  fromStatus.getLoading
);
export const getStatusBackLog = createSelector(
  getStatusState,
  fromStatus.getBackLog
);

/**
 * Task Reducers
 */
export const getTaskState = createFeatureSelector<fromTask.State>("task");
export const getTaskEntities = createSelector(
  getTaskState,
  fromTask.getEntitiesArray
);
export const getTaskLoading = createSelector(getTaskState, fromTask.getLoading);
export const getTaskLoadingOrder = createSelector(
  getTaskState,
  fromTask.getLoadingOrder
);
export const getTaskEntitiesByStatus = (statusId) =>
  createSelector(getTaskState, fromTask.getEntitiesArrayByStatusId(statusId));
export const getTaskOpen = createSelector(getTaskState, fromTask.getOpen);
export const getTaskSelectedId = createSelector(
  getTaskState,
  fromTask.getSelectedId
);
export const getFavoritesTask = createSelector(
  getTaskState,
  fromTask.getEntitiesFavoritesArray
);
export const getNotificationsTask = createSelector(
  getTaskState,
  fromTask.getEntitiesNotificationsArray
);

/**
 * Message Reducers
 */

export const getMessageState =
  createFeatureSelector<fromMessage.State>("message");
export const getMessageEntitiesByTask = (taskId) =>
  createSelector(getMessageState, fromMessage.getEntitiesArrayByTaskId(taskId));
export const getMessageEntitiesPenned = createSelector(
  getMessageState,
  fromMessage.getEntitiesArrayPinned
);
export const getMessageEdit = createSelector(
  getMessageState,
  fromMessage.getEntityEdit
);

/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector<fromLayout.State>("layout");
export const getShowSidebar = createSelector(
  getLayoutState,
  fromLayout.getShowSidebar
);
export const getShowSidebarFavorite = createSelector(
  getLayoutState,
  fromLayout.getShowSidebarFavorite
);
export const getShowSidebarChat = createSelector(
  getLayoutState,
  fromLayout.getShowSidebarChat
);
export const getShowSidebarFilter = createSelector(
  getLayoutState,
  fromLayout.getShowSidebarFilter
);
export const getShowBackLog = createSelector(
  getLayoutState,
  fromLayout.getShowBackLog
);

/**
 * Popup Reducers
 */
export const getPopupState = createFeatureSelector<fromPopup.State>("popup");
export const getPopupProjectMenu = createSelector(
  getPopupState,
  fromPopup.getPopupProjectMenu
);
export const getPopupProjectForm = createSelector(
  getPopupState,
  fromPopup.getPopupProjectForm
);

/**
 * Auth Reducers
 */
export const getAuthState = createFeatureSelector<fromAuth.State>("auth");
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
export const getStep = createSelector(getAuthState, fromAuth.getStep);
export const getToken = createSelector(getAuthState, fromAuth.getToken);
export const getAuthErrors = createSelector(getAuthState, fromAuth.getErrors);
export const getLoading = createSelector(getAuthState, fromAuth.getLoading);
export const getUser = createSelector(getAuthState, fromAuth.getUser);
export const getUserCanAdmin = createSelector(
  getAuthState,
  fromAuth.getCanAdmin
);

/**
 * Invite Reducers
 */
export const getInviteState = createFeatureSelector<fromInvite.State>("invite");
export const getInviteIds = createSelector(getInviteState, fromInvite.getIds);
export const getInviteEntities = createSelector(
  getInviteState,
  fromInvite.getEntitiesArray
);
export const getInviteActiveEntities = createSelector(
  getInviteState,
  fromInvite.getEntitiesActive
);
export const getInviteNoDeleteEntities = createSelector(
  getInviteState,
  fromInvite.getEntitiesNoDelete
);
export const getInviteErrors = createSelector(
  getInviteState,
  fromInvite.getErrors
);
export const getInviteLoading = createSelector(
  getInviteState,
  fromInvite.getLoading
);

/**
 * Tag Reducers
 */
export const getTagState = createFeatureSelector<fromTag.State>("tag");
export const getTagEntities = createSelector(
  getTagState,
  fromTag.getEntitiesArray
);

/**
 * Filter Reducers
 */
export const getFilterState = createFeatureSelector<fromFilter.State>("filter");
export const getFilterEntities = createSelector(
  getFilterState,
  fromFilter.getEntitiesArray
);
export const getFilterSelect = createSelector(
  getFilterState,
  fromFilter.getSelectedEntity
);
