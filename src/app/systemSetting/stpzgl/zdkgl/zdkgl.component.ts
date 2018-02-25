import {
    Component,
    OnInit,
    ComponentFactoryResolver,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {HttpService} from "../../../service/http-service";
import {ProjectType} from '../model/project-model';
import {ZdkglxqComponent} from "./zdkglxq.component";
import {ZdkglsjxpzComponent} from "./zdkglsjxpz.component";
import {Message} from "../../../../assets/_primeng@4.2.1@primeng/components/common/message";
import {DelWaringComponent} from "../../../common/del-waring/del-waring.component";
import {Subscription} from 'rxjs/Subscription';
import {ShareService} from "../../service/share.service";
import {flyIn} from "../../../animations/fly-in";


@Component({
    selector: 'app-zdkgl',
    templateUrl: './zdkgl.component.html',
    styleUrls: ['./zdkgl.component.css'],
    animations: [flyIn]
})
export class ZdkglComponent implements OnInit {
    msgs: Message[] = [];
    cars: any;
    private totalPage: number;
    private count: number;
    private listUrl: string = 'zdk/list';
    subscription = new Subscription;
    public project: ProjectType = new ProjectType();

    @ViewChild('dmroom', {read: ViewContainerRef}) dmRoom: ViewContainerRef;

    constructor(public HttpService: HttpService, private AlertBox: ComponentFactoryResolver, private shareService: ShareService) {
        this.subscription = this.shareService.getMessage()
            .subscribe(message => {
                console.log(message);
                if (message['message']['display'] === "false") {
                    this.dmRoom.clear();
                }
                this.msgs = [];
                this.msgs.push(message['message']);
                if (message['message']['severity'] === 'success') {
                    this.HttpService.get('zdk/list?sjId=&start=1&limit=10')
                        .then(res => {
                            this.totalPage = res['totalPage'];
                            this.count = res['count'];
                            this.cars = res['returnObject'];
                        });
                }
            });
    }

    ngOnInit() {
        this.HttpService.get('zdk/list?sjId=&start=1&limit=10')
            .then(res => {
                console.log(res['returnObject']);
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

    // 选择当前行
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
            delModelbxo.instance.message = "删除当前字典库？";
            delModelbxo.instance.url = '/zdk/delete?id=' + this.project['id'];
            delModelbxo.instance.confirm();
        }
    }

    searchList(e, key) {
        if (e.keyCode == 13 || e == 'click') {
            console.log("搜索");
            this.HttpService.get(`zdk/list?searchKey=${key}&sjId=&start=1&limit=10`)
                .then(res => {
                    this.totalPage = res['totalPage'];
                    this.count = res['count'];
                    this.cars = res['returnObject'];
                });

        }

    }



    showModule(i) {
        this.dmRoom.clear();
        switch (i) {
            case 'add':
                const alert = this.AlertBox.resolveComponentFactory(ZdkglxqComponent);
                const alertBox = this.dmRoom.createComponent(alert);
                break;
            case 'rew':
                if (this.project['id'] == null) {
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请选择需要修改项'});
                } else {
                    const alert2 = this.AlertBox.resolveComponentFactory(ZdkglxqComponent);
                    const alertBox2 = this.dmRoom.createComponent(alert2);
                    alertBox2.instance.info = this.project;
                }
                break;
            case 'set':
                if (this.project['id'] == null) {
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请选择需要配置项'});
                } else {
                    const alert3 = this.AlertBox.resolveComponentFactory(ZdkglsjxpzComponent);
                    const alertBox3 = this.dmRoom.createComponent(alert3);
                    alertBox3.instance.info = this.project;
                }
                break;

        }


    }


}


