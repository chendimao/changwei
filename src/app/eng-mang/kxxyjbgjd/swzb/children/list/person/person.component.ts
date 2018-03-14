import {Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SelectItem, DataTableModule, SharedModule, LazyLoadEvent, FilterMetadata} from 'primeng/primeng';
import {ValuChangeService} from "../../../../../../service/valuChange.service";
import {HttpService} from "../../../../../../service/http-service";
import {ActivatedRoute, Params} from "@angular/router";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {SelectListHttpService} from "../../../../../../service/select-list-http.service";


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

    public qshflId; //  权属户信息
    public type: string; //  类型：查看、新增、修改
    public childInfo: any;
    public childInfo2: any;
    public hcy_count: number = 0; //  总共多少人
    public isShowArea: boolean = false;
    public name_active_key; //  当前选中的下标
    public del_data; //  删除的数据
    public init_person_data; //  初始化的数据
    public update_data = new Array(); //  对比后修改的数据
    public add_data = new Array(); //  新增的数据

    public yhzgx_list: any; //  与户主关系下拉列表
    public mz_list: any; //  民族下拉列表
    public whcd_list: any; //  文化程度下拉列表
    public cyzk_list: any; //  从业状况下拉列表
    public xb_list: any; //  性别选择
    public xb_list_copy: any; //  性别选择
    public sfkgr: number = 0; //  是否空挂人
    public sfldl: number = 0; //  是否劳动力
    public zydl_list: any; //  专业大类
    public hkqk_list: any; //  户口情况列表
    public hyzk_list: any;// 婚姻状况下拉列表
    public dcfw_list: any;// 调查范围
    public dcfw_list_is_show = 0;// 调查范围显示
    public dcfw_mc;
    public hbdm_list: any;// 户别代码 列表
    public ssxzqhdm: any; //  所属行政区划代码
    public ssgcdm: any; //  所属行政区划代码


    area: string;
    @ViewChild('person') person: NgForm;
    @ViewChildren('defaultPerson') defaultPerson: QueryList<ElementRef>;


    constructor(public selectList: SelectListHttpService, public DataProcessing: DataProcessingService, private ValuChangeService: ValuChangeService, private HttpService: HttpService, private route: ActivatedRoute) {


        this.types = [];
        this.types.push({label: '详情视图', value: '1'});
        this.types.push({label: '列表视图', value: '2'});
        this.types4 = [];
        this.types4.push({label: '是', value: 1});
        this.types4.push({label: '否', value: 0});
        this.types5 = [];
        this.types5.push({label: '是', value: 1});
        this.types5.push({label: '否', value: 0});


    }

    ngAfterViewInit(): void {


        //   订阅表单值改变事件
        this.person.valueChanges.subscribe(data => {


                if (this.hcy.id != undefined) {
                    let linshiPerson = this.init_person_data['listHcy'];
                    linshiPerson.forEach((value, index, arr) => {
                        console.log(value);
                        if (this.hcy['id'] == value['id']) {
                            console.log(this.hcy['id']);
                            this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                            console.log(this.ValuChangeService.changeDate(value, this.hcy));
                            this.update_data[index]['id'] = this.hcy.id;

                        }

                    });


                } else {

                    if (this.add_data[this.name_active_key] == undefined) {

                        this.add_data[this.name_active_key] = new Object();
                    }


                    for (var i in this.hcy) {

                        if (this.hcy[i] != null) {
                            this.add_data[this.name_active_key][i] = this.hcy[i];
                        }

                    }


                }

                console.log(this.update_data)
                console.log(this.add_data);


            }
        );

    }

    ngOnInit() {
        console.log(this.qshflId);
        this.selectedType = 1;
        this.area = '福建省泉州市安溪县白濑乡长基村';

        if (this.childInfo2 != undefined) {
            this.tableList = this.childInfo2;

        } else {
            this.tableList.push({
                "mc": "",
                'sfzh': '',
                'szxzqhdm': "",
                'zydldm': "",
                'dcfwdm': "",
                'xbdm': "",
                'mzdm': "",
                'yhzgxdm': "",
                'csrq': "",
                'whcddm': "",
                'hydm': "",
                'sfsldl': "",
                'qrrq': '',
                'qcrq': '',
                'hkszd': "",
                'rs': "",
                'bz': "",
            })
        }

        this.hcy_count = this.tableList.length ? this.tableList.length : 0;
        this.hcy = this.tableList[0];
        this.name_active_key = 0;




        console.log(this.hcy);


        //  所属行政区划代码和工程代码
        if (this.type == 'add') {
            this.ssgcdm = this.qshflId.ssgcdm;
            this.ssxzqhdm = this.qshflId.ssxzqhdm;

        } else if (this.type == 'rew') {

            this.ssgcdm = this.qshflId.ssgcdm;
            this.ssxzqhdm = this.qshflId.ssxzqhdm;
        }
        console.log(this.ssgcdm);


        //  与户主关系 下拉列表
        this.selectList.getSelectList('B_HYHCYGX', 'YHZGXDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.yhzgx_list = data;
        });
        //  民族 下拉列表
        this.selectList.getSelectList('B_HCY', 'MZDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.mz_list = data;
        });
        //  文化程度 下拉列表
        this.selectList.getSelectList('B_HCY', 'WHCDDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.whcd_list = data;
        });
        //  从业状况 下拉列表
        this.selectList.getSelectList('B_HCY', 'CYZKDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.cyzk_list = data;
        });
        //  性别 下拉列表
        this.selectList.getSelectList('B_HCY', 'XBDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.xb_list = data;
            this.xb_list_copy = JSON.parse(JSON.stringify(this.xb_list));
        });
        //  专业大类 下拉列表
        this.selectList.getSelectList('B_HCY', 'ZYDLDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.zydl_list = data;
        });
        //  户口情况 下拉列表
        this.selectList.getSelectList('B_HCY', 'HKQKDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.hkqk_list = data;
        });
        //  婚姻状况 下拉列表
        this.selectList.getSelectList('B_HCY', 'HYDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.hyzk_list = data;
        });
        //  户别代码 下拉列表
        this.selectList.getSelectList('B_HCY', 'HBDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.hbdm_list = data;
        });


        this.selectListHzgx = [
            {label: '户主', name: '户主', value: '1'},
            {label: '父子', name: '户主', value: '2'},
            {label: '父女', name: '户主', value: '3'},
            {label: '姐', name: '户主', value: '4'},
            {label: '哥', name: '户主', value: '5'},
            {label: '弟', name: '户主', value: '6'},
            {label: '弟媳', name: '户主', value: '7'}

        ];


    }


    //  调查范围显示下拉
    dcfw_show() {


        if (this.dcfw_list_is_show == 0) {

            this.dcfw_list_is_show = 1;

            //  调查范围 下拉列表



            this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HCY&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                .then((res) => {
                    console.log(res['returnObject']);
                    this.dcfw_list = res['returnObject'];
                });


        } else {
            this.dcfw_list_is_show = 0;

        }
    }

    //  调查范围选中数据
    dcfw_data(e) {

        this.hcy.dcfwdm = e.dm;
        this.dcfw_mc = e.mc;
        this.dcfw_list_is_show = 0;
    }

    //   选择人
    selectPerson(person, i) {
        this.hcy = person;

        this.name_active_key = i;


    }


    addPerson(): void {
        this.tableList.push({
            "mc": "",
            'sfzh': '',
            'szxzqhdm': "",
            'zydldm': "",
            'dcfwdm': "",
            'xbdm': "",
            'mzdm': "",
            'yhzgxdm': "",
            'csrq': "",
            'whcddm': "",
            'hydm': "",
            'sfsldl': "",
            'qrrq': '',
            'qcrq': '',
            'hkszd': "",
            'rs': "",
            'bz': "",
        });


        let that = this.defaultPerson;

        setTimeout(function () {
            that.last.nativeElement.click();
        }, 0);

        this.hcy_count = this.tableList.length;

        //   this.add_data.push(this.tableList[this.hcy_count-1]);

        console.log(this.add_data);


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

    //  删除成员
    delPerson() {

        //  记录删除id
        if (this.hcy['id'] != undefined) {
            this.del_data.push({'id': this.hcy['id']});

            //  如果删除的户成员在修改列表中存在，则从修改列表中删除
            this.tableList.forEach((value, index, arr) => {
                if (value['id'] == this.hcy['id']) {
                    delete this.update_data[index];
                }
            });

        } else {

            this.add_data.splice(this.name_active_key, 1);
            console.log(this.add_data);


        }


        this.tableList.splice(this.name_active_key, 1);
        if (this.tableList[0] != undefined && this.name_active_key > 0) {
            this.selectPerson(this.tableList[this.name_active_key - 1], this.name_active_key - 1);
            this.hcy_count = this.hcy_count - 1;

        } else if (this.tableList[0] != undefined && this.name_active_key == 0) {

            this.selectPerson(this.tableList[this.name_active_key], this.name_active_key)
            this.hcy_count = this.hcy_count - 1;

        } else {
            this.hcy_count = 0;

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

    getQrrqDate(event) {
        this.hcy.qrrq = event;


        if (this.hcy.id != undefined) {
            let linshiPerson = this.init_person_data['listHcy'];
            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });


        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);

    }

    getQcrqDate(event) {
        this.hcy.qcrq = event;

        if (this.hcy.id != undefined) {

            let linshiPerson = this.init_person_data['listHcy'];

            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });

            console.log(this.update_data);

        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);

    }


    getCsrqDate(event) {
        this.hcy.csrq = event;

        if (this.hcy.id != undefined) {

            let linshiPerson = this.init_person_data['listHcy'];

            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });

            console.log(this.update_data);

        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);

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


    getChildEvent1(e) {
        console.log(e);
    }


    //  每个Input绑定事件

    //  文化程度
    eventWhcd(event) {
        this.hcy.whcddm = event;

        if (this.hcy.id != undefined) {

            let linshiPerson = this.init_person_data['listHcy'];

            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });

            console.log(this.update_data);

        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);


    }

    //  户口情况
    eventHkqk(event) {
        this.hcy.hkqkdm = event;

        if (this.hcy.id != undefined) {

            let linshiPerson = this.init_person_data['listHcy'];

            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });


        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);


    }

    //  是否空挂人
    eventSfkgr(event) {
        this.hcy.sfkgr = event;

        if (this.hcy.id != undefined) {

            let linshiPerson = this.init_person_data['listHcy'];

            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });

            console.log(this.update_data);

        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);
    }

    //  调查范围
    eventDcfw(event) {
        this.hcy.dcfwdm = event;

        if (this.hcy.id != undefined) {

            let linshiPerson = this.init_person_data['listHcy'];

            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });

            console.log(this.update_data);

        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);
    }

    //  专业大类
    eventZydl(event) {
        this.hcy.zydldm = event;

        if (this.hcy.id != undefined) {

            let linshiPerson = this.init_person_data['listHcy'];

            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });

            console.log(this.update_data);

        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);
    }

    //  婚姻状况
    eventHyzt(event) {
        this.hcy.hydm = event;

        if (this.hcy.id != undefined) {

            let linshiPerson = this.init_person_data['listHcy'];

            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });

            console.log(this.update_data);

        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);
    }

    //  从业情况
    eventCyqk(event) {
        this.hcy.cyqkdm = event;

        if (this.hcy.id != undefined) {

            let linshiPerson = this.init_person_data['listHcy'];

            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });

            console.log(this.update_data);

        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);
    }

    //  民族
    eventMz(event) {
        this.hcy.mzdm = event;

        if (this.hcy.id != undefined) {

            let linshiPerson = this.init_person_data['listHcy'];

            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });

            console.log(this.update_data);

        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);
    }

    //  性别
    eventXb(event) {



        console.log(event.option.value);
        console.log(this.hcy.xbdm);
        console.log(this.xb_list);




            if( this.hcy.xbdm != null  &&  this.hcy.xbdm == event.option.value){
                event.option.value = null;
                this.hcy.xbdm = null;

            }else{

                if(event.option.value == null && this.hcy.xbdm == null){


                    this.xb_list_copy.forEach((value,index,arr)=>{
                        if(value.label == event.option.label){
                            event.option.value = value.value;
                        }
                    });

                    console.log(event.option.value);
                    console.log(this.hcy.xbdm);

                }else if(event.option.value != null && this.hcy.xbdm == null){
                    this.hcy.xbdm = event.option.value;


                    console.log(event.option.value);
                    console.log(this.hcy.xbdm);
                }else if(event.option.value == null && this.hcy.xbdm != null){

                    this.xb_list_copy.forEach((value,index,arr)=>{
                        console.log(event.option.label);
                        if(value.label == event.option.label){
                            event.option.value = value.value;
                        }
                    });

                     event.option.value = this.hcy.xbdm ;


                    console.log(event.option.value);
                    console.log(this.hcy.xbdm);
                }


            }


        console.log(event.option.value);
        console.log(this.hcy.xbdm);



        if (this.hcy.id != undefined) {

            let linshiPerson = this.init_person_data['listHcy'];

            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });

            console.log(this.update_data);

        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);
    }

    //  与户主关系
    eventYhzgx(event) {

        this.hcy.yhzgxdm = event;
        console.log(this.hcy.yhzgxdm);

        if (this.hcy.id != undefined) {

            let linshiPerson = this.init_person_data['listHcy'];

            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });

            console.log(this.update_data);

        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);
    }

    //  户别
    eventHbdm(event) {
        this.hcy.hbdm = event;
        console.log(this.hcy.hbdm);

        if (this.hcy.id != undefined) {
            let linshiPerson = this.init_person_data['listHcy'];

            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });


        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);
    }

    //  是否劳动力
    eventSFLDL(event) {
        this.hcy.hbdm = event;

        if (this.hcy.id != undefined) {

            let linshiPerson = this.init_person_data['listHcy'];

            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });

            console.log(this.update_data);

        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);
    }

    //  备注
    eventBz(event) {
        this.hcy.bz = event;

        if (this.hcy.id != undefined) {

            let linshiPerson = this.init_person_data['listHcy'];

            linshiPerson.forEach((value, index, arr) => {

                if (this.hcy['id'] == value['id']) {

                    this.update_data[index] = this.ValuChangeService.changeDate(value, this.hcy);
                    this.update_data[index]['id'] = this.hcy.id;

                }

            });

            console.log(this.update_data);

        } else {

            if (this.add_data[this.name_active_key] == undefined) {

                this.add_data[this.name_active_key] = new Object();
            }


            for (var i in this.hcy) {
                this.add_data[this.name_active_key][i] = this.hcy[i];

            }


        }

        console.log(this.add_data);
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





