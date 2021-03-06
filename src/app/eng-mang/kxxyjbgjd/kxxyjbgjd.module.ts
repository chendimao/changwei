import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {PdfViewerModule} from 'ng2-pdf-viewer';

import {
    BreadcrumbModule,
    PanelModule,
    DropdownModule,
    TabViewModule,
    CheckboxModule,
    AccordionModule,
    CalendarModule,
    FileUploadModule,
    PaginatorModule,
    DialogModule,
    SelectButtonModule,
    FieldsetModule,
    DataTableModule,
    SharedModule,
    GrowlModule
} from 'primeng/primeng';
import {ValuChangeService} from "../../service/valuChange.service";

import {UserCommonModule} from '../../common/UserCommon.module';
import {HttpService} from "../../service/http-service";
import {KxxyjbgjdRoutingModule} from './kxxyjbgjd-routing.module';
import {KxxyjbgjdComponent} from './kxxyjbgjd.component';

import {NcymazComponent} from './ghzb/ncymaz/ncymaz.component';
import {GhzbComponent} from './ghzb/ghzb.component';
import {ScazrkComponent} from './ghzb/ncymaz/scazrk/scazrk.component';
import {GyqyclComponent} from './ghzb/gyqycl/gyqycl.component';
import {RoadComponent} from './ghzb/zyxmcl/road/road.component';

import {TzgsComponent} from "./tzgs/tzgs.component";


import {DataProcessingService} from "../../service/dataProcessing.service";


@NgModule({
    declarations: [
        TzgsComponent,
        NcymazComponent,
        GhzbComponent,
        ScazrkComponent,
        KxxyjbgjdComponent,
        GyqyclComponent,
        RoadComponent,


    ],

    imports: [

        PdfViewerModule,
        BreadcrumbModule,
        PanelModule,
        DropdownModule,
        CommonModule,
        UserCommonModule,
        CheckboxModule,
        DataTableModule,
        SharedModule,
        FieldsetModule,
        SelectButtonModule,
        DialogModule,
        PaginatorModule,
        FileUploadModule,
        HttpModule,
        FormsModule,
        TabViewModule,
        GrowlModule,
        AccordionModule,
        CalendarModule,

        RouterModule.forChild(KxxyjbgjdRoutingModule)
    ],
    entryComponents: [],
    providers: [HttpService, ValuChangeService, DataProcessingService],
})
export class KxxyjbgjdModule {
}
