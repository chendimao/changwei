import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../../../../../service/http-service";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {NgForm} from "@angular/forms";
import {InputChangeService} from "../../../../../../service/input-change.service";



@Component({
  selector: 'app-gdgcjbxx',
  templateUrl: './gdgcjbxx.component.html',
    styleUrls: ['../children.css']
})
export class GdgcjbxxComponent implements OnInit {
    public qshflId; //  权属户信息
    public type: string; //  类型：查看、新增、修改
    public childInfo: any;
    public childInfo2: any;
    public isShowArea: boolean = false;
    public name_active_key; //  当前选中的下标
    public del_gdgcjbxx_data; //  删除的数据
    public init_gdgcjbxx_data; //  初始化的数据
    public update_gdgcjbxx_data; //  对比后修改的数据
    public add_gdgcjbxx_data ; //  新增的数据
    public gdgcList:any ;
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
    public gdgcjbxx2_data:any;
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
    public isShowgdgc: boolean;
    public gdgcTableList: null;
    public gdgcTreeList: string;
    public selectPersonList = new Array();
    @ViewChild('forms') forms: NgForm;



    constructor(public HttpService:HttpService,public DataProcessing:DataProcessingService,public InputChange:InputChangeService) { }



    ngAfterViewInit(): void {

        //if(this.gdgcList[0].length>0){
            console.log(this.gdgcList[0]);
            console.log(this.forms);
          // 订阅表单值改变事件
        this.forms.valueChanges.subscribe( data => {
            console.log('test');
            let res = this.InputChange.get_select_change(this.gdgcList[0],0,this.init_gdgcjbxx_data,this.update_gdgcjbxx_data,[]);

            this.update_gdgcjbxx_data= res['update_data'];

            console.log(this.update_gdgcjbxx_data);
        });

        // }

    }



    ngOnInit() {

        console.log(this.szxzqugldm);
        console.log(this.init_gdgcjbxx_data);

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

        console.log(this.gdgcjbxx2_data['returnObject']);
        this.gdgcList = this.gdgcjbxx2_data['returnObject'];
        console.log(this.childInfo);
        if(this.gdgcList.length<=0){
         //   this.gdgcList[0] = (new gdgc(new Date().getTime(),'','','','','',this.childInfo.xzqhmc?this.childInfo.xzqhmc:'','',this.childInfo.zydldm?this.childInfo.zydldm:'','','','',this.childInfo.zydlmc?this.childInfo.zydlmc:'','',this.childInfo.dcfwmc?this.childInfo.dcfwmc:'','',this.childInfo.dcfwdm?this.childInfo.dcfwdm:'','','','','','','',this.childInfo.ssxzqhdm?this.childInfo.ssxzqhdm:'','','','',''));
            this.gdgcList[0] = (new gdgc(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','',''));

        }

        this.selectPersonList.push({label:'选择户成员',value:-1});

        if(this.childInfo2.length>0){

            this.childInfo2.forEach((value,index,arr)=>{

                this.selectPersonList.push({label:value['mc'],value:value['id']});

            });
        }


        console.log(this.gdgcjbxx2_data);
        console.log(this.gdgcList[0]);
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

            this.gdgcList[0].localitydesc = e.qc;
            this.gdgcList[0].swszxzqhdm = e.dm;
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
        this.gdgcList[0].zydldm = event.dm;
        this.gdgcList[0].zydlmc = event.mc;


    }

    //  调查范围显示下拉
    showDcfwBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowDcfw = this.isShowDcfw ? false : true;
            if (!this.dcfwTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GDGC&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_GDGC&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.gdgcList[0].dcfwdm = event.dm;
        this.gdgcList[0].dcfwmc = event.mc;


    }


    //  输变电工程
    showgdgcBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowgdgc= this.isShowgdgc ? false : true;
            if (!this.gdgcTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_GDGC&column=GDGCLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.gdgcTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_GDGC&column=GDGCLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.gdgcTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildgdgc(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowgdgc = false;
        this.gdgcList[0].gdgclbmc = event.mc;
        this.gdgcList[0].gdgclbdm = event.dm;

    }


    //权属人切换
    eventQsr(e){

        if(this.gdgcList[0].qsrId){
            if(this.gdgcList[0].qsrId.toString().length == 32){
                if(this.add_gdgcjbxx_data.length>0){
                    this.add_gdgcjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.gdgcList[0].id){
                            delete this.add_gdgcjbxx_data[index];
                        }

                    });
                }

                if(this.update_gdgcjbxx_data.length>0){
                    this.update_gdgcjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.gdgcList[0].id){
                            delete this.update_gdgcjbxx_data[index];
                        }

                    });


                }


