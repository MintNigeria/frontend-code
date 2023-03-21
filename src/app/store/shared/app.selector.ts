import { createFeatureSelector } from '@ngrx/store';
import {
  AppLoadingStateInterface,
  AppResponseInterface,
  AppStateInterface,
} from 'src/app/types/appState.interface';

export const selectAppAPIResponse =
  createFeatureSelector<AppResponseInterface>('apiResponse');

export const selectIsLoading =
  createFeatureSelector<AppLoadingStateInterface>('isLoading');
