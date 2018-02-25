import { Component, OnInit } from '@angular/core';
import {CheckboxModule} from 'primeng/primeng';
@Component({
  selector: 'app-tzgs',
  templateUrl: './tzgs.component.html',
  styleUrls: ['./tzgs.component.css']
})
export class TzgsComponent implements OnInit {
    // 加的加载
    isShowRight: boolean = false;
    defaultShow: boolean = true;
  constructor() { }

  ngOnInit() {
  }
    getEvent(event) {
        this.isShowRight = event;
        this.defaultShow = false;
    }
}
