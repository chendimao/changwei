import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {flyIn} from "../../../animations/fly-in";
import {JmhQueryComponent} from "./jmh_query.component";
import {JmhFjViewComponent} from "./jmh_fj_view.component";
import {JmhMangComponent} from "./jmh_fj_mang.component";
import {MenuItem} from "../../../../assets/_primeng@4.2.1@primeng/components/common/menuitem";
import {alertModelInfo} from "./alertModelInfo";
import {SwzbPersonComponent} from "./children/swzb-person.component";
import {HttpService} from "../../../service/http-service";
import {DataProcessingService} from "../../../service/dataProcessing.service";


@Component({
    selector: 'app-jmh',
    templateUrl: './jmh.component.html',
    styleUrls: ['./jmh.component.css'],
    animations: [flyIn]
})
export class JmhComponent implements OnInit {
    private alertModelInfo: alertModelInfo = new alertModelInfo;
    private breadcrumb: MenuItem[];
    private id: number;
    private msgs: any;
    private treelist: any;
    public persionList: any;

    private projectId: any;
    private huInfo: any;
    private totalPage: number;
    private count: number;
    private secNav: string;
    private getParem = new getParem;
    private params: string;


    @ViewChild('modelRoom', {read: ViewContainerRef}) ModelRoom: ViewContainerRef;

    // 加的加载
    isShowRight: boolean = false;
    defaultShow: boolean = true;

    moduleStyle: any;


    constructor(private DataProcessingService: DataProcessingService, private AlertModel: ComponentFactoryResolver, private route: ActivatedRoute, private HttpService: HttpService) {
        console.log(this.route.snapshot);


        let url = window.location.href.split('/');
        console.log(url);
        switch (url[4]) {
            case "kxxyjbgjd":
                this.secNav = "可行性研究报告阶段";
                this.getParem.jddm = '1';
                break;
            case "cbsjjd":
                this.secNav = "初步设计概况";
                break;
            case "ssazjd":
                this.secNav = "实施安置阶段";
                break;
            case "ghtzjd":
                this.secNav = "规划调整阶段";
                break;
            case "ymanysjd":
                this.secNav = "移民安置验收阶段 ";
                break;
        }


        this.route.params.subscribe(res => {
            console.log(res);
            this.getParem.ssgcdm = res['id'];
            this.getParem.id = res['qshflId'];
            this.alertModelInfo.huId = res['id'];
            this.alertModelInfo.item = res['item'];
            console.log(res);
            this.breadcrumb = [
                {label: '首页', routerLink: '/engmang'},
                {label: this.secNav},
                {label: '实物指标'},
            ];
            switch (this.alertModelInfo.item) {
                case "jmh":
                    this.breadcrumb.push({label: '居民户'});
                    break;
                case "jtjjzz":
                    this.breadcrumb.push({label: '集体经济组织'});
                    break;
                case "nfy":
                    this.breadcrumb.push({label: '农副业'});
                    break;
                case "gtgs":
                    this.breadcrumb.push({label: '个体工商'});
                    break;
                case "xcqsdw":
                    this.breadcrumb.push({label: '乡村企事单位'});
                    break;
                case "gykqy":
                    this.breadcrumb.push({label: '工业（矿）企业'});
                    break;
                case "tl":
                    this.breadcrumb.push({label: '铁路'});
                    break;
                case "gl":
                    this.breadcrumb.push({label: '公路'});
                    break;
                case "qh":
                    this.breadcrumb.push({label: '桥涵'});
                    break;
                case "hd":
                    this.breadcrumb.push({label: '航道'});
                    break;
                case "gk":
                    this.breadcrumb.push({label: '港口'});
                    break;
                case "mt":
                    this.breadcrumb.push({label: '码头'});
                    break;
                case "sbdgc":
                    this.breadcrumb.push({label: '输变电工程'});
                    break;
                case "dxgc":
                    this.breadcrumb.push({label: '电信工程'});
                    break;
                case "gbdsgc":
                    this.breadcrumb.push({label: '广播电视工程'});
                    break;
                case "gdgc":
                    this.breadcrumb.push({label: '管道工程'});
                    break;
                case "slsdgc":
                    this.breadcrumb.push({label: '水利水电工程'});
                    break;
                case "kczy":
                    this.breadcrumb.push({label: '矿产资源'});
                    break;
                case "wwgj":
                    this.breadcrumb.push({label: '文物古迹'});
                    break;
                case "swz":
                    this.breadcrumb.push({label: '水文（气象）站'});
                    break;
                case "qtzx":
                    this.breadcrumb.push({label: '其他专项'});
                    break;
            }
            console.log(this.breadcrumb);
            console.log('路由在改变');
        });
        //后期把这个阶段代码用函数代替
        // this.HttpService.get('zbflpz/listGzjd')
        //     .then(res => {
        //         console.log(res);
        //     })
    }

    ngOnInit() {


        this.HttpService.get(`locality/listTree`)
            .then(res => {
                this.treelist = this.DataProcessingService.replaceChildlList(res['returnObject'], 'localityName', 'label', 'childrenLocality', 'children');

            });


    }

    ngOnDestroy() {
        this.route.params.subscribe(res => {
            this.projectId = res['id'];
            this.alertModelInfo.huId = res['id'];
            this.alertModelInfo.item = res['item'];
            console.log(res);
        });
    }


    openModal(name) {
        this.ModelRoom.clear();
        switch (name) {
            case 'query':
                const query = this.AlertModel.resolveComponentFactory(JmhQueryComponent);
                this.ModelRoom.createComponent(query);
                break;
            case 'fj_view':
                const fjView = this.AlertModel.resolveComponentFactory(JmhFjViewComponent);
                this.ModelRoom.createComponent(fjView);
                break;
            case 'fj_mang':
                const fjMang = this.AlertModel.resolveComponentFactory(JmhMangComponent);
                this.ModelRoom.createComponent(fjMang);
                break;
            default:
                console.log(this.huInfo);
                if (this.huInfo) {
                    const person = this.AlertModel.resolveComponentFactory(SwzbPersonComponent);
                    const perModel = this.ModelRoom.createComponent(person);
                    perModel.instance.type = name;
                    perModel.instance.info = this.huInfo;
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

                    }
                }


                break;
        }
    }


    searchList(e, key) {
        if (e.keyCode == 13 || e == 'click') {
            console.log("搜索");
            this.HttpService.get(`jmh/list?${this.params}&searchKey=${key}`)
                .then(res => {
                    this.persionList = res['returnObject'];
                    this.totalPage = res['totalPage'];
                    this.count = res['count'];
                });
        }
    }

    onRowSelect(list) {
        this.huInfo = list.data;

    }


    getEvent(event) {
        this.getParem.ssxzqhdm = event.localityCode;
        this.isShowRight = event;
        this.defaultShow = false;
        this.params = this.DataProcessingService.transString(this.getParem);
        this.HttpService.get('jmh/list?' + this.params)
            .then(res => {
                this.persionList = res['returnObject'];
                this.totalPage = res['totalPage'];
                this.count = res['count'];
            })
            .catch(res => {
                console.log(res);
            });


    }
}


export class getParem {
    ssxzqhdm: string;	//行政区划代码	是	350526100209011	350526100209011
    ssgcdm: string;	//工程代码	是	S000001	S000001
    jddm: string;	//阶段代码	是	1	1
    searchKey: string;	//搜索关键字	否
    start: string;	//开始条数	是
    limit: string;	//取多少条记录	是
    id: string;  //权属户分类ID	是
}







