import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/landing-page/landing-page.module').then(m => m.LandingPageModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/home/home.module').then(m => m.HomeModule),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
