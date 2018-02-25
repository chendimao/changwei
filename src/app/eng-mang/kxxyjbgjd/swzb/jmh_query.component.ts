import {Component, OnInit} from '@angular/core';
import { SelectItem } from "../../../../assets/_primeng@4.2.1@primeng/components/common/selectitem";

@Component({
    selector: 'app-jmhquery',
    templateUrl: './jmh_query.component.html',
    styleUrls: ['./jmh.component.css']
})
export class JmhQueryComponent implements OnInit {

    display: boolean = true;
    types1: SelectItem[];
    types2: SelectItem[];
    isShowDcfw: boolean = false;
    selectList = new Array;

    constructor() {
        this.types1 = [];
        this.types1.push({label: '全部', value: 'all'});
        this.types1.push({label: '是', value: 'yes'});
        this.types1.push({label: '否', value: 'no'});
        this.types2 = [];
        this.types2.push({label: '全部', value: 'all'});
        this.types2.push({label: '是', value: 'yes'});
        this.types2.push({label: '否', value: 'no'});
    }

    showTypeBlock() {
        console.log(1);
        if (this.isShowDcfw) {
            this.isShowDcfw = false;
        } else {
            this.isShowDcfw = true;
        }
    }

    ngOnInit() {
        this.selectList = [
            {label: 'psd', name: 'psd', value: '0'},
            {label: 'psd', name: 'psd', value: '0'},
            {label: 'psd', name: 'psd', value: '0'},
            {label: 'psd', name: 'psd', value: '0'}
        ];
    }


    close() {
        this.display = false;
        console.log(2);
    }

    showtype(): void {
        console.log(1)
    }

    getChildEvent(e) {
        console.log(e);
    }
}
