import {Component, OnInit} from '@angular/core';

import {HttpService} from "../../../../service/http-service";
import {DataProcessingService} from "../../../../service/dataProcessing.service";
import {ActivatedRoute} from '@angular/router';
import {SearchService} from "../../../../service/search.service";

@Component({
    selector: 'app-ghzbArea',
    templateUrl: './ghzbArea.component.html',
    styleUrls: ['./ghzbArea.component.css']
})
export class GhzbAreaComponent implements OnInit {
    isShowRight: boolean = false;
    defaultShow: boolean = true;
    private breadcrumb: any;
    private treelist: any;
    private getParem: any;
    private secNav: string;
    public dataList :any;
    constructor(private SearchService: SearchService, private router: ActivatedRoute, private HttpService: HttpService, private DataProcessingService: DataProcessingService) {
        this.router.params.subscribe(res => {
            this.dataList = res['res'];
        })
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
