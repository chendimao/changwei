import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MenuItem, Message, SelectItem} from 'primeng/primeng';
import {flyIn} from "../../../../animations/fly-in";
import {HjbxxModel} from "./Hjbxx.model";
import {alertModelInfo } from "../alertModelInfo";

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


@Component({
    selector: 'app-swzb-person',
    templateUrl: './swzb-person.component.html',
    styleUrls: ['./swzb-person.component.css'],
    animations: [flyIn]
})
export class SwzbPersonComponent implements OnInit {
    private selectList = new Array;
    public hjbxx = new HjbxxModel;
    public info: alertModelInfo = new alertModelInfo;
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
    ssxzqhdm: string;
    public isDisabled: boolean = true;

    @ViewChild('room', {read: ViewContainerRef}) ModelRoom: ViewContainerRef;


    constructor(private AlertModel: ComponentFactoryResolver, private route: ActivatedRoute, private router: Router) {
        this.types1 = [];
        this.types1.push({label: '是', value: 'yes'});
        this.types1.push({label: '否', value: 'no'});
        this.types2 = [];
        this.types2.push({label: '是', value: 'yes'});
        this.types2.push({label: '否', value: 'no'});
    }

    ngOnInit() {
        console.log(this.info);


        this.selectedType1 = 'yes';
        this.selectedType2 = 'yes';
        this.navList = navList;
        this.selectList = [
            {label: '农村部分', name: '农村部分', value: '0'},
            {label: '县城部分', name: '县城部分', value: '1'},
            {label: '集镇部分', name: '集镇部分', value: '2'},
        ];
    }

    selectedTypea(): void {
        console.log(this.selectedType1);
    }


    showAreaBlock(): void {
        if (this.isShowArea) {
            this.isShowArea = false;
        } else {
            this.isShowArea = true;
        }
    }

    getChildEvent(index) {
        this.hjbxx.zydldm = index;
    }

