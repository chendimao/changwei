import {Component, OnInit, ViewChild} from '@angular/core';
import * as $ from "jquery";
import {HttpService} from "../../../../../../service/http-service";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {NgForm} from "@angular/forms";
import {InputChangeService} from "../../../../../../service/input-change.service";

@Component({
  selector: 'app-sbdgcjbxx',
  templateUrl: './sbdgcjbxx.component.html',
    styleUrls: ['../children.css']
})
export class SbdgcjbxxComponent implements OnInit {

public qshflId; //  权属户信息
public type: string; //  类型：查看、新增、修改
public childInfo: any;
public childInfo2: any;
public isShowArea: boolean = false;
public name_active_key; //  当前选中的下标
public del_sbdgcjbxx_data; //  删除的数据
public init_sbdgcjbxx_data; //  初始化的数据
public update_sbdgcjbxx_data; //  对比后修改的数据
public add_sbdgcjbxx_data ; //  新增的数据
public sbdList:any ;
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
public sbdgcjbxx2_data:any;
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
public isShowSbdgc: boolean;
public sbdgcTableList: null;
public sbdgcTreeList: string;
public selectPersonList = new Array();


    @ViewChild('forms') forms: NgForm;

constructor(public HttpService:HttpService,public DataProcessing:DataProcessingService,public InputChange: InputChangeService) { }

