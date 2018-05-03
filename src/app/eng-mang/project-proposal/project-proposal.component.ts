import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {flyIn} from '../../animations/fly-in';
import {HttpService} from "../../service/http-service";
import {ProjectInfoService} from "../service/projectInfo..service";

@Component({
    selector: 'app-project-proposal',
    templateUrl: './project-proposal.component.html',
    styleUrls: ['./project-proposal.component.css'],
    animations: [flyIn]
})
export class ProjectProposalComponent implements OnInit {
    private gzjdList = new Array;
    private gzjdInfoList = new Array;
    private init_gzjdInfoList = new Array;
    private isShow1: boolean = true;
    private fjList: any;
    private breadcrumb: any;
    private msgs: any;
    private postSave = new Object;
    private fzjlId: any;      // 选择导航栏的id
    private active_jd = new Active_jd(); // 当前选中阶段
    private savePd: boolean = true;

    @ViewChild('ngModel') projectForm: NgForm;

    constructor(private HttpService: HttpService, private projectInfo: ProjectInfoService) {
        this.breadcrumb = [
            {label: '首页', routerLink: '/engmang'},
            {label: '移民安置前期工作进度', routerLink: `/engmang/ProjectProposal/${this.projectInfo.project.code}`},
        ];


    }


    ngOnInit() {
        this.postSave['listYmazAdd'] = [];
        this.postSave['listYmazEdit'] = [];
        this.postSave['listFjDel'] = [];
        this.postSave['listFjAdd'] = [];

        console.log(this.projectInfo);
        // this.projectInfo.project.code = 'S000001';   // 为了便于测试
        // this.projectInfo.project.ssxtdm = 'X000001';   // 为了便于测试
        // this.projectInfo.project.id = "5500313009C9455087772414D8E38E21"; // 为了便于测试
        // this.projectInfo.project.ssgcgkjbxxId = "F852573AF8FA447BAC53EE76296314F6";
        this.HttpService.get(`/zdk/getZdkByTableAndColumn?tableName=A_YMAZQQGZJZQK&column=SSYMAZQQGZFLDM&gcdm=${this.projectInfo.project.code}&xzqhdm=000000000000000`)
            .then((data) => {
                console.log(data);
                let arr = data['returnObject'];
                this.gzjdList = arr.sort(this.zdySort(arr));

                console.log(this.gzjdList);
                console.log(this.gzjdList[0].dm);
                this.HttpService.get(`ymazqqgzjzqk/get?code=${this.projectInfo.project.code}`)
                    .then((data) => {
                        console.log(data['returnObject']);
                        if (data['returnObject'].length != 0) {
                            this.gzjdInfoList = data['returnObject'];
                            this.init_gzjdInfoList = JSON.parse(JSON.stringify(data['returnObject']));
                            this.gzjdList[0]['active'] = true;
                            for (let item of this.gzjdInfoList) {
                                if (item.ssymazqqgzfldm == this.gzjdList[0].dm) {
                                    this.active_jd = item;
                                    this.active_jd.pzrq = parseInt(item.pzrq);
                                    this.fjList = this.active_jd['listFj'];
                                    this.fzjlId = this.active_jd['id'];
                                }
                            }
                            this.addHasTrue(this.gzjdInfoList, this.gzjdList);
                        }

                        console.log(this.gzjdList);
                        console.log(this.active_jd);

                    });
            });

    }


