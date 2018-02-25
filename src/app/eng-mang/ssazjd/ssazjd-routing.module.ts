
import {SsazjdComponent} from './ssazjd.component';
import {NdjhComponent} from './ndjh/ndjh.component';
import {JdtbComponent} from './ssdj/jdtb/jdtb.component';
import {SsjdComponent} from './ssdj/ssjd.component';
import {DlpgzlComponent} from './jdpgzlk/dlpgzl/dlpgzl.component';
import {ZhjlzlComponent} from './jdpgzlk/zhjlzl/zhjlzl.component';
import {KcqlssqkComponent} from "./kcqlssqk/kcqlssqk.component";

export const SsazjdRoutingModule = [
    {
        path: '',
        component: SsazjdComponent,
        children: [
            {path: 'ndjh/ndjh', component: NdjhComponent},
            {path: 'kdqlss/kcqlss', component: KcqlssqkComponent},
            {path: 'jdpgzlk/dlpgzl', component: DlpgzlComponent},
            {path: 'jdpgzlk/zhjlzl', component: ZhjlzlComponent},

            {
                path: 'ssjd',
                component: SsjdComponent,
                children: [
                    {
                        path: 'jdtb',
                        component: JdtbComponent,
                    },
                ]

            },

        ]


    }
];