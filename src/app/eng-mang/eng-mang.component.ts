import {Component, OnInit, OnChanges} from '@angular/core';


@Component({
    selector: 'app-kxxyjbgjd',
    template: '<app-eng-mang-nav (childEvent)="getNavValue($event)"></app-eng-mang-nav><div class="fl container"   [style.width]=width><router-outlet></router-outlet></div>',
})
export class EngMangComponent implements OnInit {
    private width;

    ngOnInit() {
        this.width = "calc(100% -  180px)";
    }

    ngOnChanges() {

    }

    getNavValue(e) {
        console.log(e);
        this.width =`calc(100% - ${e}px)`;

    }


}
