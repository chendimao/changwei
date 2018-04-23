import {Component, OnInit} from '@angular/core';

import {HttpService} from "../../../../service/http-service";
import {DataProcessingService} from "../../../../service/dataProcessing.service";
import {ActivatedRoute} from '@angular/router';
import {SearchService} from "../../../../service/search.service";
import {GHZB_TITLE} from "../../../../service/ghzb-title.service";
import {alertModelInfo} from "../../swzb/alertModelInfo";
import {Subscription} from "rxjs/Subscription";
import {ShareService} from "../../../../systemSetting/service/share.service";

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

    public alertModelInfo: alertModelInfo = new alertModelInfo;
    public subscription: Subscription;

    public totalPage: number;
    public listUrl: any;
    public count: number;
    public currentPage: number;
    public persionList: any;
    private title: any;

    constructor(private  ShareService: ShareService,private SearchService: SearchService, private router: ActivatedRoute, private HttpService: HttpService, private DataProcessingService: DataProcessingService) {
        this.router.params.subscribe(res => {
            this.dataList = res['res'];
        })
    }

    ngOnInit() {

        this.router.params.subscribe(res => {
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
        this.isShowRight = event;
        this.defaultShow = false;
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
