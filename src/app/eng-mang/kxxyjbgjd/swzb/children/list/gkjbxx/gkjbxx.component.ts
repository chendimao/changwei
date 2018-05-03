import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../../../../../service/http-service";
import {InputChangeService} from "../../../../../../service/input-change.service";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-gkjbxx',
  templateUrl: './gkjbxx.component.html',
    styleUrls: ['../children.css']
})
export class GkjbxxComponent implements OnInit {
    public qshflId; //  权属户信息
    public type: string; //  类型：查看、新增、修改
    public childInfo: any;
    public childInfo2: any;
    public isShowArea: boolean = false;
    public name_active_key; //  当前选中的下标
    public del_gkjbxx_data; //  删除的数据
    public init_gkjbxx_data; //  初始化的数据
    public update_gkjbxx_data; //  对比后修改的数据
    public add_gkjbxx_data ; //  新增的数据
    public gkList:any ;
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
    public gkjbxx_data:any;
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
    public isShowgk: boolean;
    public gkTableList: null;
    public gkTreeList: string;
    public selectPersonList = new Array();


    @ViewChild('forms') forms: NgForm;
    public isShowgkdj;
    public gkdjTreeList: any;
    public  gkdjTableList: any;
    public  dlljTableList: any;
    public dlljdjTreeList: any;
    public isShowdllj:any;
    public isShowyt;
    public  ytTableList;
    public  isShowxs;
    public  xsTableList;
    public ytTreeList;
    public xsTreeList;
    public isShowjgcl;
    public jgclTreeList;
    public jgclTableList;
    public sjTableList;
    public sjTreeList;
    public isShowsj;
    private isShowym;
    private ymTreeList;
    private ymTableList;

    constructor(public HttpService:HttpService,public DataProcessing:DataProcessingService,public InputChange: InputChangeService) { }

    ngAfterViewInit(): void {

        // if(this.gkList[0].length>0){
        // 订阅表单值改变事件
            this.forms.valueChanges.subscribe( data => {
                console.log('test');
                let res = this.InputChange.get_select_change(this.gkList[0],0,this.init_gkjbxx_data,this.update_gkjbxx_data,this.add_gkjbxx_data);

                this.update_gkjbxx_data= res['update_data'];
                for( let i in this.add_gkjbxx_data){
                    if(i != '0'){
                        delete this.add_gkjbxx_data[i];
                    }
                }
                console.log(this.update_gkjbxx_data);
            });

         // },

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

        console.log(this.gkjbxx_data['returnObject']);
        this.gkList = this.gkjbxx_data['returnObject'];
        console.log(this.childInfo);
        if(this.gkList.length<=0){
            this.gkList[0] = (new gk(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));


        }

        this.selectPersonList.push({label:'选择户成员',value:-1});

        if(this.childInfo2.length>0){

            this.childInfo2.forEach((value,index,arr)=>{

                this.selectPersonList.push({label:value['mc'],value:value['id']});

            });
        }

        console.log(this.gkList[0]);

        console.log(this.gkjbxx_data);

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

            this.gkList[0].localitydesc = e.qc;
            this.gkList[0].swszxzqhdm = e.dm;
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
        this.gkList[0].zydldm = event.dm;
        this.gkList[0].zydlmc = event.mc;


    }

//删除
    deleteSlect(){

        if(this.gkList[0].qsrId.toString().length == 32){


            if(this.gkList[0].id.toString().length == 32){
                this.del_gkjbxx_data.push({id:this.gkList[0].id});

                if(this.update_gkjbxx_data.length>0){
                    this.update_gkjbxx_data.splice(0,1);
                }

            }else{
                if(this.add_gkjbxx_data.length>0){
                    this.add_gkjbxx_data.splice(0,1);
                }
            }
        }else{
            delete this.listHcyAdd[this.gkList[0].qsrId]['listGkAdd'];
        }
        this.gkList[0] = (new gk(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));
    }



//  调查范围显示下拉
    showDcfwBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowDcfw = this.isShowDcfw ? false : true;
            if (!this.dcfwTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GK&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_GK&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.gkList[0].dcfwdm = event.dm;
        this.gkList[0].dcfwmc = event.mc;


    }


//  输变电工程
    showgkBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowgk= this.isShowgk ? false : true;
            if (!this.gkTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GK&column=GKLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.gkTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_GK&column=GKLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.gkList[0].gklbmc = event.qc;
        this.gkList[0].gklbdm = event.dm;

    }


    //  港口等级
    showgkdjBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowgkdj= this.isShowgkdj ? false : true;
            if (!this.gkdjTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GK&column=GKMTDJDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.gkdjTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GK&column=GKMTDJDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.gkList[0].djmc = event.qc;
        this.gkList[0].gkmtdjdm = event.dm;

    }


