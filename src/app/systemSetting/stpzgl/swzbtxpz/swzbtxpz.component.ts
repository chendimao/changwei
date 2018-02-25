import {Component, OnInit, ViewChild, TemplateRef, AfterViewInit, Renderer2} from '@angular/core';
import {HttpService} from "../../../service/http-service";
import {DataProcessingService} from "../../../service/dataProcessing.service";
import {TreeTablePostService} from "../../../service/TreeTablePost.service";
import {flyIn} from "../../../animations/fly-in";
import * as _ from 'lodash';


@Component({
    selector: 'app-swzbtxpz',
    templateUrl: './swzbtxpz.component.html',
    styleUrls: ['./swzbtxpz.component.css'],
    providers: [TreeTablePostService],
    animations: [flyIn]
})
export class SwzbtxpzComponent implements OnInit {
    showBlock: boolean = false;
    private msgs = new Array;
    private gcList = [{}];
    private jdList = [{}];
    private jldwList: any;
    private jldw: any;
    private zbflUrl: any;
    private swzbtxpzGetParme = new swzbtxpzGetParme;
    private params: string;
    private TreeTable = new Array;
    private arrRes = [];

    protected initTreeTable = new Array;

    private treelist: any;

    private isShow1: boolean = true;
    private isShow2: boolean = true;
    private value: boolean = true;
    public resPost1: any;

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

    constructor(private TreeTablePostService: TreeTablePostService, private HttpService: HttpService, private DataProcessingService: DataProcessingService) {
    }

    ngOnInit() {
        this.msgs = [];
        this.msgs.push({severity: 'warn', summary: '填入提醒', detail: '请选择工程'});

        //指标分类
        this.zbflUrl = 'xtswzbfl/listZbfl?zdlb=ZBL';
        this.HttpService.get('gczc/allList')
            .then(res => {
                console.log(res);
                const resList = JSON.stringify(res['returnObject']);
                let list = resList.replace(/name/g, 'label');
                list = list.replace(/code/g, "value");
                this.gcList = JSON.parse(list);
                console.log(this.gcList);
            });

        this.HttpService.get('xtswzbfl/listGzjd')
            .then(res => {
                console.log(res);
                const resList = JSON.stringify(res['returnObject']);
                let list = resList.replace(/mc/g, 'label');
                list = list.replace(/id/g, "value");
                this.jdList = JSON.parse(list);
                console.log(this.jdList);
            });

        this.HttpService.get(`locality/listTree`)
            .then(res => {
                let childObj = res['returnObject'];
                console.log(childObj);
                this.treelist = this.DataProcessingService.replaceChildlList(childObj, 'childrenLocality', 'children', 'localityName', 'label');

            });

        this.HttpService.get('xtswzbfl/listJldw')
            .then(res => {
                this.jldwList = res['returnObject'];
                console.log(this.jldwList);
            })

    }


