import {Component, OnInit, ViewChild} from '@angular/core';
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {InputChangeService} from "../../../../../../service/input-change.service";
import {HttpService} from "../../../../../../service/http-service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-qhjbxx',
  templateUrl: './qhjbxx.component.html',
    styleUrls: ['../children.css']
})
export class QhjbxxComponent implements OnInit {

    public qshflId; //  权属户信息
    public type: string; //  类型：查看、新增、修改
    public childInfo: any;
    public childInfo2: any;
    public isShowArea: boolean = false;
    public name_active_key; //  当前选中的下标
    public del_qhjbxx_data; //  删除的数据
    public init_qhjbxx_data; //  初始化的数据
    public update_qhjbxx_data; //  对比后修改的数据
    public add_qhjbxx_data ; //  新增的数据
    public qhList:any ;
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
    public qhjbxx2_data:any;
    public  dcfwTableList: any;
    public  dcfwTreeList: any;
    public  zydlTableList: any;
    public  zydlTreeList: any;
    public isDisabled = false;
    public listHcyAdd;

    public szxzqugldm: any;
    public zzcModel: boolean;
    public selectedType: number;
    public tableSelecValue: any;
    public isShowqh: boolean;
    public qhTableList: null;
    public qhTreeList: string;
    public selectPersonList = new Array();


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
    public isShowgl;
    public glTreeList;
    public glTableList;

    constructor(public HttpService:HttpService,public DataProcessing:DataProcessingService,public InputChange: InputChangeService) { }

