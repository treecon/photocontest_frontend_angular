import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor() {}

  async checkParams(): Promise<boolean> {
    const hash = window.location.href.split('#')[1];

    if (hash) console.log('hash exists', hash);

    return true;
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

}
