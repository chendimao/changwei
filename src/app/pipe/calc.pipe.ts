import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'calcpipe'
})
export class CalcPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        console.log(value);

        return value;
    }
}
