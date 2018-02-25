import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-njgcymazqqgzjd',
  templateUrl: './njgcymazqqgzjd.component.html',
  styleUrls: ['./njgcymazqqgzjd.component.css']
})
export class NjgcymazqqgzjdComponent implements OnInit {
    stepList:any;
    water:any;
    active:string;
  constructor() { }

  ngOnInit() {
      this.active='1';
     this.stepList=stepList;
     this.water=water;
  }
    table(i){
      this.active=i;
    }
}
const stepList:any = [
    {
        id: 1,
        area: '福州',
        name: '永泰抽蓄',
        zhufang: '水电',
        zhufang1: '2155',
        zhufang2: '120',
        zhufang3: '120',
        zhufang4: '福建省投资集团责任有限公司',
        zhufang5: '华东院',
        zhafang: '2011.8.9',
        zhafang1: '2011.10.10',
        zhafang2: '2014.12.17',
        scyf: '2015.1.7',
        scyf1: '2015.11.20',
        scyf2: '2016.3.31',
        scyf3: '',

    },
    {
        id: 2,
        area: '福州',
        name: '罗源霍口',
        zhufang: '水利',
        zhufang1: '28976',
        zhufang2: '8.6',
        zhufang3: '8.6',
        zhufang4: '福建省水利投资集团（霍口水务有限公司）',
        zhufang5: '福建院',
        zhafang: '2015.2.12',
        zhafang1: '',
        zhafang2: '2015.3.14',
        scyf: '2015.4.13',
        scyf1: '2016.3.15',
        scyf2: '',
        scyf3: '',

    },
    {
        id: 3,
        area: '厦门',
        name: '厦门抽水蓄能水电站',
        zhufang: '水电',
        zhufang1: '867',
        zhufang2: '140',
        zhufang3: '140',
        zhufang4: '厦门抽水蓄能有限公司筹建处',
        zhufang5: '华东院',
        zhafang: '2010.10.1',
        zhafang1: '2012.12.1',
        zhafang2: '2012.12.1',
        scyf: '2013.1.1',
        scyf1: '2013.6.1',
        scyf2: '2013.10.23',
        scyf3: '',

    },
    {
        id: 4,
        area: '漳州',
        name: '漳浦朝阳水库',
        zhufang: '水利',
        zhufang1: '4381',
        zhufang2: '6',
        zhufang3: '6',
        zhufang4: '漳浦县水利局',
        zhufang5: '福建院',
        zhafang: '2012.7.1',
        zhafang1: '2012.11.1',
        zhafang2: '2012.12.1',
        scyf: '2012.12.1',
        scyf1: '',
        scyf2: '',
        scyf3: '',

    },
];
const water:any=[
    {
        id: 1,
        area: '福州',
        name: '闽江下游南港南岸防洪五期（闽候段)',
        zhufang: '防洪',
        zhufang1: '50年一遇 20年一遇',
        zhufang2: '',
        zhufang3: '3.644 34.123',
        zhufang4: '',
        zhufang5: '',

        zhafang1: '',
        zhafang2: '福建省投资集团责任有限公司',
        scyf: '淮安市水利勘测设计公司厦门分公司',
        scyf1: '2012.10',
        scyf2: '',
        scyf3: '',
        scyf4: '',
    },
    {
        id: 2,
        area: '福州',
        name: '九龙江防洪工程龙岩（新罗区）',
        zhufang: '防洪',
        zhufang1: '10年一遇20年一遇30年一遇',
        zhufang2: '',
        zhufang3: '',
        zhufang4: '',
        zhufang5: '',

        zhafang1: '',
        zhafang2: '福建省水利投资集团（霍口水务有限公司)',
        scyf: '上海院',
        scyf1: '',
        scyf2: '',
        scyf3: '',
        scyf4: '',
    },
    {
        id: 3,
        area: '厦门',
        name: '木兰溪防洪工程白塘段',
        zhufang: '防洪',
        zhufang1: '50年一遇20年一遇',
        zhufang2: '',
        zhufang3: '2.65',
        zhufang4: '',
        zhufang5: '',

        zhafang1: '',
        zhafang2: '厦门抽水蓄能有限公司筹建处',
        scyf: '省水电院',
        scyf1: '2012.6.25',
        scyf2: '2011.11',
        scyf3: '2013.9.12',
        scyf4: '2015.9.28',
        scyf5: '',
    },
    {
        id: 4,
        area: '漳州',
        name: '平漳综合实验区防洪防潮工程',
        zhufang: '防洪',
        zhufang1: '100年一遇',
        zhufang2: '',
        zhufang3: '58.73',
        zhufang4: '',
        zhufang5: '',
        zhafang1: '',
        zhafang2: '漳浦县水利局',
        scyf: '省水电院',
        scyf1: '2013.8.7',
        scyf2: '2013.4.23',
        scyf3: '',
        scyf4: '2015.3.1',
        scyf5: '',
    },
]
