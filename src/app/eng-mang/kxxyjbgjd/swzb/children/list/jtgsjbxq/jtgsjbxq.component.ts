import {Component, OnInit, ViewChild} from '@angular/core';
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {InputChangeService} from "../../../../../../service/input-change.service";
import {HttpService} from "../../../../../../service/http-service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-jtgsjbxq',
  templateUrl: './jtgsjbxq.component.html',
    styleUrls: ['../children.css']
})
export class JtgsjbxqComponent implements OnInit {

    public qshflId; //  权属户信息
    public type: string; //  类型：查看、新增、修改
    public childInfo: any;
    public childInfo2: any;
    public isShowArea: boolean = false;
    public name_active_key; //  当前选中的下标
    public del_gtgsjbxx_data; //  删除的数据
    public init_gtgsjbxx_data; //  初始化的数据
    public update_gtgsjbxx_data; //  对比后修改的数据
    public add_gtgsjbxx_data ; //  新增的数据
    public gtgsList:any ;
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
    public gtgsjbxx2_data:any;
    public  dcfwTableList: any;
    public  dcfwTreeList: any;
    public  zydlTableList: any;
    public  zydlTreeList: any;
    public isDisabled = false;
    public listHcyAdd;

    public szxzqugtgsdm: any;
    public zzcModel: boolean;
    public selectedType: number;
    public tableSelecValue: any;
    public selectPersonList = new Array();


    @ViewChild('forms') forms: NgForm;
    public isShowgkdj;
    public gkdjTreeList: any;
    public gkdjTableList: any;
    public sjTreeList;
    public ymTreeList;
    public isShowgkxz;
    public xzTreeList;
    public isShowym;
    public ymTableList;
    public sjTableList;
    public isShowsj;
    public xzTableList;
    public isShowgtgs;
    public gtgsTreeList;
    public gtgsTableList;

    constructor(public HttpService:HttpService,public DataProcessing:DataProcessingService,public InputChange: InputChangeService) { }

    ngAfterViewInit(): void {

        //if(this.gtgsList[0].length>0){
        // 订阅表单值改变事件
        this.forms.valueChanges.subscribe( data => {


            let res = this.InputChange.get_select_change(this.gtgsList[0],0,this.init_gtgsjbxx_data,this.update_gtgsjbxx_data,this.add_gtgsjbxx_data );

            this.update_gtgsjbxx_data = res['update_data'];


            console.log(this.update_gtgsjbxx_data);
            console.log(this.add_gtgsjbxx_data);

            for( let i in this.add_gtgsjbxx_data){
                if(i != '0'){
                    delete this.add_gtgsjbxx_data[i];
                }
            }
        });

        // }

    }


