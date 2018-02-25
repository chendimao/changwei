import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {DataProcessingService} from "../../../service/dataProcessing.service";
import {HttpService} from "../../../service/http-service";
import {DelWaringComponent} from "../../../common/del-waring/del-waring.component";
import {SwzbComparedService} from "../../service/swzbCompared.service";
import {SearchService} from "../../../service/search.service";
import * as _ from 'lodash';

@Component({
    selector: 'app-swzbflpzxq',
    templateUrl: './swzbflpzxq.component.html',
    styleUrls: ['../swzbtxpz/swzbtxpz.component.css'],
    providers: [SearchService, SwzbComparedService]
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
    private rewAddObj: any;
    private rewDelObj: any;
    private rewUpdateObj: any;

    private sourceTreeTable: any;
    private initSourceTreeTable: any;
    private sourceTreeTableSelect: any;
    private isSourceShow1: boolean = false;
    private isSourceShow2: boolean = true;
    private targetTreeTable: any;
    private targetSelectItemZdxId: any;


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

    constructor(private SwzbComparedService: SwzbComparedService, private SearchService: SearchService, private dmRoom: ComponentFactoryResolver, private DataProcessingService: DataProcessingService, private HttpService: HttpService) {
        console.log(this.sourceTreeTable);
        console.log(this.initSourceTreeTable);


    }

    ngOnInit() {



        var test = [
            {
                "start": null,
                "limit": null,
                "orderCol": null,
                "orderType": null,
                "sql": null,
                "searchKey": null,
                "id": "78E84352AA6B488BB9A9E4A6FD5E9466",
                "ssxtdm": "X000001",
                "ssgcdm": "S000001",
                "ssxzqhdm": "350526000000000",
                "zdxId": "048B5E7E66A74F2CAB1AEA53C8360389",
                "jldwId": "AC2C4490AFFB4999BCD4D27CAEE774B7",
                "jdId": "4DDBCC17FC9348DC945B42F7C46769B0",
                "xh": "1",
                "pxh": "01",
                "bz": "test",
                "cjsj": null,
                "zhgxsj": null,
                "zbflId": null,
                "isCheck": 1,
                "zdxmc": "主房",
                "childList": [{
                    "start": null,
                    "limit": null,
                    "orderCol": null,
                    "orderType": null,
                    "sql": null,
                    "searchKey": null,
                    "id": "2BF49E9CB03D47FBA4BAFA01794D5E45",
                    "ssxtdm": "X000001",
                    "ssgcdm": "S000001",
                    "ssxzqhdm": "350526000000000",
                    "zdxId": "1FC2A4375A864DFE8B56005F1EF7D90C",
                    "jldwId": null,
                    "jdId": "4DDBCC17FC9348DC945B42F7C46769B0",
                    "xh": "1.1",
                    "pxh": "0101",
                    "bz": null,
                    "cjsj": null,
                    "zhgxsj": null,
                    "zbflId": null,
                    "isCheck": 1,
                    "zdxmc": "框架结构",
                    "childList": null,
                    "zdIdList": null
                }, {
                    "start": null,
                    "limit": null,
                    "orderCol": null,
                    "orderType": null,
                    "sql": null,
                    "searchKey": null,
                    "id": "1C636305861E4795A935445BABFB627C",
                    "ssxtdm": "X000001",
                    "ssgcdm": "S000001",
                    "ssxzqhdm": "350526000000000",
                    "zdxId": "E98E7AAFE83F4F28A39CA3056A24991B",
                    "jldwId": null,
                    "jdId": "4DDBCC17FC9348DC945B42F7C46769B0",
                    "xh": "1.1",
                    "pxh": "0101",
                    "bz": null,
                    "cjsj": null,
                    "zhgxsj": null,
                    "zbflId": null,
                    "isCheck": 1,
                    "zdxmc": "土木结构",
                    "childList": null,
                    "zdIdList": null
                }],
                "zdIdList": null
            },
            {
                "start": null,
                "limit": null,
                "orderCol": null,
                "orderType": null,
                "sql": null,
                "searchKey": null,
                "id": "EC9CA75E961B4B018BA13CCF855D31DB",
                "ssxtdm": "X000001",
                "ssgcdm": "S000001",
                "ssxzqhdm": "350526000000000",
                "zdxId": "1F69419055E94B7B984443FCEC21DF14",
                "jldwId": "AC2C4490AFFB4999BCD4D27CAEE774B7",
                "jdId": "4DDBCC17FC9348DC945B42F7C46769B0",
                "xh": "3",
                "pxh": "03",
                "bz": null,
                "cjsj": null,
                "zhgxsj": null,
                "zbflId": null,
                "isCheck": 1,
                "zdxmc": "厂房",
                "childList": [{
                    "start": null,
                    "limit": null,
                    "orderCol": null,
                    "orderType": null,
                    "sql": null,
                    "searchKey": null,
                    "id": "7E864B87A53E48FA824F8AF203A2C115",
                    "ssxtdm": "X000001",
                    "ssgcdm": "S000001",
                    "ssxzqhdm": "350526000000000",
                    "zdxId": "5AC509E469A2456F998A85B7A5C63973",
                    "jldwId": null,
                    "jdId": "4DDBCC17FC9348DC945B42F7C46769B0",
                    "xh": "3.1",
                    "pxh": "0301",
                    "bz": null,
                    "cjsj": null,
                    "zhgxsj": null,
                    "zbflId": null,
                    "isCheck": 1,
                    "zdxmc": "砖混结构",
                    "childList": null,
                    "zdIdList": null
                }],
                "zdIdList": null
            },
            {
                "start": null,
                "limit": null,
                "orderCol": null,
                "orderType": null,
                "sql": null,
                "searchKey": null,
                "id": "E09C3F04CA4E4B32BDB70E46DF87880F",
                "ssxtdm": "X000001",
                "ssgcdm": "S000001",
                "ssxzqhdm": "350526000000000",
                "zdxId": "B5834F84C98D48F5BD5E81EA583FCCFC",
                "jldwId": "AC2C4490AFFB4999BCD4D27CAEE774B7",
                "jdId": "4DDBCC17FC9348DC945B42F7C46769B0",
                "xh": "2",
                "pxh": "02",
                "bz": null,
                "cjsj": null,
                "zhgxsj": null,
                "zbflId": null,
                "isCheck": 1,
                "zdxmc": "杂房",
                "childList": [{
                    "start": null,
                    "limit": null,
                    "orderCol": null,
                    "orderType": null,
                    "sql": null,
                    "searchKey": null,
                    "id": "BC2DB8E634894162919B5A359EFD8AAA",
                    "ssxtdm": "X000001",
                    "ssgcdm": "S000001",
                    "ssxzqhdm": "350526000000000",
                    "zdxId": "D984061EC9414A3BAE2DCD12EC3FA26E",
                    "jldwId": null,
                    "jdId": "4DDBCC17FC9348DC945B42F7C46769B0",
                    "xh": "2.2",
                    "pxh": "0202",
                    "bz": null,
                    "cjsj": null,
                    "zhgxsj": null,
                    "zbflId": null,
                    "isCheck": 1,
                    "zdxmc": "土木结构",
                    "childList": null,
                    "zdIdList": null
                }],
                "zdIdList": null
            }];
        var test1 = this.DataProcessingService.replaceChildlValue(test, 'childList', 'children', 'zdxMc', 'zdxmc');
        this.test = this.DataProcessingService.returnTreeTable(test1);

        console.log(this.info);
        console.log(this.type);
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
                break;
        }
        //计量列表
        this.HttpService.get('xtswzbfl/listJldw')
            .then(res => {
                this.jldwList = res['returnObject'];

                this.jldw = res['returnObject'][0].id;
            });
        //原始数据
        this.HttpService.get(`zbflpz/listSjly?ssgcdm=${this.info['ssgcdm']}&ssxzqhdm=${this.info['ssxzqhdm']}&zblId=${this.info['zblId']}&jdId=${this.info['jdId']}`)
            .then(res => {
                const resList = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'childList', 'children', '', '');
                this.sourceTreeTable = this.DataProcessingService.replaceisCheck(this.DataProcessingService.returnTreeTable(resList));
                console.log(this.sourceTreeTable);
                const initreslist = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'childList', 'children', '', '');
                this.initSourceTreeTable = this.DataProcessingService.replaceisCheck(this.DataProcessingService.returnTreeTable(initreslist));
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
        console.log(res);
        if (!this.isSourceShow1) {
            console.log("勾选下级");
            console.log(e.children === null);
            if (e.children) {
                for (var i = 0; i < e.children.length; i++) {
                    e.children[i].select = true;
                }
            }
        }
        this.sourceTreeTableSelect = {
            "data": e.data,
            "children": e.data,
        };
        console.log(this.sourceTreeTableSelect);

        this.node = e;

        console.log(this.node);
        console.log(res);
    }

    selectSourceAll(i) {
        console.log(this.sourceTreeTable);
        console.log(this.initSourceTreeTable);
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
                console.log("取消全选");
                break;
        }
    }


    saveAll() {
        this.SwzbComparedService.SwzbCompared(this.targetTreeTable,this.sourceTreeTable);




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
                                this.msgs = [];
                                this.msgs.push({severity: 'success', summary: '保存提醒', detail: '保存成功'});
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
            if (this.rewAddObj) {
                this.rewObj.list.push(this.rewAddObj);
            }
            if (this.rewDelObj) {
                this.rewObj.list.push(this.rewDelObj);
            }
            if (this.rewUpdateObj) {
                this.rewObj.list.push(this.rewUpdateObj);
            }
            console.log(this.rewObj);
            console.log(this.rewAddObj);
            console.log(this.rewDelObj);
            console.log(this.rewUpdateObj);


            this.HttpService.post('zbflpz/update', this.rewObj)
                .then(res => {
                    if (res['success'] == true) {
                        this.msgs = [];
                        this.msgs.push({severity: 'success', summary: '保存提醒', detail: '保存成功'});
                    } else {
                        this.msgs = [];
                        this.msgs.push({severity: 'error', summary: '保存失败', detail: '请联系管理员'});
                    }

                })
        }


    }

    nodeUnselect(e) {
        console.log(e);
        console.log(this.selectedFiles);
    }


    //增加根节点,
    addSelectParentNode(e) {
        this.targetTreeTable.push(this.sourceTreeTableSelect);
    }

    //增加子节点，先做页面操作，在进行记录
    addSelectChildrenNode(e) {
        console.log(this.targetSelectItemZdxId);
        console.log(this.targetTreeTable);
        console.log(this.sourceTreeTableSelect);

        this.targetTreeTable = this.DataProcessingService.addTreeNode(this.targetTreeTable, this.targetSelectItemZdxId, this.sourceTreeTableSelect)


        // if (this.node.parent) {
        //     console.log(this.node);
        //     console.log(this.node.parent.data.zdxId);
        //     console.log(this.node.data);
        //     console.log(this.targetTreeTable);
        //     let res = addTreeItem(this.targetTreeTable, this.node.parent.data.zdxId, this.node.data);
        //     if (res === false) {
        //         this.msgs = [];
        //         this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请先选择父节点项'});
        //     }
        // } else {
        //     this.msgs = [];
        //     this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请选择子节点项'});
        // }

        if (this.type === 'rew') {
            this.rewAddObj = {
                "oper": "add",
            };
            let ls = {};
            ls['zdxId'] = this.node.data.zdxId;
            ls['zdxMc'] = this.node.data.zdxmc;
            ls['sjId'] = this.node.parent.data.id;
            ls['zdxPxh'] = this.node.data.zdxPxh;
            ls['zdxXh'] = this.node.data.zdxXh;
            ls['jddwId'] = this.node.data.jldwId;
            ls['bz'] = this.node.data.bz;
            console.log(ls);

            let list = [];
            list.push(ls);
            console.log(list);
            this.rewAddObj.list = list;

        }


    }

    addSelectSibNode(e) {
        let list = this.DataProcessingService.swzbflpzShowCheck(_.cloneDeep(this.sourceTreeTable), false);
        console.log(list);
        this.targetTreeTable = list;
        console.log(e);

    }

    addNode(e) {


        console.log(e);
    }


    addChildrenNode(e) {
        console.log(e);
    }

    addSibNode(e) {
        console.log(e);
    }

    //先记录，在进行删除操作
    delNode(e) {
        if (this.type === 'rew') {
            let id = e.data.id;
            this.rewAddObj = {
                "oper": "Delete",
            };
            let ls = {};
            ls['id'] = id;

            let list = [];
            list.push(ls);
            console.log(list);
            this.rewAddObj.list = list;
            console.log(id);
            console.log("删除所选项");
        }
        this.targetTreeTable = this.DataProcessingService.delTreeNode(this.targetTreeTable, e.data.id);
        console.log(this.targetTreeTable);


    }

    selectSing(e) {
        console.log(e.node);
        console.log(e.node.data);
        this.targetSelectItemZdxId = e.node.data.zdxId;


    }

    update(e, zd, value) {
        console.log(e);
        this.rewUpdateObj = {
            "oper": "Update",
        };
        let ls = {};
        ls['id'] = e.data.id;
        if (zd === 'jldwId') {
            ls['jddwId'] = value;
        }
        if (zd === 'zdxXh') {
            ls['zdxXh'] = value;
        }
        let list = [];
        list.push(ls);
        console.log(list);
        this.rewUpdateObj.list = list;


    }

    getjSourcelList(e) {
        console.log(e);
    }

    getjlTargetList(e) {
        console.log(e);

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
                console.log(this.sourceTreeTable);
            });

    }

    getFlh(e) {
        this.addObj.ssflh = e;
        console.log(e);
    }
}

function showCheck(list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].select == false) {
            list.splice(i--, 1);
            list = list;
        } else {
            list[i].select == false;
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
