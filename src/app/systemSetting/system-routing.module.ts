import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemComponent} from "../systemSetting/system.component";
import {ZdkglComponent} from "../systemSetting/stpzgl/zdkgl/zdkgl.component";
import {ZdyyglComponent} from '../systemSetting/stpzgl/zdyygl/zdyygl.component';
import {FgczdxpzComponent} from '../systemSetting/stpzgl/fgczdxpz/fgczdxpz.component';
import {SwzbtxpzComponent} from '../systemSetting/stpzgl/swzbtxpz/swzbtxpz.component';
import {QshsjswzbglxpzComponent} from '../systemSetting/stpzgl/qshsjswzbglxpz/qshsjswzbglxpz.component';
import {SwzbflpzComponent} from '../systemSetting/stpzgl/swzbflpz/swzbflpz.component';
import {XzqhglComponent} from '../systemSetting/sxjczygl/xzqhgl/xzqhgl.component';
import {GczcComponent} from '../systemSetting/sxjczygl/gczc/gczc.component';


import { TestRouterModule } from "./testRouter.module";

const SystemRoutes: Routes = [
    {
        path: '',
        component: SystemComponent,
        children: [
            {
                path: 'stpzgl',
                children: [
                    {path: 'zdkgl', component: ZdkglComponent},
                    {path: 'zdyygl', component: ZdyyglComponent},
                    {path: 'fgczdxpz', component: FgczdxpzComponent},
                    {path: 'swzbtxpz', component: SwzbtxpzComponent},
                    {path: 'qshsjswzbglxpz', component: QshsjswzbglxpzComponent},
                    {path: 'swzbflpz', component: SwzbflpzComponent},
                    {path: '', component: ZdkglComponent},
                ]
            },
            {
                path: 'sxjczygl',
                children: [
                    {path: 'gczc', component: GczcComponent},
                    {path: 'xzqhgl', component: XzqhglComponent},
                ]
            }
        ]
    }

];

@NgModule({
    imports: [

        RouterModule.forChild(SystemRoutes)
    ],
    exports: [
        RouterModule
    ],

})
export class SystemRoutingModule {

}