import {Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SelectItem, DataTableModule, SharedModule, LazyLoadEvent, FilterMetadata} from 'primeng/primeng';
import { ValuChangeService } from "../../../../../../service/valuChange.service";

@Component({
  selector: 'app-shebei',
  templateUrl: './shebei.component.html',
    styleUrls: ['../children.css']
})
export class ShebeiComponent implements OnInit {
    public hcy: any;
    private selectListHzgx=new Array;
    private tableList: any;
    private personList: any;
    types: SelectItem[];
    public selectedType: number;
    types1: SelectItem[];
    types2: SelectItem[];
    types3: SelectItem[];
    types4: SelectItem[];
    types5: SelectItem[];
    private ch;
    private isShowArea: boolean = false;
    area: string;
    @ViewChild('person') person: NgForm;
    @ViewChildren('defaultPerson') defaultPerson: QueryList<ElementRef>;


    constructor(private ValuChangeService: ValuChangeService) {
        this.types = [];
        this.types.push({label: '详情视图', value: '1'});
        this.types.push({label: '列表视图', value: '2'});
        this.types1 = [];
        this.types1.push({label: '农业', value: '农业'});
        this.types1.push({label: '非农业', value: '非农业'});
        this.types2 = [];
        this.types2.push({label: '男', value: '男'});
        this.types2.push({label: '女', value: '女'});
        this.types3 = [];
        this.types3.push({label: '已婚', value: '已婚'});
        this.types3.push({label: '未婚', value: '未婚'});
        this.types4 = [];
        this.types4.push({label: '是', value: '是'});
        this.types4.push({label: '否', value: '否'});
        this.types5 = [];
        this.types5.push({label: '是', value: '是'});
        this.types5.push({label: '否', value: '否'});


        this.tableList = [
            {
                "mc": "蔡国成",
                'cym': '农业',
                'sfzh': '父子',
                'szxzqhdm': "所属系统代码",
                'hbdm': "所属工程代码",
                'zydldm': "专业大类代码",
                'dcfwdm': "所在最高高程",
                'xbdm': "所在最低高程",
                'mzdm': "调查范围代码",
                'yhzgx': "所属系统代码",
                'csrq': "",
                'whcddm': "专业大类代码",
                'hydm': "所在最高高程",
                'sfsldl': "所在最低高程",
                'hkszd': "调查范围代码",
                'rs': "所在最高高程",
                'bz': "所在最低高程",
                'cjsj': "调查范围代码"
            },
            {

                'mc': '白应福',
                'cym': '农业',
                'sfzh': '父子',
                'szxzqhdm': "所属系统代码",
                'hbdm': "所属工程代码",
                'zydldm': "专业大类代码",
                'dcfwdm': "所在最高高程",
                'xbdm': "所在最低高程",
                'mzdm': "调查范围代码",
                'yhzgx': "所属系统代码",
                'csrq': "",
                'whcddm': "专业大类代码",
                'hydm': "所在最高高程",
                'sfsldl': "所在最低高程",
                'hkszd': "调查范围代码",
                'rs': "所在最高高程",
                'bz': "所在最低高程",
                'cjsj': "调查范围代码"
            },
            {

                'mc': '李才香',
                'cym': '农业',
                'sfzh': '父子',
                'szxzqhdm': "所属系统代码",
                'hbdm': "所属工程代码",
                'zydldm': "专业大类代码",
                'dcfwdm': "所在最高高程",
                'xbdm': "所在最低高程",
                'mzdm': "调查范围代码",
                'yhzgx': "所属系统代码",
                'csrq': "",
                'whcddm': "专业大类代码",
                'hydm': "所在最高高程",
                'sfsldl': "所在最低高程",
                'hkszd': "调查范围代码",
                'rs': "所在最高高程",
                'bz': "所在最低高程",
                'cjsj': "调查范围代码"
            }
        ]
    }

    ngOnInit() {
        this.selectListHzgx=[
            {label:'户主',name:'户主',value:'1'},
            {label:'父子',name:'户主',value:'1'},
            {label:'父女',name:'户主',value:'1'},
            {label:'姐',name:'户主',value:'1'},
            {label:'哥',name:'户主',value:'1'},
            {label:'弟',name:'户主',value:'1'},
            {label:'弟媳',name:'户主',value:'1'},
        ];

        this.hcy = this.tableList[0];
        sessionStorage['linshiPerson'] = JSON.stringify(this.tableList);
        sessionStorage['person'] = '{}';
        this.selectedType = 1;
        this.area = '福建省泉州市安溪县白濑乡长基村';
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

    ngAfterViewInit(): void {
        // 订阅表单值改变事件
        // this.person.valueChanges.subscribe(data => {
        //         let linshiPerson = JSON.parse(sessionStorage.getItem('linshiPerson'));
        //         let confuInfo = JSON.parse(sessionStorage.getItem('person'));
        //         let duibiPerson = JSON.stringify(this.ValuChangeService.changeDate(linshiPerson, data));
        //         sessionStorage['person'] = JSON.stringify(duibiPerson);
        //     }
        // );
    }

    // 选择人
    selectPerson(person) {
        this.hcy = person;

    }


    delEng(hcy): void {
        console.log(hcy);
    }

    addPerson(personSign): void {
        this.tableList.push({
            "mc": "", 'cym': '', 'sfzh': '', 'szxzqhdm': "", 'zydldm': "", 'dcfwdm': "",
            'xbdm': "", 'mzdm': "", 'yhzgx': "", 'csrq': "", 'whcddm': "", 'hydm': "", 'sfsldl': "", 'hkszd': "",
            'rs': "", 'bz': "", 'cjsj': ""
        });
        let that = this.defaultPerson;
        setTimeout(function () {
            that.last.nativeElement.click();
        }, 0);


    }


    showAreaBlock(): void {

        if (this.isShowArea) {
            this.isShowArea = false;
            console.log(this.isShowArea);
        } else {
            this.isShowArea = true;
            console.log(this.isShowArea);
        }

    }

    getChildEvent(index) {
        this.area = index;
    }

    selectedTypea1(): void {
        if (this.selectedType == 2) {
            this.selectedType = 2;
        } else {
            this.selectedType = 1;
        }
    }


    getChildEvent1(e) {
        this.hcy.hlbdm = e;
    }
}

const hcy = {
    ssxtdm: "所属系统代码",
    ssgcdm: "所属工程代码",
    zydldm: "专业大类代码",
    szzggc: "所在最高高程",
    szzdgc: "所在最低高程",
    dcfwdm: "调查范围代码",
    dmbh: "断面编号",
    jddm: "阶段代码",
    szxzqhdm: "所在行政区划代码",
    mc: "名称",
    xbdm: "性别代码",
    hkqkdm: "户口情况代码",
    sfzh: "身份证号",
    mzdm: "民族代码",
    csrq: "",
    whcddm: "文化程度代码",
    cyzkdm: "从业状况代码",
    jn: "技能",
    hydm: "婚姻代码",
    qrrq: "",
    qcrq: "",
    hbdm: "户别代码",
    hkszd: "户口所在地",
    sfkgr: "是否空挂人",
    sfsldl: "是否是劳动力",
    rs: "人数",
    bz: "备注",
    cjsj: "创建时间",
    zhgxsj: "最后更新时间",
}