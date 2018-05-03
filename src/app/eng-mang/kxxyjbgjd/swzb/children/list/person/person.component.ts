import {Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SelectItem, DataTableModule, SharedModule, LazyLoadEvent, FilterMetadata} from 'primeng/primeng';
import {ValuChangeService} from "../../../../../../service/valuChange.service";
import {HttpService} from "../../../../../../service/http-service";
import {ActivatedRoute, Params} from "@angular/router";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {SelectListHttpService} from "../../../../../../service/select-list-http.service";
import {InputChangeService} from "../../../../../../service/input-change.service";
import * as $ from 'jquery';
import * as _ from 'lodash';

import {DOCUMENT} from '@angular/platform-browser';

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['../children.css']
})
export class PersonComponent implements OnInit {
    public hcy: any;
    public selectListHzgx = new Array;
    public tableList = Array();
    public personList: any;
    types: SelectItem[];
    public selectedType: number;
    types1: SelectItem[];
    types2: SelectItem[];
    types3: SelectItem[];
    types4: SelectItem[];
    types5: SelectItem[];

    public test: any;
    public test2: any;

    public ssxzqhSearchDm: any;
    public qshflId; //  权属户信息
    public type: string; //  类型：查看、新增、修改
    public childInfo: any;
    public childInfo2: any;
    public hcy_count: number = 0; //  总共多少人
    public isShowArea: boolean = false;
    public name_active_key; //  当前选中的下标
    public del_person_data; //  删除的数据
    public init_person_data; //  初始化的数据
    public update_person_data = new Array(); //  对比后修改的数据
    public add_person_data = new Array(); //  新增的数据

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
    public update_person_data2;
    public hkqk_list: any; //  户口情况列表
    public hyzk_list: any;// 婚姻状况下拉列表
    public dcfw_list: any;// 调查范围
    public dcfw_list_is_show = 0;// 调查范围显示
    public dcfw_mc;
    public hbdm_list: any;// 户别代码 列表
    public ssxzqhdm: any; //  所属行政区划代码
    public ssgcdm: any; //  所属行政区划代码
    public isShowZydl: any;
    public isShowDcfw: any;
    public isShowHkqk: any;
    public isShowWhcd: any;
    public isShowQcrq: any;
    public isShowQrrq: any;
    public isShowCsrq: any;
    public whcdTableList: any;
    public whcdTreeList: any;
    public dcfwTableList: any;
    public dcfwTreeList: any;
    public zydlTableList: any;
    public zydlTreeList: any;
    public hkqkTableList: any;
    public hkqkTreeList: any;
    public isDisabled = false;
    public tableSelecValue: any;
    public zydlLeft: any;
    public zydlTop: any;
    public szxzqugldm: any;
    public xb;
    public sfldldm;


    public zzcModel: boolean = false;
    public ch: any;


    area: string;
    @ViewChild('person') person: NgForm;
    @ViewChildren('defaultPerson') defaultPerson: QueryList<ElementRef>;
    @ViewChildren('tablePerson') tablePerson;
    public hyzk: any;
    public hb: any;


