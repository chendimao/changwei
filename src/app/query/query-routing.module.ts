import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {QueryNavComponent} from './query-nav/query-nav.component';
import {HomeComponent} from './swzb/ncbf/home/home.component';

export const QueryRoutingModule = [
    {
        path: '',
        component: QueryNavComponent,
        children: [
            {
                path: 'swzb',
                children: [
                    {
                        path: 'ncbf',
                        children: [
                            {path: 'home', component: HomeComponent},
                        ]
                    }
                ]
            }


        ]
    }


];