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
import {ActionsComponent} from './actions/actions.component';
import {ErrorsComponent} from './errors/errors.component';
import {ErrorComponent} from './error/error.component';
import {PagerComponent} from '../base/pager/pager.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FilterComponent} from './filter/filter.component';
import {FilterBadgeComponent} from './filter/filter-badge/filter-badge.component';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    BsDropdownModule,
    ChartsModule,
    CommonModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    HttpClientModule,
    HighlightModule.forRoot({theme: 'rainbow'}),
    NgSelectModule
  ],
  declarations: [DashboardComponent, ActionComponent, PagerComponent, TimeAgoPipe, ActionsComponent, ErrorsComponent, ErrorComponent, FilterComponent, FilterBadgeComponent],
})
export class DashboardModule {
}
