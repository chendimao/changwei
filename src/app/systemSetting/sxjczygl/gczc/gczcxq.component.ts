import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../service/http-service";
import {GczcModel} from "./gczc.model";
import {SaveService} from "../../service/save.service";
import {Subscription} from 'rxjs/Subscription';
import {ShareService} from "../../service/share.service";


@Component({
    selector: 'app-gczcxq',
    templateUrl: './gczcxq.component.html',
    styleUrls: ['./gczc.component.css'],

})
export class GczcxqComponent implements OnInit {
    private msgs = [];
    private display: boolean = true;
    private selectList = new Object();
    public info;
    private project: GczcModel = new GczcModel();
    subscription = new Subscription;

    constructor(private HttpService: HttpService, private saveService: SaveService, private shareService: ShareService) {
        this.subscription = this.shareService.getMessage()
            .subscribe(message => {
                if (message['message']['clear']) {
                    console.log(message.clear);
                    this.project = new GczcModel;
                }
            });
    }

    ngOnInit() {
        if (this.info != null) {
            this.project = this.info;
        } else {
            this.HttpService.get('/gczc/generateCode')
                .then(res => {
                    this.project['code'] = res['returnObject'];
                });
        }

        this.selectList = [
            {label: '大中型水库工程', name: '大中型水库工程', value: 'JCL'},
            {label: '小型水库工程', name: '小型水库工程', value: 'JCL'},
            {label: '防洪引调水工程', name: '防洪引调水工程', value: 'JCL'},
            {label: '其他', name: '其他', value: 'JCL'},
        ];
    }

    close() {
        this.display = false;
    }


    save(item, i) {
        const url = {
            add: 'gczc/save',
            update: 'gczc/update'
        };
        if (this.tjWaringShow(this.project)) {
            this.saveService.save(this.project, i, url, GczcModel);
        }
    }

    zdButton() {
        this.HttpService.get('/gczc/generateCode')
            .then(res => {
                this.project['code'] = res['returnObject'];
            });

    }

    getChildEvent(e) {
        console.log(e);
        this.project.projectTypeCode = e;
    }

    //判断不能为空
    tjWaringShow(info: object): boolean {
        var res = true;
        for (let i in GczcImport) {
            if (info[i] == null) {
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: '填入提醒', detail: GczcImport[i] + ' 必填'});
                res = false;
            }
        }
        return res;
    }
}

const GczcImport = {
    name: "工程名称",
    shortName: "工程简称",
    code: "工程代码",
    projectTypeCode: "工程类别",
}
