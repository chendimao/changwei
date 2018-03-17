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
    @Input() selectValue;
    @Input() isEdit;
    @Input() width;
    @Input() search;
    @Input() placeholderValue;
    @Input() disabled;
    @Output() SelectModel = new EventEmitter;
    public reswidth;
    public selected;
    public isdisabled: boolean = false;

    constructor(private HttpService: HttpService) {

    }

    ngOnInit() {


        // if(this.values){
        //     console.log(this.values[0]);
        //
        //     this.values.forEach((value,index,arr)=>{
        //
        //         if(value['value']['id'] == this.selectValue){
        //             this.selected = value['value']['id'];
        //         }
        //
        //     });
        //
        //
        //
        // }else{
        //
        //
        // }
        this.selected = this.selectValue;
        console.log(this.values);
        console.log(this.selectValue);

        this.reswidth = `calc(100% - ${this.width}px)`;
    }

    ngOnChanges() {

        if (this.values != undefined) {
            if (this.disabled) {
                this.isdisabled = true;
            } else {
                if (this.values.length == 1) {

                    this.isdisabled = true;
                    this.selected = this.values[0].value;
                } else {
                    this.isdisabled = false;
                    this.selected = this.selectValue;
                  //  this.selected = 'HHR-07';


                }
            }

        }

    }

    OutPutValue(value) {

        this.SelectModel.emit(value);
    }

}
