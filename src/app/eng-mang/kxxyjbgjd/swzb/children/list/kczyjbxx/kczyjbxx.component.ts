import {Component, OnInit, ViewChild} from '@angular/core';
import {InputChangeService} from "../../../../../../service/input-change.service";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {HttpService} from "../../../../../../service/http-service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-kczyjbxx',
  templateUrl: './kczyjbxx.component.html',
    styleUrls: ['../children.css']
})
export class KczyjbxxComponent implements OnInit {
    public qshflId; //  权属户信息
    public type: string; //  类型：查看、新增、修改
    public childInfo: any;
    public childInfo2: any;
    public isShowArea: boolean = false;
    public name_active_key; //  当前选中的下标
    public del_kczyjbxx_data; //  删除的数据
    public init_kczyjbxx_data; //  初始化的数据
    public update_kczyjbxx_data; //  对比后修改的数据
    public add_kczyjbxx_data ; //  新增的数据
    public kczyList:any ;
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
    public kczyjbxx2_data:any;
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
    public isShowkczy: boolean;
    public kczyTableList: null;
    public kczyTreeList: string;
    public selectPersonList = new Array();
    @ViewChild('forms') forms: NgForm;
    private isShowym;
    private ymTreeList;
    private ymTableList;
    private isShowsj;
    private sjTreeList;
    private sjTableList;



    constructor(public HttpService:HttpService,public DataProcessing:DataProcessingService,public InputChange:InputChangeService) { }



    ngAfterViewInit(): void {

        //if(this.kczyList[0].length>0){
        console.log(this.kczyList[0]);
        console.log(this.forms);
        // 订阅表单值改变事件
        this.forms.valueChanges.subscribe( data => {
            console.log('test');
            let res = this.InputChange.get_select_change(this.kczyList[0],0,this.init_kczyjbxx_data,this.update_kczyjbxx_data,[]);

            this.update_kczyjbxx_data= res['update_data'];

            console.log(this.update_kczyjbxx_data);
        });

        // }

    }



    ngOnInit() {

        console.log(this.szxzqugldm);
        console.log(this.init_kczyjbxx_data);
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

        console.log(this.kczyjbxx2_data['returnObject']);
        this.kczyList = this.kczyjbxx2_data['returnObject'];
        console.log(this.childInfo);
        if(this.kczyList.length<=0){
            //   this.kczyList[0] = (new kczy(new Date().getTime(),'','','','','',this.childInfo.xzqhmc?this.childInfo.xzqhmc:'','',this.childInfo.zydldm?this.childInfo.zydldm:'','','','',this.childInfo.zydlmc?this.childInfo.zydlmc:'','',this.childInfo.dcfwmc?this.childInfo.dcfwmc:'','',this.childInfo.dcfwdm?this.childInfo.dcfwdm:'','','','','','','',this.childInfo.ssxzqhdm?this.childInfo.ssxzqhdm:'','','','',''));
            this.kczyList[0] = (new kczy(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));

        }

        this.selectPersonList.push({label:'选择户成员',value:-1});

        if(this.childInfo2.length>0){

            this.childInfo2.forEach((value,index,arr)=>{

                this.selectPersonList.push({label:value['mc'],value:value['id']});

            });
        }


        console.log(this.kczyjbxx2_data);
        console.log(this.kczyList[0]);
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

            this.kczyList[0].localitydesc = e.qc;
            this.kczyList[0].swszxzqhdm = e.dm;
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
        this.kczyList[0].zydldm = event.dm;
        this.kczyList[0].zydlmc = event.mc;


    }

    //  调查范围显示下拉
    showDcfwBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowDcfw = this.isShowDcfw ? false : true;
            if (!this.dcfwTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_KCZY&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_KCZY&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.kczyList[0].dcfwdm = event.dm;
        this.kczyList[0].dcfwmc = event.mc;


    }


