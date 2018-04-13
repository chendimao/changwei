import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../../../../../service/http-service";
import {InputChangeService} from "../../../../../../service/input-change.service";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-wwgjjbxx',
  templateUrl: './wwgjjbxx.component.html',
    styleUrls: ['../children.css']
})
export class WwgjjbxxComponent implements OnInit {

    public qshflId; //  权属户信息
    public type: string; //  类型：查看、新增、修改
    public childInfo: any;
    public childInfo2: any;
    public isShowArea: boolean = false;
    public name_active_key; //  当前选中的下标
    public del_wwgjjbxx_data; //  删除的数据
    public init_wwgjjbxx_data; //  初始化的数据
    public update_wwgjjbxx_data; //  对比后修改的数据
    public add_wwgjjbxx_data ; //  新增的数据
    public wwgjList:any ;
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
    public wwgjjbxx2_data:any;
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
    public isShowwwgj: boolean;
    public wwgjTableList: null;
    public wwgjTreeList: string;
    public selectPersonList = new Array();
    @ViewChild('forms') forms: NgForm;
    private isShowgkdj;
    private gkdjTreeList;
    private gkdjTableList;
    private isShowsj;
    private sjTreeList;
    private sjTableList;
    private isShowym;
    private ymTreeList;
    private ymTableList;
    private wwbhTreeList;
    private wwbhTableList;



    constructor(public HttpService:HttpService,public DataProcessing:DataProcessingService,public InputChange:InputChangeService) { }



    ngAfterViewInit(): void {

        //if(this.wwgjList[0].length>0){
        console.log(this.wwgjList[0]);
        console.log(this.forms);
        // 订阅表单值改变事件
        this.forms.valueChanges.subscribe( data => {
            console.log('test');
            let res = this.InputChange.get_select_change(this.wwgjList[0],0,this.init_wwgjjbxx_data,this.update_wwgjjbxx_data,[]);

            this.update_wwgjjbxx_data= res['update_data'];

            console.log(this.update_wwgjjbxx_data);
        });

        // }

    }



    ngOnInit() {

        console.log(this.szxzqugldm);
        console.log(this.init_wwgjjbxx_data);
        console.log(this.qshflId);
        console.log(this.childInfo);

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

        console.log(this.wwgjjbxx2_data['returnObject']);
        this.wwgjList = this.wwgjjbxx2_data['returnObject'];
        console.log(this.childInfo);
        if(this.wwgjList.length<=0){
            //   this.wwgjList[0] = (new wwgj(new Date().getTime(),'','','','','',this.childInfo.xzqhmc?this.childInfo.xzqhmc:'','',this.childInfo.zydldm?this.childInfo.zydldm:'','','','',this.childInfo.zydlmc?this.childInfo.zydlmc:'','',this.childInfo.dcfwmc?this.childInfo.dcfwmc:'','',this.childInfo.dcfwdm?this.childInfo.dcfwdm:'','','','','','','',this.childInfo.ssxzqhdm?this.childInfo.ssxzqhdm:'','','','',''));
            this.wwgjList[0] = (new wwgj(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));

        }

        this.selectPersonList.push({label:'选择户成员',value:-1});

        if(this.childInfo2.length>0){

            this.childInfo2.forEach((value,index,arr)=>{

                this.selectPersonList.push({label:value['mc'],value:value['id']});

            });
        }


        console.log(this.wwgjjbxx2_data);
        console.log(this.wwgjList[0]);
        console.log(this.forms);

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

            this.wwgjList[0].localitydesc = e.qc;
            this.wwgjList[0].swszqhdm = e.dm;
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
        this.wwgjList[0].zydldm = event.dm;
        this.wwgjList[0].zydlmc = event.mc;


    }

    //  调查范围显示下拉
    showDcfwBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowDcfw = this.isShowDcfw ? false : true;
            if (!this.dcfwTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_WWGJ&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_WWGJ&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.wwgjList[0].dcfwdm = event.dm;
        this.wwgjList[0].dcfwmc = event.mc;


    }


