import {Component, OnInit} from '@angular/core';

import {HttpService} from "../../../../service/http-service";
import {DataProcessingService} from "../../../../service/dataProcessing.service";
import {ActivatedRoute} from '@angular/router';
import {SearchService} from "../../../../service/search.service";
import {GHZB_TITLE} from "../../../../service/ghzb-title.service";
import {alertModelInfo} from "../../swzb/alertModelInfo";
import {Subscription} from "rxjs/Subscription";
import {ShareService} from "../../../../systemSetting/service/share.service";
import {TreeListDataService} from "../../../../service/tree-list-data.service";
import * as _ from 'lodash';

@Component({
    selector: 'app-ghzbArea',
    templateUrl: './ghzbArea.component.html',
    styleUrls: ['./ghzbArea.component.css']
})
export class GhzbAreaComponent implements OnInit {
    isShowRight: boolean = false;
    defaultShow: boolean = true;
    private breadcrumb: any;
    private treelist: any;
    private getParem: any;
    private secNav: string;
    public dataList :any;
    public params;
    public parent_params;
    public msgs: any;
    public getparam = new getParam;
    public treeList;
    public alertModelInfo: alertModelInfo = new alertModelInfo;
    public subscription: Subscription;
    public flbmxList;
    public totalPage: number;
    public listUrl: any;
    public count: number;
    public currentPage: number;
    public persionList: any;
    private title: any;
    public type;
    public ghxm = {};
    public ghxmjbxx = {};
    public listDlzbflbmxDel = [];
    public listDlzbflbmxAdd = [];
    public listDlzbflbmxEdit = [];
    public ghzb_data: ghxmdata;
    public data = {ghxm:null,ghxmjbxx:null,listDlzbflbmxDel:null,listDlzbflbmxAdd:null,listDlzbflbmxEdit:null};
    public isShow: boolean = true;
    private init_ghzb_data: any;
    private ghzb_data_copy: any;
    public event;


    constructor(public TreeListService:TreeListDataService,private  ShareService: ShareService,private SearchService: SearchService, private router: ActivatedRoute, private HttpService: HttpService, private DataProcessingService: DataProcessingService) {
        this.router.params.subscribe(res => {
            this.dataList = res['res'];
        })
    }

