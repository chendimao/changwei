import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../service/http-service";
import {DataProcessingService} from "../../../service/dataProcessing.service";
import {DialogModule, MessagesModule, Message, SelectButtonModule, SelectItem, LightboxModule} from 'primeng/primeng';

@Component({
    selector: 'app-ndjh',
    templateUrl: './ndjh.component.html',
    styleUrls: ['./ndjh.component.css']
})
export class NdjhComponent implements OnInit {
    display: boolean = false;
    show: number = 1;
    // 加的加载
    isShowRight: boolean = false;
    defaultShow: boolean = true;
    private treelist: any;
    private breadcrumb: any;

    constructor(private HttpService: HttpService, private DataProcessingService: DataProcessingService) {
    }

    ngOnInit() {
        this.breadcrumb = [
            {label: '首页', routerLink: '/engmang'},
            {label: '实施安置阶段'},
            {label: '年度计划'},
        ];
        this.HttpService.get(`locality/listTree`)
            .then(res => {
                this.treelist = this.DataProcessingService.replaceChildlList(res['returnObject'], 'localityName', 'label', 'childrenLocality', 'children');

            });
    }

    getEvent(event) {
        this.isShowRight = event;
        this.defaultShow = false;
    }

    openModule() {
        this.display = true;
        console.log(1);
    }

    closeModule() {
        this.display = false;
    }

    tabNav(i) {
        this.show = i;
    }

}
