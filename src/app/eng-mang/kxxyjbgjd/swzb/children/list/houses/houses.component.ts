import {Component, ElementRef, OnInit, QueryList, EventEmitter, ViewChild, ViewChildren} from '@angular/core';

import {
    SelectItem, DataTableModule, SharedModule, LazyLoadEvent, FilterMetadata, TreeTable, Tree
} from 'primeng/primeng';
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";

import {Message} from "../../../../../../../assets/_primeng@4.2.1@primeng/components/common/message";
import {HttpService} from "../../../../../../service/http-service";
import {NgForm} from "@angular/forms";
import {ValuChangeService} from "../../../../../../service/valuChange.service";
import {SelectListHttpService} from "../../../../../../service/select-list-http.service";
import {InputChangeService} from "../../../../../../service/input-change.service";


import * as _ from 'lodash';
import {SearchService} from "../../../../../../service/search.service";
import "rxjs/add/operator/debounceTime";


@Component({
    selector: 'app-houses',
    templateUrl: './houses.component.html',
    styleUrls: ['../children.css']
})
export class HousesComponent implements OnInit {
    moreText: string = "显示更多内容";
    msgs: Message[] = [];
    selectedCity2: string;
    moreInput: boolean = false;
    types: SelectItem[];
    public selectedType: string;
    types2: SelectItem[];
    public selectedType2: string;
    types3: SelectItem[];
    public selectedType3: string;
    private num1: any;
    public houesList = new Array();
    private num2: any;
    private num: any;
    public isShowArea: boolean = false;
    showTable: any = 1;
    private ch;


    public name_active_data: any; //选中样式
    public name_active_base: any; //选中样式
    public selectPersonList = new Array(); //新增下拉列表
    public displaySelectPserson: boolean = false; //显示隐藏新增人员下拉列表
    public childInfo2;
    public data;
    public childInfo;
    public selectedFile: TreeTable;
    public selectListHzgx: { label: string; value: { id: number; name: string; code: string } }[];


    public del_houses_data = new Array(); //删除的数据
    public init_houses_data; //初始化的数据
    public update_houses_data; //对比后修改的数据
    public add_houses_data = new Array(); //新增的数据
    public type; //新增、修改、查看
    public yhzgx_list: any; //与户主关系下拉列表

    public sfkgr: number = 0; //是否空挂人
    public sfldl: number = 0; //是否劳动力
    public zydl_list: any; //专业大类

    public fwxz_list: any; //房屋性质
    public fwzyyt_list: any;//房屋主要用途
    public dcfw_list: any;//调查范围
    public dcfw_list_is_show = 0;//调查范围显示
    public dcfw_mc;
    public hbdm_list: any;//户别代码 列表
    public name_active_key = 0;
    public qshflId;
    public ssgcdm; //所属工程代码
    public ssxzqhdm //所属行政区划代码
    public bj_houses_data; //初始化数据标记
    public bj_houses_new_data; //初始化新增数据标记
    public flxx_houses_update = new Array(); //分类信息
    public flxx_houses_add = new Array(); //分类信息新增
    public flxx_houses_del = new Array(); //分类信息删除

    public GgmxIndex: any = 0; //当前选中规格明细行下标
    public add_ggmx_data = new Array(); //新增的规格明细
    public add_person_ggmx_data = new Array(); //新增户成员的规格明细
    public update_ggmx_data = new Array(); //修改的规格明细
    public del_ggmx_data = new Array(); //删除的规格明细
    public list_ggmx_data = new Array(); //当前规格明细列表
    public list_ggmx_data_copy = new Array(); // 规格明细初始值
    public ssfwjbxxId: any;
    public fwjgdm: any;
    public zbflId: any; //当前选中指标分类ID
    public ggmx = new Array();  //当前规格明细
    public ggmx_count: any; //规格明细数量
    public listHcyAdd = new Array(); //完全新增的户成员
    public flxx_is_checked = 0; //分类信息选中
    public isShow = true; //显示分类信息非空项
    public houses_name_active_base_copy;
    public houses_name_active_base_copy2;
    public szxzqugldm;
    public is_disabled = false; //如果点击显示非空，则禁用分类信息输入框
    public jzzmj = 0; //建筑总面积
    public searchKeyword: string = "";  // 分类信息搜索关键词
    public isDisabled = false;
    public init_name_active_base; // 分类信息初始化
    public toggle_flxx_add;
    private tableList = new Array(); //为了规格信息有字典项名称
    public test: number;
    public ggmxTotals: number;  // 规格明细建筑总面积

    @ViewChild('person') person2: NgForm;
    @ViewChild('ggmxlist') ggmxlist: NgForm;
    @ViewChild('flxxform') flxxform: NgForm;
    @ViewChildren('defaultPerson') defaultPerson;

    public now_data: any;


    //============下拉列表属性================


    //专业大类
    public zydlTableList: any;
    public zydlTreeList: any;
    public isShowZydl = false;
    //调查范围
    public dcfwTableList: any;
    public dcfwTreeList: any;
    public isShowDcfw = false;
    //房屋性质
    public fwxzTableList: any;
    public fwxzTreeList: any;
    public isShowFwxz = false;
    //房屋主要用途
    public fwzyytTableList: any;
    public fwzyytTreeList: any;
    public isShowFwzyyt = false;

    //用途及结构
    public ytjjgTableList: any;
    public ytjjgTreeList: any;
    public isShowytjjg = false;
    public sfwhfc: any;
    public sfxw: any;

    //============End 下拉列表属性================


    constructor(public searchService: SearchService, public InputChange: InputChangeService, public selectList: SelectListHttpService, public ValuChangeService: ValuChangeService, public HttpService: HttpService, public DataProcessing: DataProcessingService) {
        this.types = [];
        this.types.push({label: '是', value: '1'});
        this.types.push({label: '否', value: '0'});
        this.types2 = [];
        this.types2.push({label: '是', value: '1'});
        this.types2.push({label: '否', value: '0'});
        this.types3 = [];
        this.types3.push({label: '分类汇总', value: '1'});
        this.types3.push({label: '规格明细', value: '2'});

        // this.selectListHzgx = [
        //     {label: '蔡国成', value: {id: 1, name: '蔡国成', code: 'NY'}},
        //     {label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}},
        //     {label: 'London', value: {id: 3, name: 'London', code: 'LDN'}},
        //     {label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}},
        //     {label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}}
        // ];


    }


    ngAfterViewInit(): void {


        if (this.houesList != undefined && this.houesList.length > 0) {
// 订阅表单值改变事件
            this.person2.valueChanges.debounceTime(500).subscribe(data => {

                    if (this.houesList.length > 0) {
                        if (this.name_active_data.qsrId.toString().length != 32) { // 如果权属人ID等于32位也就是说 在数据库中已经存在的户成员


                            this.listHcyAdd = this.InputChange.get_add_change(this.childInfo2, this.name_active_data, this.listHcyAdd, 'listFwAdd');

                            console.log(this.listHcyAdd);

                        } else {


                            let res = this.InputChange.get_value_change(this.name_active_data, this.name_active_key, this.init_houses_data, this.update_houses_data, this.add_houses_data);

                            this.add_houses_data = res.add_data;
                            this.update_houses_data = res.update_data;
                        }
                    }


                    console.log(this.add_houses_data);
                    console.log(this.update_houses_data);


                }
            );


            if (this.ggmx && this.ggmx.length > 0) {
                // 订阅表单值改变事件
                this.ggmxlist.valueChanges.subscribe(data => {

                    if (this.ggmx && this.ggmx.length > 0) {
                        console.log(this.list_ggmx_data_copy);
                        console.log(this.list_ggmx_data);
                        let res = this.InputChange.get_ggmx_change(this.list_ggmx_data_copy, this.list_ggmx_data, this.update_ggmx_data, this.add_ggmx_data);

                        this.update_ggmx_data = res['update_data'];
                        this.add_ggmx_data = res['add_data'];

                        console.log(this.update_ggmx_data);
                        console.log(this.add_ggmx_data);

                        this.ggmx.forEach((item,key,arr) => {
                            console.log(item.jzmj);

                            if(item.jzmj){
                                this.ggmxTotals +=item.jzmj;
                            }

                        });


                    }


                });

            }
        }


    }


