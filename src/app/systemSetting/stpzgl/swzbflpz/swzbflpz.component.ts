import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {SwzbflpzxqComponent} from "./swzbflpzxq.component";
import {HttpService} from "../../../service/http-service";
import {DataProcessingService} from "../../../service/dataProcessing.service";
import {flyIn} from "../../../animations/fly-in";
import {ShareService} from "../../service/share.service";
import {Subscription} from 'rxjs/Subscription';
import {DelWaringComponent} from "../../../common/del-waring/del-waring.component";

@Component({
    selector: 'app-swzbflpz',
    templateUrl: './swzbflpz.component.html',
    styleUrls: ['../swzbtxpz/swzbtxpz.component.css'],
    animations: [flyIn]
})
export class SwzbflpzComponent implements OnInit {
    showBlock: boolean = false;
    private gcList = [{}];
    private jdList = [{}];
    private ZbflpzGetParme = new ZbflpzModel;
    private TreeTable = new Array;
    private msgs = new Array;
    private params: string;
    private project = new Array;
    private treelist: any;
    private listUrl: string;
    subscription = new Subscription;
    @ViewChild('alterRoom', {read: ViewContainerRef}) AlertBox: ViewContainerRef;

    constructor(private shareService: ShareService, private HttpService: HttpService, private DataProcessingService: DataProcessingService, private swzbflpzxq: ComponentFactoryResolver) {
        this.subscription = this.shareService.getMessage()
            .subscribe(message => {
                console.log(message);
                if (message['message']['display'] === "false") {
                    this.AlertBox.clear();
                }
                this.msgs = [];
                this.msgs.push(message['message']);
                if (message['message']['severity'] === 'success') {
                    this.HttpService.get('zbflpz/listZbflpz?' + this.params)
                        .then(res => {
                            this.TreeTable = res['returnObject'];

                        })
                        .catch(res => {
                            console.log(res);
                        })
                }
            });
    }

    ngOnInit() {
        this.HttpService.get('gczc/allList')
            .then(res => {
                console.log(res);
                const resList = JSON.stringify(res['returnObject']);
                let list = resList.replace(/name/g, 'label');
                list = list.replace(/code/g, "value");
                this.gcList = JSON.parse(list);
                console.log(this.gcList);
            });
        this.HttpService.get('xtswzbfl/listGzjd')
            .then(res => {
                console.log(res);
                const resList = JSON.stringify(res['returnObject']);
                let list = resList.replace(/mc/g, 'label');
                list = list.replace(/id/g, "value");
                this.jdList = JSON.parse(list);
                // this.jdList = this.DataProcessingService.replaceSelectList(res['returnObject'])
                // console.log(this.jdList);
            });

        this.HttpService.get(`locality/listTree`)
            .then(res => {
                let childObj = res['returnObject'];
                this.treelist = this.DataProcessingService.replaceChildlList(childObj, 'childrenLocality', 'children', 'localityName', 'label');

            });
    }


    onRowSelect(event) {
        this.project = event.data;
        console.log(this.project);

    }


    showModule(i) {
        if (this.project['id'] == null) {
            if(i==='view'){
                this.msgs = [];
                this.msgs.push({severity: 'warn', summary: '点击提醒', detail: '请选择查看项'});
            }else{
                this.msgs = [];
                this.msgs.push({severity: 'warn', summary: '点击提醒', detail: '请选择修改项'});
            }

        } else {
            let alert = this.swzbflpzxq.resolveComponentFactory(SwzbflpzxqComponent);
            let alertBox2 = this.AlertBox.createComponent(alert);
            alertBox2.instance.info = this.project;
            switch (i) {
                case 'view':
                    alertBox2.instance.type = 'view';
                    break;
                case 'rew':
                    alertBox2.instance.type = 'rew';
                    break;
            }
        }


    }

    addModel(i) {
        if (this.ZbflpzGetParme.jdId == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '参数缺少', detail: '请选择阶段'});
        } else if (this.ZbflpzGetParme.ssxzqhdm == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '参数缺少', detail: '请选择行政区划'});
        } else if (this.ZbflpzGetParme.ssgcdm == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '参数缺少', detail: '请选择工程'});
        } else {
            console.log(this.ZbflpzGetParme);
            let alert = this.swzbflpzxq.resolveComponentFactory(SwzbflpzxqComponent);
            let alertBox2 = this.AlertBox.createComponent(alert);
            alertBox2.instance.info = this.ZbflpzGetParme;
            alertBox2.instance.type = 'add';
            console.log("新增");
        }
    }

    delSelect() {
        console.log("删除所选项");
        this.AlertBox.clear();
        if (this.project['id'] == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请选择删除项'});
        } else {
            const delmodel = this.swzbflpzxq.resolveComponentFactory(DelWaringComponent);
            const delModelbxo = this.AlertBox.createComponent(delmodel);
            delModelbxo.instance.message = "删除当前选择项";
            delModelbxo.instance.url = 'zbflpz/delete?id=' + this.project['id'];
            delModelbxo.instance.confirm();
        }
    }

    getList() {
        console.log(this.ZbflpzGetParme);
        this.params = this.DataProcessingService.transString(this.ZbflpzGetParme);

        if (this.ZbflpzGetParme.ssxzqhdm == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '参数缺少', detail: '请选择行政区划代码'});
        } else if (this.ZbflpzGetParme.ssgcdm == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '参数缺少', detail: '工程代码缺少'});
        } else {
            this.listUrl = 'zbflpz/listZbflpz?' + this.params;
            this.HttpService.get('zbflpz/listZbflpz?' + this.params)
                .then(res => {
                    this.TreeTable = res['returnObject'];

                })
                .catch(res => {
                    console.log(res);
                })
        }
    }

    searchList(e, key) {
        if (e.keyCode == 13 || e == 'click') {
            console.log("搜索");
            this.HttpService.get('zbflpz/listZbflpz?' + this.params + "&searchKey=" + key)
                .then(res => {
                    this.TreeTable = res['returnObject'];
                });
        }
    }


    getAreaCode(e) {
        console.log(e);
        this.ZbflpzGetParme.ssxzqhdm = e.localityCode;
        this.getList();
    }

    getProjectId(e) {
        console.log(e);
        this.ZbflpzGetParme.ssgcdm = e;
        this.getList();
    }

    getGzjdId(e) {
        console.log(e);
        this.ZbflpzGetParme.jdId = e;
        this.getList();
    }

    showGclist() {
        if (this.showBlock == true) {
            this.showBlock = false;
        } else {
            this.showBlock = true;
        }
    }

}

export class ZbflpzModel {
    ssgcdm: string;
    ssxzqhdm: string;
    jdId: string;
}

