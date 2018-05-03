import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {flyIn} from '../../animations/fly-in';
import {MenuItem} from '../../../assets/_primeng@4.2.1@primeng/components/common/menuitem';
import {SelectItem} from '../../../assets/_primeng@4.2.1@primeng/components/common/selectitem';
import {SearchService} from "../../service/search.service";
import {HttpService} from "../../service/http-service";
import {ProjectInfoService} from "../service/projectInfo..service";
import {DataProcessingService} from "../../service/dataProcessing.service";
import * as _ from 'lodash';

@Component({
    selector: 'app-eng-base',
    templateUrl: './eng-base.component.html',
    styleUrls: ['./eng-base.component.css'],

    animations: [flyIn]
})
export class EngBaseComponent implements OnInit {
    private projectId: string;
    private showClass: number = 1;
    private showMode: number = 1;
    private gctx_selectList: any;
    private jszd_selectList: any;
    private gctxTreeTable: any;
    private gctxAllInfo: any;
    private init_gctxAllInfo: any;
    private gctxSearchList: any;
    private gctxFkList: any;
    private jszdTreeTable: any;
    private jszdAllInfo: any;
    private init_jszdAllInfo: any;
    private jszdSearchList: any;
    private jszdFkList: any;

    private msgs: any;


    types2: SelectItem[];
    private breadcrumb: MenuItem[];
    private isShow1: boolean = true;
    private project = new projectInfo();  // 基本信息
    private init_project = new projectInfo();
    private fjList: any;
    private init_fjList: any;
    private xmsx_list: any;

    private savePd: boolean = true;
    private gcgkjbxx = new Object();


    @ViewChild('ngModel') projectForm: NgForm;

    constructor(private DataProcessingService: DataProcessingService, private ProjectInfoService: ProjectInfoService, private route: ActivatedRoute, private SearchService: SearchService, private HttpService: HttpService) {
        this.route.params.subscribe(res => {

            console.log(res);
            console.log(this.ProjectInfoService);


        });
        this.types2 = [];
        this.types2.push({label: '拟建', value: 'all'});
        this.types2.push({label: '在建', value: 'yes'});
        this.types2.push({label: '完工', value: 'no'});
        this.breadcrumb = [
            {label: '首页', routerLink: '/engmang'},
            {label: '工程概况信息登记', routerLink: `/engmang/EngBase/${this.projectId}`},
        ];
    }

