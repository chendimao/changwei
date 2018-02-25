import {Injectable} from '@angular/core';
import {HttpService} from "../../service/http-service";
import {ShareService} from "./share.service";
import {Observable} from "rxjs/Observable";
import {Subject} from 'rxjs/Subject';


@Injectable()
export class SaveService {
    private msgs: any;
    private observable = new Observable;
    private Subject = new Subject;

    constructor(public HttpService: HttpService, public ShareService: ShareService) {
        console.log();
    }

    // 参数介绍 item：项目信息，i：保存还是继续增加，url：修改的地址,
    //传的值介绍 severity,summary,detail:为提示弹窗的内容，display：弹窗是否展示，clear：是否为清空内容继续新增
    save(item, i, url, itemModel) {
        // console.log(jb);
        console.log(item);
        console.log(i);
        console.log(url);
        console.log(itemModel);
        if ('id' in item) {
            console.log("这是在修改");
            //这是修改数据
            const defurl = url['update'];
            this.HttpService.post(defurl, JSON.stringify(item))
                .then(res => {
                    if (res['success'] == true) {
                        if (i == 'add') {
                            item = new itemModel;
                            this.ShareService.sendMessage({
                                severity: 'success', summary: '填入提醒', detail: '修改成功', display: 'true', clear: 'true'
                            });
                        } else {
                            this.ShareService.sendMessage({
                                severity: 'success', summary: '填入提醒', detail: '修改成功', display: 'false'
                            });
                        }
                    } else {
                        this.ShareService.sendMessage({
                            severity: 'error', summary: '填入提醒', detail: `${res['errorMessage']}`, display: 'true'
                        });
                    }
                });
        } else {
            console.log("这是在增加");
            const defurl = url['add'];
            this.HttpService.post(defurl, JSON.stringify(item))
                .then(res => {
                    if (res['success'] == true) {
                        if (i == 'add') {
                            // item = new itemModel;
                            this.ShareService.sendMessage({
                                severity: 'success', summary: '填入提醒', detail: '新增成功', display: 'true', clear: 'clear'
                            });

                        } else {
                            this.ShareService.sendMessage({
                                severity: 'success', summary: '填入提醒', detail: '新增成功', display: 'false'
                            });
                        }
                    } else {
                        this.ShareService.sendMessage({
                            severity: 'error', summary: '填入提醒', detail: `${res['errorMessage']}`, display: 'true'
                        });
                    }
                })
                .catch(res => {
                    console.log("数据错误");
                })
        }


    }
}