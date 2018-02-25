import {Component, OnInit} from '@angular/core';
import {BreadcrumbModule, MenuItem} from 'primeng/primeng';

@Component({
    selector: 'app-wjdatabase',
    templateUrl: './wjdatabase.component.html',
    styleUrls: ['./wjdatabase.component.css']
})
export class WjdatabaseComponent implements OnInit {
    private items: MenuItem[];

    constructor() {
    }

    ngOnInit() {
        this.items = [
            {label: '返回上一级'},
            {label: '彭村水库'},
        ];
    }

}
