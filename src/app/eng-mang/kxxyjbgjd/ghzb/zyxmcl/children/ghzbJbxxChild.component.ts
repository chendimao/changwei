import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../../../../service/http-service";
import {DataProcessingService} from "../../../../../service/dataProcessing.service";
import {GHZB_DATA_TITLE} from "../../../../../service/ghzb-title.service";
import {FormControl, NgForm} from "@angular/forms";
import * as _ from 'lodash';
import {ghzbList} from "../ghzbJbxx.component";
import {ShareService} from "../../../../../systemSetting/service/share.service";

@Component({
    selector: 'app-ghzbJbxxChild',
    templateUrl: './ghzbJbxxChild.component.html',
    styleUrls: ["../ghzbJbxx.component.css"]
})
export class  GhzbJbxxChildComponent implements OnInit {
    // 加的加载
    isShowRight: boolean = true;
    defaultShow: boolean = true;

    display1: boolean = true;
    public treelist: any;
    public baseInfo;
    public dm;
    public Title;
    public selectType: number = 1;
    public isShowArea: boolean = false;
    public isDisabled;
    public ghzb_data;
    public parent_params;
    public type;
    public params;
    public msgs: any;
    public selectPersonList =[] ;
    public ghxm = {};
    public ghxmjbxx = {};
    public listDlzbflbmxDel = [];
    public listDlzbflbmxAdd = [];
    public listDlzbflbmxEdit = [];
    public data = {ghxm:null,ghxmjbxx:null,listDlzbflbmxDel:null,listDlzbflbmxAdd:null,listDlzbflbmxEdit:null};
    public isShow: boolean = true;
    private init_ghzb_data: any;
    private ghzb_data_copy: any;
    public xmmc: FormControl = new FormControl();
    public xmjc: FormControl = new FormControl();
    public bz: FormControl = new FormControl();
    private isShowArea2: any;
    public dj;
    public dataList;

    public totalPage: number;

    public count: number;
    public currentPage: number;

    public lityCode ;
    public lityCode2 ;

    @ViewChild('jbxx') jbxx:NgForm;
    @ViewChild('xmxx') xmxx:NgForm;




    constructor(public ShareService:ShareService, private HttpService: HttpService, private DataProcessingService: DataProcessingService) {


    }

    openModal() {
        this.display1 = true;
    }

    closeModal() {
        this.display1 = false;

        // this.HttpService.get(this.getUrl()).then((data)=>{
        //
        //     console.log(data);
        //     this.dataList = data['returnObject'];
        //     this.currentPage = data['currentPage'];
        //     this.totalPage = data['totalPage'];
        //     this.count = data['count'];
        // });

        this.ShareService.sendMessage({
            severity: 'success',
            summary: '提醒',
            detail: '退出',
            display: 'true',
            item: 'ghzb2'

        });


    }



