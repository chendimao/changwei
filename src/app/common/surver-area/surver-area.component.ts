import {Component, OnInit, ElementRef, Input, Output, EventEmitter, ViewChildren} from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-surver-area',
    templateUrl: './surver-area.component.html',
    styleUrls: ['./surver-area.component.css']
})
export class SurverAreaComponent implements OnInit {
    @Input() values;
    @Output() childEvent = new EventEmitter<any>();

    @ViewChildren('surver') todoName: ElementRef;


    constructor(public elementRef: ElementRef) {
    }

    ngAfterViewInit() {

        // var select=this.elementRef.nativeElement.querySelectorAll('.threeChild');
        // for(var i in select){
        //     console.log(select[i]);
        //     select[i].onclick=function () {
        //         console.log(this.parentNode.parentNode);
        //     }
        // }


    }

    ngOnInit() {
        console.log('ngAfterViewInit执行了····');
        // $('#zydltitle11').on('click', function (e) {
        //     console.log(1);
        //     console.log($(this).html());
        // })

    }

    ceshi(e) {
        console.log(e.target);
        console.log($('#zydltitle11').html());

    }


}

