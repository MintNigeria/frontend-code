import { createAction, props } from '@ngrx/store';


export const invokeGetStateAndLGA = createAction (
  '[Utilities] get state and LGA',
)

export const invokeGetStateAndLGASuccess = createAction(
  '[Utilities] get state and LGA Success',
  props<{ payload: any }>()
);