import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import { HttpService } from "../../service/http-service";
import { DataProcessingService } from "../../service/dataProcessing.service";
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
    SharedModule
} from 'primeng/primeng';
import {UserCommonModule} from '../../common/UserCommon.module';
import { SsazjdRoutingModule } from './ssazjd-routing.module';
import { SsazjdComponent } from './ssazjd.component';
import { SsjdComponent } from './ssdj/ssjd.component';

import { NdjhComponent } from './ndjh/ndjh.component';
import { JdtbComponent } from './ssdj/jdtb/jdtb.component';

import {DlpgzlComponent} from './jdpgzlk/dlpgzl/dlpgzl.component';
import { ZhjlzlComponent } from './jdpgzlk/zhjlzl/zhjlzl.component';
import { KcqlssqkComponent } from "./kcqlssqk/kcqlssqk.component";

@NgModule({
    declarations: [

        SsazjdComponent,
        NdjhComponent,
        SsjdComponent,
        JdtbComponent,
        DlpgzlComponent,
        ZhjlzlComponent,
        KcqlssqkComponent

    ],

    imports: [
        CommonModule,
        UserCommonModule,
        CheckboxModule,
        DataTableModule,
        SharedModule,
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
        RouterModule.forChild(SsazjdRoutingModule)
    ],
    providers: [HttpService,DataProcessingService],
})
export class SsazjdModule {
}
