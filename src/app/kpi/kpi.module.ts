import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';

import {KpiReportComponent} from './kpi.component';
import { KpiRoutingModule } from "./kpi-routing.module";
import { UserCommonModule } from "../common/UserCommon.module";

@NgModule({
    declarations: [
        KpiReportComponent,


    ],
    imports: [
        KpiRoutingModule,
        CommonModule,
        UserCommonModule,


    ],
    providers: [],
})
export class KpiModule {
}
