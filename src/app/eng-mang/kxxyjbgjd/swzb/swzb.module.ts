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
import {SwzbRoutingModule} from "./swzb-routering.module";

import {ValuChangeService} from "../../../service/valuChange.service";
import {CardReformPipe} from "../../../pipe/card-reform.pipe";
import {UserCommonModule} from '../../../common/UserCommon.module';
import {HttpService} from "../../../service/http-service";
import {JmhComponent} from "./jmh.component";
import {DataProcessingService} from "../../../service/dataProcessing.service";

import {SwzbPersonComponent} from "./children/swzb-person.component";

import {JmhQueryComponent} from "./jmh_query.component";
import {JmhFjViewComponent} from "./jmh_fj_view.component";
import {JmhMangComponent} from "./jmh_fj_mang.component";
import {JmhfjmangsecComponent} from "./jmh_fj_mangsec.component";


import {DecorationComponent} from "./children/list/decoration/decoration.component";
import {FsssComponent} from './children/list/fsss/fsss.component';
import {GraveComponent} from './children/list/grave/grave.component';
import {HousesComponent} from './children/list/houses/houses.component';
import {LandComponent} from './children/list/land/land.component';
import {LandOtherComponent} from './children/list/land-other/land-other.component';
import {PersonComponent} from "./children/list/person/person.component";
import {TreesComponent} from './children/list/trees/trees.component';
import {WaterComponent} from './children/list/water/water.component';

import {QsrComponent} from './children/list/qsr/qsr.component';
import {JtgsjbxqComponent} from './children/list/jtgsjbxq/jtgsjbxq.component';
import {ShebeiComponent} from './children/list/shebei/shebei.component';
import {SheshiComponent} from './children/list/sheshi/sheshi.component';
import {NfyssjbqkComponent} from './children/list/nfyssjbqk/nfyssjbqk.component';
import {FyssComponent} from './children/list/fyss/fyss.component';
import {DwqbqkComponent} from './children/list/dwqbqk/dwqbqk.component';
import {GykqyxqComponent} from './children/list/gykqyxq/gykqyxq.component';
import {TljbxxComponent} from './children/list/tljbxx/tljbxx.component';
import {GljbxxComponent} from './children/list/gljbxx/gljbxx.component';
import {QhjbxxComponent} from './children/list/qhjbxx/qhjbxx.component';
import {HdjbxxComponent} from './children/list/hdjbxx/hdjbxx.component';
import {GkjbxxComponent} from './children/list/gkjbxx/gkjbxx.component';
import {MtjbxxComponent} from './children/list/mtjbxx/mtjbxx.component';
import {SbdgcjbxxComponent} from './children/list/sbdgcjbxx/sbdgcjbxx.component';
import {DxgcjbxxComponent} from './children/list/dxgcjbxx/dxgcjbxx.component';
import {GbdsjbxxComponent} from './children/list/gbdsjbxx/gbdsjbxx.component';
import {GdgcjbxxComponent} from './children/list/gdgcjbxx/gdgcjbxx.component';
import {SlsdgcjbxxComponent} from './children/list/slsdgcjbxx/slsdgcjbxx.component';
import {KczyjbxxComponent} from './children/list/kczyjbxx/kczyjbxx.component';
import {WwgjjbxxComponent} from './children/list/wwgjjbxx/wwgjjbxx.component';
import {SwqxzjbxxComponent} from './children/list/swqxzjbxx/swqxzjbxx.component';
import {QtzxjbxxComponent} from './children/list/qtzxjbxx/qtzxjbxx.component';


@NgModule({
    declarations: [
        CardReformPipe,
        JmhComponent,
        SwzbPersonComponent,
        DecorationComponent,
        FsssComponent,
        GraveComponent,
        HousesComponent,
        LandComponent,
        LandOtherComponent,
        PersonComponent,
        TreesComponent,
        WaterComponent,
        JmhFjViewComponent,
        JmhQueryComponent,
        JmhMangComponent,
        JmhfjmangsecComponent,

        QsrComponent,
        JtgsjbxqComponent,
        ShebeiComponent,
        SheshiComponent,
        NfyssjbqkComponent,
        FyssComponent,
        DwqbqkComponent,
        GykqyxqComponent,
        TljbxxComponent,
        GljbxxComponent,
        QhjbxxComponent,
        HdjbxxComponent,
        GkjbxxComponent,
        MtjbxxComponent,
        SbdgcjbxxComponent,
        DxgcjbxxComponent,
        GbdsjbxxComponent,
        GdgcjbxxComponent,
        SlsdgcjbxxComponent,
        KczyjbxxComponent,
        WwgjjbxxComponent,
        SwqxzjbxxComponent,
        QtzxjbxxComponent,

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
        RouterModule.forChild(SwzbRoutingModule)
    ],
    entryComponents: [JmhQueryComponent, JmhfjmangsecComponent, JmhFjViewComponent, JmhMangComponent, SwzbPersonComponent,
        HousesComponent, PersonComponent, WaterComponent, TreesComponent, DecorationComponent,
        FsssComponent, GraveComponent, LandComponent, LandOtherComponent, QsrComponent, JtgsjbxqComponent,
        ShebeiComponent, SheshiComponent, NfyssjbqkComponent, FyssComponent, DwqbqkComponent,
        GykqyxqComponent, TljbxxComponent, GljbxxComponent, QhjbxxComponent, HdjbxxComponent,
        GkjbxxComponent, MtjbxxComponent, SbdgcjbxxComponent, DxgcjbxxComponent, GbdsjbxxComponent,
        GdgcjbxxComponent, SlsdgcjbxxComponent, KczyjbxxComponent, WwgjjbxxComponent, SwqxzjbxxComponent,
        QtzxjbxxComponent

    ],
    providers: [HttpService, ValuChangeService, DataProcessingService],
})
export class SwzbModule {
}
