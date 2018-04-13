import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../../service/http-service";
import {DataProcessingService} from "../../../../service/dataProcessing.service";
import {SearchService} from "../../../../service/search.service";
import {ActivatedRoute} from "@angular/router"

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

    constructor(private SearchService: SearchService, private router: ActivatedRoute, private HttpService: HttpService, private DataProcessingService: DataProcessingService) {
        this.router.params.subscribe(res => {
            this.HttpService.get(`zdk/list?sjId=443C3162A4554323AFB04EE7AEF7F164`)
                .then((data) => {
                    console.log(data);
                    let lsArr = this.SearchService.searchByRegExp(data['jddm'], data['returnObject'], 'dm');
                    console.log(lsArr);
                    this.secNav = lsArr[0].mc;
                    this.getParem.jdId = lsArr[0].id;
                    this.getParem.jddm = res['jddm'];
                    this.getParem.ssgcdm = res['id'];
                    this.getParem.id = res['qshflId'];

                    console.log(this.getParem.id);
                    console.log(this.secNav);
                    this.breadcrumb = [
                        {label: '首页', routerLink: '/engmang'},
                        {label: this.secNav},
                        {label: '投资概算'},
                        {label: res['item']}
                    ];

                    console.log(this.breadcrumb);
                    console.log('路由在改变');

                })
        })
    }

    openModal() {
        this.display1 = true;
    }

    closeModal() {
        this.display1 = false;
    }

    ngOnInit() {

        this.HttpService.get(`locality/listTree`)
            .then(res => {
                this.treelist = this.DataProcessingService.replaceChildlList(res['returnObject'], 'localityName', 'label', 'childrenLocality', 'children');

            });
    }


}
