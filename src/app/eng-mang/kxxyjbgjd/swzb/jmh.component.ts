import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {flyIn} from "../../../animations/fly-in";
import {JmhQueryComponent} from "./jmh_query.component";
import {ShareService} from "../../../systemSetting/service/share.service";
import {JmhFjViewComponent} from "./jmh_fj_view.component";
import {JmhMangComponent} from "./jmh_fj_mang.component";
import {MenuItem} from "../../../../assets/_primeng@4.2.1@primeng/components/common/menuitem";
import {alertModelInfo} from "./alertModelInfo";
import {SwzbPersonComponent} from "./children/swzb-person.component";
import {HttpService} from "../../../service/http-service";
import {DataProcessingService} from "../../../service/dataProcessing.service";
import {SearchService} from "../../../service/search.service";
import {DelWaringComponent} from "../../../common/del-waring/del-waring.component";
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-jmh',
    templateUrl: './jmh.component.html',
    styleUrls: ['./jmh.component.css'],
    animations: [flyIn],
    providers: [SearchService]
})
export class JmhComponent implements OnInit {
    private alertModelInfo: alertModelInfo = new alertModelInfo;
    private breadcrumb: MenuItem[];
    private msgs: any;
    private treelist: any;
    public persionList: any;

    private projectId: any;
    private huInfo: any;

    private totalPage: number;
    private listUrl: any;
    private count: number;
    private currentPage: number;

    private secNav: string;
    private getParem = new getParem;
    subscription = new Subscription;


    @ViewChild('modelRoom', {read: ViewContainerRef}) ModelRoom: ViewContainerRef;

    // 加的加载
    isShowRight: boolean = false;
    defaultShow: boolean = true;

    moduleStyle: any;


