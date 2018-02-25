import { Component, OnInit } from '@angular/core';
import {SelectItem, DataTableModule, SharedModule, LazyLoadEvent, FilterMetadata} from 'primeng/primeng';
@Component({
  selector: 'app-grave',
  templateUrl: './grave.component.html',
  styleUrls: ['../children.css']
})
export class GraveComponent implements OnInit {
    types: SelectItem[];
    public selectedType: string;
    types1: SelectItem[];
    public selectedType1: string;
    types2: SelectItem[];
    public selectedType2: string;
    types3: SelectItem[];
    public selectedType3: string;
    types4: SelectItem[];
    public selectedType4: string;
    types5: SelectItem[];
    public selectedType5: string;
    private xiangqing: boolean = true;
    private liebiao: boolean = false;
    private ch;
    private isShowArea: boolean = false;
    area: string;

// 表单组件
//     cars: Car[];
//
//     frozenCars: Car[];
//
//     carsLarge: Car[];
//
//     totalRecords: number;
//
//     sales: any[];
//     loading: boolean;


    constructor() {
        this.types = [];
        this.types.push({label: '详情视图', value: '1'});
        this.types.push({label: '列表视图', value: '2'});
        this.types1 = [];
        this.types1.push({label: '农业', value: '1'});
        this.types1.push({label: '非农业', value: '2'});
        this.types2 = [];
        this.types2.push({label: '男', value: '1'});
        this.types2.push({label: '女', value: '2'});
        this.types3 = [];
        this.types3.push({label: '已婚', value: '1'});
        this.types3.push({label: '未婚', value: '2'});
        this.types4 = [];
        this.types4.push({label: '是', value: '1'});
        this.types4.push({label: '否', value: '2'});
        this.types5 = [];
        this.types5.push({label: '是', value: '1'});
        this.types5.push({label: '否', value: '2'});
    }

    ngOnInit() {
        this.selectedType = '1';
        this.selectedType1 = '1';
        this.selectedType2 = '1';
        this.selectedType3 = '1';
        this.selectedType4 = '1';
        this.selectedType5 = '1';
        this.area = '福建省泉州市安溪县白濑乡长基村';
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


    }

    selectedTypea(): void {
    }

    selectedTypea1(): void {
    }

    selectedTypea2(): void {
    }

    selectedTypea3(): void {
        console.log(this.selectedType);
    }

    selectedTypea4(): void {
        console.log(this.selectedType);
    }

    selectedTypea5(): void {
        console.log(this.selectedType);
    }


    showAreaBlock(): void {

        if (this.isShowArea) {
            this.isShowArea = false;
            console.log(this.isShowArea);
        } else {
            this.isShowArea = true;
            console.log(this.isShowArea);
        }

    }

    getChildEvent(index) {
        this.area = index;
    }


}