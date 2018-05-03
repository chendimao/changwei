import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from "../../service/http-service";
import {ProjectInfoService} from "../service/projectInfo..service";

@Component({
    selector: 'app-eng-mang-nav',
    templateUrl: './eng-mang-nav.component.html',
    styleUrls: ['./eng-mang-nav.component.css'],
    providers: [HttpService]
})
export class EngMangNavComponent implements OnInit {
    private display: boolean = false;
    data: any;
    index: string;
    private projectId: string;
    private cur_index = new Object();
    private navList = new Array();
    public projectName: string;
    public navType: string = '1';
    public width: string = '180px';
    private msgs: any;
    private qzgzqkgz: boolean = false;

    @Output() childEvent = new EventEmitter<any>();

    constructor(private projectInfo: ProjectInfoService, private route: ActivatedRoute, private HttpService: HttpService) {
    }

    ngOnInit() {
        this.HttpService.get(`gcgkjbxx/get?projectId=${this.projectInfo.project.id}`)
            .then((res) => {
                console.log(res);
                if (res['returnObject']['gcgkjbxx']) {
                    this.qzgzqkgz = true;
                    this.projectInfo.project.ssgcgkjbxxId = res['returnObject']['gcgkjbxx']['id'];
                    console.log(this.projectInfo.project.ssgcgkjbxxId);
                }
            });


        this.HttpService.get(`zdk/list?sjId=443C3162A4554323AFB04EE7AEF7F164`)
            .then((res) => {
                console.log(res);
                this.navList = res['returnObject'];
            });
        this.projectId = this.route.queryParams['value'].id;
        this.projectName = this.route.queryParams['value'].name;


        console.log(this.projectId == null);
        if (this.projectId == null) {
            this.projectId = this.route.snapshot.children[0].params.id;
        }
        console.log(this.route.snapshot.children[0].params.id);

    }


    closeNav(): void {
        console.log('关闭导航');
        this.navType = '2';
        this.width = '50px';
        this.childEvent.emit('50');
    }

    openNav(): void {
        this.navType = '1';
        this.width = '180px';
        this.childEvent.emit('180');
    }


    showNav(i): void {
        this.cur_index = i;
        this.display = true;
        this.data = ['emgList', i.dm, i.mc, this.projectId];
    }

    closeNavList() {
        console.log('关闭菜单');
        this.display = false;
    }

    getChildEvent(i): void {
        this.display = false;
    }

    //  没有基本信息不让点击前期工作概况
    warning() {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: '填入提醒', detail: "请先编辑工程基本信息概况"});
    }

}
