import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SelectItem,CheckboxModule, DataTableModule, SharedModule, LazyLoadEvent, FilterMetadata} from 'primeng/primeng';
import {Message} from "../../../../../../../assets/_primeng@4.2.1@primeng/components/common/message";
import {DataProcessingService} from "../../../../../../service/dataProcessing.service";
import {HttpService} from "../../../../../../service/http-service";
import {NgForm} from "@angular/forms";
import {ValuChangeService} from "../../../../../../service/valuChange.service";
import {SelectListHttpService} from "../../../../../../service/select-list-http.service";
import {InputChangeService} from "../../../../../../service/input-change.service";
import {TreesData} from "../trees/trees.component";

@Component({
  selector: 'app-decoration',
  templateUrl: './decoration.component.html',
  styleUrls: ['../children.css']
})
export class DecorationComponent implements OnInit {
    moreText:string="显示更多内容";
    moreInput:boolean=false;
    types: SelectItem[];
    public selectedType: string;
    types2: SelectItem[];
    public selectedType2: string;
    types3: SelectItem[];
    public selectedType3: string;
    private num1:any;
    private num2:any;
    private num:any;
    private isShowArea: boolean = false;
    showTable: any = 1;

    public decorList = new Array();

    public name_active_data: any; //选中样式
    public name_active_base: any; //选中样式
    public selectPersonList=new Array(); //新增下拉列表
    public displaySelectPserson:boolean = false; //显示隐藏新增人员下拉列表
    public childInfo2;
    public data;
    public childInfo;

    public init_decor_data; //初始化的数据


    public yhzgx_list: any; //与户主关系下拉列表
    public mz_list:any; //民族下拉列表
    public whcd_list:any; //文化程度下拉列表
    public cyzk_list:any; //从业状况下拉列表
    public xb_list:any; //性别选择
    public sfkgr:number = 0; //是否空挂人
    public sfldl:number = 0; //是否劳动力
    public zydl_list:any; //专业大类
    public hkqk_list:any; //户口情况列表
    public hyzk_list:any;//婚姻状况下拉列表
    public dcfw_list:any;//调查范围

    public dcfw_list_is_show = 0;//调查范围显示
    public dcfw_mc;

    public hbdm_list:any;//户别代码 列表

    public del_decor_data = new Array(); //删除的数据
    public update_decor_data =[]; //对比后修改的数据
    public add_decor_data =new Array(); //新增的数据
    public type; //新增、修改、查看

    public fwxz_list:any; //房屋性质
    public fwzyyt_list:any;//房屋主要用途
    public name_active_key = 0;
    public qshflId;
    public ssgcdm; //所属工程代码
    public ssxzqhdm //所属行政区划代码
    public bj_decor_data; //初始化数据标记
    public flxx_update = new Array(); //分类信息
    public flxx_add = new Array(); //分类信息新增


    msgs: Message[] = [];

    @ViewChild('person') person: NgForm;
    @ViewChildren('defaultPerson') defaultPerson: QueryList<ElementRef>;
    private ch;
    constructor(public InputChange:InputChangeService,public selectList:SelectListHttpService,public ValuChangeService:ValuChangeService, public HttpService: HttpService,public DataProcessing: DataProcessingService) {
        this.types = [];
        this.types.push({label: '是', value: '1'});
        this.types.push({label: '否', value: '2'});
        this.types2 = [];
        this.types2.push({label: '是', value: '1'});
        this.types2.push({label: '否', value: '2'});
        this.types3 = [];
        this.types3.push({label: '分类汇总', value: '1'});
        this.types3.push({label: '规格明细', value: '2'});






    }


    ngAfterViewInit(): void {


        // 订阅表单值改变事件
        this.person.valueChanges.subscribe(data => {

                let res =  this.InputChange.get_value_change(this.name_active_data,this.name_active_key,this.init_decor_data,this.update_decor_data,this.add_decor_data);

                this.add_decor_data = res.add_data;
                this.update_decor_data = res.update_data;

                console.log(this.add_decor_data);
                console.log(this.update_decor_data);


            }

        );

    }


