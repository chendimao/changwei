import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HttpService} from "../../service/http-service";

@Component({
    selector: 'app-second-nav',
    templateUrl: './SecondNav.component.html',
    styleUrls: ['./SecondNav.component.css'],
    providers: [HttpService]
})
export class SecondNavComponent implements OnInit {
    private NavValue: any;
    isAdd: boolean;
    public routLink: string;
    private projectId: string;
    private emgList = new Array();
    private queryNav = new Object();
    private jddm: String;
    private jdmc: String;

    @Input() values;
    @Output() childEvent = new EventEmitter<any>();

    constructor(private HttpService: HttpService) {

    }

    ngOnInit() {


    }

    ngOnChanges() {
        let jddm = this.values[1];
        let jdmc = this.values[2];
        console.log(jddm);
        this.emgList[jddm] = new Array();

        switch (jddm) {
            case "MPH-A":
                let swzbObj1 = {mc: "实物指标", routerLink: 'swzb', content: []};
                let ghzbObj1 = {mc: "规划指标", routerLink: 'ghzb', content: []};
                let tzgsObj1 = {mc: "投资概算", routerLink: 'tzgs', content: []}
                this.emgList[jddm].push(swzbObj1);
                this.emgList[jddm].push(ghzbObj1);
                this.emgList[jddm].push(tzgsObj1);
                this.HttpService.get('qsrsjswzb/listQsrlb')
                    .then((res) => {
                        console.log(res['returnObject']);
                        res['returnObject'].forEach((item) => {
                            swzbObj1.content.push(item);
                        })
                        console.log(this.emgList);
                    });
                this.HttpService.get('zdk/listTree?sjId=CE22671CAA6D49B0BD3071CD63A72B95')
                    .then((res) => {
                        console.log(res['returnObject']);
                        res['returnObject'].forEach((item) => {
                            console.log(item);
                            ghzbObj1.content.push(item);
                        });
                        console.log(this.emgList);
                    });
                tzgsObj1.content.push({mc: '投资概算', id: 'tzgs', content: ''});
                break;
            case "MPH-B":
                let swzbObj2 = {mc: "实物指标", routerLink: 'swzb', content: []};
                let ghzbObj2 = {mc: "规划指标", routerLink: 'ghzb', content: []};
                this.emgList[jddm].push(swzbObj2);
                this.emgList[jddm].push(ghzbObj2);
                this.HttpService.get('qsrsjswzb/listQsrlb')
                    .then((res) => {
                        console.log(res['returnObject']);
                        res['returnObject'].forEach((item) => {
                            swzbObj2.content.push(item);
                        })
                        console.log(this.emgList);
                    });
                this.HttpService.get('zdk/listTree?sjId=CE22671CAA6D49B0BD3071CD63A72B95')
                    .then((res) => {
                        console.log(res['returnObject']);
                        res['returnObject'].forEach((item) => {
                            ghzbObj2.content.push(item);
                        });
                        console.log(this.emgList);
                    });
                break;

            case "MPH-C":
                let swzbObj3 = {mc: "实物指标", routerLink: 'swzb', content: []};
                let ghzbObj3 = {mc: "规划指标", routerLink: 'ghzb', content: []};
                this.emgList[jddm].push(swzbObj3);
                this.emgList[jddm].push(ghzbObj3);
                this.HttpService.get('qsrsjswzb/listQsrlb')
                    .then((res) => {
                        console.log(res['returnObject']);
                        res['returnObject'].forEach((item) => {
                            swzbObj3.content.push(item);
                        })
                        console.log(this.emgList);
                    });
                this.HttpService.get('zdk/listTree?sjId=CE22671CAA6D49B0BD3071CD63A72B95')
                    .then((res) => {
                        console.log(res['returnObject']);
                        res['returnObject'].forEach((item) => {
                            ghzbObj3.content.push(item);
                        });
                        console.log(this.emgList);
                    });

                break;
            case "MPH-D":
                let swzbObj4 = {mc: "实物指标", routerLink: 'swzb', content: []};
                let ghzbObj4 = {mc: "规划指标", routerLink: 'ghzb', content: []};
                this.emgList[jddm].push(swzbObj4);
                this.emgList[jddm].push(ghzbObj4);
                this.HttpService.get('qsrsjswzb/listQsrlb')
                    .then((res) => {
                        console.log(res['returnObject']);
                        res['returnObject'].forEach((item) => {
                            swzbObj4.content.push(item);
                        })
                        console.log(this.emgList);
                    });
                this.HttpService.get('zdk/listTree?sjId=CE22671CAA6D49B0BD3071CD63A72B95')
                    .then((res) => {
                        console.log(res['returnObject']);
                        res['returnObject'].forEach((item) => {
                            ghzbObj4.content.push(item);
                        });
                        console.log(this.emgList);
                    });
                break;


        }


        this.queryNav = {
            'swzb': [
                {
                    mc: '农村部分',
                    routerLink: 'ncbf',
                    content: [
                        {mc: '人口', routerLink: 'person', content: ''},
                        {mc: '房屋', routerLink: 'home', content: ''},
                        {mc: '土地', routerLink: 'load', content: ''},
                        {mc: '附属设施', routerLink: 'fsss', content: ''},
                        {mc: '装修', routerLink: 'zx', content: ''},
                        {mc: '零星树木', routerLink: 'lxsm', content: ''},
                        {mc: '土地附着物', routerLink: 'tdfzw', content: ''},
                        {mc: '坟墓', routerLink: 'fm', content: ''},
                        {mc: '农村小型专项', routerLink: 'ncxxzx', content: ''},
                        {mc: '文教卫及宗教', routerLink: 'wjwjzj', content: ''},
                        {mc: '农副业', routerLink: 'nfy', content: ''},
                        {mc: '个体工商', routerLink: 'gtgs', content: ''},
                        {mc: '乡村企事业单位', routerLink: 'xcqsydw', content: ''}
                    ]
                },


                {
                    mc: '城集镇部分',
                    routerLink: 'czbf',
                    content: [
                        {mc: '人口', routerLink: 'ncymaz', content: ''},
                        {mc: '房屋', routerLink: 'ghzb2', content: ''},
                        {mc: '附属设施', routerLink: 'zyxmcl', content: ''},
                        {mc: '装修', routerLink: 'ghzb4', content: ''},
                        {mc: '零星树木', routerLink: 'ghzb5', content: ''},
                        {mc: '土地附着物', routerLink: 'tdfzw', content: ''},
                        {mc: '农副业', routerLink: 'nfy', content: ''},
                        {mc: '个体工商', routerLink: 'gtgs', content: ''},
                        {mc: '乡村企事业单位', routerLink: 'xcqsydw', content: ''}

                    ]
                },
                {
                    mc: '工业企业',
                    routerLink: 'gyqy',
                    content: [
                        {mc: '工业企业', routerLink: 'gyxm', content: ''},
                    ]
                },
                {
                    mc: '专业项目',
                    routerLink: 'zyxm',
                    content: [
                        {mc: '铁路', routerLink: 'tl', content: ''},
                        {mc: '公路', routerLink: 'gl', content: ''},
                        {mc: '桥涵', routerLink: 'qh', content: ''},
                        {mc: '航道', routerLink: 'hd', content: ''},
                        {mc: '港口', routerLink: 'gk', content: ''},
                        {mc: '码头', routerLink: 'mt', content: ''},
                        {mc: '输变电工程', routerLink: 'bsdgc', content: ''},
                        {mc: '电信工程', routerLink: 'dxgc', content: ''},
                        {mc: '广播电视工程', routerLink: 'gbdsgc', content: ''},
                        {mc: '管道工程', routerLink: 'gdgc', content: ''},
                        {mc: '水利水电工程', routerLink: 'slsdgc', content: ''},
                        {mc: '矿产资源', routerLink: 'kczy', content: ''},
                        {mc: '文物古迹', routerLink: 'wwgj', content: ''},
                        {mc: '水文（气象）站', routerLink: 'swqxz', content: ''},
                        {mc: '其他专项', routerLink: 'qyzx', content: ''}
                    ]
                },
            ],
            'ghzb': [

                {
                    mc: '农村移民安置',
                    routerLink: 'ncymaz',
                    content: [
                        {mc: '搬迁安置人口', routerLink: 'bqazrk', content: ''},
                        {mc: '居民点基础设施', routerLink: 'jmdjcss', content: ''},
                        {mc: '生产安置人口', routerLink: 'scazrk', content: ''},
                        {mc: '分散安置土地资源筹措', routerLink: 'fsaztdzycc', content: ''},
                        {mc: '集中安置土地资源筹措', routerLink: 'jzaztdzycc', content: ''}
                    ]
                },
                {
                    mc: '城集镇迁建',
                    routerLink: 'cjzqj',
                    content: [
                        {mc: '城集镇淹没及迁建规模', routerLink: 'czymjqjgm', content: ''},
                        {mc: '搬迁安置人口', routerLink: 'baazrk', content: ''},
                        {mc: '城集镇迁建基础设施', routerLink: 'cjzqjjcss', content: ''},
                        {mc: '城集镇单位迁复建', routerLink: 'cjzdwqfj', content: ''},
                    ]
                },
                {
                    mc: '专业项目处理',
                    routerLink: 'zyxmcl',
                    content: [
                        {mc: '公路', routerLink: 'gl', content: ''},
                        {mc: '桥涵', routerLink: 'qh', content: ''},
                        {mc: '码头', routerLink: 'mt', content: ''},
                        {mc: '库周交通', routerLink: 'kzjt', content: ''},
                        {mc: '输变电工程', routerLink: 'sbdgc', content: ''},
                        {mc: '电信工程', routerLink: 'dxgc', content: ''},
                        {mc: '广播电视设施', routerLink: 'gbdsss', content: ''},
                        {mc: '水利水电工程', routerLink: 'slsdgc', content: ''},
                        {mc: '防护工程', routerLink: 'fhgc', content: ''},
                    ]
                },
                {
                    mc: '工业企业处理',
                    routerLink: 'gyqycl',
                    content: [

                        {mc: '工业企业处理', routerLink: 'gyqycl', content: ''},
                    ]
                },
                {
                    mc: '库底清理',
                    routerLink: 'kdql',
                    content: [
                        {mc: '库底清理', routerLink: 'kdql', content: ''},

                    ]
                },
            ],
            'tzgs': [

                {
                    mc: '投资概算',
                    routerLink: 'tzgs',
                    content: [
                        {mc: '投资概算', routerLink: 'tzgs', content: ''},

                    ]
                },
            ],
            'ssjd': [

                {
                    mc: '移民生活搬迁',
                    routerLink: 'ymshbq',
                    content: [
                        {mc: '移民生活搬迁', routerLink: 'ymshbq', content: ''},
                    ]
                },
                {
                    mc: '城集镇迁建',
                    routerLink: 'cjzqj',
                    content: [
                        {mc: '城集镇迁建', routerLink: 'cjzfj', content: ''},
                    ]
                },
                {
                    mc: '专业项目迁复建',
                    routerLink: 'zyxmqfj',
                    content: [
                        {mc: '公路', routerLink: 'gl', content: ''},
                        {mc: '桥涵', routerLink: 'qh', content: ''},
                        {mc: '码头', routerLink: 'mt', content: ''},
                        {mc: '库周交通', routerLink: 'kzjt', content: ''},
                        {mc: '输变电工程', routerLink: 'sbdgc', content: ''},
                        {mc: '电信工程', routerLink: 'dxgc', content: ''},
                        {mc: '广播电视设施', routerLink: 'gbdsss', content: ''},
                        {mc: '水利水电工程', routerLink: 'slsdgc', content: ''},
                        {mc: '防护工程', routerLink: 'fhgc', content: ''}
                    ]
                },
            ],
        }


        console.log(this.emgList);
        console.log(typeof (this.emgList));

        console.log(this.values);
        this.projectId = this.values[3];
        // if (this.values[0] === "emgList") {
        //     for (let i in this.emgList) {
        //         if (this.values[1] === i) {
        //             this.routLink = i;
        //             this.NavValue = this.emgList[i];
        //         }
        //     }
        // } else {
        //     for (let i in this.queryNav) {
        //         if (this.values[1] === i) {
        //             this.routLink = i;
        //             this.NavValue = this.queryNav[i];
        //         }
        //     }
        // }


        if (this.values[0] === 'emgList') {
            for (let i in this.emgList) {
                console.log(i);
                if (this.values[1] === i) {
                    this.routLink = i;
                    this.NavValue = this.emgList[i];
                }
            }
        } else {
            for (let i in this.queryNav) {
                if (this.values[1] === i) {
                    this.routLink = i;
                    this.NavValue = this.queryNav[i];
                }
            }
        }


        this.isAdd = true;
        setTimeout(() => {
            this.isAdd = false;
        }, 500);


    }