                if(this.gdgcList[0].id.toString().length ==32){
                    this.del_gdgcjbxx_data.push({id:this.gdgcList[0].id});
                }


            }else{
                if(this.listHcyAdd[this.gdgcList[0].qsrId] != undefined){

                    delete this.listHcyAdd[this.gdgcList[0].qsrId]['listGdgcAdd'];
                }

            }

        }




        this.gdgcList[0].qsrId = e;
        console.log(this.gdgcList[0].id);

        if(this.gdgcList[0].qsrId.toString().length ==32){

                this.gdgcList[0].id = new Date().getTime();
                this.add_gdgcjbxx_data.push(this.gdgcList[0]);

        }else{
            this.listHcyAdd[this.gdgcList[0].qsrId]['listGdgcAdd'] = this.gdgcList[0];



        }


        console.log(this.gdgcList[0]);
        console.log(this.gdgcjbxx2_data);


        console.log(this.add_gdgcjbxx_data);
        console.log(this.del_gdgcjbxx_data);
        console.log(this.update_gdgcjbxx_data);
        console.log(this.listHcyAdd);



        //将户成员基本信息带到房屋基本信息中
        this.childInfo2.forEach((value,index,arr)=>{

            if(value['id'] == this.gdgcList[0]['qsrId']){
                for(var i in value){
                    for(var ii in this.gdgcList[0]){
                        if(i == ii && (i == 'szxzqhdm'  || i == 'xzqhmc' || i == 'dcfwdm' || i == 'dcfwmc' || i == 'zydlmc' || i == 'zydldm')){

                            this.gdgcList[0][ii] = value[i];
                        }
                    }
                }
                if(value['szxzqhdm'] !=null){
                    this.gdgcList[0]['swszxzqhdm'] = value['szxzqhdm'];
                    this.gdgcList[0]['localitydesc'] = value['xzqhmc'];
                }

            }


        });



    }

    //建成日期
    eventJgrq(e){

        this.gdgcList[0].jcrq = e;

    }



//删除
    deleteSlect(){

        if(this.gdgcList[0].qsrId.toString().length == 32){


            if(this.gdgcList[0].id.toString().length == 32){
                this.del_gdgcjbxx_data.push({id:this.gdgcList[0].id});

                if(this.update_gdgcjbxx_data.length>0){
                    this.update_gdgcjbxx_data.splice(0,1);
                }

                console.log(this.add_gdgcjbxx_data);

            }else{
                if(this.add_gdgcjbxx_data.length>0){
                    this.add_gdgcjbxx_data.splice(0,1);
                }
            }
        }else{
            if(this.listHcyAdd[this.gdgcList[0].qsrId]) {

                delete this.listHcyAdd[this.gdgcList[0].qsrId]['listGdgcAdd'];
            }
        }
        this.gdgcList[0] = (new gdgc(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','',''));

    }









}

export class gdgc{

  constructor(
      public id,
    public ssjz,
    public ssgcdm,
    public qsrmc,
   public gdgclbdm,
   public lsgx,
   public cjsj,
   public localitydesc,
   public mc,
   public zydldm,
   public qsdd,
   public jgcl,
   public bz,
   public zydlmc,
   public dcfwdm,
   public cd,
   public dcfwmc,
   public qsrId,
   public ssxtdm,
   public zhgxsj,
   public bsfs,
   public  zj,
   public jddm,
   public  swszxzqhdm,
   public  sfzh,
   public  gdgclbmc,
   public  jsdd,
   public  sjssnl


){

  }

}