    save() {
        console.log(this.gzjdInfoList);
        console.log(this.init_gzjdInfoList);
        this.compareList(this.gzjdInfoList, this.init_gzjdInfoList);
        console.log(this.postSave);
        this.pdSameBt();
        if (this.savePd) {
            this.HttpService.post('ymazqqgzjzqk/save', this.postSave)
                .then((data) => {
                    if (data['success'] == true) {

                        this.msgs = [];
                        this.msgs.push({severity: 'success', summary: '填入提醒', detail: '数据保存成功'});
                        this.postSave = new Object();
                        this.postSave['listYmazAdd'] = [];
                        this.postSave['listYmazEdit'] = [];
                        this.postSave['listFjDel'] = [];
                        this.postSave['listFjAdd'] = [];
                        this.HttpService.get(`ymazqqgzjzqk/get?code=${this.projectInfo.project.code}`)
                            .then((data) => {
                                this.gzjdList.forEach((item, key, arr) => {
                                    item.active = false;
                                });
                                this.gzjdInfoList = data['returnObject'];
                                this.init_gzjdInfoList = JSON.parse(JSON.stringify(data['returnObject']));
                                this.gzjdList[0]['active'] = true;
                                for (let item of this.gzjdInfoList) {
                                    if (item.ssymazqqgzfldm == this.gzjdList[0].dm) {
                                        this.active_jd = item;
                                        this.active_jd.pzrq = parseInt(item.pzrq);
                                        this.fjList = this.active_jd['listFj'];
                                    }
                                }
                                this.addHasTrue(this.gzjdInfoList, this.gzjdList);
                                console.log(this.gzjdList);
                                console.log(this.active_jd);

                            });
                    } else {
                        this.msgs = [];
                        this.msgs.push({severity: 'error', summary: '填入提醒', detail: data['errorMessage']});
                    }


                });
        }


    }


    //选择
    check(event) {
        event.isCheck = event.isCheck ? false : true;
    }

    // x修改批准日期
    getPzrqDate(event) {
        console.log(event);
        this.active_jd.pzrq = event;

    }

    selectItem(item) {
        this.gzjdList.forEach((item, key, arr) => {
            item.active = false;
        });
        item.active = true;
        this.activeFn(this.gzjdInfoList, item.dm);

        console.log(this.gzjdInfoList);
    }

    // 清空所有
    clearArr() {
        console.log("清空所有");

        this.postSave['listYmazAdd'] = null;
        this.postSave['listFjAdd'] = null;
        this.gzjdInfoList.forEach((item, key, arr) => {
            console.log(item);


            for (let key in item) {

                if (key == 'listFj') {
                    for (let key2 in item['listFj']) {
                        let lsObj = {
                            id: item['listFj'][key2]['id']
                        };
                        this.postSave['listFjDel'].push(lsObj);
                    }
                }
                item["pzdw"] = "";
                item["pzrq"] = "";
                item["pzwh"] = "";
                item["bz"] = "";


            }
        });
        this.fjList = [];
        console.log(this.gzjdInfoList);

        console.log(this.init_gzjdInfoList);
        this.compareList(this.gzjdInfoList, this.init_gzjdInfoList);
        console.log(this.postSave);


    }

    onBasicUploadAuto(event) {
        console.log(event);
        console.log(this.fjList);
        console.log(this.fzjlId);
        if (!this.fjList) {
            this.fjList = [];
            this.active_jd['listFjAdd'] = [];

        }
        let response = JSON.parse(event.xhr.response)['returnObject'];
        response['fj']['ssxtdm'] = this.projectInfo.project.ssxtdm;
        response['fj']['ssgcdm'] = this.projectInfo.project.code;
        response['fj']['fzjlId'] = this.fzjlId;
        response['fjwj']['ssxtdm'] = this.projectInfo.project.ssxtdm;
        response['fjwj']['ssgcdm'] = this.projectInfo.project.code;
        console.log(response);
        if (this.fzjlId) {
            this.postSave['listFjAdd'].push(response);
        } else {
            this.active_jd['listFjAdd'].push(response);
        }

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
        this.fjList.push(imgRsoponse);
        this.pdSameBt();
        console.log(this.fjList);
    }

    //判断是否有重名
    pdSameBt() {
        console.log(this.fjList);
        this.savePd = true;
        if (this.fjList) {
            for (let item of this.fjList) {
                for (let item2 of this.fjList) {
                    if (item.url !== item2.url) {
                        if (item.bt === item2.bt) {
                            console.log(item.bt);
                            this.msgs = [];
                            this.msgs.push({severity: 'error', summary: '填入提醒', detail: '附件标题严禁重复'});
                            console.log("存在重复值");
                            this.savePd = false;
                        }
                    }
                }
            }
        }
    }

