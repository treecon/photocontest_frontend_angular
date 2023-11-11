import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { KeycloakService } from './services/keycloak.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/auth/reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducers),
  ],
  providers: [
    AuthGuard,
    KeycloakService
  ]
})
export class CoreModule { }
