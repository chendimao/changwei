import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {HttpService} from "../../../service/http-service";
import {ProjectType} from '../model/project-model';
import {ZdyyglxqComponent} from "./zdyyglxq.component";
import {DelWaringComponent} from "../../../common/del-waring/del-waring.component";
import {Subscription} from 'rxjs/Subscription';
import {ShareService} from "../../service/share.service";
import {flyIn} from "../../../animations/fly-in";

@Component({
    selector: 'app-zdyygl',
    templateUrl: './zdyygl.component.html',
    styleUrls: ['../zdkgl/zdkgl.component.css'],
    animations: [flyIn]
})
export class ZdyyglComponent implements OnInit {
    cars: any;
    msgs: any;
    display: boolean = false;
    private totalPage: number;
    private count: number;
    private listUrl: string = 'zdyy/list';
    subscription = new Subscription;
    public project: ProjectType = new ProjectType();

    @ViewChild('alertRoom', {read: ViewContainerRef}) dmRoom: ViewContainerRef;

    constructor(private shareService: ShareService, public HttpService: HttpService, public AlertBox: ComponentFactoryResolver) {
        //删除
        this.subscription = this.shareService.getMessage()
            .subscribe(message => {
                console.log(message);
                if (message['message']['display'] == "false") {
                    this.dmRoom.clear();
                }
                this.msgs = [];
                this.msgs.push(message['message']);
                if (message['message']['severity'] == 'success') {
                    this.HttpService.get('zdyy/list?start=1&limit=10')
                        .then(res => {
                            this.totalPage = res['totalPage'];
                            this.count = res['count']
                            this.cars = res['returnObject'];
                        });
                }
            });
    }


    ngOnInit() {
        this.HttpService.get('zdyy/list?start=1&limit=10')
            .then(res => {
                this.totalPage = res['totalPage'];
                this.count = res['count']
                this.cars = res['returnObject'];
            });
    }


    queryList(res) {
        this.totalPage = res['totalPage'];
        this.count = res['count'];
        this.cars = res['returnObject'];
    }

    //选中当前行
    onRowSelect(event) {
        this.project = event.data;
        console.log(this.project);
    }

    delSelect() {
        console.log("删除所选项");
        this.dmRoom.clear();
        if (this.project['id'] == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请选择删除项'});
        } else {
            const delmodel = this.AlertBox.resolveComponentFactory(DelWaringComponent);
            const delModelbxo = this.dmRoom.createComponent(delmodel);
            delModelbxo.instance.message = "删除当前选择项";
            delModelbxo.instance.url = 'zdyy/delete?id=' + this.project['id'];
            delModelbxo.instance.confirm();
        }
    }

    searchList(e, key) {
        if (e.keyCode == 13 || e == 'click') {
            console.log("搜索");
            this.HttpService.get(`zdyy/list?searchKey=${key}&start=1&limit=10`)
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
                const com = this.AlertBox.resolveComponentFactory(ZdyyglxqComponent);
                this.dmRoom.createComponent(com);
                break;
            case 'rew':
                if (this.project['id'] == null) {
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请选择需要修改项'});
                } else {
                    const com2 = this.AlertBox.resolveComponentFactory(ZdyyglxqComponent);
                    const alertBox2 = this.dmRoom.createComponent(com2);
                    alertBox2.instance.info = this.project;
                }

                break;

        }
    }
}

