import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
    template: `<app-header-nav></app-header-nav><app-report-nav id="nav" (childEvent)="getChildEvent($event)"></app-report-nav><div class="fl container " [ngStyle]="{'width':'calc(100% - '+width1+')'}"><router-outlet></router-outlet></div>`,

})
export class SystemComponent implements OnInit {
    private width1: string;
    constructor() { }

    ngOnInit() {
    }
    getChildEvent(info) {
        console.log(info);
        if (info == '1') {
            this.width1 = '180px';
        } else {
            this.width1 = '50px';
        }
    }

}