    constructor(private ShareService: ShareService, private SearchService: SearchService, private DataProcessingService: DataProcessingService, private AlertModel: ComponentFactoryResolver, private route: ActivatedRoute, private HttpService: HttpService) {
        console.log(this.route.snapshot);
        this.route.params.subscribe(res => {

            console.log(res);
            this.HttpService.get(`zdk/list?sjId=443C3162A4554323AFB04EE7AEF7F164`)
                .then((data) => {
                    console.log(data);
                    let lsArr = this.SearchService.searchByRegExp(res['jddm'], data['returnObject'], 'dm');
                    console.log(lsArr);
                    this.secNav = lsArr[0].mc;
                    this.getParem.jdId = lsArr[0].id;
                    this.getParem.jddm = res['jddm'];
                    this.getParem.ssgcdm = res['id'];
                    this.getParem.id = res['qshflId'];

                    console.log(this.getParem.id);
                    this.alertModelInfo.huId = res['id'];
                    this.alertModelInfo.item = res['item'];
                    console.log(this.secNav);

                    this.breadcrumb = [
                        {label: '首页', routerLink: '/engmang'},
                        {label: this.secNav},
                        {label: '实物指标'},
                        {label: this.alertModelInfo.item}
                    ];


                    this.persionList = null;
                    this.totalPage = 0;
                    this.count = 0;
                    console.log(this.breadcrumb);
                    console.log('路由在改变');

                    this.HttpService.get(`jmh/list?ssxzqhdm=${this.getParem.ssxzqhdm}&ssgcdm=${this.getParem.ssgcdm}&jddm=${this.getParem.jddm}&id=${this.getParem.id}`)
                        .then(res => {
                            this.persionList = res['returnObject'];
                            this.persionList = this.persionList.slice();
                            this.totalPage = res['totalPage'];
                            this.count = res['count'];
                        })

                })


        });
        this.subscription = this.ShareService.getMessage()
            .subscribe((data) => {
                console.log(data);
                if (data['message']['item'] == 'jmh') {
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
    }

    ngOnInit() {
        this.listUrl = 'jmh/list';
        this.getParem.start = '1';
        this.getParem.limit = '10';


        this.HttpService.get(`locality/listTree`)
            .then(res => {
                this.treelist = this.DataProcessingService.replaceChildlList(res['returnObject'], 'localityName', 'label', 'childrenLocality', 'children');
                this.DataProcessingService.openLv(this.treelist, 1);
            });
        // let paglistUrl = JSON.parse(JSON.stringify(this.getParem));
        // delete paglistUrl.start;
        // delete paglistUrl.limit;
        // this.listUrl = "jmh/list?" + this.DataProcessingService.transString(paglistUrl);
    }

    ngOnDestroy() {
        this.route.params.subscribe(res => {
            this.projectId = res['id'];
            this.alertModelInfo.huId = res['id'];
            this.alertModelInfo.item = res['item'];
            console.log(res);
        });
    }

    delSelect() {
        console.log(this.huInfo)
        console.log("删除所选项");
        this.ModelRoom.clear();
        if (this.huInfo['id'] == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请选择删除项'});
        } else {
            const delmodel = this.AlertModel.resolveComponentFactory(DelWaringComponent);
            const delModelbxo = this.ModelRoom.createComponent(delmodel);
            delModelbxo.instance.message = "删除户？";
            delModelbxo.instance.url = 'jmh/delete?id=' + this.huInfo['id'];
            delModelbxo.instance.item = 'jmh';
            delModelbxo.instance.confirm();
        }
    }

    openModal(name) {


        this.ModelRoom.clear();
        switch (name) {
            case 'query':
                const query = this.AlertModel.resolveComponentFactory(JmhQueryComponent);
                const queryModel = this.ModelRoom.createComponent(query);
                queryModel.instance.getParem = this.getParem;
                break;
            case 'fj_view':
                const fjView = this.AlertModel.resolveComponentFactory(JmhFjViewComponent);
                this.ModelRoom.createComponent(fjView);
                break;
            case 'fj_mang':
                const fjMang = this.AlertModel.resolveComponentFactory(JmhMangComponent);
                this.ModelRoom.createComponent(fjMang);
                break;
            case 'add':
                const person = this.AlertModel.resolveComponentFactory(SwzbPersonComponent);
                const perModel = this.ModelRoom.createComponent(person);
                perModel.instance.type = name;
                perModel.instance.qshflId = this.getParem;
                break;
            default:
                console.log(this.huInfo);
                if (this.huInfo) {
                    const person = this.AlertModel.resolveComponentFactory(SwzbPersonComponent);
                    const perModel = this.ModelRoom.createComponent(person);
                    perModel.instance.type = name;
                    perModel.instance.info = this.huInfo;
                    perModel.instance.qshflId = this.getParem;
                    // perModel.instance.jmhListUrl = this.getUrl();
                } else {
                    if (name === 'view') {
                        this.msgs = [];
                        this.msgs.push({severity: 'warn', summary: '点击提醒', detail: '请选择查看项'});
                    } else if (name === 'rew') {
                        this.msgs = [];
                        this.msgs.push({severity: 'warn', summary: '点击提醒', detail: '请选择修改项'});
                    } else {
                        const person = this.AlertModel.resolveComponentFactory(SwzbPersonComponent);
                        const perModel = this.ModelRoom.createComponent(person);
                        perModel.instance.type = name;
                        perModel.instance.info = null;
                        perModel.instance.qshflId = this.getParem;


                    }
                }


                break;
        }
    }

    // 搜索时候，需要把url地址进行改变
    searchList(e, key) {
        if (e.keyCode == 13 || e == 'click') {
            this.getParem.searchKey = key;
            this.getParem.start = "1";
            for (let key in this.getParem) {
                if (key != 'searchKey' && key != 'limit' && key != 'start' && key != 'id' && key != 'ssxzqhdm' && key != 'ssxzqhdmMin' && key != 'ssxzqhmc' && key != 'ssgcdm' && key != 'jddm') {
                    delete  this.getParem[key];
                }
            }
            this.HttpService.get(this.getUrl())
                .then(res => {
                    this.persionList = res['returnObject'];
                    this.totalPage = res['totalPage'];
                    this.count = res['count'];
                });
        }
    }

    onRowSelect(list) {
        console.log(list);
        this.huInfo = list.data;

    }

    queryList(res) {
        this.getParem.start = res.value.first + 1;
        this.getParem.limit = res.value.rows;
        this.currentPage = res.data['currentPage'];
        this.totalPage = res.data['totalPage'];
        this.count = res.data['count'];




        this.persionList = res.data['returnObject'];
    }


    getEvent(event) {

        this.getParem.start = '1';

        this.count = 0;
        console.log(this.getParem);
        this.getParem.ssxzqhdm = event.localityCode;
        if (event.localityLevel == 5) {
            this.getParem.ssxzqhdmMin = event.parent.localityCode;
        } else if (event.localityLevel == 6) {
            this.getParem.ssxzqhdmMin = event.parent.parent.localityCode;
        }

        this.getParem.ssxzqhmc = event.localityDesc;
        this.getParem.searchKey = null;

        this.isShowRight = event;
        this.defaultShow = false;
        for (let key in this.getParem) {
            if (key != 'limit' && key != 'start' && key != 'id' && key != 'ssxzqhdm' && key != 'ssxzqhdmMin' && key != 'ssxzqhmc' && key != 'ssgcdm' && key != 'jddm') {
                delete  this.getParem[key];
            }
        }
        this.HttpService.get(this.getUrl())
            .then(res => {
                this.persionList = res['returnObject'];
                this.totalPage = res['totalPage'];
                this.count = res['count'];
            })
            .catch(res => {
                console.log(res);
            });
        // let paglistUrl = JSON.parse(JSON.stringify(this.getParem));
        // console.log(paglistUrl);
        // delete paglistUrl.start;
        // delete paglistUrl.limit;
        // this.listUrl = "jmh/list?" + this.DataProcessingService.transString(paglistUrl);
    }

    getUrl() {
        return this.listUrl + '?' + this.DataProcessingService.transString(this.getParem);
    }

}


export class getParem {
    ssxzqhdm: string;	//行政区划代码	是	350526100209011	350526100209011
    ssxzqhdmMin: string; // 行政区划最小集代码
    ssxzqhmc: string;	//行政区划名称	是	S000001	S000001
    ssgcdm: string;	//工程代码	是	S000001	S000001
    jddm: string;	     //阶段代码	是	1	1
    searchKey: string;	//搜索关键字	否
    start: string;	 //开始条数	是
    limit: string;	 //取多少条记录	是
    id: string;   //权属户分类ID	是


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







