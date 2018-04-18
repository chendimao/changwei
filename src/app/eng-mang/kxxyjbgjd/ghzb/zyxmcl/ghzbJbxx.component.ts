import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {HttpService} from "../../../../service/http-service";
import {DataProcessingService} from "../../../../service/dataProcessing.service";
import {SearchService} from "../../../../service/search.service";
import {ActivatedRoute} from "@angular/router"
import { GhzbJbxxChildComponent } from "./children/ghzbJbxxChild.component";
import {GHZB_TITLE} from "../../../../service/ghzb-title.service";
import {ShareService} from "../../../../systemSetting/service/share.service";
import {Subscription} from "rxjs/Subscription";
import {DelWaringComponent} from "../../../../common/del-waring/del-waring.component";
import {MenuItem} from "../../../../../assets/_primeng@4.2.1@primeng/components/common/menuitem";
import {alertModelInfo} from "../../swzb/alertModelInfo";


@Component({
    selector: 'app-ghzbJbxx',
    templateUrl: './ghzbJbxx.component.html',
    styleUrls: ['./ghzbJbxx.component.css'],
    providers:[ShareService]
})
export class GhzbJbxxComponent implements OnInit {
    display1: boolean = false;
    public treelist: any;
    public breadcrumb: MenuItem[];
    public getparam = new getParam;
    public secNav: any;
    public dataList;
    public title ;
    public selectInfo;
    public msgs: any;
    public dm :any;
    public params;
    private alertModelInfo: alertModelInfo = new alertModelInfo;

    public totalPage: number;
    public listUrl: any;
    public count: number;
    public currentPage: number;
    public persionList: any;
    @ViewChild('modelRoom', {read: ViewContainerRef}) ModelRoom: ViewContainerRef;
    public subscription: Subscription;
    constructor(public ShareService:ShareService, public AlertModel: ComponentFactoryResolver,public SearchService: SearchService, public router: ActivatedRoute, public HttpService: HttpService, public DataProcessingService: DataProcessingService) {
        this.router.params.subscribe(res => {
            console.log(res);
            console.log(this.router.params);
            console.log(this.router.queryParams['value']);
            this.params= this.router.queryParams['value']; //请求接口所需的参数


            console.log(res);
            this.HttpService.get(`zdk/list?sjId=443C3162A4554323AFB04EE7AEF7F164`)
                .then((data) => {
                    console.log(data);
                    let lsArr = this.SearchService.searchByRegExp(res['jddm'], data['returnObject'], 'dm');
                    console.log(lsArr);
                    this.secNav = lsArr[0].mc;
                    this.getparam.jdId = lsArr[0].id;
                    this.getparam.jddm = res['jddm'];
                    this.getparam.ssgcdm = res['id'];
                    this.getparam.id = res['qshflId'];

                    console.log(this.getparam.id);
                    this.alertModelInfo.huId = res['id'];
                    this.alertModelInfo.item = res['item'];
                    console.log(this.secNav);

                    this.breadcrumb = [
                        {label: '首页', routerLink: '/engmang'},
                        {label: this.secNav},
                        {label: '规划指标'},
                        {label: this.params['item']}
                    ];


                    this.persionList = null;
                    this.totalPage = 0;
                    this.count = 0;
                    console.log(this.breadcrumb);
                    console.log('路由在改变');





                    this.subscription = this.ShareService.getMessage()
                        .subscribe((data) => {
                            console.log(data);
                            if (data['message']['item'] == 'ghzb') {
                                if (data['message']['summary']) {
                                    this.msgs = [];
                                    this.msgs.push(data['message']);
                                }

                                if (data['message']['severity'] === 'success') {
                                    console.log(this.getUrl());
                                    this.HttpService.get(this.getUrl())
                                        .then(res => {
                                            this.persionList = res['returnObject'];
                                            this.totalPage = res['totalPage'];
                                            this.count = res['count'];
                                        })
                                }
                            }
                        })



                })




        })
    }

    openModal(name) {
        console.log("创建子模块");


        if(this.selectInfo){
            console.log(this.selectInfo);
            const person = this.AlertModel.resolveComponentFactory(GhzbJbxxChildComponent);
            const perModel = this.ModelRoom.createComponent(person);
                  perModel.instance.baseInfo = this.selectInfo;
                  perModel.instance.dm = this.params.ssghxmfldm;
        }else{

            if (name === 'view') {
                this.msgs = [];
                this.msgs.push({severity: 'warn', summary: '点击提醒', detail: '请选择查看项'});
            } else if (name === 'rew') {
                this.msgs = [];
                this.msgs.push({severity: 'warn', summary: '点击提醒', detail: '请选择修改项'});
            }


        }
    }



    ngOnInit() {
        this.listUrl = 'ghxm/list';
        this.getparam.start = '1';
        this.getparam.limit = '10';
        //let params = `?start=1&limit=10&ssgcdm=${this.router.queryParams['value']['ssgcdm']}&xmszxzqhdm=${this.router.queryParams['value']['xmszxzqhdm']}&ssghxmfldm=${this.router.queryParams['value']['ssghxmfldm']}`;
        this.getparam.ssgcdm = this.router.queryParams['value']['ssgcdm'];
        this.getparam.xmszxzqhdm = this.router.queryParams['value']['xmszxzqhdm'];
        this.getparam.ssghxmfldm = this.router.queryParams['value']['ssghxmfldm'];
        console.log(this.router.queryParams['value'])
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

        console.log(GHZB_TITLE);
        for(let i in GHZB_TITLE){
            if(i == this.params.ssghxmfldm){
                this.title = GHZB_TITLE[i];
            }

        }

        console.log(this.title);






    }



    DatatableClick(e){
        console.log(e);
        this.selectInfo = e;
    }


    delSelect() {
        console.log(this.selectInfo)
        console.log("删除所选项");
        this.ModelRoom.clear();
        if (!this.selectInfo) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请选择删除项'});
        } else {
            const delmodel = this.AlertModel.resolveComponentFactory(DelWaringComponent);
            const delModelbxo = this.ModelRoom.createComponent(delmodel);
            delModelbxo.instance.message = "删除户？";
            delModelbxo.instance.url = 'ghxm/delete?id=' + this.selectInfo['id'];
            delModelbxo.instance.item = 'ghzb';
            delModelbxo.instance.confirm();
        }
    }




    //分页

    queryList(res) {

            console.log(res);

        this.getparam.start = res.value.first + 1;
        this.getparam.limit = res.value.rows;
        this.currentPage = res.data['currentPage'];
        this.totalPage = res.data['totalPage'];
        this.count = res.data['count'];
        //this.persionList = this.dataList;



    }

    getUrl() {
        return this.listUrl + '?' + this.DataProcessingService.transString(this.getparam);
    }
    
    




}


export class ghzbList{

    constructor(

        public id,
        public orderType,
        public orderCol,
        public sql,
        public start,
        public limit,
        public ssxtdm,
        public ssgcdm,
        public ssghxmfldm,
        public xmmc,
        public xmjc,
        public xmszxzqhdm,
        public xmgldwxzqhdm,
        public bz,
        public cjsj,
        public zhgxsj,
        public ssghxmflmc,
        public xmszxzqhmc,
        public xmgldwxzqhmc,

    ){

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

