import {Injectable} from '@angular/core';


@Injectable()
export class SwzbAddService {

    //更换字段，便于提交
    repleaceZd(test) {
        console.log(test);
        for (let key1 of test) {
            if (key1.children) {
                var item = {};
                var ch = {};
                item['zdxMc'] = key1.data['zdxmc'];
                item['zdxId'] = key1.data['zdxId'];
                item['zdxXh'] = key1.data['xh'];
                item['sjId'] = key1.data['sjId'];
                item['zdxPxh'] = key1.data['pxh'];
                item['jddwId'] = key1.data['jldwId'];
                item['bz'] = key1.data['bz'];
                ch = key1.children;
                for (let i in key1) {
                    delete key1[i];
                }
                key1['zdxMc'] = item['zdxMc'];
                key1['zdxId'] = item['zdxId'];
                key1['sjId'] = item['sjId'];
                key1['zdxXh'] = item['zdxXh'];
                key1['zdxPxh'] = item['zdxPxh'];
                key1['jddwId'] = item['jddwId'];
                key1['bz'] = item['bz'];
                key1.childList = ch;

                this.repleaceZd(key1.childList);
            } else {
                var item = {};
                var ch = {};
                item['zdxMc'] = key1.data['zdxmc'];
                item['zdxId'] = key1.data['zdxId'];
                item['zdxXh'] = key1.data['xh'];
                item['sjId'] = key1.data['sjId'];
                item['zdxPxh'] = key1.data['pxh'];
                item['jddwId'] = key1.data['jldwId'];
                item['bz'] = key1.data['bz'];
                ch = key1.children;
                for (let i in key1) {
                    delete key1[i]
                }
                key1['zdxMc'] = item['zdxMc'];
                key1['zdxId'] = item['zdxId'];
                key1['sjId'] = item['sjId'];
                key1['zdxXh'] = item['zdxXh'];
                key1['zdxPxh'] = item['zdxPxh'];
                key1['jddwId'] = item['jddwId'];
                key1['bz'] = item['bz'];
                key1.childList = ch;


            }
        }
        return test;
    }

    //修改时判断，便于提交
    update(test, updateItem) {
        let idList = [];
        let lsjl = true;
        for (let key of test) {
            console.log(key);
            if (key.id == updateItem.id) {
                console.log("修改相同项");
                for (let i in updateItem) {
                    key[i] = updateItem[i];
                    lsjl = false;
                }
            }
        }
        if (lsjl) {
            test.push(updateItem);
        }
        return test;
    }

    //勾选全部下级
    checkAll(arr) {
        console.log(arr);
        for (let key of arr) {
            console.log(key);
            if (key.children) {
                if ('isDisplayCheck' in key.data) {
                    key.select = false;
                } else if (key.data.isDisplayCheck === '1') {
                    key.select = true;
                } else {
                    console.log("sssss");
                    key.select = true;
                }
                this.checkAll(key.children);
            } else {
                if ('isDisplayCheck' in key.data) {
                    key.select = false;
                } else if (key.data.isDisplayCheck === '1') {
                    key.select = true;
                } else {
                    console.log("sssss");
                    key.select = true;
                }

            }

        }
        return arr;
    }

    noCheckAll(arr) {
        console.log(arr);
        for (let key of arr) {
            console.log(key);
            if (key.children) {
                if ('isDisplayCheck' in key.data) {
                    key.select = false;
                } else {
                    console.log("sssss");
                    key.select = false;
                }
                this.checkAll(key.children);
            } else {

                if ('isDisplayCheck' in key.data) {
                    key.select = false;
                } else {
                    console.log("sssss");
                    key.select = false;
                }

            }

        }
        return arr;
    }

    //当删除项为新增的时候。
    delNweAdd(list, id) {
        for (let key of list) {
            if (key.children) {
                if (key.data.id === id) {
                    console.log("删除一项");
                    for (let i in key) {
                        delete  key[i];
                    }
                    break;
                }
                this.delNweAdd(key.children, id);
            } else {
                if (key.data.id === id) {
                    console.log("删除一项");
                    for (let i in key) {
                        delete  key[i];
                    }
                    break;
                }
            }

        }
        console.log(list);
        delete list[0].parent;
        list = JSON.parse(JSON.stringify(list).replace('[{}]', null));
        list = JSON.parse(JSON.stringify(list).replace('{}', null));
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i] == null) {
                    list.splice(i, 1);
                }
            }
        }
        return list;
    }

    //点击增加平级节点
    addItem(right, item, id) {
        for (let key of right) {
            console.log(key);
            if (key.children) {
                for (let key2 of key.data) {
                    if (key.data.zdxId === id) {
                        console.log("有此项");
                        console.log(key.data.id);
                        item.data.sjId = key.data.id;
                        key.children[key.children.length] = {
                            "data": item.data,
                            "children": item.children
                        };
                        break;
                    }
                }

            } else {
                if (key.data.zdxId === id) {
                    console.log("有此项");
                    console.log(key.data.id);
                    item.data.sjId = key.data.id;
                    key.children = [];
                    key.children[0] = {
                        "data": item.data,
                        "children": item.children
                    };
                    break;
                }
            }
        }
        return right;
    }

    //传回勾选的数据
    selectCheck(rightTable) {
        console.log(rightTable);
        var list = {};
        for (let key of rightTable) {

            if (key.children) {
                if (!key.select) {
                    console.log("zzz")
                    for (let i in key) {
                        delete key[i];
                    }
                } else {
                    this.selectCheck(key.children)
                }

            } else {
                if (!key.select) {
                    console.log("zzz")
                    for (let i in key) {
                        delete key[i];
                    }
                }
            }
        }

        console.log(JSON.stringify(rightTable));
        rightTable = JSON.parse(JSON.stringify(rightTable).replace('[{}]', null));
        rightTable = JSON.parse(JSON.stringify(rightTable).replace('{}', null));
        console.log(JSON.stringify(rightTable));
        if (rightTable) {
            for (var i = 0; i < rightTable.length; i++) {
                if (rightTable[i] == null) {
                    rightTable.splice(i, 1);
                }
            }
        }

        return rightTable;
    }


}