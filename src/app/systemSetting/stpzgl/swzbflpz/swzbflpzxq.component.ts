import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {DataProcessingService} from "../../../service/dataProcessing.service";
import {HttpService} from "../../../service/http-service";
import {DelWaringComponent} from "../../../common/del-waring/del-waring.component";
import {SwzbComparedService} from "../../service/swzbCompared.service";
import {SearchService} from "../../../service/search.service";
import {SwzbAddService} from "../../service/swzbAdd.service";
import {ConfirmationService} from "primeng/primeng";
import {ShareService} from "../../service/share.service";

import * as _ from 'lodash';

@Component({
    selector: 'app-swzbflpzxq',
    templateUrl: './swzbflpzxq.component.html',
    styleUrls: ['../swzbtxpz/swzbtxpz.component.css'],
    providers: [SearchService, SwzbComparedService, SwzbAddService, ConfirmationService]
})
export class SwzbflpzxqComponent implements OnInit {
    display: boolean = true;
    public info = {};
    public type: string;
    private zbdm: string;
    private isDisabled: boolean = false;
    private node: any;
    private addObj: addObj = new addObj;
    private rewObj: any;
    private displayDel: boolean = true;

    private rewAddObj: object = {
        "oper": "Add",
        "list": []
    };
    private rewDelObj: object = {
        "oper": "Delete",
        "list": []
    };
    private rewUpdateObj: object = {
        "oper": "Update",
        "list": []
    };

    private sourceTreeTable = [];
    private initSourceTreeTable: any;
    private sourceTreeTableSelect: any;
    private isSourceShow1: boolean = false;
    private isSourceShow2: boolean = true;
    private targetTreeTable = [];
    private targetSelectItemZdxId: any;
    private targetTreeTableSjid: string;
    private showZbdm: string = 'rew';

    private isSourSelectParentZdxid: string;


    selectedFiles: any;

    private jldwList: any;
    private jldw: any;
    private ssfllbList: any;
    private zbflList: any;
    private flhList = new Array;
    private msgs: any;
    private test: any;


    list1: any;
    list2: any;
    @ViewChild('alterRoom', {read: ViewContainerRef}) AlertBox: ViewContainerRef;

    @ViewChild('ngModel') model: Element;

    constructor(private ShareService: ShareService, private ConfirmationService: ConfirmationService, private SwzbAddService: SwzbAddService, private SwzbComparedService: SwzbComparedService, private SearchService: SearchService, private dmRoom: ComponentFactoryResolver, private DataProcessingService: DataProcessingService, private HttpService: HttpService) {
        console.log(this.sourceTreeTable);
        console.log(this.initSourceTreeTable);


    }

    ngOnInit() {


        console.log(this.info);
        console.log(this.type);
        this.showZbdm = this.type;
        this.flhList = [
            {label: '第一栏', value: '1', name: '第一栏'},
            {label: '第二栏', value: '2', name: '第二栏'},
            {label: '第三栏', value: '3', name: '第三栏'},
            {label: '第四栏', value: '4', name: '第四栏'},
        ];
        switch (this.type) {
            case 'add':
                this.addObj = {
                    "ssgcdm": this.info['ssgcdm'], //所属工程代码（必填）
                    "ssxzqhdm": this.info['ssxzqhdm'], //所属行政区划代码（必填）
                    "jdId": this.info['jdId'], //阶段ID（必填）
                    "zblId": this.info['zblId'], //指标类ID（必填）
                    "ssfllbdm": this.info['ssfllbdm'], //所属分栏类别ID（必填）
                    "ssflh": this.info['ssflh'], //分栏号
                    "bz": this.info['bz'], //备注
                    'zbxpzList': this.info['zbxpzList']
                };
                // 获取分栏类别
                this.HttpService.get('zbflpz/listZbfl?zdlb=ZBL')
                    .then(res => {
                        this.zbflList = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'mc', 'label', 'id', 'value');
                        this.addObj.zblId = this.zbflList[0].value;
                    });
                //获取所属分栏列表
                this.HttpService.get('zbflpz/listFllb')
                    .then(res => {
                        console.log(res['returnObject']);
                        this.ssfllbList = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'mc', 'label', 'id', 'value');
                        this.addObj.ssfllbdm = this.ssfllbList[0].value;
                        console.log(this.addObj.ssfllbdm);
                    });

