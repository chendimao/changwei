import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {flyIn} from '../../animations/fly-in';
import {MenuItem} from '../../../assets/_primeng@4.2.1@primeng/components/common/menuitem';
import {SelectItem} from '../../../assets/_primeng@4.2.1@primeng/components/common/selectitem';

@Component({
    selector: 'app-eng-base',
    templateUrl: './eng-base.component.html',
    styleUrls: ['./eng-base.component.css'],

    animations: [flyIn]
})
export class EngBaseComponent implements OnInit {
    private projectId: string;
    private TreeTable = new Array;
    private TreeTable2 = new Array;
    private showClass: number = 1;
    private showMode: number = 1;
    private selectList: any;
    types2: SelectItem[];
    private breadcrumb: MenuItem[];
    private isShow1: boolean = true;

    constructor(private route: ActivatedRoute) {

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
        this.selectList = [
            {label: '可行性研究阶段', name: '可行性研究阶段', value: '0'},
            {label: '初步设计阶段', name: '初步设计阶段', value: '1'},
            {label: '安置实施阶段', name: '安置实施阶段', value: '2'},
        ];
        console.log(this.route.snapshot.url.length);
        this.TreeTable = [
            {
                'data': {
                    'name': '水库水位',
                    'code': '',
                    'jldw': '',
                    'xh': '',
                    'bz': ''
                },
                'children': [
                    {
                        'data': {
                            'name': '校核洪水位',
                            'code': '',
                            'jldw': '',
                            'xh': '',
                            'bz': ''
                        },

                    },
                    {
                        'data': {
                            'name': '设计洪水位',
                            'code': '',
                            'jldw': '',
                            'xh': '',
                            'bz': ''
                        },

                    },
                    {
                        'data': {
                            'name': '正常蓄水位',
                            'code': '',
                            'jldw': '',
                            'xh': '',
                            'bz': ''
                        },

                    },
                    {
                        'data': {
                            'name': ' 防洪高水位',
                            'code': '',
                            'jldw': '',
                            'xh': '',
                            'bz': ''
                        },

                    },
                    {
                        'data': {
                            'name': ' 汛期限制水位',
                            'code': '',
                            'jldw': '',
                            'xh': '',
                            'bz': ''
                        },

                    },
                    {
                        'data': {
                            'name': ' 死水位',
                            'code': '',
                            'jldw': '',
                            'xh': '',
                            'bz': ''
                        },

                    },

                ]
            },
            {
                'data': {
                    'name': '杂房',
                    'code': '',
                    'jldw': '',
                    'xh': '',
                    'bz': ''
                },
                'children': [
                    {
                        'data': {
                            'name': '水库库容',
                            'code': '',
                            'jldw': '',
                            'xh': '',
                            'bz': ''
                        },
                        'children': [
                            {
                                'data': {
                                    'name': '总库容（校核水位以下库容）',
                                    'code': '',
                                    'jldw': '',
                                    'xh': '',
                                    'bz': ''
                                }
                            },
                            {
                                'data': {
                                    'name': ' 正常蓄水位以下库容',
                                    'code': '',
                                    'jldw': '',
                                    'xh': '',
                                    'bz': ''
                                }
                            },
                            {
                                'data': {
                                    'name': ' 防洪库容（防洪高水位至汛期限制水位）',
                                    'code': '',
                                    'jldw': '',
                                    'xh': '',
                                    'bz': ''
                                }
                            },
                            {
                                'data': {
                                    'name': ' 兴利库容（正常蓄水位至死水位）',
                                    'code': '',
                                    'jldw': '',
                                    'xh': '',
                                    'bz': ''
                                }
                            },
                            {
                                'data': {
                                    'name': '  死库容',
                                    'code': '',
                                    'jldw': '',
                                    'xh': '',
                                    'bz': ''
                                }
                            }
                        ]
                    },
                ]
            },
            {
                'data': {
                    'name': '工程效益',
                    'code': '',
                    'bz': ''
                },
                'children': [
                    {
                        'data': {
                            'name': '装机容量',
                            'size': '',
                            'type': ''
                        }
                    },
                    {
                        'data': {
                            'name': '保证出力',
                            'size': '',
                            'type': ''
                        }
                    },
                    {
                        'data': {
                            'name': '多年平均发电量',
                            'size': '',
                            'type': ''
                        }
                    }
                ]
            },
            {
                'data': {
                    'name': '主要建筑物',
                    'code': '',
                    'bz': ''
                },
                'children': [
                    {
                        'data': {
                            'name': '型式',
                            'size': '',
                            'type': ''
                        }
                    },
                    {
                        'data': {
                            'name': '坝顶高程',
                            'size': '',
                            'type': ''
                        }
                    },
                    {
                        'data': {
                            'name': '最大坝高',
                            'size': '',
                            'type': ''
                        }
                    }
                ]
            },
            {
                'data': {
                    'name': '经济指标',
                    'code': '',
                    'bz': ''
                },
                'children': [
                    {
                        'data': {
                            'name': '静态总投资',
                            'size': '',
                            'type': ''
                        }
                    },
                    {
                        'data': {
                            'name': '总投资',
                            'size': '',
                            'type': ''
                        }
                    },

                ]
            },
        ];
        this.TreeTable2 = [
            {
                'data': {
                    'name': '永久性征收各类土地',
                    'code': '',
                    'jldw': '',
                    'xh': '',
                    'bz': ''
                },
                'children': [
                    {
                        'data': {
                            'name': '耕地',
                            'code': '',
                            'bz': ''
                        },

                    },
                    {
                        'data': {
                            'name': '园地',
                            'code': '',
                            'bz': ''
                        },

                    },
                    {
                        'data': {
                            'name': ' 林地',
                            'code': '',
                            'bz': ''
                        },

                    },
                ]
            },
            {
                'data': {
                    'name': '拆迁房屋',
                    'code': '',
                    'jldw': '',
                    'xh': '',
                    'bz': ''
                },

            },
            {
                'data': {
                    'name': '搬迁安置',
                    'code': '',
                    'bz': ''
                },
                'children': [
                    {
                        'data': {
                            'name': ' 户数',
                            'size': '',
                            'type': ''
                        }
                    },
                    {
                        'data': {
                            'name': '人数',
                            'size': '',
                            'type': ''
                        }
                    },

                ]
            },
            {
                'data': {
                    'name': '生产安置人数',
                    'code': '',
                    'bz': ''
                },
                'children': [
                    {
                        'data': {
                            'name': '移民安置静态投资',
                            'size': '',
                            'type': ''
                        }
                    },

                ]
            },

        ];

    }


    showAll(){
        this.isShow1=this.isShow1?false:true;
    }

    showMore(i) {
        this.showClass = i;
        this.showMode = i;
    }

    getChildEvent(e) {
        console.log(e);
    }


}
