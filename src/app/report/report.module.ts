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
import { ReportRoutingModule } from './report-routing.module';
import { UserCommonModule } from '../common/UserCommon.module';
import {ReportComponent} from './report.component';
import { ReportNavComponent } from './report-nav/report-nav.component';
import { NjgcymazqqgzjdComponent } from './njgcymazqqgzjd/njgcymazqqgzjd.component';

@NgModule({
    declarations: [
        ReportComponent,
        ReportNavComponent,
        NjgcymazqqgzjdComponent,


    ],
    imports: [

        CommonModule,
        UserCommonModule,
        ReportRoutingModule,
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
    ],
    providers: [],
})
export class ReportModule {
}
