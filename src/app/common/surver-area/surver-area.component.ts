import {Component, OnInit, ElementRef, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-surver-area',
    templateUrl: './surver-area.component.html',
    styleUrls: ['./surver-area.component.css']
})
export class SurverAreaComponent implements OnInit {
    @Input() values;
    @Input() isShow;
    @Output() childEvent = new EventEmitter<any>();

    private list;

    constructor() {
    }

    ngOnInit(){

    }



    ngOnChanges() {
        console.log(this.values);
        this.list = this.values;
    }

    getDcfwId(e) {
        console.log(e);
        this.childEvent.emit(e);
    }


}

