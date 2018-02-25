import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../../service/http-service";
import {ZdkglModel} from "./zdkgl.model";

@Component({
    selector: 'app-zdkglxq',
    templateUrl: './zdkglxq.component.html',
    styleUrls: ['./zdkgl.component.css']
})
export class ZdkglxqComponent implements OnInit {
    private display: boolean = true;
    private msgs: any;
    private selectList2 = [{}];
    private selectList1 = [{}];
    public info;
    public childInfo;
    private zidian: ZdkglModel = new ZdkglModel();


    @ViewChild('ngModel') model;

    constructor(private HttpService: HttpService) {
    }

    ngOnInit() {
        // 修改和新增
        if (this.info != null) {
            this.zidian = this.info;
        } else {
            this.zidian.sjlb = null;
            this.zidian.sjId = null;
        }
        this.selectList1 = [
            {label: '虚节点', name: '虚节点', value: '0'},
        ];
        this.HttpService.get('zdk/zdflList')
            .then(res => {
                console.log(res['returnObject']);
                const resList = JSON.stringify(res['returnObject']);
                let list = resList.replace(/name/g, 'label');
                list = list.replace(/code/g, "value");
                this.selectList2 = JSON.parse(list);
            });


    }

    close() {
        this.display = false;
    }

    save(item, i) {
        this.msgs = [];
        console.log("id" in this.zidian);
        console.log(this.zidian);
        this.zidian.sjlb = this.zidian.dm;
        if ("id" in this.zidian) {
            // 修改
            this.HttpService.post('zdk/update', JSON.stringify(this.zidian))
                .then(res => {
                    console.log(res);
                    if (res['success'] == true) {
                        this.msgs.push({severity: 'success', summary: '填入提醒', detail: '修改成功'});
                        if (i == 'add') {
                            this.zidian = new ZdkglModel;
                        } else {
                            this.display = false;
                        }
                    } else {
                        this.msgs.push({severity: 'error', summary: '填入提醒', detail: '删除失败'});
                    }
                });
        } else {
            //保存新一项
            if (item.mc == null || item.qc == null) {
                this.msgs.push({severity: 'error', summary: '填入提醒', detail: '有必填项未填'});
            } else {
                console.log(item);
                this.HttpService.post('zdk/save', JSON.stringify(this.zidian))
                    .then(res => {
                        console.log(res);
                        if (res['success'] == true) {
                            this.msgs.push({severity: 'success', summary: '填入提醒', detail: '新增成功'});
                            if (i == 'add') {
                                this.zidian = new ZdkglModel;
                            } else {
                                this.display = false;
                            }
                        } else {
                            this.msgs.push({severity: 'error', summary: '填入提醒', detail: res['errorMessage']});
                        }
                    });
            }
        }
    }

    bigest() {
        console.log(this.model);
        console.log(this.model.containerViewChild.nativeElement);
        console.log(this.model.containerViewChild.nativeElement.children);
        console.log(this.model.containerViewChild.nativeElement.children[1]);
       this.model.containerViewChild.nativeElement.children[1].style = "height:calc(100vh - 100px) ;overflow: auto";        this.model.containerViewChild.nativeElement.style = "width:100%;top:0px;left:0px;button:0px;z-index:10000;right:0;height:100%";

    }

    getChildEvent1(e) {
        this.zidian.lx = e;
    }

    getChildEvent2(e) {
        this.zidian.zdlb = e;
    }
}
