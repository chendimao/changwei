import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {HttpService} from "../../service/http-service";


@Component({
    selector: 'app-select-list',
    templateUrl: './select-list.component.html',
    styleUrls: ['./select-list.component.css'],
    providers: [HttpService]
})
export class SelectListComponent implements OnInit {
    @Input() values = new Array;
    @Input() isEdit;
    @Input() width;
    @Input() search;
    @Input() placeholderValue;
    @Input() disabled;
    @Output() SelectModel = new EventEmitter;
    private reswidth;
    private selected;
    private isdisabled: boolean = false;

    constructor(private HttpService: HttpService) {

    }

    ngOnInit() {
        this.reswidth = `calc(100% - ${this.width}px)`;
    }

    ngOnChanges() {
        console.log(this.values);
        if (this.values != undefined) {
            if (this.disabled) {
                this.isdisabled = true;
            } else {
                if (this.values.length == 1) {

                    this.isdisabled = true;
                    this.selected = this.values[0].value;
                } else {
                    this.isdisabled = false;
                }
            }

            console.log(this.SelectModel);
        }

    }

    OutPutValue(value) {

        this.SelectModel.emit(value);
    }

}