    ngOnInit() {


        console.log(this.baseInfo);
        console.log(this.type);
        console.log(this.params);
        console.log(this.dj);
 


        this.lityCode = JSON.parse(JSON.stringify(this.params.xmszxzqhdm));
        this.lityCode2 = JSON.parse(JSON.stringify(this.params.xmszxzqhdm));


        if(this.type == 'add'){
            console.log(this.type);

            this.isDisabled = false;
            this.ghzb_data = new ghxmdata(null,null,null,null,null,
                null,null,'X000001',this.params.ssgcdm,this.params.ssghxmfldm,
                null,null,this.params.xmszxzqhdm,null,null,null,
                null,this.params.localityDesc,this.params.localityDesc,
                [new FlbmxList(null,null,null,null,null,null,null,'X000001',null,this.parent_params.jddm,this.params.dlzbfldm,null,null,null,null,null,null,null)],
                 new Ghxmjbxx(null,null,null,null,null,null,null,'X000001',this.params.ssgcdm,null,this.parent_params.jddm,null,null,null,null,null,null)
                )



            console.log(this.ghzb_data);
            this.ghzb_data.xmgldwxzqhdm = this.params.xmszxzqhdm;

        }else{

            if(this.type == 'view'){
                this.isDisabled = true;
            }

            console.log(this.type);

            this.HttpService.get(`ghxm/show?id=${this.baseInfo['id']}`).then(data=>{
                console.log(data);
                this.init_ghzb_data = JSON.parse(JSON.stringify(data['returnObject']));
                this.ghzb_data_copy = JSON.parse(JSON.stringify(data['returnObject']));
                this.ghzb_data = JSON.parse(JSON.stringify(data['returnObject']));

                console.log(this.ghzb_data);

                //规划指标基本信息
                this.isShow = true;

                if(!this.ghzb_data['ghxmjbxx']){
                    this.ghzb_data['ghxmjbxx'] = {};

                    this.ghzb_data.ghxmjbxx =new Ghxmjbxx(null,null,null,null,null,null,null,'X000001',this.params.ssgcdm,this.ghzb_data.id,this.parent_params.jddm,null,null,null,null,null,null) ;


                }

                //按序号加空格
                this.ghzb_data.flbmxList.forEach((value,index,arr)=>{

                    arr[index].zdxmc = (new Array(value.zdxxh.split('.').length).join("&nbsp;&nbsp;"))+arr[index].zdxmc;

                });


                console.log(this.ghzb_data);


            });






            console.log(this.treelist);
            console.log(this.ghzb_data);
            // this.HttpService.get(`locality/listTree`)
            //     .then(res => {
            //         this.treelist = this.DataProcessingService.replaceChildlList(res['returnObject'], 'localityName', 'label', 'childrenLocality', 'children');
            //
            //     });



            console.log(this.selectPersonList);


        }

        //等级选择
        this.selectPersonList.push({label:'选择等级',value:-1});
        if(this.dj && this.dj.length>0){

            this.dj.forEach((value,index,arr)=>{

                this.selectPersonList.push({label:value['mc'],value:value['dm']});

            });
        }


        //========mc change=======
        this.xmxx.valueChanges.subscribe(data =>{


            if(this.init_ghzb_data && this.init_ghzb_data.id){
                if(this.init_ghzb_data.xmmc != data.xmmc){

                    this.ghxm['id'] = this.init_ghzb_data.id;
                    this.ghxm['xmmc']  = data.xmmc;

                }else{
                    if(this.ghxm && this.ghxm['xmmc']){
                        delete this.ghxm['xmmc'];
                    }
                }

                if(this.init_ghzb_data.xmjc != data.xmjc){

                    this.ghxm['id'] = this.init_ghzb_data.id;
                    this.ghxm['xmjc']  = data.xmjc;

                }else{
                    if(this.ghxm && this.ghxm['xmjc']){
                        delete this.ghxm['xmjc'];
                    }
                }

                if(this.init_ghzb_data.bz != data.bz){

                    this.ghxm['id'] = this.init_ghzb_data.id;
                    this.ghxm['bz']  = data.bz;

                }else{
                    if(this.ghxm && this.ghxm['bz']){
                        delete this.ghxm['bz'];
                    }
                }


            }else{

                this.ghxm['xmmc'] = data.xmmc;
                this.ghxm['xmjc'] = data.xmjc;
                this.ghxm['bz'] = data.bz;

            }



            this.data.ghxm = this.ghxm;
            this.data.ghxmjbxx = this.ghxmjbxx;
            this.data.listDlzbflbmxAdd = this.listDlzbflbmxAdd;
            this.data.listDlzbflbmxDel = this.listDlzbflbmxDel;
            this.data.listDlzbflbmxEdit = this.listDlzbflbmxEdit;




            console.log(this.init_ghzb_data);
            console.log(this.ghxm);
            console.log(this.data.ghxm);



        })
        //=================

        // //========jc change=======
        // this.xmjc.valueChanges.subscribe(data =>{
        //     console.log(this.ghzb_data);
        //     console.log(data);
        //     if(this.init_ghzb_data && this.init_ghzb_data.id){
        //         if(this.init_ghzb_data.xmjc != data){
        //
        //
        //             this.ghxm['id'] = this.init_ghzb_data.id;
        //             this.ghxm['xmjc']  = data;
        //
        //         }else{
        //             if(this.ghxm && this.ghxm['xmjc']){
        //                 delete this.ghxm['xmjc'];
        //             }
        //         }
        //     }else{
        //
        //         this.ghxm['xmjc'] = data;
        //
        //     }
        //     console.log(this.init_ghzb_data);
        //     console.log(this.ghxm);
        //
        //
        //     this.data.ghxm = this.ghxm;
        //     this.data.ghxmjbxx = this.ghxmjbxx;
        //     this.data.listDlzbflbmxAdd = this.listDlzbflbmxAdd;
        //     this.data.listDlzbflbmxDel = this.listDlzbflbmxDel;
        //     this.data.listDlzbflbmxEdit = this.listDlzbflbmxEdit;
        //
        // })
        // //=================
        //
        // //========bz change=======
        // this.bz.valueChanges.subscribe(data =>{
        //
        //     console.log(data);
        //
        //     if(this.init_ghzb_data && this.init_ghzb_data.id){
        //         if(this.init_ghzb_data.bz != data){
        //
        //
        //             this.ghxm['id'] = this.init_ghzb_data.id;
        //             this.ghxm['bz']  = data;
        //
        //         }else{
        //             if(this.ghxm && this.ghxm['bz']){
        //                 delete this.ghxm['bz'];
        //             }
        //         }
        //     }else{
        //
        //         this.ghxm['bz'] = data;
        //
        //     }
        //
        //     console.log(this.init_ghzb_data);
        //     console.log(this.ghxm);
        //
        //
        //     this.data.ghxm = this.ghxm;
        //     this.data.ghxmjbxx = this.ghxmjbxx;
        //     this.data.listDlzbflbmxAdd = this.listDlzbflbmxAdd;
        //     this.data.listDlzbflbmxDel = this.listDlzbflbmxDel;
        //     this.data.listDlzbflbmxEdit = this.listDlzbflbmxEdit;
        //
        // })
        // //=================

        //======== 基本信息 ========
        this.jbxx.valueChanges.subscribe(data =>{

            console.log(data);

            this.data.ghxmjbxx = _.cloneDeep(this.ghzb_data.ghxmjbxx);

            this.data.ghxmjbxx.szwz = data.szwz;
            this.data.ghxmjbxx.ghtz= data.ghtz;
            this.data.ghxmjbxx.ghfazy = data.ghfazy;
            this.data.ghxmjbxx.bz = data.bz;


            console.log(this.ghzb_data);
            console.log(this.ghxmjbxx);
            console.log(this.init_ghzb_data);





        });

        //===========================







        for(let i in GHZB_DATA_TITLE){
            if(i == this.dm){
                this.Title = GHZB_DATA_TITLE[i];
            }

        }







    }


