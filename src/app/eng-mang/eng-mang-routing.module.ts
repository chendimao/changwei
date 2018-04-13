import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EngMangComponent} from "./eng-mang.component";
import {ProjectProposalComponent} from './project-proposal/project-proposal.component';
import {EngBaseComponent} from './eng-base/eng-base.component';
import { WaringComponent } from "../common/waring/waring.component";
import { YsqkComponent } from "./ymazysjd/ysqk/ysqk.component";

export const EngMangRoutingModule = [
    {
        path: '',
        component: EngMangComponent,
        children: [
            {path: '', component: WaringComponent},
            {path: 'EngBase/:id', component: EngBaseComponent},
            {path: 'ProjectProposal/:id', component: ProjectProposalComponent},
            {path: 'ymanysjd/ysqk/ysqk', component: YsqkComponent},
            {
                path: ':jddm/:id',
                loadChildren: './kxxyjbgjd/kxxyjbgjd.module#KxxyjbgjdModule',
            },
            {
                path: 'ssazjd/:id',
                loadChildren: './ssazjd/ssazjd.module#SsazjdModule',
            },
        ]

    }

];

