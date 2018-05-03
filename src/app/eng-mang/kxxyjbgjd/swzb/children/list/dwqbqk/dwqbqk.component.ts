import {Component, OnInit, ViewChild} from '@angular/core';
import {InputChangeService} from "../../../../../../service/input-change.service";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";

import {HttpService} from "../../../../../../service/http-service";
import {NgForm} from "@angular/forms";
import {SelectItem} from "primeng/primeng";

@Component({
  selector: 'app-dwqbqk',
  templateUrl: './dwqbqk.component.html',
    styleUrls: ['../children.css']
})
export class DwqbqkComponent implements OnInit {
    public qshflId; //  权属户信息
    public type: string; //  类型：查看、新增、修改
    public childInfo: any;
    public childInfo2: any;
    public isShowArea: boolean = false;
    public name_active_key; //  当前选中的下标
    public del_dwjbxx_data; //  删除的数据
    public init_dwjbxx_data; //  初始化的数据
    public update_dwjbxx_data; //  对比后修改的数据
    public add_dwjbxx_data ; //  新增的数据
    public dwList:any ;
    public  zydlLeft: any;
    public  zydlTop: any;
    public dcfw_list: any;// 调查范围
    public dcfw_list_is_show = 0;// 调查范围显示
    public dcfw_mc;
    public hbdm_list: any;// 户别代码 列表
    public ssxzqhdm: any; //  所属行政区划代码
    public ssgcdm: any; //  所属行政区划代码
    public  isShowZydl: any;
    public  isShowDcfw: any;
    public dwjbxx2_data:any;
    public  dcfwTableList: any;
    public  dcfwTreeList: any;
    public  zydlTableList: any;
    public  zydlTreeList: any;
    public isDisabled = false;
    public listHcyAdd;
    public isShowgk: boolean;
    public gkTableList: null;
    public gkTreeList: string;
    public szxzqudwdm: any;
    public zzcModel: boolean;
    public selectedType: number;
    public tableSelecValue: any;
    public selectPersonList = new Array();

    types2: SelectItem[];
    @ViewChild('forms') forms: NgForm;
    public isShowgkdj;
    public gkdjTreeList: any;
    public gkdjTableList: any;
    public sjTreeList;
    public ymTreeList;
    public isShowjg;
    public jgTreeList;
    public isShowym;
    public ymTableList;
    public sjTableList;
    public isShowsj;
    public jgTableList;
    public isShowdw;
    public dwTreeList;
    public dwTableList;
    public sfzw;

    constructor(public HttpService:HttpService,public DataProcessing:DataProcessingService,public InputChange: InputChangeService) {
        this.types2 = [];
        this.types2.push({label: '是', value: '1'});
        this.types2.push({label: '否', value: '0'});
    }

    ngAfterViewInit(): void {

        //if(this.dwList[0].length>0){
        // 订阅表单值改变事件
        this.forms.valueChanges.subscribe( data => {


            let res = this.InputChange.get_select_change(this.dwList[0],0,this.init_dwjbxx_data,this.update_dwjbxx_data,this.add_dwjbxx_data );

            this.update_dwjbxx_data = res['update_data'];
             console.log(res);

            console.log(this.update_dwjbxx_data);
            console.log(this.add_dwjbxx_data);

            // for( let i in this.add_dwjbxx_data){
            //     if(i != '0'){
            //         delete this.add_dwjbxx_data[i];
            //     }
            // }
        });

        // }

    }


    ngOnInit() {

        console.log(this.qshflId);

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
        console.log(this.szxzqudwdm);

        console.log(this.dwjbxx2_data['returnObject']);
        this.dwList = this.dwjbxx2_data['returnObject'];
        console.log(this.childInfo);
        if(this.dwList.length<=0 ){
            this.dwList[0] = (new dw(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));

        }

        console.log(this.ssxzqhdm);

        this.selectPersonList.push({label:'选择户成员',value:-1});

        if(this.childInfo2.length>0){

            this.childInfo2.forEach((value,index,arr)=>{

                this.selectPersonList.push({label:value['mc'],value:value['id']});

            });
        }

        console.log(this.dwList[0].cd);

        console.log(this.dwjbxx2_data);

    }

