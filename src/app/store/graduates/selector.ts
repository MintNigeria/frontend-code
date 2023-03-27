import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

const selectFeature = (state: AppStateInterface) => state.graduates;

export const graduateSelector = createSelector(
  selectFeature,
  (state) => state.gradautes
);
export const pendingGraduateSelector = createSelector(
  selectFeature,
  (state) => state.pendingGradautes
);

export const graduateDetailSelector = createSelector(
  selectFeature,
  (state) => state.graduateDetail
);
export const downloadFileSelector  = createSelector(
  selectFeature,
  (state) => state.downloadFile
);

export const recordUploadsSelector  = createSelector(
  selectFeature,
  (state) => state.recorduploads
);

