import { createAction, props } from '@ngrx/store';
import {
  AppLoadingStateInterface,
  AppResponseInterface,
} from 'src/app/types/appState.interface';

export const setAPIResponseMessage = createAction(
  '[API] success or failure Message',
  props<{ apiResponseMessage: AppResponseInterface }>()
);

export const setAPILoadingState = createAction(
  '[API] loading state',
  props<{ apiLoading: AppLoadingStateInterface }>()
);


export const invokeGetAllState = createAction('[State] get all states')