    showTypeBlock() {
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

    close() {
        this.showqqq = false;
    }


    saveRouter(url) {
        this.avtiveName = url;
        this.ModelRoom.clear();
        switch (url) {
            case 'person':
                this.childrenModel = this.AlertModel.resolveComponentFactory(PersonComponent);
                break;
            case 'houses':
                this.childrenModel = this.AlertModel.resolveComponentFactory(HousesComponent);
                break;
            case 'decoration':
                this.childrenModel = this.AlertModel.resolveComponentFactory(DecorationComponent);
                break;
            case 'fsss':
                this.childrenModel = this.AlertModel.resolveComponentFactory(FsssComponent);
                break;
            case 'land':
                this.childrenModel = this.AlertModel.resolveComponentFactory(LandComponent);
                break;
            case 'landOther':
                this.childrenModel = this.AlertModel.resolveComponentFactory(LandOtherComponent);
                break;
            case 'trees':
                this.childrenModel = this.AlertModel.resolveComponentFactory(TreesComponent);
                break;
            case 'water':
                this.childrenModel = this.AlertModel.resolveComponentFactory(WaterComponent);
                break;
            case 'grave':
                this.childrenModel = this.AlertModel.resolveComponentFactory(GraveComponent);
                break;
            case 'qsr':
                this.childrenModel = this.AlertModel.resolveComponentFactory(QsrComponent);
                break;

            case 'gtgsjbqk':
                this.childrenModel = this.AlertModel.resolveComponentFactory(JtgsjbxqComponent);
                break;
            case 'shebei':
                this.childrenModel = this.AlertModel.resolveComponentFactory(ShebeiComponent);
                break;
            case 'sheshi':
                this.childrenModel = this.AlertModel.resolveComponentFactory(SheshiComponent);
                break;
            case 'nfyssjbqk':
                this.childrenModel = this.AlertModel.resolveComponentFactory(NfyssjbqkComponent);
                break;
            case 'fyss':
                this.childrenModel = this.AlertModel.resolveComponentFactory(FyssComponent);
                break;
            case 'dwqbqk':
                this.childrenModel = this.AlertModel.resolveComponentFactory(DwqbqkComponent);
                break;
            // case 'gykqyxq':
            //     this.childrenModel = this.AlertModel.resolveComponentFactory(GykqyxqComponent);
            //     break;
            case 'tljbxx':
                this.childrenModel = this.AlertModel.resolveComponentFactory(TljbxxComponent);
                break;
            case 'gljbxx':
                this.childrenModel = this.AlertModel.resolveComponentFactory(GljbxxComponent);
                break;
            case 'qhjbxx':
                this.childrenModel = this.AlertModel.resolveComponentFactory(QhjbxxComponent);
                break;

            case 'hdjbxx':
                this.childrenModel = this.AlertModel.resolveComponentFactory(HdjbxxComponent);
                break;
            case 'gkjbxx':
                this.childrenModel = this.AlertModel.resolveComponentFactory(GkjbxxComponent);
                break;
            case 'mtjbxx':
                this.childrenModel = this.AlertModel.resolveComponentFactory(MtjbxxComponent);
                break;
            case 'sbdgcjbxx':
                this.childrenModel = this.AlertModel.resolveComponentFactory(SbdgcjbxxComponent);
                break;
            case 'dxgcjbxx':
                this.childrenModel = this.AlertModel.resolveComponentFactory(DxgcjbxxComponent);
                break;
            case 'gbdsjbxx':
                this.childrenModel = this.AlertModel.resolveComponentFactory(GbdsjbxxComponent);
                break;
            case 'gdgcjbxx':
                this.childrenModel = this.AlertModel.resolveComponentFactory(GdgcjbxxComponent);
                break;
            case 'slsdgcjbxx':
                this.childrenModel = this.AlertModel.resolveComponentFactory(SlsdgcjbxxComponent);
                break;
            case 'kczyjbxx':
                this.childrenModel = this.AlertModel.resolveComponentFactory(KczyjbxxComponent);
                break;
            case 'wwgjjbxx':
                this.childrenModel = this.AlertModel.resolveComponentFactory(WwgjjbxxComponent);
                break;

            case 'swqxzjbxx':
                this.childrenModel = this.AlertModel.resolveComponentFactory(SwqxzjbxxComponent);
                break;
            case 'qtzxjbxx':
                this.childrenModel = this.AlertModel.resolveComponentFactory(QtzxjbxxComponent);
                break;
        }
        this.ModelRoom.createComponent(this.childrenModel);


    }


    show(info: object): void {
        console.log(sessionStorage['person']);
        for (let i in info) {
            if (info[i] == "") {
                for (let f in this.hjbxx) {
                    if (i == f) {
                        console.log(this.hjbxx[f]);
                        this.msgs = [];
                        this.msgs.push({severity: 'error', summary: '填入提醒', detail: this.hjbxx[f] + ' 必填'});
                    }
                }
            }
        }
    }
}


const hjbxx = {
    ssxtdm: '所属系统',
    ssgcdm: '所属工程',
    jddm: '阶段',
    ssxzqhdm: '所属行政区划',
    zydldm: '专业大类',
    dcfwdm: '调查范围',
    hlbdm: '户类型',
    hzxm: '户主姓名',
    dabh: '档案编号',
    hs: '户数',
    sfkgh: '是否空挂户',

};

const navList = [
    {path: 'person', name: '人口'}, {path: 'houses', name: '房屋'}, {path: 'decoration', name: '装修'},
    {path: 'fsss', name: '附属设施'}, {path: 'land', name: '土地'}, {path: 'landOther', name: '土地附着物'},
    {path: 'trees', name: '零星树木'}, {path: 'water', name: '小型水利水电'}, {path: 'grave', name: '坟墓'},
    {path: 'qsr', name: '权属人'},

    {path: 'gtgsjbqk', name: '个体工商基本情况'}, {path: 'shebei', name: '设备'}, {path: 'sheshi', name: '设施'},
    {path: 'nfyssjbqk', name: '农副业设施基本情况'}, {path: 'fyss', name: '副业设施'}, {path: 'dwqbqk', name: '单位基本情况'},
    {path: 'tljbxx', name: '铁路'}, {path: 'gljbxx', name: '公路'}, {path: 'qhjbxx', name: '桥涵'},
    {path: 'hdjbxx', name: '航道'},

    {path: 'gkjbxx', name: '港口'}, {path: 'mtjbxx', name: '码头'}, {path: 'sbdgcjbxx', name: '输变电工程'},
    {path: 'dxgcjbxx', name: '输变电工程'}, {path: 'gbdsjbxx', name: '广播电视工程'}, {path: 'gdgcjbxx', name: '管道工程'},
    {path: 'slsdgcjbxx', name: '水利水电工程'}, {path: 'kczyjbxx', name: '矿产资源'}, {path: 'wwgjjbxx', name: '文物古迹'},
    {path: 'swqxzjbxx', name: '水文（气象）站'},
    {path: 'qtzxjbxx', name: '其他专项'},
];


