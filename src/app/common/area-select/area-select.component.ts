import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HttpService} from "../../service/http-service";
import {SearchService} from "../../service/search.service";

@Component({
    selector: 'app-area-select',
    templateUrl: './area-select.component.html',
    styleUrls: ['./area-select.component.css'],
    providers: [HttpService, SearchService]
})
export class AreaSelectComponent implements OnInit {
    @Input() display;
    @Input() localityCode;
    @Output() childEvent = new EventEmitter<any>();
    private areaList = new Array();
    private nameList = new Array();
    private nameListLe:number;
    private areaObj = new Object();
    private search_areaObj = new Array();

    constructor(private HttpService: HttpService, private Search: SearchService) {
    }

    ngOnInit() {

    }

    ngOnChanges() {
        console.log(this.display);
        console.log(this.localityCode);
        this.nameList = [];
        this.nameListLe=this.nameList.length;
        this.HttpService.get(`/locality/listChildren?localityCode=${this.localityCode}`)
            .then((data) => {
                console.log(data);
                this.areaList = data['returnObject'];
                this.search_areaObj = data['returnObject'];
            })
    }

    selectProvice(name, code, qc): void {
        console.log(name);
        console.log(code);
        let lsObj = {
            "name": name,
            "code": code,
        };
        this.areaObj = {
            "qc": qc,
            'dm': code
        };
        this.HttpService.get(`/locality/listChildren?localityCode=${code}`)
            .then((data) => {
                console.log(data);
                if (data['returnObject'].length == 0) {

                    this.childEvent.emit(this.areaObj)
                } else {
                    this.search_areaObj = data['returnObject'];
                    this.areaList = data['returnObject'];
                }

            })
        this.nameList.push(lsObj);
        this.nameListLe=this.nameList.length;
    }

    searchKey(i) {
        this.areaList = this.Search.searchByRegExp(i, this.search_areaObj, 'localityName');
    }

    confirm() {
        console.log(this.nameListLe);
        this.childEvent.emit(this.areaObj)

    }

    clear() {
        this.childEvent.emit(false);
        this.nameList = [];
        this.HttpService.get(`/locality/listChildren?localityCode=${this.localityCode}`)
            .then((data) => {
                console.log(data);
                this.areaList = data['returnObject'];
                this.search_areaObj = data['returnObject'];

            })

    }
}
