import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import * as storage from '../storage';
import { contactUsSuccess, invokeGetStateAndLGASuccess } from './action';
import { IUtilityStateInterface } from './types/index.type';


const initialState: IUtilityStateInterface = {
  getStateAndLGA: {data: []},
  contact: null

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
  

);
