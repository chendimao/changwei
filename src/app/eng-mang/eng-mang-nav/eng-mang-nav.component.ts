import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DialogModule, MessagesModule, Message} from 'primeng/primeng';


@Component({
    selector: 'app-eng-mang-nav',
    templateUrl: './eng-mang-nav.component.html',
    styleUrls: ['./eng-mang-nav.component.css'],
})
export class EngMangNavComponent implements OnInit {
    private display: boolean = false;
    data: any;
    index: string;
    private projectId: string;
    private projectName: string;
    public navType: string = '1';
    public width: string = '180px';

    @Output() childEvent = new EventEmitter<any>();

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.projectId = this.route.queryParams['value'].id;
        this.projectName = this.route.queryParams['value'].name;
        console.log(this.projectId == null);
        if (this.projectId == null) {
            this.projectId = this.route.snapshot.children[0].params.id;
        }
        console.log(this.route.snapshot.children[0].params.id);

    }

    ngAfterViewInit() {
        // this.projectId = this.route.queryParams['value'].id;
        // this.projectName = this.route.queryParams['value'].name;
        // console.log(this.route.queryParams['value']);
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
        this.index = i;
        this.display = true;
        this.data = ['emgList', i, this.projectId];
    }

    closeNavList() {
        console.log('关闭菜单');
        this.display = false;
    }

    getChildEvent(i): void {
        this.display = false;
    }


}
