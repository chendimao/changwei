import {Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SelectItem, DataTableModule, SharedModule, LazyLoadEvent, FilterMetadata} from 'primeng/primeng';
import { ValuChangeService } from "../../../../../../service/valuChange.service";
import * as $ from "jquery";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {HttpService} from "../../../../../../service/http-service";
import {SelectListHttpService} from "../../../../../../service/select-list-http.service";
import {InputChangeService} from "../../../../../../service/input-change.service";
import {ActivatedRoute, Params} from "@angular/router";


@Component({
  selector: 'app-qsr',
  templateUrl: './qsr.component.html',
  styleUrls: ['../children.css']
})
export class QsrComponent implements OnInit {
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


    public  zzcModel: boolean = false;
    public  ch:any;


    area: string;
    @ViewChild('person') person: NgForm;
    @ViewChildren('defaultPerson') defaultPerson: QueryList<ElementRef>;


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
        console.log(this.isShowZydl);

        if (this.tableList && this.tableList.length > 0) {
            //   订阅表单值改变事件
            this.person.valueChanges.subscribe(data => {


                    if (this.tableList && this.tableList.length > 0) {

                        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);

                        this.add_person_data = res.add_data;
                        this.update_person_data = res.update_data;


                    }


                }
            );
        }


    }

    ngOnInit() {


        console.log(this.childInfo2);
        console.log(this.childInfo);
        console.log(this.qshflId);
        this.selectedType = 1;



        this.tableList = this.childInfo2;


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

            this.ssgcdm = this.childInfo.ssgcdm;
            this.ssxzqhdm = this.childInfo.ssxzqhdm;
        }else{
            this.ssgcdm = this.childInfo.ssgcdm;
            this.ssxzqhdm = this.childInfo.ssxzqhdm;
            this.isDisabled = true;
        }


        console.log(this.ssgcdm);


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
        console.log(this.type);
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

    //关闭遮罩层
    closeZzc() {
        this.isShowZydl = false;
        this.isShowDcfw = false;
        this.isShowArea = false;
        this.isShowQcrq=false;
        this.isShowCsrq=false;
        this.isShowQrrq=false;
        this.isShowHkqk=false;
        this.isShowWhcd=false;
        this.zzcModel = false;
    }


    addPerson(): void {
        console.log(this.childInfo);

        this.tableList.push({
            "mc": "",
            'sfzh': '',
            'szxzqhdm': this.childInfo?this.childInfo.ssxzqhdm:"",
            'xzqhmc': this.childInfo?this.childInfo.xzqhmc:"",
            'zydldm': this.childInfo?this.childInfo.zydldm:"",
            'zydlmc': this.childInfo?this.childInfo.zydlmc:"",
            'dcfwdm': this.childInfo?this.childInfo.dcfwdm:"",
            'dcfwmc': this.childInfo?this.childInfo.dcfwmc:"",
            "sfkgr":null,
            'bz': "",
            'id': new Date().getTime()

        });


        let that = this.defaultPerson;

        setTimeout(function () {
            console.log(that);
            console.log(that.last);
            console.log(that.last.nativeElement);
            that.last.nativeElement.click();
        }, 0);

        this.hcy_count = this.tableList.length;
        console.log(this.hcy);

        //   this.add_person_data.push(this.tableList[this.hcy_count-1]);

        console.log(this.add_person_data);
        console.log(this.tableList);

        this.hcy = this.tableList[this.tableList.length-1];
        console.log(this.hcy);


        let res = this.InputChange.get_value_change(this.hcy, this.name_active_key, this.init_person_data, this.update_person_data, this.add_person_data);

        this.add_person_data[this.hcy['id']]=this.hcy;
        this.update_person_data = res.update_data;

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

                this.add_person_data.splice(this.name_active_key, 1);
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

        if (this.tableList.length == 0) {

        }


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


    //  备注
    eventBz(event) {
        this.hcy.bz = event;


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