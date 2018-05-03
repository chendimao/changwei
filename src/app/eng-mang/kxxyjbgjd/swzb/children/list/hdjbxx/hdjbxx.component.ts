import {Component, OnInit, ViewChild} from '@angular/core';
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {InputChangeService} from "../../../../../../service/input-change.service";
import {HttpService} from "../../../../../../service/http-service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-hdjbxx',
  templateUrl: './hdjbxx.component.html',
    styleUrls: ['../children.css']
})
export class HdjbxxComponent implements OnInit {

    public qshflId; //  权属户信息
    public type: string; //  类型：查看、新增、修改
    public childInfo: any;
    public childInfo2: any;
    public isShowArea: boolean = false;
    public name_active_key; //  当前选中的下标
    public del_hdjbxx_data; //  删除的数据
    public init_hdjbxx_data; //  初始化的数据
    public update_hdjbxx_data; //  对比后修改的数据
    public add_hdjbxx_data ; //  新增的数据
    public hdList:any ;
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
    public hdjbxx2_data:any;
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
    public isShowhd: boolean;
    public hdTableList: null;
    public hdTreeList: string;
    public selectPersonList = new Array();


    @ViewChild('forms') forms: NgForm;
    private isShowgkdj;
    private gkdjTreeList: any;
    private gkdjTableList: any;

    constructor(public HttpService:HttpService,public DataProcessing:DataProcessingService,public InputChange: InputChangeService) { }

