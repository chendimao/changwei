import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {UserComponent} from './user/user.component';
import {EngMangHomeComponent} from './EngMangHome/eng-mang.component';
import {LoginComponent} from './login/login.component';



const appRoutes: Routes = [
    {
        path: 'engmang', loadChildren: 'app/eng-mang/eng-mang.module#EngMangModule',
    },
    {
        path: 'query', loadChildren: 'app/query/query.module#QueryModule',
    },
    {
        path: 'report', loadChildren: 'app/report/report.module#ReportModule',
    },
    {
        path: 'database', loadChildren: 'app/database/data-base.module#DataBaseModule',
    },
    {
        path: 'system', loadChildren: 'app/systemSetting/system.module#SystemModule',
    },
    {
        path: 'KpiReport', loadChildren: 'app/kpi/kpi.module#KpiModule',
    },

    // {
    //     path: 'KpiReport', component: KpiReportComponent,
    // },

    {
        path: 'engmangHome', component: EngMangHomeComponent,
    },
    {
        path: 'user', component: UserComponent,
    },

    {
        path: '', component: LoginComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true} // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
    ngOnInit() {
        console.log('这是路由模块');
    }
}