                this.msgs = [];
                this.msgs.push({severity: 'warn', summary: '填入提醒', detail: '请选择指标分类'});
                break;
            case 'view':
                // 获取指标分栏类别
                this.HttpService.get('zbflpz/listZbfl?zdlb=ZBL')
                    .then(res => {
                        var zbflList = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'mc', 'label', 'id', 'value');
                        this.zbflList = this.SearchService.searchByRegExp(this.info['zblId'], zbflList, 'value');

                    });
                // 获取所属分栏列表
                this.HttpService.get('zbflpz/listFllb')
                    .then(res => {
                        console.log(res['returnObject']);
                        console.log(this.info['ssfllbdm'])
                        var ssfllbList = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'mc', 'label', 'id', 'value');
                        this.ssfllbList = this.SearchService.searchByRegExp(this.info['ssfllbdm'], ssfllbList, 'value');
                        console.log(this.zbflList);
                    });
                this.flhList = this.SearchService.searchByRegExp(this.info['ssflh'], this.flhList, 'value');


                //修改时候目标数据
                this.HttpService.get(`zbflpz/listFlzbxpz?sszbflpzId=${this.info['id']}`)
                    .then(res => {
                        const resList = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'childList', 'children', 'zdxMc', 'zdxmc');
                        this.targetTreeTable = this.DataProcessingService.replaceisCheck(this.DataProcessingService.returnTreeTable(resList));

                    });

                this.isDisabled = true;
                break;

            case 'rew':
                this.isDisabled = true;
                this.rewObj = {
                    "obj": {
                        "id": this.info['id'],
                    },
                    "list": []
                };
                // 获取指标分栏类别
                this.HttpService.get('zbflpz/listZbfl?zdlb=ZBL')
                    .then(res => {
                        const zbflList = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'mc', 'label', 'id', 'value');
                        this.zbflList = this.SearchService.searchByRegExp(this.info['zblId'], zbflList, 'value');

                    });
                // 获取所属分栏列表
                this.HttpService.get('zbflpz/listFllb')
                    .then(res => {
                        console.log(res['returnObject']);
                        console.log(this.info['ssfllbdm'])
                        var ssfllbList = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'mc', 'label', 'id', 'value');
                        this.ssfllbList = this.SearchService.searchByRegExp(this.info['ssfllbdm'], ssfllbList, 'value');
                        console.log(this.zbflList);
                    });
                this.flhList = this.SearchService.searchByRegExp(this.info['ssflh'], this.flhList, 'value');


                //修改时候目标数据
                this.HttpService.get(`zbflpz/listFlzbxpz?sszbflpzId=${this.info['id']}`)
                    .then(res => {
                        let resList = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'childList', 'children', 'zdxMc', 'zdxmc');
                        resList = this.DataProcessingService.replaceChildlValue(resList, 'jddwId', 'jldwId', 'zdxXh', 'xh');
                        this.targetTreeTable = this.DataProcessingService.replaceisCheck(this.DataProcessingService.returnTreeTable(resList));

                    });
                break;
        }
        //计量列表
        this.HttpService.get('xtswzbfl/listJldw')
            .then(res => {
                this.jldwList = res['returnObject'];

            });
        //原始数据
        this.HttpService.get(`zbflpz/listSjly?ssgcdm=${this.info['ssgcdm']}&ssxzqhdm=${this.info['ssxzqhdm']}&zblId=${this.info['zblId']}&jdId=${this.info['jdId']}`)
            .then(res => {
                const resList = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'childList', 'children', '', '');
                this.sourceTreeTable = this.DataProcessingService.replaceisCheck(this.DataProcessingService.returnTreeTable(resList));
                console.log(this.sourceTreeTable);
                const initreslist = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'childList', 'children', '', '');
                this.initSourceTreeTable = this.DataProcessingService.replaceisCheck(this.DataProcessingService.returnTreeTable(initreslist));
                console.log(this.targetTreeTable);
                if (this.targetTreeTable) {
                    this.SwzbComparedService.SwzbCompared(this.targetTreeTable, this.sourceTreeTable);
                }

            });
        this.zbdm = this.info['zbldm'];


        //初始数据


    }


    close() {
        this.display = false;
    }


    isSelectChild(i) {
        if (this.isSourceShow1) {
            this.isSourceShow1 = false;
        } else {
            this.isSourceShow1 = true;
        }

    }

    checkbox(e, res) {
        console.log(e);
        if (e.parent) {
            this.isSourSelectParentZdxid = e.parent.data.zdxId;
        }

        console.log(res);
        console.log(this.isSourceShow1);
        if (res === true) {
            if (!this.isSourceShow1) {
                console.log("勾选下级");
                this.sourceTreeTableSelect = {
                    "data": e.data,
                    "children": e.children,
                };
                console.log(e.children);
                if (e.children) {
                    let list = this.SwzbAddService.checkAll(e.children);
                    console.log(list);
                    // this.sourceTreeTableSelect = this.SwzbAddService.selectCheck(list);
                }


            } else {
                console.log("不勾选下一级");
                this.sourceTreeTableSelect = {
                    "data": e.data,
                    "children": null,
                };
            }

        } else {
            this.sourceTreeTableSelect = null;
            if (!this.isSourceShow1) {
                console.log("勾选下级");
                console.log(e.children === null);
                if (e.children) {
                    this.SwzbAddService.noCheckAll(e.children);
                }

            } else {
                e.data.select = true;
            }
        }


        console.log(this.sourceTreeTableSelect);


    }

    selectSourceAll(i) {
        if (this.isSourceShow2) {
            this.isSourceShow2 = false;
        } else {
            this.isSourceShow2 = true;
        }
        switch (i) {
            case 1:
                this.sourceTreeTable = this.DataProcessingService.swzbCheckAll(this.sourceTreeTable);
                console.log("全选");
                break;
            case 2:
                this.sourceTreeTable = JSON.parse(JSON.stringify(this.initSourceTreeTable));
                this.SwzbComparedService.SwzbCompared(this.targetTreeTable, this.sourceTreeTable);
                console.log("取消全选");
                break;
        }
    }


    saveAll() {
        console.log("保存初始数据");
        console.log("保存最终数据");
        console.log(this.targetTreeTable);
        console.log(this.addObj);
        console.log(this.type);

        //新增时候保存
        if (this.type === 'add') {
            if (this.targetTreeTable) {
                this.addObj.zbxpzList = this.DataProcessingService.returnTree(_.cloneDeep(this.targetTreeTable));
                if (this.addObj.ssflh) {
                    this.HttpService.post('zbflpz/add', this.addObj)
                        .then(res => {
                            if (res['success'] === true) {
                                this.addObj.zbxpzList = [];

                                this.msgs = [];
                                this.msgs.push({severity: 'success', summary: '保存提醒', detail: '保存成功'});
                                this.ShareService.sendMessage({
                                    severity: 'success',
                                    summary: '填入提醒',
                                    detail: '新增成功',
                                    display: 'true',
                                    clear: 'clear'
                                });
                            } else {
                                this.msgs = [];
                                this.msgs.push({severity: 'error', summary: '保存失败', detail: '请联系管理员'});
                            }
                        })
                } else {
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '保存失败', detail: '请选择分栏号'});
                }
            } else {
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: '保存失败', detail: '请配置分栏列表'});
            }


        }
        if (this.type === 'rew') {
            console.log(this.rewAddObj);
            console.log(this.rewDelObj);
            console.log(this.rewUpdateObj);


            if (this.rewAddObj['list'].length !== 0) {
                console.log(this.rewAddObj['list'][0]);
                let arr = Object.keys(this.rewAddObj['list'][0]);
                if (arr.length !== 0) {
                    this.rewObj.list.push(this.rewAddObj);
                    var list = this.SwzbAddService.repleaceZd(_.cloneDeep(this.rewAddObj['list']));
                    this.rewAddObj['list'] = list;
                }


            }
            if (this.rewDelObj['list'].length !== 0) {
                this.rewObj.list.push(this.rewDelObj);
            }
            if (this.rewUpdateObj['list'].length !== 0) {
                this.rewObj.list.push(this.rewUpdateObj);
                this.rewUpdateObj['list'] = this.DataProcessingService.replaceChildlValue(this.rewUpdateObj['list'], 'jldwId', 'jddwId', 'xh', 'zdxXh');

            }

            console.log(this.rewObj);

            if (this.rewObj.list.length == 0) {
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: '填入提醒', detail: '没有数据发生改变'});
            } else {
                this.HttpService.post('zbflpz/update', this.rewObj)
                    .then(res => {
                        if (res['success'] == true) {
                            // 刷新源数据
                            this.rewAddObj['list'] = [];
                            this.rewDelObj['list'] = [];
                            this.rewUpdateObj['list'] = [];
                            console.log(this.rewDelObj);
                            //修改时候目标数据
                            this.HttpService.get(`zbflpz/listFlzbxpz?sszbflpzId=${this.info['id']}`)
                                .then(res => {
                                    let resList = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'childList', 'children', 'zdxMc', 'zdxmc');
                                    resList = this.DataProcessingService.replaceChildlValue(resList, 'jddwId', 'jldwId', 'zdxXh', 'xh');
                                    this.targetTreeTable = this.DataProcessingService.replaceisCheck(this.DataProcessingService.returnTreeTable(resList));

                                });
                            this.msgs = [];
                            this.msgs.push({severity: 'success', summary: '保存提醒', detail: '保存成功'});
                        } else {
                            this.msgs = [];
                            this.msgs.push({severity: 'error', summary: '保存失败', detail: '请联系管理员'});
                        }

                    })
            }


        }


    }

    nodeUnselect(e) {
        console.log(e);
        console.log(this.selectedFiles);
    }

    //平级，先增加，在记录，要求目标树有该项
    addSelectSibNode(e) {
        console.log(e);
        console.log(this.sourceTreeTableSelect);
        let parentId = this.isSourSelectParentZdxid;
        if (this.type === 'rew') {
            let addRes = this.SwzbAddService.addItem(this.targetTreeTable, this.sourceTreeTableSelect, parentId);
            if (addRes === false) {
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请选择目标树有的子项'});
            }
            this.SwzbComparedService.SwzbCompared(this.targetTreeTable, this.sourceTreeTable);
            console.log(this.sourceTreeTableSelect);
            this.rewAddObj['list'].push(this.sourceTreeTableSelect);
            console.log(this.rewAddObj);
        }
        if (this.type === 'add') {
            this.targetTreeTable.push(this.sourceTreeTableSelect);
            console.log(this.SwzbComparedService.SwzbCompared(this.targetTreeTable, this.sourceTreeTable));
        }


    }

    //增加根节点,
    addSelectParentNode(e) {
        if (this.type === 'rew') {
            this.targetTreeTable.push(this.sourceTreeTableSelect);
            this.SwzbComparedService.SwzbCompared(this.targetTreeTable, this.sourceTreeTable);
            console.log(this.sourceTreeTableSelect);
            this.rewAddObj['list'].push(this.sourceTreeTableSelect);
            console.log(this.rewAddObj);
        }
        if (this.type === 'add') {
            this.targetTreeTable.push(this.sourceTreeTableSelect);
            console.log(this.SwzbComparedService.SwzbCompared(this.targetTreeTable, this.sourceTreeTable));
        }
    }

    //增加子节点，先做页面操作，在进行记录
    addSelectChildrenNode(e) {

        console.log(this.targetSelectItemZdxId);
        if (this.targetSelectItemZdxId) {
            this.targetTreeTable = this.DataProcessingService.addTreeNode(this.targetTreeTable, this.targetSelectItemZdxId, this.sourceTreeTableSelect);

            if (this.type === 'rew') {
                console.log(this.targetTreeTableSjid);
                this.sourceTreeTableSelect.data.sjId = this.targetTreeTableSjid;
                this.rewAddObj['list'].push(this.sourceTreeTableSelect);
                console.log(this.rewAddObj);
            }
            this.SwzbComparedService.SwzbCompared(this.targetTreeTable, this.sourceTreeTable);
        } else {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请在源数据树中选择父节点项'});
        }


    }


    addAllNode() {
        this.targetTreeTable = this.sourceTreeTable;
        this.SwzbComparedService.SwzbCompared(this.targetTreeTable, this.sourceTreeTable);
    }

    addNode() {
        console.log(this.targetTreeTable);
        this.targetTreeTable.push({"data": '', "childern": ''});


    }


    addChildrenNode(e) {
        console.log(e);
    }

    addSibNode(e) {
        console.log(e);
    }

    //先记录，在进行删除操作
    delNode(e) {
        console.log(e);
        if (e.children) {
            this.ConfirmationService.confirm({
                message: `你是否需要删除${e.data.zdxmc}节点包括其子节点`,
                accept: () => {
                    if (this.type === 'rew') {
                        let id = e.data.id;
                        let ls = {};
                        ls['id'] = id;
                        console.log(this.rewAddObj);
                        this.rewDelObj['list'].push(ls);
                        console.log("删除所选项");
                    }
                    this.targetTreeTable = this.DataProcessingService.delTreeNode(this.targetTreeTable, e.data.id);

                }
            });

        } else {
            if (this.type === 'rew') {
                // 如果是新增的则不需要记录
                if ("sszbflpzId" in e.data) {
                    // 删除数据库已有数据
                    let id = e.data.id;
                    let ls = {};
                    ls['id'] = id;
                    this.rewDelObj['list'].push(ls);
                    this.targetTreeTable = this.DataProcessingService.delTreeNode(this.targetTreeTable, e.data.id);

                } else {
                    let list = this.SwzbAddService.delNweAdd(this.rewAddObj['list'], e.data.id);
                    console.log(list);
                    for (let key in this.targetTreeTable) {
                        console.log(!this.targetTreeTable[key])
                        console.log(JSON.stringify(this.targetTreeTable[key]) == '{}');
                        if (JSON.stringify(this.targetTreeTable[key]) === '{}') {
                            console.log(key);
                            this.targetTreeTable.splice(parseInt(key), 1);
                            console.log("删除所选项");
                        }
                    }
                    console.log(list);

                }

                console.log(this.rewDelObj);

            }

        }

        console.log(this.targetTreeTable);
        console.log(this.sourceTreeTable);

        // this.SwzbComparedService.SwzbCompared(this.targetTreeTable, this.sourceTreeTable);
        console.log(this.SwzbComparedService.SwzbCompared(this.targetTreeTable, this.sourceTreeTable));
    }

    selectSing(e) {
        console.log(e.node);
        console.log(e.node.data);
        this.targetTreeTableSjid = e.node.data.id;
        this.targetSelectItemZdxId = e.node.data.zdxId;


    }

    update(e, zd, value) {
        console.log(e);
        console.log(zd);
        console.log(value);
        let ls = {};
        ls['id'] = e.data.id;
        ls[zd] = value;
        this.rewUpdateObj['list'] = this.SwzbAddService.update(this.rewUpdateObj['list'], ls);
        console.log(this.rewUpdateObj['list']);


    }


    getSsfllb(e) {
        console.log(e);
    }


    //获取低下列表
    getZbfllb(e) {
        this.addObj.zblId = e;
        this.HttpService.get(`zbflpz/listSjly?ssgcdm=${this.info['ssgcdm']}&ssxzqhdm=${this.info['ssxzqhdm']}&zblId=${e}&jdId=${this.info['jdId']}`)
            .then(res => {
                const resList = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'childList', 'children', '', '');
                this.sourceTreeTable = this.DataProcessingService.replaceisCheck(this.DataProcessingService.returnTreeTable(resList));
                console.log(JSON.stringify(this.sourceTreeTable));
                const initreslist = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'childList', 'children', '', '');
                this.initSourceTreeTable = this.DataProcessingService.replaceisCheck(this.DataProcessingService.returnTreeTable(initreslist));
                if (this.targetTreeTable && this.sourceTreeTable) {
                    this.SwzbComparedService.SwzbCompared(this.targetTreeTable, this.sourceTreeTable);
                }
            });

    }

    getFlh(e) {
        this.addObj.ssflh = e;
        console.log(e);
    }

    bigest() {
        console.log(this.model);
    }
}

