import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { HttpService } from "../../../service/http-service";

@Component({
    selector: 'app-sim-table',
    templateUrl: './sim-table.component.html',
    styleUrls: ['./sim-table.component.css'],
})
export class SimTableComponent implements OnInit {
    tableInfo: any;
    head: any;
    private listName: string;
    private swtichBtn: string;
    @Input() value;
    @Output() selectName = new EventEmitter;

    constructor(private HttpService: HttpService) {
    }

    ngOnInit() {
        console.log(this.value);

        if (this.value == 'bm') {
            this.head = {
                name: "表名",
                dec: '描述',
            };
            this.swtichBtn="1";
            this.listName = "list.tableName";

            this.HttpService.get('/zdyy/getTableList')
                .then(res => {
                    this.tableInfo = res['returnObject'];

                });
        } else {
            this.head = {
                name: "字段名",
                dec: '描述',
            };
            this.HttpService.get('/zdyy/getTableColumnsList?tableName=' + this.value)
                .then(res => {
                    this.tableInfo = res['returnObject'];
                    console.log(this.tableInfo);
                });
            console.log(this.value);
        }


    }

    selectItem(value) {
        if(this.swtichBtn=='1'){
            this.selectName.emit(value.tableName);
        }else{
            this.selectName.emit(value.columnName);
        }

    }

}
