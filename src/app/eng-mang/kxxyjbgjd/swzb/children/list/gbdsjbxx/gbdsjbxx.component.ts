import {Component, OnInit, ViewChild} from '@angular/core';

import {HttpService} from "../../../../../../service/http-service";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {InputChangeService} from "../../../../../../service/input-change.service";
import {NgForm} from "@angular/forms";



@Component({
  selector: 'app-gbdsjbxx',
  templateUrl: './gbdsjbxx.component.html',
    styleUrls: ['../children.css']
})
export class GbdsjbxxComponent implements OnInit {
    public qshflId; //  权属户信息
    public type: string; //  类型：查看、新增、修改
    public childInfo: any;
    public childInfo2: any;
    public isShowArea: boolean = false;
    public name_active_key; //  当前选中的下标
    public del_gbdsjbxx_data; //  删除的数据
    public init_gbdsjbxx_data; //  初始化的数据
    public update_gbdsjbxx_data; //  对比后修改的数据
    public add_gbdsjbxx_data ; //  新增的数据
    public gbdsList:any ;
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
    public gbdsjbxx2_data:any;
    public  dcfwTableList: any;
    public  dcfwTreeList: any;
    public  zydlTableList: any;
    public  zydlTreeList: any;
    public isDisabled = false;

    public szxzqugldm: any;
    public zzcModel: boolean;
    public selectedType: number;
    public tableSelecValue: any;
    public isShowgbds: boolean;
    public gbdsTableList: null;
    public gbdsTreeList: string;
    public selectPersonList = new Array();
    private listHcyAdd: any;
    @ViewChild('forms') forms: NgForm;




    constructor(public HttpService:HttpService,public DataProcessing:DataProcessingService,public InputChange:InputChangeService) { }



    ngAfterViewInit(): void {

        if(this.gbdsList[0].length>0){
            // 订阅表单值改变事件
            this.forms.valueChanges.subscribe( data => {
                console.log('test');
                let res = this.InputChange.get_select_change(this.gbdsList[0],0,this.init_gbdsjbxx_data,this.update_gbdsjbxx_data,this.add_gbdsjbxx_data,);

                this.update_gbdsjbxx_data = res['update_data'];

                console.log(this.update_gbdsjbxx_data);
            });

        }

    }



