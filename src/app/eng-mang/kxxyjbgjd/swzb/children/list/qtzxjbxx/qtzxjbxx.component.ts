import {Component, OnInit, ViewChild} from '@angular/core';
import {InputChangeService} from "../../../../../../service/input-change.service";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {HttpService} from "../../../../../../service/http-service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-qtzxjbxx',
  templateUrl: './qtzxjbxx.component.html',
    styleUrls: ['../children.css']
})
export class QtzxjbxxComponent implements OnInit {

    public qshflId; //  权属户信息
    public type: string; //  类型：查看、新增、修改
    public childInfo: any;
    public childInfo2: any;
    public isShowArea: boolean = false;
    public name_active_key; //  当前选中的下标
    public del_qtzxjbxx_data; //  删除的数据
    public init_qtzxjbxx_data; //  初始化的数据
    public update_qtzxjbxx_data; //  对比后修改的数据
    public add_qtzxjbxx_data ; //  新增的数据
    public qtzxList:any ;
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
    public qtzxjbxx2_data:any;
    public  dcfwTableList: any;
    public  dcfwTreeList: any;
    public  zydlTableList: any;
    public  zydlTreeList: any;
    private ymTreeList:any;
    private ymTableList:any;

    public isDisabled = false;
    public listHcyAdd;

    public szxzqugldm: any;
    public zzcModel: boolean;
    public selectedType: number;
    public tableSelecValue: any;
    public isShowqtzx: boolean;
    private isShowqtdj:boolean;
    private isShowym:boolean;
    private qtdjTreeList:any;
    private qtdjTableList:any;

    public qtzxTableList: null;
    public qtzxTreeList: string;
    public selectPersonList = new Array();
    @ViewChild('forms') forms: NgForm;



    constructor(public HttpService:HttpService,public DataProcessing:DataProcessingService,public InputChange:InputChangeService) { }



    ngAfterViewInit(): void {

        //if(this.qtzxList[0].length>0){
        console.log(this.qtzxList[0]);
        console.log(this.forms);
        // 订阅表单值改变事件
        this.forms.valueChanges.subscribe( data => {
            console.log('test');
            if(this.qtzxList && this.qtzxList[0].length>0){

            }
            let res = this.InputChange.get_select_change(this.qtzxList[0],0,this.init_qtzxjbxx_data,this.update_qtzxjbxx_data,[]);

            this.update_qtzxjbxx_data= res['update_data'];

            console.log(this.update_qtzxjbxx_data);
        });

        // }

    }



    ngOnInit() {

        console.log(this.szxzqugldm);
        console.log(this.init_qtzxjbxx_data);
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

        console.log(this.qtzxjbxx2_data['returnObject']);
        this.qtzxList = this.qtzxjbxx2_data['returnObject'];
        console.log(this.childInfo);
        if(this.qtzxList.length<=0){
            //   this.qtzxList[0] = (new qtzx(new Date().getTime(),'','','','','',this.childInfo.xzqhmc?this.childInfo.xzqhmc:'','',this.childInfo.zydldm?this.childInfo.zydldm:'','','','',this.childInfo.zydlmc?this.childInfo.zydlmc:'','',this.childInfo.dcfwmc?this.childInfo.dcfwmc:'','',this.childInfo.dcfwdm?this.childInfo.dcfwdm:'','','','','','','',this.childInfo.ssxzqhdm?this.childInfo.ssxzqhdm:'','','','',''));
            this.qtzxList[0] = (new qtzx(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));

        }

        this.selectPersonList.push({label:'选择户成员',value:-1});

        if(this.childInfo2.length>0){

            this.childInfo2.forEach((value,index,arr)=>{

                this.selectPersonList.push({label:value['mc'],value:value['id']});

            });
        }


        console.log(this.qtzxjbxx2_data);
        console.log(this.qtzxList[0]);
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

            this.qtzxList[0].localitydesc = e.qc;
            this.qtzxList[0].swszxzqhdm = e.dm;
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
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_QTZX&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.zydlTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_QTZX&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.qtzxList[0].zydldm = event.dm;
        this.qtzxList[0].zydlmc = event.mc;


    }

    //  调查范围显示下拉
    showDcfwBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowDcfw = this.isShowDcfw ? false : true;
            if (!this.dcfwTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_QTZX&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_QTZX&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.qtzxList[0].dcfwdm = event.dm;
        this.qtzxList[0].dcfwmc = event.mc;


    }


