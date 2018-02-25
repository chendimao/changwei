import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-waring',
    templateUrl: './waring.component.html',
    styleUrls: ['./waring.component.css']
})
export class WaringComponent implements OnInit {
    private msgs: string;
    private distance: any;
    @Input() msg: string;

    constructor() {
    }

    ngOnInit() {
        console.log(this.msg);
        if (this.msg == null) {
            this.msgs = "欢迎使用福建省水利水电工程建设征地移民安置管理信息系统工程管理模块";
            this.distance = '15px';
        } else {
            this.msgs = " 请先选择地区范围";
            this.distance = '0';
        }

    }


}
