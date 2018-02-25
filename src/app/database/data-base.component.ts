import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
    selector: 'app-query',
    template: `<app-header-nav></app-header-nav><app-database-nav (childEvent)="getChildEvent($event)"></app-database-nav><router-outlet></router-outlet><app-surver-area></app-surver-area>`,
    // template: '<router-outlet></router-outlet>',

})
export class DataBaseComponent implements OnInit {
    private width1: string;
    constructor(private router: Router) {}
    ngOnInit() {
    }
    getChildEvent(info) {
        this.router.navigate(['database/wjdatabase', info]);
    }
}