    ngOnInit() {
        this.ggmxTotals=0;
        console.log(typeof this.test);

        //所属行政区划代码和工程代码
        if (this.type == 'add') {
            this.ssgcdm = this.qshflId.ssgcdm;
            this.ssxzqhdm = this.qshflId.ssxzqhdm;

        } else if (this.type == 'rew') {

            this.ssgcdm = this.qshflId.ssgcdm;
            this.ssxzqhdm = this.qshflId.ssxzqhdm;


        } else {
            console.log(this.person2);
            //this.person2.form.disable(false);
            // this.ggmxlist.form.disable(true);
            //this.flxxform.form.disable(true);
            this.isDisabled = true;
            this.is_disabled = true;
        }


        this.selectPersonList.push({label: '选择户成员', value: -1});
        if (this.childInfo2) {

            this.childInfo2.forEach((value, index, arr) => {

                this.selectPersonList.push({label: value['mc'], value: value['id']});

            });
        }

        //
        // let oninit_res = this.TabCommon.Oninit(this.data,this.name_active_data,this.houesList,this.name_active_base,this.bj_houses_data);
        //
        // this.data = oninit_res.data;
        // this.name_active_data = oninit_res.name_active_data;
        // this.name_active_base = oninit_res.name_active_base;
        // this.houesList = oninit_res.List;
        // this.bj_houses_data = oninit_res.bj_data;

        if (this.data['returnObject']['datalist']) {
            if (this.data['returnObject']['datalist'][0] != undefined) {


                this.name_active_data = [new HousesData('', '', '', '', '', '', new Date().getTime(), '', '', '', '', [], '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '')];

                this.houesList = this.data['returnObject']['datalist'];  //户成员信息
                console.log(this.houesList);
                this.name_active_data = this.houesList[0];   //默认选中第一个户成员


                if (this.name_active_data['list'] != undefined) {

                    this.name_active_base = this.name_active_data['list'];
                    // this.name_active_base = this.name_active_base.slice();

                } else {
                    this.name_active_base = this.data['returnObject']['baseList'];
                }

                if (this.init_houses_data['datalist'] != undefined && this.init_houses_data['datalist'].length > 0) {

                    this.init_name_active_base = this.init_houses_data['datalist'][0]['list'];
                }


// =============== start 规格明细  =======================

                if (this.name_active_data['ggmxxxList']) {

                    this.ggmx = this.name_active_data['ggmxxxList'];

                } else {

                    this.ggmx = null;

                }


                if (this.ggmx && this.ggmx.length > 0) {


                    this.ggmx.forEach((value, index, arr) => {
                        arr[index].xh = index;

                    })

                    this.list_ggmx_data = this.ggmx;
                    this.list_ggmx_data_copy = _.cloneDeep(this.init_houses_data['datalist'][this.name_active_key]['ggmxxxList']);

                    // this.ggmx = this.list_ggmx_data;
                    this.ggmx = this.ggmx.slice();
                    console.log(this.ggmx);

                    console.log(this.init_houses_data['datalist']);
                    console.log(this.list_ggmx_data_copy);
                    console.log(this.name_active_key);


                }


                console.log(this.update_houses_data);
                //递归给 添加规格明细
                // this.name_active_base.forEach((value,index,arr)=>{
                //     this.InputChange.get_fxll_id(arr[index],this.zbflId,this.ggmx);
                //
                // });


// =============== end 规格明细  =======================

                this.sfwhfc = this.name_active_data.sfwhfc;
                this.sfxw = this.name_active_data['sfxw'];

            } else {
                console.log(this.data['returnObject']['datalist']);
                this.houesList = this.data['returnObject']['datalist'];  //户成员信息
                this.name_active_data = null;
                this.name_active_base = this.data['returnObject']['baseList'];
            }
        } else {
            console.log(this.data['returnObject']['datalist']);
            this.data['returnObject']['datalist'] = new Array();
            this.houesList = this.data['returnObject']['datalist'];  //户成员信息

            this.name_active_base = this.data['returnObject']['baseList'];
        }


        //转换数据格式

        console.log(this.bj_houses_data);
        if (this.bj_houses_data == 1) {
            this.bj_houses_data = 0;
            if (this.data['returnObject']['datalist'] && this.data['returnObject']['datalist'].length > 0) {

                this.houesList.forEach((value, index, arr) => {
                    console.log(value);
                    value.list.forEach((val, i, ar) => {
                        ar[i] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(val, 'childList', 'children', '', ''));

                    });
                    console.log(value);
                });

            }

            this.data['returnObject']['baseList'].forEach((val, i, ar) => {
                ar[i] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(val, 'childList', 'children', '', ''));

            });

            if (this.init_houses_data['datalist'] != undefined && this.init_houses_data['datalist'].length > 0) {
                this.init_houses_data['datalist'].forEach((value, index, arr) => {
                    value.list.forEach((val, i, ar) => {
                        ar[i] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(val, 'childList', 'children', '', ''));


                    });

                });
            }

            this.init_houses_data['baseList'].forEach((val, i, ar) => {
                ar[i] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(val, 'childList', 'children', '', ''));

            });

            console.log(this.bj_houses_data);

        }
        console.log(this.bj_houses_data);


        this.selectedType3 = '1';
        this.selectedType = '1';
        this.selectedType2 = '1';

        console.log(this.name_active_data);

        console.log(this.name_active_base);


        if (this.name_active_base != null && this.name_active_base != "" && this.name_active_base.length > 0) {

            //初始化分类信息展开

            this.name_active_base.forEach((value, index, arr) => {

                this.DataProcessing.addExpand(arr[index]);
            });


            this.name_active_base.forEach((value, index, arr) => {

                console.log(this.name_active_base);
                //计算分类明细总面积

                this.jzzmj += this.InputChange.CalcSize2(this.name_active_base[index], 'jzmj', 0);


                setTimeout(() => {
                    //初始化的时候计算父节点的值
                    this.name_active_base[index] = this.CalcParent(this.name_active_base[index], this.name_active_base[index], index);
                    console.log(this.name_active_base[index]);


                }, 0);


            });

            console.log(this.name_active_base);


            if (this.houses_name_active_base_copy[0] == 0) {

                this.houses_name_active_base_copy[0] = _.cloneDeep(this.name_active_base);
                //this.houses_name_active_base_copy2 = _.cloneDeep(this.name_active_base);
                console.log(this.houses_name_active_base_copy[0]);

            } else {
                this.name_active_base = _.cloneDeep(this.houses_name_active_base_copy[0]);
                console.log(this.houses_name_active_base_copy[0]);

            }


        }


        console.log(this.childInfo2);
        console.log(this.update_houses_data);
        console.log(this.add_houses_data);
        console.log(this.del_houses_data);
        console.log(this.name_active_base);


    }


    //分类信息 初始化是计算父节点的值
    CalcParent(name_active_base, list, i) {


        if (list != undefined && list.length > 0) {
            list.forEach((value, index, arr) => {

                if (list[index].children != null) {
                    this.CalcParent(name_active_base, list[index].children, i);
                } else {
                    //if(list[index]['data']['sl'] == null || list[index]['data']['sl'] == ""){

                    // this.Tree_update(name_active_base,value,i);

                    if (list[index].parent != undefined) {
                        console.log(list[index].parent);

                        this.InputChange.get_data(list[index].parent, 'jzmj');


                    }

                    //  }

                }


            });
        }
        console.log(list);
        return list;


    }


