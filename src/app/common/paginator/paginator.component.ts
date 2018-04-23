import {Component, OnInit, Input, Output, EventEmitter,ViewChild} from '@angular/core';
import {HttpService} from "../../service/http-service";
import { Paginator } from "../../../assets/_primeng@4.2.1@primeng/components/paginator/paginator";

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css'],
    providers: [HttpService]
})
export class PaginatorUserComponent implements OnInit {
    @Input() condition;
    @Input() totalPage;
    @Input() count;
    @Input() url;
    @Output() pageSelect = new EventEmitter();
    @ViewChild('paginator') paginator1:Paginator;
    constructor(private HttpService: HttpService) {

    }

    ngOnInit() {
        console.log(this.url);
        console.log(this.paginator1);
        console.log(this.totalPage);
        console.log(this.count);
    }

    ngOnChanges() {

        console.log(this.totalPage);
        console.log(this.count);
        console.log(this.url);
        console.log("输入值有改变");
        if(this.condition){
            if(this.condition.start==1){
                this.paginator1.first=1;
            }
        }


    }

    paginate(value) {
        console.log(this.condition);
        console.log(value);
        console.log(this.url);
        this.condition.start=value.first+1;
        this.condition.limit=value.rows;
        let resUrl=this.url+'?'+this.transString(this.condition);
        console.log(resUrl);
       this.HttpService.get(resUrl)
            .then(res => {
                let obj={
                    "value":value,
                    "data":res,
                }
                this.pageSelect.emit(obj);
            });
    }
    //把object对象转成get用的字符串格式
    transString(list) {
        let arr = [];
        for (var key in list) {
            var str = key + "=" + list[key];
            arr.push(str);
        }
        var params = arr.join("&");
        return params;
    }

}
