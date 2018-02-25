import {Component, OnInit, Input,Output,EventEmitter} from '@angular/core';

@Component({
    selector: 'app-area-select',
    templateUrl: './area-select.component.html',
    styleUrls: ['./area-select.component.css']
})
export class AreaSelectComponent implements OnInit {
    @Input() display;
    @Output() childEvent = new EventEmitter<any>();
    area: string;
    provice = new Array;
    citys = new Array;
    areas = new Array;
    showProvice: boolean = true;
    showCity: boolean = false;
    showArea: boolean = false;
    public selectProvince1: string;
    public selectCity1: string;
    public selectArea1: string;

    constructor() {}

    ngOnInit() {
        this.provice = provice;
        this.citys = city;
        this.areas = area;
    }
    ngOnChanges(){
        console.log(this.display);
    }
    selectProvice(i): void {
        this.selectProvince1 = i;
        this.showProvice = false;
        this.showCity = true;
        this.area = i;
        this.childEvent.emit(this.area);
    }

    selectCity(i): void {
        this.selectCity1 = i;
        this.showCity = false;
        this.showArea = true;
        this.area += i;
        this.childEvent.emit(this.area);
    }

    selectArea(i): void {
        this.selectArea1 = i;
        this.area += i;
        this.childEvent.emit(this.area);
    }

    clearSelect() {
        this.selectProvince1 = "";
        this.selectCity1 = "";
        this.selectArea1 = "";
        this.showProvice = true;
        this.showCity = false;
        this.showArea = false;
        this.area = '';
        this.childEvent.emit(this.area);
    }
}

const provice = [
    '北京市', '天津市', '河北省', '山西省', '内蒙古自治区',
    '辽宁省', '吉林省', '黑龙江省',
    '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省',
    '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省',
    '重庆市', '四川省', '贵州省', '云南省', '西藏自治区',
    '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区',
    '香港特别行政区', '澳门特别行政区', '台湾省'
];
const city = [
    '武汉市', '黄石市', '十堰市', '荆州市', '宜昌市', '襄阳市', '鄂州市', '荆门市', '孝感市', '黄冈市', '咸宁市', '随州市', '恩施市'
];
const area = [
    '江岸区', '江汉区', '硚口区', '汉阳区', '武昌区', '青山区', '洪山区', '东西湖区', '汉南区', '蔡甸区', '江夏区', '黄陂区', '新洲区'
];