    //  港口用途
    showytBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowyt= this.isShowyt? false : true;
            if (!this.ytTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GK&column=GKYTDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.ytTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_GK&column=GKYTDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.ytTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildyt(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowyt = false;
        this.gkList[0].gkytmc = event.qc;
        this.gkList[0].gkytdm = event.dm;

    }

    //  港口形式
    showxsBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowxs= this.isShowxs? false : true;
            if (!this.xsTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GK&column=XSDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.xsTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_GK&column=XSDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.xsTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildxs(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowxs = false;
        this.gkList[0].xsmc = event.qc;
        this.gkList[0].xsdm = event.dm;

    }


    //  结构材料
    showjgclBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowjgcl= this.isShowjgcl? false : true;
            if (!this.jgclTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GK&column=JGCLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.jgclTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_GK&column=JGCLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.jgclTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildjgcl(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowjgcl = false;
        this.gkList[0].jgclmc = event.mc;
        this.gkList[0].jgcldm = event.dm;

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
        this.gkList[0].ymyxcdmc = event.mc;
        this.gkList[0].ymyxcddm = event.dm;

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
        this.gkList[0].sjhsbzmc = event.mc;
        this.gkList[0].sjhsbzdm = event.dm;

    }










    //  链接道路
    showgkdlljdjBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowdllj= this.isShowdllj ? false : true;
            if (!this.dlljTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GK&column=LJDLDJDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dlljdjTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_GK&column=LJDLDJDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.dlljTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildljdl(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowdllj = false;
        this.gkList[0].ljdldjmc = event.qc;
        this.gkList[0].ljdldjdm = event.dm;

    }






//权属人切换
    eventQsr(e){

        if(this.gkList[0].qsrId){
            if(this.gkList[0].qsrId.toString().length == 32){
                if(this.add_gkjbxx_data.length>0){
                    this.add_gkjbxx_data.forEach((value,index, arr)=>{
                        if(value['id'] == this.gkList[0].id){
                            delete this.add_gkjbxx_data[index];
                        }

                    });
                }

                if(this.update_gkjbxx_data.length>0){
                    this.update_gkjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.gkList[0].id){
                            delete this.update_gkjbxx_data[index];
                        }

                    });


                }


                if(this.gkList[0].id.toString().length ==32){
                    this.del_gkjbxx_data.push({id:this.gkList[0].id});
                }


            }else{
                if(this.listHcyAdd[this.gkList[0].qsrId] != undefined){

                    delete this.listHcyAdd[this.gkList[0].qsrId]['listGkAdd'];
                }

            }

        }




        this.gkList[0].qsrId = e;
        console.log(this.gkList[0].id);

        if(this.gkList[0].qsrId.toString().length ==32){

            this.gkList[0].id = new Date().getTime();
            this.add_gkjbxx_data.push(this.gkList[0]);

        }else{
            this.listHcyAdd[this.gkList[0].qsrId]['listGkAdd'] = this.gkList[0];



        }


        console.log(this.gkList[0]);
        console.log(this.gkjbxx_data);


        console.log(this.add_gkjbxx_data);
        console.log(this.del_gkjbxx_data);
        console.log(this.update_gkjbxx_data);
        console.log(this.listHcyAdd);



        //将户成员基本信息带到房屋基本信息中
        this.childInfo2.forEach((value,index,arr)=>{

            if(value['id'] == this.gkList[0]['qsrId']){
                for(var i in value){
                    for(var ii in this.gkList[0]){
                        if(i == ii && (i == 'szxzqhdm'  || i == 'xzqhmc' || i == 'dcfwdm' || i == 'dcfwmc' || i == 'zydlmc' || i == 'zydldm')){

                            this.gkList[0][ii] = value[i];
                        }
                    }
                }
                if(value['szxzqhdm'] !=null){
                    this.gkList[0]['swszxzqhdm'] = value['szxzqhdm'];
                    this.gkList[0]['localitydesc'] = value['xzqhmc'];
                }

            }


        });



    }
//建成日期
    eventJgrq(e){

        this.gkList[0].jcrq = e;
        let res = this.InputChange.get_select_change(this.gkList[0],0,this.init_gkjbxx_data,this.update_gkjbxx_data,this.add_gkjbxx_data);

        this.update_gkjbxx_data= res['update_data'];
    }





}

export class gk{

  constructor(
    public id,
   public zgbm,
   public tz,
   public ssgcdm,
   public zdswyxgc,
   public jcrq,
   public gkytmc,
   public ljdldjdm,
   public nttl,
   public yxgldw,
   public ydcd,
   public mc,
   public gkytdm,
   public ydkd,
   public dmbh,
   public qsrId,
   public gklbmc,
   public ssxtdm,
   public zhgxsj,
   public swszxzqhdm,
   public szgc,
   public zxjx,
   public gklbdm,
   public ljdldjmc,
   public szwz,
   public gkmtdjmc,
   public jgclmc,
   public qsrmc,
   public ljdlmc,
   public dclsh,
   public cjsj,
   public mthc,
   public localitydesc,
   public ymyxcdmc,
   public jgcldm,
   public zydldm,
   public bz,
   public zydlmc,
   public dcfwdm,
   public dcfwmc,
   public ymyxcddm,
   public gm,
   public sjhsbzmc,
   public kbnl,
   public xsmc,
   public jddm,
   public sfzh,
   public sjhsbzdm,
   public gdzc,
   public zgswyxgc,
   public xsdm,
   public gkmtdjdm,
   public zdmj

){

  }

}