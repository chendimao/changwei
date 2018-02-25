import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HttpService} from "../../../service/http-service";
import {SearchService} from "../../../service/search.service";

@Component({
    selector: 'app-gc-list',
    templateUrl: './gc-list.component.html',
    styleUrls: ['./gc-list.component.css'],
    providers: [SearchService]
})
export class GcListComponent implements OnInit {
    @Input() class;
    @Input() type;
    @Input() value;
    @Output() selectProject = new EventEmitter;
    gcList: any;
    private classSel: any;

    constructor(private HttpService: HttpService, private SearchService: SearchService) {
    }

    ngOnInit() {
        console.log(this.value);
        console.log(this.type);
        this.HttpService.get(this.value)
            .then(res => {
                console.log(res['returnObject']);
                this.gcList = res['returnObject'];
            })
    }

    searchList(value) {
        if (this.type == 'gc') {
            let list = this.SearchService.searchByRegExp(value, this.gcList, 'name');
            this.gcList = list;
        } else {
            let list = this.SearchService.searchByRegExp(value, this.gcList, 'mc');
            this.gcList = list;
        }


        if (value == "") {
            this.HttpService.get(this.value)
                .then(res => {
                    console.log(res['returnObject']);
                    this.gcList = res['returnObject'];
                })
        }
    }

    onselect(i) {
        this.classSel = i;
        console.log(i);
        this.selectProject.emit(i);
    }
}
