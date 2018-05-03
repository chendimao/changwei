import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { HttpService } from "../../service/http-service";
import { SearchService } from "../../service/search.service";
import { ProjectInfoService } from "../service/projectInfo..service";

@Component({
    selector: 'app-eng-mang',
    templateUrl: './eng-mang.component.html',
    styleUrls: ['./eng-mang.component.css'],
})
export class EngMangHomeComponent implements OnInit {
    private show: any;
    private AllProject: any;
    private AllProjectCount: number;
    private Dzxsk;
    private DzxskCount: number;
    private Xxsk;
    private XxskCount: number;
    private Fhydsk;
    private FhydskCount: number;
    private CareList;
    private CareListCount: number;
    private SearchList = new Array();
    private SearchListCount: number;
    private init_list = new Array();
    private showIndex: string = 'all';
    private ProjectList = new Array();
    private searcRest: boolean = true;


    constructor(private projectInfo:ProjectInfoService, private SearchService: SearchService, private HttpService: HttpService, private router: Router) {
    }

    ngOnInit() {
        this.HttpService.get('gczc/allList')
            .then((data) => {
                console.log(data['returnObject']);
                this.init_list = JSON.parse(JSON.stringify(data['returnObject']));
                this.AllProject = data['returnObject'];
                this.AllProjectCount = this.AllProject.length;
                this.Dzxsk = this.SearchService.searchByRegExp('01', this.AllProject, 'projectTypeCode');
                this.DzxskCount = this.Dzxsk.length;
                this.Xxsk = this.SearchService.searchByRegExp('02', this.AllProject, 'projectTypeCode');
                this.XxskCount = this.Xxsk.length;
                this.Fhydsk = this.SearchService.searchByRegExp('03', this.AllProject, 'projectTypeCode');
                this.FhydskCount = this.Fhydsk.length;
                this.CareList = this.SearchService.searchByRegExp('99', this.AllProject, 'projectTypeCode');
                this.CareListCount = this.CareList.length;
            })

    }

    tab(id): void {
        this.showIndex = id;
        this.searcRest = true;
    }

    jump(list): void {
        console.log(list);
        let info={
            name:list.name,
            code:list.code,
            id:list.id,
            ssgcgkjbxxId: null,
        };
        this.projectInfo.sendProjectInfo(info)
        this.router.navigate(['/engmang/info'], {queryParams: {id: list.id, name: list.name}});
    }

    searchList(e, key) {
        if (e.keyCode == 13 || e == 'click') {
            console.log(key==null);
            if (key === '') {
                this.searcRest = true;
            } else {
                this.SearchList = this.SearchService.searchByRegExp(key, this.init_list, 'name');
                this.SearchListCount = this.SearchList.length;
                this.searcRest = false;
            }

        }
    }

}



