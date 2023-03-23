import { createSelector, select } from "@ngrx/store";
import { AppStateInterface } from "src/app/types/appState.interface";

const selectFeature = (state: AppStateInterface) => state.usersAndRoles;

export const usersAndRolesSelector = createSelector(
  selectFeature,
  (state) => state.usersAndRoles
)

export const adminUserInRoleSelector = createSelector(
  selectFeature,
  (state) => state.getUsersInRole
) 

export const messageNotification = createSelector(
  selectFeature,
  (state) => state.message
);

export const createGlobalAdminSelector = createSelector(
  selectFeature,
  (state) => state.createGlobalAdminSuccessMessage
)

export const globalUsersAndRolesSelector = createSelector(
  selectFeature,
  (state) => state.globalUsersAndRoles
)

export const updateGlobalAdminSelector = createSelector(
  selectFeature,
  (state) => state.updateGlobalAdminSuccessMessage
)

export const getGlobalAdminSelector = createSelector (
  selectFeature,
  (state) => state.globalUser
)

export const createAdminRoleSelector = createSelector (
  selectFeature,
  (state) => state.createAdminRole
)

export const getRolesAndPermissionsSelector = createSelector (
  selectFeature, 
  (state) => state.rolesAndPermission
)

export const getRolePermissionSelector = createSelector (
  selectFeature,
  (state) => state.getRolePermission
)

export const getStateSelector = createSelector (
  selectFeature,
  (state) => state.getStates
)

export const getLGASelector = createSelector (
  selectFeature,
  (state) => state.getStateAndLGA
)