    ngOnInit() {

        this.data.ghxm = this.ghxm;
        this.data.ghxmjbxx = this.ghxmjbxx;
        this.data.listDlzbflbmxAdd = this.listDlzbflbmxAdd;
        this.data.listDlzbflbmxDel = this.listDlzbflbmxDel;
        this.data.listDlzbflbmxEdit = this.listDlzbflbmxEdit;


        this.router.params.subscribe(res => {

            this.treeList = _.cloneDeep(this.TreeListService.treeList);

            console.log(res);
            console.log(this.router);
            console.log(this.router.params);
            console.log(this.router.snapshot);
            this.params = res;
            this.parent_params = this.router.snapshot.parent.params;

            console.log(res);
            this.HttpService.get(`zdk/list?sjId=443C3162A4554323AFB04EE7AEF7F164`)
                .then((data) => {
                    console.log(data);
                    let lsArr = this.SearchService.searchByRegExp(this.parent_params['jddm'], data['returnObject'], 'dm');
                    console.log(lsArr);
                    this.secNav = lsArr[0].mc;
                    this.getparam.jddm = lsArr[0].dm;

                    //this.getparam.jddm =  JSON.parse(JSON.stringify(this.parent_params['jddm']));
                    // this.getparam.ssgcdm =  JSON.parse(JSON.stringify(this.parent_params['id']));
                    //this.getparam.id =  JSON.parse(JSON.stringify(this.parent_params['qshflId']));

                    console.log(this.getparam.id);
                    this.alertModelInfo.huId = this.parent_params['id'];
                    this.alertModelInfo.item = this.parent_params['item'];
                    console.log(this.secNav);

                    this.breadcrumb = [
                        {label: '首页', routerLink: '/engmang'},
                        {label: this.secNav},
                        {label: '规划指标'},
                        {label: this.parent_params['item']}
                    ];


                    this.persionList = null;
                    this.totalPage = 0;
                    this.count = 0;
                    console.log(this.breadcrumb);
                    console.log('路由在改变');


                    this.subscription = this.ShareService.getMessage()
                        .subscribe((data) => {

                            this.router.params.subscribe(res => {
                                console.log(res);
                                console.log(this.router)
                                this.getparam.jddm =   this.router.snapshot.parent.params['jddm'] ;
                                this.getparam.ssgcdm =    this.router.snapshot.parent.params['id'] ;
                                this.getparam.id =  this.router.snapshot.parent.params['qshflId'] ;
                            });


                            console.log(data);
                            console.log( this.params);
                            console.log( this.getparam);
                            console.log( this.parent_params);
                            if (data['message']['item'] == 'ghzb') {
                                if (data['message']['summary']) {
                                    this.msgs = [];
                                    this.msgs.push(data['message']);
                                }

                                if (data['message']['severity'] === 'success') {


                                    //let params = `?start=1&limit=10&ssgcdm=${this.router.queryParams['value']['ssgcdm']}&xmszxzqhdm=${this.router.queryParams['value']['xmszxzqhdm']}&ssghxmfldm=${this.router.queryParams['value']['ssghxmfldm']}`;

                                    console.log(this.params)
                                    console.log(this.getparam);
                                    this.getparam.ssgcdm =  JSON.parse(JSON.stringify(this.params['ssgcdm']));
                                    this.getparam.xmszxzqhdm =  JSON.parse(JSON.stringify(this.params['xmszxzqhdm']));
                                    this.getparam.ssghxmfldm =  JSON.parse(JSON.stringify(this.params['ssghxmfldm']));

                                    this.HttpService.get(this.getUrl()).then((data)=>{

                                        console.log(data);
                                        this.dataList = data['returnObject'];
                                        this.currentPage = data['currentPage'];
                                        this.totalPage = data['totalPage'];
                                        this.count = data['count'];
                                    });

                                }
                            }
                        })



                })





            this.listUrl = 'ghxm/list';
            this.getparam.start = '1';
            this.getparam.limit = '10';
            //let params = `?start=1&limit=10&ssgcdm=${this.router.queryParams['value']['ssgcdm']}&xmszxzqhdm=${this.router.queryParams['value']['xmszxzqhdm']}&ssghxmfldm=${this.router.queryParams['value']['ssghxmfldm']}`;
            this.getparam.ssgcdm = JSON.parse(JSON.stringify(this.params['ssgcdm']));
            this.getparam.xmszxzqhdm =  JSON.parse(JSON.stringify(this.params['xmszxzqhdm']));
            this.getparam.ssghxmfldm =  JSON.parse(JSON.stringify(this.params['ssghxmfldm']));
            console.log(this.params)
            console.log(this.getparam);

            for (let key in this.getparam) {
                if (key != 'limit' && key != 'start' && key != 'id' && key != 'ssxzqhdm' && key != 'ssxzqhdmMin' && key != 'ssxzqhmc' && key != 'ssgcdm' && key != 'jddm' && key != 'ssghxmfldm' && key != 'xmszxzqhdm') {
                    delete  this.getparam[key];
                }
            }



            this.HttpService.get(this.getUrl()).then((data)=>{

                console.log(data);
                this.dataList = data['returnObject'];
                this.currentPage = data['currentPage'];
                this.totalPage = data['totalPage'];
                this.count = data['count'];
            });





            console.log(this.dataList);






        })






        console.log(this.dataList);

        console.log(GHZB_TITLE);
        for(let i in GHZB_TITLE){
            if(i == this.params.ssghxmfldm){
                this.title = GHZB_TITLE[i];
            }

        }

    }

