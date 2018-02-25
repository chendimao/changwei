import { Component, OnInit } from '@angular/core';
import {TabViewModule} from 'primeng/primeng';

@Component({
  selector: 'app-ysqk',
  templateUrl: './ysqk.component.html',
  styleUrls: ['./ysqk.component.css']
})
export class YsqkComponent implements OnInit {
  ch:any;
  index:number=1;
  private active:string;


  constructor() { }

  ngOnInit() {
      this.active='1';
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
  select(i){
      this.active=i;
  }
  tab(i){
      this.index=i;
  }

}
