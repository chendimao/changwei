import {Component, OnInit, ViewChild} from '@angular/core';
import {InputChangeService} from "../../../../../../service/input-change.service";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {HttpService} from "../../../../../../service/http-service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-swqxzjbxx',
  templateUrl: './swqxzjbxx.component.html',
    styleUrls: ['../children.css']
})
export class SwqxzjbxxComponent implements OnInit {
    public qshflId; //  权属户信息
    public type: string; //  类型：查看、新增、修改
    public childInfo: any;
    public childInfo2: any;
    public isShowArea: boolean = false;
    public name_active_key; //  当前选中的下标
    public del_swqxzjbxx_data; //  删除的数据
    public init_swqxzjbxx_data; //  初始化的数据
    public update_swqxzjbxx_data; //  对比后修改的数据
    public add_swqxzjbxx_data ; //  新增的数据
    public swqxzList:any ;
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
    public swqxzjbxx2_data:any;
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
    public isShowswqxz: boolean;
    public swqxzTableList: null;
    public swqxzTreeList: string;
    public selectPersonList = new Array();
    @ViewChild('forms') forms: NgForm;
    private isShowxs;
    private xsTreeList;
    private xsTableList;
    private isShowsj;
    private sjTreeList;
    private sjTableList;
    private isShowgkdj;
    private gkdjTreeList;
    private gkdjTableList;
    private isShowym;
    private ymTreeList;
    private ymTableList;



    constructor(public HttpService:HttpService,public DataProcessing:DataProcessingService,public InputChange:InputChangeService) { }



    ngAfterViewInit(): void {

        //if(this.swqxzList[0].length>0){
        console.log(this.swqxzList[0]);
        console.log(this.forms);
        // 订阅表单值改变事件
        this.forms.valueChanges.subscribe( data => {
            console.log('test');
            let res = this.InputChange.get_select_change(this.swqxzList[0],0,this.init_swqxzjbxx_data,this.update_swqxzjbxx_data,[]);

            this.update_swqxzjbxx_data= res['update_data'];

            console.log(this.update_swqxzjbxx_data);
        });

        // }

    }



    ngOnInit() {

        console.log(this.szxzqugldm);
        console.log(this.init_swqxzjbxx_data);
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

        console.log(this.swqxzjbxx2_data['returnObject']);
        this.swqxzList = this.swqxzjbxx2_data['returnObject'];
        console.log(this.childInfo);
        if(this.swqxzList.length<=0){
            //   this.swqxzList[0] = (new swqxz(new Date().getTime(),'','','','','',this.childInfo.xzqhmc?this.childInfo.xzqhmc:'','',this.childInfo.zydldm?this.childInfo.zydldm:'','','','',this.childInfo.zydlmc?this.childInfo.zydlmc:'','',this.childInfo.dcfwmc?this.childInfo.dcfwmc:'','',this.childInfo.dcfwdm?this.childInfo.dcfwdm:'','','','','','','',this.childInfo.ssxzqhdm?this.childInfo.ssxzqhdm:'','','','',''));
            this.swqxzList[0] = (new swqxz(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));

        }

        this.selectPersonList.push({label:'选择户成员',value:-1});

        if(this.childInfo2.length>0){

            this.childInfo2.forEach((value,index,arr)=>{

                this.selectPersonList.push({label:value['mc'],value:value['id']});

            });
        }


        console.log(this.swqxzjbxx2_data);
        console.log(this.swqxzList[0]);
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

            this.swqxzList[0].localitydesc = e.qc;
            this.swqxzList[0].swszxzqhdm = e.dm;
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
        this.swqxzList[0].zydldm = event.dm;
        this.swqxzList[0].zydlmc = event.mc;


    }

    //  调查范围显示下拉
    showDcfwBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowDcfw = this.isShowDcfw ? false : true;
            if (!this.dcfwTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_SWQXZ&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_SWQXZ&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.swqxzList[0].dcfwdm = event.dm;
        this.swqxzList[0].dcfwmc = event.mc;


    }


