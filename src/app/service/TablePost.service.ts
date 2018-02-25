import {Injectable, OnInit} from '@angular/core';

@Injectable()

export class TablePostService implements OnInit {
    public obj = {};
    private deleteObj = {};
    private updateItem = {};
    private addItem = {};


    ngOnInit() {
    }


    conject(initTreeTable, TreeTable) {
        // console.log("构造头部");
        this.obj['obj'] = {
            "ssgcdm": initTreeTable[0].ssgcdm,
            "ssxzqhdm": initTreeTable[0].ssxzqhdm,
            "qsrlxzdxId": initTreeTable[0].qsrlxzdxId,

        }
    }

    addfunc(initTreeTable, TreeTable) {
        for (let i = 0; i < initTreeTable.length; i++) {
            let addItemls = {};
            if (initTreeTable[i].isCheck == 0) {
                if (TreeTable[i].isCheck == 1) {
                    if (TreeTable[i].swzbflmc) {
                        addItemls['swzbflmc'] = TreeTable[i].swzbflmc;
                    }
                    if (TreeTable[i].swzblbId) {
                        addItemls['swzblbId'] = TreeTable[i].swzblbId;
                    }
                    if (TreeTable[i].url) {
                        addItemls['url'] = TreeTable[i].url;
                    }
                    if (TreeTable[i].pxh) {
                        addItemls['pxh'] = TreeTable[i].pxh;
                    }
                    if (TreeTable[i].xh) {
                        addItemls['xh'] = TreeTable[i].xh;
                    }
                    if (TreeTable[i].bz) {
                        addItemls['bz'] = TreeTable[i].bz;
                    }


                    this.addItem['list'].push(addItemls);
                }
            }
        }
        return this.addItem;
    }

    deletefunc(initTreeTable, TreeTable) {

        for (let i = 0; i < initTreeTable.length; i++) {
            if (initTreeTable[i].isCheck === 1) {
                if (TreeTable[i].isCheck === 0) {
                    let detailDeleteList = {};
                    detailDeleteList['id'] = initTreeTable[i].id;
                    this.deleteObj['list'].push(detailDeleteList);
                }
            }
        }
        return this.deleteObj;
    }

    updatefunc(initTreeTable, TreeTable) {
        for (let i = 0; i < initTreeTable.length; i++) {
            let updateItemls = {};
            if (initTreeTable[i].isCheck == 1) {
                if (TreeTable[i].isCheck == 1) {
                    for (let key in initTreeTable[i]) {
                        if (initTreeTable[i][key] !== TreeTable[i][key]) {
                            updateItemls['id'] = TreeTable[i].id;
                            updateItemls[key] = TreeTable[i][key];
                        }

                    }
                    if (updateItemls['id']) {
                        this.updateItem['list'].push(updateItemls);
                    }
                }
            }
        }
        return this.updateItem;

    }


    savePost(initTreeTable, TreeTable) {
        this.deleteObj['oper'] = "Delete";
        this.updateItem['oper'] = "Update";
        this.addItem['oper'] = "Add";
        this.conject(initTreeTable, TreeTable);
        this.updateItem['list'] = [];
        this.addItem['list'] = [];
        this.deleteObj['list'] = [];
        this.obj['list'] = [];
        var addRes = this.addfunc(initTreeTable, TreeTable);
        console.log(addRes);
        var deleteRes = this.deletefunc(initTreeTable, TreeTable);
        console.log(deleteRes);
        var updateRes = this.updatefunc(initTreeTable, TreeTable);
        console.log(updateRes);
        if (addRes['list'].length !== 0) {
            this.obj['list'].push(addRes);
        }
        if (deleteRes['list'].length !== 0) {
            this.obj['list'].push(deleteRes);
        }
        if (updateRes['list'].length !== 0) {
            this.obj['list'].push(updateRes);
        }
        return this.obj;
    }


}