import { createAction, props } from '@ngrx/store';
import { IChangePassword } from '../auth/index.types';
import { IChangeRolePassword, ICreateAdminRole, ICreateInstitutionUser, IRolesAndPermissions, IUpdateGlobalAdminUser } from './types/index.types';


export const getAllUsersAndRoles = createAction (
  '[Users And Roles] get all UsersAndRoles',
  props<{

    keyword: string;
    filter: string;
    pageSize: number;
    pageIndex: number;
  }>()
)


export const getAllUsersAndRolesSuccess = createAction (
  '[Users And Roles] get all UsersAndRoles Success',
  props<{payload: any}>()
)


export const getAllGlobalUsersAndRoles = createAction (
  '[Users And Roles] get Global UsersAndRoles',
  props<{
    keyword: string;
    filter: string;
    pageSize: number;
    pageIndex: number;
  }>()
)


export const getAllGlobalUsersAndRolesSuccess = createAction (
  '[Users And Roles] get all Global UsersAndRoles Success',
  props<{payload: any}>()
)

export const invokeAdminUsersInRole = createAction (
  '[Users And Roles] get institution Users in Roles',
  props<{
    roleId: string;
    institutionId: string;
    keyword: string;
    filter: string;
    pageSize: number;
    pageIndex: number;
  }>()
)


export const invokeAdminUsersInRoleSuccess = createAction (
  '[Users And Roles] get all institution Users in Roles Success',
  props<{payload: any}>()
)


export const changePasswordUserRole = createAction(
  '[Users and Roles] Reset Password',
  props<{
   payload : IChangeRolePassword
  }>()
);

export const changePasswordUserRoleSuccess = createAction(
  '[Users and Roles] Reset Password Success',
  props<{ message: string }>()
);

export const getInstitutionRoles = createAction (
  '[Users and Roles] Get Instution roles',
  props<{
    id: string
  }>()
)
export const getInstitutionRolesSuccess = createAction (
  '[Users and Roles] Get Instution roles success',
  props<{
    payload: any
  }>()
)
export const getGlobalAdminUser = createAction (
  '[Users and Roles] Get Global Admin Users',
  props<{
    userId: string
  }>()
)

export const getGlobalAdminUserSuccess = createAction (
  '[Users and Roles] Get Global Admin User success',
  props<{
    payload: any
  }>()
)

export const invokeRolePermission = createAction (
  '[Users and Roles] Get Role Permission',
  props<{
    roleId: string
  }>()
)

export const invokeRolePermissionSuccess = createAction (
  '[Users and Roles] Get Role Permission success',
  props<{
    payload: any
  }>()
)

export const createInstitutionUserWithRole = createAction (
  '[Users and Roles] Add New institution User',
  props<{
    payload : any
   }>()
)

export const createInstitutionUserWithRoleSuccess = createAction (
  '[Users and Roles] Add New institution User success',
  props<{
    payload : any
   }>()
)

export const updateInstitutionUserWithRole = createAction (
  '[Users and Roles] update institution User',
  props<{
    payload : any
   }>()
)

export const updateInstitutionUserWithRoleSuccess = createAction (
  '[Users and Roles] update institution User success',
  props<{
    payload : any
   }>()
)



export const updateGlobalAdminUser = createAction (
  '[Users and Roles] Create New Admin User Success',
  props<{
    payload : IUpdateGlobalAdminUser
   }>()
)

export const updateGlobalAdminUserSuccess = createAction(
  '[Users and Roles] Update Password Success',
  props<{ message: string }>()
);

export const invokeGlobalAdminRole = createAction (
  '[Users and Roles] Create New Admin Role',
  props<{
    payload : ICreateAdminRole
   }>()
)

export const invokeGlobalAdminRoleSuccess = createAction(
  '[Users and Roles] Create New Admin Role Success',
  props<{ message: string }>()
);



export const updatePermissionsInRole = createAction (
  '[Users and Roles] update permissions in a role',
  props<{
    payload : any
   }>()
)

export const updatePermissionsInRoleSuccess = createAction(
  '[Users and Roles] update permissions in a role Success',
  props<{ payload: any }>()
);


export const invokePermissionAndRoles = createAction (
  '[Users and Roles] get Permissions and Roles',
)

export const invokePermissionAndRoleSuccess = createAction(
  '[Users and Roles] get Permissions and Roles Success',
  props<{ payload: any }>()
);

export const invokeGetStates = createAction (
  '[Users and Roles] get States',
)

export const invokeGetStatesSuccess = createAction(
  '[Users and Roles] get States Success',
  props<{ payload: any }>()
);

export const invokeGetLGA = createAction (
  '[Users and Roles] get LGA',
)

export const invokeGetLGASuccess = createAction(
  '[Users and Roles] get LGA Success',
  props<{ payload: any }>()
);




