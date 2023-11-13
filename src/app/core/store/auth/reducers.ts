import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../models/state';
import * as AuthActions from './actions';

export const initialState: AuthState = {
  isInitialCheckDone: false,
  isLoading: false,
  accessToken: '',
  refreshToken: '',
  idToken: '',
};

export const reducers = createReducer(
  initialState,
  on(AuthActions.setInitialCheckCompleted, (state) => {
    return {
      ...state,
      isInitialCheckDone: true,
    }
  }),
  on(AuthActions.getTokens, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AuthActions.getTokensSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    accessToken: action.accessToken,
    refreshToken: action.refreshToken,
    idToken: action.idToken, 
  })),
  on(AuthActions.getTokensFailure, (state, action) => ({
    ...state,
    isLoading: false,
    accessToken: '',
    refreshToken: '',
    idToken: '',
  }))
);