    constructor(public InputChange: InputChangeService, public selectList: SelectListHttpService, public DataProcessing: DataProcessingService, public  ValuChangeService: ValuChangeService, public  HttpService: HttpService, public  route: ActivatedRoute) {

        this.types2 = [];
        this.types2.push({label: '是', value: '1'});
        this.types2.push({label: '否', value: '0'});
        this.types = [];
        this.types.push({label: '详情视图', value: '1'});
        this.types.push({label: '列表视图', value: '2'});
        this.types4 = [];
        this.types4.push({label: '是', value: 1});
        this.types4.push({label: '否', value: 0});
        this.types5 = [];
        this.types5.push({label: '男', value: 1});
        this.types5.push({label: '女', value: 0});
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
        console.log(this.isShowZydl);

        if (this.tableList.length > 0) {
            //   订阅表单值改变事件
            this.person.valueChanges.subscribe(data => {


                    if (this.tableList && this.tableList.length > 0) {

                        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);

                        this.add_person_data = res.add_data;
                        this.update_person_data = res.update_data;
                        console.log(this.update_person_data);
                        console.log(this.add_person_data);

                    }


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
        this.tableList = this.childInfo2;
        //
        // if(this.childInfo2 && this.childInfo2.length>0){
        //     this.tableList = this.childInfo2;
        //
        // }else{
        //     this.tableList = this.childInfo2;
        //     this.add_person_data = this.tableList;
        // }


        this.hcy_count = this.tableList != undefined && this.tableList.length ? this.tableList.length : 0;

        if (this.tableList && this.tableList.length) {
            this.hcy = this.tableList[0];
            this.name_active_key = 0;

            this.hyzk = this.hcy.hydm;
            this.xb = this.hcy.xbdm;
            this.sfldldm = this.hcy.sfsldl;
            this.hb = this.hcy.hbdm;
        }


        console.log(this.hcy);


        //  所属行政区划代码和工程代码
        if (this.type == 'add') {
            this.ssgcdm = this.qshflId.ssgcdm;
            this.ssxzqhdm = this.qshflId.ssxzqhdm;

        } else if (this.type == 'rew') {

            this.ssgcdm = this.childInfo.ssgcdm;
            this.ssxzqhdm = this.childInfo.ssxzqhdm;
        } else {
            this.ssgcdm = this.childInfo.ssgcdm;
            this.ssxzqhdm = this.childInfo.ssxzqhdm;
            this.isDisabled = true;
        }


        console.log(this.ssgcdm = "S000001");


        //  与户主关系 下拉列表
        this.selectList.getSelectList('B_HYHCYGX', 'YHZGXDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            let lsObj = [];
            for (let item in data) {
                console.log(data[item]);
                lsObj.push(data[item]);
            }
            lsObj.push({label: "空", value: ""});

            this.yhzgx_list = lsObj;
        });
        //  民族 下拉列表
        this.selectList.getSelectList('B_HCY', 'MZDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            let lsObj = [];
            for (let item in data) {
                console.log(data[item]);
                lsObj.push(data[item]);
            }
            lsObj.push({label: "空", value: ""});

            this.mz_list = lsObj;
        });
        //  文化程度 下拉列表
        this.selectList.getSelectList('B_HCY', 'WHCDDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            let lsObj = [];
            for (let item in data) {
                console.log(data[item]);
                lsObj.push(data[item]);
            }
            lsObj.push({label: "空", value: ""});
            this.whcd_list = lsObj;
        });
        //  从业状况 下拉列表
        this.selectList.getSelectList('B_HCY', 'CYZKDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            // data.push({label: "kong", value: null});
            let lsObj = [];
            for (let item in data) {
                console.log(data[item]);
                lsObj.push(data[item]);
            }
            lsObj.push({label: "空", value: ""});
            this.cyzk_list = lsObj;
        });
        //  性别 下拉列表
        this.selectList.getSelectList('B_HCY', 'XBDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.xb_list = data;
            this.xb_list_copy = JSON.parse(JSON.stringify(this.xb_list));
        });


        //  婚姻状况 下拉列表
        this.selectList.getSelectList('B_HCY', 'HYDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.hyzk_list = data;
        });
        //  户别代码 下拉列表
        this.selectList.getSelectList('B_HCY', 'HBDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.hbdm_list = data;
        });


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
            console.log(index);
            console.log(this.zydlTop);
            console.log(this.zydlLeft);
        }
        if (this.type != 'view') {
            this.isShowArea = this.isShowArea ? false : true;
        }
    }

    //   选择人
    selectPerson(person, i) {
        this.hcy = person;
        this.name_active_key = i;

        this.hyzk = this.hcy.hydm;
        this.xb = this.hcy.xbdm;
        this.sfldldm = this.hcy.sfldl;
        this.hb = this.hcy.hbdm;
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
        console.log(event);
        this.zzcModel = false;
        this.isShowWhcd = false;
        if (event) {
            if (this.selectedType == 1) {
                console.log(this.selectedType);
                this.hcy.whcddm = event.dm;
                this.hcy.whcdmc = event.mc;
                let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
                this.add_person_data = res.add_data;
                this.update_person_data = res.update_data;

            } else {
                this.tableSelecValue['whcdmc'] = event.mc;
                this.tableSelecValue['whcddm'] = event.dm;
                let res = this.InputChange.get_select_change(this.tableSelecValue, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
                this.add_person_data = res.add_data;
                this.update_person_data = res.update_data;
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
                let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
                this.add_person_data = res.add_data;
                this.update_person_data = res.update_data;

            } else {
                this.tableSelecValue['hkqkmc'] = event.mc;
                this.tableSelecValue['hkqkdm'] = event.dm;
                let res = this.InputChange.get_select_change(this.tableSelecValue, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
                this.add_person_data = res.add_data;
                this.update_person_data = res.update_data;
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
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HJBXX&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.zydlTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_HJBXX&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.zydlTableList = res['returnObject'];
                    });
            }
        }
    }

    getChildZydl(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowZydl = false;
        if (event) {
            if (this.selectedType == 1) {
                console.log(this.selectedType);
                this.hcy.zydldm = event.dm;
                this.hcy.zydlmc = event.mc;
                let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
                this.add_person_data = res.add_data;
                this.update_person_data = res.update_data;
            } else {
                this.tableSelecValue['zydlmc'] = event.mc;
                this.tableSelecValue['zydldm'] = event.dm;
                let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
                this.add_person_data = res.add_data;
                this.update_person_data = res.update_data;
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
            console.log(index);
            console.log(this.zydlTop);
            console.log(this.zydlLeft);
        }
        if (this.type != "view") {
            this.isShowDcfw = this.isShowDcfw ? false : true;
            if (!this.dcfwTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HJBXX&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_HJBXX&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
                let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
                this.add_person_data = res.add_data;
                this.update_person_data = res.update_data;
            } else {
                this.tableSelecValue['dcfwmc'] = event.mc;
                this.tableSelecValue['dcfwdm'] = event.dm;
                console.log(this.name_active_key);
                let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
                this.add_person_data = res.add_data;
                this.update_person_data = res.update_data;
            }
        }
        console.log(this.update_person_data);
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
            console.log(index);
            console.log(this.zydlTop);
            console.log(this.zydlLeft);
        }
    }

    qrrqClickTime(event) {
        this.tableSelecValue.qrrq = event;
        let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;
        this.isShowQrrq = false;
        this.zzcModel = false;
    }

    showQcrqBlock(index) {
        this.zzcModel = true;
        this.isShowQcrq = this.isShowQcrq ? false : true;
        let dcfw = document.getElementById("qcrq");
        if (dcfw) {
            let top = $('#qcrq').offset().top;
            let left = $('#qcrq').offset().left;
            this.zydlLeft = left + 130 + "px";
            this.zydlTop = top + index * 30 - 20 + "px";
            console.log(index);
            console.log(this.zydlTop);
            console.log(this.zydlLeft);
        }
    }

    qcrqClickTime(event) {
        this.tableSelecValue.qcrq = event;
        let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;
        this.isShowQcrq = false;
        this.zzcModel = false;
    }

    showCsrqBlock(index) {
        this.zzcModel = true;
        this.isShowCsrq = this.isShowCsrq ? false : true;
        let dcfw = document.getElementById("csrq");
        if (dcfw) {
            let top = $('#csrq').offset().top;
            let left = $('#csrq').offset().left;
            this.zydlLeft = left + 130 + "px";
            this.zydlTop = top + index * 30 - 20 + "px";
            console.log(index);
            console.log(this.zydlTop);
            console.log(this.zydlLeft);
        }
    }

    csrqClickTime(event) {
        this.tableSelecValue.csrq = event;
        let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;
        this.isShowCsrq = false;
        this.zzcModel = false;
    }

    // 为每个select绑定事件
    getChildSelect(e, zd) {
        console.log(e);
        console.log(zd);
        this.tableSelecValue[zd] = e;
        console.log(this.tableSelecValue);
        let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;
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
        this.isShowQcrq = false;
        this.isShowCsrq = false;
        this.isShowQrrq = false;
        this.isShowHkqk = false;
        this.isShowWhcd = false;
        this.zzcModel = false;
    }


    addPerson(): void {
        console.log(this.childInfo);

        this.tableList.push({
            "mc": "",
            'sfzh': '',
            'szxzqhdm': this.childInfo ? this.childInfo.ssxzqhdm : "",
            'xzqhmc': this.childInfo ? this.childInfo.xzqhmc : "",
            'zydldm': this.childInfo ? this.childInfo.zydldm : "",
            'zydlmc': this.childInfo ? this.childInfo.zydlmc : "",
            'dcfwdm': this.childInfo ? this.childInfo.dcfwdm : "",
            'dcfwmc': this.childInfo ? this.childInfo.dcfwmc : "",
            'xbdm': "",
            'mzdm': "",
            'yhzgxdm': "",
            'csrq': "",
            'whcddm': "",
            'hydm': "",
            "sfkgr": 1,
            'sfsldl': "",
            'qrrq': '',
            'qcrq': '',
            'hkszd': "",
            'rs': "",
            'bz': "",
            'id': new Date().getTime()

        });


        let that = this.defaultPerson;
        let tablePerson = this.tablePerson;

        setTimeout(function () {
            console.log(that);
            if (that.last) {
                console.log(that.last.nativeElement);
                that.last.nativeElement.click();
            }
            if (tablePerson.last) {
                tablePerson.last.nativeElement.click();
            }

        }, 0);

        this.hcy_count = this.tableList.length;
        this.hcy = this.tableList[this.tableList.length - 1];
        console.log(this.hcy);

        this.tableList = this.tableList.slice();


        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);

        //this.add_person_data[this.hcy['id']]=this.hcy;
        this.update_person_data = res.update_data;
        // this.add_person_data = res.add_data;

        //   this.add_person_data.push(this.tableList[this.hcy_count-1]);

        console.log(this.add_person_data);
        console.log(this.tableList);
        console.log(this.person);

    }


    //  删除成员
    delPerson() {


        if (this.tableList.length > 0) {
            //  记录删除id
            if (this.hcy['id'] != undefined && this.hcy['id'].toString().length == 32) {
                console.log(this.hcy['id']);
                this.del_person_data.push({'id': this.hcy['id']});

                //  如果删除的户成员在修改列表中存在，则从修改列表中删除
                this.tableList.forEach((value, index, arr) => {
                    if (value['id'] == this.hcy['id']) {
                        delete this.update_person_data[index];
                    }
                });
                console.log(this.update_person_data);
                console.log(this.del_person_data);
            } else {

                delete this.add_person_data[this.hcy['id']];
                console.log(this.add_person_data);


            }


            this.tableList.splice(this.name_active_key, 1);
            if (this.tableList[0] != undefined && this.name_active_key > 0) {
                this.selectPerson(this.tableList[this.name_active_key - 1], this.name_active_key - 1);
                this.hcy_count = this.hcy_count - 1;

            } else if (this.tableList[0] != undefined && this.name_active_key == 0) {

                this.selectPerson(this.tableList[this.name_active_key], this.name_active_key);
                this.hcy_count = this.hcy_count - 1;

            } else {


                this.hcy_count = 0;

            }

        }

        this.tableList=this.tableList.slice();


    }


    //  上一条
    up() {
        if (this.name_active_key > 0) {
            this.selectPerson(this.tableList[this.name_active_key - 1], this.name_active_key - 1);
        }

    }

    //  下一条

    down() {
        console.log(this.tableList.length);
        if (this.name_active_key < this.tableList.length - 1) {
            this.selectPerson(this.tableList[this.name_active_key + 1], this.name_active_key + 1);
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
                this.tableSelecValue.xzqhmc = e.qc;
                this.tableSelecValue.szxzqhdm = e.dm;
            }


            this.hcy.xzqhmc = e.qc;
            this.hcy.szxzqhdm = e.dm;
            this.isShowArea = false;
        } else {
            this.isShowArea = false;
            this.zzcModel = false;
        }
    }


    getQrrqDate(event) {
        console.log(event);
        console.log(this.tableSelecValue);
        if (event) {
            if (this.selectedType == 1) {
                console.log(this.selectedType);
                this.hcy.qrrq = event;
                let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
                this.add_person_data = res.add_data;
                this.update_person_data = res.update_data;
            } else {
                this.tableSelecValue['qrrq'] = event;
                let res = this.InputChange.get_value_change(this.tableSelecValue, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
                this.add_person_data = res.add_data;
                this.update_person_data = res.update_data;
            }
        }
    }

    getQcrqDate(event) {
        this.hcy.qcrq = event;


        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;

        console.log(this.add_person_data);

    }


    getCsrqDate(event) {
        this.hcy.csrq = event;
        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;
        console.log(this.add_person_data);

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


        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;
        console.log(this.add_person_data);


    }

    //  户口情况
    eventHkqk(event) {
        this.hcy.hkqkdm = event;


        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;
        console.log(this.add_person_data);


    }

    //  是否空挂人
    eventSfkgr(event) {
        console.log(event);
        this.hcy.sfkgr = event.option.value;


        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;
        console.log(this.add_person_data);
    }

    //  调查范围
    eventDcfw(event) {
        this.hcy.dcfwdm = event;


        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;

        console.log(this.add_person_data);
    }

    //  专业大类
    eventZydl(event) {
        this.hcy.zydldm = event;


        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;

        console.log(this.add_person_data);
    }

    //  婚姻状况
    eventHyzt(event) {

        this.hcy.hydm = event;
        console.log(this.hcy.hydm);

        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;
        console.log(this.add_person_data);
    }

    //  从业情况
    eventCyqk(event) {
        this.hcy.cyzkdm = event;


        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;


        console.log(this.add_person_data);
        console.log(this.update_person_data);
    }

    //  民族
    eventMz(event) {
        this.hcy.mzdm = event;


        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;
        console.log(this.update_person_data);

        console.log(this.add_person_data);
    }

    tableChange(e) {
        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;
        console.log('1111111');
    }

    //  性别
    eventXb(event) {


        if (this.xb == this.hcy.xbdm) {
            this.xb = null;
            this.hcy.xbdm = null;
        } else {
            this.hcy.xbdm = this.xb;
            this.xb = this.xb;
        }

        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;
        console.log(this.add_person_data);

    }

    //  与户主关系
    eventYhzgx(event) {

        this.hcy.yhzgxdm = event;
        console.log(this.hcy.yhzgxdm);

        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;
        console.log(this.update_person_data);

        console.log(this.add_person_data);
    }

    //  户别

    eventHb(event) {


        this.hcy.hbdm = event;
        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;
        console.log(this.add_person_data);

    }


    //  是否劳动力
    eventSFLDL(event) {

        if (this.sfldldm == this.hcy.sfsldl) {
            this.sfldldm = null;
            this.hcy.sfsldl = null;
        } else {
            this.hcy.sfsldl = this.sfldldm;
            this.sfldldm = this.sfldldm;
        }

        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;
        console.log(this.add_person_data);
        console.log(this.update_person_data);

    }

    //  备注
    eventBz(event) {


        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;

        console.log(this.add_person_data);
        console.log(this.update_person_data);

    }


    eventXm() {

        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;

        console.log(this.add_person_data);
        console.log(this.update_person_data);
    }

    eventSzzdgc() {
        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;

        console.log(this.add_person_data);
        console.log(this.update_person_data);
    }


    eventSzzggc() {
        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;

        console.log(this.add_person_data);
        console.log(this.update_person_data);
    }

    eventCym() {
        let res = this.InputChange.get_select_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);
        this.add_person_data = res.add_data;
        this.update_person_data = res.update_data;

        console.log(this.add_person_data);
        console.log(this.update_person_data);
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
};





