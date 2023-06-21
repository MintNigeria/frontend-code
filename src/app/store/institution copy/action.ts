import { createAction, props } from '@ngrx/store';


export const invokeGetStateAndLGA = createAction (
  '[Utilities] get state and LGA',
)

export const invokeGetStateAndLGASuccess = createAction(
  '[Utilities] get state and LGA Success',
  props<{ payload: any }>()
);

export const contactUs = createAction (
  '[Utilities] send audience enquiry',
  props<{ payload: any }>()
)

export const contactUsSuccess = createAction(
  '[Utilities] send audience enquiry Success',
  props<{ payload: any }>()
);

export const contactHelpDesk = createAction (
  '[Utilities] send help desk enquiry or request messages',
  props<{ payload: any }>()
)

export const contactHelpDeskSuccess = createAction(
  '[Utilities] send help desk enquiry or request messages Success',
  props<{ payload: any }>()
);

export const requestForDemo = createAction (
  '[Utilities] request for demo',
  props<{ payload: any }>()
)

export const requestForDemoSuccess = createAction(
  '[Utilities] request for demo Success',
  props<{ payload: any }>()
);