    ngAfterViewInit(): void {

            //if(this.sbdList[0].length>0){
                // 订阅表单值改变事件
                this.forms.valueChanges.subscribe( data => {
                  console.log('test');
                    let res = this.InputChange.get_select_change(this.sbdList[0],0,this.init_sbdgcjbxx_data,this.update_sbdgcjbxx_data,this.add_sbdgcjbxx_data,);

                    this.update_sbdgcjbxx_data = res['update_data'];

                    console.log(this.update_sbdgcjbxx_data);
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

    console.log(this.sbdgcjbxx2_data['returnObject']);
    this.sbdList = this.sbdgcjbxx2_data['returnObject'];
    console.log(this.childInfo);
    if(this.sbdList.length<=0){
        this.sbdList[0] = (new sbdgc(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','',''));

    }

    this.selectPersonList.push({label:'选择户成员',value:-1});

    if(this.childInfo2.length>0){

        this.childInfo2.forEach((value,index,arr)=>{

            this.selectPersonList.push({label:value['mc'],value:value['id']});

        });
    }

    console.log(this.sbdList[0]);

    console.log(this.sbdgcjbxx2_data);

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

        this.sbdList[0].localitydesc = e.qc;
        this.sbdList[0].swszxzqhdm = e.dm;
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
    this.sbdList[0].zydldm = event.dm;
    this.sbdList[0].zydlmc = event.mc;


}

//删除
    deleteSlect(){

      if(this.sbdList[0].qsrId.toString().length == 32){


          if(this.sbdList[0].id.toString().length == 32){
              this.del_sbdgcjbxx_data.push({id:this.sbdList[0].id});

              if(this.update_sbdgcjbxx_data.length>0){
                  this.update_sbdgcjbxx_data.splice(0,1);
              }

          }else{
              if(this.add_sbdgcjbxx_data.length>0){
                  this.add_sbdgcjbxx_data.splice(0,1);
              }
          }
      }else{
          delete this.listHcyAdd[this.sbdList[0].qsrId]['listSbdgcAdd'];
      }
        this.sbdList[0] = (new sbdgc(new Date().getTime(),'','','','','','','','','','','','','','','','','','','','','','','','','',''));
    }



//  调查范围显示下拉
showDcfwBlock(index) {
    this.zzcModel = true;

    if (this.type != "view") {
        this.isShowDcfw = this.isShowDcfw ? false : true;
        if (!this.dcfwTableList) {
            this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_SBDGC&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                .then((res) => {
                    console.log(res);
                    this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                });
            this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_SBDGC&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
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
    this.sbdList[0].dcfwdm = event.dm;
    this.sbdList[0].dcfwmc = event.mc;


}


//  输变电工程
showSbdgcBlock(index) {
    this.zzcModel = true;

    if (this.type != "view") {
        this.isShowSbdgc= this.isShowSbdgc ? false : true;
        if (!this.sbdgcTableList) {
            this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_SBDGC&column=SBDGCLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                .then((res) => {
                    console.log(res);
                    this.sbdgcTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                });
            this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_SBDGC&column=SBDGCLBDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                .then((res) => {
                    console.log(res['returnObject']);
                    this.sbdgcTableList = res['returnObject'];
                });
        }
    }
}



getChildSbdgc(event) {
    console.log(event);
    this.zzcModel = false;
    this.isShowSbdgc = false;
    this.sbdList[0].sbdgclbmc = event.qc;
    this.sbdList[0].sbdgclbdm = event.dm;

}


//权属人切换
eventQsr(e){

    if(this.sbdList[0].qsrId){
        if(this.sbdList[0].qsrId.toString().length == 32){
            if(this.add_sbdgcjbxx_data.length>0){
                this.add_sbdgcjbxx_data.forEach((value,index,arr)=>{
                    if(value['id'] == this.sbdList[0].id){
                        delete this.add_sbdgcjbxx_data[index];
                    }

                });
            }

            if(this.update_sbdgcjbxx_data.length>0){
                this.update_sbdgcjbxx_data.forEach((value,index,arr)=>{
                    if(value['id'] == this.sbdList[0].id){
                        delete this.update_sbdgcjbxx_data[index];
                    }

                });
            }


        }else{
            if(this.listHcyAdd[this.sbdList[0].qsrId] != undefined){

                delete this.listHcyAdd[this.sbdList[0].qsrId]['listSbdgcAdd'];
            }

        }

    }




    this.sbdList[0].qsrId = e;
    console.log(this.sbdList[0].id);

    if(this.sbdList[0].qsrId.toString().length ==32){
        if(this.sbdList[0].id.toString().length == 32){
            this.update_sbdgcjbxx_data.push(this.sbdList[0]);
        }else{
            this.add_sbdgcjbxx_data.push(this.sbdList[0]);
        }
    }else{
        this.listHcyAdd[this.sbdList[0].qsrId]['listSbdgcAdd'] = this.sbdList[0];



    }


    //将户成员基本信息带到房屋基本信息中
    this.childInfo2.forEach((value,index,arr)=>{

        if(value['id'] == this.sbdList[0]['qsrId']){
            for(var i in value){
                for(var ii in this.sbdList[0]){
                    if(i == ii && (i == 'szxzqhdm'  || i == 'xzqhmc' || i == 'dcfwdm' || i == 'dcfwmc' || i == 'zydlmc' || i == 'zydldm')){

                        this.sbdList[0][ii] = value[i];
                    }
                }
            }
            if(value['szxzqhdm'] !=null){
                this.sbdList[0]['swszxzqhdm'] = value['szxzqhdm'];
                this.sbdList[0]['localitydesc'] = value['xzqhmc'];
            }

        }


    });




    console.log(this.sbdList[0]);
    console.log(this.sbdgcjbxx2_data);


    console.log(this.add_sbdgcjbxx_data);
    console.log(this.update_sbdgcjbxx_data);
    console.log(this.listHcyAdd);


}

//建成日期
eventJgrq(e){

    this.sbdList[0].jcrq = e;

}





}


export class sbdgc{
  constructor(
      public id,
      public qsrId,
      public sbdgclbdm,
      public mc,
      public qsdd,
      public jsdd,
      public lsgx,
      public zyzdgc,
      public zyzggc,
      public dydj,
      public zyqsdd,
      public zyjsdd,
      public zycd,
      public fwfw,
      public jcrq,
      public dmgc,
      public rl,
      public zdmj,
      public zgrs,
      public bz,
      public dcfwmc,
      public dcfwdm,
      public sbdgclbmc,
      public zydlmc,
      public zydldm,
      public swszxzqhdm,
      public localitydesc

  ){

  }
}
