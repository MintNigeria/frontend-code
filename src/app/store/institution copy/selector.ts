import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.utility;

export const stateLgaSelector = createSelector(
  selectFeature,
  (state) => state.getStateAndLGA
)