    ngOnInit() {

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
        });
        //  房屋性质 下拉列表
        this.selectList.getSelectList('B_FWJBXX', 'FWXZDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.fwxz_list = data;
        });
        //  房屋主要用途 下拉列表
        this.selectList.getSelectList('B_FWJBXX', 'FWZYYTDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.fwzyyt_list = data;
        });


        console.log(this.childInfo2);



        this.selectPersonList.push({label:'选择户成员',value:-1});

        this.childInfo2.forEach((value,index,arr)=>{

            this.selectPersonList.push({label:value['mc'],value:(value['id']!=null?value['id']:index)});

        });


        if(this.data['returnObject']['datalist'][0] !=undefined ){

            this.name_active_data = [ new decorData('','','','','','','','','','','','','','','',0,'','','','','','','','','','','','',1) ];

            this.decorList = this.data['returnObject']['datalist'];  //户成员信息
            this.name_active_data = this.decorList[0];   //默认选中第一个户成员

            if(this.name_active_data['list'] != undefined){

                this.name_active_base = this.name_active_data['list'];
            }else{
                this.name_active_base = this.data['returnObject']['baselist'];
            }

            //转换数据格式

            if(this.bj_decor_data == 1) {
                this.bj_decor_data = 0;
                this.name_active_base.forEach((value, index, arr) => {
                    this.name_active_base[index] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(value, 'childList', 'children', '', ''));

                });
            }




        }else{
            this.decorList = this.data['returnObject']['datalist'];  //户成员信息
            this.name_active_data = '';
            this.name_active_base = '';
        }







        this.selectedType3 = '1';
        this.selectedType = '1';
        this.selectedType2 = '1';


        console.log(this.name_active_data);

    }


    //权属人选择
    eventQsr(e){

        let name = '';
        this.selectPersonList.forEach((value,index,arr)=>{
            console.log(value);
            if( e == -1){
                this.name_active_data.qsrmc = '';
                this.name_active_data.qsrId = '';

            }else if(value['value']==e){
                name = value['label'];
            }

        });


        this.name_active_data.qsrmc = name;
        this.name_active_data.qsrId = e;

        console.log(this.name_active_data);
        let res =  this.InputChange.get_select_change(this.name_active_data,this.name_active_key,this.init_decor_data,this.update_decor_data,this.add_decor_data);

        this.add_decor_data = res.add_data;
        this.update_decor_data = res.update_data;




    }





    //专业大类
    eventZydl(e){
        console.log(e);

        this.name_active_data.zydldm = e;


        let res =  this.InputChange.get_select_change(this.name_active_data,this.name_active_key,this.init_decor_data,this.update_decor_data,this.add_decor_data);

        this.add_decor_data = res.add_data;
        this.update_decor_data = res.update_data;



        console.log(this.add_decor_data);
        console.log(this.update_decor_data);

    }

    
    

    //选择name改变样式
    selectNmae(name, i){
        this.name_active_key = i;
        this.name_active_data = name;

        console.log(this.name_active_data);
        this.name_active_base = this.name_active_data['list'];

    }



    //新增房屋
    getChildEvent1(event){

        console.log(event);



        this.name_active_data['list'] = JSON.parse(JSON.stringify(this.init_decor_data['baseList']));

        this.name_active_base = this.name_active_data['list'];

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



        this.displaySelectPserson = false;
        console.log(this.decorList);





        if((typeof this.decorList) != 'undefined' && this.decorList.length>0){
            this.decorList.push(new TreesData('','','','','','','','','',event,'','','','','',0,'','','','','','','','',name,'','',''));
            this.name_active_data = this.decorList[this.decorList.length-1];
            this.name_active_key = this.decorList.length-1;

        }else{
            this.decorList.push(new TreesData('','','','','','','','','',event,'','','','','',0,'','','','','','','','',name,'','',''));
            this.name_active_data = this.decorList[0];

        }





    }

    //删除人员
    deleteSlect(){



        console.log(this.decorList);
        //记录删除id
        if(this.name_active_data['id']!= undefined || this.name_active_data['id']!= null){
            this.del_decor_data.push({'id':this.name_active_data['id']});

            //如果删除的户成员在修改列表中存在，则从修改列表中删除
            console.log(this.del_decor_data);

        }

        // this.name_active_key= this.name_active_key -1;
        // if(this.decorList[0] != undefined && this.name_active_key>0){
        console.log(this.name_active_data);



        this.decorList.splice(this.name_active_key,1);
        if(this.decorList[0] != undefined && this.decorList.length>0  ){

            if(this.name_active_key == 0){
                this.name_active_data = this.decorList[this.name_active_key+1];
                this.name_active_key = this.name_active_key+1;
            }else{
                this.name_active_data = this.decorList[this.name_active_key-1];
                this.name_active_key = this.name_active_key-1;
            }


        }else if(this.decorList[0] != undefined && this.name_active_key==0){

            this.name_active_data = this.decorList[this.name_active_key+1];
            this.name_active_key = this.name_active_key+1;


        }else{
            this.name_active_data = '';
            this.name_active_base = '';

        }



        // this.decorList.splice(this.name_active_key,1);
        //     if(this.name_active_key == 0){
        //         this.name_active_data = this.decorList[this.name_active_key+1];
        //         this.name_active_key = this.name_active_key + 1;
        //     }else{
        //         this.name_active_data = this.decorList[this.name_active_key-1];
        //         this.name_active_key = this.name_active_key - 1;
        //
        //     }


        console.log(this.name_active_key);

        //}

        console.log(this.del_decor_data);
    }


    //显示新增人员下拉列表
    displaySlect(){        if(this.displaySelectPserson == true){            this.displaySelectPserson = false;        }else{            this.displaySelectPserson = true;        }    }



    Tree_update(data,now_data,i){


        console.log(this.name_active_base[i]);


        console.log(data);
        console.log(now_data);
        this.name_active_base[i] = data;

        if(this.name_active_data.id != undefined && this.name_active_data.cjsj != ""){
            this.flxx_update[now_data['zbflId']] = new Array();
            this.flxx_update[now_data['zbflId']] = {'sl':now_data['sl'],'bz':now_data['bz'],'fwjgdm':now_data['fwjgdm'],'zbflId':now_data['zbflId'],'id':this.name_active_data.id};


        }else{

            if(this.name_active_data['listfwAdd'] == undefined){
                this.name_active_data['listfwAdd'] = new Array();
            }
            this.name_active_data['listfwAdd'][now_data['zbflId']] = {'sl':now_data['sl'],'bz':now_data['bz'],'fwjgdm':now_data['fwjgdm'],'zbflId':now_data['zbflId']};

            //this.flxx_add[now_data['zbflId']] = new Array();
            //this.flxx_add[now_data['zbflId']] = {'sl':now_data['sl'],'bz':now_data['bz'],'fwjgdm':now_data['fwjgdm'],'zbflId':now_data['zbflId']};


        }
        console.log(this.flxx_update);
        console.log(this.name_active_data);
        // let  parent_data = this.get_data(parent);
        //  delete parent_data['expanded'];
        // delete parent_data['parent'];
        //  console.log(parent_data);


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
    selectedTypea(){

    }
    calc(num){
        // let Num=num.split("=");

        let dengyu = num.indexOf('=');
        if(dengyu!=-1){
            console.log('开启计算器模式');
            let num1=num.split('=');
            this.num1=eval(num1[1]);


        }else{
            console.log('不开启');
        }
    }

    showAreaBlock(): void {

        if (this.isShowArea) {
            this.isShowArea = false;
            console.log(this.isShowArea);
        } else {
            this.isShowArea = true;
            console.log(this.isShowArea);
        }

    }
    selectedTypea3(): void {
        console.log('aaaaaaa');
        this.showTable = this.selectedType3;
    }


    //调查范围显示下拉
    dcfw_show(){




        if(this.dcfw_list_is_show == 0){

            this.dcfw_list_is_show = 1;

            //调查范围 下拉列表
            console.log(this.name_active_data);
            this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_FWZXJBXX&column=DCFWDM&gcdm=${this.qshflId.ssgcdm}&xzqhdm=${this.qshflId.ssxzqhdm}`).then((data)=>{

                this.dcfw_list = data['returnObject']; //this.DataProcessing.replaceChildlValue(data['returnObject'],'mc','label','dm','value');

            });

        }else{
            this.dcfw_list_is_show = 0;

        }
    }

    //调查范围选中数据
    dcfw_data(e){

        this.name_active_data.dcfwdm = e.dm;
        this.name_active_data.dcfwmc = e.mc;
        this.dcfw_list_is_show = 0;
    }





}





//基本信息
export class decorData{
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
        public swszxzqhdm:any,
        public zydldm:any,
        public dcfwdm:any,
        public sl:any,
        public sfxw :any,
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
        public zydlmc:any,
        public jzzmj:any
    ){

    }
}