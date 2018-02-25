import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cardReform'
})
export class CardReformPipe implements PipeTransform {

    transform(value: any, args?: any): any {


        let year=value.substr(6,4);
        let yue=value.substr(10,2);
        let day=value.substr(12,2);

        return year+'-'+yue+'-'+day;
    }
}
