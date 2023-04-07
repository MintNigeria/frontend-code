import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.notification;

export const notificationSelector = createSelector(
    selectFeature,
    (state) => state.notifications
  );