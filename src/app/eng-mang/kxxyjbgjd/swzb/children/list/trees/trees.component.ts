import { Component, OnInit } from '@angular/core';
import {SelectItem,CheckboxModule, DataTableModule, SharedModule, LazyLoadEvent, FilterMetadata} from 'primeng/primeng';
import {HttpService} from "../../../../../../service/http-service";
import construct = Reflect.construct;
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {Message} from "../../../../../../../assets/_primeng@4.2.1@primeng/components/common/message";
@Component({
  selector: 'app-trees',
  templateUrl: './trees.component.html',
  styleUrls: ['../children.css']
})
export class TreesComponent implements OnInit {
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
    public num:any;
    public isShowArea: boolean = false;
    public ch;
    public childInfo;
    public childInfo2;
    public data;
    public datalist: Array<TreesData>;
    public name_active_data: any; //选中样式
    public name_active_base: any; //选中样式
    public selectPersonList=new Array(); //新增下拉列表
    public displaySelectPserson:boolean = false; //显示隐藏新增人员下拉列表
    msgs: Message[] = [];
    public ssxzqh:any; //所属行政区化
    public zydl:any; //专业大类
    public dcfw:any; //调查范围

    showTable: any = 1;
    constructor(public HttpService: HttpService, public DataProcessing: DataProcessingService) {
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


         this.name_active_data = [ new TreesData('','','','','','','','','','','','','','','',0,'','','','','','','','','','','','') ];

         //根据居民户查询，但是没有数据，所以暂时写死
        //const params = `jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=${this.childInfo.ssgcdm}&xzqhdm=${this.childInfo.ssxzqhdm}&jmhId=${this.childInfo.id}&zblId=2F0E8D93C2B74B2AA569A961F951741D`;
        //   const params = 'jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=S000001&xzqhdm=350526000000000&jmhId=7BCD3BE587394F4D969D3B0CC6225E95&zblId=2F0E8D93C2B74B2AA569A961F951741D';
        // this.HttpService.get('lxgm/list?'+params).then((data)=>{
        //
        //
        //
        //
        //
        // });

        if(this.data['returnObject']['datalist'][0]){

            this.datalist = this.data['returnObject']['datalist'];
            this.name_active_data = this.datalist[0];
            this.name_active_base = JSON.parse(JSON.stringify(this.name_active_data['list']));

        }else{
            this.name_active_data = '';
            this.name_active_base = '';
        }



        //人口数据,接口数据太少暂时使用假数据

        var PersonList = Array();

        //this.selectPersonList = [{label:'test1',value:{name:'test1',id:'1'}},{label:'test2',value:{name:'test2',id:'2'}},{label:'test3',value:{name:'test3',id:'3'}}];

        this.selectPersonList = [
            {label:'选择人员', value:null},
            {label:'人员1', value:{id:1, name: '人员1', code: 'NY'}},
            {label:'人员2', value:{id:2, name: '人员2', code: 'RM'}},
            {label:'人员3', value:{id:3, name: '人员3', code: 'LDN'}},
            {label:'人员4', value:{id:4, name: '人员4', code: 'IST'}},
            {label:'人员5', value:{id:5, name: '人员5', code: 'PRS'}}
        ];











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


        // //下拉列表接口请求
        // //所属行政区划
        // this.HttpService.get('zdk/getZdkByTableAndColumn?tableName=B_HJBXX&column=ZYDLDM&gcdm=xxxx&xzqhdm=xxx').then((data)=>{
        //
        //     this.ssxzqh = data;
        //
        //
        // });
        //
        //
        // //专业大类
        // this.HttpService.get('zdk/getZdkByTableAndColumn?tableName=B_HJBXX&column=ZYDLDM&gcdm=xxxx&xzqhdm=xxx').then((data)=>{
        //
        //     this.zydl = data;
        //
        //
        // });
        //
        // //调查范围
        // this.HttpService.get('zdk/getZdkByTableAndColumn?tableName=B_HJBXX&column=DCFWDM&gcdm=xxxx&xzqhdm=xxx').then((data)=>{
        //
        //     this.dcfw = data;
        //
        //
        // });


    }
    //选择name改变样式
    selectNmae(name){
        console.log(name);
        this.name_active_data = name;
        this.name_active_base = JSON.parse(JSON.stringify(this.name_active_data['list']));

        //转换数据格式
        this.name_active_base.forEach((value,index,arr)=>{
            this.name_active_base[index] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(value,'childList','children','',''));

        });


