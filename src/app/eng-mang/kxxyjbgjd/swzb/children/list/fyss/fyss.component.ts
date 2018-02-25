

import {Component, OnInit} from '@angular/core';
import {SelectItem, DataTableModule, SharedModule, LazyLoadEvent, FilterMetadata} from 'primeng/primeng';

@Component({
    selector: 'app-fyss',
    templateUrl: './fyss.component.html',
    styleUrls: ['../children.css']
})
export class FyssComponent implements OnInit {
    moreText: string = "显示更多内容";
    selectPersonList: SelectItem[];
    selectedCity2:string;
    moreInput: boolean = false;
    types: SelectItem[];
    public selectedType: string;
    types2: SelectItem[];
    public selectedType2: string;
    types3: SelectItem[];
    public selectedType3: string;
    private num1: any;
    private houesList: Array<any>;
    private num2: any;
    private num: any;
    private isShowArea: boolean = false;
    showTable: any = 1;
    private ch;

    constructor() {
        this.types = [];
        this.types.push({label: '是', value: '1'});
        this.types.push({label: '否', value: '2'});
        this.types2 = [];
        this.types2.push({label: '是', value: '1'});
        this.types2.push({label: '否', value: '2'});
        this.types3 = [];
        this.types3.push({label: '分类汇总', value: '1'});
        this.types3.push({label: '规格明细', value: '2'});
        this.houesList = [
            {
                'name': '蔡国成'
            },
            {
                'name': '白应福'
            }
        ];
        this.selectPersonList = [
            {label: '蔡国成', value: {id: 1, name: '蔡国成', code: 'NY'}},
            {label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}},
            {label: 'London', value: {id: 3, name: 'London', code: 'LDN'}},
            {label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}},
            {label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}}
        ];


    }

    ngOnInit() {

        this.ch = {
            firstDayOfWeek: 0,
            dayNames: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesShort: ['天', '一', '二', '三', '四', '五', '六'],
            dayNamesMin: ['天', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
            today: '今天',
            clear: '清除',
        };
        this.selectedType3 = '1';
        this.selectedType = '1';
        this.selectedType2 = '1';
    }

    showMoreInput() {

        if (this.moreInput) {
            this.moreInput = false;
            this.moreText = "显示更多内容"
        } else {
            this.moreInput = true;
            this.moreText = "隐藏更多内容"
        }
    }

    selectedTypea() {

    }

    //增加房子
    addHouses() {
        this.houesList.push({'name': ''})
    }


    calc(num) {
        let dengyu = num.indexOf('=');
        if (dengyu != -1) {
            console.log('开启计算器模式');
            let num1 = num.split('=');
            this.num1 = eval(num1[1]);
        } else {
            console.log('不开启');
        }
    }

    showAreaBlock(): void {
        if (this.isShowArea) {
            this.isShowArea = false;
        } else {
            this.isShowArea = true;
        }

    }

    selectedTypea3(): void {
        this.showTable = this.selectedType3;
    }


}

interface ListPerson {
    name: string,
    code: string
}
