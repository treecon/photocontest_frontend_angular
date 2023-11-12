import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { KeycloakService } from './services/keycloak.service';
import { Store, StoreModule } from '@ngrx/store';
import { reducers } from './store/auth/reducers';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducers),
    StoreModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    KeycloakService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class CoreModule { }
