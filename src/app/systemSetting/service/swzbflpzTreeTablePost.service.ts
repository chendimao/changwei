import {Injectable, OnInit} from '@angular/core';

@Injectable()

export class SwzbflpzTreeTablePostService implements OnInit {
    public obj = {};
    private deleteObj = {};
    private updateItem = {};
    private addItem = {};


    ngOnInit() {
    }


    conject(initTreeTable, TreeTable, addObj) {
        // console.log("构造头部");
        this.obj['obj'] = addObj;

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
        console.log(this.updateItem);
        return this.updateItem;
    }

    addfunc(initTreeTable, TreeTable) {
        for (let i = 0; i < initTreeTable.length; i++) {
            if (initTreeTable[i].children) {
                let addItemls = {};
                if (TreeTable[i].data.isCheck === 1) {
                    if (initTreeTable[i].data.isCheck === 0) {
                        addItemls['zdxId'] = TreeTable[i].data.zdxId;
                        addItemls['zdxMc'] = TreeTable[i].data.zdxmc;
                        addItemls['zdxXh'] = TreeTable[i].data.xh;
                        addItemls['zdxPxh'] = TreeTable[i].data.pxh;
                        addItemls['jddwId'] = TreeTable[i].data.jldwId;
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
                if (TreeTable[i].data.isCheck === 1) {
                    let addItemls = {};
                    if (initTreeTable[i].data.isCheck === 0) {
                        addItemls['zdxId'] = TreeTable[i].data.zdxId;
                        addItemls['zdxMc'] = TreeTable[i].data.zdxmc;
                        addItemls['zdxXh'] = TreeTable[i].data.xh;
                        addItemls['zdxPxh'] = TreeTable[i].data.pxh;
                        addItemls['jddwId'] = TreeTable[i].data.jldwId;
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
        console.log(initTreeTable);
        console.log(TreeTable);
        let detailDeleteList = {};
        for (let i = 0; i < initTreeTable.length; i++) {
            console.log(initTreeTable[i].children);
            if (initTreeTable[i].children) {
                console.log(initTreeTable[i].data.isCheck);
                console.log(TreeTable[i].data.isCheck);
                console.log(initTreeTable[i].data.isCheck != TreeTable[i].data.isCheck);
                if (initTreeTable[i].data.isCheck !== TreeTable[i].data.isCheck) {
                    if (TreeTable[i].data.isCheck == 0) {
                        detailDeleteList = {};
                        detailDeleteList['id'] = initTreeTable[i].data.id;
                        console.log(detailDeleteList);
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
        console.log(this.deleteObj);
        return this.deleteObj;
    }

    savePost(initTreeTable, TreeTable, addObj) {
        this.deleteObj['oper'] = "Delete";

        this.updateItem['oper'] = "Update";

        this.addItem['oper'] = "Add";
        this.conject(initTreeTable, TreeTable, addObj);
        this.updateItem['list'] = [];
        this.addItem['list'] = [];
        this.deleteObj['list'] = [];
        this.obj['list'] = [];
        var addRes = this.addfunc(initTreeTable, TreeTable);
        var deleteRes = this.deletefunc(initTreeTable, TreeTable);
        var updateRes = this.updatefunc(initTreeTable, TreeTable);

        if (deleteRes['list'].length !== 0) {
            this.obj['list'].push(deleteRes);
        }
        if (addRes['list'].length !== 0) {
            this.obj['list'].push(addRes);
        }

        if (updateRes['list'].length !== 0) {
            this.obj['list'].push(updateRes);
        }
        console.log(this.obj);
        return this.obj;
    }


}