    getKeys(item) {
        return Object.keys(item);
    }

    close(): void {
        this.childEvent.emit(false);
    }

}

// this.emgList = {
//     'kxxyjbgjd': [
//         {
//             mc: '实物指标',
//             routerLink: 'swzb',
//             content: [
//                 {mc: '居民户', routerLink: 'jmh', id: 'E21ADA1A444F4C01B4D1997A61706980', content: ''},
//                 {mc: '集体经济组织', routerLink: 'jtjjzz', content: ''},
//                 {mc: '农副业', routerLink: 'nfy', content: ''},
//                 {mc: '个体工商', routerLink: 'gtgs', content: ''},
//                 {mc: '乡村企事单位', routerLink: 'xcqsdw', content: ''},
//                 {mc: '工业（矿）企业', routerLink: 'gykqy', content: ''},
//                 {mc: '铁路', routerLink: 'tl', content: ''},
//                 {mc: '公路', routerLink: 'gl', content: ''},
//                 {mc: '桥涵', routerLink: 'qh', content: ''},
//                 {mc: '航道', routerLink: 'hd', content: ''},
//                 {mc: '港口', routerLink: 'gk', content: ''},
//                 {mc: '码头', routerLink: 'mt', content: ''},
//                 {mc: '输变电工程', routerLink: 'sbdgc', content: ''},
//                 {mc: '电信工程', routerLink: 'dxgc', content: ''},
//                 {mc: '广播电视工程', routerLink: 'gbdsgc', content: ''},
//                 {mc: '管道工程', routerLink: 'gdgc', content: ''},
//                 {mc: '水利水电工程', routerLink: 'slsdgc', content: ''},
//                 {mc: '矿产资源', routerLink: 'kczy', content: ''},
//                 {mc: '文物古迹', routerLink: 'wwgj', content: ''},
//                 {mc: '水文（气象）站', routerLink: 'swz', content: ''},
//                 {mc: '其他专项', routerLink: 'qtzx', content: ''}
//             ]
//         },
//         {
//             mc: '规划指标',
//             routerLink: 'ghzb',
//             content: [
//                 {
//                     mc: '农村移民安置',
//                     routerLink: 'ncymaz',
//                     content: {
//                         road: '搬迁安置人口',
//                         qh: '居民点基础设施',
//                         scazrk: '生产安置人口',
//                         kzjt: '分散安置土地资源筹措',
//                         sbdgc: '集中安置土地资源筹措',
//                     }
//                 },
//                 {
//                     mc: '城集镇迁建', routerLink: 'ghzb2', content: {
//                     road: '城集镇淹没及迁建规模',
//                     qh: '搬迁安置人口',
//                     mt: '城集镇迁建基础设施',
//                     kzjt: '分散安置土地资源筹措',
//                     sbdgc: '集中安置土地资源筹措',
//                 }
//                 },
//                 {
//                     mc: '专业项目处理', routerLink: 'zyxmcl', content: {
//                     road: '公路',
//                     qh: '桥涵',
//                     mt: '码头',
//                     kzjt: '库周交通',
//                     sbdgc: '输变电工程',
//                     dxgc: '电信工程',
//                     gbdsss: '广播电视设施',
//                     slsdgc: '水利水电工程',
//                     fhgc: '防护工程'
//                 }
//                 },
//                 {mc: '工业企业处理', routerLink: 'gyqycl', content: ''},
//                 {mc: '乡村企事单位', routerLink: 'xcqsdw', content: ''}
//             ]
//         },
//         {
//             mc: '投资概算',
//             routerLink: 'tzgs',
//             content: [
//                 {mc: '投资概算', routerLink: 'tzgs', content: ''},
//             ]
//         }
//     ],
//
//     'cbsjjd': [
//
//         {
//             mc: '初步设计概况',
//             routerLink: 'cbsjgk',
//             content: [
//                 {
//                     mc: '初步设计概况', routerLink: 'cbsjgk', content: ''
//                 }
//             ]
//         },
//         {
//             mc: '实物指标',
//             routerLink: '',
//             content: [
//                 {mc: '居民户', routerLink: 'kxxyj', content: ''},
//                 {mc: '集体经济组织', routerLink: 'kxxyj1', content: ''},
//                 {mc: '农副业', routerLink: 'kxxyj', content: ''},
//                 {mc: '个体工商', routerLink: 'kxxyj', content: ''},
//                 {mc: '乡村企事单位', routerLink: 'kxxyj', content: ''},
//                 {mc: '工业（矿）企业', routerLink: 'kxxyj', content: ''},
//                 {mc: '铁路', routerLink: 'kxxyj', content: ''},
//                 {mc: '公路', routerLink: 'kxxyj', content: ''},
//                 {mc: '桥涵', routerLink: 'kxxyj', content: ''},
//                 {mc: '航道', routerLink: 'kxxyj', content: ''},
//                 {mc: '港口', routerLink: 'kxxyj', content: ''},
//                 {mc: '码头', routerLink: 'kxxyj', content: ''},
//                 {mc: '输变电工程', routerLink: 'kxxyj', content: ''},
//                 {mc: '电信工程', routerLink: 'kxxyj', content: ''},
//                 {mc: '广播电视工程', routerLink: 'kxxyj', content: ''},
//                 {mc: '管道工程', routerLink: 'kxxyj', content: ''},
//                 {mc: '水利水电工程', routerLink: 'kxxyj', content: ''},
//                 {mc: '矿产资源', routerLink: 'kxxyj', content: ''},
//                 {mc: '矿产资源', routerLink: 'kxxyj', content: ''},
//                 {mc: '文物古迹', routerLink: 'kxxyj', content: ''},
//                 {mc: '水文（气象）站', routerLink: 'kxxyj', content: ''},
//                 {mc: '其他专项', routerLink: 'kxxyj', content: ''}
//             ]
//         },
//     ],
//     'ssazjd': [
//
//         {
//             mc: '实施安置阶段',
//             routerLink: 'swzb',
//             content: [
//                 {mc: '居民户', routerLink: 'kxxyj', content: ''},
//                 {mc: '集体经济组织', routerLink: 'kxxyj1', content: ''},
//                 {mc: '农副业', routerLink: 'kxxyj', content: ''},
//                 {mc: '个体工商', routerLink: 'kxxyj', content: ''},
//                 {mc: '乡村企事单位', routerLink: 'kxxyj', content: ''},
//                 {mc: '工业（矿）企业', routerLink: 'kxxyj', content: ''},
//                 {mc: '铁路', routerLink: 'kxxyj', content: ''},
//                 {mc: '公路', routerLink: 'kxxyj', content: ''},
//                 {mc: '桥涵', routerLink: 'kxxyj', content: ''},
//                 {mc: '航道', routerLink: 'kxxyj', content: ''},
//                 {mc: '港口', routerLink: 'kxxyj', content: ''},
//                 {mc: '码头', routerLink: 'kxxyj', content: ''},
//                 {mc: '输变电工程', routerLink: 'kxxyj', content: ''},
//                 {mc: '电信工程', routerLink: 'kxxyj', content: ''},
//                 {mc: '广播电视工程', routerLink: 'kxxyj', content: ''},
//                 {mc: '管道工程', routerLink: 'kxxyj', content: ''},
//                 {mc: '水利水电工程', routerLink: 'kxxyj', content: ''},
//                 {mc: '矿产资源', routerLink: 'kxxyj', content: ''},
//                 {mc: '矿产资源', routerLink: 'kxxyj', content: ''},
//                 {mc: '文物古迹', routerLink: 'kxxyj', content: ''},
//                 {mc: '水文（气象）站', routerLink: 'kxxyj', content: ''},
//                 {mc: '其他专项', routerLink: 'kxxyj', content: ''}
//             ]
//         },
//         {
//             mc: '年度计划',
//             routerLink: 'ndjh',
//             content: [
//                 {mc: '年度计划', routerLink: 'ndjh', content: ''}
//             ]
//         },
//         {
//             mc: '实施进度',
//             routerLink: 'ssjd',
//             content: [
//                 {mc: '项目登记', routerLink: 'xmdj', content: ''},
//                 {mc: '进度填报', routerLink: 'jdtb', content: ''},
//                 {mc: '进度审核', routerLink: 'jdsh', content: ''}
//
//             ]
//         },
//         {
//             mc: '监督评估资料',
//             routerLink: 'jdpgzlk',
//             content: [
//                 {mc: '综合监理资料', routerLink: 'zhjlzl', content: ''},
//                 {mc: '独立评估资料', routerLink: 'dlpgzl', content: ''},
//
//             ]
//         },
//         {
//             mc: '库底清理实施情况',
//             routerLink: 'kdqlss',
//             content: [
//                 {mc: '库底清理实施情况', routerLink: 'kcqlss', content: ''},
//             ]
//         },
//     ],
//     'ghtzjd':
//         [
//             {
//                 mc: '实物指标',
//                 routerLink: 'swzb',
//                 content: [
//                     {mc: '居民户', routerLink: 'kxxyj', content: ''},
//                     {mc: '集体经济组织', routerLink: 'kxxyj1', content: ''},
//                     {mc: '农副业', routerLink: 'kxxyj', content: ''},
//                     {mc: '个体工商', routerLink: 'kxxyj', content: ''},
//                     {mc: '乡村企事单位', routerLink: 'kxxyj', content: ''},
//                     {mc: '工业（矿）企业', routerLink: 'kxxyj', content: ''},
//                     {mc: '铁路', routerLink: 'kxxyj', content: ''},
//                     {mc: '公路', routerLink: 'kxxyj', content: ''},
//                     {mc: '桥涵', routerLink: 'kxxyj', content: ''},
//                     {mc: '航道', routerLink: 'kxxyj', content: ''},
//                     {mc: '港口', routerLink: 'kxxyj', content: ''},
//                     {mc: '码头', routerLink: 'kxxyj', content: ''},
//                     {mc: '输变电工程', routerLink: 'kxxyj', content: ''},
//                     {mc: '电信工程', routerLink: 'kxxyj', content: ''},
//                     {mc: '广播电视工程', routerLink: 'kxxyj', content: ''},
//                     {mc: '管道工程', routerLink: 'kxxyj', content: ''},
//                     {mc: '水利水电工程', routerLink: 'kxxyj', content: ''},
//                     {mc: '矿产资源', routerLink: 'kxxyj', content: ''},
//                     {mc: '矿产资源', routerLink: 'kxxyj', content: ''},
//                     {mc: '文物古迹', routerLink: 'kxxyj', content: ''},
//                     {mc: '水文（气象）站', routerLink: 'kxxyj', content: ''},
//                     {mc: '其他专项', routerLink: 'kxxyj', content: ''}
//                 ]
//             },
//             {
//                 mc: '规划指标',
//                 routerLink: 'ghzb',
//                 content: [
//                     {mc: '农村移民安置', routerLink: 'ncymaz', content: ''},
//                     {mc: '城集镇迁建', routerLink: 'ghzb2', content: ''},
//                     {mc: '专业项目处理', routerLink: 'zyxmcl', content: ''},
//                     {mc: '工业企业处理', routerLink: 'ghzb4', content: ''},
//                     {mc: '乡村企事单位', routerLink: 'ghzb5', content: ''}
//                 ]
//             },
//             {
//                 mc: '投资概算',
//                 routerLink: 'tzgs',
//                 content: [
//                     {mc: '投资概算', routerLink: 'tzgs', content: ''},
//                 ]
//             },
//         ],
//     'ymanysjd':
//         [
//
//             {
//                 mc: '验收情况',
//                 routerLink: 'ysqk',
//                 content: [
//                     {mc: '验收情况', routerLink: 'ysqk', content: ''},
//                 ]
//             },
//
//         ],
// }
// this.queryNav = {
//     'swzb': [
//         {
//             mc: '农村部分',
//             routerLink: 'ncbf',
//             content: [
//                 {mc: '人口', routerLink: 'person', content: ''},
//                 {mc: '房屋', routerLink: 'home', content: ''},
//                 {mc: '土地', routerLink: 'load', content: ''},
//                 {mc: '附属设施', routerLink: 'fsss', content: ''},
//                 {mc: '装修', routerLink: 'zx', content: ''},
//                 {mc: '零星树木', routerLink: 'lxsm', content: ''},
//                 {mc: '土地附着物', routerLink: 'tdfzw', content: ''},
//                 {mc: '坟墓', routerLink: 'fm', content: ''},
//                 {mc: '农村小型专项', routerLink: 'ncxxzx', content: ''},
//                 {mc: '文教卫及宗教', routerLink: 'wjwjzj', content: ''},
//                 {mc: '农副业', routerLink: 'nfy', content: ''},
//                 {mc: '个体工商', routerLink: 'gtgs', content: ''},
//                 {mc: '乡村企事业单位', routerLink: 'xcqsydw', content: ''}
//             ]
//         },
//
//
//         {
//             mc: '城集镇部分',
//             routerLink: 'czbf',
//             content: [
//                 {mc: '人口', routerLink: 'ncymaz', content: ''},
//                 {mc: '房屋', routerLink: 'ghzb2', content: ''},
//                 {mc: '附属设施', routerLink: 'zyxmcl', content: ''},
//                 {mc: '装修', routerLink: 'ghzb4', content: ''},
//                 {mc: '零星树木', routerLink: 'ghzb5', content: ''},
//                 {mc: '土地附着物', routerLink: 'tdfzw', content: ''},
//                 {mc: '农副业', routerLink: 'nfy', content: ''},
//                 {mc: '个体工商', routerLink: 'gtgs', content: ''},
//                 {mc: '乡村企事业单位', routerLink: 'xcqsydw', content: ''}
//
//             ]
//         },
//         {
//             mc: '工业企业',
//             routerLink: 'gyqy',
//             content: [
//                 {mc: '工业企业', routerLink: 'gyxm', content: ''},
//             ]
//         },
//         {
//             mc: '专业项目',
//             routerLink: 'zyxm',
//             content: [
//                 {mc: '铁路', routerLink: 'tl', content: ''},
//                 {mc: '公路', routerLink: 'gl', content: ''},
//                 {mc: '桥涵', routerLink: 'qh', content: ''},
//                 {mc: '航道', routerLink: 'hd', content: ''},
//                 {mc: '港口', routerLink: 'gk', content: ''},
//                 {mc: '码头', routerLink: 'mt', content: ''},
//                 {mc: '输变电工程', routerLink: 'bsdgc', content: ''},
//                 {mc: '电信工程', routerLink: 'dxgc', content: ''},
//                 {mc: '广播电视工程', routerLink: 'gbdsgc', content: ''},
//                 {mc: '管道工程', routerLink: 'gdgc', content: ''},
//                 {mc: '水利水电工程', routerLink: 'slsdgc', content: ''},
//                 {mc: '矿产资源', routerLink: 'kczy', content: ''},
//                 {mc: '文物古迹', routerLink: 'wwgj', content: ''},
//                 {mc: '水文（气象）站', routerLink: 'swqxz', content: ''},
//                 {mc: '其他专项', routerLink: 'qyzx', content: ''}
//             ]
//         },
//     ],
//     'ghzb': [
//
//         {
//             mc: '农村移民安置',
//             routerLink: 'ncymaz',
//             content: [
//                 {mc: '搬迁安置人口', routerLink: 'bqazrk', content: ''},
//                 {mc: '居民点基础设施', routerLink: 'jmdjcss', content: ''},
//                 {mc: '生产安置人口', routerLink: 'scazrk', content: ''},
//                 {mc: '分散安置土地资源筹措', routerLink: 'fsaztdzycc', content: ''},
//                 {mc: '集中安置土地资源筹措', routerLink: 'jzaztdzycc', content: ''}
//             ]
//         },
//         {
//             mc: '城集镇迁建',
//             routerLink: 'cjzqj',
//             content: [
//                 {mc: '城集镇淹没及迁建规模', routerLink: 'czymjqjgm', content: ''},
//                 {mc: '搬迁安置人口', routerLink: 'baazrk', content: ''},
//                 {mc: '城集镇迁建基础设施', routerLink: 'cjzqjjcss', content: ''},
//                 {mc: '城集镇单位迁复建', routerLink: 'cjzdwqfj', content: ''},
//             ]
//         },
//         {
//             mc: '专业项目处理',
//             routerLink: 'zyxmcl',
//             content: [
//                 {mc: '公路', routerLink: 'gl', content: ''},
//                 {mc: '桥涵', routerLink: 'qh', content: ''},
//                 {mc: '码头', routerLink: 'mt', content: ''},
//                 {mc: '库周交通', routerLink: 'kzjt', content: ''},
//                 {mc: '输变电工程', routerLink: 'sbdgc', content: ''},
//                 {mc: '电信工程', routerLink: 'dxgc', content: ''},
//                 {mc: '广播电视设施', routerLink: 'gbdsss', content: ''},
//                 {mc: '水利水电工程', routerLink: 'slsdgc', content: ''},
//                 {mc: '防护工程', routerLink: 'fhgc', content: ''},
//             ]
//         },
//         {
//             mc: '工业企业处理',
//             routerLink: 'gyqycl',
//             content: [
//
//                 {mc: '工业企业处理', routerLink: 'gyqycl', content: ''},
//             ]
//         },
//         {
//             mc: '库底清理',
//             routerLink: 'kdql',
//             content: [
//                 {mc: '库底清理', routerLink: 'kdql', content: ''},
//
//             ]
//         },
//     ],
//     'tzgs': [
//
//         {
//             mc: '投资概算',
//             routerLink: 'tzgs',
//             content: [
//                 {mc: '投资概算', routerLink: 'tzgs', content: ''},
//
//             ]
//         },
//     ],
//     'ssjd': [
//
//         {
//             mc: '移民生活搬迁',
//             routerLink: 'ymshbq',
//             content: [
//                 {mc: '移民生活搬迁', routerLink: 'ymshbq', content: ''},
//             ]
//         },
//         {
//             mc: '城集镇迁建',
//             routerLink: 'cjzqj',
//             content: [
//                 {mc: '城集镇迁建', routerLink: 'cjzfj', content: ''},
//             ]
//         },
//         {
//             mc: '专业项目迁复建',
//             routerLink: 'zyxmqfj',
//             content: [
//                 {mc: '公路', routerLink: 'gl', content: ''},
//                 {mc: '桥涵', routerLink: 'qh', content: ''},
//                 {mc: '码头', routerLink: 'mt', content: ''},
//                 {mc: '库周交通', routerLink: 'kzjt', content: ''},
//                 {mc: '输变电工程', routerLink: 'sbdgc', content: ''},
//                 {mc: '电信工程', routerLink: 'dxgc', content: ''},
//                 {mc: '广播电视设施', routerLink: 'gbdsss', content: ''},
//                 {mc: '水利水电工程', routerLink: 'slsdgc', content: ''},
//                 {mc: '防护工程', routerLink: 'fhgc', content: ''}
//             ]
//         },
//     ],
// }

