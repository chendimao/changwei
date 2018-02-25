import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../service/http-service";
import {DataProcessingService} from "../../../service/dataProcessing.service";
import {SwzbflpzTreeTablePostService} from "../../service/swzbflpzTreeTablePost.service";

@Component({
    selector: 'app-fgczdxpzxq',
    templateUrl: './fgczdxpzxq.component.html',
    styleUrls: ['./fgczdxpz.component.css'],
    providers: [HttpService, SwzbflpzTreeTablePostService]
})
export class FgczdxpzxqComponent implements OnInit {
    public info: any;
    public type: string;
    public projectId: any;
    private display: boolean = true;
    private isShow2: boolean = true;
    private saveHeader = new Object;
    private TreeTable: any;
    private initTreeTable: any;
    private filesTree: any;
    private selectList2: any;
    private localTreelist: any;
    private dataTypeIdName: string;
    private fgczdx: bdzdxModel = new bdzdxModel;
    private zdflBtn: boolean = true;
    private msgs = [];

    selectedFile: any;
    private showTable: number = 0;

    constructor(private TreeTablePostService: SwzbflpzTreeTablePostService, private HttpService: HttpService, private DataProcessingService: DataProcessingService) {
    }


    ngOnInit() {
        console.log(this.info);
        console.log(this.type);
        console.log(this.projectId);

        switch (this.type) {
            case 'view':
                this.dataTypeIdName = this.info.dataTypeName;
                this.selectList2 = [{label: this.info.dicType, name: 'this.info.dicType', value: ''}];
                this.searchTreelist(`xtfqhzdx/query?dm=${this.projectId.code}&dataTypeId=${this.info.dataTypeId}`);
                this.HttpService.get(`locality/listTree`)
                    .then(res => {
                        this.localTreelist = this.DataProcessingService.replaceChildlList(res['returnObject'], 'localityName', 'label', 'childrenLocality', 'children');

                    });
                break;
            case 'add':
                this.zdflBtn = false;
                this.HttpService.get('zdk/zdflList')
                    .then(res => {
                        console.log(res['returnObject']);
                        this.selectList2 = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'name', 'label', 'code', 'value');
                        console.log(this.selectList2);
                    });
                this.HttpService.get(`locality/listTree`)
                    .then(res => {
                        this.localTreelist = this.DataProcessingService.replaceChildlList(res['returnObject'], 'localityName', 'label', 'childrenLocality', 'children');

                    });
                break;
            case 'rew':
                this.saveHeader['sjlb'] = this.info.dataTypeId;

                this.dataTypeIdName = this.info.dataTypeName;
                this.selectList2 = [{label: this.info.dicType, name: 'this.info.dicType', value: ''}];
                this.searchTreelist(`xtfqhzdx/query?dm=${this.projectId.code}&dataTypeId=${this.info.dataTypeId}`);
                this.HttpService.get(`locality/listTree`)
                    .then(res => {
                        this.localTreelist = this.DataProcessingService.replaceChildlList(res['returnObject'], 'localityName', 'label', 'childrenLocality', 'children');

                    });
                break;
        }
    }


    searchTreelist(url) {
        this.HttpService.get(url)
            .then(res => {
                console.log(res);
                var list = res['returnObject']['list'];
                const resList = this.DataProcessingService.replaceChildlValue(list, 'list', 'children', '', '');
                this.TreeTable = this.DataProcessingService.replaceisCheck(this.DataProcessingService.returnTreeTable(resList));
                const initreslist = this.DataProcessingService.replaceChildlValue(list, 'list', 'children', '', '');
                this.initTreeTable = this.DataProcessingService.replaceisCheck(this.DataProcessingService.returnTreeTable(initreslist));
            });
    }


    showList(i) {
        if (this.type === 'rew' || this.type === 'view') {
            this.msgs = [];
            this.msgs.push({severity: 'warn', summary: '修改和查看模式下', detail: '不支持数据类别和字典分类修改'});
        } else {
            if (this.showTable == 1) {
                this.showTable = 0;
            } else {
                this.showTable = 1;
            }
        }


    }

    // 保存
    saveAll() {
        console.log("保存初始数据");
        console.log(this.initTreeTable);
        console.log("保存最终数据");
        console.log(this.TreeTable);
        console.log(this.info);
        if (this.saveHeader['sjlb'] && this.saveHeader['ssxzqhdm']) {

        } else {
            this.msgs = [];
            this.msgs.push({severity: 'warn', summary: '保存失败', detail: '请选择所属行政区划代码或者所属数据类别代码'});
        }
        this.saveHeader['ssgcdm'] = this.projectId.code;
        console.log(this.saveHeader);
        // console.log(this.TreeTablePostService.savePost(this.initTreeTable, this.TreeTable));
        var resPost = this.TreeTablePostService.savePost(this.initTreeTable, this.TreeTable, this.saveHeader);
        this.HttpService.post('xtfqhzdx/save', resPost)
            .then(res => {
                if (res['success'] == true) {
                    this.msgs = [];
                    this.msgs.push({severity: 'success', summary: '保存提醒', detail: '保存成功'});
                } else {
                    this.msgs = [];
                    if (res['errorMessage']) {
                        this.msgs.push({severity: 'error', summary: '保存失败', detail: res['errorMessage']});
                    } else {
                        this.msgs.push({severity: 'error', summary: '保存失败', detail: "请联系管理员"});
                    }


                }

            })

    }

    checkbox(e, res) {
        console.log(e);
        console.log(res);
        if (res) {
            e.data.isCheck = 1;
            console.log(res);
            if (e.parent) {
                e.parent.data.isCheck = 1;
            } else {
                for (var i = 0; i < e.children.length; i++) {
                    e.children[i].data.isCheck = 1;
                }
            }
        } else {
            e.data.isCheck = 0;
            if (typeof(e.parent) === 'undefined') {
                for (var i = 0; i < e.children.length; i++) {
                    e.children[i].data.isCheck = 0;
                }
            }
        }

    }

    // 全选
    selectAll(i) {
        console.log(this.TreeTable);
        console.log(this.initTreeTable);
        if (this.isShow2) {
            this.isShow2 = false;
        } else {
            this.isShow2 = true;
        }
        switch (i) {
            case 1:
                this.TreeTable = this.DataProcessingService.checkAll(this.TreeTable);
                console.log("全选");
                break;
            case 2:
                this.TreeTable = JSON.parse(JSON.stringify(this.initTreeTable));
                console.log("取消全选");
                break;
        }
    }


    nodeSelect(e) {
        console.log(e);
        console.log(e['data']);
    }

    getSelectValue(e) {
        this.showTable = 0;
        console.log(e);
        this.dataTypeIdName = e.mc;
        this.fgczdx.dataTypeId = e.id;
        this.saveHeader['sjlb'] = e.id;
        console.log(this.saveHeader['sjlb']);
        this.searchTreelist(`xtfqhzdx/query?dm=${this.projectId}&dataTypeId=${this.fgczdx.dataTypeId}`);
    }

    getAreaCode(e) {
        this.saveHeader['ssxzqhdm'] = e.localityCode;
        console.log(this.saveHeader['ssxzqhdm']);
        console.log(e);
        // this.searchTreelist(`xtfqhzdx/query?dm=${this.projectId}&dataTypeId=${this.fgczdx.dataTypeId}&xzqhdm=${e.localityCode}`);

    }


    getChildEvent2(e) {

        console.log(e);
    }

    close() {
        this.display = false;
    }

}

export class bdzdxModel {
    "dataTypeName": string;


    "dataTypeId": string;


    "dicType": string;
}
