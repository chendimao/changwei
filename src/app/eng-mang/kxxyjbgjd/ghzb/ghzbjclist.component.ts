import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from "../../../service/http-service";
import {DataProcessingService} from "../../../service/dataProcessing.service";

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

    constructor(private Router: Router, private route: ActivatedRoute, private HttpService: HttpService, private DataProcessingService: DataProcessingService) {

        this.route.params.subscribe(res => {
            console.log(res);
            this.qshflId = res['qshflId'];
            this.res = res;


        });
    }

    ngOnInit() {
        this.HttpService.get(`locality/listTree`)
            .then(res => {
                this.treelist = this.DataProcessingService.replaceChildlList(res['returnObject'], 'localityName', 'label', 'childrenLocality', 'children');

            });
    }

    getEvent(i) {
        console.log(i);
        console.log(this.res);
        console.log(this.qshflId);
        this.HttpService.get('zdk/listTree?sjId=CE22671CAA6D49B0BD3071CD63A72B95')
            .then((data) => {
                //console.log(data);
                this.returnDm(data['returnObject'], this.qshflId);
                console.log(this.componentDm);
                console.log(this.componentDm == 'GHXMFL_0101');
                console.log(this.componentDm == 'GHXMFL_0102');
                console.log(this.componentDm == 'GHXMFL_0105');
                if (this.componentDm == 'GHXMFL_0101' || this.componentDm == 'GHXMFL_0102' || this.componentDm == 'GHXMFL_0105') {



                        console.log(this.route);
                    this.Router.navigate(['ghzbArea'], {relativeTo: this.route,queryParams: {ssgcdm: this.res['id'],xmszxzqhdm:i['localityCode'],ssghxmfldm:this.componentDm}})
                } else {
                    console.log(this.route);

                    this.Router.navigate(['ghzbjbxx'],{relativeTo: this.route,queryParams: {ssgcdm: this.res['id'],xmszxzqhdm:i['localityCode'],ssghxmfldm:this.componentDm}})
                }
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
}


