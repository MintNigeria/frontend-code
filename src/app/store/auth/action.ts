import { createAction, props } from '@ngrx/store';
import { IResetPassword, IUser, ILogin } from './index.types';

export const invokeLoginUser = createAction(
  '[Login User] Invoke',
  props<{ payload: any }>()
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

// reset password
export const createPassword = createAction(
  '[CREATE_PASSWORD] create Password',
  props<{
    email: string;
    password: string;
    confirmPassword: string;
  }>()
);

export const createPasswordSuccess = createAction(
  '[CREATE_PASSWORD] create Password Success',
  props<{ payload: any }>()
);

export const requestPasswordReset = createAction(
  '[requestPasswordReset] Reset Password',
  props<{ email: string }>()
);

export const requestPasswordResetSuccess = createAction(
  '[requestPasswordReset] Reset Password Success',
  props<{ message: string }>()
);

export const resendOTP = createAction(
  '[resendOTP] Resend OTP',
  props<{ email: string }>()
);

export const resendOTPSuccess = createAction(
  '[resendOTP] Resend OTP Success',
  props<{ message: string }>()
);

export const resetPassword = createAction(
  '[requestPasswordReset] Resend OTP',
  props<{ payload: IResetPassword }>()
);

export const resetPasswordSuccess = createAction(
  '[requestPasswordReset] Resend OTP Success',
  props<{ payload: any }>()
);

export const resendOTPForInstitution = createAction(
  '[requestPasswordReset] Resend Institution OTP',
  props<{ email: string }>()
);

export const resendOTPForInstitutionSuccess = createAction(
  '[requestPasswordReset] Resend Institution OTP Success',
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

export const activateDeactivate2FA = createAction(
  '[activateDeactivate2FA] Activate Deactivate 2FA',
  props<{ payload: any }>()
);

export const activateDeactivate2FASuccess = createAction(
  '[activateDeactivate2FA] Activate Deactivate 2FA Success',
  props<{ message: string }>()
);

export const confirm2FAction = createAction(
  '[confirm2FAction] confirm 2FA action',
  props<{ email: any }>()
);

export const confirm2FActionSuccess = createAction(
  '[confirm2FAction] confirm 2FA action Success',
  props<{ message: string }>()
);

export const LOGOUT = '[App] Logout';
export const logoutAction = createAction('[App] Logout');
