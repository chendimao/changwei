import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SelectItem, DataTableModule, SharedModule, LazyLoadEvent, FilterMetadata, TreeTable} from 'primeng/primeng';
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";

import {Message} from "../../../../../../../assets/_primeng@4.2.1@primeng/components/common/message";
import {HttpService} from "../../../../../../service/http-service";
import {NgForm} from "@angular/forms";
import {ValuChangeService} from "../../../../../../service/valuChange.service";
import {SelectListHttpService} from "../../../../../../service/select-list-http.service";
import {InputChangeService} from "../../../../../../service/input-change.service";
import {SwzbPersonComponent} from "../../swzb-person.component";
import {PersonComponent} from "../person/person.component";

@Component({
    selector: 'app-houses',
    templateUrl: './houses.component.html',
    styleUrls: ['../children.css']
})
export class HousesComponent implements OnInit {
    moreText: string = "显示更多内容";
    msgs: Message[] = [];
    selectedCity2:string;
    moreInput: boolean = false;
    types: SelectItem[];
    public selectedType: string;
    types2: SelectItem[];
    public selectedType2: string;
    types3: SelectItem[];
    public selectedType3: string;
    private num1: any;
    public houesList = new Array();
    private num2: any;
    private num: any;
    public isShowArea: boolean = false;
    showTable: any = 1;
    private ch;
    public Car=new Array();

    public name_active_data: any; //选中样式
    public name_active_base: any; //选中样式
    public selectPersonList=new Array() ; //新增下拉列表
    public displaySelectPserson:boolean = false; //显示隐藏新增人员下拉列表
    public childInfo2;
    public data;
    public childInfo;
    public selectedFile:TreeTable;
    public selectListHzgx: { label: string; value: { id: number; name: string; code: string } }[];


    public del_houses_data = new Array(); //删除的数据
    public init_houses_data; //初始化的数据
    public update_houses_data =[]; //对比后修改的数据
    public add_houses_data =new Array(); //新增的数据
    public type; //新增、修改、查看
    public yhzgx_list: any; //与户主关系下拉列表

    public sfkgr:number = 0; //是否空挂人
    public sfldl:number = 0; //是否劳动力
    public zydl_list:any; //专业大类

    public fwxz_list:any; //房屋性质
    public fwzyyt_list:any;//房屋主要用途
    public dcfw_list:any;//调查范围
    public dcfw_list_is_show = 0;//调查范围显示
    public dcfw_mc;
    public hbdm_list:any;//户别代码 列表
    public name_active_key = 0;
    public qshflId;
    public ssgcdm; //所属工程代码
    public ssxzqhdm //所属行政区划代码
    public bj_houses_data; //初始化数据标记
    public bj_houses_new_data; //初始化新增数据标记
    public flxx_houses_update = new Array(); //分类信息
    public flxx_add = new Array(); //分类信息新增

    public GgmxIndex:any = 0; //当前选中规格明细行下标
    public add_ggmx_data = new Array(); //新增的规格明细
    public update_ggmx_data = new Array(); //修改的规格明细
    public del_ggmx_data = new Array(); //删除的规格明细
    public list_ggmx_data  = new Array(); //当前规格明细列表
    public list_ggmx_data_copy = new Array(); // 规格明细初始值
    public ssfwjbxxId:any;
    public fwjgdm:any;

    public listHcyAdd:any = new Array(); //完全新增的户成员

    public HcyAdd = new Array(); //户成员新增的

    @ViewChild('person') person2: NgForm;
    @ViewChild('ggmxlist') ggmxlist: NgForm;
    @ViewChildren('defaultPerson') defaultPerson;


    //专业大类