    //  输变电工程
    showswqxzBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowswqxz= this.isShowswqxz ? false : true;
            if (!this.swqxzTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_SWQXZ&column=ZDLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.swqxzTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_SWQXZ&column=ZDLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.swqxzTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildswqxz(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowswqxz = false;
        this.swqxzList[0].zdlbmc = event.mc;
        this.swqxzList[0].zdlbdm = event.dm;

    }


    //  港口形式
    showxsBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowxs= this.isShowxs? false : true;
            if (!this.xsTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_SWQXZ&column=SZHL&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.xsTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_SWQXZ&column=SZHL&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.swqxzList[0].szhl = event.mc;
        // this.swqxzList[0].xsdm = event.dm;

    }


    //  洪水设计标准
    showsjBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowsj= this.isShowsj? false : true;
            if (!this.sjTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_SWQXZ&column=SJHSBZDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.sjTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_SWQXZ&column=SJHSBZDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.swqxzList[0].sjhsbzmc = event.mc;
        this.swqxzList[0].sjhsbzdm = event.dm;

    }




    //  水文等级
    showgkdjBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowgkdj= this.isShowgkdj ? false : true;
            if (!this.gkdjTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_SWQXZ&column=DJDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.gkdjTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_SWQXZ&column=DJDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.swqxzList[0].djmc = event.mc;
        this.swqxzList[0].djdm = event.dm;

    }


    //  淹没程度
    showymBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowym= this.isShowym? false : true;
            if (!this.ymTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_SWQXZ&column=YMYXCDDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.ymTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_SWQXZ&column=YMYXCDDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.swqxzList[0].ymyxcdmc = event.mc;
        this.swqxzList[0].ymyxcddm = event.dm;

    }


    //权属人切换
    eventQsr(e){

        if(this.swqxzList[0].qsrId){
            if(this.swqxzList[0].qsrId.toString().length == 32){
                if(this.add_swqxzjbxx_data.length>0){
                    this.add_swqxzjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.swqxzList[0].id){
                            delete this.add_swqxzjbxx_data[index];
                        }

                    });
                }

                if(this.update_swqxzjbxx_data.length>0){
                    this.update_swqxzjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.swqxzList[0].id){
                            delete this.update_swqxzjbxx_data[index];
                        }

                    });


                }


                if(this.swqxzList[0].id.toString().length ==32){
                    this.del_swqxzjbxx_data.push({id:this.swqxzList[0].id});
                }


            }else{
                if(this.listHcyAdd[this.swqxzList[0].qsrId] != undefined){

                    delete this.listHcyAdd[this.swqxzList[0].qsrId]['listSwqxzAdd'];
                }

            }

        }




        this.swqxzList[0].qsrId = e;
        console.log(this.swqxzList[0].id);

        if(this.swqxzList[0].qsrId.toString().length ==32){

            this.swqxzList[0].id = new Date().getTime();
            this.add_swqxzjbxx_data.push(this.swqxzList[0]);

        }else{
            this.listHcyAdd[this.swqxzList[0].qsrId]['listSwqxzAdd'] = this.swqxzList[0];



        }


        console.log(this.swqxzList[0]);
        console.log(this.swqxzjbxx2_data);


        console.log(this.add_swqxzjbxx_data);
        console.log(this.del_swqxzjbxx_data);
        console.log(this.update_swqxzjbxx_data);
        console.log(this.listHcyAdd);



        //将户成员基本信息带到房屋基本信息中
        this.childInfo2.forEach((value,index,arr)=>{

            if(value['id'] == this.swqxzList[0]['qsrId']){
                for(var i in value){
                    for(var ii in this.swqxzList[0]){
                        if(i == ii && (i == 'szxzqhdm'  || i == 'xzqhmc' || i == 'dcfwdm' || i == 'dcfwmc' || i == 'zydlmc' || i == 'zydldm')){

                            this.swqxzList[0][ii] = value[i];
                        }
                    }
                }
                if(value['szxzqhdm'] !=null){
                    this.swqxzList[0]['swszxzqhdm'] = value['szxzqhdm'];
                    this.swqxzList[0]['localitydesc'] = value['xzqhmc'];
                }

            }


        });



    }

    //建成日期
    eventJgrq(e){

        this.swqxzList[0].jcrq = e;

    }



//删除
    deleteSlect(){

        if(this.swqxzList[0].qsrId.toString().length == 32){


            if(this.swqxzList[0].id.toString().length == 32){
                this.del_swqxzjbxx_data.push({id:this.swqxzList[0].id});

                if(this.update_swqxzjbxx_data.length>0){
                    this.update_swqxzjbxx_data.splice(0,1);
                }

            }else{
                if(this.add_swqxzjbxx_data.length>0){
                    this.add_swqxzjbxx_data.splice(0,1);
                }
            }
        }else{
            if(this.listHcyAdd[this.swqxzList[0].qsrId]) {

                delete this.listHcyAdd[this.swqxzList[0].qsrId]['listSwqxzAdd'];
            }
        }
        this.swqxzList[0] = (new swqxz(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));

    }









}

export class swqxz{

  constructor(
      public  id,
    public zgbm,
    public lsg,
    public tz,
    public ssgcdm,
   public  qsrmc,
    public jcrq,
   public  zdlbdm,
   public  csxm,
   public  zsg,
   public  cjsj,
   public  yxgldw,
   public  localitydesc,
    public ymyxcdmc,
   public  zdlbmc,
   public  mc,
   public  zydldm,
   public  bz,
   public  htg,
   public  zydlmc,
  public   szhl,
   public  dcfwdm,
   public  djdm,
   public  dmbh,
   public  dcfwmc,
   public  ymyxcddm,
   public  qsrId,
   public  sjhsbzmc,
   public  ssxtdm,
   public  zhgxsj,
   public  jddm,
   public  zrk,
   public  swszxzqhdm,
   public  djmc,
   public  sfz,
   public  szgc,
  public   sjhsbzdm,
   public  jsrs,
   public  szwz,
   public  zdmj
  ){

}


}
