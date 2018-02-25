import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KpiReportComponent} from "./kpi.component";

const KpiRoutes: Routes = [
    {
        path: '',
        component: KpiReportComponent,

    }

];

@NgModule({
    imports: [
        RouterModule.forChild(KpiRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class KpiRoutingModule {
}