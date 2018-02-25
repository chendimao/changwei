import {Injectable} from '@angular/core';

@Injectable()

export class ValuChangeService {
    public obj = {};

    changeDate(begin, change, confuInfo) {
        console.log(confuInfo);
        for (var i in begin) {
            if (change[i] != confuInfo[i]) {
                this.obj[i] = change[i];
                if (begin[i] != change[i]) {
                    this.obj[i] = change[i];
                }
            }
        }
        return this.obj;
    }
}