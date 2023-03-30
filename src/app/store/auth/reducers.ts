import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import {
  changePasswordSuccess,
  createPasswordSuccess,
  getUserProfileSuccess,
  loginSuccess,
  LOGOUT,
  requestPasswordResetSuccess,
  resendOTPSuccess,
} from './action';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as storage from '../storage';
import { IAuthStateInterface } from './index.types';
const initialState: IAuthStateInterface = {
  isAuthenticated: false,
  user: storage.getItem('auth') ? storage.getItem('auth').user : null,
  message: '',
  basicProfile: null,
};

export const authReducers = createReducer(
  initialState,
  on(loginSuccess, (state, { accessToken }) => {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(accessToken);
    return {
      isAuthenticated: true,
      user: {
        firstName: decodedToken.given_name,
        lastName: decodedToken.family_name,
        email: decodedToken.email,
        id: decodedToken.id,
        lastLogin: decodedToken.last_login_time,
        name: decodedToken.name,
      },
    };
  }),
  on(changePasswordSuccess, (state, { message }) => {
    return {
      ...state,
      message,
    };
  }),
  on(createPasswordSuccess, (state, { payload }) => {
    return {
      ...state,
      payload,
    };
  }),
  on(getUserProfileSuccess, (state, { user }) => {
    return {
      ...state,
      basicProfile: user,
    };
  }),
  on(requestPasswordResetSuccess, (state, { message }) => {
    return {
      ...state,
      message,
    };
  }),
  on(resendOTPSuccess, (state, { message }) => {
    return {
      ...state,
      message,
    };
  })
);

function swapElements(arr: any, i1: any, i2: any) {
  const newArray = [i2, i1];
  return newArray;
}

export function clearStateMetaReducer<State extends {}>(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return function clearStateFn(state: any, action: Action) {
    if (action.type === LOGOUT) {
      ////console.log('here');
      state = {} as State; // ==> Emptying state here
    }
    return reducer(state, action);
  };
}
