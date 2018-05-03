import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {
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
    DataTableModule,
    SharedModule,
    PanelModule
} from 'primeng/primeng';
import { ShareService } from "../systemSetting/service/share.service";
import { EngMangHomeComponent } from "./EngMangHome/eng-mang.component";
import {EngMangComponent} from "./eng-mang.component";
import {UserCommonModule} from "../common/UserCommon.module";
import {RouterModule} from '@angular/router';
import {EngMangRoutingModule} from './eng-mang-routing.module';
import {EngMangNavComponent} from './eng-mang-nav/eng-mang-nav.component';
import {ProjectProposalComponent} from './project-proposal/project-proposal.component';
import {EngBaseComponent} from './eng-base/eng-base.component';
import {YsqkComponent} from "./ymazysjd/ysqk/ysqk.component";
import {SearchService} from "../service/search.service";
import {HttpService} from "../service/http-service";
import {ProjectInfoService} from "./service/projectInfo..service";
import {DataProcessingService} from "../service/dataProcessing.service";
import {GrowlModule} from "../../assets/_primeng@4.2.1@primeng/components/growl/growl";


@NgModule({
    declarations: [
        EngMangHomeComponent,
        EngMangComponent,
        EngMangNavComponent,
        EngBaseComponent,
        ProjectProposalComponent,
        YsqkComponent,

    ],

    imports: [
        GrowlModule,
        TreeTableModule,
        PanelModule,
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
        RouterModule.forChild(EngMangRoutingModule)
    ],
    providers: [DataProcessingService,ProjectInfoService,SearchService,HttpService,ShareService],
})
export class EngMangModule {
}
