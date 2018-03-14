import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {
    SelectItem,
    CheckboxModule,
    DataTableModule,
    SharedModule,
    LazyLoadEvent,
    FilterMetadata
} from 'primeng/primeng';
import {Message} from "../../../../../../../assets/_primeng@4.2.1@primeng/components/common/message";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {NgForm} from "@angular/forms";
import {HttpService} from "../../../../../../service/http-service";
import {SelectListHttpService} from "../../../../../../service/select-list-http.service";
import {ValuChangeService} from "../../../../../../service/valuChange.service";
import {InputChangeService} from "../../../../../../service/input-change.service";
import {TreesData} from "../trees/trees.component";

@Component({
    selector: 'app-land',
    templateUrl: './land.component.html',
    styleUrls: ['../children.css']
})
export class LandComponent implements OnInit {
    moreText: string = "显示更多内容";
    moreInput: boolean = false;
    types: SelectItem[];
    public selectedType: string;
    types2: SelectItem[];
    public selectedType2: string;
    types3: SelectItem[];
    public selectedType3: string;
    private num1: any;
    private num2: any;
    private num: any;
    private isShowArea: boolean = false;
    private ch;
    showTable: any = 1;


    public yhzgx_list: any; //与户主关系下拉列表
    public mz_list: any; //民族下拉列表
    public whcd_list: any; //文化程度下拉列表
    public cyzk_list: any; //从业状况下拉列表
    public xb_list: any; //性别选择
    public sfkgr: number = 0; //是否空挂人
    public sfldl: number = 0; //是否劳动力
    public zydl_list: any; //专业大类
    public hkqk_list: any; //户口情况列表
    public hyzk_list: any;//婚姻状况下拉列表
    public childInfo;
    public childInfo2;

    public dcfw_list: any;//调查范围
    public dcfw_list_is_show = 0;//调查范围显示
    public dcfw_mc;

    public hbdm_list: any;//户别代码 列表
    public displaySelectPserson;

    public del_land_data = new Array(); //删除的数据
    public update_land_data = {}; //对比后修改的数据
    public add_land_data = new Array(); //新增的数据
    public type; //新增、修改、查看
    public init_land_data;
    public tdxz_list: any; //土地性质
    public fwzyyt_list: any;//房屋主要用途
    public name_active_key = 0;
    public qshflId;
    public ssgcdm; //所属工程代码
    public ssxzqhdm //所属行政区划代码
    public bj_land_data; //初始化数据标记
    public flxx_update = new Array(); //分类信息
    public flxx_add = new Array(); //分类信息新增
    public data;
    public name_active_data;
    public name_active_base;
    public landList;
    public selectPersonList = new Array(); //新增下拉列表


    msgs: Message[] = [];

    @ViewChild('person') person: NgForm;
    @ViewChildren('defaultPerson') defaultPerson: QueryList<ElementRef>;

    constructor(public InputChange:InputChangeService,public ValuChangeService: ValuChangeService, public HttpService: HttpService, public selectList: SelectListHttpService, public DataProcessing: DataProcessingService) {
        this.types = [];
        this.types.push({label: '是', value: '1'});
        this.types.push({label: '否', value: '0'});
        this.types2 = [];
        this.types2.push({label: '是', value: '1'});
        this.types2.push({label: '否', value: '0'});
        this.types3 = [];
        this.types3.push({label: '分类汇总', value: '1'});
        this.types3.push({label: '规格明细', value: '0'});

    }


    ngAfterViewInit(): void {


        // 订阅表单值改变事件
        this.person.valueChanges.subscribe(data => {



            let res =  this.InputChange.get_value_change(this.name_active_data,this.name_active_key,this.init_land_data,this.update_land_data,this.add_land_data);

            this.add_land_data = res.add_data;
            this.update_land_data = res.update_data;

                console.log(this.add_land_data);
                console.log(this.update_land_data);

            }
        );

    }


