import {Injectable, OnInit} from '@angular/core';

@Injectable()

export class TreeTablePostService implements OnInit {
    public obj = {};
    private deleteObj = {};
    private updateItem = {};
    private addItem = {};


    ngOnInit() {
    }


    conject(initTreeTable, TreeTable, zbflId) {
        // console.log("构造头部");
        this.obj['obj'] = {
            "zbflId": zbflId,
            "ssgcdm":
            TreeTable[0].data.ssgcdm, //工程代码（必填）
            "ssxzqhdm":
            TreeTable[0].data.ssxzqhdm, //行政区划代码（必填）
            "jdId":
            TreeTable[0].data.jdId //工作阶段ID（必填）
        }

    }

    updatefunc(initTreeTable, TreeTable) {
        for (let i = 0; i < initTreeTable.length; i++) {
            if (initTreeTable[i].children) {
                let updateItemls = {};
                if (TreeTable[i].data.isCheck == 1) {
                    if (initTreeTable[i].data.isCheck == 1) {
                        for (let key in initTreeTable[i].data) {
                            if (initTreeTable[i].data[key] != TreeTable[i].data[key]) {
                                updateItemls['id'] = TreeTable[i].data.id;
                                updateItemls[key] = TreeTable[i].data[key];
                            }
                        }
                        if (updateItemls['id']) {
                            this.updateItem['list'].push(updateItemls);
                        }
                        this.updatefunc(initTreeTable[i].children, TreeTable[i].children);
                    }
                }
            } else {
                let updateItemls1 = {};
                if (TreeTable[i].data.isCheck == 1) {
                    if (initTreeTable[i].data.isCheck == 1) {
                        for (let key in initTreeTable[i].data) {
                            if (initTreeTable[i].data[key] != TreeTable[i].data[key]) {
                                updateItemls1['id'] = TreeTable[i].data.id;
                                updateItemls1[key] = TreeTable[i].data[key];
                            }
                        }
                        if (updateItemls1['id']) {
                            this.updateItem['list'].push(updateItemls1);
                        }
                    }
                }

            }

        }
        // console.log(this.updateItem);
        return this.updateItem;
    }

    addfunc(initTreeTable, TreeTable) {
        for (let i = 0; i < initTreeTable.length; i++) {
            if (initTreeTable[i].children) {
                let addItemls = {};
                if (TreeTable[i].data.isCheck == 1) {
                    if (initTreeTable[i].data.isCheck == 0) {
                        addItemls['zdxId'] = TreeTable[i].data.zdxId;
                        addItemls['jdId'] = TreeTable[i].data.jdId;
                        addItemls['jldwId'] = TreeTable[i].data.jldwId;
                        addItemls['pxh'] = TreeTable[i].data.pxh;
                        addItemls['xh'] = TreeTable[i].data.xh;
                        addItemls['bz'] = TreeTable[i].data.bz;
                    }

                    if (addItemls['zdxId']) {
                        this.addItem['list'].push(addItemls);
                        // console.log(this.addItem);
                    }
                    // console.log(i + "次递归");
                    this.addfunc(initTreeTable[i].children, TreeTable[i].children);
                }

            } else {
                if (TreeTable[i].data.isCheck == 1) {
                    let addItemls = {};
                    if (initTreeTable[i].data.isCheck == 0) {
                        addItemls['zdxId'] = TreeTable[i].data.zdxId;
                        addItemls['jdId'] = TreeTable[i].data.jdId;
                        addItemls['jldwId'] = TreeTable[i].data.jldwId;
                        addItemls['pxh'] = TreeTable[i].data.pxh;
                        addItemls['xh'] = TreeTable[i].data.xh;
                        addItemls['bz'] = TreeTable[i].data.bz;


                    }
                    if (addItemls['zdxId']) {
                        this.addItem['list'].push(addItemls);
                        // console.log(this.addItem);
                    }

                }

            }

        }
        // console.log(this.addItem);
        return this.addItem;
    }

    deletefunc(initTreeTable, TreeTable) {
        let detailDeleteList = {};
        for (let i = 0; i < initTreeTable.length; i++) {
            if (initTreeTable[i].children) {
                if (initTreeTable[i].data.isCheck != TreeTable[i].data.isCheck) {
                    if (TreeTable[i].data.isCheck == 0) {
                        detailDeleteList = {};
                        detailDeleteList['id'] = initTreeTable[i].data.id;
                        this.deleteObj['list'].push(detailDeleteList);
                    }
                }
                this.deletefunc(initTreeTable[i].children, TreeTable[i].children);
            } else {
                if (initTreeTable[i].data.isCheck != TreeTable[i].data.isCheck) {
                    if (TreeTable[i].data.isCheck == 0) {
                        detailDeleteList = {};
                        detailDeleteList['id'] = initTreeTable[i].data.id;
                        if (detailDeleteList['id']) {
                            this.deleteObj['list'].push(detailDeleteList);
                        }
                    }
                }
            }
        }
        return this.deleteObj;
    }

    savePost(initTreeTable, TreeTable, zbflId) {
        this.deleteObj['oper'] = "Delete";

        this.updateItem['oper'] = "Update";

        this.addItem['oper'] = "Add";
        this.conject(initTreeTable, TreeTable, zbflId);
        this.updateItem['list'] = [];
        this.addItem['list'] = [];
        this.deleteObj['list'] = [];
        this.obj['list'] = [];
        var addRes = this.addfunc(initTreeTable, TreeTable);
        var deleteRes = this.deletefunc(initTreeTable, TreeTable);
        var updateRes = this.updatefunc(initTreeTable, TreeTable);
        console.log(addRes);
        console.log(addRes['list']);
        console.log(addRes['list'].length);
        if (deleteRes['list'].length != 0) {
            this.obj['list'].push(deleteRes);
        }
        if (addRes['list'].length != 0) {
            this.obj['list'].push(addRes);
        }

        if (updateRes['list'].length != 0) {
            this.obj['list'].push(updateRes);
        }
        return this.obj;
    }


}