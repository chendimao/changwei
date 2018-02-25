import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TabViewModule, AccordionModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {PathLocationStrategy, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './common/header/header.component';
import {CalcPipe} from './pipe/calc.pipe';



import {DateTrans} from './pipe/dateTrans.pipe';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {LoadingBarService} from './common/share/loading-bar/loading-bar.service';
import {PopupService} from './common/share/popup/popup.service';
import {CustomHttp} from './common/share/customHttp';
import {ProviderHttp} from "./common/share/customHttp";
import {LoadingBarComponent} from './common/share/loading-bar/loading-bar.component';
import {PopupComponent} from './common/share/popup/popup.component';


import {UserComponent} from './user/user.component';
import {EngMangHomeComponent} from './EngMangHome/eng-mang.component';
import {LoginComponent} from './login/login.component';
import {UserCommonModule} from './common/UserCommon.module';



@NgModule({
    declarations: [

        DateTrans,
        CalcPipe,

        AppComponent,
        HeaderComponent,
        UserComponent,
        EngMangHomeComponent,
        LoginComponent,
        LoadingBarComponent,
        PopupComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        UserCommonModule,
        FormsModule,
        AppRoutingModule,
        TabViewModule,
        AccordionModule
    ],
    providers:
        [
            LoadingBarService,
            PopupService,
            {
                provide: Http,
                useFactory: ProviderHttp,
                deps: [XHRBackend, RequestOptions, LoadingBarService, PopupService]
            }
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
