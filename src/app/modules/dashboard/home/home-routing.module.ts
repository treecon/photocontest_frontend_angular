import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { requiresAuth: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
