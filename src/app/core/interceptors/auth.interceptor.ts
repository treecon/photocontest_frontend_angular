import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { tokensSelector } from '../store/auth/selectors';
import { Observable, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../models/state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = '';

    // subscribe HAS to be synchronous here to avoid race condition
    // check if there is a better way to write the following block
    this.store.pipe(
      select(tokensSelector),
      take(1),
    ).subscribe((x) => {
      token = x.accessToken;
    });

    const newRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(newRequest);
  }
}
