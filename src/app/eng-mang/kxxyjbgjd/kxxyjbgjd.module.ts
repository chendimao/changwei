import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

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
import {TzgsComponent} from "./tzgs/tzgs.component";
import {DataProcessingService} from "../../service/dataProcessing.service";
import {KxxyjbgjdComponent} from "./kxxyjbgjd.component";
@NgModule({
    declarations: [
        TzgsComponent
    ],

    imports: [

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
