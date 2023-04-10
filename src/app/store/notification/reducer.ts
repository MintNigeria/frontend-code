import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as storage from '../storage';
import { NotificationStateInterface } from './index.types';
import { getNotificationSuccess } from './action';


const initialState: NotificationStateInterface = {
  notifications : []
};

export const notificationReducers = createReducer(
  initialState,
  on(getNotificationSuccess, (state, { payload }) => {
    return {
      ...state,
      notifications: payload,
    };
  }),

)
