import { Component, OnInit } from '@angular/core';
import {DialogModule, MessagesModule, Message, SelectButtonModule, SelectItem, LightboxModule} from 'primeng/primeng';
@Component({
  selector: 'app-ndjh',
  templateUrl: './ndjh.component.html',
  styleUrls: ['./ndjh.component.css']
})
export class NdjhComponent implements OnInit {
    display:boolean=false;
    show:number=1;
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
    openModule(){
        this.display=true;
        console.log(1);
    }
    closeModule(){
        this.display=false;
    }
    tabNav(i){
       this.show=i;
    }

}
