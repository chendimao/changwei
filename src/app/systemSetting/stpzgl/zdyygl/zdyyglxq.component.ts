import {Component, OnInit} from '@angular/core';
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
    subscription = new Subscription;

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

    // save(item, i) {
    //     this.msgs = [];
    //     console.log(this.zidian);
    //     if ("id" in this.zidian) {
    //         // 修改
    //         this.HttpService.post('/zdyy/update', JSON.stringify(this.zidian))
    //             .then(res => {
    //                 console.log(res);
    //                 if (res['success'] == true) {
    //                     this.msgs.push({severity: 'success', summary: '填入提醒', detail: '修改成功'});
    //                     if (i == 'add') {
    //                         this.zidian = new ZdyyglModel;
    //                     } else {
    //                         this.display = false;
    //                     }
    //                 } else {
    //                     this.msgs.push({severity: 'error', summary: '填入提醒', detail: '删除失败'});
    //                 }
    //             });
    //     } else {
    //         //保存新一项
    //         if (item.bm == null || item.zdm == null) {
    //             this.msgs.push({severity: 'error', summary: '填入提醒', detail: '有必填项未填'});
    //         } else {
    //             console.log(item);
    //             this.HttpService.post('zdyy/save', JSON.stringify(this.zidian))
    //                 .then(res => {
    //                     console.log(res);
    //                     if (res['success'] == true) {
    //                         this.msgs.push({severity: 'success', summary: '填入提醒', detail: '新增成功'});
    //                         if (i == 'add') {
    //                             this.zidian = new ZdyyglModel;
    //                         } else {
    //                             this.display = false;
    //                         }
    //                     } else {
    //                         this.msgs.push({severity: 'error', summary: '填入提醒', detail: res['errorMessage']});
    //                     }
    //                 });
    //         }
    //     }
    // }

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
        this.zidian.sslbId = e;
        this.thirdTable = false;
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


}

const ZdyyImport = {
    bm: "表名",
    zdm: "字段名",
    sslbId: "绑定的数据类别",
}


