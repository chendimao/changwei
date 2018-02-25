import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';

import {
    BreadcrumbModule,
    TabViewModule,
    CheckboxModule,
    AccordionModule,
    DropdownModule,
    CalendarModule,
    MenuModule,
    FileUploadModule,
    PaginatorModule,
    DialogModule,
    SelectButtonModule,
    DataTableModule,
    SharedModule,
    ConfirmDialogModule,
    TreeModule,
    GrowlModule
} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {SelectListComponent} from './select-list/select-list.component';
import {HeaderNavComponent} from './header-nav/header-nav.component';
import {TreeListComponent} from "./treeList/tree-list.component";
import {WaringComponent} from './waring/waring.component';
import {SecondNavComponent} from './SecondNav/SecondNav.component';
import {AreaSelectComponent} from './area-select/area-select.component';
import {SurverAreaComponent} from './surver-area/surver-area.component';
import {SafePipe} from "../pipe/sanitizer";
import {PaginatorUserComponent} from "./paginator/paginator.component";
import {SimTableComponent} from '../systemSetting/common/sim-table/sim-table.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {DelWaringComponent} from './del-waring/del-waring.component';


@NgModule({
    declarations: [
        BreadcrumbComponent,
        SafePipe,
        AreaSelectComponent,
        HeaderNavComponent,
        TreeListComponent,
        WaringComponent,
        SecondNavComponent,
        SelectListComponent,
        SurverAreaComponent,
        PaginatorUserComponent,
        SimTableComponent,
        BreadcrumbComponent,
        DelWaringComponent,
    ],
    imports: [
        ConfirmDialogModule,
        DropdownModule,
        TreeModule,

        CommonModule,
        RouterModule,
        CheckboxModule,
        BreadcrumbModule,
        DataTableModule,
        SharedModule,
        MenuModule,
        SelectButtonModule,
        DialogModule,
        PaginatorModule,
        FileUploadModule,
        GrowlModule,
        HttpModule,
        FormsModule,
        TabViewModule,
        AccordionModule,
        CalendarModule,
    ],
    exports: [DelWaringComponent, HeaderNavComponent, WaringComponent, PaginatorUserComponent, TreeListComponent, BreadcrumbComponent, SecondNavComponent, AreaSelectComponent, SelectListComponent, SurverAreaComponent, SafePipe, SimTableComponent],
    providers: [],
})
export class UserCommonModule {
}
