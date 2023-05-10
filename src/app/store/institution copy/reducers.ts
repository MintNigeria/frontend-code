import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import * as storage from '../storage';
import { contactHelpDeskSuccess, contactUsSuccess, invokeGetStateAndLGASuccess } from './action';
import { IUtilityStateInterface } from './types/index.type';


const initialState: IUtilityStateInterface = {
  getStateAndLGA: {data: []},
  contact: null,
  helpDesk: null

};

export const utilityReducers = createReducer(
  initialState,
  on(invokeGetStateAndLGASuccess, (state, { payload }) => {
    return {
      ...state,
      getStateAndLGA: payload,
    };
  }),
  on(contactUsSuccess, (state, { payload }) => {
    return {
      ...state,
      contact: payload,
    };
  }),
  on(contactHelpDeskSuccess, (state, { payload }) => {
    return {
      ...state,
      helpDesk: payload,
    };
  }),
  

);
