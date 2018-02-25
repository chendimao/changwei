import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../../service/http-service";
import {ZdyyglModel} from "./zdyygl.model";
import {SaveService} from "../../service/save.service";
import {ShareService} from "../../service/share.service";
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-zdyyglxq',
    templateUrl: './zdyyglxq.component.html',
    styleUrls: ['./zdyygl.component.css']
})
export class ZdyyglxqComponent implements OnInit {
    private display: boolean = true;
    public info;
    private msgs = [];
    private zidian: ZdyyglModel = new ZdyyglModel();
    private oneTable: boolean = false;
    private secTable: boolean = false;
    private thirdTable: boolean = false;
    private sslbMc:string;
    subscription = new Subscription;
    @ViewChild('ngModel') model;

    constructor(private HttpService: HttpService, private saveService: SaveService, private shareService: ShareService) {
        this.subscription = this.shareService.getMessage()
            .subscribe(message => {
                if (message['message']['clear']) {
                    console.log(message.clear);
                    this.zidian = new ZdyyglModel;
                }
            });
    }

    ngOnInit() {
        if (this.info != null) {
            this.zidian = this.info;
        }

    }

    close() {
        this.display = false;
    }

    save(item, i) {
        const url = {
            add: 'zdyy/save',
            update: 'zdyy/update'
        };
        if (this.tjWaringShow(this.zidian)) {
            this.saveService.save(this.zidian, i, url, ZdyyglModel);
        }

    }


    showTable(e) {
        switch (e) {
            case 1:
                if (this.oneTable == true) {
                    this.oneTable = false;
                } else {
                    this.oneTable = true;
                }

                break;
            case 2:
                console.log(this.zidian.bm);
                if (this.zidian.bm == null) {
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '填入提醒', detail: "请先选择数据表"});
                } else {
                    if (this.secTable == true) {
                        this.secTable = false;
                    } else {
                        this.secTable = true;
                    }
                }


                break;
            case 3:
                if (this.thirdTable == true) {
                    this.thirdTable = false;
                } else {
                    this.thirdTable = true;
                }


                break;
        }
    }


    getTableName(e) {
        this.zidian.bm = e;
        this.oneTable = false;
    }

    getTableName2(e) {
        this.zidian.zdm = e;
        this.secTable = false;
    }

    getSelectValue(e) {
        console.log(e);
        this.thirdTable=false;
        this.sslbMc = e.mc;
        this.zidian.sslbId = e.id;
    }

    tjWaringShow(info: object): boolean {
        var res = true;
        for (let i in ZdyyImport) {
            if (info[i] == null) {
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: '填入提醒', detail: ZdyyImport[i] + ' 必填'});
                res = false;
            }
        }
        return res;
    }

    bigest() {
       this.model.containerViewChild.nativeElement.children[1].style = "height:calc(100vh - 100px) ;overflow: auto";        this.model.containerViewChild.nativeElement.style = "width:100%;top:0px;left:0px;button:0px;z-index:10000;right:0;height:100%";
    }

}

const ZdyyImport = {
    bm: "表名",
    zdm: "字段名",
    sslbId: "绑定的数据类别",
}