    getEvent(event) {
        this.event = event;
        this.isShow = true;
        this.isShowRight = event;
        this.defaultShow = false;
        console.log(event);
        console.log(this.dataList);
        console.log(this.parent_params);
        console.log(this.params);





        this.HttpService.get(`ghxm/list?start=1&limit=10&ssgcdm=${this.parent_params.id}&xmszxzqhdm=${event.localityCode}&ssghxmfldm=${this.params.ssghxmfldm}&jddm=${this.parent_params.jddm}`).then( data =>{

            console.log(data);

            if(data['returnObject'].length>0 && data['returnObject'][0]['id'] != null){
                this.type = 'rew';
                this.HttpService.get(`ghxm/show?id=${data['returnObject'][0]['id']}`).then( data2=>{

                    console.log(data2);

                     data2['returnObject'].flbmxList.forEach((value,index,arr)=>{

                              arr[index].zdxmc = new Array(value.zdxxh.split('.').length).join("&nbsp;&nbsp;&nbsp;")+value.zdxmc;

                     })


                    this.init_ghzb_data = JSON.parse(JSON.stringify(data2['returnObject']));
                    this.ghzb_data_copy = JSON.parse(JSON.stringify(data2['returnObject']));
                    this.ghzb_data = JSON.parse(JSON.stringify(data2['returnObject']));





                });

                console.log(this.ghzb_data);


            }else{
                this.type = 'add';
                this.ghzb_data = new ghxmdata(null,null,null,null,null,
                    null,null,'X000001',this.params.ssgcdm,this.params.ssghxmfldm,
                    null,null, event.localityCode,event.localityCode,null,null,
                    null,event.localityDesc,event.localityDesc,
                    [new FlbmxList(null,null,null,null,null,null,null,'X000001',null,this.parent_params.jddm,this.params.dlzbfldm,null,null,null,null,null,null,null)],
                    new Ghxmjbxx(null,null,null,null,null,null,null,'X000001',this.params.ssgcdm,null,this.parent_params.jddm,null,null,null,null,null,null)
                )

                this.init_ghzb_data = null;
                this.ghzb_data_copy = null;

                console.log(this.ghzb_data);

                this.HttpService.get(`ghxm/showInitDlzbflbmx?ssgcdm=${this.parent_params.id}&ssghxmfldm=${this.params.ssghxmfldm}`).then( res =>{

                    console.log(res);
                    this.ghzb_data.flbmxList = res['returnObject'];

                })

            }


        })


    }



    //tableChange
    tableChange($event){
        console.log($event);



        if($event.id && $event.id.toString().length ==32){


            if($event.sl != null && $event.sl  != ""){
                console.log($event);

                if(!this.data['listDlzbflbmxEdit'] ){
                    this.data['listDlzbflbmxEdit']  = [];
                }

                if(!this.data['listDlzbflbmxEdit'][$event.dlzbfldm]){
                    this.data['listDlzbflbmxEdit'][$event.dlzbfldm] = {};
                }
                this.ghzb_data_copy.flbmxList.forEach((value,index,arr)=>{

                    if(arr[index]['zdxxh'] == $event.zdxxh){
                        arr[index]['sl'] = $event.sl;



                        this.data['listDlzbflbmxEdit'][$event.dlzbfldm].sl = $event.sl;

                        if(this.data['listDlzbflbmxDel'] && this.data['listDlzbflbmxDel'][$event.dlzbfldm]){
                            delete this.data['listDlzbflbmxDel'][$event.dlzbfldm];
                        }

                    }

                });

                this.data['listDlzbflbmxEdit'][$event.dlzbfldm].id = $event.id;

                console.log(this.data['listDlzbflbmxEdit']);
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

                console.log(this.data['listDlzbflbmxEdit']);
                console.log(this.data['listDlzbflbmxDel']);


            }

            if(this.data.ghxm){
                this.data.ghxm['id'] = $event.id;
            }


            if(this.isShow == true){
                this.ghzb_data.flbmxList.forEach((value,index,arr)=>{

                    this.ghzb_data.flbmxList.forEach((v,i,a)=>{

                        if(value['zdxxh'] == v['zdxxh']){
                            this.ghzb_data_copy.flbmxList[index]['sl'] = this.ghzb_data.flbmxList[index]['sl'];
                            console.log(this.ghzb_data_copy.flbmxList[index]);
                        }

                    })

                })
            }



        }else{

            console.log($event);
            if(!this.data['listDlzbflbmxAdd'] ){
                this.data['listDlzbflbmxAdd']  = [];
            }
            if(!this.data['listDlzbflbmxAdd'][$event.dlzbfldm]){
                this.data['listDlzbflbmxAdd'][$event.dlzbfldm] = {};
            }

            console.log(this.data['listDlzbflbmxAdd']);

            this.data['listDlzbflbmxAdd'][$event.dlzbfldm].sl = $event.sl;



            this.data['listDlzbflbmxAdd'][$event.dlzbfldm].ssxtdm = 'X000001';
            this.data['listDlzbflbmxAdd'][$event.dlzbfldm].jddm = this.parent_params.jddm;
            this.data['listDlzbflbmxAdd'][$event.dlzbfldm].dlzbfldm = $event.dlzbfldm;




        }

        console.log(this.ghzb_data);

        console.log(this.listDlzbflbmxEdit);
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



    save(){




        console.log(this.data['listDlzbflbmxDel']);
        console.log(this.data['listDlzbflbmxEdit']);
        console.log(this.data['listDlzbflbmxAdd']);


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
                    if(this.data['listDlzbflbmxAdd'][i] != null) {

                        this.data['listDlzbflbmxAdd'][t] = this.data['listDlzbflbmxAdd'][i];
                    }
                    delete this.data['listDlzbflbmxAdd'][i];
                    t++;

                }
                arr4 =Object.keys(this.data['listDlzbflbmxAdd']);
                console.log(this.data['listDlzbflbmxAdd']);
            }

