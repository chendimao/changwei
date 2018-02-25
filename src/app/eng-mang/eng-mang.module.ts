import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CalcPipe} from "../pipe/calc.pipe";

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


import {EngMangComponent} from "./eng-mang.component";
import {UserCommonModule} from "../common/UserCommon.module";
import {RouterModule} from '@angular/router';
import {EngMangRoutingModule} from './eng-mang-routing.module';
import {EngMangNavComponent} from './eng-mang-nav/eng-mang-nav.component';
import {ProjectProposalComponent} from './project-proposal/project-proposal.component';
import {EngBaseComponent} from './eng-base/eng-base.component';
import {YsqkComponent} from "./ymazysjd/ysqk/ysqk.component";


@NgModule({
    declarations: [
        EngMangComponent,

        EngMangNavComponent,
        EngBaseComponent,
        ProjectProposalComponent,
        YsqkComponent,

    ],

    imports: [
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
    providers: [],
})
export class EngMangModule {
}
