import {Component, OnInit} from '@angular/core';

import {DataProcessingService} from "../../../service/dataProcessing.service";
import {HttpService} from "../../../service/http-service";

@Component({
    selector: 'app-tzgs',
    templateUrl: './tzgs.component.html',
    styleUrls: ['./tzgs.component.css']
})
export class TzgsComponent implements OnInit {
    // 加的加载
    isShowRight: boolean = false;
    defaultShow: boolean = true;
    private treelist: any;

    constructor(private HttpService: HttpService, private DataProcessingService: DataProcessingService) {
    }

    ngOnInit() {
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
