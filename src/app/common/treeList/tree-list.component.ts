import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {HttpService} from "../../service/http-service";


@Component({
    selector: 'app-treeList',
    template: '<div class="nav fl"><p-tree  children="listZdk" [value]="qyhfList" class="{{styleClass}}" selectionMode="single" [(selection)]="selectedFile" (onNodeSelect)="nodeSelect(selectedFile)"></p-tree></div>',
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
        console.log(this.value);
        // console.log(this.value.key, this.value.id, this.value.url);
        // console.log(`${this.value.url}?${this.value.key}=${this.value.id}`);

        // this.HttpService.get(`${this.value.url}?${this.value.key}=${this.value.id}`)
        //     .then(res => {
        //         console.log(res['returnObject']);
        // let resList = res['returnObject'];
        // resList = JSON.stringify(resList);
        // let list = resList.replace(/localityName/g, 'label');
        // list = list.replace(/childrenLocality/g, "children");
        // this.qyhfList = JSON.parse('[' + list + ']');
        // });

        // this.HttpService.get('locality/listTree')
        //     .then(res => {
        //         console.log(res);
        //         let resList = res['returnObject'];
        //         resList = JSON.stringify(resList);
        //         let list = resList.replace(/localityName/g, 'label');
        //         list = list.replace(/childrenLocality/g, "children");
        //         this.qyhfList = JSON.parse('[' + list + ']');
        //     });
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
