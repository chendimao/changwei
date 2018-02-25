import {Pipe, PipeTransform} from '@angular/core';
import {HttpService} from "../service/http-service";

@Pipe({
    name: 'jldwlist',

})
export class JldwlistPipe implements PipeTransform {
    constructor(private HttpService: HttpService) {

    }

    transform(value: any, args?: any): any {
        console.log(value);
        this.HttpService.get('xtswzbfl/listJldw')
            .then(res => {
                let id = res['returnObject'];
                for (var i = 0; i < id.length; i++) {
                    console.log(id[i].id === value);
                    if (id[i].id === value) {
                        console.log(id[i].mc);
                        value = id[i].mc;
                        return  value;
                    }
                }
            });

    }
}
