import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpService} from "../service/http-service";
import {DataProcessingService} from "../service/dataProcessing.service";
import {ShareService} from "./service/share.service";
import {
    ConfirmDialogModule,
    SidebarModule,
    TreeTableModule,
    TabViewModule,
    CheckboxModule,
    AccordionModule,
    CalendarModule,
    FileUploadModule,
    PaginatorModule,
    DialogModule,
    SelectButtonModule,
    LightboxModule,
    PickListModule,
    DataTableModule,
    GrowlModule,
    SharedModule
} from 'primeng/primeng';
import {JldwlistPipe} from "../pipe/jldwlist.pipe";

import {UserCommonModule} from '../common/UserCommon.module';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import {SystemNavComponent} from './system-nav/system-nav.component';
import {ZdkglComponent} from './stpzgl/zdkgl/zdkgl.component';
import {ZdyyglComponent} from './stpzgl/zdyygl/zdyygl.component';
import {FgczdxpzComponent} from './stpzgl/fgczdxpz/fgczdxpz.component';
import {SwzbtxpzComponent} from './stpzgl/swzbtxpz/swzbtxpz.component';
import {QshsjswzbglxpzComponent} from './stpzgl/qshsjswzbglxpz/qshsjswzbglxpz.component';
import {SwzbflpzComponent} from './stpzgl/swzbflpz/swzbflpz.component';
import {XzqhglComponent} from './sxjczygl/xzqhgl/xzqhgl.component';
import {GczcComponent} from './sxjczygl/gczc/gczc.component';

import {FgczdxpzxqComponent} from './stpzgl/fgczdxpz/fgczdxpzxq.component';
import {BddsjlbComponent} from "./common/bddsjlb/bddsjlb.component";
import {GcListComponent} from "./common/gc-list/gc-list.component";
import {XzqhglxqComponent} from "./sxjczygl/xzqhgl/xzqhglxq.component";
import {SwzbflpzxqComponent} from "./stpzgl/swzbflpz/swzbflpzxq.component";
import {ZdkglxqComponent} from "./stpzgl/zdkgl/zdkglxq.component";
import {ZdyyglxqComponent} from "./stpzgl/zdyygl/zdyyglxq.component";
import {GczcxqComponent} from "./sxjczygl/gczc/gczcxq.component";
import {ZdkglsjxpzComponent} from "./stpzgl/zdkgl/zdkglsjxpz.component";
import {DelWaringComponent} from "../common/del-waring/del-waring.component";
import {ZdkglsjxpzxqComponent} from "./stpzgl/zdkgl/zdkglsjxpzxq.component";
import {SaveService} from "./service/save.service";

@NgModule({
    declarations: [
        JldwlistPipe,
        ZdkglsjxpzxqComponent,
        SystemComponent,
        SystemNavComponent,
        ZdkglComponent,
        ZdyyglComponent,
        FgczdxpzComponent,
        SwzbtxpzComponent,
        QshsjswzbglxpzComponent,
        SwzbflpzComponent,
        XzqhglComponent,
        GczcComponent,
        ZdkglsjxpzComponent,
        FgczdxpzxqComponent,
        GcListComponent,
        XzqhglxqComponent,
        ZdyyglxqComponent,
        SwzbflpzxqComponent,
        ZdkglxqComponent,
        BddsjlbComponent,
        GczcxqComponent


    ],
    imports: [
        SidebarModule,
        TreeTableModule,
        SharedModule,
        PickListModule,
        CommonModule,
        UserCommonModule,
        SystemRoutingModule,
        ConfirmDialogModule,
        CheckboxModule,
        DataTableModule,
        SharedModule,
        GrowlModule,
        LightboxModule,
        SelectButtonModule,
        DialogModule,
        PaginatorModule,
        FileUploadModule,
        HttpModule,
        FormsModule,
        TabViewModule,
        AccordionModule,
        CalendarModule,
    ],
    providers: [JldwlistPipe,HttpService, DataProcessingService, ShareService, SaveService],
    entryComponents: [ZdkglsjxpzxqComponent, DelWaringComponent, ZdkglsjxpzComponent, FgczdxpzxqComponent, XzqhglxqComponent, SwzbflpzxqComponent, ZdkglxqComponent, ZdyyglxqComponent, GczcxqComponent]
})
export class SystemModule {
}
