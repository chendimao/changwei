import {Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SelectItem, DataTableModule, SharedModule, LazyLoadEvent, FilterMetadata} from 'primeng/primeng';
import { ValuChangeService } from "../../../../../../service/valuChange.service";
import {SelectListHttpService} from "../../../../../../service/select-list-http.service";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import * as $ from "jquery";
import {InputChangeService} from "../../../../../../service/input-change.service";
import {HttpService} from "../../../../../../service/http-service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-shebei',
  templateUrl: './shebei.component.html',
    styleUrls: ['../children.css']
})
export class ShebeiComponent implements OnInit {
    public hcy: any;
    public selectListHzgx = new Array;
    public tableList = Array();
    public shebeiList: any;
    types: SelectItem[];
    public selectedType: number;
    types1: SelectItem[];
    types2: SelectItem[];
    types3: SelectItem[];
    types4: SelectItem[];
    types5: SelectItem[];

    public qshflId; //  权属户信息
    public type: string; //  类型：查看、新增、修改
    public childInfo: any;
    public childInfo2: any;
    public hcy_count: number = 0; //  总共多少人
    public isShowArea: boolean = false;
    public name_active_key; //  当前选中的下标
    public del_shebei_data; //  删除的数据
    public init_shebei_data; //  初始化的数据
    public update_shebei_data = new Array(); //  对比后修改的数据
    public add_shebei_data = new Array(); //  新增的数据
    public selectPersonList=new Array() ; //新增下拉列表
    public childInfo3;
    public childInfo4;
    public yhzgx_list: any; //  与户主关系下拉列表
    public mz_list: any; //  民族下拉列表
    public whcd_list: any; //  文化程度下拉列表
    public cyzk_list: any; //  从业状况下拉列表
    public sfsldl_list: any; // 是否是劳动力
    public sfkgr_list: any; //是否空挂人
    public xb_list: any; //  性别选择
    public xb_list_copy: any; //  性别选择
    public sfkgr: number = 0; //  是否空挂人
    public sfldl: number = 0; //  是否劳动力

    public hkqk_list: any; //  户口情况列表
    public hyzk_list: any;// 婚姻状况下拉列表
    public dcfw_list: any;// 调查范围
    public dcfw_list_is_show = 0;// 调查范围显示
    public dcfw_mc;
    public hbdm_list: any;// 户别代码 列表
    public ssxzqhdm: any; //  所属行政区划代码
    public ssgcdm: any; //  所属行政区划代码
    public  isShowZydl: any;
    public  isShowDcfw: any;
    public  isShowHkqk: any;
    public  isShowWhcd: any;
    public  isShowQcrq: any;
    public  isShowQrrq: any;
    public  isShowCsrq:any;
    public  whcdTableList: any;
    public  whcdTreeList: any;
    public  dcfwTableList: any;
    public  dcfwTreeList: any;
    public  zydlTableList: any;
    public  zydlTreeList: any;
    public  hkqkTableList: any;
    public  hkqkTreeList: any;
    public isDisabled = false;
    public  tableSelecValue: any;
    public  zydlLeft: any;
    public  zydlTop: any;
    public szxzqugldm: any;
    public sblb_list:any;
    public ymzgx_list:any;
    public listHcyAdd;


    public  zzcModel: boolean = false;
    public  ch:any;


    area: string;
    @ViewChild('person') person: NgForm;
    @ViewChildren('defaultshebei') defaultshebei: QueryList<ElementRef>;
    public isShowSblb;
    public sblbTreeList;
    public sblbTableList;


    constructor(public InputChange: InputChangeService, public selectList: SelectListHttpService, public DataProcessing: DataProcessingService, public  ValuChangeService: ValuChangeService, public  HttpService: HttpService, public  route: ActivatedRoute) {


        this.types = [];
        this.types.push({label: '详情视图', value: '1'});
        this.types.push({label: '列表视图', value: '2'});
        this.types4 = [];
        this.types4.push({label: '是', value: 1});
        this.types4.push({label: '否', value: 0});
        this.types5 = [];
        this.types5.push({label: '是', value: 1});
        this.types5.push({label: '否', value: 0});
        this.sfsldl_list = [
            {label: '是', value: 1},
            {label: '否', value: 0},
            {label: '空', value: ""}
        ];
        this.sfkgr_list = [
            {label: '是', value: 1},
            {label: '否', value: 0},
            {label: '空', value: ""}
        ];


    }

