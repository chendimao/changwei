import {Component, OnInit, AfterViewInit,ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpService} from "../../../../service/http-service";
import {MenuItem, Message, SelectItem} from 'primeng/primeng';
import {flyIn} from "../../../../animations/fly-in";
import {HjbxxModel} from "./Hjbxx.model";
import {alertModelInfo} from "../alertModelInfo";

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
    ssxzqhdm: string;
    public isDisabled: boolean = true;
    private alertModelInfo: alertModelInfo = new alertModelInfo;
    public hcylb;

    //保存子组件data数据
    private trees_data;
    private water_data;


    @ViewChild('room', {read: ViewContainerRef}) ModelRoom: ViewContainerRef;


    constructor(private HttpService: HttpService, private AlertModel: ComponentFactoryResolver, private route: ActivatedRoute, private router: Router) {
        this.types1 = [];
        this.types1.push({label: '是', value: '1'});
        this.types1.push({label: '否', value: '0'});
        this.types2 = [];
        this.types2.push({label: '是', value: '1'});
        this.types2.push({label: '否', value: '0'});
        this.navList = personLIst;
    }

    ngOnInit() {
        console.log(this.info);


        console.log(this.type);
        switch (this.type) {
            case 'view':
                this.HttpService.get(`/jmh/show?id=${this.info.id}`)
                    .then(res => {
                        console.log(res);
                        this.hjbxx = res['returnObject']['bHjbxx'];
                        this.hcylb = res['returnObject']['listHcy'];
                    });
                break;
            case 'add':
                break;
            case 'rew':
                this.HttpService.get(`/jmh/show?id=${this.info.id}`)
                    .then(res => {
                        console.log(res);
                        this.hjbxx = res['returnObject']['bHjbxx'];
                        this.hcylb = res['returnObject']['listHcy'];

                        const alert  = this.AlertModel.resolveComponentFactory(PersonComponent);
                        const alert2 = this.ModelRoom.createComponent(alert);
                        alert2.instance.childInfo = this.hcylb;

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
        console.log(this.ModelRoom);
        this.ModelRoom.clear();
       // this.childrenModel = this.AlertModel.resolveComponentFactory(PersonComponent);
        switch (url) {
            case 'person':

                const person  = this.AlertModel.resolveComponentFactory(PersonComponent);
                const person2 = this.ModelRoom.createComponent(person);
                person2.instance.childInfo = this.hcylb;
                break;
            case 'houses':
                const houses = this.AlertModel.resolveComponentFactory(HousesComponent);
                const houses2 = this.ModelRoom.createComponent(houses);
                break;
            case 'decoration':
                const decoration = this.AlertModel.resolveComponentFactory(DecorationComponent);
                const decoration2 = this.ModelRoom.createComponent(decoration);
                break;
            case 'fsss':
                const fsss = this.AlertModel.resolveComponentFactory(FsssComponent);
                const fsss2 =  this.ModelRoom.createComponent(fsss);
                break;
            case 'land':
                const land = this.AlertModel.resolveComponentFactory(LandComponent);
                const land2 = this.ModelRoom.createComponent(land);
                break;
            case 'landOther':

                const landOther = this.AlertModel.resolveComponentFactory(LandOtherComponent);
                const landOther2 = this.ModelRoom.createComponent(landOther);
                break;
            case 'trees':




                if(this.trees_data == null){
                    const params = 'jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=S000001&xzqhdm=350526000000000&jmhId=7BCD3BE587394F4D969D3B0CC6225E95&zblId=2F0E8D93C2B74B2AA569A961F951741D';
                    this.HttpService.get('lxgm/list?'+params).then((data)=>{


                        const trees = this.AlertModel.resolveComponentFactory(TreesComponent);
                        const trees2 = this.ModelRoom.createComponent(trees);

                        trees2.instance.childInfo = this.hjbxx;
                        trees2.instance.childInfo2 = this.hcylb;


                        this.trees_data  = data;
                        trees2.instance.data = data;

                    });
                }else{
                    const trees = this.AlertModel.resolveComponentFactory(TreesComponent);
                    const trees2 = this.ModelRoom.createComponent(trees);

                    trees2.instance.childInfo = this.hjbxx;
                    trees2.instance.childInfo2 = this.hcylb;
                    trees2.instance.data = this.trees_data;
                }



                break;
            case 'water':
                if(this.water_data == null){
                    const params = 'jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=S000001&xzqhdm=350526000000000&jmhId=7BCD3BE587394F4D969D3B0CC6225E95&zblId=2F0E8D93C2B74B2AA569A961F951741D';
                    this.HttpService.get('xxzx/list?'+params).then((data)=>{


                        const trees = this.AlertModel.resolveComponentFactory(WaterComponent);
                        const trees2 = this.ModelRoom.createComponent(trees);

                        trees2.instance.childInfo = this.hjbxx;
                        trees2.instance.childInfo2 = this.hcylb;


                        this.water_data  = data;
                        trees2.instance.data = data;

                    });
                }else{
                    const trees = this.AlertModel.resolveComponentFactory(WaterComponent);
                    const trees2 = this.ModelRoom.createComponent(trees);

                    trees2.instance.childInfo = this.hjbxx;
                    trees2.instance.childInfo2 = this.hcylb;
                    trees2.instance.data = this.water_data;
                }
                break;
            case 'grave':

                if(this.trees_data == null){
                    const params = 'jdId=4DDBCC17FC9348DC945B42F7C46769B0&gcdm=S000001&xzqhdm=350526000000000&jmhId=7BCD3BE587394F4D969D3B0CC6225E95&zblId=2F0E8D93C2B74B2AA569A961F951741D';
                    this.HttpService.get('lxgm/list?'+params).then((data)=>{


                        const trees = this.AlertModel.resolveComponentFactory(GraveComponent);
                        const trees2 = this.ModelRoom.createComponent(trees);

                        trees2.instance.childInfo = this.hjbxx;
                        trees2.instance.childInfo2 = this.hcylb;


                        this.trees_data  = data;
                        trees2.instance.data = data;

                    });
                }else{
                    const trees = this.AlertModel.resolveComponentFactory(GraveComponent);
                    const trees2 = this.ModelRoom.createComponent(trees);

                    trees2.instance.childInfo = this.hjbxx;
                    trees2.instance.childInfo2 = this.hcylb;
                    trees2.instance.data = this.trees_data;
                }
                break;
            case 'qsr':
                const qsr = this.AlertModel.resolveComponentFactory(QsrComponent);
                const qsr2 = this.ModelRoom.createComponent(qsr);
                break;

            case 'gtgsjbqk':
                const gtgsjbqk= this.AlertModel.resolveComponentFactory(JtgsjbxqComponent);
                const gtgsjbqk2 = this.ModelRoom.createComponent(gtgsjbqk);
                break;
            case 'shebei':
                const shebei= this.AlertModel.resolveComponentFactory(ShebeiComponent);
                const shebei2 = this.ModelRoom.createComponent(shebei);
                break;
            case 'sheshi':
                const sheshi= this.AlertModel.resolveComponentFactory(SheshiComponent);
                const sheshi2 = this.ModelRoom.createComponent(sheshi);
                break;
            case 'nfyssjbqk':
                const nfyssjbqk= this.AlertModel.resolveComponentFactory(NfyssjbqkComponent);
                const nfyssjbqk2 = this.ModelRoom.createComponent(nfyssjbqk);
                break;
            case 'fyss':
                const fyss= this.AlertModel.resolveComponentFactory(FyssComponent);
                const fyss2 = this.ModelRoom.createComponent(fyss);
                break;
            case 'dwqbqk':
                const dwqbqk= this.AlertModel.resolveComponentFactory(DwqbqkComponent);
                const dwqbqk2 = this.ModelRoom.createComponent(dwqbqk);
                break;
            // case 'gykqyxq':
            //     this.childrenModel = this.AlertModel.resolveComponentFactory(GykqyxqComponent);
            //     break;
            case 'tljbxx':
                const tljbxx = this.AlertModel.resolveComponentFactory(TljbxxComponent);
                const tljbxx2 = this.ModelRoom.createComponent(tljbxx);
                break;
            case 'gljbxx':
                const gljbxx= this.AlertModel.resolveComponentFactory(GljbxxComponent);
                const gljbxx2 = this.ModelRoom.createComponent(gljbxx);
                break;
            case 'qhjbxx':
                const qhjbxx= this.AlertModel.resolveComponentFactory(QhjbxxComponent);
                const qhjbxx2 = this.ModelRoom.createComponent(qhjbxx);
                break;

            case 'hdjbxx':
                const hdjbxx = this.AlertModel.resolveComponentFactory(HdjbxxComponent);
                const hbjbxx2 = this.ModelRoom.createComponent(hdjbxx);
                break;
            case 'gkjbxx':

                const gkjbxx = this.AlertModel.resolveComponentFactory(GkjbxxComponent);
                const gkjbxx2 =this.ModelRoom.createComponent(gkjbxx);
                break;
            case 'mtjbxx':

                const mtjbxx = this.AlertModel.resolveComponentFactory(MtjbxxComponent);
                const mtjbxx2 = this.ModelRoom.createComponent(mtjbxx);
                break;
            case 'sbdgcjbxx':
                const sbdgcjbxx= this.AlertModel.resolveComponentFactory(SbdgcjbxxComponent);
                const sbdgcjbxx2 =this.ModelRoom.createComponent(sbdgcjbxx);
                break;
            case 'dxgcjbxx':
                const dxgcjbxx= this.AlertModel.resolveComponentFactory(DxgcjbxxComponent);
                const dxgcjbxx2 = this.ModelRoom.createComponent(dxgcjbxx);
                break;
            case 'gbdsjbxx':
                const gbdsjbxx= this.AlertModel.resolveComponentFactory(GbdsjbxxComponent);
                const gbdsjbxx2 = this.ModelRoom.createComponent(gbdsjbxx);
                break;
            case 'gdgcjbxx':

                const gdgcjbxx= this.AlertModel.resolveComponentFactory(GdgcjbxxComponent);
                const gdgcjbxx2 = this.ModelRoom.createComponent(gdgcjbxx);
                break;
            case 'slsdgcjbxx':
                const slsdgcjbxx = this.AlertModel.resolveComponentFactory(SlsdgcjbxxComponent);
                const slsdgcjbxx2= this.ModelRoom.createComponent(slsdgcjbxx);
                break;
            case 'kczyjbxx':
                const kczyjbxx = this.AlertModel.resolveComponentFactory(KczyjbxxComponent);
                const kczyjbxx2 = this.ModelRoom.createComponent(kczyjbxx);
                break;
            case 'wwgjjbxx':
                const wwgjjbxx= this.AlertModel.resolveComponentFactory(WwgjjbxxComponent);
                const wwgjjbxx2 = this.ModelRoom.createComponent(wwgjjbxx);
                break;

            case 'swqxzjbxx':
                const swqxzjbxx = this.AlertModel.resolveComponentFactory(SwqxzjbxxComponent);
                const swqxzjbxx2 = this.ModelRoom.createComponent(swqxzjbxx);
                break;
            case 'qtzxjbxx':
                const qtzxjbxx = this.AlertModel.resolveComponentFactory(QtzxjbxxComponent);
                const qtzxjbxx2 = this.ModelRoom.createComponent(qtzxjbxx);
                break;
        }

        console.log(this.AlertModel);
        console.log(PersonComponent);
        console.log(this.childrenModel);


    }


    // show(info: object): void {
    //     console.log(sessionStorage['person']);
    //     for (let i in info) {
    //         if (info[i] == "") {
    //             for (let f in this.hjbxx) {
    //                 if (i == f) {
    //                     console.log(this.hjbxx[f]);
    //                     this.msgs = [];
    //                     this.msgs.push({severity: 'error', summary: '填入提醒', detail: this.hjbxx[f] + ' 必填'});
    //                 }
    //             }
    //         }
    //     }
    // }
}


// const hjbxx = {
//     ssxtdm: '所属系统',
//     ssgcdm: '所属工程',
//     jddm: '阶段',
//     ssxzqhdm: '所属行政区划',
//     zydldm: '专业大类',
//     dcfwdm: '调查范围',
//     hlbdm: '户类型',
//     hzxm: '户主姓名',
//     dabh: '档案编号',
//     hs: '户数',
//     sfkgh: '是否空挂户',
//
// };

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
const personLIst = [
    {path: 'person', name: '人口'}, {path: 'houses', name: '房屋'}, {path: 'decoration', name: '装修'},
    {path: 'fsss', name: '附属设施'}, {path: 'land', name: '土地'}, {path: 'landOther', name: '土地附着物'},
    {path: 'trees', name: '零星树木'}, {path: 'water', name: '小型水利水电'}, {path: 'grave', name: '坟墓'}
];
const jtjjzzLIst = [
    {path: 'qsr', name: '权属人'}, {path: 'houses', name: '房屋'}, {path: 'decoration', name: '装修'},
    {path: 'fsss', name: '附属设施'}, {path: 'land', name: '土地'}, {path: 'landOther', name: '土地附着物'},
    {path: 'trees', name: '零星树木'}, {path: 'water', name: '小型水利水电'}, {path: 'grave', name: '坟墓'}
]


