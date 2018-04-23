import {Component, ViewChild, ElementRef, ViewChildren, OnInit, QueryList} from '@angular/core';
import {SelectItem, DataTableModule, SharedModule, LazyLoadEvent, FilterMetadata} from 'primeng/primeng';
import {TreesData} from "../trees/trees.component";
import * as $ from "jquery";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {HttpService} from "../../../../../../service/http-service";
import {ValuChangeService} from "../../../../../../service/valuChange.service";
import {NgForm} from "@angular/forms";
import {SelectListHttpService} from "../../../../../../service/select-list-http.service";
import {InputChangeService} from "../../../../../../service/input-change.service";
import {ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';

@Component({
  selector: 'app-grave',
  templateUrl: './grave.component.html',
  styleUrls: ['../children.css']
})
export class GraveComponent implements OnInit {
    public hcy: any;
    public selectListHzgx = new Array;
    public tableList = Array();
    public graveList: any;
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
    public del_grave_data; //  删除的数据
    public init_grave_data; //  初始化的数据
    public update_grave_data = new Array(); //  对比后修改的数据
    public add_grave_data = new Array(); //  新增的数据
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
    public  isShowJcrq: any;
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
    public fmlb_list:any;
    public ymzgx_list:any;
    public listHcyAdd;


    public  zzcModel: boolean = false;
    public  ch:any;


    area: string;
    @ViewChild('person') person: NgForm;
    @ViewChildren('defaultgrave') defaultgrave: QueryList<ElementRef>;


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
            console.log(this.add_grave_data);
            console.log(this.update_grave_data);
            //   订阅表单值改变事件
            this.person.valueChanges.subscribe(data => {

                console.log(this.add_grave_data);
                console.log(this.update_grave_data);
                console.log(this.init_grave_data);
                    if (this.tableList && this.tableList.length > 0) {

                        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);

                        this.add_grave_data = res.add_data;
                        this.update_grave_data = res.update_data;


                    }
                console.log(this.add_grave_data);
                console.log(this.update_grave_data);

                }
            );
        }


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


        console.log(this.childInfo2);
        console.log(this.childInfo);
        console.log(this.qshflId);
        this.selectedType = 1;
        console.log(this.add_grave_data);

       // if(this.childInfo2 && this.childInfo2.length>0 && this.childInfo2[0]['id'].toString().length == 32){
        this.tableList = this.childInfo2;
        // }else{
        //     this.tableList = this.childInfo2;
        //     this.tableList.forEach((value,index,arr)=>{
        //
        //         this.add_grave_data[index] = value;
        //
        //     })
        // }



        this.hcy_count = this.tableList != undefined && this.tableList.length ? this.tableList.length : 0;

        if(this.tableList && this.tableList.length){
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


        //  坟墓类别 下拉列表
        this.selectList.getSelectList('B_FMJBXX', 'FMLBDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            let lsObj = [];
            for (let item in data) {
                console.log(data[item])
                lsObj.push(data[item])
            }
            lsObj.push({label: "空", value: ""});

            this.fmlb_list = lsObj;
            console.log(this.fmlb_list);
        });

        //  与墓主关系 下拉列表
        this.selectList.getSelectList('B_FMJBXX', 'YMZGX', this.ssgcdm, this.ssxzqhdm).then(data => {
            let lsObj = [];
            for (let item in data) {
                lsObj.push(data[item])
            }
            lsObj.push({label: "空", value: ""});

            this.ymzgx_list = lsObj;
            console.log(this.ymzgx_list);
        });
        //  民族 下拉列表
        this.selectList.getSelectList('B_HCY', 'MZDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            let lsObj = [];
            for (let item in data) {
                console.log(data[item])
                lsObj.push(data[item])
            }
            lsObj.push({label: "空", value: ""});

            this.mz_list = lsObj;
        });
        //  文化程度 下拉列表
        this.selectList.getSelectList('B_HCY', 'WHCDDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            let lsObj = [];
            for (let item in data) {
                console.log(data[item])
                lsObj.push(data[item])
            }
            lsObj.push({label: "空", value: ""});
            this.whcd_list = lsObj;
        });
        //  从业状况 下拉列表
        this.selectList.getSelectList('B_HCY', 'CYZKDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            // data.push({label: "kong", value: null});
            let lsObj = [];
            for (let item in data) {
                console.log(data[item])
                lsObj.push(data[item])
            }
            lsObj.push({label: "空", value: ""});
            this.cyzk_list = lsObj;
        });

        this.selectPersonList.push({label:'选择权属人',value:-1});
        if(this.childInfo3){

            this.childInfo3.forEach((value,index,arr)=>{

                this.selectPersonList.push({label:value['mc'],value:value['id']});

            });
        }


        console.log(this.add_grave_data);
        console.log(this.update_grave_data);
        console.log(this.del_grave_data);

    }


    // 所属行政区划
    showSzxzqhBlock(index) {
        this.zzcModel = true;
        let szxzqh = document.getElementById("szxzqh");
        if (szxzqh) {
            let top = $('#szxzqh').offset().top;
            let left = $('#szxzqh').offset().left;
            this.zydlLeft = left + 130 + "px";
            this.zydlTop = top + index * 30 - 20 + "px";
            console.log(index)
            console.log(this.zydlTop);
            console.log(this.zydlLeft);
        }
        if (this.type != 'view') {
            this.isShowArea = this.isShowArea ? false : true;
        }
    }

    //   选择人
    selectgrave(grave, i) {
        this.hcy = grave;
        this.name_active_key = i;
    }

    // 文化程度
    showWhcdBlock(index) {
        let dcfw = document.getElementById("whcd");
        if (dcfw) {
            let top = $('#whcd').offset().top;
            let left = $('#whcd').offset().left;
            this.zydlLeft = left + 130 + "px";
            this.zydlTop = top + index * 30 - 20 + "px";
        }
        if (this.type != "view") {
            this.isShowWhcd = this.isShowWhcd ? false : true;
            if (!this.whcdTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HCY&column=WHCDDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        this.whcdTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_HCY&column=WHCDDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        this.whcdTableList = res['returnObject'];
                    });
            }
        }
    }

    //  文化程度选中数据
    getChildWhcd(event) {
        console.log(event)
        this.zzcModel = false;
        this.isShowWhcd = false;
        if (event) {
            if (this.selectedType == 1) {
                console.log(this.selectedType);
                this.hcy.whcddm = event.dm;
                this.hcy.whcdmc = event.mc;
                let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
                this.add_grave_data = res.add_data;
                this.update_grave_data = res.update_data;

            } else {
                this.tableSelecValue['whcdmc'] = event.mc;
                this.tableSelecValue['whcddm'] = event.dm;
                let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
                this.add_grave_data = res.add_data;
                this.update_grave_data = res.update_data;
            }
        }
    }

    //  户口情况显示下拉
    showHkqkBlock(index) {
        let dcfw = document.getElementById("Hkqk");
        if (dcfw) {
            let top = $('#Hkqk').offset().top;
            let left = $('#Hkqk').offset().left;
            this.zydlLeft = left + 130 + "px";
            this.zydlTop = top + index * 30 - 20 + "px";
        }
        if (this.type != "view") {
            this.isShowHkqk = this.isShowHkqk ? false : true;
            if (!this.hkqkTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HCY&column=HKQKDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.hkqkTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_HCY&column=HKQKDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.hkqkTableList = res['returnObject'];
                    });
            }
        }
    }

    //  户口情况选中数据
    getChildHkqk(event) {
        this.zzcModel = false;
        this.isShowHkqk = false;
        if (event) {
            if (this.selectedType == 1) {
                console.log(this.selectedType);
                this.hcy.hkqkdm = event.dm;
                this.hcy.hkqkmc = event.mc;
                let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
                this.add_grave_data = res.add_data;
                this.update_grave_data = res.update_data;

            } else {
                this.tableSelecValue['hkqkmc'] = event.mc;
                this.tableSelecValue['hkqkdm'] = event.dm;
                let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
                this.add_grave_data = res.add_data;
                this.update_grave_data = res.update_data;
            }
        }

    }




    // 专业大类展示
    showZydlBlock(index) {
        let test = document.getElementById("zydl");
        this.zzcModel = true;
        if (test) {
            let top = $('#zydl').offset().top;
            let left = $('#zydl').offset().left;
            this.zydlLeft = left + 130 + "px";
            this.zydlTop = top + index * 44 - 20 + "px";
            console.log(this.zydlTop);
            console.log(this.zydlLeft);
        }
        if (this.type != "view") {
            this.isShowZydl = this.isShowZydl ? false : true;
            if (!this.zydlTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_FMJBXX&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.zydlTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_FMJBXX&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
            if (this.selectedType == 1) {
                console.log(this.selectedType);
                this.hcy.zydldm = event.qc;
                this.hcy.zydlmc = event.mc;
                let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
                this.add_grave_data = res.add_data;
                this.update_grave_data = res.update_data;
            } else {
                this.tableSelecValue['zydlmc'] = event.qc;
                this.tableSelecValue['zydldm'] = event.dm;
                let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
                this.add_grave_data = res.add_data;
                this.update_grave_data = res.update_data;
            }
        }
    }

    //  调查范围显示下拉
    showDcfwBlock(index) {
        this.zzcModel = true;
        let dcfw = document.getElementById("dcfw");
        if (dcfw) {
            let top = $('#dcfw').offset().top;
            let left = $('#dcfw').offset().left;
            this.zydlLeft = left + 130 + "px";
            this.zydlTop = top + index * 30 - 20 + "px";
            console.log(index)
            console.log(this.zydlTop);
            console.log(this.zydlLeft);
        }
        if (this.type != "view") {
            this.isShowDcfw = this.isShowDcfw ? false : true;
            if (!this.dcfwTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_FMJBXX&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_FMJBXX&column=FMLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
            if (this.selectedType == 1) {
                console.log(this.selectedType);
                this.hcy.dcfwdm = event.dm;
                this.hcy.dcfwmc = event.mc;
                let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
                this.add_grave_data = res.add_data;
                this.update_grave_data = res.update_data;
            } else {
                this.tableSelecValue['dcfwmc'] = event.mc;
                this.tableSelecValue['dcfwdm'] = event.dm;
                console.log(this.name_active_key);
                let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
                this.add_grave_data = res.add_data;
                this.update_grave_data = res.update_data;
            }
        }
        console.log(this.update_grave_data);
    }

    showQrrqBlock(index) {
        this.zzcModel = true;
        this.isShowQrrq = this.isShowQrrq ? false : true;
        let dcfw = document.getElementById("qrrq");
        if (dcfw) {
            let top = $('#qrrq').offset().top;
            let left = $('#qrrq').offset().left;
            this.zydlLeft = left + 130 + "px";
            this.zydlTop = top + index * 30 - 20 + "px";
            console.log(index)
            console.log(this.zydlTop);
            console.log(this.zydlLeft);
        }
    }

    qrrqClickTime(event) {
        this.tableSelecValue.qrrq = event;
        let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;
        this.isShowQrrq=false;
        this.zzcModel = false;
    }

    showJcrqBlock(index) {
        console.log(index);
        this.zzcModel = true;
        this.isShowJcrq = this.isShowJcrq ? false : true;
        let dcfw = document.getElementById("jcrq");
        if (dcfw) {
            let top = $('#jcrq').offset().top;
            let left = $('#jcrq').offset().left;
            this.zydlLeft = left + 130 + "px";
            this.zydlTop = top + index * 30 - 20 + "px";
            console.log(index)
            console.log(this.zydlTop);
            console.log(this.zydlLeft);
        }
    }
    jcrqClickTime(event) {
        console.log(event);
        this.tableSelecValue.jcrq= event;
        let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;
        this.isShowJcrq=false;
        this.zzcModel = false;
    }

    // 为每个select绑定事件
    getChildSelect(e, zd) {
        console.log(e);
        console.log(zd)
        this.tableSelecValue[zd] = e;
        console.log(this.tableSelecValue);
        let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;
    }

    nodeSelect(e) {
        console.log(e);

        console.log(this.tableSelecValue);
    }

    //关闭遮罩层
    closeZzc() {
        this.isShowZydl = false;
        this.isShowDcfw = false;
        this.isShowArea = false;
        this.isShowJcrq=false;
        this.isShowCsrq=false;
        this.isShowQrrq=false;
        this.isShowHkqk=false;
        this.isShowWhcd=false;
        this.zzcModel = false;
    }


    addgrave(): void {

        console.log(this.childInfo4);
        this.tableList.push({
            "mz": "",
            'sfzh': '',
            'swszxzqhdm':  "",
            'localitydesc':  "",
            'zydldm':  "",
            'zydlmc':  "",
            'dcfwdm':  "",
            'dcfwmc':  "",
            'fmlbdm': "",
            'sl': "",
            'ymzgx': "",
            'szgc': "",
            'sztf': "",
            'sztb': "",
            "dmbh":"",
            'jcrq': "",
            'ggcc': '',
            'dclsh': '',
            'bz': "",
            'qsrId':'',
            'id': new Date().getTime()

        });


        let that = this.defaultgrave;

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
        //     this.add_grave_data.push(this.tableList[this.hcy_count-1]);
        // }
        //
        //
        //
        //
        //     let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        //
        //     this.add_grave_data = res.add_data;
        //     this.update_grave_data = res.update_data;

        this.add_grave_data[this.hcy['id']]=this.hcy;





        console.log(this.add_grave_data);
        console.log(this.tableList);
        console.log(this.childInfo2);
        console.log(this.ymzgx_list);

        console.log(this.person);

    }


    //  删除成员
    delgrave() {


        if (this.tableList.length > 0) {
            //  记录删除id
            if (this.hcy['id'] != undefined && this.hcy['id'].toString().length == 32) {
                console.log(this.hcy['id']);
                this.del_grave_data.push({'id': this.hcy['id']});

                //  如果删除的户成员在修改列表中存在，则从修改列表中删除
                this.tableList.forEach((value, index, arr) => {
                    if (value['id'] == this.hcy['id']) {
                        delete this.update_grave_data[index];
                    }
                });
                console.log(this.update_grave_data);
                console.log(this.del_grave_data);
            } else {

                delete this.add_grave_data[this.hcy['id']];
                console.log(this.add_grave_data);


            }


            this.tableList.splice(this.name_active_key, 1);
            if (this.tableList[0] != undefined && this.name_active_key > 0) {
                this.selectgrave(this.tableList[this.name_active_key - 1], this.name_active_key - 1);
                this.hcy_count = this.hcy_count - 1;

            } else if (this.tableList[0] != undefined && this.name_active_key == 0) {

                this.selectgrave(this.tableList[this.name_active_key], this.name_active_key);
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
            this.selectgrave(this.tableList[this.name_active_key - 1], this.name_active_key - 1);
        }

    }

    //  下一条

    down() {
        console.log(this.tableList.length);
        if (this.name_active_key < this.tableList.length - 1) {
            this.selectgrave(this.tableList[this.name_active_key + 1], this.name_active_key + 1);
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
                let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
                this.add_grave_data = res.add_data;
                this.update_grave_data = res.update_data;
            } else {
                this.tableSelecValue['qrrq'] = event;
                let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
                this.add_grave_data = res.add_data;
                this.update_grave_data = res.update_data;
            }
        }
    }

    getQcrqDate(event) {
        this.hcy.qcrq = event;


        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;

        console.log(this.add_grave_data);

    }


    getCsrqDate(event) {
        this.hcy.csrq = event;
        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;
        console.log(this.add_grave_data);

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


        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;
        console.log(this.add_grave_data);


    }

    //  户口情况
    eventHkqk(event) {
        this.hcy.hkqkdm = event;


        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;
        console.log(this.add_grave_data);


    }

    //  是否空挂人
    eventSfkgr(event) {
        console.log(event);
        this.hcy.sfkgr = event.option.value;


        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;
        console.log(this.add_grave_data);
    }



    //  婚姻状况
    eventHyzt(event) {
        this.hcy.hydm = event;


        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;
        console.log(this.add_grave_data);
    }

    //  从业情况
    eventCyqk(event) {
        this.hcy.cyzkdm = event;


        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;


        console.log(this.add_grave_data);
        console.log(this.update_grave_data);
    }

    //  民族
    eventMz(event) {
        this.hcy.mzdm = event;


        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;
        console.log(this.update_grave_data);

        console.log(this.add_grave_data);
    }

    tableChange(e) {
        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;
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


        console.log(this.add_grave_data);
    }

    //  与户主关系
    eventYhzgx(event) {

        this.hcy.yhzgxdm = event;
        console.log(this.hcy.yhzgxdm);

        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;
        console.log(this.update_grave_data);

        console.log(this.add_grave_data);
    }

    //  户别
    eventHbdm(event) {
        this.hcy.hbdm = event;
        console.log(this.hcy.hbdm);

        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;
        console.log(this.add_grave_data);
        console.log(this.update_grave_data);

    }

    //  是否劳动力
    eventSFLDL(event) {
        this.hcy.hbdm = event;

        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;
        console.log(this.add_grave_data);
        console.log(this.update_grave_data);

    }


    //坟墓类别
    eventFmlb(event){
        this.hcy.fmlbdm = event;

        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;
        console.log(this.add_grave_data);
        console.log(this.update_grave_data);


    }

    //坟墓类别
    eventYmzgx(event){
        this.hcy.ymzgx = event;
        console.log(event);
        console.log(this.ymzgx_list);

        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;
        console.log(this.add_grave_data);
        console.log(this.update_grave_data);


    }


    //  备注
    eventBz(event) {
        this.hcy.bz = event;


        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;

        console.log(this.add_grave_data);
        console.log(this.update_grave_data);

    }

    eventQsr(event){
        console.log(event);
        //this.hcy.qsrId = event;


        //let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);
       // this.add_grave_data = res.add_data;
        //this.update_grave_data = res.update_data;

        //如果上一个权属人ID长度为32

        if(this.hcy.qsrId){

            console.log(this.update_grave_data);

            if(event!= -1 && this.hcy.qsrId.toString().length == 32 && this.hcy.id.toString().length == 32){
                //如果上一个权属人ID长度为32且 当前墓主的ID长度为32
                //在del_grave_data中添加上一个坟墓的ID
                this.del_grave_data[this.hcy.id] = {id:this.hcy.id};

                //删除update_grave_data中 上一个坟墓的数据
                if(this.update_grave_data.length>0){
                    this.update_grave_data.forEach((value,index,arr)=>{

                        if(value['id'] == this.hcy.id){
                            this.update_grave_data.splice(index,1);
                        }

                    })
                    console.log(this.update_grave_data[0]);
                    console.log(this.update_grave_data);
                }




            }else if(event!= -1 && this.hcy.qsrId.toString().length == 32 && this.hcy.id.toString().length != 32){
                //如果上一个权属人ID长度为32 且当前墓主的ID长度不为32, 表示上一个坟墓为新增
                //直接在add_grave_data中删除该坟墓的数据
                delete this.add_grave_data[this.hcy.id];



            }else if(event!= -1){

                //如果上一个权属人ID长度不为32，则说明该权属人为新增
                //则删除listHcyAdd中的该项数据
                delete  this.listHcyAdd[this.hcy.qsrId]['listFmAdd'][this.hcy.id];


            }
        }



        this.hcy.qsrId = event;
        if(event.toString().length == 32){


            //this.hcy.id = new Date().getTime();



            //将户成员基本信息带到房屋基本信息中
            this.childInfo3.forEach((value, index, arr) => {

                if (value['id'] == this.hcy['qsrId']) {
                    for (var i in value) {
                        for (var ii in this.hcy) {
                            // this.name_active_data['swszxzqhdm']=value['szxzqhdm'];
                            if (i == ii && (i == 'szxzqhdm' || i == 'xzqhmc' || i == 'dcfwdm' || i == 'dcfwmc' || i == 'zydlmc' || i == 'zydldm')) {
                                console.log(i);
                                this.hcy[ii] = value[i];
                            }
                        }
                    }
                    if (value['szxzqhdm'] != null) {
                        this.hcy['swszxzqhdm'] = value['szxzqhdm'];
                        this.hcy['localitydesc'] = value['xzqhmc'];
                    }

                }


            });





            let res =  this.InputChange.get_select_change(this.hcy,this.name_active_key,this.init_grave_data,this.update_grave_data,this.add_grave_data);


            console.log(res);
            this.add_grave_data = res.add_data;
            this.update_grave_data = res.update_data;
            this.hcy.qsrId = event;

            console.log(this.update_grave_data);
            
        }else{

            this.add_grave_data.forEach((value,index,arr)=>{

                if(value['qsrId'] == this.hcy.qsrId){
                    delete this.add_grave_data[index];
                }

            });


            console.log(this.listHcyAdd);
            if( this.listHcyAdd[this.hcy.qsrId] == undefined){
                this.listHcyAdd[this.hcy.qsrId] = new Array();
            }

            if( this.listHcyAdd[this.hcy.qsrId]['listFmAdd'] == undefined){
                this.listHcyAdd[this.hcy.qsrId]['listFmAdd'] = new Array();
            }

            if( this.listHcyAdd[this.hcy.qsrId]['listFmAdd'][this.hcy.id]){
                this.listHcyAdd[this.hcy.qsrId]['listFmAdd'][this.hcy.id] = new Array();
            }

           this.listHcyAdd[this.hcy.qsrId]['listFmAdd'][this.hcy.id] = this.hcy;


        }





        console.log(this.add_grave_data);
        console.log(this.update_grave_data);
        console.log(this.del_grave_data);
        console.log(this.listHcyAdd);



    }



    //建成日期
    eventJcrq(e){
        this.hcy.jcrq = e ;

        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_grave_data, this.update_grave_data, this.add_grave_data);

        this.add_grave_data = res.add_data;
        this.update_grave_data = res.update_data;


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
    csrq: "出生日期",
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
    qrsj: '迁入时间',
    rs: "人数",
    bz: "备注",
    cjsj: "创建时间",
    zhgxsj: "最后更新时间",
}