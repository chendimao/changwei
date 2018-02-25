import {Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {FgczdxpzxqComponent} from "./fgczdxpzxq.component";
import {HttpService} from "../../../service/http-service";
import {flyIn} from "../../../animations/fly-in";
import {DelWaringComponent} from "../../../common/del-waring/del-waring.component";
import {SearchService} from "../../../service/search.service";

@Component({
    selector: 'app-fgczdxpz',
    templateUrl: './fgczdxpz.component.html',
    styleUrls: ['./fgczdxpz.component.css'],
    providers: [HttpService, SearchService],
    animations: [flyIn]
})
export class FgczdxpzComponent implements OnInit {
    private cars: any;
    private selectItem: any;
    private projectCode: string;
    private msgs = [];
    private gcUrl = 'gczc/allList';

    constructor(private SearchService: SearchService, private HttpService: HttpService, private AlertModel: ComponentFactoryResolver) {
    }

    @ViewChild('pdialog', {read: ViewContainerRef}) AlertBox: ViewContainerRef;

    ngOnInit() {
        this.msgs = [];
        this.msgs.push({severity: 'warn', summary: '填入提醒', detail: '请选择工程'});
    }

    addAlert(i) {
        if (this.projectCode) {
            if (i === 'add') {
                const alert = this.AlertModel.resolveComponentFactory(FgczdxpzxqComponent);
                const model = this.AlertBox.createComponent(alert);
                model.instance.projectId = this.projectCode;
                model.instance.type = i;
            } else {
                if (this.selectItem) {
                    const alert = this.AlertModel.resolveComponentFactory(FgczdxpzxqComponent);
                    const model = this.AlertBox.createComponent(alert);
                    model.instance.info = this.selectItem;
                    model.instance.projectId = this.projectCode;
                    model.instance.type = i;

                } else {
                    this.msgs = [];
                    this.msgs.push({severity: 'warn', summary: '填入提醒', detail: '请选择数据项'});
                }
            }
        } else {
            this.msgs = [];
            this.msgs.push({severity: 'warn', summary: '填入提醒', detail: '请选择工程'});
        }
    }

    delZdxpz(e) {

        console.log("删除所选项");
        this.AlertBox.clear();
        if (this.selectItem.code == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请选择删除项'});
        } else {
            const delmodel = this.AlertModel.resolveComponentFactory(DelWaringComponent);
            const delModelbxo = this.AlertBox.createComponent(delmodel);
            delModelbxo.instance.message = "删除当前选择项(删除后数据无法恢复)";
            delModelbxo.instance.url = 'xtfqhzdx/delete?id=' + this.selectItem.code;
            delModelbxo.instance.confirm();
        }
    }

    onRowSelect(event) {
        console.log(event);
        this.selectItem = event.data;
        console.log(this.selectItem);

    }

    getProjectId(i) {
        this.HttpService.get('xtfqhzdx/list')
            .then(res => {
                console.log(res['returnObject']);
                const projectList = res['returnObject'];
                this.cars = this.SearchService.searchByRegExp(i['code'], projectList, 'code')[0]['list'];
            });
        this.projectCode = i;
        console.log(i);
    }

}