    //  专项类别
    showqtzxBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowqtzx= this.isShowqtzx ? false : true;
            if (!this.qtzxTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_QTZX&column=ZXLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.qtzxTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                        console.log(this.qtzxTreeList);
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_QTZX&column=ZXLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.qtzxTableList = res['returnObject'];
                    });
            }
        }

        console.log(this.qtzxTreeList);

    }



    getChildqtzx(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowqtzx = false;
        this.qtzxList[0].zxlbmc = event.mc;
        this.qtzxList[0].zxlbdm = event.dm;

    }



    //  等级类别
    showqtdjBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowqtdj= this.isShowqtdj ? false : true;
            if (!this.qtdjTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_QTZX&column=DJDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.qtdjTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                        console.log(this.qtzxTreeList);
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_QTZX&column=DJDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.qtdjTableList = res['returnObject'];
                    });
            }
        }

        console.log(this.qtzxTreeList);

    }



    getChildqtdj(event) {
        this.isShowqtdj = false;
        this.qtzxList[0].djmc = event.mc;
        this.qtzxList[0].djdm = event.dm;

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
        this.qtzxList[0].ymyxcdmc = event.mc;
        this.qtzxList[0].ymyxcddm = event.dm;

    }

    //权属人切换
    eventQsr(e){

        if(this.qtzxList[0].qsrId){
            if(this.qtzxList[0].qsrId.toString().length == 32){
                if(this.add_qtzxjbxx_data.length>0){
                    this.add_qtzxjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.qtzxList[0].id){
                            delete this.add_qtzxjbxx_data[index];
                        }

                    });
                }

                if(this.update_qtzxjbxx_data.length>0){
                    this.update_qtzxjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.qtzxList[0].id){
                            delete this.update_qtzxjbxx_data[index];
                        }

                    });


                }


                if(this.qtzxList[0].id.toString().length ==32){
                    this.del_qtzxjbxx_data.push({id:this.qtzxList[0].id});
                }


            }else{
                if(this.listHcyAdd[this.qtzxList[0].qsrId] != undefined){

                    delete this.listHcyAdd[this.qtzxList[0].qsrId]['listqtzxAdd'];
                }

            }

        }




        this.qtzxList[0].qsrId = e;
        console.log(this.qtzxList[0].id);

        if(this.qtzxList[0].qsrId.toString().length ==32){

            this.qtzxList[0].id = new Date().getTime();
            this.add_qtzxjbxx_data.push(this.qtzxList[0]);

        }else{
            this.listHcyAdd[this.qtzxList[0].qsrId]['listqtzxAdd'] = this.qtzxList[0];



        }


        console.log(this.qtzxList[0]);
        console.log(this.qtzxjbxx2_data);


        console.log(this.add_qtzxjbxx_data);
        console.log(this.del_qtzxjbxx_data);
        console.log(this.update_qtzxjbxx_data);
        console.log(this.listHcyAdd);



        //将户成员基本信息带到房屋基本信息中
        this.childInfo2.forEach((value,index,arr)=>{

            if(value['id'] == this.qtzxList[0]['qsrId']){
                for(var i in value){
                    for(var ii in this.qtzxList[0]){
                        if(i == ii && i != 'id' && i != 'cjsj' && i != 'mc'){
                            this.qtzxList[0][ii] = value[i];
                        }
                    }
                }
                if(value['szxzqhdm'] !=null){
                    this.qtzxList[0]['swszxzqhdm'] = value['szxzqhdm'];
                    this.qtzxList[0]['localitydesc'] = value['xzqhmc'];
                }

            }


        });



    }

    //建成日期
    eventJgrq(e){

        this.qtzxList[0].jcrq = e;

    }



//删除
    deleteSlect(){

        if(this.qtzxList[0].qsrId.toString().length == 32){


            if(this.qtzxList[0].id.toString().length == 32){
                this.del_qtzxjbxx_data.push({id:this.qtzxList[0].id});

                if(this.update_qtzxjbxx_data.length>0){
                    this.update_qtzxjbxx_data.splice(0,1);
                }

            }else{
                if(this.add_qtzxjbxx_data.length>0){
                    this.add_qtzxjbxx_data.splice(0,1);
                }
            }
        }else{
            if(this.listHcyAdd[this.qtzxList[0].qsrId]) {

                delete this.listHcyAdd[this.qtzxList[0].qsrId]['listqtzxAdd'];
            }
        }
        this.qtzxList[0] = (new qtzx(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));

    }

}


export class qtzx{
  constructor(
      public  id,
      public zxlbdm,
    public zgbm,
    public ztz,
   public  ssgcdm,
   public  qsrmc,
   public  jcrq,
   public  cjsj,
   public  localitydesc,
   public  ymyxcdmc,
   public  mc,
   public  zydldm,
   public  bz,
   public  sl,
   public  zydlmc,
   public  dcfwdm,
   public  djdm,
   public  gg,
   public  dmbh,
   public  dcfwmc,
   public  ymyxcddm,
   public  qsrId,
   public  gm,
   public  ssxtdm,
   public  zhgxsj,
   public  zggc,
   public  jddm,
  public   swszxzqhdm,
   public  djmc,
   public  sfzh,
   public  zxlbmc,
   public  szwz,
   public  zdgc,
   public  zdmj

){

  }
}
