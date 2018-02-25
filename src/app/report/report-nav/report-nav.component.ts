import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {DialogModule, MessagesModule, Message} from 'primeng/primeng';

@Component({
    selector: 'app-report-nav',
    templateUrl: './report-nav.component.html',
    styleUrls: ['./report-nav.component.css']
})
export class ReportNavComponent implements OnInit {
    show:boolean=false;
    data:string;
    index:string;
    @Output() childEvent = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    // goback(): void {
    //     history.back();
    //
    // }

    public navType: string = '1';
    public width: string = '180px';

    closeNav(): void {
        console.log('关闭导航');
        this.navType = '2';
        this.width = '50px';
         this.childEvent.emit('2');
    }

    openNav(): void {
        this.navType = '1';
        this.width = '180px';
        this.childEvent.emit('1');
    }
    routClick(e){
        console.log(e);
    }
    showNav(i):void{
        this.index=i;
        this.show=true;
        this.data=i;
    }

    getChildEvent(i):void{
        this.show=i ;
    }


}
