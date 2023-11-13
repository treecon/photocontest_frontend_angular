export interface AuthState {
    isInitialCheckDone: boolean,
    isLoading: boolean,
    accessToken: string,
    refreshToken: string,
    idToken: string,
}

export interface AppState {
    auth: AuthState,
}
