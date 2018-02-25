import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-second-nav',
    templateUrl: './SecondNav.component.html',
    styleUrls: ['./SecondNav.component.css']
})
export class SecondNavComponent implements OnInit {
    private NavValue: any;
    isAdd: boolean;
    public routLink: string;
    private projectId: string;
    @Input() values;
    @Output() childEvent = new EventEmitter<any>();

    constructor() {

    }

    ngOnInit() {
        this.projectId = this.values[2];
        if (this.values[0] == "emgList") {
            for (let i in emgList) {
                if (this.values[1] == i) {
                    this.routLink = i;
                    this.NavValue = emgList[i];
                }
            }
        } else {
            for (let i in queryNav) {
                if (this.values[1] == i) {
                    this.routLink = i;
                    this.NavValue = queryNav[i];
                }
            }
        }

    }

    ngOnChanges() {
        if (this.values[0] == 'emgList') {
            for (let i in emgList) {
                if (this.values[1] == i) {
                    this.routLink = i;
                    this.NavValue = emgList[i];
                }
            }
        } else {
            for (let i in queryNav) {
                if (this.values[1] == i) {
                    this.routLink = i;
                    this.NavValue = queryNav[i];
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

const emgList = {
    'kxxyjbgjd': [
        {
            name: '实物指标',
            routerLink: 'swzb',
            content: [
                {name: '居民户', routerLink: 'jmh', id: 'E21ADA1A444F4C01B4D1997A61706980', content: ''},
                {name: '集体经济组织', routerLink: 'jtjjzz', content: ''},
                {name: '农副业', routerLink: 'nfy', content: ''},
                {name: '个体工商', routerLink: 'gtgs', content: ''},
                {name: '乡村企事单位', routerLink: 'xcqsdw', content: ''},
                {name: '工业（矿）企业', routerLink: 'gykqy', content: ''},
                {name: '铁路', routerLink: 'tl', content: ''},
                {name: '公路', routerLink: 'gl', content: ''},
                {name: '桥涵', routerLink: 'qh', content: ''},
                {name: '航道', routerLink: 'hd', content: ''},
                {name: '港口', routerLink: 'gk', content: ''},
                {name: '码头', routerLink: 'mt', content: ''},
                {name: '输变电工程', routerLink: 'sbdgc', content: ''},
                {name: '电信工程', routerLink: 'dxgc', content: ''},
                {name: '广播电视工程', routerLink: 'gbdsgc', content: ''},
                {name: '管道工程', routerLink: 'gdgc', content: ''},
                {name: '水利水电工程', routerLink: 'slsdgc', content: ''},
                {name: '矿产资源', routerLink: 'kczy', content: ''},
                {name: '文物古迹', routerLink: 'wwgj', content: ''},
                {name: '水文（气象）站', routerLink: 'swz', content: ''},
                {name: '其他专项', routerLink: 'qtzx', content: ''}
            ]
        },
        {
            name: '规划指标',
            routerLink: 'ghzb',
            content: [
                {
                    name: '农村移民安置',
                    routerLink: 'ncymaz',
                    content: {
                        road: '搬迁安置人口',
                        qh: '居民点基础设施',
                        scazrk: '生产安置人口',
                        kzjt: '分散安置土地资源筹措',
                        sbdgc: '集中安置土地资源筹措',
                    }
                },
                {
                    name: '城集镇迁建', routerLink: 'ghzb2', content: {
                    road: '城集镇淹没及迁建规模',
                    qh: '搬迁安置人口',
                    mt: '城集镇迁建基础设施',
                    kzjt: '分散安置土地资源筹措',
                    sbdgc: '集中安置土地资源筹措',
                }
                },
                {
                    name: '专业项目处理', routerLink: 'zyxmcl', content: {
                    road: '公路',
                    qh: '桥涵',
                    mt: '码头',
                    kzjt: '库周交通',
                    sbdgc: '输变电工程',
                    dxgc: '电信工程',
                    gbdsss: '广播电视设施',
                    slsdgc: '水利水电工程',
                    fhgc: '防护工程'
                }
                },
                {name: '工业企业处理', routerLink: 'gyqycl', content: ''},
                {name: '乡村企事单位', routerLink: 'xcqsdw', content: ''}
            ]
        },
        {
            name: '投资概算',
            routerLink: 'tzgs',
            content: [
                {name: '投资概算', routerLink: 'tzgs', content: ''},
            ]
        }
    ],

    'cbsjjd': [

        {
            name: '初步设计概况',
            routerLink: 'cbsjgk',
            content: [
                {
                    name: '初步设计概况', routerLink: 'cbsjgk', content: ''
                }
            ]
        },
        {
            name: '实物指标',
            routerLink: '',
            content: [
                {name: '居民户', routerLink: 'kxxyj', content: ''},
                {name: '集体经济组织', routerLink: 'kxxyj1', content: ''},
                {name: '农副业', routerLink: 'kxxyj', content: ''},
                {name: '个体工商', routerLink: 'kxxyj', content: ''},
                {name: '乡村企事单位', routerLink: 'kxxyj', content: ''},
                {name: '工业（矿）企业', routerLink: 'kxxyj', content: ''},
                {name: '铁路', routerLink: 'kxxyj', content: ''},
                {name: '公路', routerLink: 'kxxyj', content: ''},
                {name: '桥涵', routerLink: 'kxxyj', content: ''},
                {name: '航道', routerLink: 'kxxyj', content: ''},
                {name: '港口', routerLink: 'kxxyj', content: ''},
                {name: '码头', routerLink: 'kxxyj', content: ''},
                {name: '输变电工程', routerLink: 'kxxyj', content: ''},
                {name: '电信工程', routerLink: 'kxxyj', content: ''},
                {name: '广播电视工程', routerLink: 'kxxyj', content: ''},
                {name: '管道工程', routerLink: 'kxxyj', content: ''},
                {name: '水利水电工程', routerLink: 'kxxyj', content: ''},
                {name: '矿产资源', routerLink: 'kxxyj', content: ''},
                {name: '矿产资源', routerLink: 'kxxyj', content: ''},
                {name: '文物古迹', routerLink: 'kxxyj', content: ''},
                {name: '水文（气象）站', routerLink: 'kxxyj', content: ''},
                {name: '其他专项', routerLink: 'kxxyj', content: ''}
            ]
        },
    ],
    'ssazjd': [

        {
            name: '实施安置阶段',
            routerLink: 'swzb',
            content: [
                {name: '居民户', routerLink: 'kxxyj', content: ''},
                {name: '集体经济组织', routerLink: 'kxxyj1', content: ''},
                {name: '农副业', routerLink: 'kxxyj', content: ''},
                {name: '个体工商', routerLink: 'kxxyj', content: ''},
                {name: '乡村企事单位', routerLink: 'kxxyj', content: ''},
                {name: '工业（矿）企业', routerLink: 'kxxyj', content: ''},
                {name: '铁路', routerLink: 'kxxyj', content: ''},
                {name: '公路', routerLink: 'kxxyj', content: ''},
                {name: '桥涵', routerLink: 'kxxyj', content: ''},
                {name: '航道', routerLink: 'kxxyj', content: ''},
                {name: '港口', routerLink: 'kxxyj', content: ''},
                {name: '码头', routerLink: 'kxxyj', content: ''},
                {name: '输变电工程', routerLink: 'kxxyj', content: ''},
                {name: '电信工程', routerLink: 'kxxyj', content: ''},
                {name: '广播电视工程', routerLink: 'kxxyj', content: ''},
                {name: '管道工程', routerLink: 'kxxyj', content: ''},
                {name: '水利水电工程', routerLink: 'kxxyj', content: ''},
                {name: '矿产资源', routerLink: 'kxxyj', content: ''},
                {name: '矿产资源', routerLink: 'kxxyj', content: ''},
                {name: '文物古迹', routerLink: 'kxxyj', content: ''},
                {name: '水文（气象）站', routerLink: 'kxxyj', content: ''},
                {name: '其他专项', routerLink: 'kxxyj', content: ''}
            ]
        },
        {
            name: '年度计划',
            routerLink: 'ndjh',
            content: [
                {name: '年度计划', routerLink: 'ndjh', content: ''}
            ]
        },
        {
            name: '实施进度',
            routerLink: 'ssjd',
            content: [
                {name: '项目登记', routerLink: 'xmdj', content: ''},
                {name: '进度填报', routerLink: 'jdtb', content: ''},
                {name: '进度审核', routerLink: 'jdsh', content: ''}

            ]
        },
        {
            name: '监督评估资料',
            routerLink: 'jdpgzlk',
            content: [
                {name: '综合监理资料', routerLink: 'zhjlzl', content: ''},
                {name: '独立评估资料', routerLink: 'dlpgzl', content: ''},

            ]
        },
        {
            name: '库底清理实施情况',
            routerLink: 'kdqlss',
            content: [
                {name: '库底清理实施情况', routerLink: 'kcqlss', content: ''},
            ]
        },
    ],
    'ghtzjd':
        [
            {
                name: '实物指标',
                routerLink: 'swzb',
                content: [
                    {name: '居民户', routerLink: 'kxxyj', content: ''},
                    {name: '集体经济组织', routerLink: 'kxxyj1', content: ''},
                    {name: '农副业', routerLink: 'kxxyj', content: ''},
                    {name: '个体工商', routerLink: 'kxxyj', content: ''},
                    {name: '乡村企事单位', routerLink: 'kxxyj', content: ''},
                    {name: '工业（矿）企业', routerLink: 'kxxyj', content: ''},
                    {name: '铁路', routerLink: 'kxxyj', content: ''},
                    {name: '公路', routerLink: 'kxxyj', content: ''},
                    {name: '桥涵', routerLink: 'kxxyj', content: ''},
                    {name: '航道', routerLink: 'kxxyj', content: ''},
                    {name: '港口', routerLink: 'kxxyj', content: ''},
                    {name: '码头', routerLink: 'kxxyj', content: ''},
                    {name: '输变电工程', routerLink: 'kxxyj', content: ''},
                    {name: '电信工程', routerLink: 'kxxyj', content: ''},
                    {name: '广播电视工程', routerLink: 'kxxyj', content: ''},
                    {name: '管道工程', routerLink: 'kxxyj', content: ''},
                    {name: '水利水电工程', routerLink: 'kxxyj', content: ''},
                    {name: '矿产资源', routerLink: 'kxxyj', content: ''},
                    {name: '矿产资源', routerLink: 'kxxyj', content: ''},
                    {name: '文物古迹', routerLink: 'kxxyj', content: ''},
                    {name: '水文（气象）站', routerLink: 'kxxyj', content: ''},
                    {name: '其他专项', routerLink: 'kxxyj', content: ''}
                ]
            },
            {
                name: '规划指标',
                routerLink: 'ghzb',
                content: [
                    {name: '农村移民安置', routerLink: 'ncymaz', content: ''},
                    {name: '城集镇迁建', routerLink: 'ghzb2', content: ''},
                    {name: '专业项目处理', routerLink: 'zyxmcl', content: ''},
                    {name: '工业企业处理', routerLink: 'ghzb4', content: ''},
                    {name: '乡村企事单位', routerLink: 'ghzb5', content: ''}
                ]
            },
            {
                name: '投资概算',
                routerLink: 'tzgs',
                content: [
                    {name: '投资概算', routerLink: 'tzgs', content: ''},
                ]
            },
        ],
    'ymanysjd':
        [

            {
                name: '验收情况',
                routerLink: 'ysqk',
                content: [
                    {name: '验收情况', routerLink: 'ysqk', content: ''},
                ]
            },

        ],
}
const queryNav = {
    'swzb': [
        {
            name: '农村部分',
            routerLink: 'ncbf',
            content: [
                {name: '人口', routerLink: 'person', content: ''},
                {name: '房屋', routerLink: 'home', content: ''},
                {name: '土地', routerLink: 'load', content: ''},
                {name: '附属设施', routerLink: 'fsss', content: ''},
                {name: '装修', routerLink: 'zx', content: ''},
                {name: '零星树木', routerLink: 'lxsm', content: ''},
                {name: '土地附着物', routerLink: 'tdfzw', content: ''},
                {name: '坟墓', routerLink: 'fm', content: ''},
                {name: '农村小型专项', routerLink: 'ncxxzx', content: ''},
                {name: '文教卫及宗教', routerLink: 'wjwjzj', content: ''},
                {name: '农副业', routerLink: 'nfy', content: ''},
                {name: '个体工商', routerLink: 'gtgs', content: ''},
                {name: '乡村企事业单位', routerLink: 'xcqsydw', content: ''}
            ]
        },


        {
            name: '城集镇部分',
            routerLink: 'czbf',
            content: [
                {name: '人口', routerLink: 'ncymaz', content: ''},
                {name: '房屋', routerLink: 'ghzb2', content: ''},
                {name: '附属设施', routerLink: 'zyxmcl', content: ''},
                {name: '装修', routerLink: 'ghzb4', content: ''},
                {name: '零星树木', routerLink: 'ghzb5', content: ''},
                {name: '土地附着物', routerLink: 'tdfzw', content: ''},
                {name: '农副业', routerLink: 'nfy', content: ''},
                {name: '个体工商', routerLink: 'gtgs', content: ''},
                {name: '乡村企事业单位', routerLink: 'xcqsydw', content: ''}

            ]
        },
        {
            name: '工业企业',
            routerLink: 'gyqy',
            content: [
                {name: '工业企业', routerLink: 'gyxm', content: ''},
            ]
        },
        {
            name: '专业项目',
            routerLink: 'zyxm',
            content: [
                {name: '铁路', routerLink: 'tl', content: ''},
                {name: '公路', routerLink: 'gl', content: ''},
                {name: '桥涵', routerLink: 'qh', content: ''},
                {name: '航道', routerLink: 'hd', content: ''},
                {name: '港口', routerLink: 'gk', content: ''},
                {name: '码头', routerLink: 'mt', content: ''},
                {name: '输变电工程', routerLink: 'bsdgc', content: ''},
                {name: '电信工程', routerLink: 'dxgc', content: ''},
                {name: '广播电视工程', routerLink: 'gbdsgc', content: ''},
                {name: '管道工程', routerLink: 'gdgc', content: ''},
                {name: '水利水电工程', routerLink: 'slsdgc', content: ''},
                {name: '矿产资源', routerLink: 'kczy', content: ''},
                {name: '文物古迹', routerLink: 'wwgj', content: ''},
                {name: '水文（气象）站', routerLink: 'swqxz', content: ''},
                {name: '其他专项', routerLink: 'qyzx', content: ''}
            ]
        },
    ],
    'ghzb': [

        {
            name: '农村移民安置',
            routerLink: 'ncymaz',
            content: [
                {name: '搬迁安置人口', routerLink: 'bqazrk', content: ''},
                {name: '居民点基础设施', routerLink: 'jmdjcss', content: ''},
                {name: '生产安置人口', routerLink: 'scazrk', content: ''},
                {name: '分散安置土地资源筹措', routerLink: 'fsaztdzycc', content: ''},
                {name: '集中安置土地资源筹措', routerLink: 'jzaztdzycc', content: ''}
            ]
        },
        {
            name: '城集镇迁建',
            routerLink: 'cjzqj',
            content: [
                {name: '城集镇淹没及迁建规模', routerLink: 'czymjqjgm', content: ''},
                {name: '搬迁安置人口', routerLink: 'baazrk', content: ''},
                {name: '城集镇迁建基础设施', routerLink: 'cjzqjjcss', content: ''},
                {name: '城集镇单位迁复建', routerLink: 'cjzdwqfj', content: ''},
            ]
        },
        {
            name: '专业项目处理',
            routerLink: 'zyxmcl',
            content: [
                {name: '公路', routerLink: 'gl', content: ''},
                {name: '桥涵', routerLink: 'qh', content: ''},
                {name: '码头', routerLink: 'mt', content: ''},
                {name: '库周交通', routerLink: 'kzjt', content: ''},
                {name: '输变电工程', routerLink: 'sbdgc', content: ''},
                {name: '电信工程', routerLink: 'dxgc', content: ''},
                {name: '广播电视设施', routerLink: 'gbdsss', content: ''},
                {name: '水利水电工程', routerLink: 'slsdgc', content: ''},
                {name: '防护工程', routerLink: 'fhgc', content: ''},
            ]
        },
        {
            name: '工业企业处理',
            routerLink: 'gyqycl',
            content: [

                {name: '工业企业处理', routerLink: 'gyqycl', content: ''},
            ]
        },
        {
            name: '库底清理',
            routerLink: 'kdql',
            content: [
                {name: '库底清理', routerLink: 'kdql', content: ''},

            ]
        },
    ],
    'tzgs': [

        {
            name: '投资概算',
            routerLink: 'tzgs',
            content: [
                {name: '投资概算', routerLink: 'tzgs', content: ''},

            ]
        },
    ],
    'ssjd': [

        {
            name: '移民生活搬迁',
            routerLink: 'ymshbq',
            content: [
                {name: '移民生活搬迁', routerLink: 'ymshbq', content: ''},
            ]
        },
        {
            name: '城集镇迁建',
            routerLink: 'cjzqj',
            content: [
                {name: '城集镇迁建', routerLink: 'cjzfj', content: ''},
            ]
        },
        {
            name: '专业项目迁复建',
            routerLink: 'zyxmqfj',
            content: [
                {name: '公路', routerLink: 'gl', content: ''},
                {name: '桥涵', routerLink: 'qh', content: ''},
                {name: '码头', routerLink: 'mt', content: ''},
                {name: '库周交通', routerLink: 'kzjt', content: ''},
                {name: '输变电工程', routerLink: 'sbdgc', content: ''},
                {name: '电信工程', routerLink: 'dxgc', content: ''},
                {name: '广播电视设施', routerLink: 'gbdsss', content: ''},
                {name: '水利水电工程', routerLink: 'slsdgc', content: ''},
                {name: '防护工程', routerLink: 'fhgc', content: ''}
            ]
        },
    ],
}