        console.log(this.data);
        if(this.data['listDlzbflbmxEdit'] !=null){
                let t = 0;
                    for(let i in this.data['listDlzbflbmxEdit']){

                        if(this.data['listDlzbflbmxEdit'][i] != null){
                            this.data['listDlzbflbmxEdit'][t] = this.data['listDlzbflbmxEdit'][i];
                        }
                        delete this.data['listDlzbflbmxEdit'][i];
                        t++;

                }
                arr5 =Object.keys(this.data['listDlzbflbmxEdit']);

                console.log(arr5);
            }

            if(this.type == 'add'){
                this.data['ghxm'].ssxtdm = 'X000001';
                this.data['ghxm'].ssgcdm = this.ghzb_data.ssgcdm;
                this.data['ghxm'].xmszxzqhdm = this.ghzb_data.xmszxzqhdm;
                this.data['ghxm'].xmgldwxzqhdm = this.ghzb_data.xmgldwxzqhdm;
                delete this.data['ghxm'].id;
                this.data['ghxm'].xmmc = this.ghzb_data.xmszxzqhdm;
                this.data['ghxm'].ssghxmfldm = this.params.ssghxmfldm;
            }


            if(arr1.length == 0){
                // delete  this.data['ghxm'];
            }else{
            console.log(this.data);
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
                console.log(arr5);
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
                console.log(this.data);
                this.HttpService.post(`ghxm/save`,this.data).then(data =>{
                    console.log(data);
                    this.data = {ghxm:{id:this.type=='add'?null:this.ghzb_data['id']} ,ghxmjbxx:null,listDlzbflbmxDel:null,listDlzbflbmxAdd:null,listDlzbflbmxEdit:null};

                    this.msgs = [];
                    this.msgs.push({severity: 'success', summary: '保存提醒', detail: '保存成功'});


                    if(this.type == 'rew' && data['returnObject'] != null){

                        this.HttpService.get(`ghxm/show?id=${data['returnObject']}`).then(data2=>{
                            console.log(data2);
                            this.init_ghzb_data = JSON.parse(JSON.stringify(data2['returnObject']));
                            this.ghzb_data_copy = JSON.parse(JSON.stringify(data2['returnObject']));
                            this.ghzb_data = JSON.parse(JSON.stringify(data2['returnObject']));

                            console.log(this.ghzb_data);

                            this.isShow = true;
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


                    this.type = 'rew';
                    console.log(this.data);

                },error=>{
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '保存提醒', detail: error});
                });
            }




        }




