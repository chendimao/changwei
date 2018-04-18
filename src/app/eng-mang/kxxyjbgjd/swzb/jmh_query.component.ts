import {Component, OnInit} from '@angular/core';
import {SelectItem} from "../../../../assets/_primeng@4.2.1@primeng/components/common/selectitem";
import {HttpService} from "../../../service/http-service";
import {DataProcessingService} from "../../../service/dataProcessing.service";
import { ShareService } from "../../../systemSetting/service/share.service";

@Component({
    selector: 'app-jmhquery',
    templateUrl: './jmh_query.component.html',
    styleUrls: ['./jmh.component.css']
})
export class JmhQueryComponent implements OnInit {
    public getParem: any;
    display: boolean = true;
    types1: SelectItem[];
    types2: SelectItem[];
    selectList = new Array;
    private dcfwTableList: any;
    private dcfwTreeList: any;
    private zydlTreeList: any;
    private zydlTableList: any;
    private isShowZydl: boolean = false;
    private isShowDcfw: boolean = false;
    private init_getParams: any;


    constructor(private ShareService:ShareService,private DataProcessing: DataProcessingService, private HttpService: HttpService) {
        this.types1 = [];
        this.types1.push({label: '是', value: '1'});
        this.types1.push({label: '否', value: '0'});
        this.types2 = [];

        this.types2.push({label: '是', value: '1'});
        this.types2.push({label: '否', value: '0'});
    }


    ngOnInit() {
        this.init_getParams = JSON.parse(JSON.stringify(this.getParem))
    }

    showDcfwBlock() {


        this.isShowDcfw = this.isShowDcfw ? false : true;


        if (!this.dcfwTableList) {

            this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HJBXX&column=DCFWDM&gcdm=${this.getParem.ssgcdm}&xzqhdm=${this.getParem.ssxzqhdm}`)
                .then((res) => {
                    this.dcfwTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                });
            this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_HJBXX&column=DCFWDM&gcdm=${this.getParem.ssgcdm}&xzqhdm=${this.getParem.ssxzqhdm}`)
                .then((res) => {
                    console.log(res['returnObject']);
                    this.dcfwTableList = res['returnObject'];
                });
        }
    }

    getChildDcfw(event) {
        this.isShowDcfw = false;
        this.getParem.dcfwmc= event.mc;
        this.getParem.dcfwdm = event.dm;
    }

    //专业大类
    showZydlBlock() {
        this.isShowZydl = this.isShowZydl ? false : true;
        if (!this.zydlTableList) {

            this.HttpService.get(`zdk/getZdkByTableAndColumn?tableName=B_HJBXX&column=ZYDLDM&gcdm=${this.getParem.ssgcdm}&xzqhdm=${this.getParem.ssxzqhdm}`)
                .then((res) => {
                    this.zydlTreeList = this.DataProcessing.replaceChildlValue(res['returnObject'], 'listZdk', 'children', 'mc', 'label');
                });
            this.HttpService.get(`zdk/getZdkByTableAndColumn2?tableName=B_HJBXX&column=ZYDLDM&gcdm=${this.getParem.ssgcdm}&xzqhdm=${this.getParem.ssxzqhdm}`)
                .then((res) => {
                    console.log(res['returnObject']);
                    this.zydlTableList = res['returnObject'];
                });
        }

    }


    getChildZydl(event) {
        console.log(event);
        this.isShowZydl = false;
        this.getParem.zydlmc = event.mc;
        this.getParem.zydldm = event.dm;
    }

    close() {
        this.display = false;
        console.log(2);
    }

    clear() {
        for (let key in this.getParem) {
            if (key != 'limit' && key != 'start' && key != 'id' && key != 'ssxzqhdm' && key != 'ssxzqhdmMin' && key != 'ssxzqhmc' && key != 'ssgcdm' && key != 'jddm') {
                delete  this.getParem[key];
            }

        }
    }

    search() {
        this.display = false;
        console.log(this.getParem);
        // for(let key in this.getParem){
        //      if(this.getParem[key]!=this.init_getParams[key]){
                 console.log("有数据进行修改");
                 this.ShareService.sendMessage({
                     severity: 'success',
                     item: 'jmh'
                 });
             // }
        // }
    }

    showtype(): void {
        console.log(1)
    }

    getChildEvent(e) {
        console.log(e);
    }
}
