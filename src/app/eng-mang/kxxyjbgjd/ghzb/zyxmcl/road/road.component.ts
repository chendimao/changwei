import {Component, OnInit} from '@angular/core';

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

    constructor() {
    }

    openModal() {
        this.display1 = true;
    }

    closeModal() {
        this.display1 = false;
    }

    ngOnInit() {
    }

    getEvent(event) {
        this.isShowRight = event;
        this.defaultShow = false;
    }
}
