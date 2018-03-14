import {Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpService} from "../../../../service/http-service";
import {MenuItem, Message, SelectItem} from 'primeng/primeng';
import {flyIn} from "../../../../animations/fly-in";
import {HjbxxModel} from "./Hjbxx.model";
import {alertModelInfo} from "../alertModelInfo";
import {SelectListHttpService} from "../../../../service/select-list-http.service";

import {PersonComponent} from "./list/person/person.component";
import {HousesComponent} from "./list/houses/houses.component";
import {DecorationComponent} from "./list/decoration/decoration.component";
import {FsssComponent} from './list/fsss/fsss.component';
import {LandComponent} from './list/land/land.component';
import {LandOtherComponent} from './list/land-other/land-other.component';
import {TreesComponent} from "./list/trees/trees.component";
import {WaterComponent} from "./list/water/water.component";
import {GraveComponent} from './list/grave/grave.component';
import {QsrComponent} from './list/qsr/qsr.component';
import {JtgsjbxqComponent} from './list/jtgsjbxq/jtgsjbxq.component';
import {ShebeiComponent} from './list/shebei/shebei.component';

import {SheshiComponent} from './list/sheshi/sheshi.component';
import {NfyssjbqkComponent} from './list/nfyssjbqk/nfyssjbqk.component';
import {FyssComponent} from './list/fyss/fyss.component';
import {DwqbqkComponent} from './list/dwqbqk/dwqbqk.component';
import {GykqyxqComponent} from './list/gykqyxq/gykqyxq.component';
import {TljbxxComponent} from './list/tljbxx/tljbxx.component';
import {GljbxxComponent} from './list/gljbxx/gljbxx.component';
import {QhjbxxComponent} from './list/qhjbxx/qhjbxx.component';
import {HdjbxxComponent} from './list/hdjbxx/hdjbxx.component';
import {GkjbxxComponent} from './list/gkjbxx/gkjbxx.component';

import {MtjbxxComponent} from './list/mtjbxx/mtjbxx.component';
import {SbdgcjbxxComponent} from './list/sbdgcjbxx/sbdgcjbxx.component';
import {DxgcjbxxComponent} from './list/dxgcjbxx/dxgcjbxx.component';
import {GbdsjbxxComponent} from './list/gbdsjbxx/gbdsjbxx.component';
import {GdgcjbxxComponent} from './list/gdgcjbxx/gdgcjbxx.component';
import {SlsdgcjbxxComponent} from './list/slsdgcjbxx/slsdgcjbxx.component';
import {KczyjbxxComponent} from './list/kczyjbxx/kczyjbxx.component';
import {WwgjjbxxComponent} from './list/wwgjjbxx/wwgjjbxx.component';
import {SwqxzjbxxComponent} from './list/swqxzjbxx/swqxzjbxx.component';
import {QtzxjbxxComponent} from './list/qtzxjbxx/qtzxjbxx.component';
import {DataProcessingService} from "../../../../service/dataProcessing.service";
import {SearchService} from "../../../../service/search.service";


@Component({
    selector: 'app-swzb-person',
    templateUrl: './swzb-person.component.html',
    styleUrls: ['./swzb-person.component.css'],
    animations: [flyIn],
    providers: [SearchService]
})
export class SwzbPersonComponent implements OnInit {
    private selectList = new Array;
    public hjbxx = new HjbxxModel;
    public info: any;
    public type: string;
    private showBoottom: boolean = false;
    private showTOP: boolean = false;
    private childrenModel: any;
    msgs: Message[] = [];
    Breadcrumb: MenuItem[];
    types1: SelectItem[];
    types2: SelectItem[];
    navList = new Array;
    public showqqq: boolean = true;
    isShowDcfw: boolean = false;
    moreInput: boolean = false;
    moreText: string = "显示更多内容";
    private whetherDisabled: boolean;
    private avtiveName: any;
    public selectedType1: string;
    public selectedType2: string;
    public isShowArea: boolean = false;

    public isDisabled: boolean = true;
    private alertModelInfo: alertModelInfo = new alertModelInfo;
    public hcylb;
    public qshflId;

    private ssgcdm: string;
    private ssxzqhdm: string;


    //  初始化的HJBXX
    private init_hjbxx_data;

    //   提交是的数据结构
    private postObject = new Object;

    //  子组件初始化的值

    public init_trees_data;
    public init_water_data;
    public init_houses_data;
    public init_fsss_data;
    public init_land_data;
    public init_land_other_data;
    public init_person_data;
    public init_decor_data;
    public init_grave_data;

    //  保存子组件data数据
    public trees_data;
    public water_data;
    public houses_data;
    public grave_data;
    public fsss_data;
    public land_data;
    public land_other_data;
    public decor_data;

    //标记第一次加载
    public bj_houses_data = 1;
    public bj_decor_data = 1;
    public bj_water_data = 1;
    public bj_fsss_data = 1;
    public bj_land_data = 1;
    public bj_trees_data = 1;
    public bj_land_other_data = 1;


    //  子组件中修改过的真实数据

    public update_trees_data;
    public update_water_data;
    public update_houses_data;
    public update_grave_data;
    public update_fsss_data;
    public update_land_data;
    public update_land_other_data;
    public update_person_data;
    public update_decor_data;


    //  子组件中准备删除的真实数据
    public del_trees_data;
    public del_water_data;
    public del_houses_data;
    public del_grave_data;
    public del_fsss_data;
    public del_land_data;
    public del_land_other_data;
    public del_person_data;
    public del_decor_data;

    // 子组件中准备新增的真实数据
    public add_trees_data;
    public add_water_data;
    public add_houses_data;
    public add_grave_data;
    public add_fsss_data;
    public add_land_data;
    public add_land_other_data;
    public add_person_data;
    public add_decor_data;

    private gzjd = new Array;
    private zydlList: any;
    private dcfwList: any;
    private def_jddm: string;//  默认阶段代码

    private TjpdValue: boolean = true;   // 提交的时候的提醒
    private TjHjbxxValue: boolean = true;// 提交的对户基本信息判断

    //  做记录储存最终需要提交的结果
    //  人口
    private listHcyAdd: any;
    private listHcyDel: any;
    private listHcyEdit: any;
    //  房屋
    private listFwAdd: any;
    private listFwDel: any;
    private listFwEdit: any;
    //  房屋分类
    private listFwflmxAdd: any;
    private listFwflmxDel: any;
    private listFwflmxEdit: any;
    //   房屋规格明细
    private listFwggmxAdd: any;
    private listFwggmxDel: any;
    private listFwggmxEdit: any;
    // 房屋装修
    private listFwzxAdd: any;
    private listFwzxDel: any;
    private listFwzxEdit: any;
    //  房屋装修分类明细
    private listFwzxflmxAdd: any;
    private listFwzxflmxDel: any;
    private listFwzxflmxEdit: any;
    //  房屋装修规格明细
    private listFwzxggmxAdd: any;
    private listFwzxggmxDel: any;
    private listFwzxggmxEdit: any;
    // 附属设施
    private listFsssAdd: any;
    private listFsssDel: any;
    private listFsssEdit: any;
    //  附属设施分类明细
    private listFsssflmxAdd: any;
    private listFsssflmxDel: any;
    private listFsssflmxEdit: any;
    // 附属设施规格明细
    private listFsssggmxAdd: any;
    private listFsssggmxDel: any;
    private listFsssggmxEdit: any;
    //  土地
    private listTdAdd: any;
    private listTdDel: any;
    private listTdEdit: any;
    //  土地分类明细
    private listTdflmxAdd: any;
    private listTdflmxDel: any;
    private listTdflmxEdit: any;

