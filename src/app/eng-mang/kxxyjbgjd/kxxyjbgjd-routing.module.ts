import { TzgsComponent } from "./tzgs/tzgs.component";

export const KxxyjbgjdRoutingModule = [
     {
        path: 'swzb/:item/:qshflId',
        loadChildren: './swzb/swzb.module#SwzbModule',
    },
    {
        path: 'ghzb/:item/:qshflId',
        loadChildren: './ghzb/ghzb.module#GhzbModule',
    },
    {
        path: 'tzgs/:item/:qshflId',
        component: TzgsComponent
    },



]