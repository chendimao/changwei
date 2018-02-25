import {Component, OnInit} from '@angular/core';
import {BreadcrumbModule, MenuItem} from 'primeng/primeng';

@Component({
    selector: 'app-wjdatabase',
    templateUrl: './wjdatabase.component.html',
    styleUrls: ['./wjdatabase.component.css']
})
export class WjdatabaseComponent implements OnInit {
    private items: MenuItem[];
    private data: any;
    public obj: object = {
        id:'1',
        name:'chen'
}
    constructor() {
    }

    ngOnInit() {

        this.items = [
            {label: '返回上一级'},
            {label: '彭村水库'},
        ];

        this.data = [{'id':1},{}]
    }


    test(){

    }

}
