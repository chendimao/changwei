import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanrk',
  templateUrl: './scazrk.component.html',
  styleUrls: ['./scazrk.component.css']
})
export class ScazrkComponent implements OnInit {
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
