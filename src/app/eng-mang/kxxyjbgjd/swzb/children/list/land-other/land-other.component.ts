import { Component, OnInit } from '@angular/core';
import {SelectItem,CheckboxModule, DataTableModule, SharedModule, LazyLoadEvent, FilterMetadata} from 'primeng/primeng';
@Component({
  selector: 'app-land-other',
  templateUrl: './land-other.component.html',
  styleUrls: ['../children.css']
})
export class LandOtherComponent implements OnInit {
    moreText:string="显示更多内容";
    moreInput:boolean=false;
    types: SelectItem[];
    public selectedType: string;
    types2: SelectItem[];
    public selectedType2: string;
    types3: SelectItem[];
    public selectedType3: string;
    private num1:any;
    private num2:any;
    private num:any;
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
        this.selectedType3='1';
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
    selectedTypea(){

    }
    calc(num){
        // let Num=num.split("=");

        let dengyu = num.indexOf('=');
        if(dengyu!=-1){
            console.log('开启计算器模式');
            let num1=num.split('=');
            this.num1=eval(num1[1]);


        }else{
            console.log('不开启');
        }
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
    selectedTypea3(): void {
        console.log('aaaaaaa');
        this.showTable = this.selectedType3;
    }

}