    //保存数据
    save(){
        console.log(this.baseInfo);
        console.log(this.data);





console.log(this.data['listDlzbflbmxDel']);

        if(this.ghzb_data['xmmc'] == null || this.ghzb_data['xmmc'] == ""){
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '保存提醒', detail: '名称为必填'});
        }else if(this.ghzb_data['xmjc'] == null || this.ghzb_data['xmjc'] == ""){

            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '保存提醒', detail: '简称为必填'});
        }else if(this.dj && this.dj.length>0 && this.ghzb_data.ssghxmfldm == null){

            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '保存提醒', detail: '等级为必填'});
        }else{
            var arr1 = [];
            var arr2 = [];
            var arr3 = [];
            var arr4 = [];
            var arr5 = [];

            if(this.data['ghxm'] !=null){

                arr1 =Object.keys(this.data['ghxm']);
            }

            if(this.data['ghxmjbxx'] !=null){
                console.log(this.data['ghxmjbxx']);
                arr2 =Object.keys(this.data['ghxmjbxx']);
            }

            if(this.data['listDlzbflbmxDel'] !=null){
                let t = 0;

                for(let i in this.data['listDlzbflbmxDel']){
                    this.data['listDlzbflbmxDel'][t] = this.data['listDlzbflbmxDel'][i];
                    delete this.data['listDlzbflbmxDel'][i];

                    t++;

                }

                arr3 =Object.keys(this.data['listDlzbflbmxDel']);
                console.log(arr3);
            }

            if(this.data['listDlzbflbmxAdd'] !=null){
                let t = 0;

                for(let i in this.data['listDlzbflbmxAdd']){
                    this.data['listDlzbflbmxAdd'][t] = this.data['listDlzbflbmxAdd'][i];
                    delete this.data['listDlzbflbmxAdd'][i];

                    t++;

                }
                arr4 =Object.keys(this.data['listDlzbflbmxAdd']);

            }

            if(this.data['listDlzbflbmxEdit'] !=null){
                let t = 0;

                for(let i in this.data['listDlzbflbmxEdit']){
                    this.data['listDlzbflbmxEdit'][t] = this.data['listDlzbflbmxEdit'][i];
                    delete this.data['listDlzbflbmxEdit'][i];

                    t++;

                }
                arr5 =Object.keys(this.data['listDlzbflbmxEdit']);
            }


            if(arr1.length == 0){
                // delete  this.data['ghxm'];
            }else{


                this.data['ghxm'].ssxtdm = 'X000001';
                this.data['ghxm'].ssgcdm = this.ghzb_data.ssgcdm;
                this.data['ghxm'].xmszxzqhdm = this.ghzb_data.xmszxzqhdm;
                this.data['ghxm'].xmgldwxzqhdm = this.ghzb_data.xmgldwxzqhdm;
            }
            if(arr2.length == 0){
                delete  this.data['ghxmjbxx'];
            }


            if(arr3.length == 0){
                delete  this.data['listDlzbflbmxDel'];
            }


            if(arr4.length == 0){
                delete  this.data['listDlzbflbmxAdd'];
            }


            if(arr5.length == 0){
                delete  this.data['listDlzbflbmxEdit'];
            }

            if(this.type != 'add'){

                if(this.data.ghxm){
                    this.data.ghxm['id'] = this.ghzb_data.id;
                }

            }
            //如果规划投资为空则改为 -100
            if(this.data.ghxmjbxx && (this.data.ghxmjbxx.ghtz == null || this.data.ghxmjbxx.ghtz.toString().trim() == "")){
                this.data.ghxmjbxx.ghtz = -100;
            }

            console.log(this.data);

            var arr6 =Object.keys(this.data);

            if(arr6.length >0){

                this.HttpService.post(`ghxm/save`,this.data).then(data =>{


                    this.data = {ghxm:{id:this.type=='add'?null:this.ghzb_data['id']} ,ghxmjbxx:null,listDlzbflbmxDel:null,listDlzbflbmxAdd:null,listDlzbflbmxEdit:null};

                    this.msgs = [];
                    this.msgs.push({severity: 'success', summary: '保存提醒', detail: '保存成功'});

                    if(this.type == 'rew'){

                        this.HttpService.get(`ghxm/show?id=${data['returnObject']}`).then(data=>{
                            console.log(data);
                            this.init_ghzb_data = JSON.parse(JSON.stringify(data['returnObject']));
                            this.ghzb_data_copy = JSON.parse(JSON.stringify(data['returnObject']));
                            this.ghzb_data = JSON.parse(JSON.stringify(data['returnObject']));

                            console.log(this.ghzb_data);

                            //规划指标基本信息

                            if(!this.ghzb_data['ghxmjbxx']){
                                this.ghzb_data['ghxmjbxx'] = {};

                                this.ghzb_data.ghxmjbxx =new Ghxmjbxx(null,null,null,null,null,null,null,'X000001',this.params.ssgcdm,this.ghzb_data.id,this.parent_params.jddm,null,null,null,null,null,null) ;


                            }

                            //按序号加空格
                            this.ghzb_data.flbmxList.forEach((value,index,arr)=>{

                                arr[index].zdxmc = (new Array(value.zdxxh.split('.').length).join("&nbsp;&nbsp;"))+arr[index].zdxmc;

                            });


                            console.log(this.ghzb_data);


                        });

                    }




                },error=>{
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '保存提醒', detail: error});
                });
            }

            this.type = 'rew';
            console.log(this.data);


        }

    }

    getEvent(event) {
        this.isShowRight = event;
        this.defaultShow = false;
    }


    selectName(i){
        if(i == 1){
            this.selectType = 1;
        }else if(i == 2){
            this.selectType = 2;
        }
    }


    //行政区划
    showAreaBlock(): void {
        if (this.isShowArea) {
            this.isShowArea = false;
        } else {
            this.isShowArea = true;
        }

    }



    getChildSzxzqh(e) {
        console.log(e);
        if (e) {
           // this.name_active_data.localitydesc = e.qc;
           // this.name_active_data.swszxzqhdm = e.dm;
            this.isShowArea = false;
            this.ghzb_data.xmszxzqhmc = e.qc;
            this.ghzb_data.xmszxzqhdm = e.dm;


            if(this.init_ghzb_data && this.init_ghzb_data.id){
                if(this.init_ghzb_data.xmszxzqhdm != e.dm){

                    this.ghxm['id'] = this.init_ghzb_data.id;
                    this.ghxm['xmszxzqhdm']  = e.dm;
                    this.ghxm['xmszxzqhmc']  = e.qc;

                }else{
                    if(this.ghxm && this.ghxm['xmszxzqhdm']){
                        delete this.ghxm['xmszxzqhdm'];
                        delete this.ghxm['xmszxzqhmc'];
                    }
                }
            }else{

                this.ghxm['xmszxzqhdm']  = e.dm;
                this.ghxm['xmszxzqhmc']  = e.qc;

            }

            console.log(this.ghxm);
        }
    }


    //行政区划2
    showAreaBlock2(): void {
        if (this.isShowArea2) {
            this.isShowArea2 = false;
        } else {
            this.isShowArea2 = true;
        }

    }



    getChildSzxzqh2(e) {
        console.log(e);
        if (e) {
            // this.name_active_data.localitydesc = e.qc;
            // this.name_active_data.swszxzqhdm = e.dm;
            this.isShowArea2 = false;
            this.ghzb_data.xmgldwxzqhmc = e.qc;
            this.ghzb_data.xmgldwxzqhdm = e.dm;

            if(this.init_ghzb_data && this.init_ghzb_data.id){
                if(this.init_ghzb_data.xmgldwxzqhdm != e.dm){

                    this.ghxm['id'] = this.init_ghzb_data.id;
                    this.ghxm['xmgldwxzqhdm']  = e.dm;
                    this.ghxm['xmgldwxzqhmc']  = e.qc;

                }else{
                    if(this.ghxm && this.ghxm['xmgldwxzqhdm']){
                        delete this.ghxm['xmgldwxzqhdm'];
                        delete this.ghxm['xmgldwxzqhmc'];
                    }
                }
            }else{

                this.ghxm['xmgldwxzqhdm'] = e.dm;
                this.ghxm['xmgldwxzqhmc']  = e.qc;


            }



        }
    }




    //树table点击
    DatatableClick(event ){
        console.log(event);

    }


    //tableChange
    tableChange($event){
        console.log($event);
        console.log(this.baseInfo);

        if($event.id && $event.id.toString().length ==32){


            if($event.sl != null && $event.sl  != ""){
                console.log($event);
                if(this.data['listDlzbflbmxEdit'] && !this.data['listDlzbflbmxEdit'][$event.dlzbfldm]){
                    this.data['listDlzbflbmxEdit'][$event.dlzbfldm] = {};
                }
                this.ghzb_data_copy.flbmxList.forEach((value,index,arr)=>{

                    if(arr[index]['zdxxh'] == $event.zdxxh){
                        arr[index]['sl'] = $event.sl;

                            if(!this.data['listDlzbflbmxEdit']){
                                this.data['listDlzbflbmxEdit'] = [];
                            }

                        if(!this.data['listDlzbflbmxEdit'][$event.dlzbfldm]){
                            this.data['listDlzbflbmxEdit'][$event.dlzbfldm] = {};
                        }

                        if(!this.data['listDlzbflbmxDel']){
                            this.data['listDlzbflbmxDel'] = [];
                        }

                        if(!this.data['listDlzbflbmxDel'][$event.dlzbfldm]){
                            this.data['listDlzbflbmxDel'][$event.dlzbfldm] = {};
                        }


                        this.data['listDlzbflbmxEdit'][$event.dlzbfldm].sl = $event.sl;

                        if(this.data['listDlzbflbmxDel'][$event.dlzbfldm]){
                            delete this.data['listDlzbflbmxDel'][$event.dlzbfldm];
                        }

                    }

                });
                this.data['listDlzbflbmxEdit'][$event.dlzbfldm].id = $event.id;
            }else{

                console.log(this.data['listDlzbflbmxDel']);

                if(!this.data['listDlzbflbmxDel'] ){
                    this.data['listDlzbflbmxDel']  = [];
                }

                if(!this.data['listDlzbflbmxDel'][$event.dlzbfldm]){
                    this.data['listDlzbflbmxDel'][$event.dlzbfldm] = {};
                }
                this.ghzb_data_copy.flbmxList.forEach((value,index,arr)=>{

                    if(arr[index]['zdxxh'] == $event.zdxxh){

                        if(this.data['listDlzbflbmxEdit'] && this.data['listDlzbflbmxEdit'][$event.dlzbfldm]){
                            delete this.data['listDlzbflbmxEdit'][$event.dlzbfldm];
                        }
                    }

                })
                this.data['listDlzbflbmxDel'][$event.dlzbfldm].id = $event.id;

            }

            if(this.data.ghxm){
                this.data.ghxm['id'] = $event.id;
            }



           // if(this.isShow == true){
                this.ghzb_data.flbmxList.forEach((value,index,arr)=>{

                    this.ghzb_data_copy.flbmxList.forEach((v,i,a)=>{

                        if(value['zdxxh'] == v['zdxxh']){
                            this.ghzb_data_copy.flbmxList[index]['sl'] = this.ghzb_data.flbmxList[index]['sl'];
                            console.log(this.ghzb_data_copy.flbmxList[index]);
                        }

                    })

                })
            // }else{
            //
            //     this.ghzb_data.flbmxList.forEach((value,index,arr)=>{
            //
            //         this.ghzb_data_copy.flbmxList.forEach((v,i,a)=>{
            //
            //             if(value['zdxxh'] == v['zdxxh']){
            //                 this.ghzb_data_copy.flbmxList[index]['sl'] = this.ghzb_data.flbmxList[index]['sl'];
            //                 console.log(this.ghzb_data_copy.flbmxList[index]);
            //             }
            //
            //         })
            //
            //     })
            //
            // }

            console.log(this.data['listDlzbflbmxEdit']);

        }else{
            if(!this.data['listDlzbflbmxAdd'] ){
                this.data['listDlzbflbmxAdd'] = [];
            }

            if(!this.data['listDlzbflbmxAdd'][$event.dlzbfldm]){
                this.data['listDlzbflbmxAdd'][$event.dlzbfldm] = {};
            }

            console.log(this.data['listDlzbflbmxAdd']);

            this.data['listDlzbflbmxAdd'][$event.dlzbfldm].sl = $event.sl;

            if(this.baseInfo){

                this.data['listDlzbflbmxAdd'][$event.dlzbfldm].ssghxmId =  this.baseInfo.id ;
            }
            this.data['listDlzbflbmxAdd'][$event.dlzbfldm].ssxtdm = 'X000001';
            this.data['listDlzbflbmxAdd'][$event.dlzbfldm].jddm = this.parent_params.jddm;
            this.data['listDlzbflbmxAdd'][$event.dlzbfldm].dlzbfldm = $event.dlzbfldm;

            if(this.data.ghxm && this.baseInfo && this.type !='add'){
                this.data.ghxm.id =   this.baseInfo.id ;
            }


        }

        console.log(this.ghzb_data);
        console.log(this.ghzb_data_copy);
        console.log(this.data['listDlzbflbmxEdit']);
        console.log(this.listDlzbflbmxAdd);
        console.log(this.listDlzbflbmxDel);
        console.log(this.data);


        this.ghzb_data.flbmxList.forEach((value,index,arr)=>{

            this.ghzb_data_copy.flbmxList.forEach((v,i,a)=>{

                if(value['zdxxh'] == v['zdxxh']){
                    this.ghzb_data_copy.flbmxList[index]['sl'] = this.ghzb_data.flbmxList[index]['sl'];
                    console.log(this.ghzb_data_copy.flbmxList[index]);
                }

            })

        })


    }


    //清除表单数据
    Clear(){
        console.log(this.ghzb_data.flbmxList);
        this.isShow = true;
        this.ghzb_data_copy.flbmxList.forEach((value,index,arr)=>{

            if(arr[index].id){
                if(this.listDlzbflbmxEdit[arr[index].dlzbfldm]){

                    delete this.listDlzbflbmxEdit[arr[index].dlzbfldm];
                }

                if(!this.listDlzbflbmxDel[arr[index].dlzbfldm]){
                    this.listDlzbflbmxDel[arr[index].dlzbfldm] = {};
                }
                this.listDlzbflbmxDel[arr[index].dlzbfldm].id = arr[index].id ;
            }

            arr[index].sl = null;


        })

        console.log(this.ghzb_data_copy.flbmxList);
        console.log(this.listDlzbflbmxDel);
        this.ghzb_data = JSON.parse(JSON.stringify(this.ghzb_data_copy));
        this.data.listDlzbflbmxDel = this.listDlzbflbmxDel;




    }


    //  显示所有
    showAll(i){

        console.log(this.ghzb_data);
        console.log(this.init_ghzb_data);
        console.log(i);
        if(i){

            for(let i = 0,len = this.ghzb_data.flbmxList.length;i<len;i++){
                console.log(i);
                if(this.ghzb_data.flbmxList[i].sl == null  ){
                        console.log(this.ghzb_data.flbmxList[i]);
                      this.ghzb_data.flbmxList.splice(i,1);
                      len--;
                      i--;
                }
            }
            console.log(this.ghzb_data.flbmxList);
            this.ghzb_data.flbmxList = this.ghzb_data.flbmxList.slice();
            //
            // this.name_active_base.forEach((value,index,arr)=>{
            //     console.log(index);
            //     this.name_active_base[i] = this.InputChange.showCheck(this.name_active_base[index],'sl');
            //
            // });
            //
            // let res = this.InputChange.showCheck3(this.name_active_base,'zxlbdm');
            //
            // this.decor_name_active_base_copy[0][i] = this.InputChange.showCheck4(this.decor_name_active_base_copy[0][i],res,'zxlbdm');
            //
            //
            // console.log(this.name_active_base);
            // console.log(this.decor_name_active_base_copy[0]);
            this.isShow = false;

            // this.is_disabled = true;
        }else{
            this.ghzb_data.flbmxList = JSON.parse(JSON.stringify(this.ghzb_data_copy.flbmxList));
            // this.jzzmj = 0;
            // this.name_active_base =_.cloneDeep( this.decor_name_active_base_copy[0]);
            // this.searchList(this.searchKeyword);
            //
            // console.log(this.name_active_base);
            // console.log(this.decor_name_active_base_copy[0]);
            console.log(this.ghzb_data);
            this.isShow = true;

        }



    }



    eventQsr(e){
     if(e != -1){
         this.ghzb_data.ssghxmfldm = e;
         console.log(e);


         if(this.init_ghzb_data && this.init_ghzb_data.id){
             if(this.init_ghzb_data.ssghxmfldm != e){

                 this.ghxm['id'] = this.init_ghzb_data.id;
                 this.ghxm['ssghxmfldm']  = e;

             }else{
                 if(this.ghxm && this.ghxm['ssghxmfldm']){
                     delete this.ghxm['ssghxmfldm'];
                 }
             }
         }else{

             this.ghxm['ssghxmfldm'] = e;

         }


         this.HttpService.get(`ghxm/showInitDlzbflbmx?ssgcdm=${this.params.ssgcdm}&ssghxmfldm=${e}`).then( res=>{

             this.ghzb_data.flbmxList = res['returnObject'];

             this.ghzb_data.flbmxList.forEach((value,index,arr)=>{
                    console.log( arr[index].zdxxh);
                    console.log(new Array(value.zdxxh.split('.').length));
                    console.log(value.zdxxh.split('.').length);
                    console.log((new Array(value.zdxxh.split('.').length).join("&nbsp;")));

                 arr[index].zdxmc = (new Array(value.zdxxh.split('.').length).join("&nbsp;&nbsp;"))+arr[index].zdxmc;

             });

             console.log(this.ghzb_data.flbmxList);


         })





         this.data.ghxm = this.ghxm;
         this.data.ghxmjbxx = this.ghxmjbxx;
         this.data.listDlzbflbmxAdd = this.listDlzbflbmxAdd;
         this.data.listDlzbflbmxDel = this.listDlzbflbmxDel;
         this.data.listDlzbflbmxEdit = this.listDlzbflbmxEdit;

         console.log(this.ghzb_data);
         console.log(this.ghxm);
     }else{
         this.ghzb_data.ssghxmfldm = null;
     }
    }




    //保存并新增

    SaveAndAdd(){

        this.save();
        this.type = 'add';

        console.log(this.type);



        this.lityCode = JSON.parse(JSON.stringify(this.params.xmszxzqhdm));
        this.lityCode2 = JSON.parse(JSON.stringify(this.params.xmszxzqhdm));



        this.isDisabled = false;
        this.ghzb_data = new ghxmdata(null,null,null,null,null,
            null,null,'X000001',this.params.ssgcdm,this.params.ssghxmfldm,
            null,null,this.params.xmszxzqhdm,null,null,null,
            null,this.params.localityDesc,this.params.localityDesc,
            [new FlbmxList(null,null,null,null,null,null,null,'X000001',null,this.parent_params.jddm,this.params.dlzbfldm,null,null,null,null,null,null,null)],
            new Ghxmjbxx(null,null,null,null,null,null,null,'X000001',this.params.ssgcdm,null,this.parent_params.jddm,null,null,null,null,null,null)
        )



     this.ghxm = {};
    this.ghxmjbxx = {};
    this.listDlzbflbmxDel = [];
    this.listDlzbflbmxAdd = [];
    this.listDlzbflbmxEdit = [];
    this.init_ghzb_data = null;
    this.ghzb_data_copy = null;

        console.log(this.ghzb_data);
        this.ghzb_data.xmgldwxzqhdm = this.params.xmszxzqhdm;





    }


}



