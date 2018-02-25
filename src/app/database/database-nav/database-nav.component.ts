import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-database-nav',
    templateUrl: './database-nav.component.html',
    styleUrls: ['./database-nav.component.css']
})
export class DatabaseNavComponent implements OnInit {
    @Output() childEvent = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    show(i) {
        this.childEvent.emit(i);
        console.log(i);
    }

}