    private listTdggmxAdd; // 土地规格明细-新增
    private listTdggmxDel; // 土地规格明细-删除
    private listTdggmxEdit; // 土地规格明细-修改

    private listTdfzwAdd; // 土地附着物-新增
    private listTdfzwDel; // 土地附着物-删除
    private listTdfzwEdit; // 土地附着物-修改

    private listTdfzwflmxAdd; // 土地附着物分类明细-新增
    private listTdfzwflmxDel; // 土地附着物分类明细-删除
    private listTdfzwflmxEdit; // 土地附着物分类明细-修改

    private listTdfzwggmxAdd; // 土地附着物规格明细-新增
    private listTdfzwggmxDel; // 土地附着物规格明细-删除
    private listTdfzwggmxEdit; // 土地附着物规格明细-修改

    private listLxgmAdd; // 零星果木-新增
    private listLxgmDel; // 零星果木-删除
    private listLxgmEdit; // 零星果木-修改

    private listLxgmflmxAdd; // 零星果木分类明细-新增
    private listLxgmflmxDel; // 零星果木分类明细-删除
    private listLxgmflmxEdit; // 零星果木分类明细-修改

    private listFmAdd; // 坟墓-新增
    private listFmDel; // 坟墓-删除
    private listFmEdit; // 坟墓-修改

    private listXxzxAdd; // 小型水利水电（小型专项）-新增
    private listXxzxDel; // 小型水利水电（小型专项）-删除
    private listXxzxEdit; // 小型水利水电（小型专项）-修改

    private listXxzxflmxAdd; // 小型水利水电（小型专项）分类明细-新增
    private listXxzxflmxDel; // 小型水利水电（小型专项）分类明细-删除
    private listXxzxflmxEdit; // 小型水利水电（小型专项）分类明细-修改

    private listXxzxggmxAdd; // 小型水利水电（小型专项）规格明细-新增
    private listXxzxggmxDel; // 小型水利水电（小型专项）规格明细-删除
    private listXxzxggmxEdit; // 小型水利水电（小型专项）规格明细-修改


    @ViewChild('room', {read: ViewContainerRef}) ModelRoom: ViewContainerRef;


    constructor(private selectListSevice: SelectListHttpService, private searchService: SearchService, private dataProcesing: DataProcessingService, private HttpService: HttpService, private AlertModel: ComponentFactoryResolver, private route: ActivatedRoute, private router: Router) {
        this.types1 = [];
        this.types1.push({label: '是', value: '1'});
        this.types1.push({label: '否', value: '0'});
        this.types2 = [];
        this.types2.push({label: '是', value: '1'});
        this.types2.push({label: '否', value: '0'});
    }