    ngOnInit() {



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
        console.log(this.szxzqugtgsdm);

        console.log(this.gtgsjbxx2_data['returnObject']);
        this.gtgsList = this.gtgsjbxx2_data['returnObject'];
        console.log(this.childInfo);
        if(this.gtgsList.length<=0){
            this.gtgsList[0] = (new gtgs(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','',''));

        }

        console.log(this.ssxzqhdm);

        this.selectPersonList.push({label:'选择户成员',value:-1});

        if(this.childInfo2.length>0){

            this.childInfo2.forEach((value,index,arr)=>{

                this.selectPersonList.push({label:value['mc'],value:value['id']});

            });
        }

        console.log(this.gtgsList[0].cd);

        console.log(this.gtgsjbxx2_data);

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

            this.gtgsList[0].localitydesc = e.qc;
            this.gtgsList[0].swszxzqhdm = e.dm;
            this.isShowArea = false;
        } else {
            this.isShowArea = false;
            this.zzcModel = false;
        }
    }



    //删除
    deleteSlect(){


            console.log(this.gtgsList[0]['id']);
            if(this.gtgsList[0]){
                console.log(this.gtgsList[0]);
                if(this.gtgsList[0].id.toString().length == 32){
                    this.del_gtgsjbxx_data.push({id:this.gtgsList[0].id});


                        delete this.update_gtgsjbxx_data[this.gtgsList[0]['id']];


                }else{

                        delete this.add_gtgsjbxx_data[this.gtgsList[0]['id']];

                }

                delete this.gtgsList[0]['id'];


                this.gtgsList[0] = (new gtgs(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','',''));
            }


    }



    //  调查范围显示下拉
    showDcfwBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowDcfw = this.isShowDcfw ? false : true;
            if (!this.dcfwTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_gtgs&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_gtgs&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.gtgsList[0].dcfwdm = event.dm;
        this.gtgsList[0].dcfwmc = event.mc;


    }


    //  路面材料
    showgtgsBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowgtgs= this.isShowgtgs ? false : true;
            if (!this.gtgsTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_gtgs&column=LMCLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.gtgsTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_gtgs&column=LMCLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.gtgsTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildgtgs(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowgtgs = false;
        this.gtgsList[0].lmclmc = event.mc;
        this.gtgsList[0].lmcldm = event.dm;

    }


    //  等级
    showgkdjBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowgkdj= this.isShowgkdj ? false : true;
            if (!this.gkdjTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_gtgs&column=gtgsDJDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.gkdjTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_gtgs&column=gtgsDJDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.gtgsList[0].djmc = event.mc;
        this.gtgsList[0].djdm= event.dm;

    }



    //权属人切换
    eventQsr(e){

        console.log(this.gtgsList[0]);
        if(this.gtgsList[0].qsrId){
            if(this.gtgsList[0].qsrId.toString().length == 32){
                if(this.add_gtgsjbxx_data.length>0){
                    this.add_gtgsjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.gtgsList[0].id){
                            delete this.add_gtgsjbxx_data[index];
                        }

                    });
                }

                if(this.update_gtgsjbxx_data.length>0){
                    this.update_gtgsjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.gtgsList[0].id){
                            delete this.update_gtgsjbxx_data[index];
                        }

                    });
                }


            }else{
                if(this.listHcyAdd[this.gtgsList[0].qsrId] != undefined){

                    delete this.listHcyAdd[this.gtgsList[0].qsrId]['listgtgsAdd'];
                }

            }

        }




        this.gtgsList[0].qsrId = e;
        console.log(this.gtgsList[0].id);

        if(this.gtgsList[0].qsrId.toString().length ==32){
            if(this.gtgsList[0].id.toString().length == 32){
                this.update_gtgsjbxx_data[0] = this.gtgsList[0];
            }else{
                this.add_gtgsjbxx_data[0] = this.gtgsList[0];
            }
        }else{
            this.listHcyAdd[this.gtgsList[0].qsrId]['listgtgsAdd'] = this.gtgsList[0];



        }


        //将户成员基本信息带到房屋基本信息中
        this.childInfo2.forEach((value,index,arr)=>{

            if(value['id'] == this.gtgsList[0]['qsrId']){
                for(var i in value){
                    for(var ii in this.gtgsList[0]){
                        if(i == ii && (i == 'swszxzqhdm'  || i == 'xzqhmc' || i == 'dcfwdm' || i == 'dcfwmc' || i == 'zydlmc' || i == 'zydldm')){
                            this.gtgsList[0][ii] = value[i];
                            console.log(this.gtgsList[0][ii]);
                        }
                    }
                }
                if(value['szxzqhdm'] !=null){
                    this.gtgsList[0]['swszxzqhdm'] = value['szxzqhdm'];
                    this.gtgsList[0]['localitydesc'] = value['xzqhmc'];
                }

            }


        });




        console.log(this.gtgsList[0]);
        console.log(this.gtgsjbxx2_data);


        console.log(this.add_gtgsjbxx_data);
        console.log(this.update_gtgsjbxx_data);
        console.log(this.listHcyAdd);


    }

    //建成日期
    eventJgrq(e){

        this.gtgsList[0].jcrq = e;

        let res = this.InputChange.get_select_change(this.gtgsList[0],0,this.init_gtgsjbxx_data,this.update_gtgsjbxx_data,this.add_gtgsjbxx_data );

        this.update_gtgsjbxx_data = res['update_data'];

    }

    //投建日期
    eventTyrq(e){

        this.gtgsList[0].tyrq= e;

        let res = this.InputChange.get_select_change(this.gtgsList[0],0,this.init_gtgsjbxx_data,this.update_gtgsjbxx_data,this.add_gtgsjbxx_data );

        this.update_gtgsjbxx_data = res['update_data'];

    }

    //  使用性质
    showxzBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowgkxz= this.isShowgkxz? false : true;
            if (!this.xzTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GTGSH&column=XZDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.xzTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_GTGSH&column=XZDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.xzTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildxz(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowgkxz = false;
        this.gtgsList[0].xzmc = event.mc;
        this.gtgsList[0].xzdm = event.dm;

    }






    //  淹没程度
    showymBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowym= this.isShowym? false : true;
            if (!this.ymTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_gtgs&column=YMYXCDDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.ymTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_gtgs&column=YMYXCDDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.gtgsList[0].ymyxcdmc = event.mc;
        this.gtgsList[0].ymyxcddm = event.dm;

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
        this.gtgsList[0].sjhsbzmc = event.mc;
        this.gtgsList[0].sjhsbzdm = event.dm;

    }




}


export class gtgs{

  constructor(

    public id,
    public ssxtdm,
    public ssgcdm,
    public sshjbxxId,
    public mc,
    public xzdm,
    public fwjsscqr,
    public sfzh,
    public jyr,
    public yyzz,
    public swdjh,
    public zdmj,
    public jycsmj,
    public cyrs,
    public gm,
    public zyyw,
    public ncz,
    public nss,
    public nlr,
    public ngze,
    public szdd,
    public sztf,
    public sztb,
    public bz,
    public cjsj,
    public zhgxsj,
    public xzmc


  ){

  }
}