    // 所在行政区域
    showAreaBlock(): void {
        console.log(this.type);
        if (this.type != "view") {
            this.isShowArea = this.isShowArea ? false : true;
        }
    }

    getChildSzxztl(e) {
        console.log(e);
        if (e) {
            this.zzcModel = false;

            this.dwList[0].localitydesc = e.qc;
            this.dwList[0].swszxzqhdm = e.dm;
            this.isShowArea = false;
        } else {
            this.isShowArea = false;
            this.zzcModel = false;
        }
    }



    //删除
    deleteSlect(){


        console.log(this.dwList[0]['id']);
        if(this.dwList[0]){
            console.log(this.dwList[0]);
            if(this.dwList[0].id.toString().length == 32){
                this.del_dwjbxx_data.push({id:this.dwList[0].id});



                for(let i in this.update_dwjbxx_data){
                    delete this.update_dwjbxx_data[i];
                }


            }else{
                for(let i in this.add_dwjbxx_data){
                    delete this.add_dwjbxx_data[i];
                }

               // delete this.add_dwjbxx_data[this.dwList[0]['id']];


            }

            delete this.dwList[0]['id'];


            this.dwList[0] = (new dw(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','' ));

        }


    }



    //  调查范围显示下拉
    showDcfwBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowDcfw = this.isShowDcfw ? false : true;
            if (!this.dcfwTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_DW&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_DW&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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

        console.log(this.selectedType);
        this.dwList[0].dcfwdm = event.dm;
        this.dwList[0].dcfwmc = event.mc;


    }


    //  路面材料
    showdwBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowdw= this.isShowdw ? false : true;
            if (!this.dwTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_DW&column=JJXZDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_DW&column=JJXZDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.dwTableList = res['returnObject'];
                    });
            }
        }
    }



    getChilddw(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowdw = false;
        this.dwList[0].jjxzmc = event.mc;
        this.dwList[0].jjxzdm = event.dm;

    }


    //  行业类别
    showgkdjBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowgkdj= this.isShowgkdj ? false : true;
            if (!this.gkdjTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_DW&column=HYLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.gkdjTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_DW&column=HYLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.gkdjTableList = res['returnObject'];
                    });
            }
        }
    }


    getChildgkdj(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowgkdj = false;
        this.dwList[0].hylbmc = event.mc;
        this.dwList[0].hylbdm = event.dm;

    }









    //权属人切换
    eventQsr(e){

        console.log(this.dwList[0]);
        if(this.dwList[0].qsrId){
            if(this.dwList[0].qsrId.toString().length == 32){
                if(this.add_dwjbxx_data.length>0){
                    this.add_dwjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.dwList[0].id){
                            delete this.add_dwjbxx_data[index];
                        }

                    });
                }

                if(this.update_dwjbxx_data.length>0){
                    this.update_dwjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.dwList[0].id){
                            delete this.update_dwjbxx_data[index];
                        }

                    });
                }


            }else{
                if(this.listHcyAdd[this.dwList[0].qsrId] != undefined){

                    delete this.listHcyAdd[this.dwList[0].qsrId]['listDwAdd'];
                }

            }

        }




        this.dwList[0].qsrId = e;
        console.log(this.dwList[0].id);

        if(this.dwList[0].qsrId.toString().length ==32){
            if(this.dwList[0].id.toString().length == 32){
                this.update_dwjbxx_data[0] = this.dwList[0];
            }else{
                this.add_dwjbxx_data[0] = this.dwList[0];
            }
        }else{
            this.listHcyAdd[this.dwList[0].qsrId]['listDwAdd'] = this.dwList[0];



        }


        //将户成员基本信息带到房屋基本信息中
        this.childInfo2.forEach((value,index,arr)=>{

            if(value['id'] == this.dwList[0]['qsrId']){
                for(var i in value){
                    for(var ii in this.dwList[0]){
                        if(i == ii && (i == 'swszxzqhdm'  || i == 'xzqhmc' || i == 'dcfwdm' || i == 'dcfwmc' || i == 'zydlmc' || i == 'zydldm')){
                            this.dwList[0][ii] = value[i];
                            console.log(this.dwList[0][ii]);
                        }
                    }
                }
                if(value['szxzqhdm'] !=null){
                    this.dwList[0]['swszxzqhdm'] = value['szxzqhdm'];
                    this.dwList[0]['localitydesc'] = value['xzqhmc'];
                }

            }


        });




        console.log(this.dwList[0]);
        console.log(this.dwjbxx2_data);


        console.log(this.add_dwjbxx_data);
        console.log(this.update_dwjbxx_data);
        console.log(this.listHcyAdd);


    }

    //注册的日期
    eventJgrq(e){

        this.dwList[0].zcrq = e;

        let res = this.InputChange.get_select_change(this.dwList[0],0,this.init_dwjbxx_data,this.update_dwjbxx_data,this.add_dwjbxx_data );

        this.update_dwjbxx_data = res['update_data'];

    }

    //投建日期
    eventTyrq(e){

        this.dwList[0].tcrq= e;

        let res = this.InputChange.get_select_change(this.dwList[0],0,this.init_dwjbxx_data,this.update_dwjbxx_data,this.add_dwjbxx_data );

        this.update_dwjbxx_data = res['update_data'];

    }

    //  使用性质
    showjgBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowjg= this.isShowjg? false : true;
            if (!this.jgTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_DW&column=SYXZDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.jgTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_DW&column=SYXZDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.jgTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildjg(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowjg = false;
        this.dwList[0].syxzmc = event.mc;
        this.dwList[0].syxzdm = event.dm;

    }

//  输变电工程
    showgkBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowgk= this.isShowgk ? false : true;
            if (!this.gkTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_DW&column=DWLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.gkTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_DW&column=DWLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.gkTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildgk(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowgk = false;
        this.dwList[0].dwlbmc = event.mc;
        this.dwList[0].dwlbdm = event.dm;

    }




    //  淹没程度
    showymBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowym= this.isShowym? false : true;
            if (!this.ymTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_DW&column=YMYXCDDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.ymTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_DW&column=YMYXCDDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.ymTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildym(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowym = false;
        this.dwList[0].ymyxcdmc = event.mc;
        this.dwList[0].ymyxcddm = event.dm;

    }

    //  洪水设计标准
    showsjBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowsj= this.isShowsj? false : true;
            if (!this.sjTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GK&column=SJHSBZDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.sjTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_GK&column=SJHSBZDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.sjTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildsj(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowsj = false;
        this.dwList[0].sjhsbzmc = event.mc;
        this.dwList[0].sjhsbzdm = event.dm;

    }


    //  是否镇外
    selectedTypea2(e): void {

        if (this.sfzw == this.dwList[0].sfzw) {
            this.sfzw = null;
            this.dwList[0].sfzw= null;
        } else {
            this.dwList[0].sfzw = this.sfzw;
            this.sfzw = this.sfzw;
        }

        let res = this.InputChange.get_select_change(this.dwList[0],0,this.init_dwjbxx_data,this.update_dwjbxx_data,this.add_dwjbxx_data );

        this.update_dwjbxx_data = res['update_data'];


    }




}


export class dw{
  constructor(
    public id,
    public ssxtdm,
    public ssgcdm,
    public sshjbxxId,
    public mc,
    public dwlbdm,
    public hylbdm,
    public frdb,
    public sfzw,
    public jjxzdm,
    public lsgx,
    public yyzzh,
    public swdjh,
    public zzjgdm,
    public ssdd,
    public zgbm,
    public tfh,
    public tbh,
    public zczj,
    public zcrq,
    public tcrq,
    public zyjzwgc,
    public zdmj,
    public scyd,
    public shyd,
    public cqmj,
    public gdzcyz,
    public fwyz,
    public ssyz,
    public sbyz,
    public ncz,
    public nss,
    public nlr,
    public ngze,
    public hkzczrs,
    public zgrs,
    public zsgrs,
    public htgrs,
    public lsgrs,
    public jsrs,
    public bz,
    public cjsj,
    public zhgxsj,
    public dwlbmc,
    public hylbmc,
    public jjxzmc
  ){

  }
}