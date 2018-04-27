import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {GhzbRoutingModule} from "./ghzb-routering.module";
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

    PanelModule, GrowlModule
} from 'primeng/primeng';
import {DataProcessingService} from "../../../service/dataProcessing.service";
import {SearchService} from "../../../service/search.service";
import {UserCommonModule} from '../../../common/UserCommon.module';
import {GhzbTreelistComponent} from "./ghzbjclist.component";
import {GhzbJbxxComponent} from "./zyxmcl/ghzbJbxx.component";
import {GhzbAreaComponent} from "./ghzbArea/ghzbArea.component";
import {GhzbJbxxChildComponent} from "./zyxmcl/children/ghzbJbxxChild.component";
import {DelWaringComponent} from "../../../common/del-waring/del-waring.component";
import {TreeListDataService} from "../../../service/tree-list-data.service";

import {BrowserModule} from "@angular/platform-browser";
import {LoadingBarComponent} from "../../../common/share/loading-bar/loading-bar.component";
import {LoadingBarService} from "../../../common/share/loading-bar/loading-bar.service";


@NgModule({
    declarations: [
        GhzbJbxxComponent,
        GhzbAreaComponent,
        GhzbJbxxChildComponent,
        GhzbTreelistComponent,



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
        ReactiveFormsModule,
        RouterModule.forChild(GhzbRoutingModule)

    ],

    providers: [DataProcessingService, SearchService,TreeListDataService,LoadingBarService,LoadingBarComponent],
    entryComponents:[GhzbJbxxChildComponent, DelWaringComponent]
})
export class GhzbModule {
}
