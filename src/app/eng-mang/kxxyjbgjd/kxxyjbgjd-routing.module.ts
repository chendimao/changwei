import { ScazrkComponent } from "./ghzb/ncymaz/scazrk/scazrk.component";
import {RoadComponent} from "./ghzb/zyxmcl/road/road.component";
import { TzgsComponent } from "./tzgs/tzgs.component";

export const KxxyjbgjdRoutingModule = [
     {
        path: 'swzb/:item/:qshflId',
        loadChildren: './swzb/swzb.module#SwzbModule',
    },
    {
        path: 'ghzb/ncymaz/scazrk',
        component: ScazrkComponent,
    },
    {
        path: 'ghzb/zyxmcl/road',
        component: RoadComponent,
    },
    {
        path: 'tzgs/tzgs',
        component: RoadComponent,
    },


]