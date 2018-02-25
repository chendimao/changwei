import {Component, OnInit, Input} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
    private home: any;
    private list: MenuItem[];
    @Input() items: MenuItem[];

    ngOnChanges() {
        console.log(this.items);
        this.list = this.items;
        console.log("面包屑页面");
        console.log(this.items);
        this.home = {label: "首页", routerLink: '/'};
    }


    constructor() {
    }

    ngOnInit() {



    }


}
