import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpService {

    constructor(public http: Http) {

    }

    private defaultUrl = "http://115.28.69.231:8090/LARMS_SERVER/";

    get(URL, header = null) {
        var options = null;

        if (header != null) {

            let headers = new Headers({
                'Authorization': 'Bearer ' + header
            });
            options = new RequestOptions({
                headers: headers
            });

        }
        return new Promise((resolve, reject) => {
            this.http.get(this.defaultUrl + URL, options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    reject(err);
                })
        })
    }


    post(URL, data) {
        console.log(data);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({
            headers: headers
        });
        return new Promise((resolve, reject) => {
            this.http.post(this.defaultUrl + URL, data, options)
                .map(res => res.json())
                .subscribe(data => resolve(data), err => reject(err))


        })
    }

}







