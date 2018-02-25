import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { WjdatabaseComponent } from "./wjdatabase/wjdatabase.component";
import { DataBaseComponent } from "./data-base.component";
import { SsjhComponent } from './ssjh/ssjh.component';
const QueryRoutes: Routes = [
    {
        path: '',
        component: DataBaseComponent,
        children: [
            {
                path: '',
                children: [
                    {path: 'wjdatabase/:id', component: WjdatabaseComponent},
                     {path: '', component: SsjhComponent},
                ]
            }
        ]
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(QueryRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DataBaseRoutingModule {
}