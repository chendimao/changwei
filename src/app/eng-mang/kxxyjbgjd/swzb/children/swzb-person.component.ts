import {Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from "@angular/forms";
import {HttpService} from "../../../../service/http-service";
import {MenuItem, Message, SelectItem} from 'primeng/primeng';
import {flyIn} from "../../../../animations/fly-in";
import {HjbxxModel} from "./Hjbxx.model";
import {ShareService} from "../../../../systemSetting/service/share.service";
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


import * as _ from 'lodash';


@Component({
    selector: 'app-swzb-person',
    templateUrl: './swzb-person.component.html',
    styleUrls: ['./swzb-person.component.css'],
    animations: [flyIn],
    providers: [SearchService]
})
export class SwzbPersonComponent implements OnInit {

    private allComTj = new Object();


    private selectList = new Array;
    public hjbxx = new HjbxxModel;
    public info: any;
    public type: string;
    private showBoottom: boolean = false;
    private showTOP: boolean = false;
    private childrenModel: any;
    private sfxw: number;
    msgs: Message[] = [];
    Breadcrumb: MenuItem[];
    types1: SelectItem[];
    types2: SelectItem[];
    private navList = new Array();
    private navListUrl = new Array();
    public showqqq: boolean = true;
    isShowDcfw: boolean = false;
    isShowZydl: boolean = false;
    moreInput: boolean = false;
    moreText: string = "显示更多内容";
    private activeTabName: any;
    private activeTabId: any;
    private bj_have_tab: boolean = false;

    private tabHttpUrl: any;
    public selectedType1: string;
    public selectedType2: string;
    public isShowArea: boolean = false;

    public isDisabled: boolean = false;

    public hcylb = new Array();
    public sblb = new Array();
    public mzlb = new Array();
    public sslb = new Array();
    public qshflId;

    private ssgcdm: string;
    private ssxzqhdm: string;

    private showFooterBtn: boolean = false;
    public jmhListUrl: any;
    private jmhList: any;


    //  初始化的HJBXX
    private init_hjbxx_data;

    //   提交是的数据结构
    private postObject = new Object;

    //  子组件初始化的值

    public init_lxgm_data;
    public init_xxzx_data;
    public init_fwjbxx_data = new Array();
    public init_fsssjbxx_data;
    public init_tdjbxx_data;
    public init_tdfzwjbxx_other_data;
    public init_person_data;
    public init_fwzxjbxx_data;
    public init_grave_data;
    public init_sbdgcjbxx2_data;
    public init_gbdsgc_data;
    public init_gdgcjbxx2_data: any;
    public init_gkjbxx_data: any;
    public init_mtjbxx_data: any;
    public init_wwgj_data: any;
    public init_swqxz_data: any;
    public init_kczy_data: any;
    public init_slsd_data: any;
    public init_fyssjbxx_data;
    public init_shebei_data: any;
    public init_sheshi_data: any;
    public init_hdjbxx2_data: any;
    public init_qhjbxx2_data: any;
    public init_tljbxx2_data: any;
    public init_gtgsjbxx2_data: any;
    public init_nfyjbxx2_data: any;
    public init_dxgcjbxx2_data: any;
    public init_qtzxjbxx2_data: any;
    public init_gljbxx2_data: any;
    public init_dwjbxx2_data: any;


    //  保存子组件data数据
    public trees_data: any;
    public water_data: any;
    public fwjbxx_data: any;
    public grave_data: any;
    public fsss_data: any;
    public land_data: any;
    public land_other_data: any;
    public decor_data: any;
    public sbdgcjbxx2_data: any;
    public gbdsgc_data: any;
    public gdgcjbxx2_data: any;
    public gkjbxx_data: any;
    public mtjbxx_data: any;
    public wwgj_data: any;
    public swqxz_data: any;
    public kczy_date: any;
    public slsd_data: any;
    public fyss_data: any;
    public shebei_data: any;
    public sheshi_data: any;
    public hdjbxx2_data: any;
    public qhjbxx2_data: any;
    public tljbxx2_data: any;
    public qtzxjbxx2_data: any;
    public dxgcjbxx2_data: any;
    public gljbxx2_data: any;
    public nfyjbxx2_data: any;
    public dwjbxx2_data: any;
    public gtgsjbxx_data: any;


    //标记第一次加载
    public bj_fwjbxx_data = 1;
    public bj_fwzxjbxx_data = 1;
    public bj_xxzx_data = 1;
    public bj_fsssjbxx_data = 1;
    public bj_tdjbxx_data = 1;
    public bj_lxgm_data = 1;
    public bj_tdfzwjbxx_other_data = 1;
    public bj_fyssjbxx_data = 1;


    // 子组件中准备新增的真实数据
    public add_fwjbxx_data = new Array();
    public add_fwzxjbxx_data = new Array();
    public add_fsssjbxx_data = new Array();
    public add_tdjbxx_data = new Array();
    public add_tdfzwjbxx_other_data = new Array();
    public add_lxgm_data = new Array();
    public add_grave_data = new Array();
    public add_xxzx_data = new Array();


    public add_sbdgcjbxx_data = new Array();
    public add_gbdsjbxx_data = new Array();
    public add_gdgcjbxx_data = new Array();
    public add_gkjbxx_data = new Array();
    public add_mtjbxx_data = new Array();
    public add_wwgj_data = new Array();
    public add_swqxz_data = new Array();
    public add_kczy_data = new Array();
    public add_slsd_data = new Array();
    public add_fyssjbxx_data = new Array();
    public add_shebei_data = new Array();
    public add_sheshi_data = new Array();
    public add_hdjbxx_data = new Array();
    public add_tljbxx_data = new Array();
    public add_qhjbxx_data = new Array();

    public add_qtzxjbxx_data = new Array();
    public add_dxgcjbxx_data = new Array();
    public add_nfyjbxx_data = new Array();
    public add_gljbxx_data = new Array();
    public add_dwjbxx_data = new Array();
    public add_gtgsjbxx_data = new Array();


    //  子组件中修改过的真实数据
    public update_lxgm_data = new Array();
    public update_xxzx_data = new Array();
    public update_fwjbxx_data = new Array();
    public update_grave_data = new Array();
    public update_fsssjbxx_data = new Array();
    public update_tdjbxx_data = new Array();
    public update_tdfzwjbxx_other_data = new Array();
    public update_person_data = new Array();
    public update_fwzxjbxx_data = new Array();
    public update_sbdgcjbxx_data = new Array();
    public update_gbdsjbxx_data = new Array();
    public update_gdgcjbxx_data = new Array();
    public update_gkjbxx_data = new Array();
    public update_mtjbxx_data = new Array();
    public update_wwgj_data = new Array();
    public update_swqxz_data = new Array();
    public update_kczy_data = new Array();
    public update_slsd_data = new Array();
    public update_fyssjbxx_data = new Array();
    public update_shebei_data = new Array();
    public update_sheshi_data = new Array();
    public update_hdjbxx_data = new Array();

    public update_dwjbxx_data = new Array();
    public update_dxgcjbxx_data = new Array();
    public update_nfyjbxx_data = new Array();
    public update_gljbxx_data = new Array();
    public update_qtzxjbxx_data = new Array();


    public update_tljbxx_data = new Array();
    public update_qhjbxx_data = new Array();
    public update_gtgsjbxx_data = new Array();


    //  子组件中准备删除的真实数据
    public del_lxgm_data = new Array();
    public del_xxzx_data = new Array();
    public del_fwjbxx_data = new Array();
    public del_grave_data = new Array();
    public del_fsssjbxx_data = new Array();
    public del_tdjbxx_data = new Array();
    public del_tdfzwjbxx_other_data = new Array();
    public del_person_data = new Array();
    public del_fwzxjbxx_data = new Array();
    public del_sbdgcjbxx_data = new Array();
    public del_gbdsjbxx_data = new Array();
    public del_gdgcjbxx_data = new Array();
    public del_gkjbxx_data = new Array();
    public del_mtjbxx_data = new Array();
    public del_wwgj_data = new Array();
    public del_swqxz_data = new Array();
    public del_kczy_data = new Array();
    public del_slsd_data = new Array();
    public del_fyssjbxx_data = new Array();
    public del_shebei_data = new Array();
    public del_sheshi_data = new Array();
    public del_hdjbxx_data = new Array();
    public del_tljbxx_data = new Array();
    public del_qhjbxx_data = new Array();

    public del_qtzxjbxx_data = new Array();
    public del_dxgcjbxx_data = new Array();
    public del_gljbxx_data = new Array();
    public del_dwjbxx_data = new Array();
    public del_nfyjbxx_data = new Array();
    public del_gtgsjbxx_data = new Array();


    //子组件中修改过的新增分类信息数据
    public flxx_fwjbxx_add = new Array();
    public flxx_fwzxjbxx_add = new Array();
    public flxx_fsssjbxx_add = new Array();
    public flxx_tdjbxx_add = new Array();
    public flxx_lxgm_add = new Array();
    public flxx_xxzx_add = new Array();
    public flxx_tdfzwjbxx_other_add = new Array();
    public flxx_fyssjbxx_add = new Array();


    //子组件中修改过的分类信息数据
    public flxx_tdjbxx_update = new Array();
    public flxx_fwjbxx_update = new Array();
    public flxx_lxgm_update = new Array();
    public flxx_tdfzwjbxx_other_update = new Array();
    public flxx_fwzxjbxx_update = new Array();
    public flxx_fsssjbxx_update = new Array();
    public flxx_xxzx_update = new Array();
    public flxx_fyssjbxx_update = new Array();


    //子组件中修改过的删除信息数据
    public flxx_fwjbxx_del = new Array();
    public flxx_fwzxjbxx_del = new Array();
    public flxx_tdjbxx_del = new Array();
    public flxx_fsssjbxx_del = new Array();
    public flxx_lxgm_del = new Array();
    public flxx_xxzx_del = new Array();
    public flxx_tdfzwjbxx_other_del = new Array();
    public flxx_fyssjbxx_del = new Array();


    //子组件中准备新增的规格明细数据
    public add_lxgm_ggmx_data = new Array();
    public add_xxzx_ggmx_data = new Array();
    public add_fwjbxx_ggmx_data = new Array();
    public add_fsssjbxx_ggmx_data = new Array();
    public add_tdjbxx_ggmx_data = new Array();
    public add_tdjbxx_ggmx_other_data = new Array();
    public add_fwzxjbxx_ggmx_data = new Array();
    public add_fyssjbxx_ggmx_data = new Array();


    //子组件中修改过的规格明细数据
    public update_lxgm_ggmx_data = new Array();
    public update_xxzx_ggmx_data = new Array();
    public update_fwjbxx_ggmx_data = new Array();
    public update_fsssjbxx_ggmx_data = new Array();
    public update_tdjbxx_ggmx_data = new Array();
    public update_tdjbxx_other_ggmx_data = new Array();
    public update_fwzxjbxx_ggmx_data = new Array();
    public update_fyssjbxx_ggmx_data = new Array();


    //子组件中准备删除的规格明细数据
    public del_lxgm_ggmx_data = new Array();
    public del_xxzx_ggmx_data = new Array();
    public del_fwjbxx_ggmx_data = new Array();
    public del_fsssjbxx_ggmx_data = new Array();
    public del_tdjbxx_ggmx_data = new Array();
    public del_tdjbxx_ggmx_other_data = new Array();
    public del_fwzxjbxx_ggmx_data = new Array();
    public del_fyssjbxx_ggmx_data = new Array();


    public mzjbxx = new Array();
    public houses_name_active_base_copy = [0];
    public decor_name_active_base_copy = [0];
    public water_name_active_base_copy = [0];
    public fsss_name_active_base_copy = [0];
    public trees_name_active_base_copy = [0];
    public land_name_active_base_copy = [0];
    public land_other_name_active_base_copy = [0];
    public fyss_name_active_base_copy = [0];


    private fw2: any;
    private gkjbxx2: any;
    private person2: any;
    private fwzxjbxx: any;
    private fsssjbxx: any;
    private tdjbxx: any;
    private tdfzwjbxx: any;
    private lxgm: any;
    private xxzx: any;
    private fmjbxx: any;
    private sbdgcjbxx2: any;
    private gbdsgc2: any;
    private gdgcjbxx2: any;
    private mtjbxx2: any;
    private wwgj: any;
    private swqxz2: any;
    private kczy2: any;
    private slsd2: any;
    private fyssjbxx: any;
    private shebeijbxx: any;
    private sheshijbxx: any;
    private hdjbxx2: any;
    private tljbxx2: any;
    private qhjbxx2: any;
    private gtgsjbxx2: any;
    private nfyjbxx2: any;
    private dwjbxx2: any;
    private gljbxx2: any;
    private dxgcjbxx2: any;
    private qtzxjbxx2: any;


    private gzjd = new Array;
    private zydlTableList: any;
    private zydlTreeList: any;
    private dcfwTreeList: any;
    private dcfwTableList: any;

    private getNewHuList: boolean = false;


    private def_jddm: string;//  默认阶段代码

    private BtpdValue: boolean = true;   // 提交的时候的提醒
    private TjHjbxxValue: boolean = true;// 提交的对户基本信息判断

    //  做记录储存最终需要提交的结果
    //  人口
    private listHcyAdd = new Array();
    private listHcyDel: any;
    private listHcyEdit: any;

    private def_hjbxx_info: any;
    private def_hcylb_info: any;
    private tabName = "string";


    @ViewChild('room', {read: ViewContainerRef}) ModelRoom: ViewContainerRef;
    @ViewChild('ngModel') hjbxxForm: NgForm;


    constructor(private ShareService: ShareService, private selectListSevice: SelectListHttpService, private searchService: SearchService, private dataProcesing: DataProcessingService, private HttpService: HttpService, private AlertModel: ComponentFactoryResolver, private route: ActivatedRoute, private router: Router) {


        this.types1 = [];
        this.types1.push({label: '是', value: '1'});
        this.types1.push({label: '否', value: '0'});
        this.types2 = [];
        this.types2.push({label: '是', value: '1'});
        this.types2.push({label: '否', value: '0'});
    }

    ngAfterViewInit(): void {
        console.log(this.isShowArea);
        console.log(this.isShowZydl);


        //   订阅表单值改变事件
        this.hjbxxForm.valueChanges.subscribe(data => {
                console.log(this.hjbxx);
                console.log(this.ModelRoom);
                if (this.hjbxx['hzxm'] && this.hjbxx['dabh']) {
                    console.log(this.bj_have_tab);
                    if (!this.bj_have_tab) {
                        console.log(this.ModelRoom);
                        this.saveRouter(this.activeTabName, this.activeTabId);
                    }

                }
            }
        );


    }


    ngOnInit() {
        this.allComTj = {
            dcfwdm: "调查范围",
            zydldm: "专业大类代码",
            qsrId: "权属人名称",
            mc: "名称",
        };
        console.log(this.tabHttpUrl);
        console.log(this.fwjbxx_data);
        //  所属行政区划代码和工程代码
        if (this.type == 'add') {
            this.info = new Object();
            this.ssgcdm = this.qshflId.ssgcdm;
            this.ssxzqhdm = this.qshflId.ssxzqhdm;
            this.hjbxx.xzqhmc = this.qshflId.ssxzqhmc;
            this.hjbxx.dabh = "";
            this.hjbxx.sfkgh = "";
            this.hjbxx.zydldm = "";
            this.hjbxx.dcfwdm = "";
        } else if (this.type == 'rew') {
            this.ssgcdm = this.info.ssgcdm;
            this.ssxzqhdm = this.info.ssxzqhdm;

        } else {
            this.ssgcdm = this.info.ssgcdm;
            this.ssxzqhdm = this.info.ssxzqhdm;
            this.showFooterBtn = true;
            this.isDisabled = true;

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


        console.log(this.ssxzqhdm, this.ssgcdm);
        switch (this.type) {
            case 'view':
                //  循环出来导航栏,
                this.HttpService.get(`qsrsjswzb/listQsrsjzb?ssgcdm=${this.ssgcdm}&ssxzqhdm=${this.ssxzqhdm}&qsrlxzdxId=${this.qshflId.id}`)
                    .then((res) => {
                        let lsArr = this.delNav(res['returnObject']);
                        this.navList = lsArr.sort(this.delSort('pxh'));
                        this.activeTabName = this.navList[0].url;
                        this.getUrlList(this.navList);

                        this.HttpService.get(`/jmh/show?id=${this.info.id}`)
                            .then(res => {
                                console.log(res);
                                this.init_person_data = JSON.parse(JSON.stringify(res['returnObject']));
                                this.init_hjbxx_data = JSON.parse(JSON.stringify(res['returnObject']['bHjbxx']));
                                console.log(this.init_hjbxx_data);
                                this.hjbxx = res['returnObject']['bHjbxx'];
                                this.hcylb = res['returnObject']['listHcy'];
                                this.def_hcylb_info = JSON.parse(JSON.stringify(this.hcylb));
                                this.sfxw = this.hjbxx.sfxw;
                                this.saveRouter(this.activeTabName, this.activeTabId);
                            });
                    });
                console.log(this.jmhListUrl);
                let url = this.jmhListUrl.replace('jmh/list', 'jmh/listAll');
                console.log(url);
                this.HttpService.get(this.jmhListUrl)
                    .then((data) => {
                        this.jmhList = data['returnObject'];
                    });

            case 'add':
                //  循环出来导航栏,
                this.HttpService.get(`qsrsjswzb/listQsrsjzb?ssgcdm=${this.ssgcdm}&ssxzqhdm=${this.ssxzqhdm}&qsrlxzdxId=${this.qshflId.id}`)
                    .then((res) => {
                        console.log(res['returnObject']);

                        let lsArr = this.delNav(res['returnObject']);
                        this.navList = lsArr.sort(this.delSort('pxh'));
                        console.log(this.navList);
                        if (this.navList[0]) {
                            this.activeTabName = this.navList[0].url;

                            this.getUrlList(this.navList);

                        } else {
                            this.msgs = [];
                            this.msgs.push({severity: 'error', summary: '填入提醒', detail: '该行政区划没有进行配置'});
                        }
                    });

                //  所属系统代码后期使用
                this.postObject['bHjbxx'] = {};

                this.hjbxx.ssxtdm = 'X000001';
                this.hjbxx.ssgcdm = this.qshflId.ssgcdm;
                this.hjbxx.jddm = this.qshflId.jddm;
                this.hjbxx.ssxzqhdm = this.qshflId.ssxzqhdm;


                break;
            case 'rew':
                //  循环出来导航栏,


                this.HttpService.get(`qsrsjswzb/listQsrsjzb?ssgcdm=${this.ssgcdm}&ssxzqhdm=${this.ssxzqhdm}&qsrlxzdxId=${this.qshflId.id}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        let lsArr = this.delNav(res['returnObject']);
                        this.navList = lsArr.sort(this.delSort('pxh'));
                        this.activeTabName = this.navList[0].url;
                        this.activeTabId = this.navList[0].swzblbId;
                        console.log(this.activeTabName);
                        // this.getUrlList(this.navList);


                        this.HttpService.get(`/jmh/show?id=${this.info.id}`)
                            .then(res => {
                                console.log(res);
                                this.init_person_data = JSON.parse(JSON.stringify(res['returnObject']));
                                this.init_hjbxx_data = JSON.parse(JSON.stringify(res['returnObject']['bHjbxx']));
                                console.log(this.init_hjbxx_data);
                                this.hjbxx = res['returnObject']['bHjbxx'];
                                this.hcylb = res['returnObject']['listHcy'];
                                this.def_hcylb_info = JSON.parse(JSON.stringify(this.hcylb));
                                this.sfxw = this.hjbxx.sfxw;
                                this.saveRouter(this.activeTabName, this.activeTabId);
                                // const person = this.AlertModel.resolveComponentFactory(PersonComponent);
                                // this.person2 = this.ModelRoom.createComponent(person);
                                // this.person2.instance.childInfo = this.hjbxx;
                                // this.person2.instance.childInfo2 = this.hcylb;
                                // this.person2.instance.type = this.type;
                                // this.person2.instance.qshflId = this.qshflId;
                                // this.person2.instance.init_person_data = this.init_person_data;
                                //
                                // this.person2.instance.add_person_data = this.listHcyAdd;
                                // this.person2.instance.del_person_data = this.del_person_data;
                                // this.person2.instance.update_person_data = this.update_person_data;

                            });


                    });


                break;
        }
        this.qshflId.ssxzqhSearchDm = this.qshflId.ssxzqhdmMin ? this.qshflId.ssxzqhdmMin : this.qshflId.ssxzqhdm;
    }

    //  是否空挂户
    selectedTypea(e): void {
        console.log(e);
    }

    //  是否线外
    selectedTypea2(event): void {
        console.log(this.hjbxx.sfxw);
        console.log(this.sfxw);
        if (this.sfxw == this.hjbxx.sfxw) {
            this.sfxw = 2;
            this.hjbxx.sfxw = 2;
        } else {
            this.hjbxx.sfxw = this.sfxw;
            this.sfxw = this.sfxw;
        }
    }


    closeBottom() {
        if (this.showTOP == false) {
            this.showTOP = true;
        }
    }


    showMoreInput() {
        console.log(this.add_nfyjbxx_data);


        console.log(this.update_shebei_data);
        console.log(this.add_shebei_data);
        console.log(this.del_shebei_data);

        console.log(this.flxx_fyssjbxx_add);
        console.log(this.flxx_fyssjbxx_update);
        console.log(this.flxx_fyssjbxx_del);

        console.log(this.add_fyssjbxx_ggmx_data);
        console.log(this.update_fyssjbxx_ggmx_data);
        console.log(this.del_fyssjbxx_ggmx_data);

        console.log(this.add_shebei_data);
        console.log(this.update_hdjbxx_data);
        console.log(this.add_gtgsjbxx_data);
        console.log(this.update_gtgsjbxx_data);
        console.log(this.del_gtgsjbxx_data);

        console.log(this.add_tljbxx_data);
        console.log(this.update_tljbxx_data);
        console.log(this.del_tljbxx_data);

        console.log(this.add_fwjbxx_data);
        console.log(this.update_fwjbxx_data);
        console.log(this.del_fwjbxx_data);

        console.log(this.add_dwjbxx_data);
        console.log(this.update_dwjbxx_data);
        console.log(this.del_dwjbxx_data);



        if (this.moreInput) {
            this.moreInput = false;
            this.moreText = "显示更多内容";
        } else {
            this.moreInput = true;
            this.moreText = "隐藏更多内容";
        }
    }

    save(i) {
        this.def_hjbxx_info = JSON.parse(JSON.stringify(this.hjbxx));

        console.log(this.def_hjbxx_info);
        console.log(this.del_person_data);


        // 户基本信息处理
        let hjbxxRew = {};
        let lsHjbxxRew = JSON.parse(JSON.stringify(this.hjbxx))

        if (this.type == "add") {
            console.log(lsHjbxxRew);
            for (let item in lsHjbxxRew) {
                delete lsHjbxxRew.dcfwmc;
                delete lsHjbxxRew.zydlmc;
                delete lsHjbxxRew.hlbmc;
                delete lsHjbxxRew.xzqhmc;
            }
            if (!this.bhjbxxBtpd(lsHjbxxRew)) {
                return false;
            }
            console.log("1");
            hjbxxRew = lsHjbxxRew;
        } else {
            hjbxxRew = this.saveHjbxxChange(lsHjbxxRew, this.init_hjbxx_data);
            hjbxxRew['id'] = lsHjbxxRew['id'];
        }
        console.log("1");

        // 户成员处理
        let listHcyAdd = this.changeTable(this.listHcyAdd);
        console.log(listHcyAdd);
        if (listHcyAdd.length != 0) {
            // console.log(this.Btpd(listHcyAdd, hcyBtpd, "户成员信息"));
            if (this.activeTabName == 'person') {
                if (!this.Btpd(listHcyAdd, hcyBtpd, "户成员信息")) {
                    return false;
                }
            } else {
                if (!this.Btpd(listHcyAdd, qsrBtpd, "权属人信息")) {
                    return false;
                }
            }

        }


        if (this.add_fwjbxx_data.length != 0) {
            console.log(this.add_fwjbxx_data);
            if (!this.Btpd(this.changeTable(this.add_fwjbxx_data), comBtpd, "房屋信息")) {
                return false;
            }
        }


        if (this.add_fsssjbxx_data.length != 0) {
            if (!this.Btpd(this.changeTable(this.add_fsssjbxx_data), comBtpd, "附属设施信息")) {
                return false;
            }
        }

        if (this.add_tdjbxx_data.length != 0) {
            if (!this.Btpd(this.changeTable(this.add_tdjbxx_data), comBtpd, "土地信息")) {
                return false;
            }
        }

        if (this.add_tdfzwjbxx_other_data.length != 0) {
            if (!this.Btpd(this.changeTable(this.add_tdfzwjbxx_other_data), comBtpd, "土地附着物信息")) {
                return false;
            }
        }
        if (this.add_lxgm_data.length != 0) {
            if (!this.Btpd(this.changeTable(this.add_lxgm_data), comBtpd, "零星果木信息")) {
                return false;
            }
        }
        if (this.add_fyssjbxx_data.length != 0) {
            if (!this.Btpd(this.changeTable(this.add_fyssjbxx_data), comBtpd, "副业设施")) {
                return false;
            }
        }
        if (this.add_xxzx_data.length != 0) {
            if (!this.Btpd(this.changeTable(this.add_xxzx_data), comBtpd, "小型水利水电信息")) {
                return false;
            }
        }
        if (this.add_grave_data.length != 0) {
            if (!this.Btpd(this.add_grave_data, comBtpd, "坟墓信息")) {
                return false;
            }
        }
        if (this.add_shebei_data.length != 0) {
            if (!this.Btpd(this.add_shebei_data, comBtpd, "设备信息")) {
                return false;
            }
        }
        if (this.add_sheshi_data.length != 0) {
            if (!this.Btpd(this.add_sheshi_data, comBtpd, "设施信息")) {
                return false;
            }
        }

        if (this.add_sbdgcjbxx_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['sbdgclbdm'] = "输变电工程类别";
            lsObj['lsgx'] = "隶属关系";
            if (!this.Btpd(this.changeTable(this.add_sbdgcjbxx_data), lsObj, "输变电工程")) {
                return false;
            }
        }
        if (this.add_gbdsjbxx_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['dxgclbdm'] = "广播电视工程类别";
            lsObj['lsgx'] = "隶属关系";
            if (!this.Btpd(this.changeTable(this.add_gbdsjbxx_data), lsObj, "广播电视工程")) {
                return false;
            }
        }
        if (this.add_gdgcjbxx_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['gdgclbdm'] = "管道工程类别";
            lsObj['lsgx'] = "隶属关系";
            if (!this.Btpd(this.changeTable(this.add_gdgcjbxx_data), lsObj, "管道工程")) {
                return false;
            }
        }

        if (this.add_gkjbxx_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            console.log(this.add_gkjbxx_data);
            console.log(lsObj);
            lsObj['gklbdm'] = "港口类别";
            if (!this.Btpd(this.changeTable(this.add_gkjbxx_data), lsObj, "港口工程")) {
                return false;
            }
        }
        if (this.add_mtjbxx_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['mtlbdm'] = "码头类别";
            if (!this.Btpd(this.changeTable(this.add_mtjbxx_data), lsObj, "码头")) {
                return false;
            }
        }

        if (this.add_wwgj_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['wwgjlbdm'] = "文物古迹类别代码";
            if (!this.Btpd(this.changeTable(this.add_wwgj_data), lsObj, "文物古迹")) {
                return false;
            }
        }
        if (this.add_mtjbxx_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['mtlbdm'] = "码头类别";
            if (!this.Btpd(this.changeTable(this.add_mtjbxx_data), lsObj, "码头")) {
                return false;
            }
        }
        if (this.add_swqxz_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['zdlbdm'] = "站点类别";
            if (!this.Btpd(this.changeTable(this.add_swqxz_data), lsObj, "水文气象站")) {
                return false;
            }
        }
        if (this.add_kczy_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['kczylbdm'] = "矿产资源类别";
            if (!this.Btpd(this.changeTable(this.add_kczy_data), lsObj, "矿产资源")) {
                return false;
            }
        }
        if (this.add_slsd_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['gclbdm'] = "工程类别";
            if (!this.Btpd(this.changeTable(this.add_slsd_data), lsObj, "水利水电")) {
                return false;
            }
        }

        if (this.add_hdjbxx_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['hdlbdm'] = "航道类别";
            if (!this.Btpd(this.changeTable(this.add_hdjbxx_data), lsObj, "航道")) {
                return false;
            }
        }
        if (this.add_tljbxx_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['tllbdm'] = "铁路类别";
            if (!this.Btpd(this.changeTable(this.add_tljbxx_data), lsObj, "铁路")) {
                return false;
            }
        }
        if (this.add_qhjbxx_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['qhlbdm'] = "桥涵类别";
            if (!this.Btpd(this.changeTable(this.add_qhjbxx_data), lsObj, "桥涵")) {
                return false;
            }
        }
        if (this.add_qtzxjbxx_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['zxlbdm'] = "其他类别";
            if (!this.Btpd(this.changeTable(this.add_qtzxjbxx_data), lsObj, "其它专项")) {
                return false;
            }
        }
        if (this.add_dxgcjbxx_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['dxgclbdm'] = "电信工程类别";
            lsObj['lsgx'] = "隶属关系";
            if (!this.Btpd(this.changeTable(this.add_dxgcjbxx_data), lsObj, "电信工程")) {
                return false;
            }
        }

        if (this.add_nfyjbxx_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['xzdm'] = "性质类别";
            lsObj['jyr'] = "经营人";
            if (!this.Btpd(this.changeTable(this.add_nfyjbxx_data), lsObj, "农副业工程")) {
                return false;
            }
        }
        if (this.add_gljbxx_data.length != 0) {
            let lsObj = JSON.parse(JSON.stringify(this.allComTj));
            lsObj['gldjdm'] = "公路等级代码";
            if (!this.Btpd(this.changeTable(this.add_gljbxx_data), lsObj, "公路基本信息")) {
                return false;
            }
        }
        if (this.add_dwjbxx_data.length != 0) {
            let dwTj = {
                mc: "名称",
                lsgx: "隶属关系"
            };
            if (!this.Btpd(this.changeTable(this.add_dwjbxx_data), dwTj, "单位")) {
                return false;
            }
        }
        if (this.add_gtgsjbxx_data.length != 0) {
            let dwTj = {
                mc: "名称",
                jyr: "经营人",
                xzdm: "性质代码",
            };
            if (!this.Btpd(this.changeTable(this.add_gtgsjbxx_data), dwTj, "个体工商户")) {
                return false;
            }
        }

        console.log("走到这里来了")


        console.log(hjbxxRew);
        if (Object.keys(hjbxxRew).length !== 0) {
            this.postObject['bHjbxx'] = hjbxxRew;
        }

        //  户成员的修改
        // let update_person_data = this.update_person_data;
        if (this.update_person_data) {
            this.update_person_data.forEach((item, key, arr) => {
                console.log(item);

                if (item) {
                    delete item['whcdmc'];
                    delete item['hkqkmc'];
                    delete item['zydlmc'];
                    delete item['dcfwmc'];
                    delete item['xzqhmc'];
                    this.postObject['listHcyEdit'] = [];
                    this.postObject['listHcyEdit'].push(item);
                }
            });
        }


        // 新增户成员


        console.log(listHcyAdd)
        if (listHcyAdd.length != 0) {


            console.log(listHcyAdd);
            this.postObject['listHcyAdd'] = [];

            console.log(listHcyAdd);
            for (let item in listHcyAdd) {
                console.log(item);
                listHcyAdd[item]["ssxtdm"] = this.hjbxx.ssxtdm;
                listHcyAdd[item]["ssgcdm"] = this.qshflId.ssgcdm;
                listHcyAdd[item]["jddm"] = this.qshflId.jddm;
                console.log(listHcyAdd[item]);

                if (listHcyAdd[item]['listSbdgcAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['sbdgclbdm'] = "输变电工程类别";
                    lsObj['lsgx'] = "隶属关系"
                    console.log(listHcyAdd[item]['listSbdgcAdd']);
                    if (!this.objPd(listHcyAdd[item]['listSbdgcAdd'], lsObj, "输变电工程")) {
                        return false;
                    }
                }


                if (listHcyAdd[item]['listGbdsgcAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['dxgclbdm'] = "广播电视工程类别";
                    lsObj['lsgx'] = "隶属关系";
                    if (!this.objPd(listHcyAdd[item]['listGbdsgcAdd'], lsObj, "广播电视工程")) {
                        return false;
                    }
                }
                if (listHcyAdd[item]['listGdgcAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['gdgclbdm'] = "管道工程类别";
                    lsObj['lsgx'] = "隶属关系";
                    if (!this.objPd(listHcyAdd[item]['listGdgcAdd'], lsObj, "管道工程")) {
                        return false;
                    }
                }
                if (listHcyAdd[item]['listGkAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['gklbdm'] = "港口类别";
                    if (!this.objPd(listHcyAdd[item]['listGkAdd'], lsObj, "港口工程")) {
                        return false;
                    }
                }
                if (listHcyAdd[item]['listMtAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['mtlbdm'] = "码头类别";
                    if (!this.objPd(listHcyAdd[item]['listMtAdd'], lsObj, "码头")) {
                        return false;
                    }
                }

                if (listHcyAdd[item]['listWwgjAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['wwgjlbdm'] = "文物古迹类别代码";
                    if (!this.objPd(listHcyAdd[item]['listWwgjAdd'], lsObj, "文物古迹")) {
                        return false;
                    }
                }
                if (listHcyAdd[item]['listSwqxzAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['zdlbdm'] = "站点类别";
                    if (!this.objPd(listHcyAdd[item]['listSwqxzAdd'], lsObj, "水文气象站")) {
                        return false;
                    }
                }
                if (listHcyAdd[item]['listKczyAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['kczylbdm'] = "矿产资源类别";
                    if (!this.objPd(listHcyAdd[item]['listKczyAdd'], lsObj, "矿产资源")) {
                        return false;
                    }
                }
                if (listHcyAdd[item]['listSlsdgcAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['gclbdm'] = "工程类别";
                    if (!this.objPd(listHcyAdd[item]['listSlsdgcAdd'], lsObj, "水利水电")) {
                        return false;
                    }
                }

                if (listHcyAdd[item]['listHdAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['hdlbdm'] = "航道类别";
                    if (!this.objPd(listHcyAdd[item]['listHdAdd'], lsObj, "航道")) {
                        return false;
                    }
                }
                if (listHcyAdd[item]['listTlAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['tllbdm'] = "铁路类别";
                    if (!this.objPd(listHcyAdd[item]['listTlAdd'], lsObj, "铁路")) {
                        return false;
                    }
                }
                if (listHcyAdd[item]['listQhAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['qhlbdm'] = "桥涵类别";
                    if (!this.objPd(listHcyAdd[item]['listQhAdd'], lsObj, "桥涵")) {
                        return false;
                    }
                }
                if (listHcyAdd[item]['listGlAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['qhlbdm'] = "公路类别";
                    if (!this.objPd(listHcyAdd[item]['listGlAdd'], lsObj, "公路")) {
                        return false;
                    }
                }
                if (listHcyAdd[item]['listQtzxAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['zxlbdm'] = "其他类别";
                    if (!this.objPd(listHcyAdd[item]['listQtzxAdd'], lsObj, "其它专项")) {
                        return false;
                    }
                }
                if (listHcyAdd[item]['listDxgcAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['dxgclbdm'] = "电信工程类别";
                    lsObj['lsgx'] = "隶属关系";
                    if (!this.objPd(listHcyAdd[item]['listDxgcAdd'], lsObj, "电信工程")) {
                        return false;
                    }
                }

                if (listHcyAdd[item]['listNfyhAdd']) {
                    let lsObj = JSON.parse(JSON.stringify(this.allComTj));
                    lsObj['xzdm'] = "性质类别";
                    lsObj['jyr'] = "经营人";
                    if (!this.objPd(listHcyAdd[item]['listNfyhAdd'], lsObj, "农副业工程")) {
                        return false;
                    }
                }


                if (listHcyAdd[item]['listGtgshAdd']) {
                    let dwTj = {
                        mc: "名称",
                        jyr: "经营人",
                        xzdm: "性质代码",
                    };
                    if (!this.objPd(listHcyAdd[item]['listGtgshAdd'], dwTj, "个体工商户")) {
                        return false;
                    }
                }

                if (listHcyAdd[item]['listDwAdd']) {
                    let dwTj = {
                        mc: "名称",
                        lsgx: "隶属关系"
                    };
                    if (!this.objPd(listHcyAdd[item]['listDwAdd'], dwTj, "单位")) {
                        return false;
                    }
                }





                if (listHcyAdd[item]['listFwAdd']) {
                    console.log(listHcyAdd[item]['listFwAdd']);
                    this.add_hcy_tab(item, listHcyAdd[item]['listFwAdd'], listHcyAdd, 'listFwAdd');
                    console.log(listHcyAdd);
                }
                if (listHcyAdd[item]['listFwzxAdd']) {
                    this.add_hcy_tab(item, listHcyAdd[item]['listFwzxAdd'], listHcyAdd, 'listFwzxAdd');
                    console.log(this.postObject);
                }
                if (listHcyAdd[item]['listFsssAdd']) {
                    this.add_hcy_tab(item, listHcyAdd[item]['listFsssAdd'], listHcyAdd, 'listFsssAdd');
                }
                if (listHcyAdd[item]['listXxzxAdd']) {
                    this.add_hcy_tab(item, listHcyAdd[item]['listXxzxAdd'], listHcyAdd, 'listXxzxAdd');
                }
                if (listHcyAdd[item]['listTdAdd']) {
                    this.add_hcy_tab(item, listHcyAdd[item]['listTdAdd'], listHcyAdd, 'listTdAdd');
                }
                if (listHcyAdd[item]['listTdfzwAdd']) {
                    this.add_hcy_tab(item, listHcyAdd[item]['listTdfzwAdd'], listHcyAdd, 'listTdfzwAdd');
                }
                if (listHcyAdd[item]['listFyssAdd']) {
                    this.add_hcy_tab(item, listHcyAdd[item]['listFyssAdd'], listHcyAdd, 'listFyssAdd');
                }
                if (listHcyAdd[item]['listLxgmAdd']) {
                    this.add_hcy_nnGGmx_tab(item, listHcyAdd[item]['listLxgmAdd'], listHcyAdd, 'listLxgmAdd');
                }
                if (listHcyAdd[item]['listFmAdd']) {
                    this.add_hcy_noAll_tab(item, listHcyAdd[item]['listFmAdd'], listHcyAdd, 'listFmAdd');
                }
                if (listHcyAdd[item]['listSsxxAdd']) {
                    this.add_hcy_noAll_tab(item, listHcyAdd[item]['listSsxxAdd'], listHcyAdd, 'listSsxxAdd');
                }
                if (listHcyAdd[item]['listSbxxAdd']) {
                    this.add_hcy_noAll_tab(item, listHcyAdd[item]['listSbxxAdd'], listHcyAdd, 'listSbxxAdd');
                }

                 if (listHcyAdd[item]['listSbdgcAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listSbdgcAdd');
                }
                if (listHcyAdd[item]['listGbdsgcAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listGbdsgcAdd');
                }
                if (listHcyAdd[item]['listGdgcAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listGdgcAdd');
                }

                if (listHcyAdd[item]['listGkAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listGkAdd');
                }

                if (listHcyAdd[item]['listMtAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listMtAdd');
                }
                if (listHcyAdd[item]['listWwgjAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listWwgjAdd');
                }
                if (listHcyAdd[item]['listSwqxzAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listSwqxzAdd');
                }

                if (listHcyAdd[item]['listKczyAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listKczyAdd');
                }
                if (listHcyAdd[item]['listSlsdgcAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listSlsdgcAdd');
                }
                if (listHcyAdd[item]['listHdAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listHdAdd');
                }
                if (listHcyAdd[item]['listTlAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listTlAdd');
                }
                if (listHcyAdd[item]['listQhAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listQhAdd');
                }
                if (listHcyAdd[item]['listGlAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listGlAdd');
                }
                if (listHcyAdd[item]['listQtzxAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listQtzxAdd');
                }
                if (listHcyAdd[item]['listDxgcAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listDxgcAdd');
                }
                 if (listHcyAdd[item]['listNfyAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listNfyAdd');
                }
                if (listHcyAdd[item]['listGtgshAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listGtgshAdd');
                }
                if (listHcyAdd[item]['listDwAdd']) {
                    this.add_hcy_only_item(item, listHcyAdd, 'listDwAdd');
                }








                for (let item2 in listHcyAdd[item]) {
                    delete listHcyAdd[item].id;
                    delete listHcyAdd[item].dcfwmc;
                    delete listHcyAdd[item].zydlmc;
                    delete listHcyAdd[item].whcdmc;
                    delete listHcyAdd[item].hkqkmc;

                    delete listHcyAdd[item].xzqhmc;
                    if (listHcyAdd[item][item2] === "") {
                        delete listHcyAdd[item][item2]
                    }
                }
                console.log(listHcyAdd[item]);
                this.postObject['listHcyAdd'].push(listHcyAdd[item]);

            }
        } else {
            console.log("没有户成员增加")
        }


        //  如果有删除功能
        console.log(this.del_person_data);
        if (this.del_person_data) {
            this.postObject['listHcyDel'] = [];
            this.del_person_data.forEach((item, key, arr) => {
                this.postObject['listHcyDel'].push(item);
            })

        }

        //  如果房屋有增长
        if (this.add_fwjbxx_data) {
            if (Object.keys(this.add_fwjbxx_data).length !== 0) {
                this.postObject['listFwAdd'] = [];
                console.log(this.add_data_fn(this.add_fwjbxx_data, this.postObject['listFwAdd']));
            }
        }
        //  如果房屋有修改
        let update_fwjbxx_data = JSON.parse(JSON.stringify(this.update_fwjbxx_data));
        console.log(update_fwjbxx_data);
        if (update_fwjbxx_data.length != 0) {
            this.postObject['listFwEdit'] = [];
            update_fwjbxx_data.forEach((item, key, arr) => {
                if (item) {
                    console.log(arr[key] == null);
                    for (let key2 in item) {
                        if (item[key2] == null) {
                            item[key2] = -100;
                        }
                    }
                    delete item.ggmxxxList;
                    this.postObject['listFwEdit'].push(item);
                }

            })

        }
        //  如果房屋有删除
        if (this.del_fwjbxx_data) {
            if (Object.keys(this.del_fwjbxx_data).length !== 0) {
                console.log(this.del_fwjbxx_data);
                this.postObject['listFwDel'] = [];
                this.del_fwjbxx_data.forEach((item, key, arr) => {
                    this.postObject['listFwDel'].push(item);
                })
            }
        }
        // 如果房屋分类信息有修改
        if (this.flxx_fwjbxx_update) {
            this.postObject['listFwflmxEdit'] = this.updata_flxx_data(this.flxx_fwjbxx_update);
            console.log(this.postObject['listFwflmxEdit']);
            if(!this.flxxPd(this.postObject['listFwflmxEdit'],'jzmj','房屋分类信息')){
                console.log(22222222222);
                return ;
            }

        }
        // 如果房屋分类信息有新增
        if (this.flxx_fwjbxx_add) {
            this.postObject['listFwflmxAdd'] = this.add_flxx_data(this.flxx_fwjbxx_add);
            if(!this.flxxPd(this.postObject['listFwflmxAdd'],'jzmj','房屋分类信息')){
                console.log(22222222222);
                return ;
            }

        }

        // 如果房屋分类信息删除
        if (this.flxx_fwjbxx_del) {
            this.postObject['listFwflmxDel'] = this.del_flxx_data(this.flxx_fwjbxx_del);
         }
        // 如果房屋规格信息有修改
        if (this.update_fwjbxx_ggmx_data) {
            this.postObject['listFwggmxEdit'] = this.updata_ggxx_data(this.update_fwjbxx_ggmx_data);
            console.log(this.postObject['listFwggmxEdit']);

        }
        // 如果房屋规格信息新增
        if (this.add_fwjbxx_ggmx_data) {
            this.postObject['listFwggmxAdd'] = this.add_ggxx_data(this.add_fwjbxx_ggmx_data);
        }
        // 如果房屋规格信息删除
        if (this.del_fwjbxx_ggmx_data) {
            this.postObject['listFwggmxDel'] = this.del_ggxx_data(this.del_fwjbxx_ggmx_data);
        }

        //  如果装修有增长
        if (this.add_fwzxjbxx_data) {
            if (Object.keys(this.add_fwzxjbxx_data).length !== 0) {
                this.postObject['listFwzxAdd'] = [];
                console.log(this.add_data_fn(this.add_fwzxjbxx_data, this.postObject['listFwzxAdd']));
            }
        }

        //  如果装修有修改
        let update_fwzxjbxx_data = JSON.parse(JSON.stringify(this.update_fwzxjbxx_data));
        console.log(update_fwzxjbxx_data);
        if (update_fwzxjbxx_data.length != 0) {
            this.postObject['listFwzxEdit'] = [];
            update_fwzxjbxx_data.forEach((item, key, arr) => {
                if (item) {
                    for (let key2 in item) {
                        if (item[key2] == null) {
                            item[key2] = -100;
                        }
                    }
                    delete item.ggmxxxList;
                    this.postObject['listFwzxEdit'].push(item);
                }

            })

        }
        //  如果装修有删除
        if (this.del_fwzxjbxx_data) {
            if (Object.keys(this.del_fwzxjbxx_data).length !== 0) {
                console.log(this.del_fwzxjbxx_data);
                this.postObject['listFwzxDel'] = [];
                this.del_fwzxjbxx_data.forEach((item, key, arr) => {
                    this.postObject['listFwzxDel'].push(item);
                })
            }
        }
        // 如果房屋装修分类信息有修改
        if (this.flxx_fwzxjbxx_update) {
            this.postObject['listFwzxflmxEdit'] = this.updata_flxx_data(this.flxx_fwzxjbxx_update);
            if(!this.flxxPd(this.postObject['listFwzxflmxEdit'],'sl','房屋装修分类信息')){
                return;
            }

        }
        // 如果房屋装修分类信息有新增
        if (this.flxx_fwzxjbxx_add) {
            this.postObject['listFwzxflmxAdd'] = this.add_flxx_data(this.flxx_fwzxjbxx_add);
            if(!this.flxxPd(this.postObject['listFwzxflmxAdd'],'sl','房屋装修分类信息')){
                return;
            }
        }

        // 如果房屋装修分类信息删除
        if (this.flxx_fwzxjbxx_del) {
            this.postObject['listFwzxflmxDel'] = this.del_flxx_data(this.flxx_fwzxjbxx_del);
        }
        // 如果房屋装修规格信息有修改
        if (this.update_fwzxjbxx_ggmx_data) {
            this.postObject['listFwzxggmxEdit'] = this.updata_ggxx_data(this.update_fwzxjbxx_ggmx_data);
        }
        // 如果房屋装修规格信息新增
        if (this.add_fwzxjbxx_ggmx_data) {
            this.postObject['listFwzxggmxAdd'] = this.add_ggxx_data(this.add_fwzxjbxx_ggmx_data);
        }

        // 如果房屋装修规格信息删除
        if (this.del_fwzxjbxx_ggmx_data) {
            this.postObject['listFwzxggmxDel'] = this.del_ggxx_data(this.del_fwzxjbxx_ggmx_data);
        }


        // 附属设施有增长
        if (this.add_fsssjbxx_data) {
            if (Object.keys(this.add_fsssjbxx_data).length !== 0) {
                this.postObject['listFsssAdd'] = [];
                this.add_data_fn(this.add_fsssjbxx_data, this.postObject['listFsssAdd'])
            }
        }
        // 附属设施有修改
        let update_fsssjbxx_data = JSON.parse(JSON.stringify(this.update_fsssjbxx_data));
        console.log(update_fsssjbxx_data);
        if (update_fsssjbxx_data.length != 0) {
            this.postObject['listFsssEdit'] = [];
            update_fsssjbxx_data.forEach((item, key, arr) => {
                if (item) {
                    delete item.ggmxxxList;
                    for (let key2 in item) {
                        if (item[key2] == null) {
                            item[key2] = -100;
                        }
                    }
                    this.postObject['listFsssEdit'].push(item);
                }

            })

        }

        // 附属设施有删除
        if (this.del_fsssjbxx_data) {
            if (Object.keys(this.del_fsssjbxx_data).length !== 0) {
                console.log(this.del_fsssjbxx_data);
                this.postObject['listFsssDel'] = [];
                this.del_fsssjbxx_data.forEach((item, key, arr) => {
                    this.postObject['listFsssDel'].push(item);
                })
            }
        }
        // 附属设施分类信息有修改
        if (this.flxx_fsssjbxx_update) {
            console.log(this.flxx_fsssjbxx_update);
            this.postObject['listFsssflmxEdit'] = this.updata_flxx_data(this.flxx_fsssjbxx_update);
           if(!this.flxxPd(this.postObject['listFsssflmxEdit'],'sl','附属设施分类信息')){
               return ;
           }
        }
        // 附属设施分类信息有新增
        if (this.flxx_fsssjbxx_add) {
            this.postObject['listFsssflmxAdd'] = this.add_flxx_data(this.flxx_fsssjbxx_add);
            if(!this.flxxPd(this.postObject['listFsssflmxAdd'],'sl','附属设施分类信息')){
                return ;
            }

        }

        // 如果附属设施分类信息删除
        if (this.flxx_fsssjbxx_del) {
            this.postObject['listFsssflmxDel'] = this.del_flxx_data(this.flxx_fsssjbxx_del);
        }
        // 附属设施规格信息有修改
        if (this.update_fsssjbxx_ggmx_data) {
            this.postObject['listFsssggmxEdit'] = this.updata_ggxx_data(this.update_fsssjbxx_ggmx_data);
        }
        // 附属设施规格信息新增
        if (this.add_fsssjbxx_ggmx_data) {
            this.postObject['listFsssggmxAdd'] = this.add_ggxx_data(this.add_fsssjbxx_ggmx_data);
        }

        // 附属设施规格信息删除
        if (this.del_fsssjbxx_ggmx_data) {
            this.postObject['listFsssggmxDel'] = this.del_ggxx_data(this.del_fsssjbxx_ggmx_data);
        }


        //  小型专项有增长
        if (this.add_xxzx_data) {
            if (Object.keys(this.add_xxzx_data).length !== 0) {
                this.postObject['listXxzxAdd'] = [];
                this.add_data_fn(this.add_xxzx_data, this.postObject['listXxzxAdd'])
            }
        }
        //  小型专项有修改
        let update_xxzx_data = JSON.parse(JSON.stringify(this.update_xxzx_data));
        console.log(update_xxzx_data);
        if (update_xxzx_data.length != 0) {
            this.postObject['listXxzxEdit'] = [];
            update_xxzx_data.forEach((item, key, arr) => {
                if (item) {
                    delete item.ggmxxxList;
                    for (let key2 in item) {
                        if (item[key2] == null) {
                            item[key2] = -100;
                        }
                    }
                    this.postObject['listXxzxEdit'].push(item);
                }

            })

        }
        //  小型专项有删除
        if (this.del_xxzx_data) {
            if (Object.keys(this.del_xxzx_data).length !== 0) {
                console.log(this.del_xxzx_data);
                this.postObject['listXxzxDel'] = [];
                this.del_xxzx_data.forEach((item, key, arr) => {
                    console.log(item);
                    this.postObject['listXxzxDel'].push(item);
                })
            }
            console.log(this.postObject['listXxzxDel'])
        }
        // 小型专项分类信息有修改
        if (this.flxx_xxzx_update) {
            this.postObject['listXxzxflmxEdit'] = this.updata_flxx_data(this.flxx_xxzx_update);
            if(!this.flxxPd(this.postObject['listXxzxflmxEdit'],'sl','小型专项分类信息')){
                return ;
            }
        }
        // 小型专项分类信息有新增
        if (this.flxx_xxzx_add) {
            this.postObject['listXxzxflmxAdd'] = this.add_flxx_data(this.flxx_xxzx_add);
            if(!this.flxxPd(this.postObject['listXxzxflmxAdd'],'sl','小型专项分类信息')){
                return ;
            }

        }

        // 小型专项分类信息删除
        if (this.flxx_xxzx_del) {
            this.postObject['listXxzxflmxDel'] = this.del_flxx_data(this.flxx_xxzx_del);
        }
        // 小型专项规格信息有修改
        if (this.update_xxzx_ggmx_data) {
            this.postObject['listXxzxggmxEdit'] = this.updata_ggxx_data(this.update_xxzx_ggmx_data);
        }
        // 小型专项规格信息新增
        if (this.add_xxzx_ggmx_data) {
            this.postObject['listXxzxggmxAdd'] = this.add_ggxx_data(this.add_xxzx_ggmx_data);
        }
        // 小型专项规格信息删除
        if (this.del_xxzx_ggmx_data) {
            this.postObject['listXxzxggmxDel'] = this.del_ggxx_data(this.del_xxzx_ggmx_data);
        }


        //  土地有增长
        if (this.add_tdjbxx_data) {
            if (Object.keys(this.add_tdjbxx_data).length !== 0) {
                this.postObject['listTdAdd'] = [];
                this.add_data_fn(this.add_tdjbxx_data, this.postObject['listTdAdd'])
            }
        }
        //  土地有修改
        let update_tdjbxx_data = JSON.parse(JSON.stringify(this.update_tdjbxx_data));
        console.log(update_tdjbxx_data);
        if (update_tdjbxx_data.length != 0) {
            this.postObject['listTdEdit'] = [];
            update_tdjbxx_data.forEach((item, key, arr) => {
                if (item) {
                    for (let key2 in item) {
                        if (item[key2] == null) {
                            item[key2] = -100;
                        }
                    }
                    delete item.ggmxxxList;
                    this.postObject['listTdEdit'].push(item);
                }

            })

        }

        //  土地有删除
        if (this.del_tdjbxx_data) {
            if (Object.keys(this.del_tdjbxx_data).length !== 0) {
                console.log(this.del_tdjbxx_data);
                this.postObject['listTdDel'] = [];
                this.del_tdjbxx_data.forEach((item, key, arr) => {
                    this.postObject['listTdDel'].push(item);
                })
            }
        }
        // 土地分类信息有修改
        if (this.flxx_tdjbxx_update) {
            this.postObject['listTdflmxEdit'] = this.updata_flxx_data(this.flxx_tdjbxx_update);
            if(!this.flxxPd(this.postObject['listTdflmxEdit'],'jzmj','土地分类信息')){

                return ;
            }
        }
        // 土地分类信息有新增
        if (this.flxx_tdjbxx_add) {
            this.postObject['listTdflmxAdd'] = this.add_flxx_data(this.flxx_tdjbxx_add);
            if(!this.flxxPd(this.postObject['listTdflmxAdd'],'jzmj','土地分类信息')){

                return ;
            }
        }
        // 土地分类信息删除
        if (this.flxx_tdjbxx_del) {
            this.postObject['listTdflmxDel'] = this.del_flxx_data(this.flxx_tdjbxx_del);
        }
        // 土地规格信息有修改
        if (this.update_tdjbxx_ggmx_data) {
            this.postObject['listTdggmxEdit'] = this.updata_ggxx_data(this.update_tdjbxx_ggmx_data);
        }
        // 土地规格信息新增
        if (this.add_tdjbxx_ggmx_data) {
            this.postObject['listTdggmxAdd'] = this.add_ggxx_data(this.add_tdjbxx_ggmx_data);
        }

        // 土地规格信息删除
        if (this.del_tdjbxx_ggmx_data) {
            this.postObject['listTdggmxDel'] = this.del_ggxx_data(this.del_tdjbxx_ggmx_data);
        }


        //  土地附着物有增长
        if (this.add_tdfzwjbxx_other_data) {
            if (Object.keys(this.add_tdfzwjbxx_other_data).length !== 0) {
                this.postObject['listTdfzwAdd'] = [];
                this.add_data_fn(this.add_tdfzwjbxx_other_data, this.postObject['listTdfzwAdd'])
            }
        }
        //  土地附着物有修改
        let update_tdfzwjbxx_other_data = JSON.parse(JSON.stringify(this.update_tdfzwjbxx_other_data));
        console.log(update_tdfzwjbxx_other_data);
        if (update_tdfzwjbxx_other_data.length != 0) {
            this.postObject['listTdfzwEdit'] = [];
            update_tdfzwjbxx_other_data.forEach((item, key, arr) => {
                if (item) {
                    delete item.ggmxxxList;
                    for (let key2 in item) {
                        if (item[key2] == null) {
                            item[key2] = -100;
                        }
                    }
                    this.postObject['listTdfzwEdit'].push(item);
                }

            })

        }
        //  土地附着物有删除
        if (this.del_tdfzwjbxx_other_data) {
            if (Object.keys(this.del_tdfzwjbxx_other_data).length !== 0) {
                console.log(this.del_tdfzwjbxx_other_data);
                this.postObject['listTdfzwDel'] = [];
                this.del_tdfzwjbxx_other_data.forEach((item, key, arr) => {
                    this.postObject['listTdfzwDel'].push(item);
                })
            }
        }
        // 土地附着物分类信息有修改
        if (this.flxx_tdfzwjbxx_other_update) {
            this.postObject['listTdfzwflmxEdit'] = this.updata_flxx_data(this.flxx_tdfzwjbxx_other_update);
            if(!this.flxxPd(this.postObject['listTdflmxAdd'],'sl','土地附着物分类信息')){
                return ;

            }
        }
        // 土地附着物分类信息有新增
        if (this.flxx_tdfzwjbxx_other_add) {
            this.postObject['listTdfzwflmxAdd'] = this.add_flxx_data(this.flxx_tdfzwjbxx_other_add);
            if(!this.flxxPd(this.postObject['listTdfzwflmxAdd'],'sl','土地附着物分类信息')){
                return ;
            }
        }

        // 土地附着物分类信息删除
        if (this.flxx_tdfzwjbxx_other_del) {
            this.postObject['listTdfzwflmxDel'] = this.del_flxx_data(this.flxx_tdfzwjbxx_other_del);
        }
        // 土地附着物规格信息有修改
        if (this.update_tdjbxx_other_ggmx_data) {
            this.postObject['listTdfzwggmxEdit'] = this.updata_ggxx_data(this.update_tdjbxx_other_ggmx_data);
        }
        // 土地附着物规格信息新增
        if (this.add_tdjbxx_ggmx_other_data) {
            this.postObject['listTdfzwggmxAdd'] = this.add_ggxx_data(this.add_tdjbxx_ggmx_other_data);
        }

        // 土地附着物规格信息删除
        if (this.del_tdjbxx_ggmx_other_data) {
            this.postObject['listTdfzwggmxDel'] = this.del_ggxx_data(this.del_tdjbxx_ggmx_other_data);
        }

        //  副业设施有增长
        if (this.add_fyssjbxx_data) {
            if (Object.keys(this.add_fyssjbxx_data).length !== 0) {
                this.postObject['listFyssAdd'] = [];
                this.add_data_fn(this.add_fyssjbxx_data, this.postObject['listFyssAdd'])
            }
        }
        //  副业设施有修改
        let update_fyssjbxx_data = JSON.parse(JSON.stringify(this.update_fyssjbxx_data));
        console.log(update_fyssjbxx_data);
        if (update_fyssjbxx_data.length != 0) {
            this.postObject['listFyssEdit'] = [];
            update_fyssjbxx_data.forEach((item, key, arr) => {
                if (item) {
                    for (let key2 in item) {
                        if (item[key2] == null) {
                            item[key2] = -100;
                        }
                    }
                    delete item.ggmxxxList;
                    this.postObject['listFyssEdit'].push(item);
                }

            })

        }
        //  副业设施有删除
        if (this.del_fyssjbxx_data) {
            if (Object.keys(this.del_fyssjbxx_data).length !== 0) {
                console.log(this.del_fyssjbxx_data);
                this.postObject['listFyssDel'] = [];
                this.del_fyssjbxx_data.forEach((item, key, arr) => {
                    this.postObject['listFyssDel'].push(item);
                })
            }
        }
        console.log("副业设施");
        // 副业设施分类信息有修改
        if (this.flxx_fyssjbxx_update) {
            this.postObject['listFyssflmxEdit'] = this.updata_flxx_data(this.flxx_fyssjbxx_update);
            if(!this.flxxPd(this.postObject['listFyssflmxEdit'],'sl','副业设施分类信息')){
                return ;
            }
        }
        // 副业设施分类信息有新增
        if (this.flxx_fyssjbxx_add) {
            this.postObject['listFyssflmxAdd'] = this.add_flxx_data(this.flxx_fyssjbxx_add);
            if(!this.flxxPd(this.postObject['listFyssflmxAdd'],'sl','副业设施分类信息')){
                return ;
            }
        }

        // 副业设施分类信息删除
        if (this.flxx_fyssjbxx_del) {
            this.postObject['listFyssflmxDel'] = this.del_flxx_data(this.flxx_fyssjbxx_del);
        }
        // 副业设施规格信息有修改
        if (this.update_fyssjbxx_ggmx_data) {
            this.postObject['listFyssggmxEdit'] = this.updata_ggxx_data(this.update_fyssjbxx_ggmx_data);
        }
        // 副业设施规格信息新增
        if (this.add_fyssjbxx_ggmx_data) {
            this.postObject['listFyssggmxAdd'] = this.add_ggxx_data(this.add_fyssjbxx_ggmx_data);
        }

        // 副业设施规格信息删除
        if (this.del_fyssjbxx_ggmx_data) {
            this.postObject['listFyssggmxDel'] = this.del_ggxx_data(this.del_fyssjbxx_ggmx_data);
        }

        console.log("零星果木");
        //  零星果木有增长
        if (this.add_lxgm_data) {
            if (Object.keys(this.add_lxgm_data).length !== 0) {
                this.postObject['listLxgmAdd'] = [];
                this.add_data_noGGmx_fn(this.add_lxgm_data, this.postObject['listLxgmAdd'])
            }
        }
        //  零星果木有修改
        let update_lxgm_data = JSON.parse(JSON.stringify(this.update_lxgm_data));
        console.log(update_lxgm_data);
        if (update_lxgm_data.length != 0) {
            this.postObject['listLxgmEdit'] = [];
            update_lxgm_data.forEach((item, key, arr) => {
                if (item) {
                    delete item.ggmxxxList;
                    for (let key2 in item) {
                        if (item[key2] == null) {
                            item[key2] = -100;
                        }
                    }
                    this.postObject['listLxgmEdit'].push(item);
                }

            })

        }
        //  零星果木有删除
        if (this.del_lxgm_data) {
            if (Object.keys(this.del_lxgm_data).length !== 0) {
                console.log(this.del_lxgm_data);
                this.postObject['listLxgmDel'] = [];
                this.del_lxgm_data.forEach((item, key, arr) => {
                    this.postObject['listLxgmDel'].push(item);
                })
            }
        }
        // 零星果木分类信息有修改
        if (this.flxx_lxgm_update) {
            this.postObject['listLxgmflmxEdit'] = this.updata_flxx_data(this.flxx_lxgm_update);
            if(!this.flxxPd(this.postObject['listLxgmflmxEdit'],'sl','零星果木分类信息')){
                return ;

            }
        }
        // 零星果木分类信息有新增
        if (this.flxx_lxgm_add) {
            this.postObject['listLxgmflmxAdd'] = this.add_flxx_data(this.flxx_lxgm_add);

            if(!this.flxxPd(this.postObject['listLxgmflmxAdd'],'sl','零星果木分类信息')){
                return ;
            }
        }
        // 零星果木分类信息删除
        if (this.flxx_lxgm_del) {
            this.postObject['listLxgmflmxDel'] = this.del_flxx_data(this.flxx_lxgm_del);
        }


        // 坟墓有新增
        if (this.add_grave_data) {
            this.postObject['listFmAdd'] = [];
            this.add_data_noAll_fn(this.changeTable(this.add_grave_data), this.postObject['listFmAdd'])
        }

        // 坟墓有删除
        if (this.del_grave_data) {
            console.log(this.del_grave_data);
            this.postObject['listFmDel'] = [];
            this.del_grave_data.forEach((item, key, arr) => {
                this.postObject['listFmDel'].push(item);
            })

        }


        //  坟墓有修改
        let update_grave_data = this.update_grave_data;
        console.log(update_grave_data);
        if (update_grave_data.length != 0) {
            this.postObject['listFmEdit'] = [];
            update_grave_data.forEach((item, key, arr) => {
                if (item) {
                    for (let key2 in item) {
                        if (item[key2] == null) {
                            item[key2] = -100;
                        }
                    }
                    delete item.ggmxxxList;
                    this.postObject['listFmEdit'].push(item);
                }

            })

        }

        // 设施有新增
        if (this.add_sheshi_data) {
            this.postObject['listSsxxAdd'] = [];
            this.add_data_noAll_fn(this.changeTable(this.add_sheshi_data), this.postObject['listSsxxAdd'])
        }

        // 设施有删除
        if (this.del_sheshi_data) {
            console.log(this.del_sheshi_data);
            this.postObject['listSsxxDel'] = [];
            this.del_grave_data.forEach((item, key, arr) => {
                this.postObject['listSsxxDel'].push(item);
            })

        }


        //  设施有修改
        let update_sheshi_data = this.update_sheshi_data;
        console.log(update_sheshi_data);
        if (update_sheshi_data.length != 0) {
            this.postObject['listSsxxEdit'] = [];
            update_sheshi_data.forEach((item, key, arr) => {
                if (item) {
                    for (let key2 in item) {
                        if (item[key2] == null) {
                            item[key2] = -100;
                        }
                    }
                    delete item.ggmxxxList;
                    this.postObject['listSsxxEdit'].push(item);
                }

            })

        }

        // 设备有新增
        if (this.add_shebei_data) {
            console.log(this.add_shebei_data);
            this.postObject['listSbxxAdd'] = [];
            this.add_data_noAll_fn(this.changeTable(this.add_shebei_data), this.postObject['listSbxxAdd'])
        }

        //  设备有删除
        if (this.del_shebei_data) {
            console.log(this.del_shebei_data);
            this.postObject['listSbxxDel'] = [];
            this.del_shebei_data.forEach((item, key, arr) => {
                this.postObject['listSbxxDel'].push(item);
            })

        }


        //   设备有修改
        let update_shebei_data = this.update_shebei_data;
        console.log(update_shebei_data);
        if (update_shebei_data.length != 0) {
            this.postObject['listSbxxEdit'] = [];
            update_shebei_data.forEach((item, key, arr) => {
                if (item) {
                    delete item.ggmxxxList;
                    for (let key2 in item) {
                        if (item[key2] == null) {
                            item[key2] = -100;
                        }
                    }
                    this.postObject['listSbxxEdit'].push(item);
                }

            })

        }


        // 输变电工程基本信息
        if (this.add_sbdgcjbxx_data.length != 0) {
            this.postObject['listSbdgcAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_sbdgcjbxx_data), this.postObject['listSbdgcAdd'])
        }
        if (this.update_sbdgcjbxx_data.length != 0) {
            this.postObject['listSbdgcEdit'] = [];
            console.log(this.update_sbdgcjbxx_data)
            this.postObject['listSbdgcEdit'].push(this.update_sbdgcjbxx_data[0])
        }
        if (this.del_sbdgcjbxx_data.length != 0) {

            this.postObject['listSbdgcDel'] = [];
            this.postObject['listSbdgcDel'].push(this.del_sbdgcjbxx_data[0])
        }

        // 广播电视工程
        if (this.add_gbdsjbxx_data.length != 0) {
            this.postObject['listGbdsgcAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_gbdsjbxx_data), this.postObject['listGbdsgcAdd'])
        }
        if (this.update_gbdsjbxx_data.length != 0) {
            this.postObject['listGbdsgcEdit'] = [];
            this.postObject['listGbdsgcEdit'].push(this.update_gbdsjbxx_data[0])
        }
        if (this.del_gbdsjbxx_data.length != 0) {

            this.postObject['listGbdsgcDel'] = [];
            this.postObject['listGbdsgcDel'].push(this.del_gbdsjbxx_data[0])
        }

        // 管道工程基本信息
        if (this.add_gdgcjbxx_data.length != 0) {
            this.postObject['listGdgcAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_gdgcjbxx_data), this.postObject['listGdgcAdd'])
        }
        if (this.update_gdgcjbxx_data.length != 0) {
            this.postObject['listGdgcEdit'] = [];
            this.postObject['listGdgcEdit'].push(this.update_gdgcjbxx_data[0])
        }
        if (this.del_gdgcjbxx_data.length != 0) {
            this.postObject['listGdgcDel'] = [];
            this.postObject['listGdgcDel'].push(this.del_gdgcjbxx_data[0])
        }

        // 港口基本信息
        if (this.add_gkjbxx_data.length != 0) {
            this.postObject['listGkAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_gkjbxx_data), this.postObject['listGkAdd'])
        }
        console.log(this.update_gkjbxx_data)
        if (this.update_gkjbxx_data.length != 0) {
            this.postObject['listGkEdit'] = [];
            this.postObject['listGkEdit'].push(this.update_gkjbxx_data[0])
        }
        if (this.del_gkjbxx_data.length != 0) {
            this.postObject['listGkDel'] = [];
            this.postObject['listGkDel'].push(this.del_gkjbxx_data[0])
        }

        // 码头基本信息
        if (this.add_mtjbxx_data.length != 0) {
            this.postObject['listMtAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_mtjbxx_data), this.postObject['listMtAdd'])
        }
        if (this.update_mtjbxx_data.length != 0) {
            this.postObject['listMtEdit'] = [];
            this.postObject['listMtEdit'].push(this.update_mtjbxx_data[0])
        }
        if (this.del_mtjbxx_data.length != 0) {
            this.postObject['listMtDel'] = [];
            this.postObject['listMtDel'].push(this.del_mtjbxx_data[0])
        }

        // 文物古迹基本信息
        if (this.add_wwgj_data.length != 0) {
            this.postObject['listWwgjAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_wwgj_data), this.postObject['listWwgjAdd'])
        }
        if (this.update_wwgj_data.length != 0) {
            this.postObject['listWwgjEdit'] = [];
            this.postObject['listWwgjEdit'].push(this.update_wwgj_data[0])
        }
        if (this.del_wwgj_data.length != 0) {
            this.postObject['listWwgjDel'] = [];
            this.postObject['listWwgjDel'].push(this.del_wwgj_data[0])
        }
        // 水文气象站
        if (this.add_swqxz_data.length != 0) {
            this.postObject['listSwqxzAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_swqxz_data), this.postObject['listSwqxzAdd'])
        }
        if (this.update_swqxz_data.length != 0) {
            this.postObject['listSwqxzEdit'] = [];
            this.postObject['listSwqxzEdit'].push(this.update_swqxz_data[0])
        }
        if (this.del_swqxz_data.length != 0) {
            this.postObject['listSwqxzDel'] = [];
            this.postObject['listSwqxzDel'].push(this.del_swqxz_data[0])
        }
        // 矿产资源基本信息
        if (this.add_kczy_data.length != 0) {
            this.postObject['listKczyAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_kczy_data), this.postObject['listKczyAdd'])
        }
        if (this.update_kczy_data.length != 0) {
            this.postObject['listKczyEdit'] = [];
            this.postObject['listKczyEdit'].push(this.update_kczy_data[0])
        }
        if (this.del_kczy_data.length != 0) {
            this.postObject['listKczyDel'] = [];
            this.postObject['listKczyDel'].push(this.del_kczy_data[0])
        }
        // 水利水电基本信息
        if (this.add_slsd_data.length != 0) {
            this.postObject['listSlsdgcAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_slsd_data), this.postObject['listSlsdgcAdd'])
        }
        if (this.update_slsd_data.length != 0) {
            this.postObject['listSlsdgcEdit'] = [];
            this.postObject['listSlsdgcEdit'].push(this.update_slsd_data[0])
        }
        if (this.del_slsd_data.length != 0) {
            this.postObject['listSlsdgcDel'] = [];
            this.postObject['listSlsdgcDel'].push(this.del_slsd_data[0])
        }

        // 航道基本信息
        if (this.add_hdjbxx_data.length != 0) {
            this.postObject['listHdAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_hdjbxx_data), this.postObject['listHdAdd'])
        }
        if (this.update_hdjbxx_data.length != 0) {
            this.postObject['listHdEdit'] = [];
            this.postObject['listHdEdit'].push(this.update_hdjbxx_data[0])
        }
        if (this.del_hdjbxx_data.length != 0) {
            this.postObject['listHdDel'] = [];
            this.postObject['listHdDel'].push(this.del_hdjbxx_data[0])
        }

        // 铁路基本信息
        if (this.add_tljbxx_data.length != 0) {
            this.postObject['listTlAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_tljbxx_data), this.postObject['listTlAdd'])
        }
        if (this.update_tljbxx_data.length != 0) {
            this.postObject['listTlEdit'] = [];
            this.postObject['listTlEdit'].push(this.update_tljbxx_data[0])
        }
        if (this.del_tljbxx_data.length != 0) {
            this.postObject['listTlDel'] = [];
            this.postObject['listTlDel'].push(this.del_tljbxx_data[0])
        }

        // 桥涵基本信息
        if (this.add_qhjbxx_data.length != 0) {
            this.postObject['listQhAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_qhjbxx_data), this.postObject['listQhAdd'])
        }
        if (this.update_qhjbxx_data.length != 0) {
            this.postObject['listQhEdit'] = [];
            this.postObject['listQhEdit'].push(this.update_qhjbxx_data[0])
        }
        if (this.del_qhjbxx_data.length != 0) {
            this.postObject['listQhDel'] = [];
            this.postObject['listQhDel'].push(this.del_qhjbxx_data[0])
        }
        // 公路基本信息
        if (this.add_gljbxx_data.length != 0) {
            this.postObject['listGlAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_gljbxx_data), this.postObject['listGlAdd'])
        }
        if (this.update_gljbxx_data.length != 0) {
            this.postObject['listGlEdit'] = [];
            this.postObject['listGlEdit'].push(this.update_gljbxx_data[0])
        }
        if (this.del_gljbxx_data.length != 0) {
            this.postObject['listGlDel'] = [];
            this.postObject['listGlDel'].push(this.del_gljbxx_data[0])
        }
        // 其他专项基本信息
        if (this.add_qtzxjbxx_data.length != 0) {
            this.postObject['listQtzxAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_qtzxjbxx_data), this.postObject['listQtzxAdd'])
        }
        if (this.update_qtzxjbxx_data.length != 0) {
            this.postObject['listQtzxEdit'] = [];
            this.postObject['listQtzxEdit'].push(this.update_qtzxjbxx_data[0])
        }
        if (this.del_qtzxjbxx_data.length != 0) {
            this.postObject['listQtzxDel'] = [];
            this.postObject['listQtzxDel'].push(this.del_qtzxjbxx_data[0])
        }
        // 电信工程基本信息
        if (this.add_dxgcjbxx_data.length != 0) {
            this.postObject['listDxgcAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_dxgcjbxx_data), this.postObject['listDxgcAdd'])
        }
        if (this.update_dxgcjbxx_data.length != 0) {
            this.postObject['listDxgcEdit'] = [];
            this.postObject['listDxgcEdit'].push(this.update_dxgcjbxx_data[0])
        }
        if (this.del_dxgcjbxx_data.length != 0) {
            this.postObject['listDxgcDel'] = [];
            this.postObject['listDxgcDel'].push(this.del_dxgcjbxx_data[0])
        }
        // 农副业基本信息
        if (this.add_nfyjbxx_data) {
            this.postObject['listNfyhAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_nfyjbxx_data), this.postObject['listNfyhAdd'])
        }
        if (this.update_nfyjbxx_data.length != 0) {
            this.postObject['listNfyhEdit'] = [];
            this.postObject['listNfyhEdit'].push(this.update_nfyjbxx_data[0])
        }
        if (this.del_nfyjbxx_data.length != 0) {
            this.postObject['listNfyhDel'] = [];
            this.postObject['listNfyhDel'].push(this.del_nfyjbxx_data[0])
        }
        // 个体工商基本信息
        if (this.add_gtgsjbxx_data) {
            this.postObject['listGtgshAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_gtgsjbxx_data), this.postObject['listGtgshAdd'])
        }
        if (this.update_gtgsjbxx_data.length != 0) {
            this.postObject['listGtgshEdit'] = [];
            this.postObject['listGtgshEdit'].push(this.update_gtgsjbxx_data[0])
        }
        if (this.del_gtgsjbxx_data.length != 0) {
            this.postObject['listGtgshDel'] = [];
            this.postObject['listGtgshDel'].push(this.del_gtgsjbxx_data[0])
        }
        // 单位基本信息
        if (this.add_dwjbxx_data) {
            this.postObject['listDwAdd'] = [];
            this.add_data_only_item(this.changeTable(this.add_dwjbxx_data), this.postObject['listDwAdd'])
        }
        if (this.update_dwjbxx_data.length != 0) {
            this.postObject['listDwEdit'] = [];
            this.postObject['listDwEdit'].push(this.update_dwjbxx_data[0])
        }
        if (this.del_dwjbxx_data.length != 0) {
            this.postObject['listDwDel'] = [];
            this.postObject['listDwDel'].push(this.del_dwjbxx_data[0])
        }
        if (Object.keys(this.postObject).length !== 0) {
            hjbxxRew['id'] = this.hjbxx.id;

            this.postObject['bHjbxx'] = hjbxxRew;

            console.log(this.postObject);
            for (let key in this.postObject) {
                if (JSON.stringify(this.postObject[key]) == '[]' || this.postObject[key] == undefined) {
                    delete this.postObject[key];
                }
            }
            console.log(this.postObject);

            console.log(this.postObject['listHcyAdd']);
            // console.log(this.Btpd(this.postObject['listHcyAdd'], hcyBtpd, "户成员信息"));
            if (this.BtpdValue) {
                console.log("必填值全部都有了");
                // this.def_hcylb_info=JSON.parse(JSON.stringify(this.hcylb));
                // console.log(this.def_hcylb_info);
                this.HttpService.post('/jmh/save', this.postObject)
                    .then((data) => {
                        this.getNewHuList = true;
                        if (data['success'] === true) {
                            this.ModelRoom.clear();
                            console.log("保存成功");
                            // 保存并新增的时候
                            if (this.type == 'add') {
                                // this.getNewHuList = true;
                                // 新增的时候点击保存并新增
                                if (i == 'add') {
                                    this.activeTabName = this.navList[0].url;
                                    console.log(this.def_hjbxx_info);
                                    this.hjbxx = new HjbxxModel;
                                    this.hjbxx.hlbdm = this.def_hjbxx_info.hlbdm;
                                    this.hjbxx.hlbmc = this.def_hjbxx_info.hlbmc;
                                    this.hjbxx.ssxzqhdm = this.def_hjbxx_info.ssxzqhdm;
                                    this.hjbxx.xzqhmc = this.def_hjbxx_info.xzqhmc;
                                    this.hjbxx.jddm = this.def_hjbxx_info.jddm;
                                    this.hjbxx.ssxtdm = this.def_hjbxx_info.ssxtdm;
                                    this.hjbxx.ssgcdm = this.def_hjbxx_info.ssgcdm;
                                } else {
                                    console.log("新增人时候，新增成员");
                                    this.type = 'rew';
                                    this.saveRouter(this.activeTabName, this.activeTabId);
                                    this.info['id'] = data['returnObject'];
                                }
                            } else {
                                // 新增的时候点击保存并新增
                                if (i == 'add') {
                                    this.type = 'add';
                                    this.activeTabName = this.navList[0].url;
                                    this.hjbxx = new HjbxxModel;
                                    this.hjbxx.hlbdm = this.def_hjbxx_info.hlbdm;
                                    this.hjbxx.hlbmc = this.def_hjbxx_info.hlbmc;
                                    this.hjbxx.ssxzqhdm = this.def_hjbxx_info.ssxzqhdm;
                                    this.hjbxx.xzqhmc = this.def_hjbxx_info.xzqhmc;
                                    this.hjbxx.jddm = this.def_hjbxx_info.jddm;
                                    this.hjbxx.ssxtdm = this.def_hjbxx_info.ssxtdm;
                                    this.hjbxx.ssgcdm = this.def_hjbxx_info.ssgcdm;
                                    console.log(this.hjbxx);
                                }

                                console.log("这是修改接口");
                            }

                            if (i != 'add') {
                                this.HttpService.get(`/jmh/show?id=${this.info.id}`)
                                    .then((res) => {
                                        this.init_person_data = JSON.parse(JSON.stringify(res['returnObject']));
                                        this.init_hjbxx_data = JSON.parse(JSON.stringify(res['returnObject']['bHjbxx']));
                                        console.log(this.init_hjbxx_data);
                                        this.hjbxx = res['returnObject']['bHjbxx'];
                                        this.hcylb = res['returnObject']['listHcy'];
                                        this.def_hcylb_info = JSON.parse(JSON.stringify(this.hcylb));
                                        console.log(22);
                                        this.saveRouter(this.activeTabName, this.activeTabId);
                                    });

                                this.tabHttpUrl = this.getTabUrl(this.activeTabName, this.activeTabId, this.info.id);

                            }


                            // this.hcylb=[];
                            this.init_person_data = [];
                            this.listHcyAdd = [];
                            this.update_person_data = [];
                            this.del_person_data = [];

                            this.trees_data = null;
                            this.water_data = null;
                            this.fwjbxx_data = null;
                            this.grave_data = null;
                            this.fsss_data = null;
                            this.land_data = null;
                            this.land_other_data = null;
                            this.decor_data = null;
                            this.sbdgcjbxx2_data = null;
                            this.gbdsgc_data = null;
                            this.gdgcjbxx2_data = null;
                            this.gkjbxx_data = null;
                            this.mtjbxx_data = null;
                            this.wwgj_data = null;
                            this.swqxz_data = null;
                            this.kczy_date = null;
                            this.slsd_data = null;
                            this.fyss_data = null;
                            this.shebei_data = null;
                            this.sheshi_data = null;
                            this.hdjbxx2_data = null;
                            this.qhjbxx2_data = null;
                            this.tljbxx2_data = null;
                            this.qtzxjbxx2_data = null;
                            this.dxgcjbxx2_data = null;
                            this.gljbxx2_data = null;
                            this.nfyjbxx2_data = null;
                            this.dwjbxx2_data = null;
                            this.gtgsjbxx_data = null;


                            this.postObject = new Object();

                            this.add_lxgm_data = new Array();
                            this.add_xxzx_data = new Array();
                            this.add_fwjbxx_data = new Array();
                            this.add_grave_data = new Array();
                            this.add_fsssjbxx_data = new Array();
                            this.add_tdjbxx_data = new Array();
                            this.add_tdfzwjbxx_other_data = new Array();
                            this.add_fwzxjbxx_data = new Array();
                            this.add_sbdgcjbxx_data = new Array();
                            this.add_gbdsjbxx_data = new Array();
                            this.add_gdgcjbxx_data = new Array();
                            this.add_gkjbxx_data = new Array();
                            this.add_mtjbxx_data = new Array();
                            this.add_wwgj_data = new Array();
                            this.add_swqxz_data = new Array();
                            this.add_kczy_data = new Array();
                            this.add_slsd_data = new Array();
                            this.add_fyssjbxx_data = new Array();
                            this.add_shebei_data = new Array();
                            this.add_sheshi_data = new Array();
                            this.add_hdjbxx_data = new Array();
                            this.add_tljbxx_data = new Array();
                            this.add_qhjbxx_data = new Array();
                            this.add_qtzxjbxx_data = new Array();
                            this.add_dxgcjbxx_data = new Array();
                            this.add_nfyjbxx_data = new Array();
                            this.add_gljbxx_data = new Array();
                            this.add_dwjbxx_data = new Array();
                            this.add_gtgsjbxx_data = new Array();


                            this.update_lxgm_data = new Array();
                            this.update_xxzx_data = new Array();
                            this.update_fwjbxx_data = new Array();
                            this.update_grave_data = new Array();
                            this.update_fsssjbxx_data = new Array();
                            this.update_tdjbxx_data = new Array();
                            this.update_tdfzwjbxx_other_data = new Array();
                            this.update_person_data = new Array();
                            this.update_fwzxjbxx_data = new Array();
                            this.update_sbdgcjbxx_data = new Array();
                            this.update_gbdsjbxx_data = new Array();
                            this.update_gdgcjbxx_data = new Array();
                            this.update_gkjbxx_data = new Array();
                            this.update_mtjbxx_data = new Array();
                            this.update_wwgj_data = new Array();
                            this.update_swqxz_data = new Array();
                            this.update_kczy_data = new Array();
                            this.update_slsd_data = new Array();
                            this.update_fyssjbxx_data = new Array();
                            this.update_shebei_data = new Array();
                            this.update_sheshi_data = new Array();
                            this.update_hdjbxx_data = new Array();

                            this.update_dwjbxx_data = new Array();
                            this.update_dxgcjbxx_data = new Array();
                            this.update_nfyjbxx_data = new Array();
                            this.update_gljbxx_data = new Array();
                            this.update_qtzxjbxx_data = new Array();


                            this.update_tljbxx_data = new Array();
                            this.update_qhjbxx_data = new Array();
                            this.update_gtgsjbxx_data = new Array();

                            //  子组件中准备删除的真实数据
                            this.del_lxgm_data = new Array();
                            this.del_xxzx_data = new Array();
                            this.del_fwjbxx_data = new Array();
                            this.del_grave_data = new Array();
                            this.del_fsssjbxx_data = new Array();
                            this.del_tdjbxx_data = new Array();
                            this.del_tdfzwjbxx_other_data = new Array();
                            this.del_person_data = new Array();
                            this.del_fwzxjbxx_data = new Array();
                            this.del_sbdgcjbxx_data = new Array();
                            this.del_gbdsjbxx_data = new Array();
                            this.del_gdgcjbxx_data = new Array();
                            this.del_gkjbxx_data = new Array();
                            this.del_mtjbxx_data = new Array();
                            this.del_wwgj_data = new Array();
                            this.del_swqxz_data = new Array();
                            this.del_kczy_data = new Array();
                            this.del_slsd_data = new Array();
                            this.del_fyssjbxx_data = new Array();
                            this.del_shebei_data = new Array();
                            this.del_sheshi_data = new Array();
                            this.del_hdjbxx_data = new Array();
                            this.del_tljbxx_data = new Array();
                            this.del_qhjbxx_data = new Array();

                            this.del_qtzxjbxx_data = new Array();
                            this.del_dxgcjbxx_data = new Array();
                            this.del_gljbxx_data = new Array();
                            this.del_dwjbxx_data = new Array();
                            this.del_nfyjbxx_data = new Array();
                            this.del_gtgsjbxx_data = new Array();

                            //子组件中修改过的分类新增信息数据
                            this.flxx_fwjbxx_add = [];
                            this.flxx_fwzxjbxx_add = [];
                            this.flxx_fsssjbxx_add = [];
                            this.flxx_tdjbxx_add = [];
                            this.flxx_lxgm_add = [];
                            this.flxx_xxzx_add = [];
                            this.flxx_tdfzwjbxx_other_add = [];
                            this.flxx_fyssjbxx_add = [];

                            //子组件中修改过的分类信息数据
                            this.flxx_tdjbxx_update = [];
                            this.flxx_fwjbxx_update = [];
                            this.flxx_lxgm_update = [];
                            this.flxx_tdfzwjbxx_other_update = [];
                            this.flxx_fwzxjbxx_update = [];
                            this.flxx_fsssjbxx_update = [];
                            this.flxx_xxzx_update = [];
                            this.flxx_fyssjbxx_update = [];

                            //子组件中修改过的删除信息数据
                            this.flxx_fwjbxx_del = [];
                            this.flxx_fwzxjbxx_del = [];
                            this.flxx_tdjbxx_del = [];
                            this.flxx_fsssjbxx_del = [];
                            this.flxx_lxgm_del = [];
                            this.flxx_xxzx_del = [];
                            this.flxx_tdfzwjbxx_other_del = [];
                            this.flxx_fyssjbxx_del = [];

                            //子组件中准备新增的规格明细数据
                            this.add_lxgm_ggmx_data = [];
                            this.add_xxzx_ggmx_data = [];
                            this.add_fwjbxx_ggmx_data = [];
                            this.add_fsssjbxx_ggmx_data = [];
                            this.add_tdjbxx_ggmx_data = [];
                            this.add_tdjbxx_ggmx_other_data = [];
                            this.add_fwzxjbxx_ggmx_data = [];
                            this.add_fyssjbxx_ggmx_data = [];

                            //子组件中修改过的规格明细数据
                            this.update_lxgm_ggmx_data = [];
                            this.update_xxzx_ggmx_data = [];
                            this.update_fwjbxx_ggmx_data = [];
                            this.update_fsssjbxx_ggmx_data = [];
                            this.update_tdjbxx_ggmx_data = [];
                            this.update_tdjbxx_other_ggmx_data = [];
                            this.update_fwzxjbxx_ggmx_data = [];
                            this.update_fyssjbxx_ggmx_data = [];
                            //子组件中准备删除的规格明细数据
                            this.del_lxgm_ggmx_data = [];
                            this.del_xxzx_ggmx_data = [];
                            this.del_fwjbxx_ggmx_data = [];
                            this.del_fsssjbxx_ggmx_data = [];
                            this.del_tdjbxx_ggmx_data = [];
                            this.del_tdjbxx_ggmx_other_data = [];
                            this.del_fwzxjbxx_ggmx_data = [];
                            this.del_fyssjbxx_ggmx_data = [];
                            //清空分类明细复制
                            this.houses_name_active_base_copy[0] = 0;
                            this.decor_name_active_base_copy[0] = 0;
                            this.fsss_name_active_base_copy[0] = 0;
                            this.fyss_name_active_base_copy[0] = 0;
                            this.land_name_active_base_copy[0] = 0;
                            this.land_other_name_active_base_copy[0] = 0;
                            this.trees_name_active_base_copy[0] = 0;
                            this.water_name_active_base_copy[0] = 0;


                            //清空初始化数据

                            this.init_lxgm_data = [];
                            this.init_xxzx_data = [];
                            this.init_fwjbxx_data = [];
                            this.init_fsssjbxx_data = [];
                            this.init_tdjbxx_data = [];
                            this.init_tdfzwjbxx_other_data = [];
                            this.init_person_data = [];
                            this.init_fwzxjbxx_data = [];
                            this.init_grave_data = [];
                            this.init_sbdgcjbxx2_data = [];
                            this.init_gbdsgc_data = [];
                            this.init_gdgcjbxx2_data = [];
                            this.init_gkjbxx_data = [];
                            this.init_mtjbxx_data = [];
                            this.init_wwgj_data = [];
                            this.init_swqxz_data = [];
                            this.init_kczy_data = [];
                            this.init_slsd_data = [];


                            this.msgs = [];
                            this.msgs.push({severity: 'success', summary: '填入提醒', detail: '数据保存成功'});

                        } else {
                            this.hcylb = this.def_hcylb_info;
                            console.log(this.def_hcylb_info);
                            this.person2.instance.childInfo2 = this.hcylb;
                            this.person2.instance.tableList = this.hcylb;
                            console.log(this.person2.instance.childInfo2);
                            this.del_person_data = [];
                            this.person2.instance.del_person_data = [];
                            this.person2.instance.del_person_data = this.del_person_data;
                            this.msgs = [];
                            this.msgs.push({severity: 'error', summary: '保存失败', detail: data['errorMessage']});

                        }

                    })
            }


        } else {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '填入提醒', detail: '没有任何数据修改'});
        }


    }


    saveRouter(url, id) {
        this.ModelRoom.clear();
        this.bj_have_tab = true;

        this.activeTabName = url;
        this.activeTabId = id;
        console.log(this.ModelRoom);
        console.log(this.activeTabName);
        if (this.type == 'add') {
            this.tabHttpUrl = this.getTabUrl(url, id, null);
        } else {
            this.tabHttpUrl = this.getTabUrl(url, id, this.info.id);
        }

        if (this.hjbxx['hzxm'] == "" || this.hjbxx['dabh'] == "" || this.hjbxx['dabh'] == undefined || this.hjbxx['hzxm'] == undefined) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '填入提醒', detail: "请填好户主姓名和档案编号"});

        } else {
            if (url == 'person') {


                const person = this.AlertModel.resolveComponentFactory(PersonComponent);
                this.person2 = this.ModelRoom.createComponent(person);
                this.person2.instance.childInfo = this.hjbxx;
                this.person2.instance.childInfo2 = this.hcylb;
                this.person2.instance.type = this.type;
                this.person2.instance.qshflId = this.qshflId;
                this.person2.instance.init_person_data = this.init_person_data;

                this.person2.instance.add_person_data = this.listHcyAdd;
                this.person2.instance.del_person_data = this.del_person_data;
                this.person2.instance.update_person_data = this.update_person_data;

                this.person2.instance.ssxzqhSearchDm = this.qshflId.ssxzqhSearchDm;
                if (this.type == 'add') {
                    this.person2.instance.qshflId = this.qshflId;

                } else if (this.type == 'rew') {
                    this.person2.instance.qshflId = this.hjbxx;
                }

            } else if (url == 'qsr') {
                console.log(this.hjbxx);
                const qsr = this.AlertModel.resolveComponentFactory(QsrComponent);

                this.person2 = this.ModelRoom.createComponent(qsr);


                this.person2.instance.childInfo = this.hjbxx;
                this.person2.instance.childInfo2 = this.hcylb;
                this.person2.instance.type = this.type;
                this.person2.instance.qshflId = this.qshflId;
                this.person2.instance.init_person_data = this.init_person_data;

                this.person2.instance.add_person_data = this.listHcyAdd;
                this.person2.instance.del_person_data = this.del_person_data;
                this.person2.instance.update_person_data = this.update_person_data;

                this.person2.instance.ssxzqhSearchDm = this.qshflId.ssxzqhSearchDm;
                if (this.type == 'add') {
                    this.person2.instance.qshflId = this.qshflId;

                } else if (this.type == 'rew') {
                    this.person2.instance.qshflId = this.hjbxx;
                }
            } else {
                if (this.hcylb.length > 0) {
                    switch (url) {
                        // case 'person':
                        //
                        //     const person = this.AlertModel.resolveComponentFactory(PersonComponent);
                        //     this.person2 = this.ModelRoom.createComponent(person);
                        //     this.person2.instance.childInfo = this.hjbxx;
                        //     this.person2.instance.childInfo2 = this.hcylb;
                        //     this.person2.instance.type = this.type;
                        //     this.person2.instance.qshflId = this.qshflId;
                        //     this.person2.instance.init_person_data = this.init_person_data;
                        //
                        //     this.person2.instance.add_person_data = this.listHcyAdd;
                        //     this.person2.instance.del_person_data = this.del_person_data;
                        //     this.person2.instance.update_person_data = this.update_person_data;
                        //
                        //     this.person2.instance.ssxzqhSearchDm = this.qshflId.ssxzqhSearchDm;
                        //     if (this.type == 'add') {
                        //         this.person2.instance.qshflId = this.qshflId;
                        //
                        //     } else if (this.type == 'rew') {
                        //         this.person2.instance.qshflId = this.hjbxx;
                        //     }
                        //
                        //
                        //     break;
                        case 'fwjbxx':
                            if (this.fwjbxx_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    console.log(data);
                                    this.init_fwjbxx_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    const fw = this.AlertModel.resolveComponentFactory(HousesComponent);
                                    this.fw2 = this.ModelRoom.createComponent(fw);
                                    this.fw2.instance.houses_name_active_base_copy = this.houses_name_active_base_copy;
                                    this.fw2.instance.childInfo = this.hjbxx;
                                    this.fw2.instance.listHcyAdd = this.listHcyAdd;
                                    this.fw2.instance.childInfo2 = this.hcylb;
                                    this.fw2.instance.type = this.type;
                                    this.fw2.instance.init_houses_data = this.init_fwjbxx_data;


                                    this.fw2.instance.flxx_houses_update = this.flxx_fwjbxx_update;
                                    this.fw2.instance.flxx_houses_del = this.flxx_fwjbxx_del;
                                    this.fw2.instance.flxx_houses_add = this.flxx_fwjbxx_add;


                                    this.fw2.instance.update_houses_data = this.update_fwjbxx_data;
                                    this.fw2.instance.add_houses_data = this.add_fwjbxx_data;
                                    this.fw2.instance.del_houses_data = this.del_fwjbxx_data;

                                    this.fw2.instance.add_ggmx_data = this.add_fwjbxx_ggmx_data;
                                    this.fw2.instance.update_ggmx_data = this.update_fwjbxx_ggmx_data;
                                    this.fw2.instance.del_ggmx_data = this.del_fwjbxx_ggmx_data;

                                    this.fwjbxx_data = data;

                                    this.fw2.instance.data = this.fwjbxx_data;
                                    this.fw2.instance.bj_houses_data = this.bj_fwjbxx_data;
                                    this.fw2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.fw2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {

                                        this.fw2.instance.qshflId = this.hjbxx;
                                    }


                                });
                            } else {
                                console.log(this.fwjbxx_data);
                                const fw = this.AlertModel.resolveComponentFactory(HousesComponent);
                                this.fw2 = this.ModelRoom.createComponent(fw);
                                this.fw2.instance.houses_name_active_base_copy = this.houses_name_active_base_copy;
                                this.fw2.instance.childInfo = this.hjbxx;
                                this.fw2.instance.listHcyAdd = this.listHcyAdd;
                                this.fw2.instance.childInfo2 = this.hcylb;
                                this.fw2.instance.type = this.type;
                                this.fw2.instance.init_houses_data = this.init_fwjbxx_data;

                                this.fw2.instance.add_houses_data = this.add_fwjbxx_data;
                                this.fw2.instance.del_houses_data = this.del_fwjbxx_data;
                                this.fw2.instance.update_houses_data = this.update_fwjbxx_data;

                                this.fw2.instance.add_ggmx_data = this.add_fwjbxx_ggmx_data;
                                this.fw2.instance.update_ggmx_data = this.update_fwjbxx_ggmx_data;
                                this.fw2.instance.del_ggmx_data = this.del_fwjbxx_ggmx_data;


                                this.fw2.instance.flxx_houses_update = this.flxx_fwjbxx_update;
                                this.fw2.instance.flxx_houses_del = this.flxx_fwjbxx_del;
                                this.fw2.instance.flxx_houses_add = this.flxx_fwjbxx_add;


                                this.fw2.instance.data = this.fwjbxx_data;

                                this.fw2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.fw2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.fw2.instance.qshflId = this.hjbxx;
                                }
                            }

                            break;
                        case 'fwzxjbxx':
                            if (this.decor_data == null) {
                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    this.init_fwzxjbxx_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    const decor = this.AlertModel.resolveComponentFactory(DecorationComponent);
                                    this.fwzxjbxx = this.ModelRoom.createComponent(decor);

                                    this.fwzxjbxx.instance.childInfo = this.hjbxx;
                                    this.fwzxjbxx.instance.listHcyAdd = this.listHcyAdd;
                                    this.fwzxjbxx.instance.childInfo2 = this.hcylb;
                                    this.fwzxjbxx.instance.type = this.type;
                                    this.fwzxjbxx.instance.init_decor_data = this.init_fwzxjbxx_data;
                                    this.fwzxjbxx.instance.decor_name_active_base_copy = this.decor_name_active_base_copy;
                                    this.fwzxjbxx.instance.flxx_decor_update = this.flxx_fwzxjbxx_update;
                                    this.fwzxjbxx.instance.flxx_decor_add = this.flxx_fwzxjbxx_add;
                                    this.fwzxjbxx.instance.flxx_decor_del = this.flxx_fwzxjbxx_del;

                                    this.fwzxjbxx.instance.update_decor_data = this.update_fwzxjbxx_data;
                                    this.fwzxjbxx.instance.add_decor_data = this.add_fwzxjbxx_data;
                                    this.fwzxjbxx.instance.del_decor_data = this.del_fwzxjbxx_data;

                                    this.fwzxjbxx.instance.add_ggmx_data = this.add_fwzxjbxx_ggmx_data;
                                    this.fwzxjbxx.instance.update_ggmx_data = this.update_fwzxjbxx_ggmx_data;
                                    this.fwzxjbxx.instance.del_ggmx_data = this.del_fwzxjbxx_ggmx_data;


                                    this.fwzxjbxx.instance.bj_decor_data = this.bj_fwzxjbxx_data;

                                    this.decor_data = data;
                                    this.fwzxjbxx.instance.data = this.decor_data;

                                    this.fwzxjbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.fwzxjbxx.instance.qshflId = this.qshflId;

                                    } else if (this.type == 'rew') {
                                        this.fwzxjbxx.instance.qshflId = this.hjbxx;
                                    }

                                });
                            } else {
                                const decor = this.AlertModel.resolveComponentFactory(DecorationComponent);
                                this.fwzxjbxx = this.ModelRoom.createComponent(decor);

                                this.fwzxjbxx.instance.childInfo = this.hjbxx;
                                this.fwzxjbxx.instance.listHcyAdd = this.listHcyAdd;
                                this.fwzxjbxx.instance.childInfo2 = this.hcylb;
                                this.fwzxjbxx.instance.type = this.type;
                                this.fwzxjbxx.instance.init_decor_data = this.init_fwzxjbxx_data;
                                this.fwzxjbxx.instance.decor_name_active_base_copy = this.decor_name_active_base_copy;

                                this.fwzxjbxx.instance.flxx_decor_update = this.flxx_fwzxjbxx_update;
                                this.fwzxjbxx.instance.flxx_decor_add = this.flxx_fwzxjbxx_add;
                                this.fwzxjbxx.instance.flxx_decor_del = this.flxx_fwzxjbxx_del;

                                this.fwzxjbxx.instance.update_decor_data = this.update_fwzxjbxx_data;
                                this.fwzxjbxx.instance.add_decor_data = this.add_fwzxjbxx_data;
                                this.fwzxjbxx.instance.del_decor_data = this.del_fwzxjbxx_data;

                                this.fwzxjbxx.instance.add_ggmx_data = this.add_fwzxjbxx_ggmx_data;
                                this.fwzxjbxx.instance.update_ggmx_data = this.update_fwzxjbxx_ggmx_data;
                                this.fwzxjbxx.instance.del_ggmx_data = this.del_fwzxjbxx_ggmx_data;

                                this.fwzxjbxx.instance.data = this.decor_data;
                                this.fwzxjbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.fwzxjbxx.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.fwzxjbxx.instance.qshflId = this.hjbxx;
                                }
                            }


                            break;
                        case 'fsssjbxx':
                            if (this.fsss_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    console.log(data);
                                    this.init_fsssjbxx_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    const fsss = this.AlertModel.resolveComponentFactory(FsssComponent);
                                    this.fsssjbxx = this.ModelRoom.createComponent(fsss);
                                    this.fsssjbxx.instance.fsss_name_active_base_copy = this.fsss_name_active_base_copy;

                                    this.fsssjbxx.instance.childInfo = this.hjbxx;
                                    this.fsssjbxx.instance.listHcyAdd = this.listHcyAdd;
                                    this.fsssjbxx.instance.childInfo2 = this.hcylb;
                                    this.fsssjbxx.instance.type = this.type;
                                    this.fsssjbxx.instance.init_fsss_data = this.init_fsssjbxx_data;

                                    this.fsssjbxx.instance.flxx_fsss_update = this.flxx_fsssjbxx_update;
                                    this.fsssjbxx.instance.flxx_fsss_add = this.flxx_fsssjbxx_add;
                                    this.fsssjbxx.instance.flxx_fsss_del = this.flxx_fsssjbxx_del;


                                    this.fsssjbxx.instance.update_fsss_data = this.update_fsssjbxx_data;
                                    this.fsssjbxx.instance.add_fsss_data = this.add_fsssjbxx_data;
                                    this.fsssjbxx.instance.del_fsss_data = this.del_fsssjbxx_data;

                                    this.fsssjbxx.instance.add_ggmx_data = this.add_fsssjbxx_ggmx_data;
                                    this.fsssjbxx.instance.update_ggmx_data = this.update_fsssjbxx_ggmx_data;
                                    this.fsssjbxx.instance.del_ggmx_data = this.del_fsssjbxx_ggmx_data;


                                    this.fsssjbxx.instance.bj_fsss_data = this.bj_fsssjbxx_data;

                                    this.fsss_data = data;
                                    this.fsssjbxx.instance.data = this.fsss_data;

                                    this.fsssjbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.fsssjbxx.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.fsssjbxx.instance.qshflId = this.hjbxx;
                                    }


                                });
                            } else {

                                const fsss = this.AlertModel.resolveComponentFactory(FsssComponent);
                                this.fsssjbxx = this.ModelRoom.createComponent(fsss);
                                this.fsssjbxx.instance.fsss_name_active_base_copy = this.fsss_name_active_base_copy;

                                this.fsssjbxx.instance.childInfo = this.hjbxx;
                                this.fsssjbxx.instance.listHcyAdd = this.listHcyAdd;
                                this.fsssjbxx.instance.childInfo2 = this.hcylb;
                                this.fsssjbxx.instance.type = this.type;
                                this.fsssjbxx.instance.init_fsss_data = this.init_fsssjbxx_data;

                                this.fsssjbxx.instance.flxx_fsss_update = this.flxx_fsssjbxx_update;
                                this.fsssjbxx.instance.flxx_fsss_add = this.flxx_fsssjbxx_add;
                                this.fsssjbxx.instance.flxx_fsss_del = this.flxx_fsssjbxx_del;


                                this.fsssjbxx.instance.update_fsss_data = this.update_fsssjbxx_data;
                                this.fsssjbxx.instance.add_fsss_data = this.add_fsssjbxx_data;
                                this.fsssjbxx.instance.del_fsss_data = this.del_fsssjbxx_data;

                                this.fsssjbxx.instance.add_ggmx_data = this.add_fsssjbxx_ggmx_data;
                                this.fsssjbxx.instance.update_ggmx_data = this.update_fsssjbxx_ggmx_data;
                                this.fsssjbxx.instance.del_ggmx_data = this.del_fsssjbxx_ggmx_data;

                                this.fsssjbxx.instance.data = this.fsss_data;
                                this.fsssjbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.fsssjbxx.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.fsssjbxx.instance.qshflId = this.hjbxx;
                                }
                            }
                            break;
                        case 'tdjbxx':
                            if (this.land_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    console.log(data);
                                    this.init_tdjbxx_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    const land = this.AlertModel.resolveComponentFactory(LandComponent);
                                    this.tdjbxx = this.ModelRoom.createComponent(land);
                                    this.tdjbxx.instance.land_name_active_base_copy = this.land_name_active_base_copy;

                                    this.tdjbxx.instance.childInfo = this.hjbxx;
                                    this.tdjbxx.instance.listHcyAdd = this.listHcyAdd;
                                    this.tdjbxx.instance.childInfo2 = this.hcylb;
                                    this.tdjbxx.instance.type = this.type;
                                    this.tdjbxx.instance.init_land_data = this.init_tdjbxx_data;

                                    this.tdjbxx.instance.flxx_land_update = this.flxx_tdjbxx_update;
                                    this.tdjbxx.instance.flxx_land_add = this.flxx_tdjbxx_add;
                                    this.tdjbxx.instance.flxx_land_del = this.flxx_tdjbxx_del;


                                    this.tdjbxx.instance.add_land_data = this.add_tdjbxx_data;
                                    this.tdjbxx.instance.update_land_data = this.update_tdjbxx_data;
                                    this.tdjbxx.instance.del_land_data = this.del_tdjbxx_data;

                                    this.tdjbxx.instance.add_ggmx_data = this.add_tdjbxx_ggmx_data;
                                    this.tdjbxx.instance.update_ggmx_data = this.update_tdjbxx_ggmx_data;
                                    this.tdjbxx.instance.del_ggmx_data = this.del_tdjbxx_ggmx_data;

                                    this.tdjbxx.instance.bj_land_data = this.bj_tdjbxx_data;

                                    this.land_data = data;
                                    this.tdjbxx.instance.data = this.land_data;

                                    this.tdjbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.tdjbxx.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.tdjbxx.instance.qshflId = this.hjbxx;
                                    }


                                });
                            } else {

                                const land = this.AlertModel.resolveComponentFactory(LandComponent);
                                this.tdjbxx = this.ModelRoom.createComponent(land);

                                this.tdjbxx.instance.land_name_active_base_copy = this.land_name_active_base_copy;

                                this.tdjbxx.instance.childInfo = this.hjbxx;
                                this.tdjbxx.instance.listHcyAdd = this.listHcyAdd;
                                this.tdjbxx.instance.childInfo2 = this.hcylb;
                                this.tdjbxx.instance.type = this.type;
                                this.tdjbxx.instance.init_land_data = this.init_tdjbxx_data;

                                this.tdjbxx.instance.flxx_land_update = this.flxx_tdjbxx_update;
                                this.tdjbxx.instance.flxx_land_add = this.flxx_tdjbxx_add;
                                this.tdjbxx.instance.flxx_land_del = this.flxx_tdjbxx_del;


                                this.tdjbxx.instance.add_land_data = this.add_tdjbxx_data;
                                this.tdjbxx.instance.update_land_data = this.update_tdjbxx_data;
                                this.tdjbxx.instance.del_land_data = this.del_tdjbxx_data;

                                this.tdjbxx.instance.add_ggmx_data = this.add_fwjbxx_ggmx_data;
                                this.tdjbxx.instance.update_ggmx_data = this.update_tdjbxx_ggmx_data;
                                this.tdjbxx.instance.del_ggmx_data = this.del_tdjbxx_ggmx_data;

                                this.tdjbxx.instance.data = this.land_data;

                                this.tdjbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.tdjbxx.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.tdjbxx.instance.qshflId = this.hjbxx;
                                }
                            }

                            break;
                        case 'tdfzwjbxx':
                            if (this.land_other_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    console.log(data);
                                    this.init_tdfzwjbxx_other_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    const land_other = this.AlertModel.resolveComponentFactory(LandOtherComponent);
                                    this.tdfzwjbxx = this.ModelRoom.createComponent(land_other);
                                    this.tdfzwjbxx.instance.land_other_name_active_base_copy = this.land_other_name_active_base_copy;

                                    this.tdfzwjbxx.instance.childInfo = this.hjbxx;
                                    this.tdfzwjbxx.instance.listHcyAdd = this.listHcyAdd;
                                    this.tdfzwjbxx.instance.childInfo2 = this.hcylb;
                                    this.tdfzwjbxx.instance.type = this.type;
                                    this.tdfzwjbxx.instance.init_land_other_data = this.init_tdfzwjbxx_other_data;

                                    this.tdfzwjbxx.instance.flxx_land_other_update = this.flxx_tdfzwjbxx_other_update;
                                    this.tdfzwjbxx.instance.flxx_land_other_add = this.flxx_tdfzwjbxx_other_add;
                                    this.tdfzwjbxx.instance.flxx_land_other_del = this.flxx_tdfzwjbxx_other_del;

                                    this.tdfzwjbxx.instance.update_land_other_data = this.update_tdfzwjbxx_other_data;
                                    this.tdfzwjbxx.instance.add_land_other_data = this.add_tdfzwjbxx_other_data;
                                    this.tdfzwjbxx.instance.del_land_other_data = this.del_tdfzwjbxx_other_data;

                                    this.tdfzwjbxx.instance.add_ggmx_data = this.add_tdjbxx_ggmx_other_data;
                                    this.tdfzwjbxx.instance.update_ggmx_data = this.update_tdjbxx_other_ggmx_data;
                                    this.tdfzwjbxx.instance.del_ggmx_data = this.del_tdjbxx_ggmx_other_data;


                                    this.tdfzwjbxx.instance.bj_land_other_data = this.bj_tdfzwjbxx_other_data;

                                    this.land_other_data = data;
                                    this.tdfzwjbxx.instance.data = this.land_other_data;

                                    this.tdfzwjbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.tdfzwjbxx.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.tdfzwjbxx.instance.qshflId = this.hjbxx;
                                    }


                                });
                            } else {

                                const land_other = this.AlertModel.resolveComponentFactory(LandOtherComponent);
                                this.tdfzwjbxx = this.ModelRoom.createComponent(land_other);

                                this.tdfzwjbxx.instance.childInfo = this.hjbxx;
                                this.tdfzwjbxx.instance.listHcyAdd = this.listHcyAdd;
                                this.tdfzwjbxx.instance.childInfo2 = this.hcylb;
                                this.tdfzwjbxx.instance.type = this.type;
                                this.tdfzwjbxx.instance.init_land_other_data = this.init_tdfzwjbxx_other_data;
                                this.tdfzwjbxx.instance.land_other_name_active_base_copy = this.land_other_name_active_base_copy;

                                this.tdfzwjbxx.instance.flxx_land_other_update = this.flxx_tdfzwjbxx_other_update;
                                this.tdfzwjbxx.instance.flxx_land_other_add = this.flxx_tdfzwjbxx_other_add;
                                this.tdfzwjbxx.instance.flxx_land_other_del = this.flxx_tdfzwjbxx_other_del;

                                this.tdfzwjbxx.instance.update_land_other_data = this.update_tdfzwjbxx_other_data;
                                this.tdfzwjbxx.instance.add_land_other_data = this.add_tdfzwjbxx_other_data;
                                this.tdfzwjbxx.instance.del_land_other_data = this.del_tdfzwjbxx_other_data;

                                this.tdfzwjbxx.instance.add_ggmx_data = this.add_tdjbxx_ggmx_other_data;
                                this.tdfzwjbxx.instance.update_ggmx_data = this.update_tdjbxx_other_ggmx_data;
                                this.tdfzwjbxx.instance.del_ggmx_data = this.del_tdjbxx_ggmx_other_data;
                                this.tdfzwjbxx.instance.data = this.land_other_data;

                                this.tdfzwjbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.tdfzwjbxx.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.tdfzwjbxx.instance.qshflId = this.hjbxx;
                                }
                            }
                            break;
                        case 'lxgm':
                            if (this.trees_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    this.init_lxgm_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    const trees = this.AlertModel.resolveComponentFactory(TreesComponent);
                                    this.lxgm = this.ModelRoom.createComponent(trees);
                                    this.lxgm.instance.trees_name_active_base_copy = this.trees_name_active_base_copy;
                                    this.lxgm.instance.childInfo = this.hjbxx;
                                    this.lxgm.instance.childInfo2 = this.hcylb;
                                    this.lxgm.instance.listHcyAdd = this.listHcyAdd;
                                    this.lxgm.instance.type = this.type;
                                    this.lxgm.instance.init_trees_data = this.init_lxgm_data;

                                    this.lxgm.instance.update_trees_data = this.update_lxgm_data;
                                    this.lxgm.instance.add_trees_data = this.add_lxgm_data;
                                    this.lxgm.instance.del_trees_data = this.del_lxgm_data;

                                    this.lxgm.instance.add_ggmx_data = this.add_lxgm_ggmx_data;
                                    this.lxgm.instance.update_ggmx_data = this.update_lxgm_ggmx_data;
                                    this.lxgm.instance.del_ggmx_data = this.del_lxgm_ggmx_data;

                                    this.lxgm.instance.flxx_trees_update = this.flxx_lxgm_update;
                                    this.lxgm.instance.flxx_trees_add = this.flxx_lxgm_add;
                                    this.lxgm.instance.flxx_trees_del = this.flxx_lxgm_del;

                                    this.lxgm.instance.bj_trees_data = this.bj_lxgm_data;

                                    this.trees_data = data;
                                    this.lxgm.instance.data = data;

                                    this.lxgm.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.lxgm.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.lxgm.instance.qshflId = this.hjbxx;
                                    }

                                });
                            } else {
                                const trees = this.AlertModel.resolveComponentFactory(TreesComponent);
                                this.lxgm = this.ModelRoom.createComponent(trees);


                                this.lxgm.instance.childInfo = this.hjbxx;
                                this.lxgm.instance.childInfo2 = this.hcylb;
                                this.lxgm.instance.listHcyAdd = this.listHcyAdd;
                                this.lxgm.instance.type = this.type;
                                this.lxgm.instance.init_trees_data = this.init_lxgm_data;
                                this.lxgm.instance.trees_name_active_base_copy = this.trees_name_active_base_copy;


                                this.lxgm.instance.update_trees_data = this.update_lxgm_data;
                                this.lxgm.instance.add_trees_data = this.add_lxgm_data;
                                this.lxgm.instance.del_trees_data = this.del_lxgm_data;


                                this.lxgm.instance.add_ggmx_data = this.add_lxgm_ggmx_data;
                                this.lxgm.instance.update_ggmx_data = this.update_lxgm_ggmx_data;
                                this.lxgm.instance.del_ggmx_data = this.del_lxgm_ggmx_data;

                                this.lxgm.instance.flxx_trees_update = this.flxx_lxgm_update;
                                this.lxgm.instance.flxx_trees_add = this.flxx_lxgm_add;
                                this.lxgm.instance.flxx_trees_del = this.flxx_lxgm_del;

                                this.lxgm.instance.data = this.trees_data;

                                this.lxgm.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.lxgm.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.lxgm.instance.qshflId = this.hjbxx;
                                }
                            }

                            break;
                        case 'xxzx':
                            if (this.water_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    console.log(data)
                                    this.init_xxzx_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    const water = this.AlertModel.resolveComponentFactory(WaterComponent);
                                    this.xxzx = this.ModelRoom.createComponent(water);
                                    this.xxzx.instance.water_name_active_base_copy = this.water_name_active_base_copy;
                                    this.xxzx.instance.childInfo = this.hjbxx;
                                    this.xxzx.instance.listHcyAdd = this.listHcyAdd;
                                    this.xxzx.instance.childInfo2 = this.hcylb;
                                    this.xxzx.instance.type = this.type;
                                    this.xxzx.instance.init_water_data = this.init_xxzx_data;

                                    this.xxzx.instance.flxx_water_update = this.flxx_xxzx_update;
                                    this.xxzx.instance.flxx_water_add = this.flxx_xxzx_add;
                                    this.xxzx.instance.flxx_water_del = this.flxx_xxzx_del;

                                    this.xxzx.instance.update_water_data = this.update_xxzx_data;
                                    this.xxzx.instance.add_water_data = this.add_xxzx_data;
                                    this.xxzx.instance.del_water_data = this.del_xxzx_data;

                                    this.xxzx.instance.add_ggmx_data = this.add_xxzx_ggmx_data;
                                    this.xxzx.instance.update_ggmx_data = this.update_xxzx_ggmx_data;
                                    this.xxzx.instance.del_ggmx_data = this.del_xxzx_ggmx_data;

                                    this.xxzx.instance.bj_water_data = this.bj_xxzx_data;

                                    this.water_data = data;
                                    this.xxzx.instance.data = data;

                                    this.xxzx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.xxzx.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.xxzx.instance.qshflId = this.hjbxx;
                                    }

                                });
                            } else {
                                const water = this.AlertModel.resolveComponentFactory(WaterComponent);
                                this.xxzx = this.ModelRoom.createComponent(water);
                                this.xxzx.instance.water_name_active_base_copy = this.water_name_active_base_copy;
                                this.xxzx.instance.childInfo = this.hjbxx;
                                this.xxzx.instance.listHcyAdd = this.listHcyAdd;
                                this.xxzx.instance.childInfo2 = this.hcylb;
                                this.xxzx.instance.type = this.type;
                                this.xxzx.instance.init_water_data = this.init_xxzx_data;

                                this.xxzx.instance.flxx_water_update = this.flxx_xxzx_update;
                                this.xxzx.instance.flxx_water_add = this.flxx_xxzx_add;
                                this.xxzx.instance.flxx_water_del = this.flxx_xxzx_del;

                                this.xxzx.instance.update_water_data = this.update_xxzx_data;
                                this.xxzx.instance.add_water_data = this.add_xxzx_data;
                                this.xxzx.instance.del_water_data = this.del_xxzx_data;

                                this.xxzx.instance.add_ggmx_data = this.add_xxzx_ggmx_data;
                                this.xxzx.instance.update_ggmx_data = this.update_xxzx_ggmx_data;
                                this.xxzx.instance.del_ggmx_data = this.del_xxzx_ggmx_data;

                                this.xxzx.instance.data = this.water_data;
                                this.xxzx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.xxzx.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.xxzx.instance.qshflId = this.hjbxx;
                                }
                            }

                            break;
                        case 'fm':
                            if (this.grave_data == null) {
                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    this.init_grave_data = JSON.parse(JSON.stringify(data['returnObject']));


                                    if (data['returnObject']) {

                                        this.mzlb = data['returnObject'];
                                    } else {
                                        this.mzlb = new Array();
                                    }


                                    const Grave = this.AlertModel.resolveComponentFactory(GraveComponent);
                                    this.fmjbxx = this.ModelRoom.createComponent(Grave);

                                    this.fmjbxx.instance.childInfo = this.mzjbxx;
                                    this.fmjbxx.instance.childInfo2 = this.mzlb;
                                    this.fmjbxx.instance.childInfo3 = this.hcylb;
                                    this.fmjbxx.instance.childInfo4 = this.hjbxx;

                                    this.fmjbxx.instance.type = this.type;
                                    this.fmjbxx.instance.qshflId = this.qshflId;
                                    this.fmjbxx.instance.init_grave_data = this.init_grave_data;
                                    this.fmjbxx.instance.listHcyAdd = this.listHcyAdd;
                                    this.fmjbxx.instance.add_grave_data = this.add_grave_data;
                                    this.fmjbxx.instance.del_grave_data = this.del_grave_data;
                                    this.fmjbxx.instance.update_grave_data = this.update_grave_data;
                                    this.grave_data = data;

                                    this.fmjbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.fmjbxx.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.fmjbxx.instance.qshflId = this.hjbxx;
                                    }

                                });
                            } else {


                                const Grave = this.AlertModel.resolveComponentFactory(GraveComponent);
                                this.fmjbxx = this.ModelRoom.createComponent(Grave);


                                this.fmjbxx.instance.childInfo = this.mzjbxx;
                                this.fmjbxx.instance.childInfo2 = this.mzlb;
                                this.fmjbxx.instance.childInfo3 = this.hcylb;
                                this.fmjbxx.instance.childInfo4 = this.hjbxx;
                                this.fmjbxx.instance.type = this.type;
                                this.fmjbxx.instance.qshflId = this.qshflId;
                                this.fmjbxx.instance.init_grave_data = this.init_grave_data;
                                this.fmjbxx.instance.listHcyAdd = this.listHcyAdd;
                                this.fmjbxx.instance.add_grave_data = this.add_grave_data;
                                this.fmjbxx.instance.del_grave_data = this.del_grave_data;
                                this.fmjbxx.instance.update_grave_data = this.update_grave_data;

                                this.fmjbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;

                                if (this.type == 'add') {
                                    this.fmjbxx.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.fmjbxx.instance.qshflId = this.hjbxx;
                                }
                            }

                            break;
                        // case 'qsr':
                        //     console.log(this.hjbxx);
                        //     const qsr = this.AlertModel.resolveComponentFactory(QsrComponent);
                        //
                        //     this.person2 = this.ModelRoom.createComponent(qsr);
                        //
                        //
                        //     this.person2.instance.childInfo = this.hjbxx;
                        //     this.person2.instance.childInfo2 = this.hcylb;
                        //     this.person2.instance.type = this.type;
                        //     this.person2.instance.qshflId = this.qshflId;
                        //     this.person2.instance.init_person_data = this.init_person_data;
                        //
                        //     this.person2.instance.add_person_data = this.listHcyAdd;
                        //     this.person2.instance.del_person_data = this.del_person_data;
                        //     this.person2.instance.update_person_data = this.update_person_data;
                        //
                        //     this.person2.instance.ssxzqhSearchDm = this.qshflId.ssxzqhSearchDm;
                        //     if (this.type == 'add') {
                        //         this.person2.instance.qshflId = this.qshflId;
                        //
                        //     } else if (this.type == 'rew') {
                        //         this.person2.instance.qshflId = this.hjbxx;
                        //     }
                        //
                        //     break;
                        case 'gtgsh':
                            console.log(this.qshflId);
                            if (this.gtgsjbxx_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    console.log(data);

                                    const gtgsjbxx = this.AlertModel.resolveComponentFactory(JtgsjbxqComponent);
                                    this.gtgsjbxx2 = this.ModelRoom.createComponent(gtgsjbxx);


                                    this.init_gtgsjbxx2_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.gtgsjbxx_data = data;
                                    console.log(this.hjbxx);
                                    this.gtgsjbxx2.instance.gtgsjbxx2_data = this.gtgsjbxx_data;
                                    this.gtgsjbxx2.instance.childInfo = this.hjbxx;
                                    this.gtgsjbxx2.instance.childInfo2 = this.hcylb;
                                    this.gtgsjbxx2.instance.type = this.type;
                                    this.gtgsjbxx2.instance.listHcyAdd = this.listHcyAdd;
                                    this.gtgsjbxx2.instance.init_gtgsjbxx_data = this.init_gtgsjbxx2_data;


                                    this.gtgsjbxx2.instance.update_gtgsjbxx_data = this.update_gtgsjbxx_data;
                                    this.gtgsjbxx2.instance.add_gtgsjbxx_data = this.add_gtgsjbxx_data;
                                    this.gtgsjbxx2.instance.del_gtgsjbxx_data = this.del_gtgsjbxx_data;


                                    this.gtgsjbxx2.instance.szxzqugtgsdm = this.qshflId.ssxzqhSearchDm;

                                    if (this.type == 'add') {
                                        this.gtgsjbxx2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.gtgsjbxx2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {


                                const gtgsjbxx = this.AlertModel.resolveComponentFactory(JtgsjbxqComponent);
                                this.gtgsjbxx2 = this.ModelRoom.createComponent(gtgsjbxx);

                                this.gtgsjbxx2.instance.gtgsjbxx2_data = this.gtgsjbxx_data;
                                this.gtgsjbxx2.instance.childInfo = this.hjbxx;

                                this.gtgsjbxx2.instance.type = this.type;
                                this.gtgsjbxx2.instance.childInfo2 = this.hcylb;
                                this.gtgsjbxx2.instance.listHcyAdd = this.listHcyAdd;
                                this.gtgsjbxx2.instance.init_gtgsjbxx_data = this.init_gtgsjbxx2_data;


                                this.gtgsjbxx2.instance.update_gtgsjbxx_data = this.update_gtgsjbxx_data;
                                this.gtgsjbxx2.instance.add_gtgsjbxx_data = this.add_gtgsjbxx_data;
                                this.gtgsjbxx2.instance.del_gtgsjbxx_data = this.del_gtgsjbxx_data;


                                this.gtgsjbxx2.instance.szxzqugtgsdm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.gtgsjbxx2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.gtgsjbxx2.instance.qshflId = this.hjbxx;
                                }


                            }
                            break;
                        case'sbxx':
                            if (this.shebei_data == null) {
                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    this.init_shebei_data = JSON.parse(JSON.stringify(data['returnObject']));


                                    if (data['returnObject']) {

                                        this.sblb = data['returnObject'];
                                    } else {
                                        this.sblb = new Array();
                                    }


                                    const shebei = this.AlertModel.resolveComponentFactory(ShebeiComponent);
                                    this.shebeijbxx = this.ModelRoom.createComponent(shebei);


                                    this.shebeijbxx.instance.childInfo2 = this.sblb;
                                    this.shebeijbxx.instance.childInfo3 = this.hcylb;
                                    this.shebeijbxx.instance.childInfo4 = this.hjbxx;

                                    this.shebeijbxx.instance.type = this.type;
                                    this.shebeijbxx.instance.qshflId = this.qshflId;
                                    this.shebeijbxx.instance.init_shebei_data = this.init_shebei_data;
                                    this.shebeijbxx.instance.listHcyAdd = this.listHcyAdd;
                                    this.shebeijbxx.instance.add_shebei_data = this.add_shebei_data;
                                    this.shebeijbxx.instance.del_shebei_data = this.del_shebei_data;
                                    this.shebeijbxx.instance.update_shebei_data = this.update_shebei_data;
                                    this.shebei_data = data;

                                    this.shebeijbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.shebeijbxx.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.shebeijbxx.instance.qshflId = this.hjbxx;
                                    }

                                });
                            } else {


                                const shebei = this.AlertModel.resolveComponentFactory(ShebeiComponent);
                                this.shebeijbxx = this.ModelRoom.createComponent(shebei);


                                this.shebeijbxx.instance.childInfo2 = this.sblb;
                                this.shebeijbxx.instance.childInfo3 = this.hcylb;
                                this.shebeijbxx.instance.childInfo4 = this.hjbxx;
                                this.shebeijbxx.instance.type = this.type;
                                this.shebeijbxx.instance.qshflId = this.qshflId;
                                this.shebeijbxx.instance.init_shebei_data = this.init_shebei_data;
                                this.shebeijbxx.instance.listHcyAdd = this.listHcyAdd;
                                this.shebeijbxx.instance.add_shebei_data = this.add_shebei_data;
                                this.shebeijbxx.instance.del_shebei_data = this.del_shebei_data;
                                this.shebeijbxx.instance.update_shebei_data = this.update_shebei_data;

                                this.shebeijbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;

                                if (this.type == 'add') {
                                    this.shebeijbxx.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.shebeijbxx.instance.qshflId = this.hjbxx;
                                }
                            }

                            break;
                        case'ssxx':
                            if (this.sheshi_data == null) {
                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    this.init_sheshi_data = JSON.parse(JSON.stringify(data['returnObject']));


                                    if (data['returnObject']) {

                                        this.sslb = data['returnObject'];
                                    } else {
                                        this.sslb = new Array();
                                    }


                                    const shebei = this.AlertModel.resolveComponentFactory(SheshiComponent);
                                    this.sheshijbxx = this.ModelRoom.createComponent(shebei);


                                    this.sheshijbxx.instance.childInfo2 = this.sslb;
                                    this.sheshijbxx.instance.childInfo3 = this.hcylb;
                                    this.sheshijbxx.instance.childInfo4 = this.hjbxx;

                                    this.sheshijbxx.instance.type = this.type;
                                    this.sheshijbxx.instance.qshflId = this.qshflId;
                                    this.sheshijbxx.instance.init_sheshi_data = this.init_sheshi_data;
                                    this.sheshijbxx.instance.listHcyAdd = this.listHcyAdd;
                                    this.sheshijbxx.instance.add_sheshi_data = this.add_sheshi_data;
                                    this.sheshijbxx.instance.del_sheshi_data = this.del_sheshi_data;
                                    this.sheshijbxx.instance.update_sheshi_data = this.update_sheshi_data;
                                    this.sheshi_data = data;

                                    this.sheshijbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.sheshijbxx.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.sheshijbxx.instance.qshflId = this.hjbxx;
                                    }

                                });
                            } else {


                                const shebei = this.AlertModel.resolveComponentFactory(SheshiComponent);
                                this.sheshijbxx = this.ModelRoom.createComponent(shebei);


                                this.sheshijbxx.instance.childInfo2 = this.sslb;
                                this.sheshijbxx.instance.childInfo3 = this.hcylb;
                                this.sheshijbxx.instance.childInfo4 = this.hjbxx;
                                this.sheshijbxx.instance.type = this.type;
                                this.sheshijbxx.instance.qshflId = this.qshflId;
                                this.sheshijbxx.instance.init_sheshi_data = this.init_sheshi_data;
                                this.sheshijbxx.instance.listHcyAdd = this.listHcyAdd;
                                this.sheshijbxx.instance.add_sheshi_data = this.add_sheshi_data;
                                this.sheshijbxx.instance.del_sheshi_data = this.del_sheshi_data;
                                this.sheshijbxx.instance.update_shebei_data = this.update_sheshi_data;

                                this.sheshijbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;

                                if (this.type == 'add') {
                                    this.sheshijbxx.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.sheshijbxx.instance.qshflId = this.hjbxx;
                                }
                            }

                            break;
                        case'nfyh':
                            if (this.nfyjbxx2_data == null) {

                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    console.log(data);

                                    const nfyjbxx = this.AlertModel.resolveComponentFactory(NfyssjbqkComponent);
                                    this.nfyjbxx2 = this.ModelRoom.createComponent(nfyjbxx);


                                    this.init_nfyjbxx2_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.nfyjbxx2_data = data;
                                    console.log(this.hjbxx);
                                    this.nfyjbxx2.instance.nfyjbxx2_data = this.nfyjbxx2_data;
                                    this.nfyjbxx2.instance.childInfo = this.hjbxx;
                                    this.nfyjbxx2.instance.childInfo2 = this.hcylb;
                                    this.nfyjbxx2.instance.type = this.type;
                                    this.nfyjbxx2.instance.listHcyAdd = this.listHcyAdd;
                                    this.nfyjbxx2.instance.init_nfyjbxx_data = this.init_nfyjbxx2_data;


                                    this.nfyjbxx2.instance.update_nfyjbxx_data = this.update_nfyjbxx_data;
                                    this.nfyjbxx2.instance.add_nfyjbxx_data = this.add_nfyjbxx_data;
                                    this.nfyjbxx2.instance.del_nfyjbxx_data = this.del_nfyjbxx_data;


                                    this.nfyjbxx2.instance.szxzqunfydm = this.qshflId.ssxzqhSearchDm;

                                    if (this.type == 'add') {
                                        this.nfyjbxx2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.nfyjbxx2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {


                                const nfyjbxx = this.AlertModel.resolveComponentFactory(NfyssjbqkComponent);
                                this.nfyjbxx2 = this.ModelRoom.createComponent(nfyjbxx);

                                this.nfyjbxx2.instance.nfyjbxx2_data = this.nfyjbxx2_data;
                                this.nfyjbxx2.instance.childInfo = this.hjbxx;

                                this.nfyjbxx2.instance.type = this.type;
                                this.nfyjbxx2.instance.childInfo2 = this.hcylb;
                                this.nfyjbxx2.instance.listHcyAdd = this.listHcyAdd;
                                this.nfyjbxx2.instance.init_nfyjbxx_data = this.init_nfyjbxx2_data;


                                this.nfyjbxx2.instance.update_nfyjbxx_data = this.update_nfyjbxx_data;
                                this.nfyjbxx2.instance.add_nfyjbxx_data = this.add_nfyjbxx_data;
                                this.nfyjbxx2.instance.del_nfyjbxx_data = this.del_nfyjbxx_data;


                                this.nfyjbxx2.instance.szxzqunfydm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.nfyjbxx2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.nfyjbxx2.instance.qshflId = this.hjbxx;
                                }


                            }
                            break;
                        case 'fyssjbxx':

                            if (this.fyss_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    console.log(data);
                                    this.init_fyssjbxx_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    const fyss = this.AlertModel.resolveComponentFactory(FyssComponent);
                                    this.fyssjbxx = this.ModelRoom.createComponent(fyss);
                                    this.fyssjbxx.instance.fyss_name_active_base_copy = this.fyss_name_active_base_copy;

                                    this.fyssjbxx.instance.childInfo = this.hjbxx;
                                    this.fyssjbxx.instance.listHcyAdd = this.listHcyAdd;
                                    this.fyssjbxx.instance.childInfo2 = this.hcylb;
                                    this.fyssjbxx.instance.type = this.type;
                                    this.fyssjbxx.instance.init_fyss_data = this.init_fyssjbxx_data;

                                    this.fyssjbxx.instance.flxx_fyss_update = this.flxx_fyssjbxx_update;
                                    this.fyssjbxx.instance.flxx_fyss_add = this.flxx_fyssjbxx_add;
                                    this.fyssjbxx.instance.flxx_fyss_del = this.flxx_fyssjbxx_del;


                                    this.fyssjbxx.instance.update_fyss_data = this.update_fyssjbxx_data;
                                    this.fyssjbxx.instance.add_fyss_data = this.add_fyssjbxx_data;
                                    this.fyssjbxx.instance.del_fyss_data = this.del_fyssjbxx_data;

                                    this.fyssjbxx.instance.add_ggmx_data = this.add_fyssjbxx_ggmx_data;
                                    this.fyssjbxx.instance.update_ggmx_data = this.update_fyssjbxx_ggmx_data;
                                    this.fyssjbxx.instance.del_ggmx_data = this.del_fyssjbxx_ggmx_data;


                                    this.fyssjbxx.instance.bj_fyss_data = this.bj_fyssjbxx_data;

                                    this.fyss_data = data;
                                    this.fyssjbxx.instance.data = this.fyss_data;

                                    this.fyssjbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.fyssjbxx.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.fyssjbxx.instance.qshflId = this.hjbxx;
                                    }


                                });
                            } else {

                                const fyss = this.AlertModel.resolveComponentFactory(FyssComponent);
                                this.fyssjbxx = this.ModelRoom.createComponent(fyss);
                                this.fyssjbxx.instance.fyss_name_active_base_copy = this.fyss_name_active_base_copy;

                                this.fyssjbxx.instance.childInfo = this.hjbxx;
                                this.fyssjbxx.instance.listHcyAdd = this.listHcyAdd;
                                this.fyssjbxx.instance.childInfo2 = this.hcylb;
                                this.fyssjbxx.instance.type = this.type;
                                this.fyssjbxx.instance.init_fyss_data = this.init_fyssjbxx_data;

                                this.fyssjbxx.instance.flxx_fyss_update = this.flxx_fyssjbxx_update;
                                this.fyssjbxx.instance.flxx_fyss_add = this.flxx_fyssjbxx_add;
                                this.fyssjbxx.instance.flxx_fyss_del = this.flxx_fyssjbxx_del;


                                this.fyssjbxx.instance.update_fyss_data = this.update_fyssjbxx_data;
                                this.fyssjbxx.instance.add_fyss_data = this.add_fyssjbxx_data;
                                this.fyssjbxx.instance.del_fyss_data = this.del_fyssjbxx_data;

                                this.fyssjbxx.instance.add_ggmx_data = this.add_fyssjbxx_ggmx_data;
                                this.fyssjbxx.instance.update_ggmx_data = this.update_fyssjbxx_ggmx_data;
                                this.fyssjbxx.instance.del_ggmx_data = this.del_fyssjbxx_ggmx_data;

                                this.fyssjbxx.instance.data = this.fyss_data;
                                this.fyssjbxx.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.fyssjbxx.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.fyssjbxx.instance.qshflId = this.hjbxx;
                                }
                            }

                            break;
                        case 'dw' :
                            if (this.dwjbxx2_data == null) {

                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    console.log(data);

                                    const dwjbxx = this.AlertModel.resolveComponentFactory(DwqbqkComponent);
                                    this.dwjbxx2 = this.ModelRoom.createComponent(dwjbxx);


                                    this.init_dwjbxx2_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.dwjbxx2_data = data;
                                    console.log(this.hjbxx);
                                    this.dwjbxx2.instance.dwjbxx2_data = this.dwjbxx2_data;
                                    this.dwjbxx2.instance.childInfo = this.hjbxx;
                                    this.dwjbxx2.instance.childInfo2 = this.hcylb;
                                    this.dwjbxx2.instance.type = this.type;
                                    this.dwjbxx2.instance.listHcyAdd = this.listHcyAdd;
                                    this.dwjbxx2.instance.init_dwjbxx_data = this.init_dwjbxx2_data;


                                    this.dwjbxx2.instance.update_dwjbxx_data = this.update_dwjbxx_data;
                                    this.dwjbxx2.instance.add_dwjbxx_data = this.add_dwjbxx_data;
                                    this.dwjbxx2.instance.del_dwjbxx_data = this.del_dwjbxx_data;


                                    this.dwjbxx2.instance.szxzqudwdm = this.qshflId.ssxzqhSearchDm;

                                    if (this.type == 'add') {
                                        this.dwjbxx2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.dwjbxx2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {


                                const dwjbxx = this.AlertModel.resolveComponentFactory(DwqbqkComponent);
                                this.dwjbxx2 = this.ModelRoom.createComponent(dwjbxx);

                                this.dwjbxx2.instance.dwjbxx2_data = this.dwjbxx2_data;
                                this.dwjbxx2.instance.childInfo = this.hjbxx;

                                this.dwjbxx2.instance.type = this.type;
                                this.dwjbxx2.instance.childInfo2 = this.hcylb;
                                this.dwjbxx2.instance.listHcyAdd = this.listHcyAdd;
                                this.dwjbxx2.instance.init_dwjbxx_data = this.init_dwjbxx2_data;


                                this.dwjbxx2.instance.update_dwjbxx_data = this.update_dwjbxx_data;
                                this.dwjbxx2.instance.add_dwjbxx_data = this.add_dwjbxx_data;
                                this.dwjbxx2.instance.del_dwjbxx_data = this.del_dwjbxx_data;


                                this.dwjbxx2.instance.szxzqudwdm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.dwjbxx2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.dwjbxx2.instance.qshflId = this.hjbxx;
                                }


                            }
                            break;
                        case 'gykqyxq':
                            const gykqyxq = this.AlertModel.resolveComponentFactory(GykqyxqComponent);
                            const gykqyxq2 = this.ModelRoom.createComponent(gykqyxq);
                            break;
                        case 'tl':
                            if (this.tljbxx2_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    console.log(data);

                                    const tljbxx = this.AlertModel.resolveComponentFactory(TljbxxComponent);
                                    this.tljbxx2 = this.ModelRoom.createComponent(tljbxx);


                                    this.init_tljbxx2_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.tljbxx2_data = data;
                                    console.log(this.hjbxx);
                                    this.tljbxx2.instance.tljbxx2_data = this.tljbxx2_data;
                                    this.tljbxx2.instance.childInfo = this.hjbxx;
                                    this.tljbxx2.instance.childInfo2 = this.hcylb;
                                    this.tljbxx2.instance.type = this.type;
                                    this.tljbxx2.instance.listHcyAdd = this.listHcyAdd;
                                    this.tljbxx2.instance.init_tljbxx_data = this.init_tljbxx2_data;


                                    this.tljbxx2.instance.update_tljbxx_data = this.update_tljbxx_data;
                                    this.tljbxx2.instance.add_tljbxx_data = this.add_tljbxx_data;
                                    this.tljbxx2.instance.del_tljbxx_data = this.del_tljbxx_data;


                                    this.tljbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;

                                    if (this.type == 'add') {
                                        this.tljbxx2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.tljbxx2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {


                                const tljbxx = this.AlertModel.resolveComponentFactory(TljbxxComponent);
                                this.tljbxx2 = this.ModelRoom.createComponent(tljbxx);

                                this.tljbxx2.instance.tljbxx2_data = this.tljbxx2_data;
                                this.tljbxx2.instance.childInfo = this.hjbxx;

                                this.tljbxx2.instance.type = this.type;
                                this.tljbxx2.instance.childInfo2 = this.hcylb;
                                this.tljbxx2.instance.listHcyAdd = this.listHcyAdd;
                                this.tljbxx2.instance.init_tljbxx_data = this.init_tljbxx2_data;


                                this.tljbxx2.instance.update_tljbxx_data = this.update_tljbxx_data;
                                this.tljbxx2.instance.add_tljbxx_data = this.add_tljbxx_data;
                                this.tljbxx2.instance.del_tljbxx_data = this.del_tljbxx_data;


                                this.tljbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.tljbxx2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.tljbxx2.instance.qshflId = this.hjbxx;
                                }


                            }
                            break;
                        case 'gl':
                            console.log(this.qshflId);
                            if (this.gljbxx2_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    console.log(data);

                                    const gljbxx = this.AlertModel.resolveComponentFactory(GljbxxComponent);
                                    this.gljbxx2 = this.ModelRoom.createComponent(gljbxx);


                                    this.init_gljbxx2_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.gljbxx2_data = data;
                                    console.log(this.hjbxx);
                                    this.gljbxx2.instance.gljbxx2_data = this.gljbxx2_data;
                                    this.gljbxx2.instance.childInfo = this.hjbxx;
                                    this.gljbxx2.instance.childInfo2 = this.hcylb;
                                    this.gljbxx2.instance.type = this.type;
                                    this.gljbxx2.instance.listHcyAdd = this.listHcyAdd;
                                    this.gljbxx2.instance.init_gljbxx_data = this.init_gljbxx2_data;


                                    this.gljbxx2.instance.update_gljbxx_data = this.update_gljbxx_data;
                                    this.gljbxx2.instance.add_gljbxx_data = this.add_gljbxx_data;
                                    this.gljbxx2.instance.del_gljbxx_data = this.del_gljbxx_data;


                                    this.gljbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;

                                    if (this.type == 'add') {
                                        this.gljbxx2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.gljbxx2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {


                                const gljbxx = this.AlertModel.resolveComponentFactory(GljbxxComponent);
                                this.gljbxx2 = this.ModelRoom.createComponent(gljbxx);

                                this.gljbxx2.instance.gljbxx2_data = this.gljbxx2_data;
                                this.gljbxx2.instance.childInfo = this.hjbxx;

                                this.gljbxx2.instance.type = this.type;
                                this.gljbxx2.instance.childInfo2 = this.hcylb;
                                this.gljbxx2.instance.listHcyAdd = this.listHcyAdd;
                                this.gljbxx2.instance.init_gljbxx_data = this.init_gljbxx2_data;


                                this.gljbxx2.instance.update_gljbxx_data = this.update_gljbxx_data;
                                this.gljbxx2.instance.add_gljbxx_data = this.add_gljbxx_data;
                                this.gljbxx2.instance.del_gljbxx_data = this.del_gljbxx_data;


                                this.gljbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.gljbxx2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.gljbxx2.instance.qshflId = this.hjbxx;
                                }


                            }


                            break;
                        case 'qh':
                            if (this.qhjbxx2_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    console.log(data);

                                    const qhjbxx = this.AlertModel.resolveComponentFactory(QhjbxxComponent);
                                    this.qhjbxx2 = this.ModelRoom.createComponent(qhjbxx);


                                    this.init_qhjbxx2_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.qhjbxx2_data = data;
                                    console.log(this.hjbxx);
                                    this.qhjbxx2.instance.qhjbxx2_data = this.qhjbxx2_data;
                                    this.qhjbxx2.instance.childInfo = this.hjbxx;
                                    this.qhjbxx2.instance.childInfo2 = this.hcylb;
                                    this.qhjbxx2.instance.type = this.type;
                                    this.qhjbxx2.instance.listHcyAdd = this.listHcyAdd;
                                    this.qhjbxx2.instance.init_qhjbxx_data = this.init_qhjbxx2_data;


                                    this.qhjbxx2.instance.update_qhjbxx_data = this.update_qhjbxx_data;
                                    this.qhjbxx2.instance.add_qhjbxx_data = this.add_qhjbxx_data;
                                    this.qhjbxx2.instance.del_qhjbxx_data = this.del_qhjbxx_data;


                                    this.qhjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;

                                    if (this.type == 'add') {
                                        this.qhjbxx2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.qhjbxx2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {


                                const qhjbxx = this.AlertModel.resolveComponentFactory(QhjbxxComponent);
                                this.qhjbxx2 = this.ModelRoom.createComponent(qhjbxx);

                                this.qhjbxx2.instance.qhjbxx2_data = this.qhjbxx2_data;
                                this.qhjbxx2.instance.childInfo = this.hjbxx;

                                this.qhjbxx2.instance.type = this.type;
                                this.qhjbxx2.instance.childInfo2 = this.hcylb;
                                this.qhjbxx2.instance.listHcyAdd = this.listHcyAdd;
                                this.qhjbxx2.instance.init_qhjbxx_data = this.init_qhjbxx2_data;


                                this.qhjbxx2.instance.update_qhjbxx_data = this.update_qhjbxx_data;
                                this.qhjbxx2.instance.add_qhjbxx_data = this.add_qhjbxx_data;
                                this.qhjbxx2.instance.del_qhjbxx_data = this.del_qhjbxx_data;
                                console.log(this.qshflId.ssxzqhSearcqhm);

                                this.qhjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearcqhm;
                                if (this.type == 'add') {
                                    this.qhjbxx2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.qhjbxx2.instance.qshflId = this.hjbxx;
                                }


                            }
                            break;
                        case 'hd':
                            if (this.hdjbxx2_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    console.log(data);

                                    const hdjbxx = this.AlertModel.resolveComponentFactory(HdjbxxComponent);
                                    this.hdjbxx2 = this.ModelRoom.createComponent(hdjbxx);


                                    this.init_hdjbxx2_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.hdjbxx2_data = data;
                                    console.log(this.hjbxx);
                                    this.hdjbxx2.instance.hdjbxx2_data = this.hdjbxx2_data;
                                    this.hdjbxx2.instance.childInfo = this.hjbxx;
                                    this.hdjbxx2.instance.childInfo2 = this.hcylb;
                                    this.hdjbxx2.instance.type = this.type;
                                    this.hdjbxx2.instance.listHcyAdd = this.listHcyAdd;
                                    this.hdjbxx2.instance.init_hdjbxx_data = this.init_hdjbxx2_data;


                                    this.hdjbxx2.instance.update_hdjbxx_data = this.update_hdjbxx_data;
                                    this.hdjbxx2.instance.add_hdjbxx_data = this.add_hdjbxx_data;
                                    this.hdjbxx2.instance.del_hdjbxx_data = this.del_hdjbxx_data;


                                    this.hdjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.hdjbxx2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.hdjbxx2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {


                                const hdjbxx = this.AlertModel.resolveComponentFactory(HdjbxxComponent);
                                this.hdjbxx2 = this.ModelRoom.createComponent(hdjbxx);

                                this.hdjbxx2.instance.hdjbxx2_data = this.hdjbxx2_data;
                                this.hdjbxx2.instance.childInfo = this.hjbxx;

                                this.hdjbxx2.instance.type = this.type;
                                this.hdjbxx2.instance.childInfo2 = this.hcylb;
                                this.hdjbxx2.instance.listHcyAdd = this.listHcyAdd;
                                this.hdjbxx2.instance.init_hdjbxx_data = this.init_hdjbxx2_data;


                                this.hdjbxx2.instance.update_hdjbxx_data = this.update_hdjbxx_data;
                                this.hdjbxx2.instance.add_hdjbxx_data = this.add_hdjbxx_data;
                                this.hdjbxx2.instance.del_hdjbxx_data = this.del_hdjbxx_data;

                                this.hdjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.hdjbxx2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.hdjbxx2.instance.qshflId = this.hjbxx;
                                }


                            }

                            break;
                        case 'gk':
                            if (this.gkjbxx_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {


                                    const gkjbxx = this.AlertModel.resolveComponentFactory(GkjbxxComponent);
                                    this.gkjbxx2 = this.ModelRoom.createComponent(gkjbxx);


                                    console.log(data);
                                    this.init_gkjbxx_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.gkjbxx_data = data;
                                    console.log(this.hjbxx);
                                    this.gkjbxx2.instance.gkjbxx_data = this.gkjbxx_data;
                                    this.gkjbxx2.instance.childInfo = this.hjbxx;
                                    this.gkjbxx2.instance.childInfo2 = this.hcylb;
                                    this.gkjbxx2.instance.type = this.type;
                                    this.gkjbxx2.instance.listHcyAdd = this.listHcyAdd;

                                    this.gkjbxx2.instance.update_gkjbxx_data = this.update_gkjbxx_data;
                                    this.gkjbxx2.instance.add_gkjbxx_data = this.add_gkjbxx_data;
                                    this.gkjbxx2.instance.del_gkjbxx_data = this.del_gkjbxx_data;
                                    this.gkjbxx2.instance.init_gkjbxx_data = this.init_gkjbxx_data;


                                    this.gkjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.gkjbxx2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.gkjbxx2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {


                                const gkjbxx = this.AlertModel.resolveComponentFactory(GkjbxxComponent);
                                this.gkjbxx2 = this.ModelRoom.createComponent(gkjbxx);

                                this.gkjbxx2.instance.gkjbxx_data = this.gkjbxx_data;
                                this.gkjbxx2.instance.childInfo = this.hjbxx;

                                this.gkjbxx2.instance.type = this.type;
                                this.gkjbxx2.instance.childInfo2 = this.hcylb;
                                this.gkjbxx2.instance.listHcyAdd = this.listHcyAdd;
                                this.gkjbxx2.instance.init_gkjbxx_data = this.init_gkjbxx_data;
                                this.gkjbxx2.instance.update_gkjbxx_data = this.update_gkjbxx_data;
                                this.gkjbxx2.instance.add_gkjbxx_data = this.add_gkjbxx_data;
                                this.gkjbxx2.instance.del_gkjbxx_data = this.del_gkjbxx_data;

                                this.gkjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.gkjbxx2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.gkjbxx2.instance.qshflId = this.hjbxx;
                                }


                            }

                            break;
                        case 'mt':
                            if (this.mtjbxx_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {


                                    const mtjbxx = this.AlertModel.resolveComponentFactory(MtjbxxComponent);
                                    this.mtjbxx2 = this.ModelRoom.createComponent(mtjbxx);


                                    console.log(data);
                                    this.init_mtjbxx_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.mtjbxx_data = data;
                                    console.log(this.hjbxx);
                                    this.mtjbxx2.instance.mtjbxx_data = this.mtjbxx_data;
                                    this.mtjbxx2.instance.childInfo = this.hjbxx;
                                    this.mtjbxx2.instance.childInfo2 = this.hcylb;
                                    this.mtjbxx2.instance.type = this.type;
                                    this.mtjbxx2.instance.listHcyAdd = this.listHcyAdd;

                                    this.mtjbxx2.instance.update_mtjbxx_data = this.update_mtjbxx_data;
                                    this.mtjbxx2.instance.add_mtjbxx_data = this.add_mtjbxx_data;
                                    this.mtjbxx2.instance.del_mtjbxx_data = this.del_mtjbxx_data;
                                    this.mtjbxx2.instance.init_mtjbxx_data = this.init_mtjbxx_data;


                                    this.mtjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.mtjbxx2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.mtjbxx2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {


                                const mtjbxx = this.AlertModel.resolveComponentFactory(MtjbxxComponent);
                                this.mtjbxx2 = this.ModelRoom.createComponent(mtjbxx);

                                this.mtjbxx2.instance.mtjbxx_data = this.mtjbxx_data;
                                this.mtjbxx2.instance.childInfo = this.hjbxx;

                                this.mtjbxx2.instance.type = this.type;
                                this.mtjbxx2.instance.childInfo2 = this.hcylb;
                                this.mtjbxx2.instance.listHcyAdd = this.listHcyAdd;
                                this.mtjbxx2.instance.init_mtjbxx_data = this.init_mtjbxx_data;
                                this.mtjbxx2.instance.update_mtjbxx_data = this.update_mtjbxx_data;
                                this.mtjbxx2.instance.add_mtjbxx_data = this.add_mtjbxx_data;
                                this.mtjbxx2.instance.del_mtjbxx_data = this.del_mtjbxx_data;

                                this.mtjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.mtjbxx2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.mtjbxx2.instance.qshflId = this.hjbxx;
                                }


                            }

                            break;
                        case 'sbdgc':

                            console.log(this.sbdgcjbxx2_data);
                            if (this.sbdgcjbxx2_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    console.log(data);

                                    const sbdgcjbxx = this.AlertModel.resolveComponentFactory(SbdgcjbxxComponent);
                                    this.sbdgcjbxx2 = this.ModelRoom.createComponent(sbdgcjbxx);


                                    this.init_sbdgcjbxx2_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.sbdgcjbxx2_data = data;
                                    console.log(this.hjbxx);
                                    this.sbdgcjbxx2.instance.sbdgcjbxx2_data = this.sbdgcjbxx2_data;
                                    this.sbdgcjbxx2.instance.childInfo = this.hjbxx;
                                    this.sbdgcjbxx2.instance.childInfo2 = this.hcylb;
                                    this.sbdgcjbxx2.instance.type = this.type;
                                    this.sbdgcjbxx2.instance.listHcyAdd = this.listHcyAdd;
                                    this.sbdgcjbxx2.instance.init_sbdgcjbxx_data = this.init_sbdgcjbxx2_data;


                                    this.sbdgcjbxx2.instance.update_sbdgcjbxx_data = this.update_sbdgcjbxx_data;
                                    this.sbdgcjbxx2.instance.add_sbdgcjbxx_data = this.add_sbdgcjbxx_data;
                                    this.sbdgcjbxx2.instance.del_sbdgcjbxx_data = this.del_sbdgcjbxx_data;


                                    this.sbdgcjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.sbdgcjbxx2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.sbdgcjbxx2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {


                                const sbdgcjbxx = this.AlertModel.resolveComponentFactory(SbdgcjbxxComponent);
                                this.sbdgcjbxx2 = this.ModelRoom.createComponent(sbdgcjbxx);

                                this.sbdgcjbxx2.instance.sbdgcjbxx2_data = this.sbdgcjbxx2_data;
                                this.sbdgcjbxx2.instance.childInfo = this.hjbxx;

                                this.sbdgcjbxx2.instance.type = this.type;
                                this.sbdgcjbxx2.instance.childInfo2 = this.hcylb;
                                this.sbdgcjbxx2.instance.listHcyAdd = this.listHcyAdd;
                                this.sbdgcjbxx2.instance.init_sbdgcjbxx_data = this.init_sbdgcjbxx2_data;


                                this.sbdgcjbxx2.instance.update_sbdgcjbxx_data = this.update_sbdgcjbxx_data;
                                this.sbdgcjbxx2.instance.add_sbdgcjbxx_data = this.add_sbdgcjbxx_data;
                                this.sbdgcjbxx2.instance.del_sbdgcjbxx_data = this.del_sbdgcjbxx_data;

                                this.sbdgcjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.sbdgcjbxx2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.sbdgcjbxx2.instance.qshflId = this.hjbxx;
                                }


                            }


                            break;
                        case'dxgc':
                            if (this.dxgcjbxx2_data != null) {


                                const dxgcjbxx = this.AlertModel.resolveComponentFactory(DxgcjbxxComponent);
                                this.dxgcjbxx2 = this.ModelRoom.createComponent(dxgcjbxx);
                                console.log(this.hjbxx);
                                this.dxgcjbxx2.instance.dxgcjbxx2_data = this.dxgcjbxx2_data;
                                this.dxgcjbxx2.instance.childInfo = this.hjbxx;
                                this.dxgcjbxx2.instance.childInfo2 = this.hcylb;
                                this.dxgcjbxx2.instance.type = this.type;
                                this.dxgcjbxx2.instance.listHcyAdd = this.listHcyAdd;

                                this.dxgcjbxx2.instance.update_dxgcjbxx_data = this.update_dxgcjbxx_data;
                                this.dxgcjbxx2.instance.add_dxgcjbxx_data = this.add_dxgcjbxx_data;
                                this.dxgcjbxx2.instance.del_dxgcjbxx_data = this.del_dxgcjbxx_data;
                                this.dxgcjbxx2.instance.init_dxgcjbxx_data = this.init_dxgcjbxx2_data;


                                this.dxgcjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.dxgcjbxx2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.dxgcjbxx2.instance.qshflId = this.hjbxx;
                                }


                            } else {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {


                                    const dxgcjbxx = this.AlertModel.resolveComponentFactory(DxgcjbxxComponent);
                                    this.dxgcjbxx2 = this.ModelRoom.createComponent(dxgcjbxx);


                                    console.log(data);
                                    this.init_dxgcjbxx2_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.dxgcjbxx2_data = data;
                                    console.log(this.hjbxx);
                                    this.dxgcjbxx2.instance.dxgcjbxx2_data = this.dxgcjbxx2_data;
                                    this.dxgcjbxx2.instance.childInfo = this.hjbxx;
                                    this.dxgcjbxx2.instance.childInfo2 = this.hcylb;
                                    this.dxgcjbxx2.instance.type = this.type;
                                    this.dxgcjbxx2.instance.listHcyAdd = this.listHcyAdd;

                                    this.dxgcjbxx2.instance.update_dxgcjbxx_data = this.update_dxgcjbxx_data;
                                    this.dxgcjbxx2.instance.add_dxgcjbxx_data = this.add_dxgcjbxx_data;
                                    this.dxgcjbxx2.instance.del_dxgcjbxx_data = this.del_dxgcjbxx_data;
                                    this.dxgcjbxx2.instance.init_dxgcjbxx_data = this.init_dxgcjbxx2_data;


                                    this.dxgcjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.dxgcjbxx2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.dxgcjbxx2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            }
                            break;
                        case 'gbdsgc':

                            console.log(this.gbdsgc_data);
                            if (this.gbdsgc_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {
                                    console.log(data);

                                    const gbdsgcjbxx = this.AlertModel.resolveComponentFactory(GbdsjbxxComponent);
                                    this.gbdsgc2 = this.ModelRoom.createComponent(gbdsgcjbxx);


                                    this.init_gbdsgc_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.gbdsgc_data = data;
                                    console.log(this.hjbxx);
                                    this.gbdsgc2.instance.gbdsjbxx2_data = this.gbdsgc_data;
                                    this.gbdsgc2.instance.childInfo = this.hjbxx;
                                    this.gbdsgc2.instance.childInfo2 = this.hcylb;
                                    this.gbdsgc2.instance.type = this.type;
                                    this.gbdsgc2.instance.listHcyAdd = this.listHcyAdd;


                                    this.gbdsgc2.instance.update_gbdsjbxx_data = this.update_gbdsjbxx_data;
                                    this.gbdsgc2.instance.add_gbdsjbxx_data = this.add_gbdsjbxx_data;
                                    this.gbdsgc2.instance.del_gbdsjbxx_data = this.del_gbdsjbxx_data;


                                    this.gbdsgc2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.gbdsgc2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.gbdsgc2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {


                                const gbdsgcjbxx = this.AlertModel.resolveComponentFactory(GbdsjbxxComponent);
                                this.gbdsgc2 = this.ModelRoom.createComponent(gbdsgcjbxx);


                                this.gbdsgc2.instance.gbdsjbxx2_data = this.gbdsgc_data;
                                this.gbdsgc2.instance.childInfo = this.hjbxx;

                                this.gbdsgc2.instance.type = this.type;
                                this.gbdsgc2.instance.childInfo2 = this.hcylb;
                                this.gbdsgc2.instance.listHcyAdd = this.listHcyAdd;

                                this.gbdsgc2.instance.update_gbdsjbxx_data = this.update_gbdsjbxx_data;
                                this.gbdsgc2.instance.add_gbdsjbxx_data = this.add_gbdsjbxx_data;
                                this.gbdsgc2.instance.del_gbdsjbxx_data = this.del_gbdsjbxx_data;

                                this.gbdsgc2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.gbdsgc2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.gbdsgc2.instance.qshflId = this.hjbxx;
                                }


                            }

                            break;
                        case 'gdgc':
                            if (this.gdgcjbxx2_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {


                                    const gdgcjbxx = this.AlertModel.resolveComponentFactory(GdgcjbxxComponent);
                                    this.gdgcjbxx2 = this.ModelRoom.createComponent(gdgcjbxx);


                                    console.log(data);
                                    this.init_gdgcjbxx2_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.gdgcjbxx2_data = data;
                                    console.log(this.hjbxx);
                                    this.gdgcjbxx2.instance.gdgcjbxx2_data = this.gdgcjbxx2_data;
                                    this.gdgcjbxx2.instance.childInfo = this.hjbxx;
                                    this.gdgcjbxx2.instance.childInfo2 = this.hcylb;
                                    this.gdgcjbxx2.instance.type = this.type;
                                    this.gdgcjbxx2.instance.listHcyAdd = this.listHcyAdd;

                                    this.gdgcjbxx2.instance.update_gdgcjbxx_data = this.update_gdgcjbxx_data;
                                    this.gdgcjbxx2.instance.add_gdgcjbxx_data = this.add_gdgcjbxx_data;
                                    this.gdgcjbxx2.instance.del_gdgcjbxx_data = this.del_gdgcjbxx_data;
                                    this.gdgcjbxx2.instance.init_gdgcjbxx_data = this.init_gdgcjbxx2_data;


                                    this.gdgcjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.gdgcjbxx2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.gdgcjbxx2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {


                                const gdgcjbxx = this.AlertModel.resolveComponentFactory(GdgcjbxxComponent);
                                this.gdgcjbxx2 = this.ModelRoom.createComponent(gdgcjbxx);
                                console.log(this.hjbxx);
                                this.gdgcjbxx2.instance.gdgcjbxx2_data = this.gdgcjbxx2_data;
                                this.gdgcjbxx2.instance.childInfo = this.hjbxx;
                                this.gdgcjbxx2.instance.childInfo2 = this.hcylb;
                                this.gdgcjbxx2.instance.type = this.type;
                                this.gdgcjbxx2.instance.listHcyAdd = this.listHcyAdd;

                                this.gdgcjbxx2.instance.update_gdgcjbxx_data = this.update_gdgcjbxx_data;
                                this.gdgcjbxx2.instance.add_gdgcjbxx_data = this.add_gdgcjbxx_data;
                                this.gdgcjbxx2.instance.del_gdgcjbxx_data = this.del_gdgcjbxx_data;
                                this.gdgcjbxx2.instance.init_gdgcjbxx_data = this.init_gdgcjbxx2_data;


                                this.gdgcjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.gdgcjbxx2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.gdgcjbxx2.instance.qshflId = this.hjbxx;
                                }


                            }
                            break;
                        case 'slsdgc':
                            if (this.slsd_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {


                                    const gdgcjbxx = this.AlertModel.resolveComponentFactory(SlsdgcjbxxComponent);
                                    this.slsd2 = this.ModelRoom.createComponent(gdgcjbxx);


                                    console.log(data);
                                    this.init_slsd_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.slsd_data = data;
                                    console.log(this.hjbxx);
                                    this.slsd2.instance.slsdjbxx2_data = this.slsd_data;
                                    this.slsd2.instance.childInfo = this.hjbxx;
                                    this.slsd2.instance.childInfo2 = this.hcylb;
                                    this.slsd2.instance.type = this.type;
                                    this.slsd2.instance.listHcyAdd = this.listHcyAdd;

                                    this.slsd2.instance.update_slsdjbxx_data = this.update_slsd_data;
                                    this.slsd2.instance.add_slsdjbxx_data = this.add_slsd_data;
                                    this.slsd2.instance.del_slsdjbxx_data = this.del_slsd_data;
                                    this.slsd2.instance.init_slsdjbxx_data = this.init_slsd_data;


                                    this.slsd2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.slsd2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.slsd2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {

                                const gdgcjbxx = this.AlertModel.resolveComponentFactory(SlsdgcjbxxComponent);
                                this.slsd2 = this.ModelRoom.createComponent(gdgcjbxx);


                                this.slsd2.instance.slsdjbxx2_data = this.slsd_data;
                                this.slsd2.instance.childInfo = this.hjbxx;
                                this.slsd2.instance.childInfo2 = this.hcylb;
                                this.slsd2.instance.type = this.type;
                                this.slsd2.instance.listHcyAdd = this.listHcyAdd;

                                this.slsd2.instance.update_slsdjbxx_data = this.update_slsd_data;
                                this.slsd2.instance.add_slsdjbxx_data = this.add_slsd_data;
                                this.slsd2.instance.del_slsdjbxx_data = this.del_slsd_data;
                                this.slsd2.instance.init_slsdjbxx_data = this.init_slsd_data;


                                this.slsd2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.slsd2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.slsd2.instance.qshflId = this.hjbxx;
                                }


                            }
                            break;
                        case  'kczy':
                            if (this.gdgcjbxx2_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {


                                    const gdgcjbxx = this.AlertModel.resolveComponentFactory(KczyjbxxComponent);
                                    this.kczy2 = this.ModelRoom.createComponent(gdgcjbxx);


                                    console.log(data);
                                    this.init_kczy_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.kczy_date = data;
                                    console.log(this.hjbxx);
                                    this.kczy2.instance.kczyjbxx2_data = this.kczy_date;
                                    this.kczy2.instance.childInfo = this.hjbxx;
                                    this.kczy2.instance.childInfo2 = this.hcylb;
                                    this.kczy2.instance.type = this.type;
                                    this.kczy2.instance.listHcyAdd = this.listHcyAdd;

                                    this.kczy2.instance.update_kczyjbxx_data = this.update_kczy_data;
                                    this.kczy2.instance.add_kczyjbxx_data = this.add_kczy_data;
                                    this.kczy2.instance.del_kczyjbxx_data = this.del_kczy_data;
                                    this.kczy2.instance.init_kczyjbxx_data = this.init_kczy_data;


                                    this.kczy2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.kczy2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.kczy2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {


                                const gdgcjbxx = this.AlertModel.resolveComponentFactory(KczyjbxxComponent);
                                this.kczy2 = this.ModelRoom.createComponent(gdgcjbxx);

                                this.kczy2.instance.kczy2_date = this.kczy_date;
                                this.kczy2.instance.childInfo = this.hjbxx;
                                this.kczy2.instance.childInfo2 = this.hcylb;
                                this.kczy2.instance.type = this.type;
                                this.kczy2.instance.listHcyAdd = this.listHcyAdd;


                                this.kczy2.instance.update_kczyjbxx_data = this.update_kczy_data;
                                this.kczy2.instance.add_kczyjbxx_data = this.add_kczy_data;
                                this.kczy2.instance.del_kczyjbxx_data = this.del_kczy_data;
                                this.kczy2.instance.init_kczyjbxx_data = this.init_kczy_data;


                                this.kczy2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.kczy2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.kczy2.instance.qshflId = this.hjbxx;
                                }


                            }
                            break;
                        case 'wwgj':
                            if (this.wwgj_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {


                                    const wwgjjbxx = this.AlertModel.resolveComponentFactory(WwgjjbxxComponent);
                                    this.wwgj = this.ModelRoom.createComponent(wwgjjbxx);


                                    console.log(data);
                                    this.init_wwgj_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.wwgj_data = data;
                                    console.log(this.hjbxx);
                                    this.wwgj.instance.wwgjjbxx2_data = this.wwgj_data;
                                    this.wwgj.instance.childInfo = this.hjbxx;
                                    this.wwgj.instance.childInfo2 = this.hcylb;
                                    this.wwgj.instance.type = this.type;
                                    this.wwgj.instance.listHcyAdd = this.listHcyAdd;

                                    this.wwgj.instance.update_wwgjjbxx_data = this.update_wwgj_data;
                                    this.wwgj.instance.add_wwgjjbxx_data = this.add_wwgj_data;
                                    this.wwgj.instance.del_wwgjjbxx_data = this.del_wwgj_data;
                                    this.wwgj.instance.init_wwgjjbxx_data = this.init_wwgj_data;


                                    this.wwgj.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.wwgj.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.wwgj.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {


                                const wwgjjbxx = this.AlertModel.resolveComponentFactory(WwgjjbxxComponent);
                                this.wwgj = this.ModelRoom.createComponent(wwgjjbxx);

                                this.wwgj.instance.wwgjjbxx2_data = this.wwgj_data;
                                this.wwgj.instance.childInfo = this.hjbxx;
                                this.wwgj.instance.childInfo2 = this.hcylb;
                                this.wwgj.instance.type = this.type;
                                this.wwgj.instance.listHcyAdd = this.listHcyAdd;
                                this.wwgj.instance.update_wwgjjbxx_data = this.update_wwgj_data;
                                this.wwgj.instance.add_wwgjjbxx_data = this.add_wwgj_data;
                                this.wwgj.instance.del_wwgjjbxx_data = this.del_wwgj_data;
                                this.wwgj.instance.init_wwgjjbxx_data = this.init_wwgj_data;
                                this.wwgj.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.wwgj.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.wwgj.instance.qshflId = this.hjbxx;
                                }


                            }
                            break;
                        case 'swqxz':
                            if (this.swqxz_data == null) {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {


                                    const wwgjjbxx = this.AlertModel.resolveComponentFactory(SwqxzjbxxComponent);
                                    this.swqxz2 = this.ModelRoom.createComponent(wwgjjbxx);


                                    console.log(data);
                                    this.init_swqxz_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.swqxz_data = data;
                                    console.log(this.hjbxx);
                                    this.swqxz2.instance.swqxzjbxx2_data = this.swqxz_data;
                                    this.swqxz2.instance.childInfo = this.hjbxx;
                                    this.swqxz2.instance.childInfo2 = this.hcylb;
                                    this.swqxz2.instance.type = this.type;
                                    this.swqxz2.instance.listHcyAdd = this.listHcyAdd;

                                    this.swqxz2.instance.update_swqxzjbxx_data = this.update_swqxz_data;
                                    this.swqxz2.instance.add_swqxzjbxx_data = this.add_swqxz_data;
                                    this.swqxz2.instance.del_swqxzjbxx_data = this.del_swqxz_data;
                                    this.swqxz2.instance.init_swqxzjbxx_data = this.init_swqxz_data;


                                    this.swqxz2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.swqxz2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.swqxz2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            } else {


                                const wwgjjbxx = this.AlertModel.resolveComponentFactory(SwqxzjbxxComponent);
                                this.swqxz2 = this.ModelRoom.createComponent(wwgjjbxx);

                                this.swqxz2.instance.swqxzjbxx2_data = this.swqxz_data;
                                this.swqxz2.instance.childInfo = this.hjbxx;
                                this.swqxz2.instance.childInfo2 = this.hcylb;
                                this.swqxz2.instance.type = this.type;
                                this.swqxz2.instance.listHcyAdd = this.listHcyAdd;

                                this.swqxz2.instance.update_swqxzjbxx_data = this.update_swqxz_data;
                                this.swqxz2.instance.add_swqxzjbxx_data = this.add_swqxz_data;
                                this.swqxz2.instance.del_swqxzjbxx_data = this.del_swqxz_data;
                                this.swqxz2.instance.init_swqxzjbxx_data = this.init_swqxz_data;

                                this.swqxz2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.swqxz2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.swqxz2.instance.qshflId = this.hjbxx;
                                }

                            }
                            break;
                        case 'qtzx':
                            if (this.qtzxjbxx2_data != null) {


                                const qtzxjbxx = this.AlertModel.resolveComponentFactory(QtzxjbxxComponent);
                                this.qtzxjbxx2 = this.ModelRoom.createComponent(qtzxjbxx);
                                console.log(this.hjbxx);
                                this.qtzxjbxx2.instance.qtzxjbxx2_data = this.qtzxjbxx2_data;
                                this.qtzxjbxx2.instance.childInfo = this.hjbxx;
                                this.qtzxjbxx2.instance.childInfo2 = this.hcylb;
                                this.qtzxjbxx2.instance.type = this.type;
                                this.qtzxjbxx2.instance.listHcyAdd = this.listHcyAdd;

                                this.qtzxjbxx2.instance.update_qtzxjbxx_data = this.update_qtzxjbxx_data;
                                this.qtzxjbxx2.instance.add_qtzxjbxx_data = this.add_qtzxjbxx_data;
                                this.qtzxjbxx2.instance.del_qtzxjbxx_data = this.del_qtzxjbxx_data;
                                this.qtzxjbxx2.instance.init_qtzxjbxx_data = this.init_qtzxjbxx2_data;


                                this.qtzxjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                if (this.type == 'add') {
                                    this.qtzxjbxx2.instance.qshflId = this.qshflId;
                                } else if (this.type == 'rew') {
                                    this.qtzxjbxx2.instance.qshflId = this.hjbxx;
                                }


                            } else {


                                this.HttpService.get(this.tabHttpUrl).then((data) => {


                                    const qtzxjbxx = this.AlertModel.resolveComponentFactory(QtzxjbxxComponent);
                                    this.qtzxjbxx2 = this.ModelRoom.createComponent(qtzxjbxx);


                                    console.log(data);
                                    this.init_qtzxjbxx2_data = JSON.parse(JSON.stringify(data['returnObject']));
                                    this.qtzxjbxx2_data = data;
                                    console.log(this.hjbxx);
                                    this.qtzxjbxx2.instance.qtzxjbxx2_data = this.qtzxjbxx2_data;
                                    this.qtzxjbxx2.instance.childInfo = this.hjbxx;
                                    this.qtzxjbxx2.instance.childInfo2 = this.hcylb;
                                    this.qtzxjbxx2.instance.type = this.type;
                                    this.qtzxjbxx2.instance.listHcyAdd = this.listHcyAdd;

                                    this.qtzxjbxx2.instance.update_qtzxjbxx_data = this.update_qtzxjbxx_data;
                                    this.qtzxjbxx2.instance.add_qtzxjbxx_data = this.add_qtzxjbxx_data;
                                    this.qtzxjbxx2.instance.del_qtzxjbxx_data = this.del_qtzxjbxx_data;
                                    this.qtzxjbxx2.instance.init_qtzxjbxx_data = this.init_qtzxjbxx2_data;


                                    this.qtzxjbxx2.instance.szxzqugldm = this.qshflId.ssxzqhSearchDm;
                                    if (this.type == 'add') {
                                        this.qtzxjbxx2.instance.qshflId = this.qshflId;
                                    } else if (this.type == 'rew') {
                                        this.qtzxjbxx2.instance.qshflId = this.hjbxx;
                                    }

                                });

                            }

                            break;
                    }
                } else {
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '填入提醒', detail: "请至少添加一个户成员"});

                }

            }


        }
        console.log(this.hjbxx);


        console.log(this.hjbxx);
        console.log(this.AlertModel);
        console.log(PersonComponent);
        console.log(this.childrenModel);
    }

    // 获取当前tab的请求地址

    getTabUrl(url, zblId, jmhId) {
        console.log(url);
        let params = "";
        if (url == 'fyssjbxx' || url == 'fwjbxx' || url == 'fwzxjbxx' || url == 'fsssjbxx' || url == 'tdjbxx' || url == 'tdfzwjbxx' || url == 'lxgm' || url == 'xxzx') {
            if (jmhId) {
                params = `${url}/list?jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}&jmhId=${jmhId}&zblId=${zblId}`;
            } else {
                params = `${url}/list?jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}&&zblId=${zblId}`;
            }

        } else if (url == 'gtgsh' || url == 'nfyh' || url == 'dw') {
            if (jmhId) {
                params = `${url}/list?gcdm=${this.ssgcdm}&jmhId=${jmhId}`;
            } else {
                params = `${url}/list?gcdm=${this.ssgcdm}`;
            }
        } else {
            if (jmhId) {
                params = `${url}/list?jddm=${this.def_jddm}&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}&jmhId=${jmhId}&zblId=${zblId}`;
            } else {
                params = `${url}/list?jddm=${this.def_jddm}&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}&&zblId=${zblId}`;
            }
        }
        console.log(params);

        return params;
    }

    // 调查范围展示
    showDcfwBlock() {
        if (this.type != "view") {
            if (!this.dcfwTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HJBXX&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        this.dcfwTreeList = this.dataProcesing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_HJBXX&column=DCFWDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.dcfwTableList = res['returnObject'];
                    });
            }
            this.isShowDcfw = this.isShowDcfw ? false : true;
        }
    }

    getChildDcfw(e) {
        if (e) {
            this.hjbxx.dcfwdm = e.dm;
            this.hjbxx.dcfwmc = e.qc;
            this.isShowDcfw = false;
        }
    }

    // 专业大类展示
    showZydlBlock() {
        if (this.type != "view") {
            this.isShowZydl = this.isShowZydl ? false : true;
            if (!this.zydlTableList) {
                this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HJBXX&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res);
                        this.zydlTreeList = this.dataProcesing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                    });
                this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_HJBXX&column=ZYDLDM&gcdm=${this.ssgcdm}&xzqhdm=${this.ssxzqhdm}`)
                    .then((res) => {
                        console.log(res['returnObject']);
                        this.zydlTableList = res['returnObject'];
                    });
            }
        }
    }

    getChildZydl(event) {
        if (event) {
            this.isShowZydl = false;
            this.hjbxx['zydlmc'] = event.qc;
            this.hjbxx['zydldm'] = event.dm;
        }
    }

    // 所在行政区域
    showAreaBlock(): void {
        console.log(this.type);
        if (this.type != "view") {
            this.isShowArea = this.isShowArea ? false : true;
        }
    }

    getChildSzxzqh(e) {
        console.log(e);
        if (e) {
            this.hjbxx.xzqhmc = e.qc;
            this.hjbxx.ssxzqhdm = e.dm;
            this.isShowArea = false;
        }
    }

    close() {
        if (this.getNewHuList == true) {
            this.ShareService.sendMessage({
                severity: 'success',
                save: true,
                item: 'jmh'
            });
        }
        this.showqqq = false;
    }

    getZdlsh(i) {
        this.HttpService.get(`jmh/generateOrderNum?code=${this.hjbxx.ssxzqhdm}`)
            .then((data) => {
                this.hjbxx.dabh = `${this.hjbxx.ssxzqhdm}${data['returnObject']}`;
            })

    }

    //   HJBXX储存变量
    saveHjbxxChange(arr, initArr) {
        var lsArr = {};
        console.log(arr);
        console.log(initArr);

        for (let key in arr) {
            if (arr[key] !== initArr[key]) {
                console.log(`${key}需要保存`);
                lsArr[key] = arr[key];
            }
        }
        return lsArr;
    }

    //  新增人员的新增tab项
    add_hcy_tab(item, tab_add, listHcyAdd, zdmc) {
        console.log(tab_add);
        let listFwAdd = this.changeTable(tab_add);
        listHcyAdd[item][zdmc] = listFwAdd;
        console.log(listFwAdd);

        for (let key2 in listFwAdd) {
            listFwAdd[key2].jddm = this.qshflId.jddm;
            console.log(listFwAdd[key2])
            console.log(key2);
            console.log(listFwAdd[key2]['flbmxList']);
            if (listFwAdd[key2]['flbmxList']) {
                console.log(listFwAdd[key2]['flbmxList'])
                let flbmxListArr = listFwAdd[key2]['flbmxList'];
                flbmxListArr = this.changeTable(flbmxListArr);
                console.log(flbmxListArr);
                listFwAdd[key2]['flbmxList'] = [];
                flbmxListArr.forEach((item1, key, array) => {
                    delete array[key].zbflId;
                    delete array[key].id;
                    delete array[key].qsrId;
                    delete array[key].ssfwjbxxId;
                    delete array[key].ssfwzxjbxxId;
                    delete array[key].ssfsssjbxxId;
                    delete array[key].sstdjbxxId;
                    delete array[key].sstdfzwjbxxId;
                    delete array[key].ssxxzxjbxxId;
                    delete array[key].sslxgmjbxxId;
                    delete array[key].fwzyytmc;

                    delete array[key].ssxxzxjbxxId;
                    for (let item2 in item1) {
                        if (item1[item2] == null || item1[item2] === "") {
                            delete item1[item2];
                        }
                    }
                    console.log(array[key].ggmxxxList);
                    console.log(listFwAdd[key2]['flbmxList']);
                    console.log(item1);

                    listFwAdd[key2]['flbmxList'].push(item1)

                });
            }
            if (listFwAdd[key2]['ggmxxxList']) {
                let ggmxxxListArr = listFwAdd[key2]['ggmxxxList'];
                ggmxxxListArr = this.changeTable(ggmxxxListArr);
                console.log(ggmxxxListArr);
                listFwAdd[key2]['ggmxxxList'] = [];
                ggmxxxListArr.forEach((item1, key, array) => {
                    delete item1.zdxmc;
                    delete item1.qsrId;
                    delete item1.xh;
                    delete item1.ssfwjbxxId;
                    delete item1.ssfwzxjbxxId;
                    delete item1.ssfsssjbxxId;
                    delete item1.sstdjbxxId;
                    delete item1.sstdfzwjbxxId;
                    delete item1.sslxgmjbxxId;
                    delete item1.ssxxzxjbxxId;

                    for (let item2 in item1) {
                        if (item1[item2] == null || item1[item2] === "") {
                            delete item1[item2];
                        }
                    }

                    listFwAdd[key2]['ggmxxxList'].push(item1)
                });
            }
            for (let key in listFwAdd[key2]) {
                delete listFwAdd[key2]["list"];
                delete listFwAdd[key2]["localitydesc"];
                delete listFwAdd[key2]["id"];
                delete listFwAdd[key2]["qsrId"];
                delete listFwAdd[key2]["dcfwmc"];
                delete listFwAdd[key2]["zydlmc"];
                delete listFwAdd[key2]["xzqhmc"];
                delete listFwAdd[key2]["whcdmc"];
                delete listFwAdd[key2]['hkqkmc'];
                delete listFwAdd[key2]['fwxzmc'];
                delete listFwAdd[key2]['fwzyytmc'];
                delete listFwAdd[key2]['ssxxzxjbxxId'];
                delete listFwAdd[key2]['tdxzmc'];


                if (listFwAdd[key2][key] === "" || listFwAdd[key2] == null) {
                    console.log("删除listFwAdd[key2]" + key);
                    delete listFwAdd[key2][key];
                }
            }


        }
        console.log(listFwAdd);
        return listFwAdd;


    }


    //  新增人员的新增tab项（零星果木）

    add_hcy_nnGGmx_tab(item, tab_add, listHcyAdd, zdmc) {
        console.log(tab_add);
        let listFwAdd = this.changeTable(tab_add);
        listHcyAdd[item][zdmc] = listFwAdd;
        console.log(listFwAdd);
        for (let key2 in listFwAdd) {
            listFwAdd[key2].jddm = this.qshflId.jddm;
            console.log(listFwAdd[key2])
            console.log(key2);
            console.log(listFwAdd[key2]['flbmxList']);
            if (listFwAdd[key2]['flbmxList']) {
                console.log(listFwAdd[key2]['flbmxList'])
                let flbmxListArr = listFwAdd[key2]['flbmxList'];
                flbmxListArr = this.changeTable(flbmxListArr);
                console.log(flbmxListArr);
                listFwAdd[key2]['flbmxAddList'] = [];
                flbmxListArr.forEach((item1, key, array) => {
                    delete array[key].zbflId;
                    delete array[key].id;
                    delete array[key].ssfwjbxxId;
                    delete array[key].ssfwzxjbxxId;
                    delete array[key].ssfsssjbxxId;
                    delete array[key].sstdjbxxId;
                    delete array[key].sstdfzwjbxxId;
                    delete array[key].sslxgmjbxxId;

                    delete array[key].ssxxzxjbxxId;
                    for (let item2 in item1) {
                        if (item1[item2] == null || item1[item2] === "") {
                            delete item1[item2];
                        }
                    }
                    console.log(array[key].ggmxxxList);
                    console.log(listFwAdd[key2]['flbmxList']);
                    console.log(item1);

                    listFwAdd[key2]['flbmxAddList'].push(item1)

                });
            }
            for (let key in listFwAdd[key2]) {
                delete listFwAdd[key2]["list"];
                delete listFwAdd[key2]["localitydesc"];
                delete listFwAdd[key2]["id"];
                delete listFwAdd[key2]["qsrId"];
                delete listFwAdd[key2]["dcfwmc"];
                delete listFwAdd[key2]["zydlmc"];
                delete listFwAdd[key2]["xzqhmc"];
                delete listFwAdd[key2]["dcfwmc"];
                delete listFwAdd[key2]['flbmxList'];
                if (listFwAdd[key2][key] === "" || listFwAdd[key2] == null) {
                    console.log("删除listFwAdd[key2]" + key);
                    delete listFwAdd[key2][key];
                }
            }


        }
        console.log(listFwAdd);
        return listFwAdd;
    }

    // 新增人员的新增tab项（没有分类和没有规格）
    add_hcy_noAll_tab(item, tab_add, listHcyAdd, zdmc) {
        console.log(tab_add);
        console.log(item);
        console.log(listHcyAdd);
        let listFwAdd = this.changeTable(tab_add);
        listHcyAdd[item][zdmc] = listFwAdd;
        console.log(listFwAdd);
        for (let key2 in listFwAdd) {
            listFwAdd[key2].jddm = this.qshflId.jddm;
            for (let key in listFwAdd[key2]) {
                delete listFwAdd[key2]["list"];
                delete listFwAdd[key2]["localitydesc"];
                delete listFwAdd[key2]["id"];
                delete listFwAdd[key2]["qsrId"];
                delete listFwAdd[key2]["dcfwmc"];
                delete listFwAdd[key2]["zydlmc"];
                delete listFwAdd[key2]["xzqhmc"];
                delete listFwAdd[key2]["dcfwmc"];
                delete listFwAdd[key2]['flbmxList'];
                delete listFwAdd[key2]['sbdgclbmc'];
                if (listFwAdd[key2][key] === "" || listFwAdd[key2] == null) {
                    console.log("删除listFwAdd[key2]" + key);
                    delete listFwAdd[key2][key];
                }
            }


        }
        console.log(listFwAdd);
        return listFwAdd;
    }

    // 新增人员的新增tab页（唯一值的）
    add_hcy_only_item(item, listHcyAdd, zdmc) {
        let arr = JSON.parse(JSON.stringify(listHcyAdd[item][zdmc]));

        delete arr['jddm'];
        delete arr['list'];
        delete arr['id'];
        delete arr['swszxzqhmc'];
        delete arr['dcfwmc'];
        delete arr['ssxxzxjbxxId'];
        delete arr['zydlmc'];
        delete arr['whcdmc'];
        delete arr['zhgxsj'];
        delete arr['sfzh'];
        delete arr['flbmxList'];
        delete arr['qsrmc'];
        delete arr['cjsj'];

        delete arr['localitydesc'];
        delete arr['sbdgclbmc'];
        delete arr['gbdslbmc'];
        delete arr['gdgclbmc'];
        delete arr['gklbmc'];
        delete arr['xsmc'];
        delete arr['sjhsbzmc'];
        delete arr['ymyxcdmc'];
        delete arr['djmc'];
        delete arr['ljdldjmc'];
        delete arr['jgclmc'];
        delete arr['mtlbmc'];
        delete arr['gkytmc'];
        delete arr['mtytmc'];

        delete arr['bhjbmc'];
        delete arr['wwgjlbmc'];
        delete arr['kczylbmc'];
        delete arr['slsdlbmc'];
        delete arr['zdlbmc'];
        delete arr['qhjgmc'];
        delete arr['ssgllbmc'];
        delete arr['qhlbmc'];
        delete arr['hdlbmc'];

        delete arr['syxzmc'];
        delete arr['lglxmc'];
        delete arr['tllbmc'];

        delete arr['lmclmc'];
        delete arr['qtzxlbmc'];
        delete arr['gldjmc'];
        delete arr['zxlbmc'];
        delete arr['xzmc'];
        delete arr['jjxzmc'];
        delete arr['hylbmc'];
        delete arr['dwlbmc'];


        arr['ssxtdm'] = this.hjbxx.ssxtdm;
        arr['ssgcdm'] = this.hjbxx.ssgcdm;
        arr['jddm'] = this.qshflId.jddm;
        for (let key in arr) {
            if (arr[key] === "" || arr[key] == null) {
                console.log("删除arr[key]" + key);
                delete arr[key];
            }
        }
        console.log(arr);
        delete listHcyAdd[item][zdmc];
        listHcyAdd[item][zdmc] = [];
        listHcyAdd[item][zdmc].push(arr);
        console.log(arr);
        console.log(listHcyAdd);
    }

    // 某一项进行新增（唯一值）
    add_data_only_item(add_data, fl_arr) {
        console.log(this.hcylb);

        for (let key in add_data) {

            let item = add_data[key];
            item.ssxtdm = this.hjbxx.ssxtdm;
            item.ssgcdm = this.qshflId.ssgcdm;
            item.jddm = this.qshflId.jddm;
            // console.log(item.qsrId);
            // item.mc = this.searchService.searchByRegExp(item.qsrId, this.hcylb, 'id')[0].mc;
            console.log(item);
            if (item.qsrId) {
                // 有权属人id的
                if (item.qsrId.toString().length === 32) {
                    delete item.list;
                    delete item.id;
                    delete item.swszxzqhmc;
                    delete item.dcfwmc;
                    delete item.ssxxzxjbxxId;
                    delete item.zydlmc;
                    delete item.whcdmc;
                    delete item.zhgxsj;
                    delete item.sfzh;
                    delete item.flbmxList;
                    delete item.qsrmc;
                    delete item.cjsj;

                    delete item.localitydesc;
                    delete item.sbdgclbmc;
                    delete item.gbdslbmc;
                    delete item.gdgclbmc;
                    delete item.gklbmc;
                    delete item.xsmc;
                    delete item.sjhsbzmc;
                    delete item.ymyxcdmc;
                    delete item.djmc;
                    delete item.ljdldjmc;
                    delete item.jgclmc;
                    delete item.mtlbmc;
                    delete item.gkytmc;
                    delete item.mtytmc;

                    delete item.bhjbmc;
                    delete item.wwgjlbmc;
                    delete item.kczylbmc;
                    delete item.slsdlbmc;
                    delete item.zdlbmc;
                    delete item.qhjgmc;
                    delete item.ssgllbmc;
                    delete item.qhlbmc;
                    delete item.hdlbmc;

                    delete item.syxzmc;
                    delete item.lglxmc;
                    delete item.tllbmc;

                    delete item.lmclmc;
                    delete item.qtzxlbmc;
                    delete item.gldjmc;
                    delete item.zxlbmc


                    for (let key in item) {
                        if (item[key] === null || item[key] === "") {
                            delete item[key];
                        }
                    }
                    console.log(item);

                    let ls = {};
                    for (let i in item) {
                        ls[i] = item[i];
                    }
                    fl_arr.push(ls);
                    console.log(fl_arr);
                } else {
                    console.log("该项为新增人员底下的新增房屋")
                }
            } else {
                delete item.jddm;
                delete item.list;
                delete item.id;
                delete item.swszxzqhmc;
                delete item.dcfwmc;
                delete item.ssxxzxjbxxId;
                delete item.zydlmc;
                delete item.whcdmc;
                delete item.zhgxsj;
                delete item.sfzh;
                delete item.flbmxList;
                delete item.qsrmc;
                delete item.cjsj;

                delete item.localitydesc;
                delete item.sbdgclbmc;
                delete item.gbdslbmc;
                delete item.gdgclbmc;
                delete item.gklbmc;
                delete item.xsmc;
                delete item.sjhsbzmc;
                delete item.ymyxcdmc;
                delete item.djmc;
                delete item.ljdldjmc;
                delete item.jgclmc;
                delete item.mtlbmc;
                delete item.gkytmc;
                delete item.mtytmc;

                delete item.bhjbmc;
                delete item.wwgjlbmc;
                delete item.kczylbmc;
                delete item.slsdlbmc;
                delete item.zdlbmc;
                delete item.qhjgmc;
                delete item.ssgllbmc;
                delete item.qhlbmc;
                delete item.hdlbmc;

                delete item.syxzmc;
                delete item.lglxmc;
                delete item.tllbmc;

                delete item.lmclmc;
                delete item.qtzxlbmc;
                delete item.gldjmc;
                delete item.zxlbmc;
                delete item.xzmc;
                delete item.jjxzmc;
                delete item.hylbmc;
                delete item.dwlbmc;


                for (let key in item) {
                    if (item[key] === null || item[key] === "") {
                        delete item[key];
                    }
                }
                console.log(item);

                let ls = {};
                for (let i in item) {
                    ls[i] = item[i];
                }
                fl_arr.push(ls);
                console.log(fl_arr);

            }


        }
    }

    // 如果某项需要增加进行解析
    add_data_fn(add_data, fl_arr) {
        for (let key in add_data) {
            console.log(add_data[key]);
            let item = add_data[key];
            item.ssxtdm = this.hjbxx.ssxtdm;
            item.ssgcdm = this.qshflId.ssgcdm;
            item.jddm = this.qshflId.jddm;
            if (item.qsrId.toString().length === 32) {
                item.flbmxList = this.changeTable(item.flbmxList);
                item.ggmxxxList = this.changeTable(item.ggmxxxList);
                item.flbmxList.forEach((item1, key, array) => {
                    console.log(array[key]);
                    delete array[key].zbflId;
                    delete array[key].id;
                    delete array[key].qsrId;
                    delete array[key].ssfwjbxxId;
                    delete array[key].ssfwzxjbxxId;
                    delete array[key].ssfsssjbxxId;
                    delete array[key].sstdjbxxId;
                    delete array[key].sstdfzwjbxxId;
                    delete array[key].sslxgmjbxxId;
                    delete array[key].ssland_otherjbxxId;
                    delete array[key].fwzyytmc;

                    delete array[key].ssxxzxjbxxId;


                    for (let key3 in item1) {
                        if (item1[key3] == null || item1[key3] === "") {
                            delete item1[key3];
                        }
                    }
                });
                item.ggmxxxList.forEach((item1, key, array) => {
                    delete array[key].ssfwjbxxId;
                    for (let key3 in item1) {
                        delete item1.zdxmc;
                        delete item1.xh;
                        delete item1.cjsj;
                        delete item1.zhgxsj;
                        delete item1.sslb;
                        delete item1.id;
                        delete item1.ssfwjbxxId;
                        delete item1.ssfwzxjbxxId;
                        delete item1.ssfsssjbxxId;
                        delete item1.sstdjbxxId;
                        delete item1.sstdfzwjbxxId;
                        delete item1.sslxgmjbxxId;
                        delete item1.ssxxzxjbxxId;
                        if (item1[key3] == null || item1[key3] === "") {
                            console.log(key3)
                            delete item1[key3];
                        }
                    }
                });
                console.log(item.flbmxList);
                delete item.list;
                delete item.id;
                delete item.swszxzqhmc;
                delete item.dcfwmc;
                delete item.ssxxzxjbxxId;
                delete item.zydlmc;
                delete item.whcdmc;
                delete item.zhgxsj;
                delete item.sfzh;
                delete item.qsrmc;
                delete item.cjsj;
                delete item.localitydesc;
                delete item.fwxzmc;
                delete item.fwzyytmc;
                delete item.tdxzmc;


                for (let key in item) {
                    if (item[key] === null || item[key] === "") {
                        delete item[key];
                    }
                }
                console.log(item);

                let ls = {};
                for (let i in item) {
                    ls[i] = item[i];
                }
                fl_arr.push(ls);
                console.log(fl_arr);
            } else {
                console.log("该项为新增人员底下的新增房屋")
            }

        }
    }

    // 没有规格明细的（零星果木）
    add_data_noGGmx_fn(add_data, fl_arr) {
        for (let key in add_data) {
            console.log(add_data[key]);
            let item = add_data[key];
            item.ssxtdm = this.hjbxx.ssxtdm;
            item.ssgcdm = this.qshflId.ssgcdm;
            item.jddm = this.qshflId.jddm;
            if (item.qsrId.toString().length === 32) {
                item.flbmxAddList = this.changeTable(item.flbmxList);

                item.flbmxAddList.forEach((item1, key, array) => {
                    console.log(array[key]);
                    delete array[key].zbflId;
                    delete array[key].id;
                    delete array[key].ssfwjbxxId;
                    delete array[key].ssfwzxjbxxId;
                    delete array[key].ssfsssjbxxId;
                    delete array[key].sstdjbxxId;
                    delete array[key].sstdfzwjbxxId;
                    delete array[key].sslxgmjbxxId;
                    delete array[key].ssland_otherjbxxId;

                    delete array[key].ssxxzxjbxxId;


                    for (let key3 in item1) {
                        if (item1[key3] == null || item1[key3] === "") {
                            delete item1[key3];
                        }
                    }
                });

                console.log(item.flbmxList);
                delete item.list;
                delete item.id;
                delete item.swszxzqhmc;
                delete item.dcfwmc;
                delete item.ssxxzxjbxxId;
                delete item.zydlmc;
                delete item.whcdmc;
                delete item.zhgxsj;
                delete item.sfzh;
                delete item.flbmxList;
                delete item.qsrmc;
                delete item.cjsj;
                delete item.localitydesc;

                for (let key in item) {
                    if (item[key] === null || item[key] === "") {
                        delete item[key];
                    }
                }
                console.log(item);

                let ls = {};
                for (let i in item) {
                    ls[i] = item[i];
                }
                fl_arr.push(ls);
                console.log(fl_arr);
            } else {
                console.log("该项为新增人员底下的新增房屋")
            }

        }
    }

    //  没有分类明细和规格明细的
    add_data_noAll_fn(add_data, fl_arr) {
        console.log(add_data);
        for (let key in add_data) {
            // console.log(add_data[key]);
            let item = add_data[key];
            item.ssxtdm = this.hjbxx.ssxtdm;
            item.ssgcdm = this.qshflId.ssgcdm;
            item.jddm = this.qshflId.jddm;
            if (item.qsrId.toString().length === 32) {


                // console.log(item.flbmxList);
                delete item.list;
                delete item.id;
                delete item.swszxzqhmc;
                delete item.dcfwmc;
                delete item.ssxxzxjbxxId;
                delete item.zydlmc;
                delete item.whcdmc;
                delete item.zhgxsj;
                delete item.sfzh;
                delete item.flbmxList;
                delete item.qsrmc;
                delete item.cjsj;
                delete item.localitydesc;
                delete item.sslbmc;

                for (let key in item) {
                    if (item[key] === null || item[key] === "") {
                        delete item[key];
                    }
                }
                console.log(item);

                let ls = {};
                for (let i in item) {
                    ls[i] = item[i];
                }
                fl_arr.push(ls);
                console.log(fl_arr);
            } else {
                console.log("该项为新增人员底下的新增房屋")
            }

        }
    }

    // 新增的分类信息
    add_flxx_data(add_flxx_data) {
        console.log(add_flxx_data);
        let arr = this.changeTable(add_flxx_data);
        if (arr.length != 0) {
            arr.forEach((item1, key, arr1) => {
                delete arr1[key].zbflId;
            });
            return arr;
        }
    }

    // 修改的分类信息
    updata_flxx_data(updata_flxx_data) {
        let arr = this.changeTable(updata_flxx_data);
        if (arr.length != 0) {
            arr.forEach((item, key, arr1) => {
                delete arr1[key].ssxtdm;
                delete arr1[key].ssgcdm;
            });
            return arr;
        }
    }

    // 删除的分类信息
    del_flxx_data(del_flxx_data) {
        let arr = this.changeTable(del_flxx_data);
        console.log(arr);
        if (arr.length != 0) {
            arr.forEach((item, key, arr1) => {
                delete arr1[key].ssxtdm;
                delete arr1[key].ssgcdm;
            });
            return arr;
        }
    }

    // 新增的规格信息
    add_ggxx_data(add_ggxx_data) {
        let arr = this.changeTable(add_ggxx_data);
        console.log(arr);
        arr.forEach((item, key, arr1) => {
            delete arr1[key].xh;
            delete arr1[key].id;
            delete arr1[key].zdxmc;
            for (let i in arr1[key]) {
                if (arr1[key][i] === "") {
                    delete arr1[key][i]
                }
            }
        });
        return arr;
    }

    // 修改的规格信息
    updata_ggxx_data(updata_ggxx_data) {
        let arr = this.changeTable(updata_ggxx_data);
        if (arr.length != 0) {
            arr.forEach((item, key, arr1) => {
                delete arr1[key].ssxtdm;
                delete arr1[key].ssgcdm;
                for (let key2 in item) {
                    if (item[key2] == null) {
                        item[key2] = -100;
                    }
                }
            });

            return arr;
        }
    }

    // 删除的规格信息
    del_ggxx_data(del_ggxx_data) {
        let resArr = [];
        for (let item in del_ggxx_data) {
            let lsObj = {};
            for (let item2 in del_ggxx_data[item]) {
                lsObj[item2] = del_ggxx_data[item][item2];
            }
            resArr.push(lsObj);
        }
        return resArr;
    }


    // 获取导航的url列表
    getUrlList(arr) {
        arr.forEach((item, key, arr) => {
            this.navListUrl.push(item.url)
        })
    }

    // 去掉没有配置的导航
    delNav(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].isCheck == 0) {
                arr.splice(i, 1);
                i--;
            }
        }
        return arr;
    }

    //导航栏进行排序
    delSort(name) {
        return function (o, p) {
            var a, b;
            if (typeof o === "object" && typeof p === "object" && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;
                }
                return typeof a < typeof b ? -1 : 1;
            }
            else {
                throw ("error");
            }
        }
    }

    // 把用id开头的转成自己需要的
    changeTable(arr) {
        console.log(arr);
        let resArr = [];
        for (let item in arr) {
            console.log(item);
            let lsObj = {};
            for (let item2 in arr[item]) {
                console.log(item2);
                console.log(arr[item]);
                lsObj[item2] = arr[item][item2];

            }
            // delete arr[item];
            lsObj['ssxtdm'] = this.hjbxx.ssxtdm;
            lsObj['ssgcdm'] = this.hjbxx.ssgcdm;
            // console.log(lsObj);
            resArr.push(lsObj);
        }
        console.log(resArr);
        return resArr;
    }


    //基本信息判断必填项
    Btpd(info, arrBtpd, msg) {
        console.log(info);
        console.log(arrBtpd);

        this.BtpdValue = true;
        for (let item of info) {
            console.log("33333333333")
            console.log(item)
            for (let f in arrBtpd) {
                console.log(f)
                console.log(item[f])

                if (item[f] === "" || item[f] == undefined) {

                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '填入提醒', detail: msg + arrBtpd[f] + ' 必填'});
                    this.BtpdValue = false;
                    console.log('有必填项未填');
                    return false;
                }
            }
        }
        return true;
    }

    // 对象判断

    objPd(info, arrBtpd, msg) {
         this.BtpdValue = true;
           for (let f in arrBtpd) {
                if (info[f] === "" || info[f] == undefined) {
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '填入提醒', detail: msg + arrBtpd[f] + ' 必填'});
                    this.BtpdValue = false;
                    console.log('有必填项未填');
                    return false;
                }
            }
         return true;
    }


    // 判断户基本信息必填项
    bhjbxxBtpd(info) {
        console.log(info);
        this.BtpdValue = true;
        for (let f in bhjbxxBtpd) {
            console.log(f)
            if (info[f] === "") {
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: '填入提醒', detail: bhjbxxBtpd[f] + ' 必填'});
                this.BtpdValue = false;
                console.log('有必填项未填');
                return false;
            }
        }
        return true;
    }

    // 规格信息判断必填项
    ggxxBtpd(info, zd, msg) {
        this.BtpdValue = true;
        for (let item of info) {
            console.log(item)
            if (item[zd] === "" || item[zd] == undefined) {
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: '填入提醒', detail: msg + ' 必填'});
                this.BtpdValue = false;
                console.log('有必填项未填');
                return false;
            }
        }
        return true;
    }

    // 分类信息新增判断
    flxxPd(string,zd,msg){
        console.log(string);
        if(string){
            for(let item of string){
                if(isNaN(item[zd])){
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '填入提醒', detail: msg+item[zd]+'不是数字'});
                    return false;
                }else{
                    return true;
                }
            }
        }else{
            return true;
        }
    }

    beforeJmh() {
        for (let key in this.jmhList) {
            if (this.jmhList[key]['id'] == this.info['id']) {
                if (parseInt(key) == 0) {
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '填入提醒', detail: '这为第一户，无上一户'});
                } else {
                    this.info['id'] = this.jmhList[parseInt(key) - 1]['id'];

                    this.HttpService.get(`/jmh/show?id=${this.jmhList[parseInt(key) - 1]['id']}`)
                        .then(res => {
                            console.log(res);
                            this.init_person_data = JSON.parse(JSON.stringify(res['returnObject']));
                            this.init_hjbxx_data = JSON.parse(JSON.stringify(res['returnObject']['bHjbxx']));
                            console.log(this.init_hjbxx_data);
                            this.hjbxx = res['returnObject']['bHjbxx'];
                            this.hcylb = res['returnObject']['listHcy'];
                            this.def_hcylb_info = JSON.parse(JSON.stringify(this.hcylb));
                            this.sfxw = this.hjbxx.sfxw;
                            this.saveRouter(this.activeTabName, this.activeTabId);
                        });
                }

                break;
            }
        }
    }

    nextJmh(id) {
        for (let key in this.jmhList) {
            if (this.jmhList[key]['id'] == this.info['id']) {
                console.log(key);
                console.log(this.jmhList.length - 1);
                if (parseInt(key) == this.jmhList.length - 1) {
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: '填入提醒', detail: '这为最后一户，无下一户'});

                } else {
                    console.log(this.jmhList[parseInt(key) + 1].id);
                    this.info['id'] = this.jmhList[parseInt(key) + 1]['id'];
                    this.HttpService.get(`/jmh/show?id=${this.jmhList[parseInt(key) + 1]['id']}`)
                        .then(res => {
                            console.log(res);
                            this.init_person_data = JSON.parse(JSON.stringify(res['returnObject']));
                            this.init_hjbxx_data = JSON.parse(JSON.stringify(res['returnObject']['bHjbxx']));
                            console.log(this.init_hjbxx_data);
                            this.hjbxx = res['returnObject']['bHjbxx'];
                            this.hcylb = res['returnObject']['listHcy'];
                            this.def_hcylb_info = JSON.parse(JSON.stringify(this.hcylb));
                            this.sfxw = this.hjbxx.sfxw;
                            this.saveRouter(this.activeTabName, this.activeTabId);
                        });
                    break;
                }

            }
        }
    }
}


const
    hcyBtpd = {
        szxzqhdm: '所属行政区划',
        zydldm: '专业大类',
        dcfwdm: '调查范围',

        sfkgr: '是否空挂人',
        yhzgxdm: "与户主关系代码"

    };
const
    bhjbxxBtpd = {
        hzxm: '户主姓名',
        sfkgh: '是否空挂户',
        xzqhdm: '所属行政区',
        dabh: '档案编号',
        zydldm: '专业大类',
        dcfwdm: '调查范围',

    };
const
    comBtpd = {
        zydldm: '专业大类',
        dcfwdm: '调查范围',
        swszxzqhdm: '所属行政区',
    };
const qsrBtpd = {
    zydldm: '专业大类',
    dcfwdm: '调查范围',
    szxzqhdm: '所属行政区',
    sfkgr: '是否空挂人',
};


