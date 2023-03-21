import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.auth;

export const isAuthenticatedSelector = createSelector(
  selectFeature,
  (state) => state.isAuthenticated
);

export const isUserSelector = createSelector(
  selectFeature,
  (state) => state.user
);

export const messageNotification = createSelector(
  selectFeature,
  (state) => state.message
);
