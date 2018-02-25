import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ConfirmationService, Message} from "primeng/primeng";
import {ShareService} from "../../systemSetting/service/share.service";
import {HttpService} from "../../service/http-service";

@Component({
    selector: 'app-del-waring',
    templateUrl: './del-waring.component.html',
    styleUrls: ['./del-waring.component.css'],
    providers: [ConfirmationService, HttpService]
})
export class DelWaringComponent implements OnInit {
    public message: string;
    public url: string;
    @ViewChild('cd') btn: ElementRef;


    msgs: Message[] = [];

    constructor(private confirmationService: ConfirmationService, private HttpService: HttpService, private ShareService: ShareService) {
    }

    ngOnInit() {
    }

    confirm() {
        this.confirmationService.confirm({
            message: this.message,
            accept: () => {
                this.HttpService.get(this.url)
                    .then(res => {
                        console.log(res);
                        this.ShareService.sendMessage({
                            severity: 'success', summary: '删除提醒', detail: '删除成功', display: 'true'
                        });
                    })
                    .catch(res => {
                        console.log(res);
                        this.ShareService.sendMessage({
                            severity: 'error', summary: '删除提醒', detail: '删除失败', display: 'false'
                        });
                    })
            },
            reject: () => {

            }
        });
    }
}