    ngOnInit() {
        this.gcgkjbxx['listFjAdd'] = [];
        this.gcgkjbxx['listFjDel'] = [];
        // this.ProjectInfoService.project.code = 'S000001';   // 为了便于测试
        // this.ProjectInfoService.project.id = "5500313009C9455087772414D8E38E21";
        // 获取项目信息
        this.HttpService.get(`gcgkjbxx/get?projectId=${this.ProjectInfoService.project.id}`)
            .then((res) => {
                if (res['returnObject']['gcgkjbxx'] == null) {
                    this.project = new projectInfo();
                    this.fjList = [];
                    this.init_fjList = JSON.parse(JSON.stringify(this.fjFl(res['returnObject'].listFj)));

                } else {
                    console.log(res);
                    this.project = res['returnObject'].gcgkjbxx;
                    this.init_project = JSON.parse(JSON.stringify(res['returnObject'].gcgkjbxx));
                    this.fjList = this.fjFl(res['returnObject'].listFj);
                    this.init_fjList = JSON.parse(JSON.stringify(this.fjFl(res['returnObject'].listFj)));
                    this.gctxAllInfo = res['returnObject'].mapGczytzzbxx;
                    this.init_gctxAllInfo = JSON.parse(JSON.stringify(res['returnObject'].mapGczytzzbxx));
                    this.jszdAllInfo = res['returnObject'].mapGcjszdjyxqk;
                    this.init_jszdAllInfo = JSON.parse(JSON.stringify(res['returnObject'].mapGcjszdjyxqk));
                    this.HttpService.get(`zdk/getProjectZdkByTableAndColumn?tableName=A_GCZYTZZBXX&column=JDDM&gcdm=${this.ProjectInfoService.project.code}&xzqhdm=000000000000000`)
                        .then((data) => {
                                console.log(data);
                                let res = this.DataProcessingService.replaceChildlValue(data['returnObject'], 'mc', 'label', 'dm', 'value');
                                console.log(res);
                                this.gctx_selectList = res;
                                console.log(this.gctx_selectList);

                                // 给特性指标一个初始值
                                this.gctxTreeTable = this.gctxAllInfo[this.gctx_selectList[0]['value']];
                                this.gctxSearchList = JSON.parse(JSON.stringify(this.gctxTreeTable));

                                console.log(this.gctxTreeTable);

                            },
                        );
                    this.HttpService.get(`zdk/getProjectZdkByTableAndColumn?tableName=A_GCJSZDJYXQK&column=JDDM&gcdm=${this.ProjectInfoService.project.code}&xzqhdm=000000000000000`)
                        .then((data) => {
                                console.log(data);
                                let res = this.DataProcessingService.replaceChildlValue(data['returnObject'], 'mc', 'label', 'dm', 'value');
                                console.log(res);
                                this.jszd_selectList = res;
                                // 给建设征地指标一个初始值
                                this.jszdTreeTable = this.jszdAllInfo[this.jszd_selectList[0]['value']];
                                this.jszdSearchList = JSON.parse(JSON.stringify(this.jszdTreeTable));
                                console.log(this.jszdSearchList);
                            },
                        );
                }
            });

        // 获取项目属性
        this.HttpService.get(`zdk/getProjectZdkByTableAndColumn?tableName=A_GCGKJBXX&column=XMSXDM&gcdm=${this.ProjectInfoService.project.code}`)
            .then((data) => {
                    console.log(data);
                    let res = this.DataProcessingService.replaceChildlValue(data['returnObject'], 'mc', 'label', 'dm', 'value');
                    console.log(res);
                    this.xmsx_list = res;


                },
            );
        // 获取项目状态
        this.HttpService.get(`zdk/getProjectZdkByTableAndColumn?tableName=A_GCGKJBXX&column=SFXW&gcdm=${this.ProjectInfoService.project.code}`)
            .then((data) => {
                    console.log(data);
                    // this.types2=data;
                },
            );


    }