    getList() {
        console.log(this.swzbtxpzGetParme);
        this.params = this.DataProcessingService.transString(this.swzbtxpzGetParme);
        if (this.swzbtxpzGetParme.ssxzqhdm == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '参数缺少', detail: '请选择行政区划代码'});
        } else if (this.swzbtxpzGetParme.zbflId == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '参数缺少', detail: '请指标分类'});
        } else if (this.swzbtxpzGetParme.ssgcdm == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '参数缺少', detail: '请工程项目'});

        } else {
            console.log("获取数据");
            this.HttpService.get('xtswzbfl/listSwzbpz?' + this.params)
                .then(res => {
                    const resList = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'childList', 'children', '', '');
                    this.TreeTable = this.DataProcessingService.replaceisCheck(this.DataProcessingService.returnTreeTable(resList));
                    const initreslist = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'childList', 'children', '', '');
                    this.initTreeTable = this.DataProcessingService.replaceisCheck(this.DataProcessingService.returnTreeTable(initreslist));


                })
                .catch(res => {
                    console.log(res);
                })
        }
    }


    // 点击checkbox反馈
    //e为当前点击节点
    // 1:先判断点击true，false。
    // 2：判断是子集还是顶集

    checkbox(e, res) {
        console.log(e);
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
            //
            //1:如果为新增,记录新增的数据.判断依据:是否有id
            //2:如果为
            var arr = [];
            arr.push(e);
            this.arrRes = [];
            let lsArr = this.returnAddList(arr);
            for (let key of lsArr) {
                this.rewAddObj['list'].push(key);
            }
            console.log(this.rewAddObj);
        } else {
            if (typeof(e.parent) === 'undefined') {
                for (var i = 0; i < e.children.length; i++) {
                    e.children[i].data.isCheck = 0;
                }
            }
            // 如果为删除,记录删除的id;
        }


    }

    saveAll() {
        console.log("保存初始数据");
        console.log(this.initTreeTable);
        console.log("保存最终数据");
        console.log(this.TreeTable);

        // console.log(this.TreeTablePostService.savePost(this.initTreeTable, this.TreeTable));
        var resPost = this.TreeTablePostService.savePost(this.initTreeTable, this.TreeTable, this.swzbtxpzGetParme.zbflId);
        console.log(this.initTreeTable);
        this.resPost1 = resPost;
        console.log(JSON.stringify(resPost));
        this.HttpService.post('xtswzbfl/save', resPost)
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

    //展示非空项
    showAll(i) {
        if (this.isShow1) {
            this.isShow1 = false;
        } else {
            this.isShow1 = true;
        }
        switch (i) {
            case 1:
                this.TreeTable = this.DataProcessingService.showCheck(this.TreeTable, 0);
                console.log("显示非空项");
                break;
            case 2:
                this.TreeTable = JSON.parse(JSON.stringify(this.initTreeTable));

                console.log("显示所有项");
                break;
        }
    }

    searchList(e, key) {
        console.log(key);
        if (e.keyCode == 13 || e == 'click') {
            console.log("搜索");
            this.HttpService.get(`xtswzbfl/listSwzbpz?${this.params}&searchKey=${key}`)
                .then(res => {
                    const resList = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'childList', 'children', '', '');
                    this.TreeTable = this.DataProcessingService.replaceisCheck(this.DataProcessingService.returnTreeTable(resList));
                    const initreslist = this.DataProcessingService.replaceChildlValue(res['returnObject'], 'childList', 'children', '', '');

                    this.initTreeTable = this.DataProcessingService.replaceisCheck(this.DataProcessingService.returnTreeTable(initreslist));

                });
        }
    }


    showGclist() {
        if (this.showBlock == true) {
            this.showBlock = false;
        } else {
            this.showBlock = true;
        }
    }

    nodeSelect(e) {
        console.log(e);
    }

    getjlList(e) {
        console.log(e);

    }

    getGzjdId(e) {
        console.log(e);
        this.swzbtxpzGetParme.jdId = e;
        this.getList();
    }

    getProjectId(e) {
        console.log(e);
        this.swzbtxpzGetParme.ssgcdm = e;
        this.getList();
    }

    getAreaCode(e) {
        console.log(e);
        this.swzbtxpzGetParme.ssxzqhdm = e.localityCode;
        this.getList();
    }

    getZbid(e) {
        console.log(e);
        this.swzbtxpzGetParme.zbflId = e.id;
        this.getList();
    }

    //处理新增数据


    returnAddList(list) {
        console.log(list)
        for (let key of list) {
            console.log(key);
            var item = new Object;
            item['zdxId'] = key.data.zdxId;
            item['jdId'] = key.data.jdId;
            item['jldwId'] = key.data.jldwId;
            item['pxh'] = key.data.pxh;
            item['xh'] = key.data.xh;
            item['bz'] = key.data.bz;
            if (key.children) {
                // console.log(item);
                this.returnAddList(key.children);
            }
            console.log(item);
            this.arrRes.push(item);
            console.log(this.arrRes);
        }
        return this.arrRes;
    }
    returnDelList(list) {
        console.log(list)
        for (let key of list) {
            console.log(key);
            var item = new Object;
            item['zdxId'] = key.data.zdxId;
            item['jdId'] = key.data.jdId;
            item['jldwId'] = key.data.jldwId;
            item['pxh'] = key.data.pxh;
            item['xh'] = key.data.xh;
            item['bz'] = key.data.bz;
            if (key.children) {
                // console.log(item);
                this.returnDelList(key.children);
            }
            console.log(item);
            this.arrRes.push(item);
            console.log(this.arrRes);
        }
        return this.arrRes;
    }

}

export class swzbtxpzGetParme {
    ssgcdm: string;	//所属工程代码	    是	    S000001
    ssxzqhdm: string;	//所属行政区划代码	是	    350526000000000
    zbflId: string;	//指标分类ID	    是      2F0E8D93C2B74B2AA569A961F951741D
    jdId: string;	//工作阶段ID	        是       4DDBCC17FC9348DC945B42F7C46769B0
    searchKey: string;	//用于搜索匹配字典项名称	否
}



