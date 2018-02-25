import {Component, OnInit} from '@angular/core';
import {FileUploadModule} from 'primeng/primeng';
import { flyIn } from '../../animations/fly-in';

@Component({
    selector: 'app-project-proposal',
    templateUrl: './project-proposal.component.html',
    styleUrls: ['./project-proposal.component.css'],
    animations: [ flyIn ]
})
export class ProjectProposalComponent implements OnInit {
    private index: number = 1;
    private ch;
    private value1: Date;
    private isShow1:boolean=true;


    constructor() {
    }

    ngOnInit() {
        this.ch = {
            firstDayOfWeek: 0,
            dayNames: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesShort: ['天', '一', '二', '三', '四', '五', '六'],
            dayNamesMin: ['天', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
            today: '今天',
            clear: '清除',
        };
    }


    tab(index) {
        this.index = index;
        console.log(index);
    }

    time() {
        console.log(this.value1);

    }
    showAll(i){
        if (this.isShow1) {
            this.isShow1 = false;
        } else {
            this.isShow1 = true;
        }
    }

}