    ngAfterViewInit(): void {

        //if(this.qhList[0].length>0){
        // 订阅表单值改变事件
        this.forms.valueChanges.subscribe( data => {


            let res = this.InputChange.get_select_change(this.qhList[0],0,this.init_qhjbxx_data,this.update_qhjbxx_data,this.add_qhjbxx_data );

            this.update_qhjbxx_data = res['update_data'];


            console.log(this.update_qhjbxx_data);
            console.log(this.add_qhjbxx_data);

            for( let i in this.add_qhjbxx_data){
                if(i != '0'){
                    delete this.add_qhjbxx_data[i];
                }
            }
        });

        // }

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

        console.log(this.qhjbxx2_data['returnObject']);
        this.qhList = this.qhjbxx2_data['returnObject'];
        console.log(this.childInfo);
        if(this.qhList.length<=0){
            this.qhList[0] = (new qh(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));

        }

        console.log(this.ssxzqhdm);

        this.selectPersonList.push({label:'选择户成员',value:-1});

        if(this.childInfo2.length>0){

            this.childInfo2.forEach((value,index,arr)=>{

                this.selectPersonList.push({label:value['mc'],value:value['id']});

            });
        }

        console.log(this.qhList[0].cd);

        console.log(this.qhjbxx2_data);

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

            this.qhList[0].localitydesc = e.qc;
            this.qhList[0].swszxzqqhm = e.dm;
            this.isShowArea = false;
        } else {
            this.isShowArea = false;
            this.zzcModel = false;
        }
    }



    //删除
    deleteSlect(){

        if(this.qhList[0].qsrId.toString().length == 32){


            if(this.qhList[0].id.toString().length == 32){
                this.del_qhjbxx_data.push({id:this.qhList[0].id});

                if(this.update_qhjbxx_data.length>0){
                    this.update_qhjbxx_data.splice(0,1);
                }

            }else{
                if(this.add_qhjbxx_data.length>0){
                    this.add_qhjbxx_data.splice(0,1);
                }
            }
        }else{
            if(this.listHcyAdd[this.qhList[0].qsrId] != undefined) {

                delete this.listHcyAdd[this.qhList[0].qsrId]['listQhAdd'];
            }
        }
        this.qhList[0] = (new qh(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));
    }



    //  调查范围显示下拉
    showDcfwBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowDcfw = this.isShowDcfw ? false : true;
            if (!this.dcfwTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_QH&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_QH&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.qhList[0].dcfwdm = event.dm;
        this.qhList[0].dcfwmc = event.mc;


    }


    //  输变电工程
    showqhBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowqh= this.isShowqh ? false : true;
            if (!this.qhTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_QH&column=QHLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.qhTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_QH&column=QHLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.qhTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildqh(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowqh = false;
        this.qhList[0].qhlbmc = event.mc;
        this.qhList[0].qhlbdm = event.dm;

    }


    //  港口等级
    showgkdjBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowgkdj= this.isShowgkdj ? false : true;
            if (!this.gkdjTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_qh&column=qhDJDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.gkdjTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_qh&column=qhDJDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.qhList[0].djmc = event.mc;
        this.qhList[0].gkmtdjdm = event.dm;

    }



    //权属人切换
    eventQsr(e){

        console.log(this.qhList[0]);
        if(this.qhList[0].qsrId){
            if(this.qhList[0].qsrId.toString().length == 32){
                if(this.add_qhjbxx_data.length>0){
                    this.add_qhjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.qhList[0].id){
                            delete this.add_qhjbxx_data[index];
                        }

                    });
                }

                if(this.update_qhjbxx_data.length>0){
                    this.update_qhjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.qhList[0].id){
                            delete this.update_qhjbxx_data[index];
                        }

                    });
                }


            }else{
                if(this.listHcyAdd[this.qhList[0].qsrId] != undefined){

                    delete this.listHcyAdd[this.qhList[0].qsrId]['listQhAdd'];
                }

            }

        }




        this.qhList[0].qsrId = e;
        console.log(this.qhList[0].id);

        if(this.qhList[0].qsrId.toString().length ==32){
            if(this.qhList[0].id.toString().length == 32){
                this.update_qhjbxx_data[0] = this.qhList[0];
            }else{
                this.add_qhjbxx_data[0] = this.qhList[0];
            }
        }else{
            this.listHcyAdd[this.qhList[0].qsrId]['listQhAdd'] = this.qhList[0];



        }


        //将户成员基本信息带到房屋基本信息中
        this.childInfo2.forEach((value,index,arr)=>{

            if(value['id'] == this.qhList[0]['qsrId']){
                for(var i in value){
                    for(var ii in this.qhList[0]){
                        if(i == ii && (i == 'szxzqhdm'  || i == 'xzqhmc' || i == 'dcfwdm' || i == 'dcfwmc' || i == 'zydlmc' || i == 'zydldm')){
                            this.qhList[0][ii] = value[i];
                        }
                    }
                }
                if(value['szxzqhdm'] !=null){
                    this.qhList[0]['swszxzqhdm'] = value['szxzqhdm'];
                    this.qhList[0]['localitydesc'] = value['xzqhmc'];
                }

            }


        });




        console.log(this.qhList[0]);
        console.log(this.qhjbxx2_data);


        console.log(this.add_qhjbxx_data);
        console.log(this.update_qhjbxx_data);
        console.log(this.listHcyAdd);


    }

    //建成日期
    eventJgrq(e){

        this.qhList[0].jcrq = e;


        let res = this.InputChange.get_select_change(this.qhList[0],0,this.init_qhjbxx_data,this.update_qhjbxx_data,this.add_qhjbxx_data );

        this.update_qhjbxx_data = res['update_data'];

    }

    //  结构材料
    showjgBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowjg= this.isShowjg? false : true;
            if (!this.jgTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_QH&column=QHJGDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.jgTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_QH&column=QHJGDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.qhList[0].qhjgmc = event.mc;
        this.qhList[0].qhjgdm = event.dm;

    }


    //  结构材料
    showglBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowgl= this.isShowgl? false : true;
            if (!this.glTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GK&column=JGCLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.glTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_GK&column=JGCLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.glTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildgl(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowgl = false;
        this.qhList[0].ssgllbdm = event.dm;
        this.qhList[0].ssgllbmc = event.mc;

    }




    //  淹没程度
    showymBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowym= this.isShowym? false : true;
            if (!this.ymTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GK&column=YMYXCDDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.ymTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_GK&column=YMYXCDDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.qhList[0].ymyxcdmc = event.mc;
        this.qhList[0].ymyxcddm = event.dm;

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
        this.qhList[0].sjhsbzmc = event.mc;
        this.qhList[0].sjhsbzdm = event.dm;

    }











}

export class qh{

  constructor(
    public id,
    public ssxtdm,
    public ssgcdm,
    public jddm,
    public dcfwdm,
    public zydldm,
    public qsrId,
    public swszxzqhdm,
    public mc,
    public qhbh,
    public qhlbdm,
    public zgbm,
    public yxgldw,
    public dmbh,
    public szgc,
    public ssgllbdm,
    public ssglId,
    public sjhsbzdm,
    public szwz,
    public qlcd,
    public qhcldm,
    public qhjgdm,
    public zdmj,
    public yzj,
    public qmgc,
    public qmkd,
    public qmcldm,
    public sjzj,
    public jtll,
    public jcrq,
    public ymyxcddm,
    public bz,
    public cjsj,
    public zhgxsj,
    public qsrmc,
    public localitydesc,
    public zydlmc,
    public dcfwmc,
    public qhlbmc,
    public ssgllbmc,
    public ssglmc,
    public sjhsbzmc,
    public qhclmc,
    public qhjgmc,
    public qmclmc,
    public ymyxcdmc,
  ){

  }

}