    constructor(public InputChange:InputChangeService,public selectList:SelectListHttpService,public ValuChangeService:ValuChangeService,public HttpService:HttpService, public DataProcessing: DataProcessingService) {
        this.types = [];
        this.types.push({label: '是', value: '1'});
        this.types.push({label: '否', value: '0'});
        this.types2 = [];
        this.types2.push({label: '是', value: '1'});
        this.types2.push({label: '否', value: '0'});
        this.types3 = [];
        this.types3.push({label: '分类汇总', value: '1'});
        this.types3.push({label: '规格明细', value: '2'});

        // this.selectListHzgx = [
        //     {label: '蔡国成', value: {id: 1, name: '蔡国成', code: 'NY'}},
        //     {label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}},
        //     {label: 'London', value: {id: 3, name: 'London', code: 'LDN'}},
        //     {label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}},
        //     {label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}}
        // ];


    }





    ngAfterViewInit(): void {


        // 订阅表单值改变事件
        this.person2.valueChanges.subscribe(data => {


            if(this.name_active_data.qsrId.toString().length != 32) { // 如果权属人ID等于32位也就是说 在数据库中已经存在的户成员


                this.listHcyAdd = this.InputChange.get_add_change(this.childInfo2,this.name_active_data,this.listHcyAdd);

                console.log(this.listHcyAdd);

            }else{
                let res =  this.InputChange.get_value_change(this.name_active_data,this.name_active_key,this.init_houses_data,this.update_houses_data,this.add_houses_data);

                this.add_houses_data = res.add_data;
                this.update_houses_data = res.update_data;
            }



            console.log(this.add_houses_data);
            console.log(this.update_houses_data);


            }

        );



        // 订阅表单值改变事件
        this.ggmxlist.valueChanges.subscribe( data => {

            let res = this.InputChange.get_ggmx_change(this.list_ggmx_data_copy,this.list_ggmx_data,this.update_ggmx_data,this.add_ggmx_data);

            this.update_ggmx_data = res['update_data'];
            this.add_ggmx_data = res['add_data'];
//            console.log(this.update_ggmx_data);
  //          console.log(this.add_ggmx_data);
        });

    }







    ngOnInit() {
        console.log(this.qshflId);
        console.log(this.data);



        //所属行政区划代码和工程代码
        if(this.type=='add'){
            this.ssgcdm = this.qshflId.ssgcdm;
            this.ssxzqhdm =this.qshflId.ssxzqhdm;

        }else if(this.type == 'rew'){

            this.ssgcdm = this.qshflId.ssgcdm;
            this.ssxzqhdm =this.qshflId.ssxzqhdm;
        }


        //  专业大类 下拉列表
        this.selectList.getSelectList('B_FWJBXX', 'ZYDLDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.zydl_list = data;
            console.log(this.zydl_list);
        });
        //  房屋性质 下拉列表
        this.selectList.getSelectList('B_FWJBXX', 'FWXZDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.fwxz_list = data;
        });
        //  房屋主要用途 下拉列表
        this.selectList.getSelectList('B_FWJBXX', 'FWZYYTDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.fwzyyt_list = data;
        });



        this.selectPersonList.push({label:'选择户成员',value:-1});

        this.childInfo2.forEach((value,index,arr)=>{

            this.selectPersonList.push({label:value['mc'],value:value['id']});

        });



        if(this.data['returnObject']['datalist'][0] !=undefined ){


            this.name_active_data = [ new TreesData('','','','','','',new Date().getTime(),'','','','',[],'','','','','','',0,'','','','','','','','','','','','') ];

            this.houesList = this.data['returnObject']['datalist'];  //户成员信息
            console.log(this.houesList);
            this.name_active_data = this.houesList[0];   //默认选中第一个户成员

            if(this.name_active_data['list'] != undefined){

                this.name_active_base = this.name_active_data['list'];
            }else{
                this.name_active_base = this.data['returnObject']['baseList'];
            }

            //转换数据格式


            if(this.bj_houses_data == 1) {
                this.bj_houses_data = 0;
                this.houesList.forEach((value,index,arr)=>{
                    console.log(value);
                    value.list.forEach((val, i, ar) => {
                        ar[i] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(val, 'childList', 'children', '', ''));

                    });
                    console.log(value);
                });
                console.log(  this.data['returnObject']['baseList'] );


                this.data['returnObject']['baseList'].forEach((val, i, ar) => {
                        ar[i] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(val, 'childList', 'children', '', ''));

                    });



                console.log( this.data['returnObject']['baseList']);
            }







        }else{
            this.houesList = this.data['returnObject']['datalist'];  //户成员信息
            this.name_active_data = '';
            this.name_active_base = '';
        }


        this.selectedType3 = '1';
        this.selectedType = '1';
        this.selectedType2 = '1';


        console.log(this.name_active_data);



    }