    ngOnInit() {




        console.log(this.szxzqugldm);


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

        console.log(this.gbdsjbxx2_data['returnObject']);
        this.gbdsList = this.gbdsjbxx2_data['returnObject'];

        if(this.gbdsList.length<=0){
            this.gbdsList[0] = (new gbds(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));

        }

        this.selectPersonList.push({label:'选择户成员',value:-1});

        if(this.childInfo2.length>0){

            this.childInfo2.forEach((value,index,arr)=>{

                this.selectPersonList.push({label:value['mc'],value:value['id']});

            });
        }

        console.log(this.gbdsList[0]);





        console.log(this.gbdsjbxx2_data);



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

            this.gbdsList[0].localitydesc = e.qc;
            this.gbdsList[0].swszxzqhdm = e.dm;
            this.isShowArea = false;
        } else {
            this.isShowArea = false;
            this.zzcModel = false;
        }
    }


    // 专业大类展示
    showZydlBlock(index) {
        let test = document.getElementById("zydl");
        this.zzcModel = true;

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

        console.log(this.selectedType);
        this.gbdsList[0].zydldm = event.dm;
        this.gbdsList[0].zydlmc = event.mc;


    }

    //  调查范围显示下拉
    showDcfwBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowDcfw = this.isShowDcfw ? false : true;
            if (!this.dcfwTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GBDSGC&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_GBDSGC&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.gbdsList[0].dcfwdm = event.dm;
        this.gbdsList[0].dcfwmc = event.mc;


    }


    //  输变电工程
    showSbdgcBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowgbds= this.isShowgbds ? false : true;
            if (!this.gbdsTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GBDSGC&column=DXGCLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.gbdsTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_GBDSGC&column=DXGCLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.gbdsTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildgbds(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowgbds = false;
        this.gbdsList[0].dxgclbmc = event.mc;
        this.gbdsList[0].dxgclbdm = event.dm;

    }



    //权属人切换
    eventQsr(e){

        if(this.gbdsList[0].qsrId){
            if(this.gbdsList[0].qsrId.toString().length == 32){
                if(this.add_gbdsjbxx_data.length>0){
                    this.add_gbdsjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.gbdsList[0].id){
                            delete this.add_gbdsjbxx_data[index];
                        }

                    });
                }

                if(this.update_gbdsjbxx_data.length>0){
                    this.update_gbdsjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.gbdsList[0].id){
                            delete this.update_gbdsjbxx_data[index];
                        }

                    });
                }


                if(this.gbdsList[0].id.toString().length ==32){
                    this.del_gbdsjbxx_data.push({id:this.gbdsList[0].id});
                }


            }else{
                if(this.listHcyAdd[this.gbdsList[0].qsrId] != undefined){

                    delete this.listHcyAdd[this.gbdsList[0].qsrId]['listGbdsgcAdd'];
                }

            }

        }




        this.gbdsList[0].qsrId = e;
        console.log(this.gbdsList[0].id);

        if(this.gbdsList[0].qsrId.toString().length ==32){

                this.add_gbdsjbxx_data.push(this.gbdsList[0]);
                console.log(this.add_gbdsjbxx_data);

        }else{
            this.listHcyAdd[this.gbdsList[0].qsrId]['listGbdsgcAdd'] = this.gbdsList[0];



        }

        //将户成员基本信息带到房屋基本信息中
        this.childInfo2.forEach((value,index,arr)=>{

            if(value['id'] == this.gbdsList[0]['qsrId']){
                for(var i in value){
                    for(var ii in this.gbdsList[0]){
                        if(i == ii && (i == 'szxzqhdm'  || i == 'xzqhmc' || i == 'dcfwdm' || i == 'dcfwmc' || i == 'zydlmc' || i == 'zydldm')){

                            this.gbdsList[0][ii] = value[i];
                        }
                    }
                }
                if(value['szxzqhdm'] !=null){
                    this.gbdsList[0]['swszxzqhdm'] = value['szxzqhdm'];
                    this.gbdsList[0]['localitydesc'] = value['xzqhmc'];
                }

            }


        });



    }






//建成日期
    eventJgrq(e){

      this.gbdsList[0].jcrq = e;
        let res = this.InputChange.get_select_change(this.gbdsList[0],0,this.init_gbdsjbxx_data,this.update_gbdsjbxx_data,this.add_gbdsjbxx_data,);

        this.update_gbdsjbxx_data = res['update_data'];
    }



//删除
    deleteSlect(){

        if(this.gbdsList[0].qsrId.toString().length == 32){


            if(this.gbdsList[0].id.toString().length == 32){
                this.del_gbdsjbxx_data.push({id:this.gbdsList[0].id});

                if(this.update_gbdsjbxx_data.length>0){
                    this.update_gbdsjbxx_data.splice(0,1);
                }

            }else{
                if(this.add_gbdsjbxx_data.length>0){
                    this.add_gbdsjbxx_data.splice(0,1);
                }
            }
        }else{
            if(this.listHcyAdd[this.gbdsList[0].qsrId]){
                delete this.listHcyAdd[this.gbdsList[0].qsrId]['listgbdsAdd'];

            }
        }

        this.gbdsList[0] = (new gbds(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));

    }





}

export class gbds{
    constructor(
        public id,
        public qsrId,
        public zyjsdd,
        public ssgcdm,
        public  qsrmc,
        public jcrq,
        public lsgx,
        public cjsj,
        public fwfw,
        public localitydesc,
        public zyzdgc,
        public mc,
        public zydldm,
        public qsdd,
        public zgrs,
        public bz,
        public zyzggc,
        public zycd,
        public mgds,
        public zydlmc,
        public dcfwdm,
        public dcfwmc,
        public wz,
        public dxgclbdm,
        public zyqsdd,
        public ssxtdm,
        public zhgxsj,
        public jddm,
        public swszxzqhdm,
        public sfzh,
        public dxgclbmc,
        public jsdd,
        public zdmj,



    ){

    }
}
