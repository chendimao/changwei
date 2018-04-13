import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HttpService} from "../../service/http-service";

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css'],
    providers: [HttpService]
})
export class PaginatorUserComponent implements OnInit {
    @Input() totalPage;
    @Input() count;
    @Input() url;
    @Output() pageSelect = new EventEmitter();

    constructor(private HttpService: HttpService) {
    }

    ngOnInit() {
        console.log(this.url);
    }

    ngOnchange() {
        console.log(this.url);
    }

    paginate(value) {
        let resUrl: string;
        resUrl = `${this.url}&start=${value.first + 1}&limit=${value.rows}`;
        console.log(value);
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

}
