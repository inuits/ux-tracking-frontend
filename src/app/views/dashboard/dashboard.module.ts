import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ButtonsModule} from 'ngx-bootstrap/buttons';

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ActionComponent} from './action/action.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import {HighlightModule} from 'ngx-highlightjs';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    CommonModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    HttpClientModule,
    HighlightModule.forRoot({ theme: 'rainbow'})
  ],
  declarations: [DashboardComponent, ActionComponent, TimeAgoPipe],
})
export class DashboardModule {
}
