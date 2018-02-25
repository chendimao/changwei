import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../service/http-service";
import {ZdkglModel} from "./zdkgl.model";
import {SaveService} from "../../service/save.service";
import {Subscription} from 'rxjs/Subscription';
import {ShareService} from "../../service/share.service";

@Component({
    selector: 'app-zdkglsjxpzxq',
    templateUrl: './zdkglsjxpzxq.component.html',
    styleUrls: ['./zdkgl.component.css'],
    providers: [SaveService, ShareService]
})
export class ZdkglsjxpzxqComponent implements OnInit {
    private display: boolean = true;
    private msgs: any;
    private selectList2 = new Object();
    private selectList1 = new Object();
    public parentInfo;
    public childInfo;
    private zidian: ZdkglModel = new ZdkglModel();
    private subscription: Subscription;


    constructor(private HttpService: HttpService, private saveService: SaveService, private ShareService: ShareService) {
        this.subscription = this.ShareService.getMessage()
            .subscribe(message => {
                if (message['message']['clear']) {
                    console.log(message.clear);
                    this.zidian = new ZdkglModel;
                }
            });
    }

    ngOnInit() {
        // 新增
        if (this.parentInfo != null) {
            this.zidian.sjId = this.parentInfo.id;
            this.zidian.sjlb = this.parentInfo.zdlb;
        }
        if (this.childInfo != null) {
            this.zidian = this.childInfo;
        }

        this.selectList1 = [
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

    save(i) {
        const url = {
            add: 'zdk/save',
            update: 'zdk/update'
        };
        if (this.tjWaringShow(this.zidian)) {
            this.saveService.save(this.zidian, i, url, ZdkglModel);
        }

    }

    // save(item, i) {
    //     this.msgs = [];
    //     console.log("id" in this.zidian);
    //     if ("id" in this.zidian) {
    //         // 修改
    //         this.HttpService.post('zdk/update', JSON.stringify(this.zidian))
    //             .then(res => {
    //                 console.log(res);
    //                 if (res['success'] == true) {
    //                     this.msgs.push({severity: 'success', summary: '填入提醒', detail: '修改成功'});
    //                     if (i == 'add') {
    //                         this.zidian = new ZdkglModel;
    //                     } else {
    //                         this.display = false;
    //                     }
    //                 } else {
    //                     this.msgs.push({severity: 'error', summary: '填入提醒', detail: '删除失败'});
    //                 }
    //             });
    //     } else {
    //         //保存新一项
    //         if (this.zidian.mc == null || this.zidian.qc == null || this.zidian.zdlb == null || this.zidian.pxh == null) {
    //             this.msgs.push({severity: 'error', summary: '填入提醒', detail: '有必填项未填'});
    //         } else {
    //             console.log(this.zidian);
    //             this.HttpService.post('zdk/save', JSON.stringify(this.zidian))
    //                 .then(res => {
    //                     console.log(res);
    //                     if (res['success'] == true) {
    //                         this.msgs.push({severity: 'success', summary: '填入提醒', detail: '新增成功'});
    //                         if (i == 'add') {
    //                             this.zidian = new ZdkglModel;
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

    zdBtn(i): void {
        switch (i) {
            case 'qc':
                console.log(this.zidian.mc);
                this.zidian.qc = this.parentInfo.qc + "-" + this.zidian.mc;
                console.log("自动生成全称");
                break;
            case 'dm':
                console.log(this.zidian.mc);
                let zidianxh = parseFloat(this.zidian.xh);
                if (zidianxh < 10) {
                    console.log(zidianxh);
                    // zidianxh = "0" + zidianxh;
                }
                this.zidian.dm = this.parentInfo.dm + "-" + zidianxh;

                console.log("自动生成dm");
                break;
            case 'pxh':
                console.log("自动生成pxh");
                this.zidian.pxh = this.pxh(this.zidian.xh);


                console.log(this.zidian.pxh);
                break;
        }
    }

    //获取下拉列表值
    getChildEvent1(e) {
        this.zidian.lx = e;
    }

    getChildEvent2(e) {
        this.zidian.zdlb = e;
    }

    public pxh(a) {
        a = a.split('.');
        let b = "";
        for (var i = 0; i < a.length; i++) {
            if (a[i] < 10) {
                a[i] = "0" + a[i];
            }
        }
        for (var i = 0; i < a.length; i++) {
            b += a[i];
        }
        return b;
    }

    //判断不能为空
    tjWaringShow(info: object): boolean {
        var res = true;
        for (let i in ZdkglImport) {
            if (info[i] == null) {
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: '填入提醒', detail: ZdkglImport[i] + ' 必填'});
                res = false;
            }
        }
        return res;
    }
}

const ZdkglImport = {
    mc: "字典项名称",
    xh: "序号",
    qc: "全称",
    dm: "字典项代码",
    zdlb: "字典类别",
    pxh: "排序号",
}