    //清除表单数据
    Clear(){
        this.isShow = true;
        console.log(this.ghzb_data.flbmxList);
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
        console.log(this.ghzb_data.flbmxList);
        this.ghzb_data.flbmxList.slice();
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

            this.isShow = true;

        }



    }



    //分页

    queryList(res) {

        console.log(res);
        console.log(this.parent_params.ssgcdm);
        this.getparam.ssgcdm = JSON.parse(JSON.stringify(this.parent_params.ssgcdm));
        console.log(this.getparam.ssgcdm);

        this.dataList = res.data['returnObject'];
        this.getparam.start = res.value.first + 1;
        this.getparam.limit = res.value.rows;
        this.currentPage = res.data['currentPage'];
        //this.totalPage = res.data['totalPage'];
        //this.count = res.data['count'];
        console.log(this.count);
        //res.data['count'] = this.totalPage;
        //this.persionList = this.dataList;
        console.log(this.getparam);
        console.log(this.parent_params);
        // this.listUrl = this.getUrl();
        console.log(this.listUrl);

    }

    getUrl() {
        return this.listUrl + '?' + this.DataProcessingService.transString(this.getparam);
    }


//搜索

    search(key){
        console.log(key);


        this.listUrl = 'ghxm/list';
        this.getparam.start = '1';
        this.getparam.limit = '10';
        //let params = `?start=1&limit=10&ssgcdm=${this.router.queryParams['value']['ssgcdm']}&xmszxzqhdm=${this.router.queryParams['value']['xmszxzqhdm']}&ssghxmfldm=${this.router.queryParams['value']['ssghxmfldm']}`;
        this.getparam.ssgcdm = JSON.parse(JSON.stringify(this.params['ssgcdm']));
        this.getparam.xmszxzqhdm =  JSON.parse(JSON.stringify(this.params['xmszxzqhdm']));
        this.getparam.ssghxmfldm =  JSON.parse(JSON.stringify(this.params['ssghxmfldm']));
        this.getparam.searchKey = key;
        console.log(this.params)
        console.log(this.getparam);

        for (let key in this.getparam) {
            if (key != 'searchKey' && key != 'limit' && key != 'start' && key != 'id' && key != 'ssxzqhdm' && key != 'ssxzqhdmMin' && key != 'ssxzqhmc' && key != 'ssgcdm' && key != 'jddm' && key != 'ssghxmfldm' && key != 'xmszxzqhdm') {
                delete  this.getparam[key];
            }
        }



        this.HttpService.get(this.getUrl()).then((data)=>{

            console.log(data);
            this.dataList = data['returnObject'];
            this.currentPage = data['currentPage'];
            this.totalPage = data['totalPage'];
            this.count = data['count'];
        });


    }




}

export class getParam {
    ssxzqhdm: string;	//行政区划代码	是	350526100209011	350526100209011
    ssxzqhdmMin: string; // 行政区划最小集代码
    ssxzqhmc: string;	//行政区划名称	是	S000001	S000001
    ssgcdm: string;	//工程代码	是	S000001	S000001
    jddm: string;	     //阶段代码	是	1	1
    searchKey: string;	//搜索关键字	否
    start: string;	 //开始条数	是
    limit: string;	 //取多少条记录	是
    id: string;   //权属户分类ID	是
    ssghxmfldm:string;
    xmszxzqhdm:string;

    jdId: string;   //当前阶段的id
    hzxm: string;   //户主姓名
    hzsfzh: string;   //	户主身份证号
    jtcyxm: string;   // 家庭成员姓名
    jtcysfzh: string; // 家庭成员身份证号
    dabh: string;     //档案编号
    zydldm: string;   //专业大类代码
    dcfwdm: string;   //调查范围代码
    sfkgh: string;    //是否空挂户
    sfxw: string;     //	是否线外

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