function showCheck(list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].select === false) {
            list.splice(i--, 1);
            list = list;
        } else {
            list[i].select === false;
            if (list[i].children) {
                showCheck(list[i].children);
            }
        }
    }
    return list;
}

// function addTreeItem(list, id, item) {
//     console.log(item);
//     delete item.ssxzqhdm;
//     delete item.jdId;
//     delete item.zbflId;
//     delete item.isCheck;
//     delete item.zdIdList;
//     item.zdxXh = item.xh;
//     item.zdxPxh = item.pxh;
//     item.jddwId = item.jldwId;
//
//     delete item.xh;
//     delete item.pxh;
//     delete item.jldwId;
//     delete item.parent;
//     item.sjId = id;
//     console.log(item);
//
//
//     var itemLs = {};
//     itemLs['data'] = item;
//     itemLs['children'] = null;
//     console.log(itemLs);
//     if (list) {
//         for (var i = 0; i < list.length; i++) {
//             if (list[i].data.zdxId === id) {
//                 list[i].children = [];
//                 list[i].children.push(itemLs);
//                 return list;
//             } else {
//                 return false;
//             }
//         }
//     } else {
//         return false;
//     }
//
//
// }


export class addObj {
    "ssgcdm": string;
    "ssxzqhdm": string;
    "jdId": string;
    "zblId": string;
    "ssfllbdm": string;
    "ssflh": string;
    "bz": string;
    'zbxpzList': any;
}
