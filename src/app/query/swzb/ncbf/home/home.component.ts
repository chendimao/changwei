import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../../service/http-service";
import {DataProcessingService} from "../../../../service/dataProcessing.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private ch;
    show: number = 1;
    // 加的加载
    isShowRight: boolean = false;
    defaultShow: boolean = true;
    private ReservoirLagList;
    tabMsg: string = '切换至明细';
    huizhong: boolean = true;
    mingxi: boolean = false;
    geren: any;
    treelist: any;
    constructor(public HttpService: HttpService, public DataProcessingService: DataProcessingService) {
    }

    ngOnInit() {

        this.HttpService.get(`locality/listTree`)
            .then(res => {
this.treelist = this.DataProcessingService.replaceChildlList(res['returnObject'], 'localityName', 'label', 'childrenLocality', 'children');

            });


        this.ReservoirLagList = ReservoirLagList;
        this.geren = geren;
        this.ch = {
            firstDayOfWeek: 0,
            dayNames: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesShort: ['天', '一', '二', '三', '四', '五', '六'],
            dayNamesMin: ['天', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
            today: '今天',
            clear: '清除',
        };
    }

    getEvent(event) {
        this.isShowRight = event;
        this.defaultShow = false;
    }

    showMore(i) {
        this.show = i;
    }

    tabMx() {
        if (this.huizhong == true) {
            this.mingxi = true;
            this.huizhong=false;
            this.tabMsg = '切换至明细';
        } else {
            this.huizhong = true;
            this.mingxi = false;
            this.tabMsg = '切换至汇总';
        }
    }
}

