/**
 * Created by hou on 2017/9/27.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTrans'
})
export class DateTrans implements PipeTransform {

  transform(value: any, args?: any): any {


    var date =  new Date(value);

    var y = date.getFullYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);

  }
}