//选择name改变样式
    selectName(name,i){
       this.name_active_key = i;
        this.name_active_data = name;

            console.log(this.name_active_data);


        if(this.name_active_data['list'] != undefined){

            this.name_active_base = this.name_active_data['list'];
        }else{


            this.name_active_base = this.data['returnObject']['baseList'];


        }


        //
        // //转换数据格式
        //
        //     this.name_active_base.forEach((value,index,arr)=>{
        //         this.name_active_base[index] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(value,'childList','children','',''));
        //     });


        console.log(this.name_active_base);
    }



    //新增房屋
    addHouses(event){




        this.name_active_base = JSON.parse(JSON.stringify(this.init_houses_data['baseList']));

        //转换数据格式


        this.name_active_base.forEach((value,index,arr)=>{
            this.name_active_base[index] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(value,'childList','children','',''));

        });
        let name = '';

        this.selectPersonList.forEach((value,index,arr)=>{

            if(value['value'] == event){

                name = value['label'];

            }

        });



            if((typeof this.houesList) != 'undefined' && this.houesList.length>0){
                this.houesList.push(new TreesData('','','','','','',new Date().getTime(),'','',event,'',[],'','','','','','',0,'','','','','','','','',name,'','',''));
                this.name_active_data = this.houesList[this.houesList.length-1];
                this.name_active_key = this.houesList.length-1;

            }else{
                this.houesList.push(new TreesData('','','','','','',new Date().getTime(),'','',event,'',[],'','','','','','',0,'','','','','','','','',name,'','',''));
                this.name_active_data = this.houesList[0];

            }










        if(this.name_active_data.qsrId.toString().length != 32) { // 如果权属人ID等于32位也就是说 在数据库中已经存在的户成员


            this.listHcyAdd = this.InputChange.get_add_change(this.childInfo2,this.name_active_data,this.listHcyAdd);

         console.log(this.listHcyAdd);

        }else{

            let res = this.InputChange.get_value_change(this.name_active_data,this.name_active_key,this.init_houses_data,this.update_houses_data,this.add_houses_data);

            this.add_houses_data = res['add_data'];
            this.update_houses_data = res['update_data'];
        }



        //将户成员基本信息带到房屋基本信息中
        this.childInfo2.forEach((value,index,arr)=>{

            if(value['id'] == this.name_active_data['qsrId']){
                for(var i in value){
                    for(var ii in this.name_active_data){
                        if(i == ii && i != 'id' && i != 'cjsj'){
                            this.name_active_data[ii] = value[i];
                        }
                    }
                }
                if(value['szxzqhdm'] !=null){
                    this.name_active_data['swszxzqhdm'] = value['szxzqhdm'];
                    this.name_active_data['swszxzqhmc'] = value['xzqhmc'];
                }

            }


        });




        //关闭下拉框
        this.displaySelectPserson = false;






        console.log(this.childInfo2);
        console.log(this.name_active_data);







        }

    //删除人员
    deleteSlect(){

       if(this.houesList.length>0){


           console.log(this.houesList);
           //记录删除id

           console.log(this.name_active_data);
           console.log(this.name_active_key);
           if(this.name_active_data.qsrId.toString().length != 32) { // 如果权属人ID等于32位也就是说 在数据库中已经存在的户成员


               this.childInfo2.forEach((value, index, arr) => {
                   console.log(value);
                   if (value['id'] == this.name_active_data['qsrId']) {

                       delete this.listHcyAdd[value['id']]['ListFwAdd'][this.name_active_data['id']];

                   }


               });
               console.log(this.listHcyAdd);

           }else{


               if(this.name_active_data['id']!= undefined || this.name_active_data['id']!= null){
                   this.del_houses_data.push({'id':this.name_active_data['id']});

                   //如果删除的户成员在修改列表中存在，则从修改列表中删除

                   this.houesList.forEach((value, index, arr) => {
                       if (value['id'] == this.name_active_data['id']) {
                           delete this.update_houses_data[index];
                       }
                   });
                   console.log(this.del_houses_data);

               }


           }


           //
           // this.houesList.splice(this.name_active_key,1);
           // if(this.houesList[0] != undefined && this.houesList.length>0  ){
           //
           //     if(this.name_active_key == 0){
           //         this.name_active_data = this.houesList[this.name_active_key+1];
           //         this.name_active_key = this.name_active_key+1;
           //     }else{
           //         this.name_active_data = this.houesList[this.name_active_key-1];
           //         this.name_active_key = this.name_active_key-1;
           //     }
           //
           //
           // }else if(this.houesList[0] != undefined && this.name_active_key==0){
           //
           //     this.name_active_data = this.houesList[this.name_active_key+1];
           //     this.name_active_key = this.name_active_key+1;
           //
           //
           // }else{
           //     this.name_active_data = '';
           //     this.name_active_base = '';
           //
           // }



           this.houesList.splice(this.name_active_key,1);


           if(this.houesList[0] != undefined){
               if(this.name_active_key == 0){
                   this.name_active_data = this.houesList[0];
               }else if(this.name_active_key == this.houesList.length){

                   this.name_active_key = this.name_active_key-1;
                   this.name_active_data = this.houesList[this.name_active_key];

               }else{
                   this.name_active_data = this.houesList[this.name_active_key];

               }
           }else{
               this.name_active_data = '';
               this.name_active_base = '';
           }



       }


        console.log(this.name_active_key);
        console.log(this.houesList);
        //}

        console.log(this.del_houses_data);

    }


    //显示新增人员下拉列表
    displaySlect(){        if(this.displaySelectPserson == true){            this.displaySelectPserson = false;        }else{            this.displaySelectPserson = true;        }    }


    get_data(now_data){

        now_data.data.jzmj = 0;
        now_data.children.forEach((value,index,arr)=>{
            console.log(value);
            if(value['data'] != undefined && value['data'].jzmj == null){


            }else{

                now_data.data.jzmj += parseInt(value['data'].jzmj);
            }

        });
        if(now_data.parent != undefined){
            this.get_data(now_data.parent);
        }

        console.log(now_data);
        return now_data;
    }


    Tree_update(data,now_data,i){
        console.log(now_data);

        console.log(this.name_active_base[i]);

        this.get_data(now_data.parent);


        this.name_active_base[i] = data;

            console.log(this.name_active_data.qsrId.toString().length);
        if(this.name_active_data.qsrId.toString().length == 32){
            console.log(this.name_active_data);
            if(this.name_active_data.id != undefined && this.name_active_data.id != ""){
                this.flxx_houses_update[now_data['data']['zbflId']] = new Array();
                this.flxx_houses_update[now_data['data']['zbflId']] = {'id':now_data['data']['id'],'jzmj':now_data['data']['jzmj'],'bz':now_data['data']['bz'],'fwjgdm':now_data['data']['fwjgdm'],'zbflId':now_data['data']['zbflId'],'ssfwjbxxId':this.name_active_data.id};

                console.log(this.flxx_houses_update);
            }else{

                if(this.name_active_data['flbmxList'] == undefined){
                    this.name_active_data['flbmxList'] = new Array();
                }

                this.name_active_data['flbmxList'][now_data['data']['zbflId']] = {'id':now_data['data']['id'],'jzmj':now_data['data']['jzmj'],'bz':now_data['data']['bz'],'fwjgdm':now_data['data']['fwjgdm'],'zbflId':now_data['data']['zbflId']};

            console.log(this.name_active_data);

            }
        }else{

            if(this.name_active_data['flbmxList'] == undefined){
                this.name_active_data['flbmxList'] = new Array();
            }

            this.name_active_data['flbmxList'][now_data['data']['zbflId']] = {'id':now_data['data']['id'],'jzmj':now_data['data']['jzmj'],'bz':now_data['data']['bz'],'fwjgdm':now_data['data']['fwjgdm'],'zbflId':now_data['data']['zbflId']};


            this.listHcyAdd = this.InputChange.get_add_change(this.childInfo2,this.name_active_data,this.listHcyAdd);


            console.log(this.listHcyAdd);


            console.log(this.name_active_data);

        }





        console.log(this.flxx_houses_update);
        console.log(this.name_active_data);

       let res = this.InputChange.get_value_change(this.name_active_data,this.name_active_key,this.init_houses_data,this.update_houses_data,this.add_houses_data);

        console.log(res);
        this.add_houses_data = res['add_data'];
        this.update_houses_data = res['update_data'];
        console.log(this.add_houses_data);


    }

    Tree_update_bz(data,now_data,i){
        console.log(now_data);

        console.log(this.name_active_base[i]);



        this.name_active_base[i] = data;


        if(this.name_active_data.qsrId.toString().length == 32){
            if(this.name_active_data.id != undefined && this.name_active_data.id != ""){
                this.flxx_houses_update[now_data['data']['zbflId']] = new Array();
                this.flxx_houses_update[now_data['data']['zbflId']] = {'id':now_data['data']['id'],'jzmj':now_data['data']['jzmj'],'bz':now_data['data']['bz'],'fwjgdm':now_data['data']['fwjgdm'],'zbflId':now_data['data']['zbflId'],'ssfwjbxxId':this.name_active_data.id};

            }else{

                if(this.name_active_data['flbmxList'] == undefined){
                    this.name_active_data['flbmxList'] = new Array();
                }

                this.name_active_data['flbmxList'][now_data['data']['zbflId']] = {'id':now_data['data']['id'],'jzmj':now_data['data']['jzmj'],'bz':now_data['data']['bz'],'fwjgdm':now_data['data']['fwjgdm'],'zbflId':now_data['data']['zbflId']};



            }
        }else{

            if(this.name_active_data['flbmxList'] == undefined){
                this.name_active_data['flbmxList'] = new Array();
            }

            this.name_active_data['flbmxList'][now_data['data']['zbflId']] = {'id':now_data['data']['id'],'jzmj':now_data['data']['jzmj'],'bz':now_data['data']['bz'],'fwjgdm':now_data['data']['fwjgdm'],'zbflId':now_data['data']['zbflId']};


            this.childInfo2.forEach((value, index, arr) => {
                console.log(value);
                if (value['id'] == this.name_active_data['qsrId']) {

                    if (value['ListFwAdd'] == undefined) {
                        value['ListFwAdd'] = new Array();

                    }
                    console.log(this.name_active_data);
                    value['ListFwAdd'][this.name_active_data['id']] = this.name_active_data;
                    this.listHcyAdd[value['id']] = value;

                }


            });
            console.log(this.listHcyAdd);



        }





        console.log(this.flxx_houses_update);
        console.log(this.name_active_data);

        let res = this.InputChange.get_value_change(this.name_active_data,this.name_active_key,this.init_houses_data,this.update_houses_data,this.add_houses_data);

        console.log(res);
        this.add_houses_data = res['add_data'];
        this.update_houses_data = res['update_data'];
        console.log(this.add_houses_data);

    }



    showMoreInput() {

        if (this.moreInput) {
            this.moreInput = false;
            this.moreText = "显示更多内容"
        } else {
            this.moreInput = true;
            this.moreText = "隐藏更多内容"
        }
    }

    selectedTypea() {

    }


