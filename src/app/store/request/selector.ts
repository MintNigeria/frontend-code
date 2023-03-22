import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/types/appState.interface";

const selectFeature = (state: AppStateInterface) => state.requests;

export const requestSelector = createSelector(
  selectFeature,
  (state) => state.request
)

export const organisationRequestSelector = createSelector(
  selectFeature,
  (state) => state.organisationRequest
)

export const requestDetailsSelector = createSelector(
  selectFeature,
  (state) => state.requestDetails
)