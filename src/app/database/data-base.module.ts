import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {
    TabViewModule,
    CheckboxModule,
    AccordionModule,
    CalendarModule,
    FileUploadModule,
    PaginatorModule,
    DialogModule,
    SelectButtonModule,
    LightboxModule,
    DataTableModule,
    SharedModule,
    BreadcrumbModule,
    MenuItem
} from 'primeng/primeng';

import { UserCommonModule } from '../common/UserCommon.module';
import { DataBaseRoutingModule } from "./data-base-routing.module";
import {DataBaseComponent} from './data-base.component';
import {WjdatabaseComponent} from './wjdatabase/wjdatabase.component';
import { DatabaseNavComponent } from './database-nav/database-nav.component';
import { SsjhComponent } from './ssjh/ssjh.component';
import {ShareService} from "../systemSetting/service/share.service";

@NgModule({
    imports: [
        UserCommonModule,
        CommonModule,
        DataBaseRoutingModule,
        FormsModule,
        HttpModule,
        TabViewModule,
        CheckboxModule,
        AccordionModule,
        CalendarModule,
        FileUploadModule,
        PaginatorModule,
        DialogModule,
        SelectButtonModule,
        LightboxModule,
        DataTableModule,
        SharedModule,
        BreadcrumbModule,
    ],
    declarations: [
        DataBaseComponent,
        WjdatabaseComponent,
        DatabaseNavComponent,
        SsjhComponent,

    ],
    providers: [
        ShareService
    ]
})
export class DataBaseModule {
}