//专业大类
    eventZydl(e){
        console.log(e);

        this.name_active_data.zydldm = e;

       let res =  this.InputChange.get_select_change(this.name_active_data,this.name_active_key,this.init_houses_data,this.update_houses_data,this.add_houses_data);

        this.add_houses_data = res.add_data;
        this.update_houses_data = res.update_data;


    }


    //权属人姓名

    eventQsr(e){

        let name = '';
        this.selectPersonList.forEach((value,index,arr)=>{
            console.log(value);
            if( e == -1){
                this.name_active_data.qsrmc = '';
                this.name_active_data.qsrId = '';

            }else if(value['value']==e){
                name = value['label'];
                this.name_active_data.qsrId = value['value'];
            }

        });




        if(this.name_active_data.qsrId.toString().length == 32){


            if(this.init_houses_data['datalist'][this.name_active_key]['qsrId']==this.name_active_data.qsrId ){
                this.name_active_data['cjsj'] = this.init_houses_data['datalist'][this.name_active_key]['cjsj'];

                delete this.add_houses_data[this.name_active_key];
                delete this.del_houses_data[this.name_active_key];


                this.name_active_data['id'] = this.init_houses_data['datalist'][this.name_active_key]['id'];




            }else{
                this.name_active_data.cjsj = null;
                delete this.update_houses_data[this.name_active_key];
                this.del_houses_data[this.name_active_key] = {'id':this.init_houses_data['datalist'][this.name_active_key]['id']};



            }



        }else{


            if(this.init_houses_data['datalist'][this.name_active_key]['qsrId']==this.name_active_data.qsrId ){
                this.name_active_data['cjsj'] = this.init_houses_data['datalist'][this.name_active_key]['cjsj'];

                delete this.add_houses_data[this.name_active_key];
                delete this.del_houses_data[this.name_active_key];


                this.name_active_data['id'] = this.init_houses_data['datalist'][this.name_active_key]['id'];




            }else{
                this.name_active_data.cjsj = null;
                delete this.update_houses_data[this.name_active_key];
                this.del_houses_data.push({'id':this.init_houses_data['datalist'][this.name_active_key]['id']});



            }
        }


        this.name_active_data.qsrmc = name;


        //this.name_active_data.qsrId = e;

        console.log(this.init_houses_data['datalist'][this.name_active_key]['qsrId']);
        console.log(this.name_active_data['qsrId']);
        console.log(this.name_active_data);
        if(e.toString().length == 32){

            let res =  this.InputChange.get_value_change(this.name_active_data,this.name_active_key,this.init_houses_data,this.update_houses_data,this.add_houses_data);


            console.log(res);
            this.add_houses_data = res.add_data;
            this.update_houses_data = res.update_data;

            //this.del_houses_data.push({'id':temp_qsrid});
            console.log(this.del_houses_data);
        }else{

            this.name_active_data['id'] = new Date().getTime();


            this.listHcyAdd = this.InputChange.get_add_change(this.childInfo2,this.name_active_data,this.listHcyAdd);

            console.log(this.listHcyAdd);

        }





        console.log(this.update_houses_data);
        console.log(this.add_houses_data);
        console.log(this.del_houses_data);
        console.log(this.listHcyAdd);





    }



