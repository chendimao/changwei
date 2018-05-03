import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from "../../../service/http-service";
import {DataProcessingService} from "../../../service/dataProcessing.service";
import {Subscription} from "rxjs/Subscription";
import {ShareService} from "../../../systemSetting/service/share.service";
import {TreeListDataService} from "../../../service/tree-list-data.service";

@Component({
    selector: 'app-ghzbjclist',
    templateUrl: './ghzbjclist.component.html',
    styleUrls: ['./common.css']
})
export class GhzbTreelistComponent implements OnInit {
    private componentDm: string;
    private treelist: any;
    private qshflId: any;
    public res:any;
    private msgs: any;
    private totalPage: number;
    private listUrl: any;
    private count: number;
    private currentPage: number;
    public childTreeList;
    private secNav: string;
    private getParem = new getParem;
    subscription = new Subscription;
    private name_active_tree: any;

    constructor(public TreeListService:TreeListDataService,public ShareService:ShareService, private Router: Router, private route: ActivatedRoute, private HttpService: HttpService, private DataProcessingService: DataProcessingService) {

        this.route.params.subscribe(res => {
            console.log(res);
            console.log(this.route.params);
            this.qshflId = res['qshflId'];
            this.res = res;

            if(this.name_active_tree){

                this.HttpService.get('zdk/listTree?sjId=CE22671CAA6D49B0BD3071CD63A72B95')
                    .then((data) => {
                        console.log(data);
                        this.returnDm(data['returnObject'], this.qshflId);
                        console.log(this.componentDm);
                        console.log(this.componentDm == 'GHXMFL_0101');
                        console.log(this.componentDm == 'GHXMFL_0102');
                        console.log(this.componentDm == 'GHXMFL_0105');
                        if (this.componentDm == 'GHXMFL_0101' || this.componentDm == 'GHXMFL_0102' || this.componentDm == 'GHXMFL_0105') {


                            this.TreeListService.treeList = this.childTreeList;
                            console.log(this.route);
                            this.Router.navigate([`ghzbArea/${this.name_active_tree['localityCode']}/${this.componentDm}/${this.name_active_tree['localityDesc']}`], {relativeTo: this.route})
                        } else {
                            console.log(this.route);

                            this.Router.navigate([`ghzbjbxx/${this.name_active_tree['localityCode']}/${this.componentDm}/${this.name_active_tree['localityDesc']}`],{relativeTo: this.route})
                        }
                    });


                this.ShareService.sendMessage({
                    severity: 'success',
                    item: 'ghzb'
                });
            }

        });


        this.subscription = this.ShareService.getMessage()
            .subscribe((data) => {
                console.log(data);
                if (data['message']['item'] == 'ghzb') {
                    if (data['message']['summary']) {
                        this.msgs = [];
                        this.msgs.push(data['message']);
                    }


                }
            })




    }

    ngOnInit() {
        this.HttpService.get(`locality/listTree`)
            .then(res => {
                this.treelist = this.DataProcessingService.replaceChildlList(res['returnObject'], 'localityName', 'label', 'childrenLocality', 'children');
                console.log(this.treelist);
            });


    }

    getEvent(i) {
        this.name_active_tree = i;
        this.childTreeList = this.name_active_tree.children;



        console.log(this.childTreeList);
        console.log(this.res);
        console.log(this.qshflId);

        this.HttpService.get('zdk/listTree?sjId=CE22671CAA6D49B0BD3071CD63A72B95')
            .then((data) => {
                console.log(data);
                this.returnDm(data['returnObject'], this.qshflId);
                console.log(this.componentDm);
                console.log(this.componentDm == 'GHXMFL_0101');
                console.log(this.componentDm == 'GHXMFL_0102');
                console.log(this.componentDm == 'GHXMFL_0105');
                if (this.componentDm == 'GHXMFL_0101' || this.componentDm == 'GHXMFL_0102' || this.componentDm == 'GHXMFL_0105') {


                        this.TreeListService.treeList = this.childTreeList;
                        console.log(this.route);
                    this.Router.navigate([`ghzbArea/${this.name_active_tree['localityCode']}/${this.componentDm}/${this.name_active_tree['localityDesc']}`], {relativeTo: this.route})
                } else {
                    console.log(this.route);

                    this.Router.navigate([`ghzbjbxx/${this.name_active_tree['localityCode']}/${this.componentDm}/${this.name_active_tree['localityDesc']}`],{relativeTo: this.route})
                }
            });


        this.ShareService.sendMessage({
            severity: 'success',
            item: 'ghzb'
        });


    }





    // 获取当前指标项的dm
    returnDm(arr, zdxId) {
        console.log(arr);
        for (let item of arr) {
            console.log(item);
            if (item.listZdk) {
                if (item.id == zdxId) {
                    console.log("有匹配的");
                    this.componentDm = item.dm;

                }
                this.returnDm(item.listZdk, zdxId)
            } else {
                if (item.id == zdxId) {
                    console.log("没有匹配的");
                    this.componentDm = item.dm
                }
            }
        }
    }


    getUrl() {
        return this.listUrl + '?' + this.DataProcessingService.transString(this.getParem);
    }
}




export class getParem {
    ssxzqhdm: string;	//行政区划代码	是	350526100209011	350526100209011
    ssxzqhdmMin: string; // 行政区划最小集代码
    ssxzqhmc: string;	//行政区划名称	是	S000001	S000001
    ssgcdm: string;	//工程代码	是	S000001	S000001
    jddm: string;	     //阶段代码	是	1	1
    searchKey: string;	//搜索关键字	否
    start: string;	 //开始条数	是
    limit: string;	 //取多少条记录	是
    id: string;   //权属户分类ID	是


    jdId: string;   //当前阶段的id
    hzxm: string;   //户主姓名
    hzsfzh: string;   //	户主身份证号
    jtcyxm: string;   // 家庭成员姓名
    jtcysfzh: string; // 家庭成员身份证号
    dabh: string;     //档案编号
    zydldm: string;   //专业大类代码
    dcfwdm: string;   //调查范围代码
    sfkgh: string;    //是否空挂户
    sfxw: string;     //	是否线外

}





