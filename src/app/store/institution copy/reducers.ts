import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import * as storage from '../storage';
import { invokeGetStateAndLGASuccess } from './action';
import { IUtilityStateInterface } from './types/index.type';


const initialState: IUtilityStateInterface = {
  getStateAndLGA: {data: []}

};

export const utilityReducers = createReducer(
  initialState,
  on(invokeGetStateAndLGASuccess, (state, { payload }) => {
    return {
      ...state,
      getStateAndLGA: payload,
    };
  }),
  

);
