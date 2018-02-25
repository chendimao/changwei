import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {flyIn} from "../../../animations/fly-in";
import {JmhQueryComponent} from "./jmh_query.component";
import {JmhFjViewComponent} from "./jmh_fj_view.component";
import {JmhMangComponent} from "./jmh_fj_mang.component";
import {MenuItem} from "../../../../assets/_primeng@4.2.1@primeng/components/common/menuitem";
import { alertModelInfo } from "./alertModelInfo";
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
    public selectedHu: any;
    private projectId: any;

    private totalPage: number;
    private count: number;


    @ViewChild('modelRoom', {read: ViewContainerRef}) ModelRoom: ViewContainerRef;

    // 加的加载
    isShowRight: boolean = false;
    defaultShow: boolean = true;

    moduleStyle: any;


    constructor(private DataProcessingService: DataProcessingService, private AlertModel: ComponentFactoryResolver, private route: ActivatedRoute, private HttpService: HttpService) {
        this.route.params.subscribe(res => {
            this.projectId = res['id'];
            this.alertModelInfo.huId = res['id'];
            this.alertModelInfo.item = res['item'];
            console.log(res);
            this.breadcrumb = [
                {label: '首页', routerLink: '/engmang'},
                {label: '可行性研究报告阶段'},
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

    }

    ngOnInit() {



        this.HttpService.get(`locality/listTree`)
            .then(res => {
                this.treelist = this.DataProcessingService.replaceChildlList(res['returnObject'], 'localityName', 'label', 'childrenLocality', 'children');

            });


        // this.HttpService.get('gczc/list?start=1&limit=10')
        //     .then(res => {
        //         this.totalPage = res['totalPage'];
        //            this.count=res['count'];
        //         this.cars = res['returnObject'];
        //     });
        this.persionList = persionList;
    }
    ngOnDestroy(){
        this.route.params.subscribe(res => {
            this.projectId = res['id'];
            this.alertModelInfo.huId = res['id'];
            this.alertModelInfo.item = res['item'];
            console.log(res);
        });
    }
    ngOnChanges() {

    }

    openModal(name) {
        this.ModelRoom.clear();
        switch (name) {
            case 'query':
                const query = this.AlertModel.resolveComponentFactory(JmhQueryComponent);
                this.ModelRoom.createComponent(query);
                break;
            case 'addPerson':
                const person = this.AlertModel.resolveComponentFactory(SwzbPersonComponent);
                const perModel = this.ModelRoom.createComponent(person);
                this.alertModelInfo.type = "add";
                perModel.instance.info = this.alertModelInfo;
                break;


            case 'fj_view':
                const fjView = this.AlertModel.resolveComponentFactory(JmhFjViewComponent);
                this.ModelRoom.createComponent(fjView);
                break;
            case 'fj_mang':
                const fjMang = this.AlertModel.resolveComponentFactory(JmhMangComponent);
                this.ModelRoom.createComponent(fjMang);
                break;
        }
    }

    // queryList(e) {
    //     let start = e.first;
    //     console.log(start);
    //     this.HttpService.get(`gczc/list?start=${start}&limit=10`)
    //         .then(res => {
    //             this.cars = res['returnObject'];
    //         });
    //
    // }

    onRowSelect(list) {

        this.id = list['id'];
        this.selectedHu = list;
        console.log(this.id);
    }


    getEvent(event) {
        this.isShowRight = event;
        this.defaultShow = false;
    }
}


const persionList: any = [
    {
        id: 1,
        cid: '205202011001',
        name: '蔡国成',
        area: '福建省泉州市安溪县白濑乡长基村',
        fanwei: '水库淹没影响区-淹没区',
        type: '农村部分',
        kong: '是',
        xianwai: '否',
        remark: '无'
    },
    {
        id: 2,
        cid: '205202011002',
        name: '李应春',
        area: '福建省泉州市安溪县白濑乡长基村',
        fanwei: '水库淹没影响区-淹没区',
        type: '农村部分',
        kong: '是',
        xianwai: '否',
        remark: '无'
    },
    {
        id: 3,
        cid: '205202011003',
        name: '蔡加明',
        area: '福建省泉州市安溪县白濑乡长基村',
        fanwei: '水库淹没影响区-淹没区',
        type: '农村部分',
        kong: '是',
        xianwai: '否',
        remark: '无'
    },
    {
        id: 4,
        cid: '205202011004',
        name: '文秀全',
        area: '福建省泉州市安溪县白濑乡长基村',
        fanwei: '水库淹没影响区-淹没区',
        type: '农村部分',
        kong: '是',
        xianwai: '否',
        remark: '无'
    },

];