//选择name改变样式
    selectName(name, i) {
        this.jzzmj = 0;
        if (this.houesList != undefined && this.houesList.length > 0) {
            console.log(this.houesList.length);
            console.log(this.houesList);


            this.name_active_key = i;
            this.name_active_data = name;


            this.selectedType3 = '1';

            this.flxx_is_checked = 0;

            console.log(this.name_active_data);


            if (this.name_active_data['list'] != undefined) {

                this.name_active_base = this.name_active_data['list'];
            } else {

                this.name_active_data['list'] = new Array();
                this.name_active_data['list'] = JSON.parse(JSON.stringify(this.data['returnObject']['baseList']))

            }

            if (this.name_active_data['ggmxxxList'] && this.name_active_data['ggmxxxList'].length > 0 && this.name_active_key < this.init_houses_data.datalist.length) {


                this.ggmx = this.name_active_data['ggmxxxList'];
                this.ggmx = this.ggmx.slice();
                this.list_ggmx_data = this.ggmx;
                this.list_ggmx_data_copy = _.cloneDeep(this.init_houses_data['datalist'][this.name_active_key]['ggmxxxList']);
                console.log(this.list_ggmx_data_copy);
                // this.ggmx = this.list_ggmx_data;

                if (this.ggmx && this.ggmx.length > 0) {


                    this.ggmx.forEach((value, index, arr) => {
                        arr[index].xh = index;

                    })
                }


            } else {

                this.ggmx = null;

            }


            if (this.init_houses_data['datalist'] != undefined && this.init_houses_data['datalist'][this.name_active_key] != undefined && this.init_houses_data['datalist'][this.name_active_key]['list']) {
                this.init_name_active_base = _.cloneDeep(this.init_houses_data['datalist'][this.name_active_key]['list']);
            } else {
                this.init_name_active_base = null;
            }


            //初始化分类信息展开

            this.name_active_base.forEach((value, index, arr) => {

                this.DataProcessing.addExpand(arr[index]);
            });


            this.name_active_base.forEach((value, index, arr) => {

                //计算分类明细总面积
                this.jzzmj += this.InputChange.CalcSize2(this.name_active_base[index], 'jzmj', 0);


                setTimeout(() => {
                    //初始化的时候计算父节点的值
                    this.name_active_base[index] = this.CalcParent(this.name_active_base[index], this.name_active_base[index], index);
                    console.log(this.name_active_base[index]);


                }, 0);

            });


            this.sfwhfc = this.name_active_data.sfwhfc;

        }


        // =============== start 规格明细  =======================

        if (this.name_active_data['ggmxxxList']) {

            this.ggmx = this.name_active_data['ggmxxxList'];

        } else {

            this.ggmx = null;

        }


        if (this.ggmx && this.ggmx.length > 0 && this.name_active_key < this.init_houses_data.datalist.length) {


            this.ggmx.forEach((value, index, arr) => {
                arr[index].xh = index;

            });

            this.list_ggmx_data = this.ggmx;
            this.list_ggmx_data_copy = _.cloneDeep(this.init_houses_data['datalist'][this.name_active_key]['ggmxxxList']);

            // this.ggmx = this.list_ggmx_data;
            this.ggmx = this.ggmx.slice();
            console.log(this.ggmx);

            console.log(this.init_houses_data['datalist']);
            console.log(this.list_ggmx_data_copy);
            console.log(this.name_active_key);


        }

        this.sfxw = this.name_active_data.sfxw;

        console.log(this.update_houses_data);
        //递归给 添加规格明细
        // this.name_active_base.forEach((value,index,arr)=>{
        //     this.InputChange.get_fxll_id(arr[index],this.zbflId,this.ggmx);
        //
        // });


// =============== end 规格明细  =======================


    }


    //新增房屋
    addHouses(event) {

        console.log(this.houesList);


        this.name_active_base = JSON.parse(JSON.stringify(this.init_houses_data['baseList']));
        console.log(this.name_active_base);
        //转换数据格式


        // this.name_active_base.forEach((value,index,arr)=>{
        //     this.name_active_base[index] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(value,'childList','children','',''));
        //
        // });
        let name = '';

        this.selectPersonList.forEach((value, index, arr) => {

            if (value['value'] == event) {

                name = value['label'];

            }

        });


        if (this.houesList != undefined && this.houesList.length > 0) {
            this.houesList.push(new HousesData('', '', '', '', '', '', new Date().getTime(), '', '', event, '', [], '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', name, '', '', '', '', '', '', '', '', '', '', '', ''));
            this.name_active_data = this.houesList[this.houesList.length - 1];
            this.name_active_data['list'] = this.name_active_base;
            this.name_active_key = this.houesList.length - 1;

        } else {
            this.houesList.push(new HousesData('', '', '', '', '', '', new Date().getTime(), '', '', event, '', [], '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', name, '', '', '', '', '', '', '', '', '', '', '', ''));
            this.name_active_data = this.houesList[0];
            this.name_active_data['list'] = this.name_active_base;


        }


        this.selectName(this.name_active_data, this.name_active_key);

        if (this.name_active_data.qsrId.toString().length != 32) { // 如果权属人ID等于32位也就是说 在数据库中已经存在的户成员

            console.log(this.listHcyAdd);
            this.listHcyAdd = this.InputChange.get_add_change(this.childInfo2, this.name_active_data, this.listHcyAdd, 'listFwAdd');

            console.log(this.listHcyAdd);

        } else {

            let res = this.InputChange.get_value_change(this.name_active_data, this.name_active_key, this.init_houses_data, this.update_houses_data, this.add_houses_data);

            this.add_houses_data = res['add_data'];
            this.update_houses_data = res['update_data'];

            for (let i in this.add_houses_data) {
                if (i == this.name_active_data['id']) {
                    this.add_houses_data[i] = this.name_active_data;
                }
            }


        }


        //将户成员基本信息带到房屋基本信息中
        this.childInfo2.forEach((value, index, arr) => {

            if (value['id'] == this.name_active_data['qsrId']) {
                for (var i in value) {
                    for (var ii in this.name_active_data) {
                        // this.name_active_data['swszxzqhdm']=value['szxzqhdm'];
                        if (i == ii && (i == 'szxzqhdm' || i == 'xzqhmc' || i == 'dcfwdm' || i == 'dcfwmc' || i == 'zydlmc' || i == 'zydldm')) {
                            console.log(i);
                            this.name_active_data[ii] = value[i];
                        }
                    }
                }
                if (value['szxzqhdm'] != null) {
                    this.name_active_data['swszxzqhdm'] = value['szxzqhdm'];
                    this.name_active_data['localitydesc'] = value['xzqhmc'];
                }

            }


        });


        //关闭下拉框
        this.displaySelectPserson = false;


        console.log(this.childInfo2);
        console.log(this.name_active_data);

        console.log(this.flxx_houses_del);
        console.log(this.flxx_houses_add);
        console.log(this.flxx_houses_update);

        console.log(this.add_houses_data);
        console.log(this.update_houses_data);
        console.log(this.del_houses_data);

        console.log(this.update_ggmx_data);
        console.log(this.del_ggmx_data);
        console.log(this.add_ggmx_data);

        console.log(this.name_active_data);
        console.log(this.name_active_base);


    }

    //删除人员
    deleteSlect() {

        if (this.houesList.length > 0) {


            console.log(this.houesList);
            //记录删除id

            console.log(this.name_active_data);
            console.log(this.name_active_key);
            if (this.name_active_data.qsrId.toString().length != 32) { // 如果权属人ID等于32位也就是说 在数据库中已经存在的户成员


                this.childInfo2.forEach((value, index, arr) => {
                    console.log(value);
                    if (value['id'] == this.name_active_data['qsrId']) {

                        delete this.listHcyAdd[value['id']]['listFwAdd'][this.name_active_data['id']];

                    }


                });
                console.log(this.listHcyAdd);

            } else {


                if (this.add_houses_data[this.name_active_data['id']]) {
                    delete this.add_houses_data[this.name_active_data['id']];
                }

                this.del_houses_data.push({'id': this.name_active_data['id']});

                //如果删除的户成员在修改列表中存在，则从修改列表中删除

                this.houesList.forEach((value, index, arr) => {
                    if (value['id'] == this.name_active_data['id']) {
                        delete this.update_houses_data[index];
                    }
                });
                console.log(this.del_houses_data);


            }


            //
            // this.houesList.splice(this.name_active_key,1);
            // if(this.houesList[0] != undefined && this.houesList.length>0  ){
            //
            //     if(this.name_active_key == 0){
            //         this.name_active_data = this.houesList[this.name_active_key+1];
            //         this.name_active_key = this.name_active_key+1;
            //     }else{
            //         this.name_active_data = this.houesList[this.name_active_key-1];
            //         this.name_active_key = this.name_active_key-1;
            //     }
            //
            //
            // }else if(this.houesList[0] != undefined && this.name_active_key==0){
            //
            //     this.name_active_data = this.houesList[this.name_active_key+1];
            //     this.name_active_key = this.name_active_key+1;
            //
            //
            // }else{
            //     this.name_active_data = '';
            //     this.name_active_base = '';
            //
            // }


            this.houesList.splice(this.name_active_key, 1);


            if (this.houesList[0] != undefined) {
                if (this.name_active_key == 0) {
                    this.name_active_data = this.houesList[0];
                } else if (this.name_active_key == this.houesList.length) {

                    this.name_active_key = this.name_active_key - 1;
                    this.name_active_data = this.houesList[this.name_active_key];

                } else {
                    this.name_active_data = this.houesList[this.name_active_key];

                }
            } else {
                this.name_active_data = '';
                this.name_active_base = '';
            }


        }

        this.selectName(this.name_active_data, this.name_active_key);


        console.log(this.flxx_houses_del);
        console.log(this.flxx_houses_add);
        console.log(this.flxx_houses_update);

        console.log(this.add_houses_data);
        console.log(this.update_houses_data);
        console.log(this.del_houses_data);

        console.log(this.update_ggmx_data);
        console.log(this.del_ggmx_data);
        console.log(this.add_ggmx_data);


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

        console.log(this.fwjgdm);
        console.log(now_data);
        console.log(this.init_name_active_base);
        if (this.houesList != undefined && this.houesList.length > 0) {
            this.now_data = now_data;
            console.log(this.now_data);
            console.log(this.name_active_base);
            console.log(this.name_active_data);
            if (this.now_data.parent != undefined) {

                this.InputChange.get_data(this.now_data.parent, 'jzmj');


            }


            this.name_active_base[i] = data;
            this.ssfwjbxxId = this.name_active_data['id'];


            if (this.name_active_data.qsrId.toString().length == 32) {

                //已有房屋 更新分类信息
                if (this.name_active_data.id != undefined && this.name_active_data.id.toString().length == 32) {


                    //已有分类信息的
                    if (this.now_data['data']['id'] != null && this.now_data['data']['id'] != "") {

                        //如果当前分类信息值为空
                        if (this.now_data['data']['jzmj'] == null || this.now_data['data']['jzmj'] == "") {

                            //删除当前分类信息，将删除id放入flxx_houses_del字段
                            this.flxx_houses_del[this.now_data['data']['id']] = {id: this.now_data['data']['id']};


                            //如果之前该分类信息有更新，则删除flxx_houses_update中该分类信息的字段
                            for (let i in this.flxx_houses_update) {

                                console.log(this.flxx_houses_update[i].id);
                                console.log(this.now_data['data']['id']);
                                if (this.flxx_houses_update[i].id == this.now_data['data']['id']) {
                                    delete this.flxx_houses_update[i];
                                    console.log(this.flxx_houses_update[i]);
                                }

                            }


                            for (let i  in this.flxx_houses_add) {
                                console.log(this.flxx_houses_add[i]['zbflId']);
                                console.log(this.now_data['data']['zbflId']);
                                if (this.flxx_houses_add[i]['zbflId'] == this.now_data['data']['zbflId']) {
                                    delete this.flxx_houses_add[i];
                                }
                            }


                        } else {

                            //如果当前分类信息不为空

                            let is_del = 0;

                            //判断在该分类信息是否应该被删除

                            for (let i in this.flxx_houses_del) {

                                if (this.flxx_houses_del[i]['id'] == this.now_data['data']['id']) {
                                    is_del = 1;
                                }
                            }


                            //如果不在 flxx_houses_del 中，则更新flxx_houses_update
                            if (is_del == 0) {
                                console.log(i);
                                console.log(this.init_name_active_base);
                                console.log(this.init_name_active_base[i]);
                                let res = this.InputChange.IsWith(this.init_name_active_base[i], this.fwjgdm, this.ssfwjbxxId, now_data['data']['jzmj'], 'jzmj', 'fwjgdm', 'ssfwjbxxId');
                                // let res2 = this.InputChange.IsWith(this.init_name_active_base[i],this.fwjgdm,this.ssfwjbxxId,now_data['data']['bz'],'bz','fwjgdm','ssfwjbxxId');
                                let res2 = this.InputChange.isWithBz2(this.init_name_active_base[i], now_data, now_data['data']['bz'], 'bz');


                                if (res == false || res2 == false) {
                                    this.flxx_houses_update[this.now_data['data']['id']] = new Array();
                                    this.flxx_houses_update[this.now_data['data']['id']] = {
                                        'id': this.now_data['data']['id'], 'jzmj': this.now_data['data']['jzmj'],
                                        'bz': this.now_data['data']['bz'], 'fwjgdm': this.now_data['data']['fwjgdm'],
                                        'zbflId': this.now_data['data']['zbflId'],
                                        'ssfwjbxxId': this.name_active_data.id
                                    };
                                    console.log(this.flxx_houses_update);
                                } else {

                                    delete this.flxx_houses_update[this.now_data['data']['id']];

                                }

                                console.log(this.flxx_houses_update);

                            } else {

                                //否则放入 flxx_houses_add中

                                if (this.flxx_houses_add[this.name_active_data['id'] + this.now_data['data']['zbflId']]) {
                                    this.flxx_houses_add[this.name_active_data['id'] + this.now_data['data']['zbflId']] = new Array();
                                }


                                this.flxx_houses_add[this.name_active_data['id'] + this.now_data['data']['zbflId']] = new Array();
                                this.flxx_houses_add[this.name_active_data['id'] + this.now_data['data']['zbflId']] = {
                                    'jzmj': this.now_data['data']['jzmj'], 'bz': this.now_data['data']['bz'],
                                    'fwjgdm': this.now_data['data']['fwjgdm'],
                                    'zbflId': this.now_data['data']['zbflId'], 'ssfwjbxxId': this.name_active_data.id
                                };


                            }

                        }

                    } else {

                        //已有房屋信息  完全新增的分类信息

                        if ((this.now_data['data']['jzmj'] == null || this.now_data['data']['jzmj'] == "") && (this.now_data['data']['bz'] == null || this.now_data['data']['bz'] == "")) {

                            //如果 当前分类信息为空，则判断flxx_houses_add中有没有该分类信息，如果有则删除
                            for (let i  in this.flxx_houses_add) {
                                console.log(this.flxx_houses_add[i]['zbflId']);
                                console.log(this.now_data['data']['zbflId']);
                                if (this.flxx_houses_add[i]['zbflId'] == this.now_data['data']['zbflId']) {
                                    delete this.flxx_houses_add[i];
                                }
                            }
                        } else {

                            //如果 当前分类信息不为空，则将当前分类信息添加到flxx_houses_add中

                            if (this.flxx_houses_add[this.name_active_data['id'] + this.now_data['data']['zbflId']] == undefined) {
                                this.flxx_houses_add[this.name_active_data['id'] + this.now_data['data']['zbflId']] = new Array();
                            }

                            console.log(this.now_data['data']);

                            this.flxx_houses_add[this.name_active_data['id'] + this.now_data['data']['zbflId']] = {
                                'jzmj': this.now_data['data']['jzmj'], 'bz': this.now_data['data']['bz'],
                                'fwjgdm': this.now_data['data']['fwjgdm'], 'zbflId': this.now_data['data']['zbflId'],
                                'ssfwjbxxId': this.name_active_data.id
                            };


                        }

                    }


                    console.log(this.flxx_houses_add);
                    console.log(this.flxx_houses_del);
                    console.log(this.flxx_houses_update);


                } else {
                    //新增的房屋
                    //如果建筑面积或者备注不为空则新增分类信息
                    if ((this.now_data['data']['bz'] != null && this.now_data['data']['bz'] != "") || (this.now_data['data']['jzmj'] != null && this.now_data['data']['jzmj'] != "" ) || (this.now_data['data']['sl'] != null && this.now_data['data']['sl'] != "") || (this.now_data['data']['fs'] != null && this.now_data['data']['fs'] != ""  )) {

                        if (this.name_active_data['flbmxList'] == undefined) {
                            this.name_active_data['flbmxList'] = new Array();
                        }
                        this.zbflId = now_data['data']['zbflId'];
                        this.name_active_data['flbmxList'][this.name_active_data['id'] + now_data['data']['zbflId']] = {
                            'id': now_data['data']['id'], 'jzmj': now_data['data']['jzmj'],
                            'bz': now_data['data']['bz'], 'fwjgdm': now_data['data']['fwjgdm'],
                            'zbflId': now_data['data']['zbflId'], 'ssfwjbxxId': this.name_active_data.id
                        };


                    } else {

                        if (this.name_active_data['flbmxList'] != null && this.name_active_data['flbmxList'][this.name_active_data['id'] + now_data['data']['zbflId']]) {
                            delete this.name_active_data['flbmxList'][this.name_active_data['id'] + now_data['data']['zbflId']];
                        }

                        console.log(this.listHcyAdd);

                    }
                    console.log(this.name_active_data);

                }


                let res = this.InputChange.get_value_change(this.name_active_data, this.name_active_key, this.init_houses_data, this.update_houses_data, this.add_houses_data);

                console.log(res);
                this.add_houses_data = res['add_data'];
                this.update_houses_data = res['update_data'];


            } else {

                console.log(this.now_data);


                if ((this.now_data['data']['jzmj'] != null && this.now_data['data']['jzmj'] != "") || (this.now_data['data']['bz'] != null && this.now_data['data']['bz'] != "")) {

                    if (this.name_active_data['flbmxList'] == undefined) {
                        this.name_active_data['flbmxList'] = new Array();
                    }
                    this.zbflId = now_data['data']['zbflId'];

                    this.name_active_data['flbmxList'][this.now_data['data']['zbflId']] = {
                        'id': this.now_data['data']['id'], 'jzmj': this.now_data['data']['jzmj'],
                        'bz': this.now_data['data']['bz'], 'fwjgdm': this.now_data['data']['fwjgdm'],
                        'zbflId': this.now_data['data']['zbflId'], 'ssfwjbxxId': this.name_active_data.id
                    };


                    this.listHcyAdd = this.InputChange.get_add_change(this.childInfo2, this.name_active_data, this.listHcyAdd, 'listFwAdd');

                } else {


                    if (this.name_active_data['flbmxList'] != null && this.name_active_data['flbmxList'][now_data['data']['zbflId']]) {
                        delete this.name_active_data['flbmxList'][now_data['data']['zbflId']];
                    }


                    this.listHcyAdd = this.InputChange.get_add_change(this.childInfo2, this.name_active_data, this.listHcyAdd, 'listFwAdd');


                }

            }


            console.log(this.listHcyAdd);
            console.log(this.flxx_houses_update);
            console.log(this.flxx_houses_add);
            console.log(this.flxx_houses_del);
            console.log(this.name_active_data);


            console.log(this.add_houses_data);
            console.log(this.ssfwjbxxId);
            console.log(this.name_active_base);


            console.log(this.isShow);
            let res = this.InputChange.showCheck3(this.name_active_base, 'fwjgdm');
            console.log(res);


            this.houses_name_active_base_copy[0][i] = this.InputChange.showCheck4(this.houses_name_active_base_copy[0][i], res, 'fwjgdm');
            console.log(this.houses_name_active_base_copy[0]);
            console.log(this.name_active_base);

            //计算分类明细总面积
            this.jzzmj = 0;
            this.name_active_base.forEach((value, index, arr) => {


                this.jzzmj += this.InputChange.CalcSize2(this.name_active_base[index], 'jzmj', 0);


            })

        }

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


    //分类信息选中
    TreeTableClick(e, data, now_data, i) {
        this.now_data = now_data;

        this.flxx_is_checked = 1;

        this.ssfwjbxxId = this.name_active_data['id'];
        console.log(this.ssfwjbxxId);

        console.log(e);

        this.zbflId = e.node.data.zbflId;


        this.fwjgdm = e.node.data.fwjgdm;
        console.log(this.fwjgdm);

        console.log(this.zbflId);


        //规格明细数量


        console.log(this.name_active_data);

        this.Tree_update(data, now_data, i);

    }

    //规格明细选中
    DatatableClick(e) {
        console.log(e);
        console.log(this.add_ggmx_data);


        this.ggmx.forEach((value, index, arr) => {
            if (value['xh'] == e.data['xh']) {
                this.GgmxIndex = index;
            }
        });


        this.ggmx[this.GgmxIndex]['zdxmc'] = this.searchService.searchByRegExp(this.ggmx[this.GgmxIndex]['fwjgdm'],this.tableList,'fwjgdm')[0]['zdxmc'];

        console.log(this.GgmxIndex);
        console.log(this.add_ggmx_data);
    }

    //新增规格明细
    addGgmx(e) {
        this.ssfwjbxxId = this.name_active_data['id'];

        if (this.ggmx == null) {
            this.ggmx = new Array();
        }
        console.log(this.ggmx);
        console.log(this.tableList);
        this.ggmx.push(new Ggmx(this.ggmx.length == 0 ? 0 : this.ggmx[this.ggmx.length - 1]['xh'] + 1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', this.tableList[0]['fwjgdm'], this.ssfwjbxxId));

        this.GgmxIndex = this.ggmx.length - 1;

        this.ggmx = this.ggmx.slice();

        let defaultPerson = this.defaultPerson;
        setTimeout(() => {
            console.log(defaultPerson);
            console.log(defaultPerson.last.nativeElement);
            defaultPerson.last.nativeElement.click();

        }, 0);
        console.log(this.ggmx[this.GgmxIndex]);


        if (this.name_active_data.qsrId.toString().length == 32) {

            if (this.name_active_data.id != undefined && this.name_active_data.id.toString().length == 32) {

                //已有房屋规格明细新增
                if (this.add_ggmx_data[this.name_active_data['id'] + this.ggmx[this.GgmxIndex]['xh']] == undefined) {
                    this.add_ggmx_data[this.name_active_data['id'] + this.ggmx[this.GgmxIndex]['xh']] = new Array();
                }

                this.add_ggmx_data[this.name_active_data['id'] + this.ggmx[this.GgmxIndex]['xh']] = this.ggmx[this.GgmxIndex];

            } else {

                //新增房屋规格明细新增
                if (this.name_active_data['ggmxxxList'] == undefined) {
                    this.name_active_data['ggmxxxList'] = new Array();
                }
                this.name_active_data['ggmxxxList'] = this.ggmx;

                console.log(this.name_active_data);

            }


        } else {

            //新增户成员 新增房屋

            this.add_person_ggmx_data.push(JSON.parse(JSON.stringify(this.ggmx[this.GgmxIndex])));

            console.log(this.add_person_ggmx_data);


            if (this.name_active_data['ggmxxxList'] == undefined) {
                this.name_active_data['ggmxxxList'] = new Array();
            }
            this.name_active_data['ggmxxxList'] = this.ggmx;
            console.log(this.name_active_data);
        }


        // //递归给 添加规格明细
        // this.name_active_base.forEach((value,index,arr)=>{
        //     this.InputChange.get_fxll_id(arr[index],this.zbflId,this.ggmx);
        //
        // });

        this.list_ggmx_data = this.ggmx;


        console.log(this.listHcyAdd);
        console.log(this.houesList);

        console.log(this.update_ggmx_data);
        console.log(this.add_ggmx_data);
        console.log(this.del_ggmx_data);
        console.log(this.ggmx);
        console.log(this.flxx_houses_add);
        console.log(this.flxx_houses_update);

        console.log(this.update_houses_data);
        console.log(this.add_houses_data);
        console.log(this.del_houses_data);

    }

    delGgmx() {
        console.log(this.ggmx[this.GgmxIndex]);
        this.ssfwjbxxId = this.name_active_data['id'];

        if (this.ggmx && this.ggmx.length > 0) {


            let defaultPerson = this.defaultPerson;

            if (defaultPerson.last != undefined) {
                console.log(defaultPerson);
                setTimeout(() => {
                    if (this.GgmxIndex == 0) {
                        defaultPerson._results[this.GgmxIndex].nativeElement.click();

                    } else {
                        defaultPerson._results[this.GgmxIndex - 1].nativeElement.click();

                    }

                }, 0);
            }


            this.ggmx = this.ggmx.slice();
            if (this.name_active_data.qsrId.toString().length == 32) {



                //如果为已有房屋
                if (this.name_active_data.id.toString().length == 32) {

                    //删除规格明细时，如果该规格明细修改过，则删除 update_ggmx_data对应的数据


                    //如果规格明细id不为空，则说明是数据库中已存在的规格明细
                    if (this.ggmx[this.GgmxIndex].id.toString().length == 32) {
                        for (let i in this.update_ggmx_data) {
                            if (this.update_ggmx_data[i]['id'] == this.ggmx[this.GgmxIndex]['id']) {

                                this.update_ggmx_data.splice(this.GgmxIndex, 1);
                            }
                        }


                        this.del_ggmx_data[this.ggmx[this.GgmxIndex]['id']] = {id: this.ggmx[this.GgmxIndex]['id']};

                        console.log(this.ggmx);
                        console.log(this.del_ggmx_data);

                    } else {


                        for (let i in this.add_ggmx_data) {
                            console.log(this.add_ggmx_data[i]);
                            if (this.add_ggmx_data[i]['xh'] == this.ggmx[this.GgmxIndex]['xh']) {
                                delete this.add_ggmx_data[i];
                            }

                        }


                    }

                } else {

                    this.name_active_data['ggmxxxList'] = this.ggmx;
                }


            } else {


                if (this.name_active_data['ggmxxxList'] == undefined) {
                    this.name_active_data['ggmxxxList'] = new Array();
                }

                this.name_active_data['ggmxxxList'] = this.ggmx;


            }


            //删除
            this.ggmx.splice(this.GgmxIndex, 1);

            console.log(this.update_houses_data);
            console.log(this.add_houses_data);
            console.log(this.del_houses_data);

            console.log(this.update_ggmx_data);
            console.log(this.add_ggmx_data);
            console.log(this.del_ggmx_data);
            console.log(this.ggmx);
            console.log(this.flxx_houses_add);
            // console.log(this.list_houses_ggmx_del);
            // console.log(this.list_houses_ggmx_edit);
            // console.log(this.list_houses_ggmx_add);

            console.log(this.listHcyAdd);


            //this.GgmxIndex = this.GgmxIndex -1 ;

        }
        // console.log(this.GgmxIndex);
        //  console.log(this.Car);
        // console.log(this.Car[this.GgmxIndex]);

        // 递归给 添加规格明细
        // this.name_active_base.forEach((value,index,arr)=>{
        //     this.InputChange.get_fxll_id(arr[index],this.zbflId,this.ggmx);
        //
        // })


    }

    //计算器模式

    calc(e, now_data) {

        if (e.key == 'Enter') {
            this.InputChange.calc(now_data, 'jzmj');
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
        console.log(this.ytjjgTreeList);
        this.DataProcessing.tableArr = [];
        let name_active_base_copy = _.cloneDeep(this.name_active_base);
        let ytjjgTreeList = new Array();
        name_active_base_copy.forEach((value, index, arr) => {
            value = _.cloneDeep(value);
            value = this.DataProcessing.returnTreeGgmx(value, 'fwjgdm');
            value.forEach((v, i, a) => {
                ytjjgTreeList.push(v);
            });
        });
        this.tableList = this.DataProcessing.changeTable(ytjjgTreeList);
        console.log(this.tableList);

        this.showTable = this.selectedType3;

        if (this.ggmx && this.ggmx.length > 0) {

            this.ggmx[this.GgmxIndex]['zdxmc'] = this.searchService.searchByRegExp(this.ggmx[this.GgmxIndex]['fwjgdm'], this.tableList, 'fwjgdm')[0]['zdxmc'];

            if (this.ggmx != null) {
                if (this.showTable == 2) {
                    let defaultPerson = this.defaultPerson;
                    setTimeout(() => {
                        console.log(defaultPerson);
                        console.log(defaultPerson.last.nativeElement);
                        defaultPerson.first.nativeElement.click();

                    }, 0);
                }
            }


        }





    }


    //分类信息搜索关键词

    searchList(searchKeyword) {
        this.searchKeyword = searchKeyword;

        if (this.houesList != undefined && this.houesList.length > 0) {
            this.name_active_base.forEach((value, index, arr) => {


                this.InputChange.delSearchRsut(this.houses_name_active_base_copy[0][index], 'searchRsut');

            });


            this.name_active_base = _.cloneDeep(this.houses_name_active_base_copy[0]);


            if (this.searchKeyword.trim() != "") {

                this.name_active_base.forEach((value, index, arr) => {

                    this.name_active_base[index] = this.InputChange.SearhTreeTable(this.name_active_base[index], this.searchKeyword.trim(), 'zdxmc');

                })
            }

            console.log(this.houses_name_active_base_copy[0]);
        }

        this.name_active_base.forEach((value, index, arr) => {

            console.log(this.name_active_base);
            //计算分类明细总面积
            this.jzzmj += this.InputChange.CalcSize2(this.name_active_base[index], 'jzmj', 0);

            setTimeout(() => {
                //初始化的时候计算父节点的值
                this.name_active_base[index] = this.CalcParent(this.name_active_base[index], this.name_active_base[index], index);
                console.log(this.name_active_base[index]);


            }, 0);


        });


    }


//==================下面下拉列表 ================================


    //权属人姓名

    eventQsr(e) {


        let name = '';
        this.selectPersonList.forEach((value, index, arr) => {
            console.log(value);
            if (e == -1) {
                this.name_active_data.qsrmc = '';
                this.name_active_data.qsrId = '';

            } else if (value['value'] == e) {
                name = value['label'];
                //this.name_active_data.qsrId = value['value'];
                this.name_active_data.qsrmc = value['label'];

            }

        });

        this.selectName(this.name_active_data, this.name_active_key);
        this.houesList[this.name_active_key] = this.name_active_data;


        console.log(this.name_active_data);
        console.log(this.name_active_base);
        console.log(e);


        if (this.name_active_data.qsrId.toString().length == 32) {


            console.log(this.name_active_data.id);


            if (this.init_houses_data['datalist'][this.name_active_key] != undefined && this.init_houses_data['datalist'][this.name_active_key]['id'] == this.name_active_data.id) {

                delete this.update_houses_data[this.name_active_key];

                this.del_houses_data[this.name_active_key] = ({'id': this.init_houses_data['datalist'][this.name_active_key]['id']});


                // 切换户成员时 删除上一个户成员的新增分类信息和规格明细
                for (let i in this.flxx_houses_add) {
                    console.log(this.flxx_houses_add[i]['ssfwjbxxId']);
                    console.log(this.name_active_data['id']);
                    if (this.flxx_houses_add[i]['ssfwjbxxId'] == this.name_active_data['id']) {
                        delete this.flxx_houses_add[i];
                    }
                }


                for (let i in this.add_ggmx_data) {
                    console.log(this.add_ggmx_data[i]['ssfwjbxxId']);
                    console.log(this.name_active_data['id']);
                    if (this.add_ggmx_data[i]['ssfwjbxxId'] == this.name_active_data['id']) {
                        delete this.add_ggmx_data[i];
                    }
                }


                console.log(this.flxx_houses_add);
                console.log(this.flxx_houses_update);
                console.log(this.flxx_houses_del);

                console.log(this.update_ggmx_data);
                console.log(this.del_ggmx_data);
                console.log(this.add_ggmx_data);

                console.log(this.del_houses_data);


            } else {


                for (let i in this.add_houses_data) {
                    console.log(i);
                    console.log(this.name_active_data['id']);
                    if (i == this.name_active_data['id']) {
                        delete this.add_houses_data[i];
                    }
                }

                console.log(this.add_houses_data);


                for (let i in this.flxx_houses_add) {
                    console.log(this.flxx_houses_add[i]['ssfwjbxxId']);
                    console.log(this.name_active_data['id']);
                    if (this.flxx_houses_add[i]['ssfwjbxxId'] == this.name_active_data['id']) {
                        delete this.flxx_houses_add[i];
                    }
                }


                for (let i in this.add_ggmx_data) {
                    console.log(this.add_ggmx_data[i]['ssfwjbxxId']);
                    console.log(this.name_active_data['id']);
                    if (this.add_ggmx_data[i]['ssfwjbxxId'] == this.name_active_data['id']) {
                        delete this.add_ggmx_data[i];
                    }
                }


                console.log(this.flxx_houses_add);
                console.log(this.flxx_houses_update);
                console.log(this.flxx_houses_del);

                console.log(this.update_ggmx_data);
                console.log(this.del_ggmx_data);
                console.log(this.add_ggmx_data);
                console.log(this.del_houses_data);
                console.log(this.add_houses_data);


            }


        } else {

            console.log(this.name_active_data.id);
            console.log(this.name_active_data.qsrId);
            //this.listHcyAdd = this.InputChange.get_add_change(this.childInfo2,this.name_active_data,this.listHcyAdd);

            if (this.listHcyAdd[this.name_active_data.qsrId]['listFwAdd'][this.name_active_data.id]) {
                delete this.listHcyAdd[this.name_active_data.qsrId]['listFwAdd'][this.name_active_data.id];

            }
            console.log(this.listHcyAdd);

        }


        this.name_active_data.qsrmc = name;
        this.name_active_data.qsrId = e;


        console.log(this.name_active_data['qsrId']);
        console.log(this.name_active_data);
        console.log(e);
        if (e.toString().length == 32) {


            this.name_active_data['id'] = new Date().getTime();


            let res = this.InputChange.get_select_change(this.name_active_data, this.name_active_key, this.init_houses_data, this.update_houses_data, this.add_houses_data);


            console.log(res);
            this.add_houses_data = res.add_data;
            this.update_houses_data = res.update_data;

            //this.del_houses_data.push({'id':temp_qsrid});
            console.log(this.add_houses_data);

            console.log(this.name_active_base);
            let res2 = this.ToggleFlxxAdd2(this.name_active_base, e, this.name_active_data['id']);


            if (this.name_active_data['flbmxList'] == undefined) {
                this.name_active_data['flbmxList'] = new Array();
            }
//            this.zbflId = this.now_data['data']['zbflId'];
            console.log(res2);
            console.log(this.add_houses_data);
            console.log(this.name_active_data['id']);

            for (let i in res2) {
                if (this.name_active_data['flbmxList'][i]) {
                    this.name_active_data['flbmxList'][i] = new Array();

                }

                if (this.add_houses_data[this.name_active_data['id']]['flbmxList'] == null) {
                    this.add_houses_data[this.name_active_data['id']]['flbmxList'] = new Array();
                }


                if (this.add_houses_data[this.name_active_data['id']]['flbmxList'][i]) {
                    this.add_houses_data[this.name_active_data['id']]['flbmxList'][i] = new Array();
                }

                this.add_houses_data[this.name_active_data['id']]['flbmxList'][i] = res2[i];

            }

            this.name_active_data = this.add_houses_data[this.name_active_data['id']];

            console.log(this.name_active_data);
            console.log(this.flxx_houses_add);
            console.log(this.add_houses_data);


        } else {


            this.name_active_data['id'] = new Date().getTime();

            this.name_active_data.qsrId = e;


            if (this.name_active_data['flbmxList'] != undefined && this.name_active_data['flbmxList'].length > 0) {

                for (let i in this.name_active_data['flbmxList']) {
                    if ((this.name_active_data['flbmxList'][i]['jzmj'] == "" || this.name_active_data['flbmxList'][i]['jzmj'] == null) && (this.name_active_data['flbmxList'][i]['bz'] == "" && this.name_active_data['flbmxList'][i]['bz'] == null)) {
                        delete this.name_active_data['flbmxList'][i];
                    }
                }

            }
            console.log(this.name_active_data);


            this.listHcyAdd = this.InputChange.get_add_change(this.childInfo2, this.name_active_data, this.listHcyAdd, 'listFwAdd');

            console.log(this.listHcyAdd);

        }


        console.log(this.update_houses_data);
        console.log(this.add_houses_data);
        console.log(this.del_houses_data);

        console.log(this.flxx_houses_add);
        console.log(this.flxx_houses_update);
        console.log(this.flxx_houses_del);

        console.log(this.update_ggmx_data);
        console.log(this.del_ggmx_data);
        console.log(this.add_ggmx_data);

        console.log(this.name_active_base);
        console.log(this.listHcyAdd);

        this.houesList[this.name_active_key] = this.name_active_data;


    }


    //竣工日期
    eventJgrq(e) {
        console.log(e);
        this.name_active_data.jgrq = e;


        let res = this.InputChange.get_select_change(this.name_active_data, this.name_active_key, this.init_houses_data, this.update_houses_data, this.add_houses_data);

        this.add_houses_data = res.add_data;
        this.update_houses_data = res.update_data;


        console.log(this.add_houses_data);
        console.log(this.update_houses_data);
    }

    //专业大类
    showZydlBlock() {

        if (this.type != 'view') {
            this.isShowZydl = this.isShowZydl ? false : true;


            if (!this.zydlTableList) {

                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_FW&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        this.zydlTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_FW&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.zydlTableList = res['returnObject'];
                    });
            }
        }


    }


    getChildZydl(event) {
        this.isShowZydl = false;
        this.name_active_data['zydlmc'] = event.mc;
        this.name_active_data['zydldm'] = event.dm;
    }


    //调查范围
    showDcfwBlock() {

        if (this.type != 'view') {
            this.isShowDcfw = this.isShowDcfw ? false : true;


            if (!this.dcfwTableList) {

                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HCY&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_HCY&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.dcfwTableList = res['returnObject'];
                    });
            }
        }


    }

    getChildDcfw(event) {
        this.isShowDcfw = false;
        this.name_active_data['dcfwmc'] = event.mc;
        this.name_active_data['dcfwdm'] = event.dm;
    }


    //房屋性质
    showFwxzBlock() {

        if (this.type != 'view') {
            this.isShowFwxz = this.isShowFwxz ? false : true;


            if (!this.dcfwTableList) {

                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_FWJBXX&column=FWXZDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        this.fwxzTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_FWJBXX&column=FWXZDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.fwxzTableList = res['returnObject'];
                    });

            }


        }


    }

    getChildFwxz(event) {
        this.isShowFwxz = false;
        this.name_active_data['fwxzmc'] = event.mc;
        this.name_active_data['fwxzdm'] = event.dm;

        let res = this.InputChange.get_select_change(this.name_active_data, this.name_active_key, this.init_houses_data, this.update_houses_data, this.add_houses_data);

        this.update_houses_data = res['update_data'];
        this.add_houses_data = res['add_data'];


    }


    //房屋主要用途

    showFwzyytBlock() {

        if (this.type != 'view') {
            this.isShowFwzyyt = this.isShowFwzyyt ? false : true;


            if (!this.fwzyytTableList) {

                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_FWJBXX&column=FWZYYTDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        this.fwzyytTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_FWJBXX&column=FWZYYTDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.fwzyytTableList = res['returnObject'];
                    });
            }
        }


    }

    getChildFwzyyt(event) {
        this.isShowFwzyyt = false;
        this.name_active_data['fwzyytmc'] = event.mc;
        this.name_active_data['fwzyytdm'] = event.dm;

        let res = this.InputChange.get_select_change(this.name_active_data, this.name_active_key, this.init_houses_data, this.update_houses_data, this.add_houses_data);

        this.update_houses_data = res['update_data'];
        this.add_houses_data = res['add_data'];
    }


