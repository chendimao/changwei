import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../../../service/http-service";
import {DataProcessingService} from "../../../../../service/dataProcessing.service";

@Component({
    selector: 'app-road',
    templateUrl: './road.component.html',
    styleUrls: ['./road.component.css']
})
export class RoadComponent implements OnInit {
    // 加的加载
    isShowRight: boolean = false;
    defaultShow: boolean = true;

    display1: boolean = false;
    private treelist: any;

    constructor(private HttpService: HttpService, private DataProcessingService: DataProcessingService) {
    }

    openModal() {
        this.display1 = true;
    }

    closeModal() {
        this.display1 = false;
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
