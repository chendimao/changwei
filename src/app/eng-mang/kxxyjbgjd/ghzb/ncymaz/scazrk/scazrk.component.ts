import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../../../service/http-service";
import {DataProcessingService} from "../../../../../service/dataProcessing.service";
import {MenuItem} from "../../../../../../assets/_primeng@4.2.1@primeng/components/common/menuitem";


@Component({
    selector: 'app-scanrk',
    templateUrl: './scazrk.component.html',
    styleUrls: ['./scazrk.component.css']
})
export class ScazrkComponent implements OnInit {
    isShowRight: boolean = false;
    defaultShow: boolean = true;
    private breadcrumb: MenuItem[];
    private treelist: any;

    constructor(private HttpService: HttpService, private DataProcessingService: DataProcessingService) {
    }

    ngOnInit() {
        this.breadcrumb = [
            {label: '首页', routerLink: '/engmang'},
            {label: "可行性研究报告阶段"},
            {label: '规划指标'},
            {label: '农村移民安置'},
            {label: '生产安置人口'}

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

}
