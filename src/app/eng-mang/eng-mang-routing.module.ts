import {EngMangComponent} from "./eng-mang.component";
import {ProjectProposalComponent} from './project-proposal/project-proposal.component';
import {EngBaseComponent} from './eng-base/eng-base.component';
import { WaringComponent } from "../common/waring/waring.component";
import { YsqkComponent } from "./ymazysjd/ysqk/ysqk.component";
import { EngMangHomeComponent } from "./EngMangHome/eng-mang.component";

export const EngMangRoutingModule = [

    {
        path: '',
        component: EngMangHomeComponent,

   },
    {
        path:"info",
        component:EngMangComponent,
        children:[
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

