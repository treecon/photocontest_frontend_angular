import { AfterContentInit, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, filter, map, switchMap, take, tap } from 'rxjs';
import { KeycloakService } from '../services/keycloak.service';
import { Store, select } from '@ngrx/store';
import { tokensSelector } from '../store/auth/selectors';
import { AppState } from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private keycloakService: KeycloakService, private store: Store<AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (route.data['requiresAuth']) {
      return this.store.pipe(
        select(tokensSelector),
        filter(x => x.isInitialCheckDone),
        tap((x) => {
          if (!x.accessToken) this.keycloakService.redirectToKeycloakLoginPage();
        }),
        map((x) => !!x.accessToken)
      )
    }

    return true;
  }
}
