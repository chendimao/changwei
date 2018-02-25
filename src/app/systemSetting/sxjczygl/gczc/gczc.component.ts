import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {HttpService} from "../../../service/http-service";
import {ProjectType} from '../model/project-model';
import {GczcxqComponent} from "./gczcxq.component";
import {Message} from "../../../../assets/_primeng@4.2.1@primeng/components/common/message";
import {DelWaringComponent} from "../../../common/del-waring/del-waring.component";
import {Subscription} from 'rxjs/Subscription';
import {ShareService} from "../../service/share.service";
import {flyIn} from "../../../animations/fly-in";

@Component({
    selector: 'app-gczc',
    templateUrl: './gczc.component.html',
    styleUrls: ['./gczc.component.css'],
    animations: [flyIn]
})
export class GczcComponent implements OnInit {
    cars: any;
    msgs: Message[];
    private totalPage: number;
    private count: number;
    private listUrl: string = 'gczc/list';
    display: string;
    subscription = new Subscription;

    public project: ProjectType = new ProjectType();
    @ViewChild('alertBox', {read: ViewContainerRef}) alertBox: ViewContainerRef;


    constructor(public HttpService: HttpService, private alertCom: ComponentFactoryResolver, private shareService: ShareService) {
        this.subscription = this.shareService.getMessage()
            .subscribe(message => {
                console.log(message);
                this.display = message['message']['display'];
                if (this.display == "false") {
                    this.alertBox.clear();
                }
                this.msgs = [];
                this.msgs.push(message['message']);
                if (message['message']['severity'] == 'success') {
                    this.HttpService.get('gczc/list?start=1&limit=10')
                        .then(res => {
                            this.totalPage = res['totalPage'];
                            this.count = res['count'];
                            this.cars = res['returnObject'];
                        });
                }
            });
    }

    ngOnInit() {
        this.HttpService.get('gczc/list?start=1&limit=10')
            .then(res => {
                this.totalPage = res['totalPage'];
                this.count = res['count'];
                this.cars = res['returnObject'];
            });
    }

    queryList(res) {
        this.totalPage = res['totalPage'];
        this.count = res['count'];
        this.cars = res['returnObject'];
    }


    onRowSelect(event) {
        this.project = event.data;
        console.log(this.project);

    }

    delSelect() {
        console.log("删除所选项");
        this.alertBox.clear();
        if (this.project['id'] == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请选择删除项'});
        } else {
            const delmodel = this.alertCom.resolveComponentFactory(DelWaringComponent);
            const delModelbxo = this.alertBox.createComponent(delmodel);
            delModelbxo.instance.message = "删除当前选择项";
            delModelbxo.instance.url = 'gczc/delete?id=' + this.project['id'];
            delModelbxo.instance.confirm();
        }
    }

    searchList(e, key) {
        if (e.keyCode == 13 || e == 'click') {
            console.log("搜索");
            this.HttpService.get(`/gczc/list?searchKey=${key}&start=1&limit=10`)
                .then(res => {
                    this.totalPage = res['totalPage'];
                    this.count = res['count'];
                    this.cars = res['returnObject'];
                });
            }
    }

    showModule(i) {
        switch (i) {
            case 'add':
                const com = this.alertCom.resolveComponentFactory(GczcxqComponent);
                this.alertBox.createComponent(com);
                break;
            case 'rew':
                if (this.project['id'] == null) {
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请选择需要修改项'});
                } else {
                    const alert2 = this.alertCom.resolveComponentFactory(GczcxqComponent);
                    const alertBox2 = this.alertBox.createComponent(alert2);
                    alertBox2.instance.info = this.project;
                }
                break;
        }
    }




}