//行政区划代码
    getChildEvent(e) {
        this.name_active_data.swszxzqhdm = e;
    }


    //分类明细 显示所有
    showAll(i) {

        console.log(this.name_active_base);
        if (i) {


            this.name_active_base.forEach((value, index, arr) => {
                console.log(index);
                this.name_active_base[i] = this.InputChange.showCheck(this.name_active_base[index], 'jzmj');

            });

            let res = this.InputChange.showCheck3(this.name_active_base, 'fwjgdm');

            for (let i in this.houses_name_active_base_copy[0]) {

                this.houses_name_active_base_copy[0][i] = this.InputChange.showCheck4(this.houses_name_active_base_copy[0][i], res, 'fwjgdm');
            }

            console.log(this.name_active_base);
            console.log(this.houses_name_active_base_copy[0]);
            this.isShow = false;

            // this.is_disabled = true;
        } else {

            this.name_active_base = _.cloneDeep(this.houses_name_active_base_copy[0]);


            this.name_active_base.forEach((value, index, arr) => {

                console.log(this.name_active_base);
                //计算分类明细总面积
                this.jzzmj += this.InputChange.CalcSize2(this.name_active_base[index], 'jzmj', 0);

                setTimeout(() => {
                    //初始化的时候计算父节点的值
                    this.name_active_base[index] = this.CalcParent(this.name_active_base[index], this.name_active_base[index], index);
                    console.log(this.name_active_base[index]);


                }, 0);


            });

            this.searchList(this.searchKeyword);

            console.log(this.name_active_base);
            console.log(this.houses_name_active_base_copy[0]);

            // this.is_disabled = false;
            this.isShow = true;

        }


    }


    //  是否无户房产
    selectedTypea2(e): void {

        if (this.sfwhfc == this.name_active_data.sfwhfc) {
            this.sfwhfc = 2;
            this.name_active_data.sfwhfc = 2;
        } else {
            this.name_active_data.sfwhfc = this.sfwhfc;
            this.sfwhfc = this.sfwhfc;
        }

        let res = this.InputChange.get_select_change(this.name_active_data, this.name_active_key, this.init_houses_data, this.update_houses_data, this.add_houses_data);

        this.update_houses_data = res['update_data'];
        this.add_houses_data = res['add_data'];

    }

    //  是否线外
    selectedTypea4(e): void {

        if (this.sfxw == this.name_active_data.sfxw) {
            this.sfxw = 2;
            this.name_active_data.sfxw = 2;
        } else {
            this.name_active_data.sfxw = this.sfxw;
            this.sfxw = this.sfxw;
        }

        let res = this.InputChange.get_select_change(this.name_active_data, this.name_active_key, this.init_houses_data, this.update_houses_data, this.add_houses_data);


        this.update_houses_data = res['update_data'];
        this.add_houses_data = res['add_data'];


    }


    getChildSzxzqh(e) {
        console.log(e);
        if (e) {
            this.name_active_data.localitydesc = e.qc;
            this.name_active_data.swszxzqhdm = e.dm;
            this.isShowArea = false;
        }
    }


    //用途及结构


    showytjjgBlock() {

        if (this.type != 'view') {
            this.isShowytjjg = this.isShowytjjg ? false : true;
            console.log(this.isShowytjjg);

            if (this.isShowytjjg) {
                this.ytjjgTreeList = new Array();


                let name_active_base_copy = _.cloneDeep(this.name_active_base);

                name_active_base_copy.forEach((value, index, arr) => {
                    value = _.cloneDeep(value);
                    value = this.DataProcessing.returnTreeGgmx(value, 'fwjgdm');
                    value.forEach((v, i, a) => {

                        this.ytjjgTreeList.push(v);

                    });

                });

                console.log(this.ytjjgTreeList);


                this.ytjjgTreeList = this.DataProcessing.replaceChildlValue(this.ytjjgTreeList, 'childList', 'children', 'zdxmc', 'label');
                this.ytjjgTableList = this.DataProcessing.addExpand(this.ytjjgTreeList);

                console.log(this.ytjjgTreeList);
            }

            console.log(this.update_ggmx_data);
            console.log(this.add_ggmx_data);
            console.log(this.del_ggmx_data);


        }


    }


    getChildytjjg(event) {
        console.log(event);
        this.isShowytjjg = false;
        this.ggmx[this.GgmxIndex]['fwjgdm'] = event.node.fwjgdm;
        this.ggmx[this.GgmxIndex]['zdxmc'] = event.node.label;

        console.log(this.ggmx[this.GgmxIndex]);
    }


    //已有房屋切换权属人时将分类信息递归取出放到分类信息新增中

    ToggleFlxxAdd(arr, e, ssfwjbxxId) {
        for (let item of arr) {
            console.log(item);
            if (item.children) {

                this.ToggleFlxxAdd(item.children, e, ssfwjbxxId);
            } else {

                if ((item['data']['jzmj'] != null && item['data']['jzmj'] != "" )) {

                    this.toggle_flxx_add[ssfwjbxxId + item.data['zbflId']] = new Array();
                    this.toggle_flxx_add[ssfwjbxxId + item.data['zbflId']] = {
                        'jzmj': item['data']['jzmj'], 'bz': item['data']['bz'], 'fwjgdm': item['data']['fwjgdm'],
                        'zbflId': item['data']['zbflId'], 'qsrId': e, 'ssfwjbxxId': ssfwjbxxId
                    };

                }

            }
        }
        return this.toggle_flxx_add;


    }

    ToggleFlxxAdd2(arr, e, ssfwjbxxId) {
        this.toggle_flxx_add = new Array();

        arr.forEach((value, index, arr) => {
            this.ToggleFlxxAdd(arr[index], e, ssfwjbxxId);

        });

        return this.toggle_flxx_add;

    }


}