const ReservoirLagList: any = [
    {
        id: 1,
        name: '葫芦门水库',
        miji: '36815.26',
        zhufang: '',
        zhufang1: '',
        zhufang2: '36815.26',
        zhufang3: '',
        zhufang4: '',
        zhufang5: '',
        zhafang: '',
        zhafang1: '',
        zhafang2: '',
        scyf: '',
        scyf1: '',
        scyf2: '',
        scyf3: '',
        hyyf: '',
        hyyf1: '',
        hyyf2: '',
    },
    {
        id: 1,
        name: '莲花水库',
        miji: '57570',
        zhufang: '',
        zhufang1: '',
        zhufang2: '',
        zhufang3: '57570',
        zhufang4: '',
        zhufang5: '',
        zhafang: '',
        zhafang1: '',
        zhafang2: '',
        scyf: '',
        scyf1: '',
        scyf2: '',
        scyf3: '',
        hyyf: '',
        hyyf1: '',
        hyyf2: '',
    },
    {
        id: 1,
        name: '彭村水库',
        miji: '131833.8',
        zhufang: '',
        zhufang1: '1125.74',
        zhufang2: '37569.39',
        zhufang3: '22844.78',
        zhufang4: '62522.52',
        zhufang5: '130.31',
        zhafang: '',
        zhafang1: '1250.70',
        zhafang2: '2926.56',
        scyf: '',
        scyf1: '93.08',
        scyf2: '2418.07',
        scyf3: '165.70',
        hyyf: '',
        hyyf1: '',
        hyyf2: '',
    },
    {
        id: 1,
        name: '双溪水库',
        miji: '10536.22',
        zhufang: '',
        zhufang1: '',
        zhufang2: '',
        zhufang3: '',
        zhufang4: '',
        zhufang5: '',
        zhafang: '',
        zhafang1: '',
        zhafang2: '',
        scyf: '',
        scyf1: '',
        scyf2: '',
        scyf3: '',
        hyyf: '',
        hyyf1: '',
        hyyf2: '',
    },
    {
        id: 1,
        name: '兴头水库',
        miji: '9966.47',
        zhufang: '',
        zhufang1: '',
        zhufang2: '',
        zhufang3: '',
        zhufang4: '',
        zhufang5: '',
        zhafang: '',
        zhafang1: '',
        zhafang2: '',
        scyf: '',
        scyf1: '',
        scyf2: '',
        scyf3: '',
        hyyf: '',
        hyyf1: '',
        hyyf2: '',
    },
    {
        id: 1,
        name: '溪源水库',
        miji: '5749.48',
        zhufang: '',
        zhufang1: '',
        zhufang2: '',
        zhufang3: '',
        zhufang4: '',
        zhufang5: '',
        zhafang: '',
        zhafang1: '',
        zhafang2: '',
        scyf: '',
        scyf1: '',
        scyf2: '',
        scyf3: '',
        hyyf: '',
        hyyf1: '',
        hyyf2: '',
    },
    {
        id: 1,
        name: '王家洲水库',
        miji: '1401',
        zhufang: '',
        zhufang1: '',
        zhufang2: '',
        zhufang3: '',
        zhufang4: '',
        zhufang5: '',
        zhafang: '',
        zhafang1: '',
        zhafang2: '',
        scyf: '',
        scyf1: '',
        scyf2: '',
        scyf3: '',
        hyyf: '',
        hyyf1: '',
        hyyf2: '',
    },
    {
        id: 1,
        name: '五星桥水库',
        miji: '8105.4',
        zhufang: '',
        zhufang1: '',
        zhufang2: '',
        zhufang3: '',
        zhufang4: '',
        zhufang5: '',
        zhafang: '',
        zhafang1: '',
        zhafang2: '',
        scyf: '',
        scyf1: '',
        scyf2: '',
        scyf3: '',
        hyyf: '',
        hyyf1: '',
        hyyf2: '',
    },
    {
        id: 1,
        name: '宁德关昌水库',
        miji: '31219.9',
        zhufang: '',
        zhufang1: '',
        zhufang2: '',
        zhufang3: '',
        zhufang4: '',
        zhufang5: '',
        zhafang: '',
        zhafang1: '',
        zhafang2: '',
        scyf: '',
        scyf1: '',
        scyf2: '',
        scyf3: '',
        hyyf: '',
        hyyf1: '',
        hyyf2: '',
    },


];
const geren:any=[
    {
        id: 1,
        name: '蒋仕弟',
        miji: '彭村水库 ',
        zhufang: '福建省泉州市德化县盖德镇林地村',
        zhufang1: '282.16 ',
        zhufang2: '282.16',
        zhufang3: '',
        zhufang4: '282.16',
        zhufang5: '',
        zhafang: '',
        zhafang1: '',
        zhafang2: '',
        scyf: '',
        scyf1: '',
        scyf2: '',
        scyf3: '',
        hyyf: '',
        hyyf1: '',
        hyyf2: '',
    },
    {
        id: 1,
        name: '谢永才',
        miji: '彭村水库',
        zhufang: '福建省泉州市德化县盖德镇林地村',
        zhufang1: '418.26',
        zhufang2: '418.26',
        zhufang3: '',
        zhufang4: '148.92',
        zhufang5: '269.34',
        zhafang: '',
        zhafang1: '',
        zhafang2: '',
        scyf: '',
        scyf1: '',
        scyf2: '',
        scyf3: '',
        hyyf: '',
        hyyf1: '',
        hyyf2: '',
    },
    {
        id: 1,
        name: '蒋昌林',
        miji: '彭村水库',
        zhufang: '福建省泉州市德化县盖德镇林地村',
        zhufang1: '40.45',
        zhufang2: '40.45',
        zhufang3: '',
        zhufang4: '',
        zhufang5: '36.12',
        zhafang: '4.33',
        zhafang1: '',
        zhafang2: '',
        scyf: '',
        scyf1: '',
        scyf2: '',
        scyf3: '',
        hyyf: '',
        hyyf1: '',
        hyyf2: '',
    },
    {
        id: 1,
        name: '陈清华',
        miji: '彭村水库',
        zhufang: '福建省泉州市德化县盖德镇林地村',
        zhufang1: '201.87',
        zhufang2: '183.01',
        zhufang3: '',
        zhufang4: '',
        zhufang5: '153.55',
        zhafang: '29.46',
        zhafang1: '',
        zhafang2: '18.86',
        scyf: '18.86',
        scyf1: '',
        scyf2: '',
        scyf3: '',
        hyyf: '',
        hyyf1: '',
        hyyf2: '',
    },
    {
        id: 1,
        name: '周顺强',
        miji: '彭村水库',
        zhufang: '福建省泉州市德化县盖德镇林地村',
        zhufang1: '43.65',
        zhufang2: '43.65',
        zhufang3: '',
        zhufang4: '27.09',
        zhufang5: '16.56',
        zhafang: '',
        zhafang1: '',
        zhafang2: '',
        scyf: '',
        scyf1: '',
        scyf2: '',
        scyf3: '',
        hyyf: '',
        hyyf1: '',
        hyyf2: '',
    },
]