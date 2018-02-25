import {Component, OnInit, ViewChild} from '@angular/core';
import {XzqhglModel} from "../model/Xzqhgl-model";
import {HttpService} from "../../../service/http-service";
import {ShareService} from "../../service/share.service";

@Component({
    selector: 'app-xzqhglxq',
    templateUrl: './xzqhglxq.component.html',
    styleUrls: ['./xzqhgl.component.css'],
    providers: [HttpService]
})
export class XzqhglxqComponent implements OnInit {
    private display: boolean = true;
    private display1: boolean = true;
    private msgs = [];
    private selectList = new Array;
    private Xzqh = new XzqhglModel;
    public info;
    public type;
    @ViewChild('ngModel') model;

    constructor(private HttpService: HttpService, private shareService: ShareService) {

    }

    ngOnInit() {
        if (this.type == 'add') {
            this.HttpService.get(`locality/toAdd?localityCode=${this.info.localityCode}`)
                .then(res => {
                    this.Xzqh = res['returnObject'];
                });
            this.selectList = [{label: this.info.localityLevel + 1, value: this.info.localityLevel + 1}];
        } else {
            this.Xzqh = this.info;
            this.selectList = [{label: this.info.localityLevel, value: this.info.localityLevel}];
        }
    }

    zdButton(i) {
        switch (i) {
            case 'qc':
                console.log(this.Xzqh.localityDesc);
                console.log(this.Xzqh.localityName);
                if (this.Xzqh.localityName == null) {
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '错误', detail: '请填写好名称'});
                } else {
                    const lsString = this.info.localityDesc.toString() + "" + this.Xzqh.localityName.toString();
                    this.Xzqh.localityDesc = lsString;
                }

                break;
            case 'qhdm':
                this.HttpService.get('locality/generate?localityCode=' + this.info.localityCode)
                    .then(res => {
                        console.log(res);
                        this.Xzqh.localityCode = res['returnObject']['localityCode'];
                    })

                break;
            case 'xjxzqh':
                this.HttpService.get('locality/generate?localityCode=' + this.info.localityCode)
                    .then(res => {
                        console.log(res);
                        this.Xzqh.subLocalityExpression = res['returnObject']['subLocalityExpression'];
                    });

                break;

        }
    }

    save(item, i) {
        this.msgs = [];
        if (this.Xzqh.localityDesc == this.info.localityDesc) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '填写错误', detail: '全称还没有生成'});
        } else {
            if (this.type == 'add') {
                this.HttpService.post('locality/save', JSON.stringify(this.Xzqh))
                    .then(res => {
                        if (res['success'] == true) {
                            this.msgs.push({severity: 'success', summary: '填入提醒', detail: '新增成功'});
                            if (i == 'add') {
                                this.Xzqh = new XzqhglModel;
                            } else {
                                this.shareService.sendMessage(true);
                                this.display = false;
                            }
                        } else {
                            console.log(res);
                            this.msgs = [];
                            this.msgs.push({severity: 'error', summary: '填入提醒', detail: `${res['errorMessage']}`});
                        }
                    });
            } else {
                this.HttpService.post('locality/update', JSON.stringify(this.Xzqh))
                    .then(res => {
                        if (res['success'] == true) {
                            this.msgs.push({severity: 'success', summary: '填入提醒', detail: '修改成功'});
                            if (i == 'add') {
                                this.Xzqh = new XzqhglModel;
                            } else {
                                this.shareService.sendMessage(true);
                                this.display = false;
                            }
                            this.display = false;
                        } else {
                            console.log(res);
                            this.msgs = [];
                            this.msgs.push({severity: 'error', summary: '填入提醒', detail: `${res['errorMessage']}`});
                        }
                    });
            }
        }
    }


    close() {
        this.display = false;
    }


    bigest() {
       this.model.containerViewChild.nativeElement.children[1].style = "height:calc(100vh - 100px) ;overflow: auto";        this.model.containerViewChild.nativeElement.style = "width:100%;top:0px;left:0px;button:0px;z-index:10000;right:0;height:100%";
    }

    getSelect(value) {
        console.log(value);
    }
}
