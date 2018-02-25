import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpService} from "../../../service/http-service";

@Component({
    selector: 'app-bddsjlb',
    templateUrl: './bddsjlb.component.html',
    styleUrls: ['./bddsjlb.component.css'],
    providers: [HttpService]
})
export class BddsjlbComponent implements OnInit {
    private bddsjlx = new Array;
    @Output() ChilEventOut = new EventEmitter;


    constructor(private HttpService: HttpService) {
    }

    ngOnInit() {
        this.HttpService.get('zdk/bindDataType')
            .then(res => {
                console.log(res['returnObject']);
                this.bddsjlx = res['returnObject'];
            });

    }

    OutputValue(i) {
        this.ChilEventOut.emit(i);
    }

}