//基本信息
export class HousesData {
    constructor(public start: any,
                public limit: any,
                public orderCol: any,
                public orderType: any,
                public sql: any,
                public searchKey: any,
                public id: any,
                public ssxtdm: any,
                public ssgcdm: any,
                public qsrId: any,
                public jddm: any,
                public flbmxList,
                public swszxzqhdm: any,
                public swszxzqhmc: any,
                public zydldm: any,
                public dcfwdm: any,
                public dcfwmc: any,
                public sfwhfc: any,
                public fwxzdm: any,
                public sl: any,
                public sfxw: any,
                public szgc: any,
                public tfh: any,
                public tbh: any,
                public dclsh: any,
                public dmbh: any,
                public bz: any,
                public cjsj: any,
                public qsrmc: any = '',
                public sfzh: any,
                public localitydesc: any,
                public zydlmc: any,
                public zjdmj: any,
                public fwzyytdm: any,
                public tdsyz: any,
                public fwcqz: any,
                public mph: any,
                public jgrq: any,
                public fwyz: any,
                public ggmxxxList: any,
                public zdxmc: any) {

    }
}

//规格明细
export class Ggmx {
    constructor(public xh,
                public fwjg,
                public cs,
                public cgxs,
                public wmcl,
                public zlcc,
                public jzmm,
                public dw,
                public bz,
                public id,
                public zhgxsj,
                public ssgcdm,
                public ssxtdm,
                public kd,
                public ggcc,
                public cd,
                public fwjgdm,
                public ssfwjbxxId) {

    }
}