    save() {
        console.log(this.fjList);
        console.log(this.gcgkjbxx);

        let ghxmjbxx = this.compare(this.init_project, this.project);
        let gctxlist = this.comlist(this.init_gctxAllInfo, this.gctxAllInfo, this.ProjectInfoService.project.code, this.ProjectInfoService.project.ssxtdm, this.init_project['id'], 'sz', 'bz');
        let jszdlist = this.comlist(this.init_jszdAllInfo, this.jszdAllInfo, this.ProjectInfoService.project.code, this.ProjectInfoService.project.ssxtdm, this.init_project['id'], 'sl', 'bz');
        this.gcgkjbxx['gcgkjbxx'] = ghxmjbxx;
        this.gcgkjbxx['listGczytzzbxxAdd'] = gctxlist['add'];
        this.gcgkjbxx['listGczytzzbxxDel'] = gctxlist['del'];
        this.gcgkjbxx['listGczytzzbxxEdit'] = gctxlist['rew'];
        this.gcgkjbxx['listGcjszdjyxqkAdd'] = jszdlist['add'];
        this.gcgkjbxx['listGcjszdjyxqkDel'] = jszdlist['del'];
        this.gcgkjbxx['listGcjszdjyxqkEdit'] = jszdlist['rew'];
        this.pdSameBt();
        if (this.savePd) {
            this.HttpService.post('gcgkjbxx/save', this.gcgkjbxx)
                .then((data) => {
                    console.log(data);
                    if (data['success'] == true) {

                        this.msgs = [];
                        this.msgs.push({severity: 'success', summary: '填入提醒', detail: '数据保存成功'});
                        this.gcgkjbxx = new Object();
                        this.gcgkjbxx['listFjAdd'] = [];
                        this.gcgkjbxx['listFjDel'] = [];
                        this.ProjectInfoService.project.ssgcgkjbxxId = data['returnObject'];
                        this.HttpService.get(`gcgkjbxx/get?projectId=${this.ProjectInfoService.project.id}`)
                            .then((res) => {
                                console.log(res);
                                this.project = res['returnObject'].gcgkjbxx;
                                this.init_project = JSON.parse(JSON.stringify(res['returnObject'].gcgkjbxx));
                                this.fjList = this.fjFl(res['returnObject'].listFj);
                                this.init_fjList = JSON.parse(JSON.stringify(this.fjFl(res['returnObject'].listFj)));
                                this.gctxAllInfo = res['returnObject'].mapGczytzzbxx;
                                this.init_gctxAllInfo = JSON.parse(JSON.stringify(res['returnObject'].mapGczytzzbxx));
                                this.jszdAllInfo = res['returnObject'].mapGcjszdjyxqk;
                                this.init_jszdAllInfo = JSON.parse(JSON.stringify(res['returnObject'].mapGcjszdjyxqk));

                                this.HttpService.get(`zdk/getProjectZdkByTableAndColumn?tableName=A_GCZYTZZBXX&column=JDDM&gcdm=${this.ProjectInfoService.project.code}&xzqhdm=000000000000000`)
                                    .then((data) => {
                                            console.log(data);
                                            let res = this.DataProcessingService.replaceChildlValue(data['returnObject'], 'mc', 'label', 'dm', 'value');
                                            console.log(res);
                                            this.gctx_selectList = res;
                                            console.log(this.gctx_selectList);

                                            // 给特性指标一个初始值
                                            this.gctxTreeTable = this.gctxAllInfo[this.gctx_selectList[0]['value']];
                                            this.gctxSearchList = JSON.parse(JSON.stringify(this.gctxTreeTable));

                                            console.log(this.gctxTreeTable);

                                        },
                                    );
                                this.HttpService.get(`zdk/getProjectZdkByTableAndColumn?tableName=A_GCJSZDJYXQK&column=JDDM&gcdm=${this.ProjectInfoService.project.code}&xzqhdm=000000000000000`)
                                    .then((data) => {
                                            console.log(data);
                                            let res = this.DataProcessingService.replaceChildlValue(data['returnObject'], 'mc', 'label', 'dm', 'value');
                                            console.log(res);
                                            this.jszd_selectList = res;
                                            // 给建设征地指标一个初始值
                                            this.jszdTreeTable = this.jszdAllInfo[this.jszd_selectList[0]['value']];
                                            this.jszdSearchList = JSON.parse(JSON.stringify(this.jszdTreeTable));
                                            console.log(this.jszdSearchList);
                                        },
                                    );
                            });

                    } else {
                        this.msgs = [];
                        this.msgs.push({severity: 'error', summary: '填入提醒', detail: data['errorMessage']});

                    }
                    console.log(data);
                });
        } else {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '填入提醒', detail: '图片标题严禁重复'});
        }


    }

    //修改项目属性
    eventXmsx(event) {
        console.log(event);
    }

    searchGctxList(key) {
        console.log(key);
        console.log(this.gctxTreeTable);
        this.gctxTreeTable = this.SearchService.searchByRegExp(key, this.gctxSearchList, 'mc');
    }

    searchJszdList(key) {
        console.log(key);
        console.log(this.gctxTreeTable);
        this.jszdTreeTable = this.SearchService.searchByRegExp(key, this.jszdSearchList, 'mc');
    }

    clearTable(i) {
        console.log(i);
        switch (i) {
            case 'gctx':
                this.gctxTreeTable.forEach((item, key, arr) => {
                    console.log(item);
                    item.sz = null;
                    item.bz = null;
                });
                this.gctxTreeTable = this.gctxTreeTable.slice();
                break;
            case 'jszd':
                this.jszdTreeTable.forEach((item, key, arr) => {
                    item.sl = null;
                    item.bz = null;
                });
                break;
        }
    }

    // 清空所有
    clearAll() {
        // for (let key in this.project) {
        //     this.project[key] = null;
        // }
        this.project.jsdd = "";
        this.project.sjqy = "";
        this.project.ymazghsjdw = "";
        this.project.xmpzbm = "";
        this.project.ydytpfjjlid = "";
        this.project.xmfr = "";
        this.project.xmsxdm = "";


        this.clearTable('gctx');
        this.clearTable('jszd');

        //删除刚刚新增的图片
        for (let i = 0; i < this.fjList['img'].length; i++) {

            if (this.fjList['img'][i]["id"]) {
                let lsObj = {id: this.fjList['img'][i].id};
                this.gcgkjbxx['listFjDel'].push(lsObj);
            } else {
                console.log(this.gcgkjbxx['listFjAdd']);
                this.delFjAdd(this.gcgkjbxx['listFjAdd'], this.fjList['img'][i]['url']);
            }
            this.fjList['img'].splice(i, 1);
            i--;
        }
        for (let i = 0; i < this.fjList['videos'].length; i++) {

            if (this.fjList['videos'][i]["id"]) {
                let lsObj = {id: this.fjList['videos'][i].id};
                this.gcgkjbxx['listFjDel'].push(lsObj);
            } else {
                this.delFjAdd(this.gcgkjbxx['listFjAdd'], this.fjList['videos'][i]['url']);
            }
            this.fjList['videos'].splice(i, 1);
            i--;
        }
    }

    showAll(item, i) {
        this.isShow1 = this.isShow1 ? false : true;
        if (item == 'gctx') {
            switch (i) {
                case 1:

                    this.gctxFkList = _.cloneDeep(this.gctxTreeTable);
                    console.log(this.gctxFkList);
                    var list = this.showFk(this.gctxTreeTable, 'gctx');
                    this.gctxTreeTable = JSON.parse(JSON.stringify(list));
                    break;
                case 2:
                    this.gctxTreeTable = this.gctxFkList;
                    break;
            }
        } else {
            switch (i) {
                case 1:

                    this.jszdFkList = _.cloneDeep(this.jszdTreeTable);
                    console.log(this.jszdFkList);
                    var list = this.showFk(this.jszdTreeTable, 'jszd');
                    this.jszdTreeTable = JSON.parse(JSON.stringify(list));
                    break;
                case 2:
                    this.jszdTreeTable = this.jszdFkList;
                    break;
            }
        }

    }

    showMore(i) {
        this.showClass = i;
        this.showMode = i;
        this.isShow1 = true;
    }

    getChildEvent(e, item) {
        console.log(e);
        switch (item) {
            case 'gctx':
                this.gctxTreeTable = this.gctxAllInfo[e];
                this.gctxSearchList = JSON.parse(JSON.stringify(this.gctxTreeTable));
                break;
            case "jszd":
                this.jszdTreeTable = this.jszdAllInfo[e];
                this.jszdSearchList = JSON.parse(JSON.stringify(this.jszdTreeTable));
                break;

        }

    }


    // 图片上传
    onBasicUploadAuto(lsdm, event) {
        console.log(event);
        console.log(this.fjList);
        let response = JSON.parse(event.xhr.response)['returnObject'];
        response['fj']['ssxtdm'] = this.ProjectInfoService.project.ssxtdm;
        response['fj']['ssgcdm'] = this.ProjectInfoService.project.code;
        response['fj']['wjlxdm'] = lsdm;
        response['fjwj']['ssxtdm'] = this.ProjectInfoService.project.ssxtdm;
        response['fjwj']['ssgcdm'] = this.ProjectInfoService.project.code;
        console.log(response);
        this.gcgkjbxx['listFjAdd'].push(response);

        console.log(this.gcgkjbxx);
        let imgRsoponse = {
            bt: response['fj']['bt'],
            bz: null,
            // fzbm:"A_GCGKJBXX",
            fzjlId: response.fj.fzjlId,
            gdlxdm: response.fj.gdlxdm,
            id: null,
            qzdm: null,
            scr: null,
            scsj: "",
            ssgcdm: "",
            ssxtdm: "",
            url: response.fjwj.wjcfxdml,
            wjlxdm: null,
            zhgxsj: "",
            zhxgr: null
        };
        this.fjList[lsdm].push(imgRsoponse);
        this.pdSameBt();

    }


    //判断是否有重名
    pdSameBt() {
        console.log(this.fjList);
        this.savePd = true;
            if('img' in this.fjList){
                for (let item of this.fjList['img']) {
                    for (let item2 of this.fjList['img']) {
                        if (item.url !== item2.url) {
                            if (item.bt === item2.bt) {
                                console.log(item.bt);
                                this.msgs = [];
                                this.msgs.push({severity: 'error', summary: '填入提醒', detail: '图片标题严禁重复'});
                                console.log("存在重复值");
                                this.savePd = false;
                            }
                        }
                    }
                }
            }
            if(this.fjList['videos']){
                for (let item of this.fjList['videos']) {
                    for (let item2 of this.fjList['videos']) {
                        if (item.url !== item2.url) {
                            if (item.bt === item2.bt) {
                                console.log(item.bt);
                                this.msgs = [];
                                this.msgs.push({severity: 'error', summary: '填入提醒', detail: '视频标题严禁重复'});
                                console.log("存在重复值");
                                this.savePd = false;
                            }
                        }
                    }

                }
            }


    }

    // selectButton
    selectedTypea() {
        console.log(this.gcgkjbxx);
    }

    //修改图片标题
    changeImgBt(url, bt) {
        console.log(url);
        console.log(bt);
        console.log(this.gcgkjbxx['listFjAdd']);

        for (let item of this.gcgkjbxx['listFjAdd']) {
            console.log(item);
            if (item.fjwj.wjcfxdml === url) {
                console.log("修改该bt");
                item.fj.bt = bt;
            }
        }
    }