        console.log(this.name_active_base);
    }


    //新增人员
    getChildEvent1(event){

        this.displaySelectPserson = false;

        if(this.datalist.length>0){
            this.datalist.push(new TreesData('','','','','','','','','','','','','','','',0,'','','','','','','','',event.name,'','',''));
            this.name_active_data = this.datalist[this.datalist.length-1];

        }else{
            this.datalist[0] = (new TreesData('','','','','','','','','','','','','','','',0,'','','','','','','','',event.name,'','',''));
            this.name_active_data = this.datalist[0];

        }


        this.name_active_data['list'] = this.data['returnObject']['baseList'];
        this.name_active_base = JSON.parse(JSON.stringify(this.name_active_data['list']));

        //转换数据格式
        this.name_active_base.forEach((value,index,arr)=>{
            this.name_active_base[index] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(value,'childList','children','',''));

        });



    }

    //删除人员
    deleteSlect(){
        this.datalist.forEach((value,index,arr)=>{
            if(value.qsrId == this.name_active_data.qsrId){
               arr.splice(index,1);
            }
        });
        console.log(this.datalist);
        if(this.datalist.length >0){
            this.name_active_data = this.datalist[0];
        }else{
            this.name_active_data = null;
            this.name_active_base = null;
        }

        this.msgs = [];
        this.msgs.push({severity: 'error', summary: '删除提醒', detail: '删除成功'});
        console.log(this.datalist);
    }

    //显示新增人员下拉列表
    displaySlect(){
        this.displaySelectPserson = true;

    }

    // //转换数据格式
    // TransData(arr){
    //     //转换数据格式
    //     arr.forEach((value,index,arr)=>{
    //         this.name_active_base[index] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(value,'childList','children','',''));
    //
    //     });
    //
    //     return this.name_active_base;
    // }

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
            if(this.name_active_data.sfxw == 0){
                this.name_active_data.sfxw == 1;
            }else {
                this.name_active_data.sfxw == 0;
            }
            console.log(this.name_active_data.sfxw);
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

        this.showTable = this.selectedType3;
    }
}


//
export class DataList{
    constructor(
        public datalist:Array<TreesData>,
        public baselist:any
    ){

    }
}

//基本信息
export class TreesData{
    constructor(
        public start: any,
        public limit: any,
        public orderCol:any,
        public orderType:any,
        public sql:any,
        public searchKey:any,
        public id:any,
        public ssxtdm:any,
        public ssgcdm:any,
        public qsrId:any,
        public jddm:any,
        public swszxzqhdm:any,
        public zydldm:any,
        public dcfwdm:any,
        public sl:any,
        public sfxw:any,
        public szgc:any,
        public tfh:any,
        public tbh:any,
        public dclsh:any,
        public dmbh:any,
        public bz:any,
        public cjsj:any,
        public zhgxsj:any,
        public qsrmc:any = '',
        public sfzh:any,
        public localitydesc:any,
        public zydlmc:any
    ){

    }
}

//基本信息
export class TreesBase{
    constructor(
        public bz: any,
        public cjsj: any,
        public dcfwdm:any,
        public dclsh:any,
        public dmbh:any,
        public id:any,
        public jddm:any,
        public limit:any,
        public localitydesc:any,
        public orderCol:any,
        public orderType:any,
        public qsrId:any,
        public qsrmc:any,
        public searchKey:any,
        public sfxw:any,
        public sfzh:any,
        public sl:any,
        public sql:any,
        public ssgcdm:any,
        public ssxtdm:any,
        public start:any,
        public swszxzqhdm:any,
        public szgc:any,
        public tbh:any,
        public tfh:any = '',
        public zhgxsj:any,
        public zydldm:any,
        public zydlmc:any
    ){

    }
}