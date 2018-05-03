import { GhzbTreelistComponent } from "./ghzbjclist.component";
import { GhzbAreaComponent } from "./ghzbArea/ghzbArea.component";
import { GhzbJbxxComponent } from "./zyxmcl/ghzbJbxx.component";

export const GhzbRoutingModule = [
    {
        path: '',
        component: GhzbTreelistComponent,
        children: [
            {path: 'ghzbArea/:xmszxzqhdm/:ssghxmfldm/:localityDesc', component: GhzbAreaComponent},
            {path: 'ghzbjbxx/:xmszxzqhdm/:ssghxmfldm/:localityDesc', component: GhzbJbxxComponent},
        ]

    },
];