    ngOnInit() {

        console.log(this.data);


        //所属行政区划代码和工程代码
        if (this.type == 'add') {
            this.ssgcdm = this.qshflId.ssgcdm;
            this.ssxzqhdm = this.qshflId.ssxzqhdm;

        } else if (this.type == 'rew') {

            this.ssgcdm = this.qshflId.ssgcdm;
            this.ssxzqhdm = this.qshflId.ssxzqhdm;
        }


        //  专业大类 下拉列表
        this.selectList.getSelectList('B_TDJBXX', 'ZYDLDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.zydl_list = data;
        });
        //  土地性质 下拉列表
        this.selectList.getSelectList('B_TDJBXX', 'DCFWDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.tdxz_list = data;
        });

        console.log(this.childInfo2);


        this.selectPersonList.push({label:'选择户成员',value:-1});

        this.childInfo2.forEach((value,index,arr)=>{

            this.selectPersonList.push({label:value['mc'],value:(value['id']!=null?value['id']:index)});

        });


        if (this.data['returnObject']['datalist'][0] != undefined) {

            this.name_active_data = [ new TreesData('','','','','','','','','','','','','','','',0,'','','','','','','','','','','','') ];

            this.landList = this.data['returnObject']['datalist'];  //户成员信息
            this.name_active_data = this.landList[0];   //默认选中第一个户成员

            if (this.name_active_data['list'] != undefined) {

                this.name_active_base = this.name_active_data['list'];
            } else {
                this.name_active_base = this.data['returnObject']['baselist'];
            }

            //转换数据格式

            if (this.bj_land_data == 1) {
                this.bj_land_data = 0;
                this.name_active_base.forEach((value, index, arr) => {
                    this.name_active_base[index] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(value, 'childList', 'children', '', ''));

                });
            }


        } else {
            this.landList = this.data['returnObject']['datalist'];  //户成员信息
            this.name_active_data = '';
            this.name_active_base = '';
        }


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


    //权属人姓名


    eventQsr(e){

        let name = '';
        this.selectPersonList.forEach((value,index,arr)=>{
            console.log(value);
            if( e == -1){
                this.name_active_data.qsrmc = '';
                this.name_active_data.qsrId = '';

            }else if(value['value']==e){
                name = value['label'];
            }

        });


        this.name_active_data.qsrmc = name;
        this.name_active_data.qsrId = e;

        console.log(this.name_active_data);
        let res =  this.InputChange.get_select_change(this.name_active_data,this.name_active_key,this.init_land_data,this.update_land_data,this.add_land_data);

        this.add_land_data = res.add_data;
        this.update_land_data = res.update_data;




    }


    //土地性质
    eventTdxz(e) {
        console.log(e);

        this.name_active_data.tdxzdm = e;


        let res =  this.InputChange.get_select_change(this.name_active_data,this.name_active_key,this.init_land_data,this.update_land_data,this.add_land_data);

        this.add_land_data = res.add_data;
        this.update_land_data = res.update_data;


        console.log(this.add_land_data);
        console.log(this.update_land_data);
    }


    //专业大类
    eventZydl(e) {
        console.log(e);

        this.name_active_data.zydldm = e;


        let res =  this.InputChange.get_select_change(this.name_active_data,this.name_active_key,this.init_land_data,this.update_land_data,this.add_land_data);

        this.add_land_data = res.add_data;
        this.update_land_data = res.update_data;


        console.log(this.add_land_data);
        console.log(this.update_land_data);

    }


    //选择name改变样式
    selectNmae(name, i) {
        this.name_active_key = i;
        this.name_active_data = name;

        console.log(this.name_active_data);
        this.name_active_base = this.name_active_data['list'];

    }


    //新增房屋
    getChildEvent1(event) {



        this.name_active_data['list'] = JSON.parse(JSON.stringify(this.init_land_data['baseList']));

        this.name_active_base = this.name_active_data['list'];

        //转换数据格式


        this.name_active_base.forEach((value,index,arr)=>{
            this.name_active_base[index] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(value,'childList','children','',''));

        });

        let name = '';

        this.selectPersonList.forEach((value,index,arr)=>{

            if(value['value'] == event){

                name = value['label'];

            }

        });



        this.displaySelectPserson = false;
        console.log(this.landList);





        if((typeof this.landList) != 'undefined' && this.landList.length>0){
            this.landList.push(new TreesData('','','','','','','','','',event,'','','','','',0,'','','','','','','','',name,'','',''));
            this.name_active_data = this.landList[this.landList.length-1];
            this.name_active_key = this.landList.length-1;

        }else{
            this.landList.push(new TreesData('','','','','','','','','',event,'','','','','',0,'','','','','','','','',name,'','',''));
            this.name_active_data = this.landList[0];

        }



    }

    //删除人员
    deleteSlect() {


        console.log(this.landList);
        //记录删除id
        if (this.name_active_data['id'] != undefined || this.name_active_data['id'] != null) {
            this.del_land_data.push({'id': this.name_active_data['id']});

            //如果删除的户成员在修改列表中存在，则从修改列表中删除
            console.log(this.del_land_data);

        }

        // this.name_active_key= this.name_active_key -1;
        // if(this.landList[0] != undefined && this.name_active_key>0){
        console.log(this.name_active_data);


        this.landList.splice(this.name_active_key, 1);
        if (this.landList[0] != undefined && this.landList.length > 0) {

            if (this.name_active_key == 0) {
                this.name_active_data = this.landList[this.name_active_key + 1];
                this.name_active_key = this.name_active_key + 1;
            } else {
                this.name_active_data = this.landList[this.name_active_key - 1];
                this.name_active_key = this.name_active_key - 1;
            }


        } else if (this.landList[0] != undefined && this.name_active_key == 0) {

            this.name_active_data = this.landList[this.name_active_key + 1];
            this.name_active_key = this.name_active_key + 1;


        } else {
            this.name_active_data = '';
            this.name_active_base = '';

        }


        // this.landList.splice(this.name_active_key,1);
        //     if(this.name_active_key == 0){
        //         this.name_active_data = this.landList[this.name_active_key+1];
        //         this.name_active_key = this.name_active_key + 1;
        //     }else{
        //         this.name_active_data = this.landList[this.name_active_key-1];
        //         this.name_active_key = this.name_active_key - 1;
        //
        //     }


        console.log(this.name_active_key);

        //}

        console.log(this.del_land_data);
    }


    //显示新增人员下拉列表
    displaySlect() {
        if (this.displaySelectPserson == true) {
            this.displaySelectPserson = false;
        } else {
            this.displaySelectPserson = true;
        }
    }


    Tree_update(data, now_data, i) {


        console.log(this.name_active_base[i]);


        console.log(data);
        console.log(now_data);
        this.name_active_base[i] = data;

        if (this.name_active_data.id != undefined && this.name_active_data.id != "") {
            this.flxx_update[now_data['zbflId']] = new Array();
            this.flxx_update[now_data['zbflId']] = {
                'sl': now_data['sl'],
                'bz': now_data['bz'],
                'fwjgdm': now_data['fwjgdm'],
                'zbflId': now_data['zbflId'],
                'id': this.name_active_data.id
            };


        } else {

            if (this.name_active_data['listfwAdd'] == undefined) {
                this.name_active_data['listfwAdd'] = new Array();
            }
            this.name_active_data['listfwAdd'][now_data['zbflId']] = {
                'sl': now_data['sl'],
                'bz': now_data['bz'],
                'fwjgdm': now_data['fwjgdm'],
                'zbflId': now_data['zbflId']
            };

            //this.flxx_add[now_data['zbflId']] = new Array();
            //this.flxx_add[now_data['zbflId']] = {'sl':now_data['sl'],'bz':now_data['bz'],'fwjgdm':now_data['fwjgdm'],'zbflId':now_data['zbflId']};


        }
        console.log(this.flxx_update);
        console.log(this.name_active_data);
        // let  parent_data = this.get_data(parent);
        //  delete parent_data['expanded'];
        // delete parent_data['parent'];
        //  console.log(parent_data);


    }


    //调查范围显示下拉
    dcfw_show() {


        if (this.dcfw_list_is_show == 0) {

            this.dcfw_list_is_show = 1;

            //调查范围 下拉列表

            this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_TDJBXX&column=DCFWDM&gcdm=${this.qshflId.ssgcdm}&xzqhdm=${this.qshflId.ssxzqhdm}`).then((data) => {

                this.dcfw_list = data['returnObject']; //this.DataProcessing.replaceChildlValue(data['returnObject'],'mc','label','dm','value');

            });

        } else {
            this.dcfw_list_is_show = 0;

        }
    }

    //调查范围选中数据
    dcfw_data(e) {

        this.name_active_data.dcfwdm = e.dm;
        this.name_active_data.dcfwmc = e.mc;
        this.dcfw_list_is_show = 0;


        let res =  this.InputChange.get_select_change(this.name_active_data,this.name_active_key,this.init_land_data,this.update_land_data,this.add_land_data);

        this.add_land_data = res.add_data;
        this.update_land_data = res.update_data;
        
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

    selectedTypea() {

    }
}

