import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor() { }

  private computeRefreshTokensTimeout(expiresInSec: number): number {
    // todo: config
    const timeoutBuffer = 20 * 1000;

    if (!expiresInSec) throw new Error('could not read token expiration timestamp');

    return (expiresInSec * 1000) - timeoutBuffer;
  }

  private fetchTokensAndStoreThem = async (formData: URLSearchParams) => {
    const { url: kUrl, realm: kRealm, clientId: kClientId } = environment.keycloak;

    const url = `${kUrl}/realms/${kRealm}/protocol/openid-connect/token`;

    const { access_token: accessToken, refresh_token: refreshToken, id_token: idToken, expires_in: expiresIn } = await (await fetch(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    })).json();

    // const authStore = useAuthStore();

    // authStore.setAccessToken(accessToken);
    // authStore.setRefreshToken(refreshToken);
    // authStore.setIDToken(idToken);

    return { accessToken, refreshToken, idToken, expiresIn };
  }


  async checkIfRedirectedFromKeycloak(): Promise<void> {
    const hash = window.location.href.split('#')[1];

    if (!hash) return;

    const params = hash.split('&').reduce((p: { [key: string]: string }, c: string) => {
      const [key, value] = c.split('=');
      return { ...p, [key]: value };
    }, {});

    if (this.isLoginStateUUIDValid(params['state'])) {
      // todo
      await this.getTokensByCode(params['code'], 'http://localhost:4200', true);
    }
  }

  isLoginStateUUIDValid(stateUUID: string) {
    const isValid = stateUUID === window.sessionStorage.getItem('login_state_uuid');
    window.sessionStorage.removeItem('login_state_uuid');
    return isValid;
  }

  redirectToKeycloakLoginPage(redirectURI: string = 'http://localhost:4200') {
    const stateUUID = uuid();

    const { url: kUrl, realm: kRealm, clientId: kClientId } = environment.keycloak;

    const url = `${kUrl}/realms/${kRealm}/protocol/openid-connect/auth?client_id=${kClientId}&redirect_uri=${redirectURI}&state=${stateUUID}&response_mode=fragment&response_type=code&scope=openid`;

    window.sessionStorage.setItem('login_state_uuid', stateUUID);
    window.location.replace(url);
  }

  async getTokensByCode(code: string, redirectURI: string, isRefreshTokensEnabled = true) {
    const { clientId } = environment.keycloak;

    const formData = new URLSearchParams();

    formData.append('grant_type', 'authorization_code');
    formData.append('client_id', clientId);
    formData.append('code', code);
    formData.append('redirect_uri', encodeURI(redirectURI));

    const { expiresIn, refreshToken } = await this.fetchTokensAndStoreThem(formData);

    if (isRefreshTokensEnabled) {
      const timeout = this.computeRefreshTokensTimeout(expiresIn);

      setTimeout(() => {
        this.getTokensByRefreshToken(refreshToken, true);
      }, timeout);
    }
  }

  async getTokensByRefreshToken(token: string, isRefreshTokensEnabled = true) {
    const { clientId } = environment.keycloak;

    const formData = new URLSearchParams();

    formData.append('grant_type', 'refresh_token');
    formData.append('client_id', clientId);
    formData.append('refresh_token', token);

    const { expiresIn, refreshToken } = await this.fetchTokensAndStoreThem(formData);

    if (isRefreshTokensEnabled) {
      const timeout = this.computeRefreshTokensTimeout(expiresIn);

      setTimeout(() => {
        this.getTokensByRefreshToken(refreshToken, true);
      }, timeout);
    }
  }

}
