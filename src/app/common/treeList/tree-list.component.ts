import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {HttpService} from "../../service/http-service";


@Component({
    selector: 'app-treeList',
    templateUrl: 'tree-list.component.html',
    styleUrls: ['./tree-list.component.css'],
})
export class TreeListComponent implements OnInit {
    @Input() value;
    @Output() childEvent = new EventEmitter<any>();

    private styleClass: any;
    private qyhfList: any;

    constructor(private HttpService: HttpService) {
    }

    ngOnInit() {
        this.styleClass = "styleClass";
    }

    ngOnChanges() {
        this.qyhfList = this.value;
        console.log(this.value);
    }

    nodeSelect(e) {
        console.log(e);
        this.childEvent.emit(e);
    }

}