export class ghxmdata  {

    constructor(
    public start,
    public limit,
    public orderCol,
    public orderType,
    public sql,
    public searchKey,
    public id,
    public ssxtdm,
    public ssgcdm,
    public ssghxmfldm,
    public xmmc,
    public xmjc,
    public xmszxzqhdm,
    public xmgldwxzqhdm,
    public bz,
    public ssghxmflid,
    public ssghxmflmc,
    public xmszxzqhmc,
    public xmgldwxzqhmc,
    public flbmxList: Array<FlbmxList>,
    public ghxmjbxx: any
    ){

    }


}



export class FlbmxList{
    constructor(
    public  start,
    public  limit,
    public  orderCol,
    public  orderType,
    public  sql,
    public  searchKey,
    public  id,
    public  ssxtdm,
    public  ssghxmId,
    public  jddm,
    public  dlzbfldm,
    public  sl,
    public  bz,
    public  cjsj,
    public  zhgxsj,
    public  zdxmc,
    public  zdxxh,
    public  dwmc
    ){

    }
}


export class Ghxmjbxx {
    constructor(
    public start,
    public limit,
    public orderCol,
    public orderType,
    public sql,
    public searchKey,
    public id,
    public ssxtdm,
    public ssgcdm,
    public ssghxmId,
    public jddm,
    public clfsdm,
    public szwz,
    public ghtz,
    public ghfazy,
    public bz,
    public clfsmc
    ){

    }
}
