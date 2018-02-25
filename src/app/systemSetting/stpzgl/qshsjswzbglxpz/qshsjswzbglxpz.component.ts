import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../service/http-service";
import {DataProcessingService} from "../../../service/dataProcessing.service";
import {TablePostService} from "../../../service/TablePost.service";
import {flyIn} from "../../../animations/fly-in";

@Component({
    selector: 'app-qshsjswzbglxpz',
    templateUrl: './qshsjswzbglxpz.component.html',
    styleUrls: ['../swzbtxpz/swzbtxpz.component.css'],
    providers: [HttpService, TablePostService],
    animations: [flyIn]
})
export class QshsjswzbglxpzComponent implements OnInit {
    showBlock: boolean = false;
    private gcList = [{}];
    private jdList = [{}];
    private msgs: any;
    private qshlbUrl: any;
    private TreeTable = new Array;
    protected initTreeTable = new Array;
    private params: string;
    private treelist: any;
    private qshGetParme = new qshGetParme;
    private isShow1: boolean = true;
    private isShow2: boolean = true;

    constructor(private TablePostService: TablePostService, private HttpService: HttpService, private DataProcessingService: DataProcessingService) {
    }

    ngOnInit() {
        this.qshlbUrl = 'qsrsjswzb/listQsrlb';
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
                // this.jdList = this.DataProcessingService.replaceChildlList(res['returnObject'], 'mc', 'label', 'id', 'value')
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

        this.HttpService.get(`locality/listTree`)
            .then(res => {
                let childObj = res['returnObject'];
                console.log(childObj);
                this.treelist = this.DataProcessingService.replaceChildlList(childObj, 'childrenLocality', 'children', 'localityName', 'label');

            });


    }


    getList() {
        this.params = this.DataProcessingService.transString(this.qshGetParme);
        if (this.qshGetParme.ssxzqhdm == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '参数缺少', detail: '请选择行政区划代码'});
        } else if (this.qshGetParme.ssgcdm == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '参数缺少', detail: '工程代码缺少'});
        } else if (this.qshGetParme.qsrlxzdxId == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '参数缺少', detail: '权属人类别ID'});
        } else {
            this.HttpService.get('qsrsjswzb/listQsrsjzb?' + this.params)
                .then(res => {
                    this.TreeTable = JSON.parse(JSON.stringify(res['returnObject']));
                    console.log(this.TreeTable);
                    this.initTreeTable = JSON.parse(JSON.stringify(res['returnObject']));
                    console.log(this.initTreeTable);

                })
                .catch(res => {
                    console.log(res);
                })
        }
    }

    searchList(e, key) {
        console.log(key);
        if (e.keyCode == 13 || e == 'click') {
            console.log("搜索");
            this.HttpService.get(`qsrsjswzb/listQsrsjzb?${this.params}&searchKey=${key}`)
                .then(res => {
                    this.TreeTable = JSON.parse(JSON.stringify(res['returnObject']));

                    this.initTreeTable = JSON.parse(JSON.stringify(res['returnObject']));

                });
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
                var list = this.DataProcessingService.showCheck1(this.TreeTable, 0);
                this.TreeTable = JSON.parse(JSON.stringify(list));
                break;
            case 2:
                this.TreeTable = JSON.parse(JSON.stringify(this.initTreeTable));
                break;
        }
    }

    saveAll() {
        console.log("保存初始数据");
        console.log(this.initTreeTable);
        console.log("保存最终数据");
        console.log(this.TreeTable);

        // console.log(this.TreeTablePostService.savePost(this.initTreeTable, this.TreeTable));
        var resPost = this.TablePostService.savePost(this.initTreeTable, this.TreeTable);
        console.log(resPost);
        if (resPost['updateItem']) {
            console.log('修改，名称，地址，排序号，必填');
        }
        if (resPost['addRes']) {
            console.log('新增，名称，地址，排序号，必填');
        }
        console.log(resPost['list']);
        console.log(resPost['list'].length === 0);
        if (resPost['list'].length !== 0) {
            this.HttpService.post('qsrsjswzb/save', resPost)
                .then(res => {
                    if (res['success'] == true) {
                        this.msgs = [];
                        this.msgs.push({severity: 'success', summary: '保存提醒', detail: '保存成功'});
                    } else {
                        this.msgs = [];
                        this.msgs.push({severity: 'error', summary: '保存失败', detail: '请联系管理员'});
                    }


                })
        } else {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '保存失败', detail: '页面没有任何修改'});

        }


    }


    // 全选
    selectAll(i) {
        if (this.isShow2) {
            this.isShow2 = false;
        } else {
            this.isShow2 = true;
        }
        switch (i) {
            case 1:
                this.TreeTable = this.DataProcessingService.checkAll1(this.TreeTable);
                break;
            case 2:
                this.TreeTable = JSON.parse(JSON.stringify(this.initTreeTable));
                break;
        }
    }


    // 勾选
    checkbox(e, res) {

        if (res) {
            e.isCheck = 1;
        } else {
            e.isCheck = 0;
        }
        console.log(e);
    }

    getGzjdId(e) {
        console.log(e);
        this.getList();
    }

    getProjectId(e) {
        console.log(e);
        this.qshGetParme.ssgcdm = e;
        this.getList();
    }

    getAreaCode(e) {
        console.log(e);
        this.qshGetParme.ssxzqhdm = e.localityCode;
        this.getList();
    }

    getQsrlxzdxId(e) {
        console.log(e);
        console.log(e.id);
        this.qshGetParme.qsrlxzdxId = e.id;
        this.getList();
    }

    showGclist() {
        if (this.showBlock == true) {
            this.showBlock = false;
        } else {
            this.showBlock = true;
        }
    }
}

export class qshGetParme {
    ssgcdm: string	    //所属工程代码	是
    ssxzqhdm: string	//所属行政区划代码	是
    qsrlxzdxId: string	//权属人类别ID	是
}

