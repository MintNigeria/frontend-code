import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/types/appState.interface";

const selectFeature = (state: AppStateInterface) => state.dashboard;

export const dashboardSelector = createSelector(
  selectFeature,
  (state) => state.dashBoard
)

export const dashboardCardSelector = createSelector(
  selectFeature,
  (state) => state.dashboardCardStats
)