    //  保护等级
    showwwgjBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowwwgj= this.isShowwwgj ? false : true;
            if (!this.wwgjTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_WWGJ&column=WWGJLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.wwgjTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_WWGJ&column=WWGJLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.wwgjTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildwwgj(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowwwgj = false;
        this.wwgjList[0].wwgjlbmc = event.mc;
        this.wwgjList[0].wwgjlbdm = event.dm;

    }

    //  文物古迹

    保护级别
    //  文物古迹等级
    showgkdjBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowgkdj= this.isShowgkdj ? false : true;
            if (!this.wwbhTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_WWGJ&column=BHJBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.wwbhTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_WWGJ&column=BHJBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.wwbhTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildgjdj(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowgkdj = false;
        this.wwgjList[0].bhjbmc = event.mc;
        this.wwgjList[0].bhjbdm = event.dm;

    }


    //  洪水设计标准
    showsjBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowsj= this.isShowsj? false : true;
            if (!this.sjTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_WWGJ&column=SJHSBZDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.sjTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_WWGJ&column=SJHSBZDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.wwgjList[0].sjhsbzmc = event.mc;
        this.wwgjList[0].sjhsbzdm = event.dm;

    }




    //  淹没程度
    showymBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowym= this.isShowym? false : true;
            if (!this.ymTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_WWGJ&column=YMYXCDDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.ymTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_WWGJ&column=YMYXCDDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.wwgjList[0].ymyxcdmc = event.mc;
        this.wwgjList[0].ymyxcddm = event.dm;

    }


    //权属人切换
    eventQsr(e){

        if(this.wwgjList[0].qsrId){
            if(this.wwgjList[0].qsrId.toString().length == 32){
                if(this.add_wwgjjbxx_data.length>0){
                    this.add_wwgjjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.wwgjList[0].id){
                            delete this.add_wwgjjbxx_data[index];
                        }

                    });
                }

                if(this.update_wwgjjbxx_data.length>0){
                    this.update_wwgjjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.wwgjList[0].id){
                            delete this.update_wwgjjbxx_data[index];
                        }

                    });


                }


                if(this.wwgjList[0].id.toString().length ==32){
                    this.del_wwgjjbxx_data.push({id:this.wwgjList[0].id});
                }


            }else{
                if(this.listHcyAdd[this.wwgjList[0].qsrId] != undefined){

                    delete this.listHcyAdd[this.wwgjList[0].qsrId]['listWwgjAdd'];
                }

            }

        }




        this.wwgjList[0].qsrId = e;
        console.log(this.wwgjList[0].id);

        if(this.wwgjList[0].qsrId.toString().length ==32){

            this.wwgjList[0].id = new Date().getTime();
            this.add_wwgjjbxx_data.push(this.wwgjList[0]);

        }else{
            this.listHcyAdd[this.wwgjList[0].qsrId]['listWwgjAdd'] = this.wwgjList[0];



        }


        console.log(this.wwgjList[0]);
        console.log(this.wwgjjbxx2_data);


        console.log(this.add_wwgjjbxx_data);
        console.log(this.del_wwgjjbxx_data);
        console.log(this.update_wwgjjbxx_data);
        console.log(this.listHcyAdd);



        //将户成员基本信息带到房屋基本信息中
        this.childInfo2.forEach((value,index,arr)=>{

            if(value['id'] == this.wwgjList[0]['qsrId']){
                for(var i in value){
                    for(var ii in this.wwgjList[0]){
                        if(i == ii && (i == 'szxzqhdm'  || i == 'xzqhmc' || i == 'dcfwdm' || i == 'dcfwmc' || i == 'zydlmc' || i == 'zydldm')){
                                 this.wwgjList[0][ii] = value[i];
                        }
                    }
                }
                if(value['szxzqhdm'] !=null){
                    this.wwgjList[0]['swszxzqhdm'] = value['szxzqhdm'];
                    this.wwgjList[0]['localitydesc'] = value['xzqhmc'];
                }

            }


        });



    }

    //建成日期
    eventJgrq(e){

        this.wwgjList[0].jcrq = e;

    }



//删除
    deleteSlect(){

        if(this.wwgjList[0].qsrId.toString().length == 32){


            if(this.wwgjList[0].id.toString().length == 32){
                this.del_wwgjjbxx_data.push({id:this.wwgjList[0].id});

                if(this.update_wwgjjbxx_data.length>0){
                    this.update_wwgjjbxx_data.splice(0,1);
                }

            }else{
                if(this.add_wwgjjbxx_data.length>0){
                    this.add_wwgjjbxx_data.splice(0,1);
                }
            }
        }else{
            if(this.listHcyAdd[this.wwgjList[0].qsrId]) {

                delete this.listHcyAdd[this.wwgjList[0].qsrId]['listWwgjAdd'];
            }
        }
        this.wwgjList[0] = (new wwgj(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));

    }









}


export class wwgj{

  constructor(
      public   id,
    public  zgbm,
    public  ssgcdm,
    public  qsrmc,
    public  jz,
    public  cjsj,
    public  localitydesc,
   public   ymyxcdmc,
   public   mcsd,
   public   mc,
   public   zydldm,
   public   bhcs,
    public  bz,
   public   sl,
    public  zydlmc,
   public   dcfwdm,
   public   dmbh,
   public   wwnd,
   public   bhjbdm,
   public   dcfwmc,
   public   ymyxcddm,
    public  qsrId,
   public   gm,
   public   sjhsbzmc,
   public   ssxtdm,
   public   zhgxsj,
   public   jddm,
   public   bhjbmc,
   public   swszxzqhdm,
   public   wwgjlbmc,
   public   sfzh,
   public   szgc,
   public   sjhsbzdm,
   public   jzxs,
   public   szwz,
   public   jg,
   public   wwgjlbdm,
   public   zdmj

){

  }

}