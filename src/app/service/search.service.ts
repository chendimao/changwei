import {Injectable} from '@angular/core';

@Injectable()
export class SearchService {
    constructor() {

    }

    searchByRegExp(keyWord, list, zd) {
        if (!(list instanceof Array)) {
            return;
        }
        var len = list.length;
        var arr = [];
        var reg = new RegExp(keyWord);
        for (var i = 0; i < len; i++) {
            if (list[i][zd].match(reg)) {
                arr.push(list[i]);
            }
        }
        console.log(arr);
        return arr;
    }

}