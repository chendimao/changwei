import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportComponent} from "./report.component";
import {NjgcymazqqgzjdComponent} from './njgcymazqqgzjd/njgcymazqqgzjd.component';


const ReportRoutes: Routes = [
    {
        path: '',
        component: ReportComponent,
        children: [
            {path: 'njgcymazqqgzjd', component: NjgcymazqqgzjdComponent}
        ]
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(ReportRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ReportRoutingModule {
}