import { createReducer, on } from '@ngrx/store';
import { AppResponseInterface } from 'src/app/types/appState.interface';

import { setAPILoadingState, setAPIResponseMessage } from './app.action';

const initialResponseState: Readonly<AppResponseInterface> = {
  apiResponseMessage: '',
  isLoading: false,
  isApiSuccessful: false,
};

export const appReducer = createReducer(
  initialResponseState,
  on(setAPIResponseMessage, (state, { apiResponseMessage }) => {
    return {
      ...state,
      ...apiResponseMessage,
    };
  }),
  on(setAPILoadingState, (state, { apiLoading }) => {
    return {
      ...state,
      ...apiLoading,
    };
  })
);
