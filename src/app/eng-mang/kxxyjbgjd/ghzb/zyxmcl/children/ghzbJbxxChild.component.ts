import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../../../service/http-service";
import {DataProcessingService} from "../../../../../service/dataProcessing.service";
import {GHZB_DATA_TITLE} from "../../../../../service/ghzb-title.service";

@Component({
    selector: 'app-ghzbJbxxChild',
    templateUrl: './ghzbJbxxChild.component.html',
    styleUrls: ["../ghzbJbxx.component.css"]
})
export class  GhzbJbxxChildComponent implements OnInit {
    // 加的加载
    isShowRight: boolean = true;
    defaultShow: boolean = true;

    display1: boolean = true;
    public treelist: any;
    public baseInfo;
    public dm;
    public Title;
    public selectType: number = 1;
    public isShowArea: boolean = false;
    public isDisabled;
    public ghzb_data;

    constructor(private HttpService: HttpService, private DataProcessingService: DataProcessingService) {


    }

    openModal() {
        this.display1 = true;
    }

    closeModal() {
        this.display1 = false;
    }

    ngOnInit() {
        console.log(this.baseInfo);
        console.log(this.dm);

        for(let i in GHZB_DATA_TITLE){
            if(i == this.dm){
                this.Title = GHZB_DATA_TITLE[i];
            }

        }

        this.ghzb_data = GHZBDATA;
        this.treelist = this.DataProcessingService.returnTreeTable(this.DataProcessingService.replaceChildlList(this.ghzb_data['datalist'][0]['flbmxList'],'dlzbflmc','label','childList','children')[0]);
        console.log(this.treelist);
        // this.HttpService.get(`locality/listTree`)
        //     .then(res => {
        //         this.treelist = this.DataProcessingService.replaceChildlList(res['returnObject'], 'localityName', 'label', 'childrenLocality', 'children');
        //
        //     });
    }

    getEvent(event) {
        this.isShowRight = event;
        this.defaultShow = false;
    }


    selectName(i){
        if(i == 1){
            this.selectType = 1;
        }else if(i == 2){
            this.selectType = 2;
        }
    }


    //行政区划
    showAreaBlock(): void {
        if (this.isShowArea) {
            this.isShowArea = false;
        } else {
            this.isShowArea = true;
        }

    }



    getChildSzxzqh(e) {
        console.log(e);
        if (e) {
           // this.name_active_data.localitydesc = e.qc;
           // this.name_active_data.swszxzqhdm = e.dm;
            this.isShowArea = false;
        }
    }


    //树table点击
    TreeTableClick(event,treetable,node){
        console.log(event);
        console.log(treetable);
        console.log(node);
    }

}



export const GHZBDATA = {
    "baseList": [ //规划项目定量指标分类别明细的原始空数据
        {
            "start": null,
            "limit": null,
            "orderCol": null,
            "orderType": null,
            "sql": null,
            "searchKey": null,
            "id": null,
            "ssxtdm": "X000001",//所属系统代码
            "ssghxmId": null,//所属规划项目ID
            "jddm": null, //阶段代码
            "dlzbfldm": null, //定量指标分类代码
            "sl": null, //数量
            "dlzbflmc": null, //定量指标分类名称
            "bz": null, //备注
            "cjsj": null,
            "zhgxsj": null,
            "childList": null //子节点
        }],
    "datalist": [{ // 包括规划项目、规划项目基本信息、规划项目定量指标分类别明细数据
        "start": null,
        "limit": null,
        "orderCol": null,
        "orderType": null,
        "sql": null,
        "searchKey": null,
        "id": null,
        "ssxtdm": "X000001", //所属系统代码
        "ssgcdm": "S000001", //工程代码
        "ssghxmfldm": null, //所属规划项目分类代码
        "xmmc": null,//项目名称
        "xmjc": null, //项目简称
        "xmszxzqhdm": null, //项目所在行政区划代码
        "xmgldwxzqhdm": null, //项目管理定位行政区划代码
        "cjsj": 1517770178000,
        "zhgxsj": 1517770175000,
        "ssghxmflmc": null, //所属规划项目分类名称
        "xmszxzqhmc": null, //项目所在行政区划名称
        "xmgldwxzqhmc": null, //项目管理定位行政区划名称
        "bz": null, //备注
        "flbmxList": [ // 规划项目定量指标分类别明细
            {
                "start": null,
                "limit": null,
                "orderCol": null,
                "orderType": null,
                "sql": null,
                "searchKey": null,
                "id": null,
                "ssxtdm": "X000001",//所属系统代码
                "ssghxmId": null,//所属规划项目ID
                "jddm": null, //阶段代码
                "dlzbfldm": 1, //定量指标分类代码
                "sl": 233, //数量
                "dlzbflmc": 'test', //定量指标分类名称
                "bz": null, //备注
                "cjsj": null,
                "zhgxsj": null,
                "childList": null //子节点
            },
            {
                "start": null,
                "limit": null,
                "orderCol": null,
                "orderType": null,
                "sql": null,
                "searchKey": null,
                "id": null,
                "ssxtdm": "X000001",//所属系统代码
                "ssghxmId": null,//所属规划项目ID
                "jddm": null, //阶段代码
                "dlzbfldm": 2, //定量指标分类代码
                "sl": 322, //数量
                "dlzbflmc": 'test233', //定量指标分类名称
                "bz": null, //备注
                "cjsj": null,
                "zhgxsj": null,
                "childList": null //子节点
            }],
        "ghxmjbxx": { // 规划项目基本信息
            "start": null,
            "limit": null,
            "orderCol": null,
            "orderType": null,
            "sql": null,
            "searchKey": null,
            "id": "AC1845291B6F48598B8C7735370E198B",
            "ssxtdm": "X000001", //所属系统代码
            "ssgcdm": "S000001", //所属工程代码
            "ssghxmId": "C1A89E476E4146C7BEA4B25FA5E48CAE", //所属规划项目ID
            "jddm": "02", //阶段代码
            "clfsdm": null, //处理方式代码
            "clfsmc": null, //处理方式名称
            "szwz": null, //规划投资
            "ghtz": 1000, //屋面材料
            "ghfazy": '摘要摘要摘要', //规划方案摘要
            "bz": '备注备注备注备注', //备注
            "cjsj": 1519683616000,
            "zhgxsj": 1519683621000
        }
    }]
}