// 设置为引导页
    setHeadimg(event) {
        console.log(event);
        this.project['ydytpfjjlid'] = event.id;
    }

    //删除图片
    delImg(event, fjfl) {
        console.log(this.fjList);
        if (event.id) {
            let lsObj = {id: event.id};
            this.gcgkjbxx['listFjDel'].push(lsObj);
        } else {
            this.delFjAdd(this.gcgkjbxx['listFjAdd'], event.url);
        }
        this.detailTableList(this.fjList[fjfl], event.url);
    }

    delFjAdd(arr, url) {
        console.log(arr);
        console.log(url);
        for (let key in arr) {
            if (arr[key]['fjwj'].wjcfxdml == url) {
                console.log(arr[key]['fjwj']);
                arr.splice(key, 1);
            }
        }
        ;
        return arr;
    }

    //图片删除函数
    detailTableList(a, id) {
        for (let key in a) {
            if (a[key].url === id) {
                a.splice(key, 1);
                console.log("找到该项");
            }
        }
        return a;
    }

    //删除全部勾选的
    delCheck() {
        console.log(this.fjList);

        for (let i = 0; i < this.fjList['img'].length; i++) {
            if (this.fjList['img'][i]['isCheck'] == true) {
                if (this.fjList['img'][i]["id"]) {
                    let lsObj = {id: this.fjList['img'][i].id};
                    this.gcgkjbxx['listFjDel'].push(lsObj);
                } else {
                    console.log(this.gcgkjbxx['listFjAdd']);
                    this.delFjAdd(this.gcgkjbxx['listFjAdd'], this.fjList['img'][i]['url']);
                }
                this.fjList['img'].splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < this.fjList['videos'].length; i++) {
            if (this.fjList['videos'][i]['isCheck'] == true) {
                if (this.fjList['videos'][i]["id"]) {
                    let lsObj = {id: this.fjList['videos'][i].id};
                    this.gcgkjbxx['listFjDel'].push(lsObj);
                } else {
                    this.delFjAdd(this.gcgkjbxx['listFjAdd'], this.fjList['videos'][i]['url']);
                }
                this.fjList['videos'].splice(i, 1);
                i--;
            }
        }


    }


    //选择
    check(event) {
        event.isCheck = event.isCheck ? false : true;
    }

    // 工程概况信息登记
    showFk(list, value) {
        for (let i = 0; i < list.length; i++) {
            console.log(list);
            if (value == 'gctx') {
                if (list[i].sz == null && list[i].bz == null) {
                    console.log("删除该" + i);
                    list.splice(i, 1);
                    i--;
                }
            } else {
                if (list[i].bz == null && list[i].sl == null) {
                    console.log("删除该" + i);
                    list.splice(i, 1);
                    i--;
                }
            }

        }
        return list;
    }

    // 工程概况基本信息对比
    compare(init_arr, arr) {
        console.log(this.ProjectInfoService);
        let lsArr = {};
        lsArr['ssxtdm'] = this.ProjectInfoService.project['ssxtdm'];
        lsArr['ssgcdm'] = this.ProjectInfoService.project['code'];
        lsArr['id'] = arr['id'];
        lsArr['sfxw'] = arr['sfxw'];
        lsArr['xmmc'] = arr['xmmc'];
        if (Object.keys(init_arr).length == 0) {
            for (let key in arr) {
                lsArr[key] = arr[key];
            }
        } else {
            for (let key in init_arr) {
                if (arr[key] != init_arr[key]) {
                    console.log(key + "相同");
                    lsArr[key] = arr[key];
                }
            }
        }

        return lsArr;
    }

    comlist(init_arr, arr, ssxtdm, ssgcdm, ssgcgkjbxxId, sz, bz) {
        console.log(ssgcgkjbxxId);
        let lsArr = {};
        lsArr['del'] = [];
        lsArr['add'] = [];
        lsArr['rew'] = [];

        for (let item in init_arr) {
            console.log(item);
            for (let key in init_arr[item]) {
                console.log(init_arr[item][key]);
                if (init_arr[item][key]['id']) {
                    //这个是修改或者删除
                    if (arr[item][key][sz] == null && arr[item][key][bz] == null) {
                        console.log(arr[item][key]);
                        let lsObj = {};
                        lsObj['id'] = arr[item][key]['id'];
                        lsArr['del'].push(lsObj);
                    } else {
                        console.log(init_arr[item][key]);
                        console.log(arr[item][key]);


                        if (init_arr[item][key][sz] != arr[item][key][sz] || init_arr[item][key][bz] != arr[item][key][bz]) {
                            console.log(item + "修改");
                            console.log(key + "修改");
                            let lsObj = {};
                            lsObj['id'] = arr[item][key]['id'];
                            lsObj[sz] = arr[item][key][sz];
                            lsObj[bz] = arr[item][key][bz];
                            lsArr['rew'].push(lsObj);
                        }
                    }
                } else {

                    if (arr[item][key][bz] != null || arr[item][key][sz] != null) {
                        console.log("这个是新增");
                        let lsObj = {};
                        lsObj['ssgcdm'] = ssgcdm;
                        lsObj['ssxtdm'] = ssxtdm;
                        lsObj['ssgcgkjbxxId'] = ssgcgkjbxxId;
                        lsObj['zbdm'] = arr[item][key]['zbdm'];
                        lsObj['jddm'] = item;
                        lsObj[sz] = arr[item][key][sz];
                        lsObj[bz] = arr[item][key][bz];
                        lsArr['add'].push(lsObj);
                    }

                }
            }
        }
        return lsArr;
    }

    // 进行附件信息分类
    fjFl(arr) {
        let fjList = {};
        fjList['img'] = [];
        fjList['videos'] = [];
        if (arr) {
            for (let item of arr) {
                console.log(item.wjlxdm);
                fjList[item.wjlxdm].push(item);
            }
        }

        return fjList;
    }
}

export class projectInfo {

    ssgcdm: string;//工程

    sfxw: any;//项目状态代码（提交必填）

    sjqy: any;//涉及市、县（区）

    ymazghsjdw: any;//移民安置规划设计单位

    ssxtdm: any;//系统代码（提交必填）

    zhgxsj: any;//最后更新时间

    xmpzbm: any;//项目批准部门

    cjsj: any;//创建时间

    ydytpfjjlid: any;//引导页图片附件记录ID

    xmmc: string;//项目名称（提交必填）

    jsdd: any;//建设地点

    xmsxdm: any;//项目属性代码

    bz: any;//备注

    xmfr: any;//项目法人或项目主管单位
}

