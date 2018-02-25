import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-kpi-report',
    template: `<app-header-nav></app-header-nav><iframe width="100%" height="100%" [src]="url | safe:'resourceUrl'" style="padding-bottom: 100px"></iframe>`,

})
export class KpiReportComponent implements OnInit {
    private url: string ;

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.url = 'assets/FJ';
    }

}