    ngAfterViewInit(): void {

        //if(this.hdList[0].length>0){
        // 订阅表单值改变事件
        this.forms.valueChanges.subscribe( data => {


            let res = this.InputChange.get_select_change(this.hdList[0],0,this.init_hdjbxx_data,this.update_hdjbxx_data,this.add_hdjbxx_data );

            this.update_hdjbxx_data = res['update_data'];


            console.log(this.update_hdjbxx_data);
            console.log(this.add_hdjbxx_data);

            for( let i in this.add_hdjbxx_data){
              if(i != '0'){
                  delete this.add_hdjbxx_data[i];
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

        console.log(this.hdjbxx2_data['returnObject']);
        this.hdList = this.hdjbxx2_data['returnObject'];
        console.log(this.childInfo);
        if(this.hdList.length<=0){
            this.hdList[0] = (new hd(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','',''));

        }

        this.selectPersonList.push({label:'选择户成员',value:-1});

        if(this.childInfo2.length>0){

            this.childInfo2.forEach((value,index,arr)=>{

                this.selectPersonList.push({label:value['mc'],value:value['id']});

            });
        }

        console.log(this.hdList[0].cd);

        console.log(this.hdjbxx2_data);

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

            this.hdList[0].localitydesc = e.qc;
            this.hdList[0].swszxzqhdm = e.dm;
            this.isShowArea = false;
        } else {
            this.isShowArea = false;
            this.zzcModel = false;
        }
    }



    //删除
    deleteSlect(){

        if(this.hdList[0].qsrId.toString().length == 32){


            if(this.hdList[0].id.toString().length == 32){
                this.del_hdjbxx_data.push({id:this.hdList[0].id});

                if(this.update_hdjbxx_data.length>0){
                    this.update_hdjbxx_data.splice(0,1);
                }

            }else{
                if(this.add_hdjbxx_data.length>0){
                    this.add_hdjbxx_data.splice(0,1);
                }
            }
        }else{
            if(this.listHcyAdd[this.hdList[0].qsrId] != undefined) {

                delete this.listHcyAdd[this.hdList[0].qsrId]['listHdAdd'];
            }
        }
        this.hdList[0] = (new hd(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','','','',''));
    }



    //  调查范围显示下拉
    showDcfwBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowDcfw = this.isShowDcfw ? false : true;
            if (!this.dcfwTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HD&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_HD&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.hdList[0].dcfwdm = event.dm;
        this.hdList[0].dcfwmc = event.mc;


    }


    //  输变电工程
    showhdBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowhd= this.isShowhd ? false : true;
            if (!this.hdTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HD&column=HDLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.hdTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HD&column=HDLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.hdTableList = res['returnObject'];
                    });
            }
        }
    }



    getChildhd(event) {
        console.log(event);
        this.zzcModel = false;
        this.isShowhd = false;
        this.hdList[0].hdlbmc = event.mc;
        this.hdList[0].hdlbdm = event.dm;

    }


    //  港口等级
    showgkdjBlock(index) {
        this.zzcModel = true;

        if (this.type != "view") {
            this.isShowgkdj= this.isShowgkdj ? false : true;
            if (!this.gkdjTreeList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HD&column=HDDJDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.gkdjTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HD&column=HDDJDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
        this.hdList[0].hddjmc = event.mc;
        this.hdList[0].hddjdm = event.dm;

    }



    //权属人切换
    eventQsr(e){

      console.log(this.hdList[0]);
        if(this.hdList[0].qsrId){
            if(this.hdList[0].qsrId.toString().length == 32){
                if(this.add_hdjbxx_data.length>0){
                    this.add_hdjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.hdList[0].id){
                            delete this.add_hdjbxx_data[index];
                        }

                    });
                }

                if(this.update_hdjbxx_data.length>0){
                    this.update_hdjbxx_data.forEach((value,index,arr)=>{
                        if(value['id'] == this.hdList[0].id){
                            delete this.update_hdjbxx_data[index];
                        }

                    });
                }


            }else{
                if(this.listHcyAdd[this.hdList[0].qsrId] != undefined){

                    delete this.listHcyAdd[this.hdList[0].qsrId]['listHdAdd'];
                }

            }

        }




        this.hdList[0].qsrId = e;
        console.log(this.hdList[0].id);

        if(this.hdList[0].qsrId.toString().length ==32){
            if(this.hdList[0].id.toString().length == 32){
                this.update_hdjbxx_data[0] = this.hdList[0];
            }else{
                this.add_hdjbxx_data[0] = this.hdList[0];
            }
        }else{
            this.listHcyAdd[this.hdList[0].qsrId]['listHdAdd'] = this.hdList[0];



        }


        //将户成员基本信息带到房屋基本信息中
        this.childInfo2.forEach((value,index,arr)=>{

            if(value['id'] == this.hdList[0]['qsrId']){
                for(var i in value){
                    for(var ii in this.hdList[0]){
                        if(i == ii && (i == 'szxzqhdm'  || i == 'xzqhmc' || i == 'dcfwdm' || i == 'dcfwmc' || i == 'zydlmc' || i == 'zydldm')){
                            this.hdList[0][ii] = value[i];
                        }
                    }
                }
                if(value['szxzqhdm'] !=null){
                    this.hdList[0]['swszxzqhdm'] = value['szxzqhdm'];
                    this.hdList[0]['localitydesc'] = value['xzqhmc'];
                }

            }


        });




        console.log(this.hdList[0]);
        console.log(this.hdjbxx2_data);


        console.log(this.add_hdjbxx_data);
        console.log(this.update_hdjbxx_data);
        console.log(this.listHcyAdd);


    }

    //建成日期
    eventJgrq(e){

        this.hdList[0].jcrq = e;

    }





}

export class hd{

  constructor(
    public id,
    public zydlmc,
    public zydldm,
    public dcfwdm,
    public localitydesc,
    public swszxzqhdm,
    public dcfwmc,
    public hdlbmc,
    public hddjmc,
    public ssxtdm,
    public ssgcdm,
    public jddm,
    public qsrId,
    public hdbh,
    public hdlbdm,
    public mc,
    public thnl,
    public hddjdm,
    public cd,
    public dmbh,
    public zdgc,
    public zggc,
    public szwz,
    public zgbm,
    public yxgldw,
    public bz,
    public cjsj,
    public zhgxsj,
    public qsrmc,


  ){

  }


}