    ngAfterViewInit(): void {
        console.log(this.isShowArea);
        console.log(this.tableList);


        console.log(this.person);
        if (this.tableList.length > 0) {
            console.log(this.add_shebei_data);
            console.log(this.update_shebei_data);
            //   订阅表单值改变事件
            this.person.valueChanges.subscribe(data => {

                    console.log(this.add_shebei_data);
                    console.log(this.update_shebei_data);
                    console.log(this.init_shebei_data);
                    if (this.tableList && this.tableList.length > 0) {

                        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);

                        this.add_shebei_data = res.add_data;
                        this.update_shebei_data = res.update_data;


                    }
                    console.log(this.add_shebei_data);
                    console.log(this.update_shebei_data);

                }
            );
        }


    }

    ngOnInit() {


        console.log(this.childInfo2);
        console.log(this.childInfo);
        console.log(this.qshflId);
        this.selectedType = 1;
        console.log(this.add_shebei_data);

        // if(this.childInfo2 && this.childInfo2.length>0 && this.childInfo2[0]['id'].toString().length == 32){
        this.tableList = this.childInfo2;
        // }else{
        //     this.tableList = this.childInfo2;
        //     this.tableList.forEach((value,index,arr)=>{
        //
        //         this.add_shebei_data[index] = value;
        //
        //     })
        // }



        this.hcy_count = this.tableList != undefined && this.tableList.length ? this.tableList.length : 0;

        if(this.tableList && this.tableList.length >0){
            this.hcy = this.tableList[0];
            this.name_active_key = 0;
        }



        console.log(this.hcy);


        //  所属行政区划代码和工程代码
        if (this.type == 'add') {
            this.ssgcdm = this.qshflId.ssgcdm;
            this.ssxzqhdm = this.qshflId.ssxzqhdm;

        } else if (this.type == 'rew') {

            this.ssgcdm = this.qshflId.ssgcdm;
            this.ssxzqhdm = this.qshflId.ssxzqhdm;
        }else{
            this.ssgcdm = this.qshflId.ssgcdm;
            this.ssxzqhdm = this.qshflId.ssxzqhdm;
            this.isDisabled = true;
        }


        console.log(this.ssgcdm);


        this.selectPersonList.push({label:'选择权属人',value:-1});
        if(this.childInfo3){

            this.childInfo3.forEach((value,index,arr)=>{

                this.selectPersonList.push({label:value['mc'],value:value['id']});

            });
        }


        console.log(this.add_shebei_data);
        console.log(this.update_shebei_data);
        console.log(this.del_shebei_data);

    }



    //   选择人
    selectshebei(shebei, i) {
        this.hcy = shebei;
        this.name_active_key = i;
    }



    // 专业大类展示
    showZydlBlock(index) {

        if (this.type != "view") {
            this.isShowZydl = this.isShowZydl ? false : true;
            if (!this.zydlTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_SBXX&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.zydlTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_SBXX&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.zydlTableList = res['returnObject'];
                    });
            }
        }
    }

    getChildZydl(event) {
        console.log(event)
        this.zzcModel = false;
        this.isShowZydl = false;
        if (event) {

                console.log(this.selectedType);
                this.hcy.zydldm = event.dm;
                this.hcy.zydlmc = event.mc;
                let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
                this.add_shebei_data = res.add_data;
                this.update_shebei_data = res.update_data;

        }
    }

    //  调查范围显示下拉
    showDcfwBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowDcfw = this.isShowDcfw ? false : true;
            if (!this.dcfwTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_SBXX&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_SBXX&column=SBLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.dcfwTableList = res['returnObject'];
                    });
            }
        }
    }

    getChildDcfw(event) {
        console.log(event);
        this.zzcModel = false;
        console.log(this.name_active_key);
        this.isShowDcfw = false;
        if (event) {

                console.log(this.selectedType);
                this.hcy.dcfwdm = event.dm;
                this.hcy.dcfwmc = event.mc;
            let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
            this.add_shebei_data = res.add_data;
            this.update_shebei_data = res.update_data;


        }
        console.log(this.update_shebei_data);
    }


    //设备类别

    showsblbBlock() {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowSblb = this.isShowSblb ? false : true;
            if (!this.sblbTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_SBXX&column=SSLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.sblbTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_SBXX&column=SSLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.sblbTableList = res['returnObject'];
                    });
            }
        }
    }

    getChildsblb(event) {
        console.log(event);
        this.zzcModel = false;
        console.log(this.name_active_key);
        console.log(this.init_shebei_data);
        console.log(this.hcy);
        this.isShowSblb = false;
        if (event) {

            console.log(this.selectedType);
            this.hcy.sslbdm = event.dm;
            this.hcy.sslbmc = event.mc;
            let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
            this.add_shebei_data = res.add_data;
            this.update_shebei_data = res.update_data;


        }
        console.log(this.update_shebei_data);
        console.log(this.hcy);

    }


    //购买日期
    eventGmrq(e){
        console.log(e);
        this.hcy.gmrq = e;

        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;

    }

    nodeSelect(e) {
        console.log(e);

        console.log(this.tableSelecValue);
    }


    addshebei(): void {

        console.log(this.childInfo4);
        this.tableList.push({
            'swszxzqhdm': this.childInfo4?this.childInfo4.ssxzqhdm:"",
            'localitydesc': this.childInfo4?this.childInfo4.xzqhmc:"",
            'zydldm': this.childInfo4?this.childInfo4.zydldm:"",
            'zydlmc': this.childInfo4?this.childInfo4.zydlmc:"",
            'dcfwdm': this.childInfo4?this.childInfo4.dcfwdm:"",
            'dcfwmc': this.childInfo4?this.childInfo4.dcfwmc:"",
            "ssxtdm": "",
            "ssgcdm": "",
            "jddm": "",
            "qsrId": "",
            "mc": "",
            "sblbdm": null,
            "sl": null,
            "sldwdm": null,
            "sfkbq": null,
            "xh": null,
            "ggcc": null,
            "gmrq": null,
            "ssyz": null,
            "bz": null,
            "cjsj": null,
            "zhgxsj": null,
            "qsrmc": null,
            "sblbmc": null,
            "sldwmc": null,
            'id': new Date().getTime()


        });





        let that = this.defaultshebei;

        setTimeout(function () {
            console.log(that);
            console.log(that.last);
            console.log(that.last.nativeElement);
            that.last.nativeElement.click();
        }, 0);

        this.hcy_count = this.tableList.length;
        this.hcy = this.tableList[this.tableList.length-1];
        console.log(this.hcy);

        // if(this.childInfo2 && this.childInfo2.length>0 && this.childInfo2[0]['id'].toString().length == 32) {
        //
        // }else{
        //     this.add_shebei_data.push(this.tableList[this.hcy_count-1]);
        // }
        //
        //
        //
        //
        //     let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        //
        //     this.add_shebei_data = res.add_data;
        //     this.update_shebei_data = res.update_data;

        this.add_shebei_data[this.hcy['id']]=this.hcy;





        console.log(this.add_shebei_data);
        console.log(this.tableList);
        console.log(this.childInfo2);
        console.log(this.ymzgx_list);

        console.log(this.person);

    }


    //  删除成员
    delshebei() {


        if (this.tableList.length > 0) {
            //  记录删除id
            if (this.hcy['id'] != undefined && this.hcy['id'].toString().length == 32) {
                console.log(this.hcy['id']);
                this.del_shebei_data.push({'id': this.hcy['id']});

                //  如果删除的户成员在修改列表中存在，则从修改列表中删除
                this.tableList.forEach((value, index, arr) => {
                    if (value['id'] == this.hcy['id']) {
                        delete this.update_shebei_data[index];
                    }
                });
                console.log(this.update_shebei_data);
                console.log(this.del_shebei_data);
            } else {

                delete this.add_shebei_data[this.hcy['id']];
                console.log(this.add_shebei_data);


            }


            this.tableList.splice(this.name_active_key, 1);
            if (this.tableList[0] != undefined && this.name_active_key > 0) {
                this.selectshebei(this.tableList[this.name_active_key - 1], this.name_active_key - 1);
                this.hcy_count = this.hcy_count - 1;

            } else if (this.tableList[0] != undefined && this.name_active_key == 0) {

                this.selectshebei(this.tableList[this.name_active_key], this.name_active_key);
                this.hcy_count = this.hcy_count - 1;

            } else {


                this.hcy_count = 0;

            }

        }

        if (this.tableList.length == 0) {

        }


    }


    //  上一条
    up() {
        if (this.name_active_key > 0) {
            this.selectshebei(this.tableList[this.name_active_key - 1], this.name_active_key - 1);
        }

    }

    //  下一条

    down() {
        console.log(this.tableList.length);
        if (this.name_active_key < this.tableList.length - 1) {
            this.selectshebei(this.tableList[this.name_active_key + 1], this.name_active_key + 1);
        }

    }

    // 所在行政区域
    showAreaBlock(): void {
        console.log(this.type);
        if (this.type != "view") {
            this.isShowArea = this.isShowArea ? false : true;
        }
    }

    getChildSzxzqh(e) {
        console.log(e);
        if (e) {
            this.zzcModel = false;
            if (this.tableSelecValue) {
                this.tableSelecValue.localitydesc = e.qc;
                this.tableSelecValue.swszxzqhdm = e.dm;
            }


            this.hcy.localitydesc = e.qc;
            this.hcy.swszxzqhdm = e.dm;
            this.isShowArea = false;
        } else {
            this.isShowArea = false;
            this.zzcModel = false;
        }
    }


    getQrrqDate(event) {
        console.log(event);
        console.log(this.tableSelecValue)
        if (event) {
            if (this.selectedType == 1) {
                console.log(this.selectedType);
                this.hcy.qrrq = event;
                let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
                this.add_shebei_data = res.add_data;
                this.update_shebei_data = res.update_data;
            } else {
                this.tableSelecValue['qrrq'] = event;
                let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
                this.add_shebei_data = res.add_data;
                this.update_shebei_data = res.update_data;
            }
        }
    }

    getQcrqDate(event) {
        this.hcy.qcrq = event;


        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;

        console.log(this.add_shebei_data);

    }


    getCsrqDate(event) {
        this.hcy.csrq = event;
        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;
        console.log(this.add_shebei_data);

    }

    getChildEvent(index) {
        this.area = index;
    }

    selectedTypea1(): void {
        if (this.selectedType == 2) {
            this.selectedType = 2;
        } else {
            this.selectedType = 1;
        }
    }


    //  每个Input绑定事件

    //  文化程度
    eventWhcd(event) {
        this.hcy.whcddm = event;


        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;
        console.log(this.add_shebei_data);


    }

    //  户口情况
    eventHkqk(event) {
        this.hcy.hkqkdm = event;


        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;
        console.log(this.add_shebei_data);


    }

    //  是否空挂人
    eventSfkgr(event) {
        console.log(event);
        this.hcy.sfkgr = event.option.value;


        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;
        console.log(this.add_shebei_data);
    }



    //  婚姻状况
    eventHyzt(event) {
        this.hcy.hydm = event;


        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;
        console.log(this.add_shebei_data);
    }

    //  从业情况
    eventCyqk(event) {
        this.hcy.cyzkdm = event;


        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;


        console.log(this.add_shebei_data);
        console.log(this.update_shebei_data);
    }

    //  民族
    eventMz(event) {
        this.hcy.mzdm = event;


        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;
        console.log(this.update_shebei_data);

        console.log(this.add_shebei_data);
    }

    tableChange(e) {
        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;
        console.log('1111111')
    }

    //  性别
    eventXb(event) {


        if (this.hcy.xbdm != null && this.hcy.xbdm == event.option.value) {
            event.option.value = null;
            this.hcy.xbdm = null;

        } else {

            if (event.option.value == null && this.hcy.xbdm == null) {


                this.xb_list_copy.forEach((value, index, arr) => {
                    if (value.label == event.option.label) {
                        event.option.value = value.value;
                    }
                });

            } else if (event.option.value != null && this.hcy.xbdm == null) {
                this.hcy.xbdm = event.option.value;

            } else if (event.option.value == null && this.hcy.xbdm != null) {

                this.xb_list_copy.forEach((value, index, arr) => {
                    console.log(event.option.label);
                    if (value.label == event.option.label) {
                        event.option.value = value.value;
                    }
                });

                event.option.value = this.hcy.xbdm;


            }


        }


        console.log(event.option.value);
        console.log(this.hcy.xbdm);


        console.log(this.add_shebei_data);
    }

    //  与户主关系
    eventYhzgx(event) {

        this.hcy.yhzgxdm = event;
        console.log(this.hcy.yhzgxdm);

        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;
        console.log(this.update_shebei_data);

        console.log(this.add_shebei_data);
    }

    //  户别
    eventHbdm(event) {
        this.hcy.hbdm = event;
        console.log(this.hcy.hbdm);

        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;
        console.log(this.add_shebei_data);
        console.log(this.update_shebei_data);

    }

    //  是否劳动力
    eventSFLDL(event) {
        this.hcy.hbdm = event;

        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;
        console.log(this.add_shebei_data);
        console.log(this.update_shebei_data);

    }


    //坟墓类别
    eventsblb(event){
        this.hcy.sblbdm = event;

        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;
        console.log(this.add_shebei_data);
        console.log(this.update_shebei_data);


    }

    //坟墓类别
    eventYmzgx(event){
        this.hcy.ymzgx = event;
        console.log(event);
        console.log(this.ymzgx_list);

        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;
        console.log(this.add_shebei_data);
        console.log(this.update_shebei_data);


    }


    //  备注
    eventBz(event) {
        this.hcy.bz = event;


        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        this.add_shebei_data = res.add_data;
        this.update_shebei_data = res.update_data;

        console.log(this.add_shebei_data);
        console.log(this.update_shebei_data);

    }

    eventQsr(event){
        //this.hcy.qsrId = event;


        //let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_shebei_data, this.update_shebei_data, this.add_shebei_data);
        // this.add_shebei_data = res.add_data;
        //this.update_shebei_data = res.update_data;

        //如果上一个权属人ID长度为32

        if(this.hcy.qsrId){

            console.log(this.update_shebei_data);

            if(event!= -1 && this.hcy.qsrId.toString().length == 32 && this.hcy.id.toString().length == 32){
                //如果上一个权属人ID长度为32且 当前墓主的ID长度为32
                //在del_shebei_data中添加上一个坟墓的ID
                this.del_shebei_data[this.hcy.id] = {id:this.hcy.id};

                //删除update_shebei_data中 上一个坟墓的数据
                if(this.update_shebei_data.length>0){
                    this.update_shebei_data.forEach((value,index,arr)=>{

                        if(value['id'] == this.hcy.id){
                            this.update_shebei_data.splice(index,1);
                        }

                    })
                    console.log(this.update_shebei_data[0]);
                    console.log(this.update_shebei_data);
                }




            }else if(event!= -1 && this.hcy.qsrId.toString().length == 32 && this.hcy.id.toString().length != 32){
                //如果上一个权属人ID长度为32 且当前墓主的ID长度不为32, 表示上一个坟墓为新增
                //直接在add_shebei_data中删除该坟墓的数据
                delete this.add_shebei_data[this.hcy.id];



            }else if(event!= -1){

                //如果上一个权属人ID长度不为32，则说明该权属人为新增
                //则删除listHcyAdd中的该项数据
                console.log(this.hcy.qsrId);
                delete  this.listHcyAdd[this.hcy.qsrId]['listsbAdd'][this.hcy.id];


            }
        }



        this.hcy.qsrId = event;

        if(event.toString().length == 32){

            //this.hcy.id = new Date().getTime();


            let res =  this.InputChange.get_select_change(this.hcy,this.name_active_key,this.init_shebei_data,this.update_shebei_data,this.add_shebei_data);


            console.log(res);
            this.add_shebei_data = res.add_data;
            this.update_shebei_data = res.update_data;
            this.hcy.qsrId = event;

            console.log(this.update_shebei_data);

        }else{
            console.log(this.hcy.qsrId);
            this.add_shebei_data.forEach((value,index,arr)=>{

                if(value['qsrId'] == this.hcy.qsrId){
                    delete this.add_shebei_data[index];
                }

            });


            console.log(this.listHcyAdd);
            if( this.listHcyAdd[this.hcy.qsrId] == undefined){
                this.listHcyAdd[this.hcy.qsrId] = new Array();
            }

            if( this.listHcyAdd[this.hcy.qsrId]['listsbAdd'] == undefined){
                this.listHcyAdd[this.hcy.qsrId]['listsbAdd'] = new Array();
            }

            if( this.listHcyAdd[this.hcy.qsrId]['listsbAdd'][this.hcy.id]){
                this.listHcyAdd[this.hcy.qsrId]['listsbAdd'][this.hcy.id] = new Array();
            }

            this.listHcyAdd[this.hcy.qsrId]['listsbAdd'][this.hcy.id] = this.hcy;


        }


        console.log(this.add_shebei_data);
        console.log(this.update_shebei_data);
        console.log(this.del_shebei_data);
        console.log(this.listHcyAdd);



    }


}

const hcy = {
    ssxtdm: "所属系统代码",
    ssgcdm: "所属工程代码",
    zydldm: "专业大类代码",
    szzggc: "所在最高高程",
    szzdgc: "所在最低高程",
    dcfwdm: "调查范围代码",
    dmbh: "断面编号",
    jddm: "阶段代码",
    szxzqhdm: "所在行政区划代码",
    mc: "名称",
    xbdm: "性别代码",
    hkqkdm: "户口情况代码",
    sfzh: "身份证号",
    mzdm: "民族代码",
    csrq: "",
    whcddm: "文化程度代码",
    cyzkdm: "从业状况代码",
    jn: "技能",
    hydm: "婚姻代码",
    qrrq: "",
    qcrq: "",
    hbdm: "户别代码",
    hkszd: "户口所在地",
    sfkgr: "是否空挂人",
    sfsldl: "是否是劳动力",
    rs: "人数",
    bz: "备注",
    cjsj: "创建时间",
    zhgxsj: "最后更新时间",
}