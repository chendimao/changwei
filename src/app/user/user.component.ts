import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    public userInfo = new Object;
    public msgList = new Array;

    constructor() {}

    ngOnInit() {
        this.userInfo = {userName: " admin ", num: 10, time: " 2017-10-1 ", careList: ["泥河水库1", "泥河水库2", "泥河水库3"]};
        this.msgList = ["2017年国庆通知1", "2017年国庆通知2", "2017年国庆通知3"];


    }

}
