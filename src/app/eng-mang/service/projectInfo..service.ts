import {Injectable} from '@angular/core';


@Injectable()
export class ProjectInfoService {
    public project = new projectInfo;

    sendProjectInfo(info) {
        console.log(info);
        this.project['ssxtdm'] = "X000001";
        for (let key in info) {
            this.project[key] = info[key];
        }
    }
}

export class projectInfo {
    name: string;
    code: string;
    ssxtdm: string;
    id: string;
    ssgcgkjbxxId: string;
}