import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor() {}

  redirectToKeycloakLoginPage(redirectURI: string = '') {
    const stateUUID = uuid();

    const { url: kUrl, realm: kRealm, clientId: kClientId } = environment.keycloak;

    const url = `${kUrl}/realms/${kRealm}/protocol/openid-connect/auth?client_id=${kClientId}&redirect_uri=${redirectURI}&state=${stateUUID}&response_mode=fragment&response_type=code&scope=openid`;

    window.sessionStorage.setItem('login_state_uuid', stateUUID);
    window.location.replace(url);
  }

}