    //  输变电工程
    showkczyBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowkczy= this.isShowkczy ? false : true;
            if (!this.kczyTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_KCZY&column=KCZYLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.kczyTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                        console.log(this.kczyTreeList);
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_KCZY&column=KCZYLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.kczyTableList = res['returnObject'];
                    });
            }
        }

        console.log(this.kczyTreeList);

    }



    getChildkczy(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowkczy = false;
        this.kczyList[0].kczylbmc = event.mc;
        this.kczyList[0].kczylbdm = event.dm;

    }




    //  淹没程度
    showymBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowym= this.isShowym? false : true;
            if (!this.ymTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_KCZY&column=YMYXCDDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.ymTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_KCZY&column=YMYXCDDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.kczyList[0].ymyxcdmc = event.mc;
        this.kczyList[0].ymyxcddm = event.dm;

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
        this.kczyList[0].sjhsbzmc = event.mc;
        this.kczyList[0].sjhsbzdm = event.dm;

    }





    //权属人切换
    eventQsr(e){

        if(this.kczyList[0].qsrId){
            if(this.kczyList[0].qsrId.toString().length == 32){
                if(this.add_kczyjbxx_data.length>0){
                    this.add_kczyjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.kczyList[0].id){
                            delete this.add_kczyjbxx_data[index];
                        }

                    });
                }

                if(this.update_kczyjbxx_data.length>0){
                    this.update_kczyjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.kczyList[0].id){
                            delete this.update_kczyjbxx_data[index];
                        }

                    });


                }


                if(this.kczyList[0].id.toString().length ==32){
                    this.del_kczyjbxx_data.push({id:this.kczyList[0].id});
                }


            }else{
                if(this.listHcyAdd[this.kczyList[0].qsrId] != undefined){

                    delete this.listHcyAdd[this.kczyList[0].qsrId]['listKczyAdd'];
                }

            }

        }




        this.kczyList[0].qsrId = e;
        console.log(this.kczyList[0].id);

        if(this.kczyList[0].qsrId.toString().length ==32){

            this.kczyList[0].id = new Date().getTime();
            this.add_kczyjbxx_data.push(this.kczyList[0]);

        }else{
            this.listHcyAdd[this.kczyList[0].qsrId]['listKczyAdd'] = this.kczyList[0];



        }


        console.log(this.kczyList[0]);
        console.log(this.kczyjbxx2_data);


        console.log(this.add_kczyjbxx_data);
        console.log(this.del_kczyjbxx_data);
        console.log(this.update_kczyjbxx_data);
        console.log(this.listHcyAdd);



        //将户成员基本信息带到房屋基本信息中
        this.childInfo2.forEach((value,index,arr)=>{

            if(value['id'] == this.kczyList[0]['qsrId']){
                for(var i in value){
                    for(var ii in this.kczyList[0]){
                        if(i == ii && (i == 'szxzqhdm'  || i == 'xzqhmc' || i == 'dcfwdm' || i == 'dcfwmc' || i == 'zydlmc' || i == 'zydldm')){

                            this.kczyList[0][ii] = value[i];
                        }
                    }
                }
                if(value['szxzqhdm'] !=null){
                    this.kczyList[0]['swszxzqhdm'] = value['szxzqhdm'];
                    this.kczyList[0]['localitydesc'] = value['xzqhmc'];
                }

            }


        });



    }

    //建成日期
    eventJgrq(e){

        this.kczyList[0].jcrq = e;
        let res = this.InputChange.get_select_change(this.kczyList[0],0,this.init_kczyjbxx_data,this.update_kczyjbxx_data,[]);

        this.update_kczyjbxx_data= res['update_data'];


    }



//删除
    deleteSlect(){

        if(this.kczyList[0].qsrId.toString().length == 32){


            if(this.kczyList[0].id.toString().length == 32){
                this.del_kczyjbxx_data.push({id:this.kczyList[0].id});

                if(this.update_kczyjbxx_data.length>0){
                    this.update_kczyjbxx_data.splice(0,1);
                }

            }else{
                if(this.add_kczyjbxx_data.length>0){
                    this.add_kczyjbxx_data.splice(0,1);
                }
            }
        }else{
            if(this.listHcyAdd[this.kczyList[0].qsrId]) {

                delete this.listHcyAdd[this.kczyList[0].qsrId]['listKczyAdd'];
            }
        }
        this.kczyList[0] = (new kczy(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));

    }









}


export class kczy{

  constructor(
    public  id,
   public  zgbm,
   public  ztz,
   public  ssgcdm,
   public  pw,
   public  zyddmgc,
   public  qsrmc,
   public  jcrq,
   public  kccd,
   public  cjsj,
   public  kczylbmc,
   public  localitydesc,
   public  ymyxcdmc,
   public  mcsd,
   public  mc,
   public  zydldm,
   public  bz,
   public  zydlmc,
   public  dcfwdm,
   public  dmbh,
   public  dcfwmc,
   public  kcjh,
   public  ymyxcddm,
  public   qsrId,
   public  sjhsbzmc,
   public  kczylbdm,
   public  cl,
   public  ssxtdm,
   public  zhgxsj,
   public  zggc,
   public  jddm,
   public  swszxzqhdm,
   public  sfzh,
  public   sjhsbzdm,
   public  cz,
   public  szwz,
   public  zdgc
){

  }

}
