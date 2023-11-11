import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/core/models/state';

export const selectFeature = (state: AppState) => state.auth;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const tokensSelector = createSelector(
  selectFeature,
  (state) => ({ accessToken: state.accessToken, refreshToken: state.refreshToken, idToken: state.idToken })
);
