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
    SharedModule
} from 'primeng/primeng';


import {QueryRoutingModule} from './query-routing.module';
import {QueryNavComponent} from './query-nav/query-nav.component';
import { UserCommonModule } from '../common/UserCommon.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './swzb/ncbf/home/home.component';
import { HttpService } from "../service/http-service";

@NgModule({
    declarations: [
        QueryNavComponent,
        HomeComponent
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
        RouterModule.forChild(QueryRoutingModule)

    ],

    providers: [HttpService],
})
export class QueryModule {
}