    ngOnInit() {
        console.log(this.type);
        console.log(this.info);
        console.log(this.qshflId);
        //  所属行政区划代码和工程代码
        if (this.type == 'add') {
            this.ssgcdm = this.qshflId.ssgcdm;
            this.ssxzqhdm = this.qshflId.ssxzqhdm;

        } else if (this.type == 'rew') {
            this.ssgcdm = this.info.ssgcdm;
            this.ssxzqhdm = this.info.ssxzqhdm;
        } else {
            this.ssgcdm = this.info.ssgcdm;
            this.ssxzqhdm = this.info.ssxzqhdm;
        }

        //  获取户类别代码
        this.HttpService.get(`qsrsjswzb/listQsrlb`)
            .then((res) => {
                let lsArr = this.searchService.searchByRegExp(this.qshflId.id, res['returnObject'], "id");
                console.log(lsArr);
                this.hjbxx.hlbdm = lsArr[0].dm;
                this.hjbxx.hlbmc = lsArr[0].mc;
            });
        //  请求工作阶段列表
        this.HttpService.get(`zbflpz/listGzjd`)
            .then((res) => {
                console.log(res['returnObject']);
                this.gzjd = res['returnObject'];
            });
        // 默认阶段代码
        this.def_jddm = this.qshflId.jddm;
        this.avtiveName = 'person';

        // 获取专业大类
        this.selectListSevice.getSelectList('B_HJBXX', 'ZYDLDM', this.ssgcdm, this.ssxzqhdm).then(data => {
            this.zydlList = data;
        });

        console.log(this.ssxzqhdm, this.ssgcdm);
        switch (this.type) {
            case 'view':
                //  循环出来导航栏,
                this.HttpService.get(`qsrsjswzb/listQsrsjzb?ssgcdm=${this.ssgcdm}&ssxzqhdm=${this.ssxzqhdm}&qsrlxzdxId=${this.qshflId.id}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.navList = res['returnObject'];
                    });
                this.HttpService.get(`/jmh/show?id=${this.info.id}`)
                    .then(res => {
                        console.log(res);
                        this.hjbxx = res['returnObject']['bHjbxx'];
                        this.hcylb = res['returnObject']['listHcy'];
                    });
                break;
            case 'add':
                //  循环出来导航栏,
                this.HttpService.get(`qsrsjswzb/listQsrsjzb?ssgcdm=${this.ssgcdm}&ssxzqhdm=${this.ssxzqhdm}&qsrlxzdxId=${this.qshflId.id}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.navList = res['returnObject'];
                        const person = this.AlertModel.resolveComponentFactory(PersonComponent);
                        const person2 = this.ModelRoom.createComponent(person);
                        person2.instance.qshflId = this.qshflId;
                        person2.instance.type = this.type;

                        this.update_person_data = person2.instance.update_data;
                        this.del_person_data = person2.instance.del_data;
                        this.add_person_data = person2.instance.add_data;
                    });
                //   专业大类列表
                // this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HJBXX&column=ZYDLDM&gcdm=${this.qshflId.ssgcdm}&xzqhdm=${this.qshflId.ssxzqhdm}`)
                //     .then((res) => {
                //         console.log(res['returnObject']);
                //         this.zydlList = this.dataProcesing.replaceChildlValue(res['returnObject'], 'mc', 'label', 'dm', 'value')
                //     });
                //  所属系统代码后期使用
                this.postObject['bHjbxx'] = {};

                this.hjbxx.ssxtdm = "X000001";
                this.hjbxx.ssgcdm = this.qshflId.ssgcdm;
                this.hjbxx.jddm = this.qshflId.jddm;
                this.hjbxx.ssxzqhdm = this.qshflId.ssxzqhdm;


                break;
            case 'rew':
                //  循环出来导航栏,

                this.HttpService.get(`qsrsjswzb/listQsrsjzb?ssgcdm=${this.ssgcdm}&ssxzqhdm=${this.ssxzqhdm}&qsrlxzdxId=${this.qshflId.id}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.navList = res['returnObject'];
                    });
                //   专业大类列表


                this.HttpService.get(`/jmh/show?id=${this.info.id}`)
                    .then(res => {
                        this.init_person_data = JSON.parse(JSON.stringify(res['returnObject']));
                        this.init_hjbxx_data = JSON.parse(JSON.stringify(res['returnObject']['bHjbxx']));
                        console.log(this.init_hjbxx_data);
                        this.hjbxx = res['returnObject']['bHjbxx'];
                        this.hcylb = res['returnObject']['listHcy'];

                        const alert = this.AlertModel.resolveComponentFactory(PersonComponent);
                        const alert2 = this.ModelRoom.createComponent(alert);
                        alert2.instance.childInfo = this.hjbxx;
                        alert2.instance.childInfo2 = this.hcylb;
                        alert2.instance.type = this.type;
                        alert2.instance.update_data = Array();
                        alert2.instance.qshflId = this.hjbxx;
                        alert2.instance.del_data = Array();

                        alert2.instance.init_person_data = this.init_person_data;

                        this.update_person_data = alert2.instance.update_data;
                        this.del_person_data = alert2.instance.del_data;
                        this.add_person_data = alert2.instance.add_data;

                    });
                break;
        }
        this.selectList = [
            {label: '农村部分', name: '农村部分', value: '0'},
            {label: '县城部分', name: '县城部分', value: '1'},
            {label: '集镇部分', name: '集镇部分', value: '2'},
        ];


    }

    ngAfterViewInit() {
    }

    //  是否空挂户
    selectedTypea(e): void {
        console.log(e);
    }

    //  是否线外
    selectedTypea2(e): void {
        console.log(e);
    }


    showAreaBlock(): void {
        if (this.isShowArea) {
            this.isShowArea = false;
        } else {
            this.isShowArea = true;
        }
    }

    getZydl(index) {
        console.log(index);
        this.hjbxx.zydldm = index;
    }

    showTypeBlock() {

        if (!this.dcfwList) {

            this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HJBXX&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                .then((res) => {
                    console.log(res['returnObject']);
                    this.dcfwList = res['returnObject'];
                });
        }
        if (this.isShowDcfw) {
            this.isShowDcfw = false;
        } else {
            this.isShowDcfw = true;
        }
    }

    closeBottom() {
        if (this.showTOP == false) {
            this.showTOP = true;
        }
    }


    showMoreInput() {

        if (this.moreInput) {
            this.moreInput = false;
            this.moreText = "显示更多内容";
        } else {
            this.moreInput = true;
            this.moreText = "隐藏更多内容";
        }
    }

    save() {
        console.log(this.update_person_data);
        console.log(this.update_person_data);
        console.log(this.del_person_data);
        console.log(this.add_person_data);
        console.log(this.hjbxx);
        console.log(this.postObject);
        //  1:如果有为新增的话
        if (this.type === 'add') {
            let hjbxxRew = this.hjbxx;
            //判断 add_person_data里面是否有信息，如果没有的话，则把父信息默认到子组件
            this.add_person_data.forEach((item, key, arr) => {
                console.log(item);
                for (let i in item) {
                    console.log(i)
                    if (item.mc == "") {
                        item.mc = this.hjbxx.hzxm;
                    }
                    if (item.yhzgxdm == "") {
                        item.yhzgxdm = "HHR-01"
                    }
                    item.ssxtdm = this.hjbxx.ssxtdm;
                    item.ssgcdm = this.hjbxx.ssgcdm;
                    item.zydldm = this.hjbxx.zydldm;
                    item.dcfwdm = this.hjbxx.dcfwdm;
                    item.jddm = this.hjbxx.jddm;
                    item.szxzqhdm = this.hjbxx.ssxzqhdm;
                    item.sfkgr = this.hjbxx.sfkgh;
                }
            });
            console.log(this.add_person_data);
            console.log(hjbxxRew);
            this.postObject['bHjbxx'] = hjbxxRew;
            this.postObject['listHcyAdd'] = this.add_person_data;
            this.bhjbxxBT(hjbxxRew);
            if (this.TjHjbxxValue) {
                this.HttpService.post('/jmh/save', this.postObject)
                    .then((data) => {

                        if (data['success'] === true) {
                            this.msgs = [];
                            this.msgs.push({severity: 'success', summary: '填入提醒', detail: '数据保存成功'});

                        } else {
                            this.msgs = [];
                            this.msgs.push({severity: 'error', summary: '保存失败', detail: '请联系管理员'});

                        }
                    })
            }

        }

        //  2:如果为修改的话
        if (this.type === 'rew') {


            let hjbxxRew = this.saveHjbxxChange(this.hjbxx, this.init_hjbxx_data);
            console.log(hjbxxRew);
            if (Object.keys(hjbxxRew).length !== 0) {
                this.postObject['bHjbxx'] = hjbxxRew;
            }

            //  去除中间空项
            this.update_person_data.forEach((item, key, arr) => {
                console.log(item);

                if (Object.keys(item).length > 1) {
                    this.postObject['listHcyEdit'] = [];
                    this.postObject['listHcyEdit'].push(item);
                }
            });

            //  如果存在add的话
            if (Object.keys(this.add_person_data).length !== 0) {
                console.log(this.add_person_data);
                this.postObject['listHcyAdd'] = [];
                this.add_person_data.forEach((item, key, arr) => {
                    if (Object.keys(item).length > 1) {
                        console.log(item);
                        item.ssxtdm = "X000001";
                        item.ssgcdm = this.qshflId.ssgcdm;
                        item.jddm = this.qshflId.jddm;
                        this.postObject['listHcyAdd'].push(item);
                    }
                })
            }

            //  如果有删除功能的话
            if (Object.keys(this.del_person_data).length !== 0) {
                console.log(this.del_person_data);
                this.postObject['listHcyDel'] = [];
                this.del_person_data.forEach((item, key, arr) => {

                    this.postObject['listHcyDel'].push(item);

                })
            }

            //  如果房屋有修改的话
            if (this.update_houses_data) {
                if (Object.keys(this.update_houses_data).length !== 0) {
                    console.log(this.update_houses_data);
                    this.postObject['listFwEdit'] = [];
                    this.update_houses_data.forEach((item, key, arr) => {
                        delete item.list;
                        this.postObject['listFwEdit'].push(item);
                    })
                }
            }

            //  如果房屋有增长的话
            if (this.add_houses_data) {
                if (Object.keys(this.add_houses_data).length !== 0) {
                    console.log(this.add_houses_data);
                    this.postObject['listFwAdd'] = [];
                    this.add_houses_data.forEach((item, key, arr) => {
                        item.ssxtdm = "X000001";
                        item.ssgcdm = this.qshflId.ssgcdm;
                        item.jddm = this.qshflId.jddm;
                        delete item.list;
                        delete item.dcfw_mc;
                        console.log(item);
                        let ls = {};
                        for (let i in item) {
                            ls['qsrId'] = item['id'];
                            if (i != 'id') {
                                ls[i] = item[i];
                            }


                        }
                        this.postObject['listFwAdd'].push(ls);
                    })
                }
            }


            //  如果房屋有删除的话
            if (this.del_houses_data) {
                if (Object.keys(this.del_houses_data).length !== 0) {
                    console.log(this.del_houses_data);
                    this.postObject['listFwDel'] = [];
                    this.del_houses_data.forEach((item, key, arr) => {
                        this.postObject['listFwDel'].push(item);
                    })
                }
            }

            //  如果装修有修改的话
            if (this.update_decor_data) {
                if (Object.keys(this.update_decor_data).length !== 0) {
                    console.log(this.update_decor_data);
                    this.postObject['listFwzxEdit'] = [];
                    this.update_decor_data.forEach((item, key, arr) => {
                        delete item.list;
                        this.postObject['listFwzxEdit'].push(item);
                    })
                }
            }

            //  如果装修有增长的话
            if (this.add_decor_data) {
                if (Object.keys(this.add_decor_data).length !== 0) {
                    console.log(this.add_decor_data);
                    this.postObject['listFwzxAdd'] = [];
                    this.postObject['listFwzxflmxAdd'] = [];
                    this.add_decor_data.forEach((item, key, arr) => {
                        item.ssxtdm = "X000001";
                        item.ssgcdm = this.qshflId.ssgcdm;
                        item.jddm = this.qshflId.jddm;
                        delete item.list;
                        delete item.dcfwmc;
                        delete item.jzzmj;

                        console.log(item);
                        let ls = {};
                        for (let i in item) {
                            ls['qsrId'] = item['id'];
                            if (i != 'id') {
                                ls[i] = item[i];
                            }
                        }
                        // let flmxAdd={};
                        // flmxAdd['ssxtdm']="X000001";
                        // flmxAdd['ssgcdm']= this.qshflId.ssgcdm;
                        // flmxAdd['ssfwjbxxId']= item['id'];
                        // this.postObject['listFwzxflmxAdd'].push(flmxAdd);
                        this.postObject['listFwzxAdd'].push(ls);
                    })
                }
            }


            //  如果装修有删除的话
            if (this.del_decor_data) {
                if (Object.keys(this.del_decor_data).length !== 0) {
                    console.log(this.del_decor_data);
                    this.postObject['listFwzxDel'] = [];
                    this.del_decor_data.forEach((item, key, arr) => {
                        this.postObject['listFwzxDel'].push(item);
                    })
                }
            }

            //  如果water有修改的话
            if (this.update_water_data) {
                if (Object.keys(this.update_water_data).length !== 0) {
                    console.log(this.update_water_data);
                    this.postObject['listXxzxEdit'] = [];
                    this.update_water_data.forEach((item, key, arr) => {
                        delete item.list;
                        this.postObject['listXxzxEdit'].push(item);
                    })
                }
            }

            //  如果water有增长的话
            if (this.add_water_data) {
                if (Object.keys(this.add_water_data).length !== 0) {
                    console.log(this.add_water_data);
                    this.postObject['listXxzxAdd'] = [];
                    this.postObject['listFwzxflmxAdd'] = [];
                    this.add_water_data.forEach((item, key, arr) => {
                        item.ssxtdm = "X000001";
                        item.ssgcdm = this.qshflId.ssgcdm;
                        item.jddm = this.qshflId.jddm;
                        delete item.list;
                        delete item.dcfwmc;
                        delete item.zsl;
                        delete item.qsrmc;
                        delete item.jzzmj;

                        console.log(item);
                        let ls = {};
                        for (let i in item) {
                            ls['qsrId'] = item['id'];
                            if (i != 'id') {
                                ls[i] = item[i];
                            }
                        }
                        // let flmxAdd={};
                        // flmxAdd['ssxtdm']="X000001";
                        // flmxAdd['ssgcdm']= this.qshflId.ssgcdm;
                        // flmxAdd['ssfwjbxxId']= item['id'];
                        // this.postObject['listFwzxflmxAdd'].push(flmxAdd);
                        this.postObject['listXxzxAdd'].push(ls);
                    })
                }
            }


            //  如果water有删除的话
            if (this.del_water_data) {
                if (Object.keys(this.del_water_data).length !== 0) {
                    console.log(this.del_water_data);
                    this.postObject['listXxzxDel'] = [];
                    this.del_water_data.forEach((item, key, arr) => {
                        this.postObject['listXxzxDel'].push(item);
                    })
                }
            }

            //  如果附属设施有修改的话
            if (this.update_fsss_data) {
                if (Object.keys(this.update_fsss_data).length !== 0) {
                    console.log(this.update_fsss_data);
                    this.postObject['listFsssEdit'] = [];
                    this.update_fsss_data.forEach((item, key, arr) => {
                        delete item.list;
                        this.postObject['listFsssEdit'].push(item);
                    })
                }
            }

            //  如果附属设施有增长的话
            if (this.add_fsss_data) {
                if (Object.keys(this.add_fsss_data).length !== 0) {
                    console.log(this.add_fsss_data);
                    this.postObject['listFsssAdd'] = [];
                    this.postObject['listFwzxflmxAdd'] = [];
                    this.add_fsss_data.forEach((item, key, arr) => {
                        item.ssxtdm = "X000001";
                        item.ssgcdm = this.qshflId.ssgcdm;
                        item.jddm = this.qshflId.jddm;
                        delete item.list;
                        delete item.dcfwmc;
                        delete item.jzzmj;

                        console.log(item);
                        let ls = {};
                        for (let i in item) {
                            ls['qsrId'] = item['id'];
                            if (i != 'id') {
                                ls[i] = item[i];
                            }
                        }
                        // let flmxAdd={};
                        // flmxAdd['ssxtdm']="X000001";
                        // flmxAdd['ssgcdm']= this.qshflId.ssgcdm;
                        // flmxAdd['ssfwjbxxId']= item['id'];
                        // this.postObject['listFwzxflmxAdd'].push(flmxAdd);
                        this.postObject['listFsssAdd'].push(ls);
                    })
                }
            }


            //  如果附属设施有删除的话
            if (this.del_fsss_data) {
                if (Object.keys(this.del_fsss_data).length !== 0) {
                    console.log(this.del_fsss_data);
                    this.postObject['listFsssDel'] = [];
                    this.del_fsss_data.forEach((item, key, arr) => {
                        this.postObject['listFsssDel'].push(item);
                    })
                }
            }

            //  如果土地有修改的话
            if (this.update_land_data) {
                if (Object.keys(this.update_land_data).length !== 0) {
                    console.log(this.update_land_data);
                    this.postObject['listTdEdit'] = [];
                    this.update_land_data.forEach((item, key, arr) => {
                        delete item.list;
                        this.postObject['listTdEdit'].push(item);
                    })
                }
            }

            //  如果土地有增长的话
            if (this.add_land_data) {
                if (Object.keys(this.add_land_data).length !== 0) {
                    console.log(this.add_land_data);
                    this.postObject['listTdAdd'] = [];
                    this.postObject['listFwzxflmxAdd'] = [];
                    this.add_land_data.forEach((item, key, arr) => {
                        item.ssxtdm = "X000001";
                        item.ssgcdm = this.qshflId.ssgcdm;
                        item.jddm = this.qshflId.jddm;
                        delete item.list;
                        delete item.dcfwmc;
                        delete item.jzzmj;

                        console.log(item);
                        let ls = {};
                        for (let i in item) {
                            ls['qsrId'] = item['id'];
                            if (i != 'id') {
                                ls[i] = item[i];
                            }
                        }
                        // let flmxAdd={};
                        // flmxAdd['ssxtdm']="X000001";
                        // flmxAdd['ssgcdm']= this.qshflId.ssgcdm;
                        // flmxAdd['ssfwjbxxId']= item['id'];
                        // this.postObject['listFwzxflmxAdd'].push(flmxAdd);
                        this.postObject['listTdAdd'].push(ls);
                    })
                }
            }


            //  如果土地有删除的话
            if (this.del_land_data) {
                if (Object.keys(this.del_land_data).length !== 0) {
                    console.log(this.del_land_data);
                    this.postObject['listTdDel'] = [];
                    this.del_land_data.forEach((item, key, arr) => {
                        this.postObject['listTdDel'].push(item);
                    })
                }
            }

            //  如果土地附着物有修改的话
            if (this.update_land_other_data) {
                if (Object.keys(this.update_land_other_data).length !== 0) {
                    console.log(this.update_land_other_data);
                    this.postObject['listTdfzwEdit'] = [];
                    this.update_land_other_data.forEach((item, key, arr) => {
                        delete item.list;
                        this.postObject['listTdfzwEdit'].push(item);
                    })
                }
            }

            //  如果土地附着物有增长的话
            if (this.add_land_other_data) {
                if (Object.keys(this.add_land_other_data).length !== 0) {
                    console.log(this.add_land_other_data);
                    this.postObject['listTdfzwAdd'] = [];
                    this.postObject['listFwzxflmxAdd'] = [];
                    this.add_land_other_data.forEach((item, key, arr) => {
                        item.ssxtdm = "X000001";
                        item.ssgcdm = this.qshflId.ssgcdm;
                        item.jddm = this.qshflId.jddm;
                        delete item.list;
                        delete item.dcfwmc;
                        delete item.jzzmj;

                        console.log(item);
                        let ls = {};
                        for (let i in item) {
                            ls['qsrId'] = item['id'];
                            if (i != 'id') {
                                ls[i] = item[i];
                            }
                        }
                        // let flmxAdd={};
                        // flmxAdd['ssxtdm']="X000001";
                        // flmxAdd['ssgcdm']= this.qshflId.ssgcdm;
                        // flmxAdd['ssfwjbxxId']= item['id'];
                        // this.postObject['listFwzxflmxAdd'].push(flmxAdd);
                        this.postObject['listTdfzwAdd'].push(ls);
                    })
                }
            }


            //  如果土地附着物有删除的话
            if (this.del_land_other_data) {
                if (Object.keys(this.del_land_other_data).length !== 0) {
                    console.log(this.del_land_other_data);
                    this.postObject['listTdfzwDel'] = [];
                    this.del_land_other_data.forEach((item, key, arr) => {
                        this.postObject['listTdfzwDel'].push(item);
                    })
                }
            }



            //  如果零星树木有修改的话
            if (this.update_trees_data) {
                if (Object.keys(this.update_trees_data).length !== 0) {
                    console.log(this.update_trees_data);
                    this.postObject['listLxgmEdit'] = [];
                    this.update_trees_data.forEach((item, key, arr) => {
                        delete item.list;
                        this.postObject['listLxgmEdit'].push(item);
                    })
                }
            }

            //  如果零星树木有增长的话
            if (this.add_trees_data) {
                if (Object.keys(this.add_trees_data).length !== 0) {
                    console.log(this.add_trees_data);
                    this.postObject['listLxgmAdd'] = [];
                    this.postObject['listFwzxflmxAdd'] = [];
                    this.add_trees_data.forEach((item, key, arr) => {
                        item.ssxtdm = "X000001";
                        item.ssgcdm = this.qshflId.ssgcdm;
                        item.jddm = this.qshflId.jddm;
                        delete item.list;
                        delete item.dcfwmc;
                        delete item.jzzmj;

                        console.log(item);
                        let ls = {};
                        for (let i in item) {
                            ls['qsrId'] = item['id'];
                            if (i != 'id') {
                                ls[i] = item[i];
                            }
                        }
                        // let flmxAdd={};
                        // flmxAdd['ssxtdm']="X000001";
                        // flmxAdd['ssgcdm']= this.qshflId.ssgcdm;
                        // flmxAdd['ssfwjbxxId']= item['id'];
                        // this.postObject['listFwzxflmxAdd'].push(flmxAdd);
                        this.postObject['listLxgmAdd'].push(ls);
                    })
                }
            }


            //  如果零星树木有删除的话
            if (this.del_trees_data) {
                if (Object.keys(this.del_trees_data).length !== 0) {
                    console.log(this.del_trees_data);
                    this.postObject['listLxgmDel'] = [];
                    this.del_trees_data.forEach((item, key, arr) => {
                        this.postObject['listLxgmDel'].push(item);
                    })
                }
            }


            if (Object.keys(this.postObject).length !== 0) {
                hjbxxRew['id'] = this.hjbxx.id;
                this.postObject['bHjbxx'] = hjbxxRew;

                if (this.postObject['listHcyAdd']) {
                    console.log(this.Tjpd(this.postObject['listHcyAdd']));
                }
                console.log(this.postObject);
                console.log(this.postObject['listHcyAdd']);

                // console.log(JSON.stringify(this.postObject));

                console.log(this.TjpdValue);
                if (this.TjpdValue) {
                    console.log("必填值全部都有了");
                    this.HttpService.post('/jmh/save', this.postObject)
                        .then((data) => {

                            if (data['success'] === true) {
                                this.msgs = [];
                                this.msgs.push({severity: 'success', summary: '填入提醒', detail: '数据保存成功'});
                            } else {
                                this.msgs = [];
                                this.msgs.push({severity: 'error', summary: '保存失败', detail: '数据保存成功'});
                            }
                        })
                }


            } else {
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: '填入提醒', detail: '没有任何数据修改'});
            }
        }


    }


    saveRouter(url, id) {
        this.avtiveName = url;
        const zblId = id;
        console.log(url, zblId);

        console.log(this.ModelRoom);
        this.ModelRoom.clear();
        this.childrenModel = this.AlertModel.resolveComponentFactory(PersonComponent);
        switch (url) {
            case 'person':
                const person = this.AlertModel.resolveComponentFactory(PersonComponent);
                const person2 = this.ModelRoom.createComponent(person);
                person2.instance.childInfo = this.hjbxx;
                person2.instance.childInfo2 = this.hcylb;
                person2.instance.type = this.type;
                person2.instance.init_person_data = this.init_person_data;

                if (this.type == 'add') {
                    person2.instance.qshflId = this.qshflId;
                } else if (this.type == 'rew') {
                    person2.instance.qshflId = this.hjbxx;
                }

                break;
            case 'houses':
                console.log(this.houses_data);
                if (this.houses_data == null) {
                    let params = `jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}&jmhId=${this.info.id

                        }&zblId=${zblId}`;


                    this.HttpService.get('fwjbxx/list?' + params).then((data) => {

                        this.init_houses_data = JSON.parse(JSON.stringify(data['returnObject']));
                        const houses = this.AlertModel.resolveComponentFactory(HousesComponent);
                        const houses2 = this.ModelRoom.createComponent(houses);

                        houses2.instance.childInfo = this.hjbxx;
                        houses2.instance.childInfo2 = this.hcylb;
                        houses2.instance.init_houses_data = this.init_houses_data;
                        houses2.instance.type = this.type;
                        this.update_houses_data = houses2.instance.update_houses_data;
                        this.del_houses_data = houses2.instance.del_houses_data;
                        this.add_houses_data = houses2.instance.add_houses_data;

                        houses2.instance.bj_houses_data = this.bj_houses_data;

                        this.houses_data = data;
                        houses2.instance.data = data;


                        if (this.type == 'add') {
                            houses2.instance.qshflId = this.qshflId;
                        } else if (this.type == 'rew') {
                            houses2.instance.qshflId = this.hjbxx;
                        }


                    });
                } else {

                    const houses = this.AlertModel.resolveComponentFactory(HousesComponent);
                    const houses2 = this.ModelRoom.createComponent(houses);

                    houses2.instance.init_houses_data = this.init_houses_data;
                    houses2.instance.type = this.type;

                    this.update_houses_data = houses2.instance.update_houses_data;
                    this.del_houses_data = houses2.instance.del_houses_data;
                    this.add_houses_data = houses2.instance.add_houses_data;
                    this.bj_houses_data = houses2.instance.bj_houses_data;
                    houses2.instance.childInfo = this.hjbxx;
                    houses2.instance.childInfo2 = this.hcylb;
                    houses2.instance.data = this.houses_data;

                    if (this.type == 'add') {
                        houses2.instance.qshflId = this.qshflId;
                    } else if (this.type == 'rew') {
                        houses2.instance.qshflId = this.hjbxx;
                    }
                }
                break;
            case 'decoration':
                if (this.decor_data == null) {
                    // const params = 'jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=S000001&xzqhdm=350526000000000&jmhId=7BCD3BE587394F4D969D3B0CC6225E95&zblId=2F0E8D93C2B74B2AA569A961F951741D';
                    let params: string;

                    params = `jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}&jmhId=${this.info.id}&zblId=${zblId}`;


                    this.HttpService.get('fwzxjbxx/list?' + params).then((data) => {
                        this.init_decor_data = JSON.parse(JSON.stringify(data['returnObject']));
                        const decor = this.AlertModel.resolveComponentFactory(DecorationComponent);
                        const decor2 = this.ModelRoom.createComponent(decor);

                        decor2.instance.childInfo = this.hjbxx;
                        decor2.instance.childInfo2 = this.hcylb;
                        decor2.instance.init_decor_data = this.init_decor_data;
                        decor2.instance.type = this.type;
                        this.update_decor_data = decor2.instance.update_decor_data;
                        this.del_decor_data = decor2.instance.del_decor_data;
                        this.add_decor_data = decor2.instance.add_decor_data;

                        decor2.instance.bj_decor_data = this.bj_decor_data;

                        this.decor_data = data;
                        decor2.instance.data = data;


                        if (this.type == 'add') {
                            decor2.instance.qshflId = this.qshflId;
                        } else if (this.type == 'rew') {
                            decor2.instance.qshflId = this.hjbxx;
                        }

                    });
                } else {
                    const decor = this.AlertModel.resolveComponentFactory(DecorationComponent);
                    const decor2 = this.ModelRoom.createComponent(decor);

                    decor2.instance.init_decor_data = this.init_decor_data;
                    decor2.instance.type = this.type;

                    this.update_decor_data = decor2.instance.update_decor_data;
                    this.del_decor_data = decor2.instance.del_decor_data;
                    this.add_decor_data = decor2.instance.add_decor_data;
                    this.bj_decor_data = decor2.instance.bj_decor_data;
                    decor2.instance.childInfo = this.hjbxx;
                    decor2.instance.childInfo2 = this.hcylb;
                    decor2.instance.data = this.decor_data;

                    if (this.type == 'add') {
                        decor2.instance.qshflId = this.qshflId;
                    } else if (this.type == 'rew') {
                        decor2.instance.qshflId = this.hjbxx;
                    }
                }


                break;
            case'fsss':
                if (this.fsss_data == null) {
                    let params = `jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}&jmhId=${this.info.id}&zblId=${zblId}`;


                    this.HttpService.get('fsssjbxx/list?' + params).then((data) => {
                        console.log(data);
                        this.init_fsss_data = JSON.parse(JSON.stringify(data['returnObject']));
                        const fsss = this.AlertModel.resolveComponentFactory(FsssComponent);
                        const fsss2 = this.ModelRoom.createComponent(fsss);

                        fsss2.instance.childInfo = this.hjbxx;
                        fsss2.instance.childInfo2 = this.hcylb;
                        fsss2.instance.init_fsss_data = this.init_fsss_data;
                        fsss2.instance.type = this.type;
                        this.update_fsss_data = fsss2.instance.update_fsss_data;
                        this.del_fsss_data = fsss2.instance.del_fsss_data;
                        this.add_fsss_data = fsss2.instance.add_fsss_data;

                        fsss2.instance.bj_fsss_data = this.bj_fsss_data;

                        this.fsss_data = data;
                        fsss2.instance.data = data;


                        if (this.type == 'add') {
                            fsss2.instance.qshflId = this.qshflId;
                        } else if (this.type == 'rew') {
                            fsss2.instance.qshflId = this.hjbxx;
                        }


                    });
                } else {

                    const fsss = this.AlertModel.resolveComponentFactory(FsssComponent);
                    const fsss2 = this.ModelRoom.createComponent(fsss);

                    fsss2.instance.init_fsss_data = this.init_fsss_data;
                    fsss2.instance.type = this.type;

                    this.update_fsss_data = fsss2.instance.update_fsss_data;
                    this.del_fsss_data = fsss2.instance.del_fsss_data;
                    this.add_fsss_data = fsss2.instance.add_fsss_data;
                    this.bj_fsss_data = fsss2.instance.bj_fsss_data;
                    fsss2.instance.childInfo = this.hjbxx;
                    fsss2.instance.childInfo2 = this.hcylb;
                    fsss2.instance.data = this.fsss_data;

                    if (this.type == 'add') {
                        fsss2.instance.qshflId = this.qshflId;
                    } else if (this.type == 'rew') {
                        fsss2.instance.qshflId = this.hjbxx;
                    }
                }
                break;
            case'land':
                if (this.land_data == null) {
                    let params = `jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}&jmhId=${this.info.id}&zblId=${zblId}`;


                    this.HttpService.get('tdjbxx/list?' + params).then((data) => {
                        console.log(data);
                        this.init_land_data = JSON.parse(JSON.stringify(data['returnObject']));
                        const land = this.AlertModel.resolveComponentFactory(LandComponent);
                        const land2 = this.ModelRoom.createComponent(land);

                        land2.instance.childInfo = this.hjbxx;
                        land2.instance.childInfo2 = this.hcylb;
                        land2.instance.init_land_data = this.init_land_data;
                        land2.instance.type = this.type;
                        this.update_land_data = land2.instance.update_land_data;
                        this.del_land_data = land2.instance.del_land_data;
                        this.add_land_data = land2.instance.add_land_data;

                        land2.instance.bj_land_data = this.bj_land_data;

                        this.land_data = data;
                        land2.instance.data = data;


                        if (this.type == 'add') {
                            land2.instance.qshflId = this.qshflId;
                        } else if (this.type == 'rew') {
                            land2.instance.qshflId = this.hjbxx;
                        }


                    });
                } else {

                    const land = this.AlertModel.resolveComponentFactory(LandComponent);
                    const land2 = this.ModelRoom.createComponent(land);

                    land2.instance.init_land_data = this.init_land_data;
                    land2.instance.type = this.type;

                    this.update_land_data = land2.instance.update_land_data;
                    this.del_land_data = land2.instance.del_land_data;
                    this.add_land_data = land2.instance.add_land_data;
                    this.bj_land_data = land2.instance.bj_land_data;
                    land2.instance.childInfo = this.hjbxx;
                    land2.instance.childInfo2 = this.hcylb;
                    land2.instance.data = this.land_data;

                    if (this.type == 'add') {
                        land2.instance.qshflId = this.qshflId;
                    } else if (this.type == 'rew') {
                        land2.instance.qshflId = this.hjbxx;
                    }
                }

                break;
            case'landother':
                if (this.land_other_data == null) {
                    let params = `jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}&jmhId=${this.info.id}&zblId=${zblId}`;

                    this.HttpService.get('tdfzwjbxx/list?' + params).then((data) => {
                        console.log(data);
                        this.init_land_other_data = JSON.parse(JSON.stringify(data['returnObject']));
                        const land_other = this.AlertModel.resolveComponentFactory(LandOtherComponent);
                        const land_other2 = this.ModelRoom.createComponent(land_other);

                        land_other2.instance.childInfo = this.hjbxx;
                        land_other2.instance.childInfo2 = this.hcylb;
                        land_other2.instance.init_land_other_data = this.init_land_other_data;
                        land_other2.instance.type = this.type;
                        this.update_land_other_data = land_other2.instance.update_land_other_data;
                        this.del_land_other_data = land_other2.instance.del_land_other_data;
                        this.add_land_other_data = land_other2.instance.add_land_other_data;

                        land_other2.instance.bj_land_other_data = this.bj_land_other_data;

                        this.land_other_data = data;
                        land_other2.instance.data = data;


                        if (this.type == 'add') {
                            land_other2.instance.qshflId = this.qshflId;
                        } else if (this.type == 'rew') {
                            land_other2.instance.qshflId = this.hjbxx;
                        }


                    });
                } else {

                    const land_other = this.AlertModel.resolveComponentFactory(LandOtherComponent);
                    const land_other2 = this.ModelRoom.createComponent(land_other);

                    land_other2.instance.init_land_other_data = this.init_land_other_data;
                    land_other2.instance.type = this.type;

                    this.update_land_other_data = land_other2.instance.update_land_other_data;
                    this.del_land_other_data = land_other2.instance.del_land_other_data;
                    this.add_land_other_data = land_other2.instance.add_land_other_data;
                    this.bj_land_other_data = land_other2.instance.bj_land_other_data;
                    land_other2.instance.childInfo = this.hjbxx;
                    land_other2.instance.childInfo2 = this.hcylb;
                    land_other2.instance.data = this.land_other_data;

                    if (this.type == 'add') {
                        land_other2.instance.qshflId = this.qshflId;
                    } else if (this.type == 'rew') {
                        land_other2.instance.qshflId = this.hjbxx;
                    }
                }
                break;
            case'trees':
                if (this.trees_data == null) {
                    // const params = 'jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=S000001&xzqhdm=350526000000000&jmhId=7BCD3BE587394F4D969D3B0CC6225E95&zblId=2F0E8D93C2B74B2AA569A961F951741D';
                    let params: string;

                    params = `jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}&jmhId=${this.info.id}&zblId=${zblId}`;


                    this.HttpService.get('fwzxjbxx/list?' + params).then((data) => {
                        this.init_trees_data = JSON.parse(JSON.stringify(data['returnObject']));
                        const trees = this.AlertModel.resolveComponentFactory(TreesComponent);
                        const trees2 = this.ModelRoom.createComponent(trees);

                        trees2.instance.childInfo = this.hjbxx;
                        trees2.instance.childInfo2 = this.hcylb;
                        trees2.instance.init_trees_data = this.init_trees_data;
                        trees2.instance.type = this.type;
                        this.update_trees_data = trees2.instance.update_trees_data;
                        this.del_trees_data = trees2.instance.del_trees_data;
                        this.add_trees_data = trees2.instance.add_trees_data;

                        trees2.instance.bj_trees_data = this.bj_trees_data;

                        this.trees_data = data;
                        trees2.instance.data = data;


                        if (this.type == 'add') {
                            trees2.instance.qshflId = this.qshflId;
                        } else if (this.type == 'rew') {
                            trees2.instance.qshflId = this.hjbxx;
                        }

                    });
                } else {
                    const trees = this.AlertModel.resolveComponentFactory(TreesComponent);
                    const trees2 = this.ModelRoom.createComponent(trees);

                    trees2.instance.init_trees_data = this.init_trees_data;
                    trees2.instance.type = this.type;

                    this.update_trees_data = trees2.instance.update_trees_data;
                    this.del_trees_data = trees2.instance.del_trees_data;
                    this.add_trees_data = trees2.instance.add_trees_data;
                    this.bj_trees_data = trees2.instance.bj_trees_data;
                    trees2.instance.childInfo = this.hjbxx;
                    trees2.instance.childInfo2 = this.hcylb;
                    trees2.instance.data = this.trees_data;

                    if (this.type == 'add') {
                        trees2.instance.qshflId = this.qshflId;
                    } else if (this.type == 'rew') {
                        trees2.instance.qshflId = this.hjbxx;
                    }
                }

                break;
            case'water':
                if (this.water_data == null) {
                    let params = `jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}&jmhId=${this.info.id

                        }&zblId=${zblId}`;


                    this.HttpService.get('xxzx/list?' + params).then((data) => {

                        this.init_water_data = JSON.parse(JSON.stringify(data['returnObject']));
                        const water = this.AlertModel.resolveComponentFactory(WaterComponent);
                        const water2 = this.ModelRoom.createComponent(water);

                        water2.instance.childInfo = this.hjbxx;
                        water2.instance.childInfo2 = this.hcylb;
                        water2.instance.init_water_data = this.init_water_data;
                        water2.instance.type = this.type;
                        this.update_water_data = water2.instance.update_water_data;
                        this.del_water_data = water2.instance.del_water_data;
                        this.add_water_data = water2.instance.add_water_data;

                        water2.instance.bj_water_data = this.bj_water_data;

                        this.water_data = data;
                        water2.instance.data = data;


                        if (this.type == 'add') {
                            water2.instance.qshflId = this.qshflId;
                        } else if (this.type == 'rew') {
                            water2.instance.qshflId = this.hjbxx;
                        }

                    });
                } else {
                    const water = this.AlertModel.resolveComponentFactory(WaterComponent);
                    const water2 = this.ModelRoom.createComponent(water);

                    water2.instance.init_water_data = this.init_water_data;
                    water2.instance.type = this.type;

                    this.update_water_data = water2.instance.update_water_data;
                    this.del_water_data = water2.instance.del_water_data;
                    this.add_water_data = water2.instance.add_water_data;
                    this.bj_water_data = water2.instance.bj_water_data;
                    water2.instance.childInfo = this.hjbxx;
                    water2.instance.childInfo2 = this.hcylb;
                    water2.instance.data = this.water_data;

                    if (this.type == 'add') {
                        water2.instance.qshflId = this.qshflId;
                    } else if (this.type == 'rew') {
                        water2.instance.qshflId = this.hjbxx;
                    }
                }

                break;
            case'grave':

                if (this.grave_data == null) {
                    let params: string;

                    params = `jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}&jmhId=${this.info.id}&zblId=${zblId}`;


                    this.HttpService.get('fm/list?' + params).then((data) => {
                        const init_grave_data = JSON.parse(JSON.stringify(data));
                        console.log(init_grave_data);
                        const Grave = this.AlertModel.resolveComponentFactory(GraveComponent);
                        const Grave2 = this.ModelRoom.createComponent(Grave);
                        Grave2.instance.childInfo = this.hjbxx;
                        Grave2.instance.childInfo2 = this.hcylb;
                        Grave2.instance.qshflId = this.qshflId;
                        Grave2.instance.init_grave_data = init_grave_data;
                        Grave2.instance.grave_data = data;
                        Grave2.instance.type = this.type;
                        this.update_grave_data = Grave2.instance.update_grave_data;
                        this.del_grave_data = Grave2.instance.del_grave_data;
                        this.add_grave_data = Grave2.instance.add_grave_data;

                        this.trees_data = data;

                    });
                } else {
                    const Grave = this.AlertModel.resolveComponentFactory(GraveComponent);
                    const Grave2 = this.ModelRoom.createComponent(Grave);

                    Grave2.instance.childInfo = this.hjbxx;
                    Grave2.instance.childInfo2 = this.hcylb;
                    Grave2.instance.grave_data = this.grave_data;
                    this.update_grave_data = Grave2.instance.update_grave_data;
                    this.del_grave_data = Grave2.instance.del_grave_data;
                    this.add_grave_data = Grave2.instance.add_grave_data;
                }
                break;
            case
            'qsr'
            :
                const qsr = this.AlertModel.resolveComponentFactory(QsrComponent);
                const qsr2 = this.ModelRoom.createComponent(qsr);
                break;

            case
            'gtgsjbqk'
            :
                const gtgsjbqk = this.AlertModel.resolveComponentFactory(JtgsjbxqComponent);
                const gtgsjbqk2 = this.ModelRoom.createComponent(gtgsjbqk);
                break;
            case
            'shebei'
            :
                const shebei = this.AlertModel.resolveComponentFactory(ShebeiComponent);
                const shebei2 = this.ModelRoom.createComponent(shebei);
                break;
            case
            'sheshi'
            :
                const sheshi = this.AlertModel.resolveComponentFactory(SheshiComponent);
                const sheshi2 = this.ModelRoom.createComponent(sheshi);
                break;
            case
            'nfyssjbqk'
            :
                const nfyssjbqk = this.AlertModel.resolveComponentFactory(NfyssjbqkComponent);
                const nfyssjbqk2 = this.ModelRoom.createComponent(nfyssjbqk);
                break;
            case
            'fyss'
            :
                const fyss = this.AlertModel.resolveComponentFactory(FyssComponent);
                const fyss2 = this.ModelRoom.createComponent(fyss);
                break;
            case
            'dwqbqk'
            :
                const dwqbqk = this.AlertModel.resolveComponentFactory(DwqbqkComponent);
                const dwqbqk2 = this.ModelRoom.createComponent(dwqbqk);
                break;
            //   case 'gykqyxq':
            //       this.childrenModel = this.AlertModel.resolveComponentFactory(GykqyxqComponent);
            //       break;
            case
            'tljbxx'
            :
                const tljbxx = this.AlertModel.resolveComponentFactory(TljbxxComponent);
                const tljbxx2 = this.ModelRoom.createComponent(tljbxx);
                break;
            case
            'gljbxx'
            :
                const gljbxx = this.AlertModel.resolveComponentFactory(GljbxxComponent);
                const gljbxx2 = this.ModelRoom.createComponent(gljbxx);
                break;
            case
            'qhjbxx'
            :
                const qhjbxx = this.AlertModel.resolveComponentFactory(QhjbxxComponent);
                const qhjbxx2 = this.ModelRoom.createComponent(qhjbxx);
                break;

            case
            'hdjbxx'
            :
                const hdjbxx = this.AlertModel.resolveComponentFactory(HdjbxxComponent);
                const hbjbxx2 = this.ModelRoom.createComponent(hdjbxx);
                break;
            case
            'gkjbxx'
            :

                const gkjbxx = this.AlertModel.resolveComponentFactory(GkjbxxComponent);
                const gkjbxx2 = this.ModelRoom.createComponent(gkjbxx);
                break;
            case
            'mtjbxx'
            :

                const mtjbxx = this.AlertModel.resolveComponentFactory(MtjbxxComponent);
                const mtjbxx2 = this.ModelRoom.createComponent(mtjbxx);
                break;
            case
            'sbdgcjbxx'
            :
                const sbdgcjbxx = this.AlertModel.resolveComponentFactory(SbdgcjbxxComponent);
                const sbdgcjbxx2 = this.ModelRoom.createComponent(sbdgcjbxx);
                break;
            case
            'dxgcjbxx'
            :
                const dxgcjbxx = this.AlertModel.resolveComponentFactory(DxgcjbxxComponent);
                const dxgcjbxx2 = this.ModelRoom.createComponent(dxgcjbxx);
                break;
            case
            'gbdsjbxx'
            :
                const gbdsjbxx = this.AlertModel.resolveComponentFactory(GbdsjbxxComponent);
                const gbdsjbxx2 = this.ModelRoom.createComponent(gbdsjbxx);
                break;
            case
            'gdgcjbxx'
            :

                const gdgcjbxx = this.AlertModel.resolveComponentFactory(GdgcjbxxComponent);
                const gdgcjbxx2 = this.ModelRoom.createComponent(gdgcjbxx);
                break;
            case
            'slsdgcjbxx'
            :
                const slsdgcjbxx = this.AlertModel.resolveComponentFactory(SlsdgcjbxxComponent);
                const slsdgcjbxx2 = this.ModelRoom.createComponent(slsdgcjbxx);
                break;
            case
            'kczyjbxx'
            :
                const kczyjbxx = this.AlertModel.resolveComponentFactory(KczyjbxxComponent);
                const kczyjbxx2 = this.ModelRoom.createComponent(kczyjbxx);
                break;
            case
            'wwgjjbxx'
            :
                const wwgjjbxx = this.AlertModel.resolveComponentFactory(WwgjjbxxComponent);
                const wwgjjbxx2 = this.ModelRoom.createComponent(wwgjjbxx);
                break;

            case
            'swqxzjbxx'
            :
                const swqxzjbxx = this.AlertModel.resolveComponentFactory(SwqxzjbxxComponent);
                const swqxzjbxx2 = this.ModelRoom.createComponent(swqxzjbxx);
                break;
            case
            'qtzxjbxx'
            :
                const qtzxjbxx = this.AlertModel.resolveComponentFactory(QtzxjbxxComponent);
                const qtzxjbxx2 = this.ModelRoom.createComponent(qtzxjbxx);
                break;
        }


        console.log(this.hjbxx);
        console.log(this.AlertModel);
        console.log(PersonComponent);
        console.log(this.childrenModel);
    }

    getChildDcfw(e) {
        console.log(e);
        if (e) {
            this.hjbxx.dcfwdm = e.dm;
            this.hjbxx.dcfwmc = e.qc;
            this.isShowDcfw = false;
        }
    }

    close() {
        this.showqqq = false;
    }
    getZdlsh(i){
        // this.HttpService.get(`jmh/generateOrderNum?code=${}`)
        this.hjbxx.dabh=i;
    }
    //   HJBXX储存变量
    saveHjbxxChange(arr, initArr) {
        var lsArr = {};
        for (let key in arr) {
            if (arr[key] !== initArr[key]) {
                console.log(`${key}需要保存`);
                lsArr[key] = arr[key];
            }
        }
        return lsArr;
    }

    //判断hcy必填项
    Tjpd(info) {
        console.log(info);
        this.TjpdValue = true;
        for (let item of info) {
            console.log(item)
            for (let j in item) {
                if (item[j] === "") {
                    for (let f in hcyId) {
                        if (j === f) {

                            this.msgs = [];
                            this.msgs.push({severity: 'error', summary: '填入提醒', detail: hcyId[f] + ' 必填'});
                            return this.TjpdValue = false;
                        }
                    }
                }
            }

        }
    }

    // 判断户基本信息必填项
    bhjbxxBT(info) {
        console.log(info);
        this.TjHjbxxValue = true;
        for (let item of info) {
            console.log(item)
            for (let j in item) {
                if (item[j] === "") {
                    for (let f in bhjbxxBT) {
                        if (j === f) {

                            this.msgs = [];
                            this.msgs.push({severity: 'error', summary: '填入提醒', detail: bhjbxxBT[f] + ' 必填'});
                            return this.TjHjbxxValue = false;
                        }
                    }
                }
            }

        }
    }

    // 判断户房屋必填项
    housesBT(info) {

    }
}


const
    hcyId = {
        szxzqhdm: '所属行政区划',
        zydldm: '专业大类',
        dcfwdm: '调查范围',
        hlbdm: '户类型',
        sfkgh: '是否空挂户',

    };
const
    bhjbxxBT = {
        hzxm: '户主姓名',
        sfkgh: '是否空挂户',
        xzqhmc: '所属行政区',
        dabh: '档案编号',
        zydldm: '专业大类',
        dcfwmc: '调查范围',

    };
const
    housesBT = {
        zydldm: '专业大类',
        dcfwmc: '调查范围',
        swszxzqhdm: '所属行政区',
        xzqhmc: '所属行政区',
    }

