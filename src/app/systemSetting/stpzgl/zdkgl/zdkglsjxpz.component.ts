import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {HttpService} from "../../../service/http-service";
import {ZdkglModel} from "./zdkgl.model";
import {ZdkglsjxpzxqComponent} from "./zdkglsjxpzxq.component";
import {DataProcessingService} from "../../../service/dataProcessing.service";
import {SearchService} from "../../../service/search.service";
import {Subscription} from 'rxjs/Subscription';
import {ShareService} from "../../service/share.service";
import { DelWaringComponent } from "../../../common/del-waring/del-waring.component";

@Component({
    selector: 'app-zdkglxq',
    templateUrl: './zdkglsjxpz.component.html',
    styleUrls: ['./zdkgl.component.css'],
    providers: [SearchService]
})
export class ZdkglsjxpzComponent implements OnInit {
    private display: boolean = true;
    private msgs: any;
    private selectList2 = new Object();
    private selectList1 = new Object();
    private project: ZdkglModel = new ZdkglModel();
    public info;
    private key;
    private SearchList: any;
    private defaultList: any;

    private treelist: any;
    private sjMc: string;
    private zidian: ZdkglModel = new ZdkglModel();

    subscription = new Subscription;


    @ViewChild('dmroom', {read: ViewContainerRef}) dmRoom: ViewContainerRef;

    constructor(private shareService: ShareService, private SearchService: SearchService, private HttpService: HttpService, private AlertBox: ComponentFactoryResolver, private DataProcessingService: DataProcessingService) {
        this.subscription = this.shareService.getMessage()
            .subscribe(message => {
                console.log(message);
                if (message['message']['display'] == "false") {
                    this.dmRoom.clear();
                }
                this.msgs = [];
                this.msgs.push(message['message']);
                if (message['message']['severity'] == 'success') {
                    this.HttpService.get(`zdk/list?sjId=${this.zidian['id']}&start=1&limit=10`)
                        .then(res => {
                            this.SearchList = res['returnObject'];
                        });
                }
            });

    }

    ngOnInit() {
        this.zidian = this.info;
        this.HttpService.get(`zdk/listTree?sjId=${this.zidian['id']}`)
            .then(res => {
                let childObj = res['returnObject'];
                console.log(this.info);
                console.log(typeof (this.info));
                let allList = this.info;
                allList.listZdk = childObj;
                console.log(allList);
                this.treelist = this.DataProcessingService.replaceChildlList(allList, 'listZdk', 'children', 'mc', 'label');

            });


        // this.sjMc = this.zidian['mc'];
        // console.log(this.zidian);
        this.HttpService.get(`zdk/list?sjId=${this.zidian['id']}&start=1&limit=10`)
            .then(res => {
                this.SearchList = res['returnObject'];
            });


        this.selectList1 = [
            {label: '虚节点', name: '虚节点', value: '0'},
            {label: '数据项', name: '数据项', value: '1'}
        ];
        this.selectList2 = [
            {label: '基本字典', name: '基本字典', value: 'JCL'},
            {label: '指标类', name: '指标类', value: 'JCL'},
            {label: '项目类', name: '项目类', value: 'JCL'},
            {label: '档案类', name: '档案类', value: 'JCL'},
        ];

    }

    close() {
        this.display = false;
    }


    showModule(i) {
        console.log(i);
        switch (i) {
            case 'add':
                const alert = this.AlertBox.resolveComponentFactory(ZdkglsjxpzxqComponent);
                const alertBox = this.dmRoom.createComponent(alert);
                alertBox.instance.parentInfo = this.zidian;
                break;
            case 'rew':
                const alert2 = this.AlertBox.resolveComponentFactory(ZdkglsjxpzxqComponent);
                const alertBox2 = this.dmRoom.createComponent(alert2);
                alertBox2.instance.parentInfo = this.zidian;
                alertBox2.instance.childInfo = this.project;
                break;
        }
    }
    delSelect() {
        if (this.project['id'] == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请选择删除项'});
        } else {
            const delmodel = this.AlertBox.resolveComponentFactory(DelWaringComponent);
            const delModelbxo = this.dmRoom.createComponent(delmodel);
            delModelbxo.instance.message = "删除当前选择项";
            delModelbxo.instance.url = 'zdk/delete?id=' + this.project['id'];
            delModelbxo.instance.confirm();
        }
    }


    ViewDetail(i) {
        console.log(i);

        // this.HttpService.get(`/zdyy/query?id=${i}`)
        //     .then(res => {
        //         console.log(res['returnObject']);
        //         this.SearchList = res['returnObject'];
        //         console.log(this.SearchList);
        //     });
    }

    onRowSelect(event) {
        console.log(event);

        this.project = event.data;
        console.log(this.project);
    }

    isSearchList(e) {
        this.HttpService.get(`/zdk/list?sjId=${e.sjId}&start=1&limit=10`)
            .then(res => {
                this.SearchList = res['returnObject'];
                this.defaultList = this.SearchList;
            });
        this.HttpService.get(`/zdk/query?id=${e.id}`)
            .then(res => {
                this.zidian = res['returnObject'];
            });

    }

    getChildEvent1(e) {
        this.zidian.lx = e;
    }

    getChildEvent2(e) {
        this.zidian.zdlb = e;
    }

    //前台查询
    searchList(e, key) {
        if (e.keyCode == 13 || e == 'click') {

            this.SearchList = this.SearchService.searchByRegExp(key, this.defaultList, 'mc');


        }

    }
}