//是否有无房产


    sfywfc(e){
        console.log(e);
    }

    //房屋性质
    eventFwxz(e){
        console.log(e);


        this.name_active_data.fwxzdm = e;


        let res =  this.InputChange.get_select_change(this.name_active_data,this.name_active_key,this.init_houses_data,this.update_houses_data,this.add_houses_data);

        this.add_houses_data = res.add_data;
        this.update_houses_data = res.update_data;

        console.log(this.listHcyAdd);
    }

    //房屋主要用途
    eventFwzyyt(e){
        console.log(e);


        this.name_active_data.fwzyytdm = e;


        let res =  this.InputChange.get_select_change(this.name_active_data,this.name_active_key,this.init_houses_data,this.update_houses_data,this.add_houses_data);

        this.add_houses_data = res.add_data;
        this.update_houses_data = res.update_data;

        console.log(this.add_houses_data);
        console.log(this.update_houses_data);

    }

    //竣工日期
    eventJgrq(e){
        console.log(e);
        this.name_active_data.jgrq = e;



        let res =  this.InputChange.get_select_change(this.name_active_data,this.name_active_key,this.init_houses_data,this.update_houses_data,this.add_houses_data);

        this.add_houses_data = res.add_data;
        this.update_houses_data = res.update_data;


        console.log(this.add_houses_data);
        console.log(this.update_houses_data);
    }


    //分类信息行选中
    TreeTableClick(e){
            console.log(e);
       let ggmx =  e.node.data.ggmxxxList;

       this.fwjgdm = e.node.data.fwjgdm;
       this.ssfwjbxxId = e.node.data.ssfwjbxxId;
        this.Car = new Array();
        console.log(e.node.data);
        if(ggmx.length>0){
            ggmx.forEach((value,index,arr)=>{
                this.Car.push({'xh':index,'fwjg':value.fwjgdm,'cs':value.cs,'cgxs':value.cgxs,'cmcl':value.cmcl,'zlcc':value.zlcc,'jzmm':value.jzmm,'dw':value.dw,'bz':value.bz,'id':value.id,'zhgxsj':value.zhgxsj,'ssgcdm':value.ssgcdm,'ssxtdm':value.ssxtdm,'kd':value.kd,'jzmj':value.jzmj,'ggcc':value.ggcc,'cd':value.cd,'fwjgdm':this.fwjgdm,'ssfwjbxxId':this.ssfwjbxxId});

            })
        }
        this.list_ggmx_data = this.Car;
        this.list_ggmx_data_copy = JSON.parse(JSON.stringify(this.Car));

        console.log(this.Car);
    }

    //规格明细选中
    DatatableClick(e){
        console.log(e);


        this.Car.forEach((value,index,arr)=>{
            if(value['xh'] == e.data['xh']){
                this.GgmxIndex  = index;
            }
        });

       console.log(this.GgmxIndex);
    }

    //新增规格明细
    addGgmx(e){




        this.Car.push(new Ggmx(this.Car.length==0?0:this.Car[this.Car.length - 1]['xh']+1,'','','','','','','','','','','','','','','','',this.fwjgdm,this.ssfwjbxxId));
        this.Car = this.Car.slice();
        this.GgmxIndex =this.Car.length-1;
        let defaultPerson = this.defaultPerson;
            setTimeout(()=>{
                console.log(defaultPerson);
                console.log(defaultPerson.last.nativeElement);
                defaultPerson.last.nativeElement.click();

            },0);

            this.list_ggmx_data = this.Car;
        console.log(this.Car);

        console.log(this.add_ggmx_data);


    }

    delGgmx(){


        if(this.Car.length >0){
            console.log(this.Car.length);
            console.log(this.Car);



            //删除规格明细时，如果该规格明细修改过，则删除 update_ggmx_data对应的数据

            this.update_ggmx_data.forEach((value,index,arr)=>{

                    if(value['id'] == this.Car[this.GgmxIndex]['id']){
                        arr.splice(index,1);
                        this.del_ggmx_data.push({'id':value['id']});
                    }


            });

            //删除规格明细时，如果该规格明细是新增的，则删除 add_ggmx_data对应的数据

            for(let i in this.add_ggmx_data){

                if(this.add_ggmx_data[i]['xh'] == this.Car[this.GgmxIndex]['xh']){
                    delete this.add_ggmx_data[i];
                }

            }

            console.log(this.update_ggmx_data);
            console.log(this.add_ggmx_data);
            console.log(this.del_ggmx_data);



            this.Car.splice(this.GgmxIndex,1);



            let defaultPerson = this.defaultPerson;

            if(defaultPerson.last != undefined){
                console.log(defaultPerson);
                setTimeout(()=>{
                    if(this.GgmxIndex == 0){
                        defaultPerson._results[this.GgmxIndex].nativeElement.click();

                    }else{
                        defaultPerson._results[this.GgmxIndex-1].nativeElement.click();

                    }

                },0);
            }

            this.Car = this.Car.slice();
            //this.GgmxIndex = this.GgmxIndex -1 ;

        }
       // console.log(this.GgmxIndex);
      //  console.log(this.Car);
       // console.log(this.Car[this.GgmxIndex]);


    }


    calc(num) {
        let dengyu = num.indexOf('=');
        if (dengyu != -1) {
            console.log('开启计算器模式');
            let num1 = num.split('=');
            this.num1 = eval(num1[1]);
        } else {
            console.log('不开启');
        }
    }

    showAreaBlock(): void {
        if (this.isShowArea) {
            this.isShowArea = false;
        } else {
            this.isShowArea = true;
        }

    }

    selectedTypea3(): void {
        this.showTable = this.selectedType3;

        if(this.showTable == 2){
            let defaultPerson = this.defaultPerson;
            setTimeout(()=>{
                console.log(defaultPerson);
                console.log(defaultPerson.last.nativeElement);
                defaultPerson.first.nativeElement.click();

            },0);
        }
    }



    //调查范围显示下拉
    dcfw_show(){




        if(this.dcfw_list_is_show == 0){

            this.dcfw_list_is_show = 1;

            //调查范围 下拉列表

            this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_FWJBXX&column=DCFWDM&gcdm=${this.qshflId.ssgcdm}&xzqhdm=${this.qshflId.ssxzqhdm}`).then((data)=>{

                this.dcfw_list = data['returnObject']; //this.DataProcessing.replaceChildlValue(data['returnObject'],'mc','label','dm','value');

            });

        }else{
            this.dcfw_list_is_show = 0;

        }
    }

    //调查范围选中数据
    dcfw_data(e){

        this.name_active_data.dcfwdm = e.dm;
        this.name_active_data.dcfw_mc = e.mc;
        this.dcfw_list_is_show = 0;
    }



}






//基本信息
export class TreesData{
    constructor(
        public start: any,
        public limit: any,
        public orderCol:any,
        public orderType:any,
        public sql:any,
        public searchKey:any,
        public id:any,
        public ssxtdm:any,
        public ssgcdm:any,
        public qsrId:any,
        public jddm:any,
        public flbmxList=new Array(),
        public swszxzqhdm:any,
        public swszxzqhmc:any,
        public zydldm:any,
        public dcfwdm:any,
        public dcfwmc:any,
        public sl:any,
        public sfxw:any,
        public szgc:any,
        public tfh:any,
        public tbh:any,
        public dclsh:any,
        public dmbh:any,
        public bz:any,
        public cjsj:any,
        public zhgxsj:any,
        public qsrmc:any = '',
        public sfzh:any,
        public localitydesc:any,
        public zydlmc:any
    ){

    }
}

//规格明细
export class Ggmx{
    constructor(
        public xh,
        public fwjg,
        public cs,
        public cgxs,
        public cmcl,
        public zlcc,
        public jzmm,
        public dw,
        public bz,
        public id,
        public zhgxsj,
        public ssgcdm,
        public ssxtdm,
        public kd,
        public jzmj,
        public ggcc,
        public cd,
        public fwjgdm,
        public ssfwjbxxId



    ){

    }
}


