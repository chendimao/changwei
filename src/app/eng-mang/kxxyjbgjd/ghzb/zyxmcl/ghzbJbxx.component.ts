import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {HttpService} from "../../../../service/http-service";
import {DataProcessingService} from "../../../../service/dataProcessing.service";
import {SearchService} from "../../../../service/search.service";
import {ActivatedRoute} from "@angular/router"
import { GhzbJbxxChildComponent } from "./children/ghzbJbxxChild.component";
import {GHZB_TITLE} from "../../../../service/ghzb-title.service";

@Component({
    selector: 'app-ghzbJbxx',
    templateUrl: './ghzbJbxx.component.html',
    styleUrls: ['./ghzbJbxx.component.css']
})
export class GhzbJbxxComponent implements OnInit {
    display1: boolean = false;
    private treelist: any;
    private breadcrumb: any;
    private getParem: any;
    private secNav: any;
    public dataList;
    public title ;
    public selectInfo;
    public msgs: any;

    @ViewChild('modelRoom', {read: ViewContainerRef}) ModelRoom: ViewContainerRef;
    constructor(private AlertModel: ComponentFactoryResolver,private SearchService: SearchService, private router: ActivatedRoute, private HttpService: HttpService, private DataProcessingService: DataProcessingService) {
        this.router.params.subscribe(res => {

            console.log(this.router.queryParams['value']);
            let params= this.router.queryParams['value']; //请求接口所需的参数

             this.dataList = [new ghzbList('7BCD3BE587394F4D969D3B0CC6225E95','','','','','','X000001','S000001','','','','56565656','45454545','','1517770178000','1517770175000','test','abcde','12345')];

            console.log(this.dataList);

            console.log(GHZB_TITLE);
            for(let i in GHZB_TITLE){
                if(i == '1'){
                    this.title = GHZB_TITLE[i];
                }

            }

            console.log(this.title);


        })
    }

    openModal(name) {
        console.log("创建子模块");


        if(this.selectInfo){
            console.log(this.selectInfo);
            const person = this.AlertModel.resolveComponentFactory(GhzbJbxxChildComponent);
            const perModel = this.ModelRoom.createComponent(person);
                  perModel.instance.baseInfo = this.selectInfo;
                  perModel.instance.Title = this.title;
        }else{

            if (name === 'view') {
                this.msgs = [];
                this.msgs.push({severity: 'warn', summary: '点击提醒', detail: '请选择查看项'});
            } else if (name === 'rew') {
                this.msgs = [];
                this.msgs.push({severity: 'warn', summary: '点击提醒', detail: '请选择修改项'});
            }


        }
    }



    ngOnInit() {

        this.HttpService.get(`locality/listTree`)
            .then(res => {
                this.treelist = this.DataProcessingService.replaceChildlList(res['returnObject'], 'localityName', 'label', 'childrenLocality', 'children');

            });
    }



    DatatableClick(e){
        console.log(e);
        this.selectInfo = e;
    }


}


export class ghzbList{

    constructor(

        public id,
        public orderType,
        public orderCol,
        public sql,
        public start,
        public limit,
        public ssxtdm,
        public ssgcdm,
        public ssghxmfldm,
        public xmmc,
        public xmjc,
        public xmszxzqhdm,
        public xmgldwxzqhdm,
        public bz,
        public cjsj,
        public zhgxsj,
        public ssghxmflmc,
        public xmszxzqhmc,
        public xmgldwxzqhmc,

    ){

    }

}

