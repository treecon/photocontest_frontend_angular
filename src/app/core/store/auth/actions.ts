import { createAction, props } from '@ngrx/store';

export const getTokens = createAction('[Auth] Get tokens');

export const getTokensSuccess = createAction(
  '[Auth] Get tokens success',
  props<{ accessToken: string, refreshToken: string, idToken: string }>()
);

export const getTokensFailure = createAction(
  '[Posts] Get tokens failure',
  props<{ error: string }>()
);
