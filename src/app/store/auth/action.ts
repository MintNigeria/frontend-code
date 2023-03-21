import { createAction, props } from '@ngrx/store';
import { IResetPassword, IUser } from './index.types';

export const invokeLoginUser = createAction(
  '[Login User] Invoke',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login User] Login Success',
  props<{ accessToken: string }>()
);

// reset password
export const changePasswordUser = createAction(
  '[changePassword User] Reset Password',
  props<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>()
);

export const changePasswordSuccess = createAction(
  '[changePassword User] Reset Password Success',
  props<{ message: string }>()
);

export const requestPasswordReset = createAction(
  '[requestPasswordReset] Reset Password',
  props<{ email: string }>()
);

export const requestPasswordResetSuccess = createAction(
  '[requestPasswordReset] Reset Password Success',
  props<{ message: string }>()
);

export const getUserProfile = createAction('[getUserProfile] Get User Profile');
export const getUserProfileSuccess = createAction(
  '[getUserProfileSuccess] Get User Profile Success',
  props<{ user: IUser }>()
);

export const passwordReset = createAction(
  '[PasswordReset] Password Reset',
  props<{ payload: IResetPassword }>()
);

export const passwordResetSuccess = createAction(
  '[PasswordReset] Password Reset Success',
  props<{ message: string }>()
);

export const LOGOUT = '[App] Logout';
export const logoutAction = createAction('[App] Logout');
