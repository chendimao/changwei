import { GhzbTreelistComponent } from "./ghzbjclist.component";
import { GhzbAreaComponent } from "./ghzbArea/ghzbArea.component";
import { GhzbJbxxComponent } from "./zyxmcl/ghzbJbxx.component";

export const GhzbRoutingModule = [
    {
        path: '',
        component: GhzbTreelistComponent,
        children: [
            {path: 'ghzbArea/:ssgcdm/:xmszxzqhdm/:ssghxmfldm', component: GhzbAreaComponent},
            {path: 'ghzbjbxx/:ssgcdm/:xmszxzqhdm/:ssghxmfldm', component: GhzbJbxxComponent},
        ]

    },
];