    //删除全部勾选的
    delCheck() {
        console.log(this.fjList);

        for (let i = 0; i < this.fjList.length; i++) {
            if (this.fjList[i]['isCheck'] == true) {
                if (this.fjList[i]["id"]) {
                    let lsObj = {id: this.fjList[i].id};
                    this.postSave['listFjDel'].push(lsObj);
                } else {
                    this.delFjAdd(this.postSave['listFjAdd'], this.fjList[i]['url']);
                }
                this.fjList.splice(i, 1);
                i--;
            }
        }
    }

    // 删除附件新增中存的数据
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

    //删除图片
    delImg(event) {
        console.log(this.fjList);
        if (event.id) {
            let lsObj = {id: event.id};
            this.postSave['listFjDel'].push(lsObj);
        } else {
            this.delFjAdd(this.postSave['listFjAdd'], event.url);
        }
        this.detailTableList(this.fjList, event.url);
    }

    //修改图片标题
    changeImgBt(url, bt) {
        console.log(url);
        console.log(bt);
        console.log(this.postSave['listFjAdd']);

        for (let item of this.postSave['listFjAdd']) {
            console.log(item);
            if (item.fjwj.wjcfxdml === url) {
                console.log("修改该bt");
                item.fj.bt = bt;
            }
        }
    }

    showAll(i) {
        if (this.isShow1) {
            this.isShow1 = false;
        } else {
            this.isShow1 = true;
        }
    }

    // 自定义排序
    zdySort(arr) {
        return function (a, b) {
            return a.xh - b.xh;
        };
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

    // 获取到当前激活项
    activeFn(arr, dm) {
        console.log(arr);
        let bj = true;
        let obj = {};
        for (let item of arr) {
            if (item.ssymazqqgzfldm == dm) {
                this.active_jd = item;
                this.active_jd.pzrq = parseInt(item.pzrq);
                this.fjList = this.active_jd['listFj'];
                this.fzjlId = item.id;
                bj = false;
            }
        }
        console.log(bj);
        //改为新增项
        if (bj) {
            obj['ssxtdm'] = this.projectInfo.project.ssxtdm;
            obj['ssgcdm'] = this.projectInfo.project.code;
            obj['ssgcgkjbxxId'] = this.projectInfo.project.ssgcgkjbxxId;
            obj['ssymazqqgzfldm'] = dm;
            obj['pzdw'] = null;
            obj['pzrq'] = null;
            obj['pzwh'] = null;
            obj['bz'] = null;
            this.gzjdInfoList.push(obj);
            this.active_jd = this.gzjdInfoList[this.gzjdInfoList.length - 1];
            this.active_jd.pzrq = parseInt(this.gzjdInfoList[this.gzjdInfoList.length - 1].pzrq);
            this.fjList = this.active_jd['listFj'];
            this.fzjlId = null;
        }

    }

    // 为已经完成的项目(导航使用)增加字段
    addHasTrue(arr, arr2) {
        for (let list of arr) {
            for (let item of arr2) {
                if (list.ssymazqqgzfldm == item.dm) {
                    item.hasTrue = true;
                }
            }
        }
        return arr2;
    }

    // 用来比较两个数组的不同
    compareList(arr, init_arr) {
        for (let item of arr) {
            if (item.id) {
                for (let item2 of init_arr) {
                    if (item.id == item2.id) {
                        //修改
                        let lsObj = {};
                        for (let key in item) {
                            lsObj['id'] = item.id;
                            if (item[key] != item2[key]) {
                                lsObj[key] = item[key];
                                delete lsObj['listFj'];
                            }
                        }
                        this.postSave['listYmazEdit'].push(lsObj);

                    }
                }
            } else {
                //这位新增
                this.postSave['listYmazAdd'].push(item);

            }
        }
    }

}

export class Active_jd {
    ssxtdm: string;
    ssgcdm: string;
    ssgcgkjbxxId: string;
    ssymazqqgzfldm: string;
    pzdw: string;
    pzrq: number;
    pzwh: string;
    bz: string;
}
