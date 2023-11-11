import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { GuestLayoutComponent } from './guest-layout/guest-layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LayoutComponent,
    GuestLayoutComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
  ],
  exports: [
    LayoutComponent,
  ]
})
export class LayoutModule { }
