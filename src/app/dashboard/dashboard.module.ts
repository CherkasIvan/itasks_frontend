/**
 * Core
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
/**
 * Modules
 */
import {DashboardRoutingModule} from './dashboard-routing.module';
/**
 * Components
 */
import {DashboardComponent} from './dashboard.component';
import {CabinetModule} from '../cabinet/cabinet.module';
import {UxModule} from '@ux/ux.module';

@NgModule({
  imports: [
    CommonModule,
    CabinetModule,
    UxModule,
    DashboardRoutingModule
  ],
  providers: [],
  declarations: [DashboardComponent]
})
export class DashboardModule {
}
