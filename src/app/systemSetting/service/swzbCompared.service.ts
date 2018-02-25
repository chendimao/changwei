import {Injectable} from '@angular/core';


@Injectable()
export class SwzbComparedService {
    private idList = [];


    getId(rightTable) {
        for (let item of rightTable) {
            let ls = {};
            if (item.children) {
                ls['id'] = item.data.zdxId;
                this.idList.push(ls);
                this.getId(item.children);
            } else {
                ls['id'] = item.data.zdxId;
                this.idList.push(ls);
            }
        }
        return this.idList;
    }

    closeSame(leftTable, idList) {
        for (let rightItem of idList) {
            console.log(rightItem.id);
            for (let leftItem  of leftTable) {
                if (leftItem.children) {
                    if (rightItem.id === leftItem.data.zdxId) {
                        console.log(rightItem.id);
                        console.log(leftItem.data.zdxmc + "这一项禁止");
                    }
                    this.closeSame(leftItem.children, idList);
                } else {
                    if (rightItem.id === leftItem.data.zdxId) {
                        console.log(rightItem.id);
                        console.log(leftItem.data.zdxmc + "这一项禁止");
                    }
                }


            }
        }
    }

    SwzbCompared(rightTable, leftTable) {
        this.idList = this.getId(rightTable);
        this.closeSame(leftTable, this.idList);

    }
}