import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryComponent} from './history/history.component';
import {CheckPointsComponent} from './check-points/check-points.component';
import {MainRoutingModule} from './main-routing.module';
import {FormsModule} from '@angular/forms';
import {MainComponent} from './main.component';
import {UrlPermission} from '../services/url-permission/url-permission.service';

import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';


@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule,
        FormsModule,

        AutoCompleteModule,
        InputTextModule,
        ButtonModule,
        RippleModule
    ],
    providers: [UrlPermission],
    declarations: [MainComponent, HistoryComponent, CheckPointsComponent]
})
export class MainModule {
}
