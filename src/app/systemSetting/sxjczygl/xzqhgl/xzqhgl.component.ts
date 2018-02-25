import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {XzqhglxqComponent} from "./xzqhglxq.component";
import {HttpService} from "../../../service/http-service";
import {Subscription} from 'rxjs/Subscription';
import {ShareService} from "../../service/share.service";
import {DelWaringComponent} from "../../../common/del-waring/del-waring.component";
import {DataProcessingService} from "../../../service/dataProcessing.service";
import {flyIn} from "../../../animations/fly-in";
import {XzqhglModel} from "../model/Xzqhgl-model";

@Component({
    selector: 'app-xzqhgl',
    templateUrl: './xzqhgl.component.html',
    styleUrls: ['./xzqhgl.component.css'],
    providers: [HttpService, ShareService],
    animations: [flyIn]
})
export class XzqhglComponent implements OnInit {
    public isShow: number = 1;
    private totalPage: number;
    private count: number;
    private listUrl: string = 'locality/list';
    private msgs = [];
    private selectProject: any;
    private key: string;
    private subscription = new Subscription;
    private treelist: any;
    private tableList: any;

    constructor(private AlertModel: ComponentFactoryResolver, private HttpService: HttpService, private shareService: ShareService, private DataProcessingService: DataProcessingService) {
        this.subscription = this.shareService.getMessage()
            .subscribe(message => {
                if (message['message'] == true) {
                    this.HttpService.get(`locality/list?subLocalityExpression=${this.isShow}&start=1&limit=10`)
                        .then(res => {
                                this.totalPage = res['totalPage'];
                                this.count = res['count'];
                                this.tableList = res['returnObject'];
                            }
                        );
                }
            });
    }

    @ViewChild('xzqhglxq', {read: ViewContainerRef}) XqModel: ViewContainerRef;

    ngOnInit() {
        this.HttpService.get(`locality/listTree`)
            .then(res => {
                this.treelist = this.DataProcessingService.replaceChildlList(res['returnObject'], 'localityName', 'label', 'childrenLocality', 'children');

            });
    }

    // 新增和修改功能
    showModel(i) {
        console.log(this.tableList[0]);
        let alert = this.AlertModel.resolveComponentFactory(XzqhglxqComponent);
        switch (i) {
            case 'add':
                if (this.tableList[0]['localityLevel'] > 2 && this.tableList[0]['localityLevel'] < 6) {
                    let addAlert = this.XqModel.createComponent(alert);
                    addAlert.instance.info = this.tableList[0];
                    addAlert.instance.type = 'add';
                } else {
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '错误', detail: '请选择乡，镇进行新增'});
                }
                break;
            case 'rew':

                if (this.selectProject == null) {
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '错误', detail: '请选择需要修改区域'});
                } else {
                    let rewAlert = this.XqModel.createComponent(alert);
                    rewAlert.instance.info = this.selectProject['data'];
                }
                break;
        }
    }

    // 删除功能
    delSelect() {
        console.log(this.selectProject);
        if (this.selectProject['data']['id'] == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请选择删除项'});
        } else {
            const delmodel = this.AlertModel.resolveComponentFactory(DelWaringComponent);
            const delModelbxo = this.XqModel.createComponent(delmodel);
            delModelbxo.instance.message = "删除当前选择项(包括底下所有行政区划)？";
            delModelbxo.instance.url = `locality/delete?localityCode=${this.selectProject['data']['localityCode']}`;
            delModelbxo.instance.confirm();
        }
    }


    onRowSelect(e) {
        this.selectProject = e;
    }

    //搜索功能
    searchList(e, key) {
        if (e.keyCode == 13 || e == 'click') {
            console.log("搜索");
            this.HttpService.get(`locality/list?searchKey=${key}&start=1&limit=10`)
                .then(res => {
                    this.totalPage = res['totalPage'];
                    this.count = res['count'];
                    this.tableList = res['returnObject'];
                });

        }

    }

    //翻页栏的使用
    queryList(res) {
        this.totalPage = res['totalPage'];
        this.count = res['count'];
        this.tableList = res['returnObject'];
    }

    //右侧区划选择
    isSearchList(e): void {
        this.isShow = e.subLocalityExpression;
        console.log(e);
        this.HttpService.get(`locality/list?subLocalityExpression=${this.isShow}&start=1&limit=10`)
            .then(res => {
                console.log(res['returnObject']);
                this.totalPage = res['totalPage'];
                this.count = res['count'];
                this.tableList = res['returnObject'];

            });
    }

}
