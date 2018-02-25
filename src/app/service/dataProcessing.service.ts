import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class DataProcessingService {


    showCheck(list, value) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].data.isCheck == value) {
                list.splice(i--, 1);
                list = list;
            } else {
                list[i].data.isCheck == 1;
                if (list[i].children) {
                    this.showCheck(list[i].children, 0);
                }
            }
        }
        return list;
    }

    showCheck1(list, value) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].isCheck == value) {
                list.splice(i--, 1);
                list = list;
            }
        }
        return list;
    }


    checkAll(list) {
        for (var i = 0; i < list.length; i++) {
            list[i].data.isCheck = 1;
            if (list[i].children) {
                this.checkAll(list[i].children);
            } else {
                list[i].data.isCheck = 1;
            }
        }
        return list;
    }


    checkAll1(list) {
        for (var i = 0; i < list.length; i++) {
            list[i].isCheck = 1;
        }
        return list;
    }

    swzbflpzShowCheck(list, value) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].select == value) {
                list.splice(i--, 1);
                list = list;
            } else {
                list[i].select == true;
                if (list[i].children) {
                    this.swzbflpzShowCheck(list[i].children, false);
                }
            }
        }
        return list;
    }


    swzbCheckAll(arr) {
        for (let key of arr) {
            if (key.children) {
                key.select = 1;
                this.swzbCheckAll(key.children);
            } else {
                key.select = 1;
            }
        }
        return arr;
    }


    replaceSelectList(selectList) {
        const resList = JSON.stringify(selectList);
        let list = resList.replace(/name/g, 'label');
        list = list.replace(/code/g, "value");
        list = JSON.parse(list);
        return list;
    }

    replaceChildlList(TreeTable, regexp, replacement, regexp1, replacement1) {
        const resList = JSON.stringify(TreeTable);
        let list = resList.replace(new RegExp(regexp, 'g'), replacement);
        list = list.replace(new RegExp(regexp1, 'g'), replacement1);
        list = JSON.parse('[' + list + ']');
        return list;
    }

    replaceChildlValue(TreeTable1, regexp1, replacement1, regexp2, replacement2) {
        const resList = JSON.stringify(TreeTable1);

        var list = resList.replace(new RegExp(regexp1, 'g'), replacement1);
        list = list.replace(new RegExp(regexp2, 'g'), replacement2);


        list = JSON.parse(list);
        console.log(list);
        return list;
    }


    //实物指标分配栏详情


    //把object对象转成get用的字符串格式
    transString(list) {
        let arr = [];
        for (var key in list) {
            var str = key + "=" + list[key];
            arr.push(str);
        }
        var params = arr.join("&");
        return params;
    }

    //回复城组件树
    returnTree(arr) {
        console.log(arr);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].children) {
                var children = arr[i].children;
                // console.log(arr[i].data.zdxmc);
                arr[i]['zdxMc'] = arr[i].data['zdxmc'];
                arr[i]['zdxId'] = arr[i].data.zdxId;
                arr[i]['sjId'] = null;
                arr[i]['zdxXh'] = arr[i].data.xh;
                arr[i]['zdxPxh'] = arr[i].data.pxh;
                arr[i]['jddwId'] = arr[i].data.jldwId;
                arr[i]['bz'] = arr[i].data.bz;
                delete arr[i].data;
                delete arr[i].expanded;
                delete arr[i].partialSelected;
                delete arr[i].select;
                delete arr[i].parent;
                delete arr[i].children;

                arr[i].childList = children;
                this.returnTree(arr[i].childList);
            } else {
                arr[i]['zdxMc'] = arr[i].data.zdxmc;
                arr[i]['zdxId'] = arr[i].data.zdxId;
                arr[i]['sjId'] = null;
                arr[i]['zdxXh'] = arr[i].data.xh;
                arr[i]['zdxPxh'] = arr[i].data.pxh;
                arr[i]['jddwId'] = arr[i].data.jldwId;
                arr[i]['bz'] = arr[i].data.bz;
                delete arr[i].data;
                delete arr[i].expanded;
                delete arr[i].partialSelected;
                delete arr[i].parent;
                delete arr[i].select;
                delete arr[i].children;
                arr[i].childList = null;

            }
        }
        return arr;
    }

    //修改后台数据变成组件树
    returnTreeTable(TreeTable) {
        for (var i = 0; i < TreeTable.length; i++) {
            if (TreeTable[i].children) {
                var data = {};
                for (var key in TreeTable[i]) {
                    if (key != 'children') {
                        data[key] = TreeTable[i][key];
                        delete TreeTable[i][key];
                    }

                }
                TreeTable[i].data = data;
                this.returnTreeTable(TreeTable[i].children);
            } else {
                var data = {};
                for (var key in TreeTable[i]) {
                    if (key != 'children') {
                        data[key] = TreeTable[i][key];
                        delete TreeTable[i][key];
                    }
                }
                TreeTable[i].data = data;
            }
        }
        return TreeTable;
    }

    //去掉primeng自动添加parent项
    deleteParent(a) {
        for (var i = 0; i < a.length; i++) {
            if (typeof (a[i].parent) == 'undefined') {
                delete a[i].parent;
            }
        }
    }

    //默认展开
    replaceisCheck(a) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].children) {
                if (a[i].data.isCheck == 1) {
                    a[i].expanded = true;
                    a[i].partialSelected = true;
                    a[i].select = false;
                } else {
                    a[i].expanded = false;
                    a[i].partialSelected = false;
                    a[i].select = false;
                }
                this.replaceisCheck(a[i].children);
            } else {
                if (a[i].data.isCheck == 1) {
                    a[i].expanded = true;
                    a[i].partialSelected = true;
                    a[i].select = false;
                } else {
                    a[i].expanded = true;
                    a[i].partialSelected = true;
                    a[i].select = false;
                }
            }

        }
        return a;
    }

    //删除指定node子项
    delTreeNode(list, id) {
        for (let key of list) {
            console.log(key);
            if (key.children) {
                console.log(key['data'].id);
                if (key['data'].id == id) {
                    for (let i in key) {
                        delete  key[i];
                    }
                    break;
                }
                this.delTreeNode(key.children, id);
            } else {
                if (key['data'].id == id) {
                    for (let i in key) {
                        delete  key[i];
                    }
                    console.log(list);
                    break;
                 }
            }
         }
         delete list[0].parent;
         console.log(list);
        list = JSON.parse(JSON.stringify(list).replace('[{}]', null));
        list = JSON.parse(JSON.stringify(list).replace('{}', null));
        if(list){
            for(var i=0;i<list.length;i++){
                if(list[i]==null){
                    list.splice(i,1);
                }
            }
        }
        return list;
    }

    //增加指定node项
    addTreeNode(initList, id, itemLs) {
        console.log(itemLs);
        for (let key of initList) {
            console.log(key);
            if (key.children) {
                console.log(key['data'].id);
                if (key['data'].zdxId === id) {

                    if(key['children']){
                        key['children'].push(itemLs);
                    }else{
                        key['children'] = [];
                        key['children'].push(itemLs);
                    }

                    break;
                }
                this.addTreeNode(key.children, id, itemLs);
            } else {
                if (key['data'].zdxId === id) {
                    if(key['children']){
                        key['children'].push(itemLs);
                    }else{
                        key['children'] = [];
                        key['children'].push(itemLs);
                    }
                    break;
                }
            }
        }
        return initList;
    }


    //


}
