import { createReducer, on } from '@ngrx/store';
import { createGlobalAdminUserSuccess, changePasswordUserRoleSuccess, getAllUsersAndRolesSuccess, getGlobalAdminUserSuccess, getAllGlobalUsersAndRolesSuccess, updateGlobalAdminUserSuccess, invokePermissionAndRoleSuccess, invokeAdminUsersInRoleSuccess, invokeRolePermissionSuccess, invokeGetStatesSuccess, invokeGetLGASuccess } from './actions';
import { UsersAndRolesStateInterface } from './types/index.types';


const initialState:UsersAndRolesStateInterface  = {
  usersAndRoles: { defaultRoles: [], customRoles:[] },
  globalUsersAndRoles: {data: [], totalCount: 0},
  createGlobalAdminSuccessMessage: '',
  updateGlobalAdminSuccessMessage: '',
  globalUser: {
  firstName: '',
  lastName: '',
  emailAddress: '',
  mobileNumber: '',
  staffId: '',
  roleId: '',
  department: '',
  stateOfResidence: '',
  localGovernment: '',
  address: '',
  isEnabled: true,
  },
  createAdminRole: {
    name: '',
    permissionIds: [ ]
  },
  rolesAndPermission: { data: [] },
  getUsersInRole: { data: [], totalCount: 0 },
  getRolePermission: {  
    roleName: '',
    permissions: [
      {
        id: 0,
        name: '',
        description: '',
      }
    ],
  },
  getStates: {data: []},
  getLGA: {data: []},
  getStateAndLGA: {data: []}


}

export const usersAndRolesReducer = createReducer (
  initialState,
  on(getAllUsersAndRolesSuccess , (state, {payload})=> {
    return {
      ...state,
      usersAndRoles: payload
    }
  }),
  on(invokeAdminUsersInRoleSuccess , (state, {payload})=> {
    return {
      ...state,
      getUsersInRole: payload
    }
  }),
  on(changePasswordUserRoleSuccess, (state, { message }) => {
    return {
      ...state,
      message,
    };
  }),
  on(getGlobalAdminUserSuccess, (state, { payload }) => {
    return {
      ...state,
      globalUser: payload
    };
  }),
  on(createGlobalAdminUserSuccess, (state, { message }) => {
    return {
      ...state,
      createGlobalAdminSuccessMessage: message,
    };
  }),
  on(getAllGlobalUsersAndRolesSuccess , (state, {payload})=> {
    return {
      ...state,
      globalUsersAndRoles: payload
    }
  }),
  on(updateGlobalAdminUserSuccess, (state, { message }) => {
    return {
      ...state,
      updateGlobalAdminSuccessMessage: message,
    };
  }),
  on(invokePermissionAndRoleSuccess, (state, { payload }) => {
    return {
      ...state,
      rolesAndPermission: payload,
    };
  }),
  on(invokeRolePermissionSuccess, (state, { payload }) => {
    return {
      ...state,
      getRolePermission: payload
    };
  }),
  on(invokeGetStatesSuccess, (state, { payload }) => {
    return {
      ...state,
      getStates: payload
    };
  }),
  on(invokeGetLGASuccess, (state, { payload }) => {
    return {
      ...state,
      getStateAndLGA: payload
    };
  }),
  
  
 
  


)