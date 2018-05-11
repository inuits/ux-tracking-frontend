import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbAlertModule, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {ChatComponent, NotificationComponent, TimelineComponent} from './components';
import {StatModule} from '../../shared';
import {ErrorlistComponent} from './components/errorlist/errorlist.component';
import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        DashboardRoutingModule,
        StatModule,
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        ErrorlistComponent,
        TimeAgoPipe
    ]
})
export class DashboardModule {
}
