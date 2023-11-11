export interface AuthState {
    isLoading: boolean,
    accessToken: string,
    refreshToken: string,
    idToken: string,
}

export interface AppState {
    auth: AuthState,
}
