import { Injectable } from '@angular/core';
import {SelectListHttpService} from "./select-list-http.service";
import {ValuChangeService} from "./valuChange.service";
import {InputChangeService} from "./input-change.service";
import {HttpService} from "./http-service";
import {DataProcessingService} from "./dataProcessing.service";


@Injectable()
export class TabCommonService {

  constructor(public InputChange:InputChangeService,public selectList:SelectListHttpService,public ValuChangeService:ValuChangeService,public HttpService:HttpService, public DataProcessing: DataProcessingService) { }


  public Oninit(data,name_active_data,List,name_active_base,bj_data){

      if(data['returnObject']['datalist'][0] !=undefined ){


        //  name_active_data = [ new TreesData('','','','','','',new Date().getTime(),'','','','',[],'','','','','','','','','','','','','','','','','','','','') ];

          List = data['returnObject']['datalist'];  //户成员信息
          console.log(List);
          name_active_data = List[0];   //默认选中第一个户成员

          if(name_active_data['list'] != undefined){

              name_active_base = name_active_data['list'];
          }else{
             name_active_base = data['returnObject']['baseList'];
          }

          //转换数据格式


          if(bj_data == 1) {
              bj_data = 0;
              List.forEach((value,index,arr)=>{
                  console.log(value);
                  value.list.forEach((val, i, ar) => {
                      ar[i] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(val, 'childList', 'children', '', ''));

                  });
                  console.log(value);
              });
              console.log(  data['returnObject']['baseList'] );


              data['returnObject']['baseList'].forEach((val, i, ar) => {
                  ar[i] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(val, 'childList', 'children', '', ''));

              });



              console.log( data['returnObject']['baseList']);
          }







     }else{
          List = data['returnObject']['datalist'];  //户成员信息
          name_active_data = '';
         name_active_base = '';
      }


      return {data:data,name_active_data:name_active_data,name_active_base:name_active_base,List:List,bj_data:bj_data};



  }



    selectedTypea3(showTable,selectedType3,ggmx,defaultPersons) {


        showTable = selectedType3;
        if(ggmx.length > 0 ){
            if(showTable == 2){
                let defaultPerson = defaultPersons;
                setTimeout(()=>{
                    console.log(defaultPerson);
                    console.log(defaultPerson.last.nativeElement);
                    defaultPerson.first.nativeElement.click();

                },0);
            }
        }

        return {showTable:showTable,selectedType3:selectedType3,defaultPerson:defaultPersons,ggmx:ggmx};

    }





    //选择name改变样式
    selectName(name,i,name_active_key,name_active_data,name_active_base,flxx_is_checked,selectedType3,data,showTable,ggmx,defaultPerson){
        name_active_key = i;
        name_active_data = name;


        selectedType3 = '1';
        this.selectedTypea3(showTable,selectedType3,ggmx,defaultPerson);
        flxx_is_checked = 0;

        console.log(name_active_data);


        if(name_active_data['list'] != undefined){

            name_active_base = name_active_data['list'];
        }else{

            name_active_data['list'] = new Array();
            name_active_data['list'] = JSON.parse(JSON.stringify(data['returnObject']['baseList']))



        }

        return {name_active_base:name_active_base,name_active_data:name_active_data,name_active_key:name_active_key,flxx_is_checked:flxx_is_checked,selectedType3:selectedType3,data:data,showTable:showTable,ggmx:ggmx,defaultPerson:defaultPerson};

    }


  //
  // public addTab(name_active_data,name_active_base,selectPersonList,List){
  //
  //
  //
  //     this.name_active_base = JSON.parse(JSON.stringify(this.init_houses_data['baseList']));
  //
  //     //转换数据格式
  //
  //
  //     this.name_active_base.forEach((value,index,arr)=>{
  //         this.name_active_base[index] = this.DataProcessing.returnTreeTable(this.DataProcessing.replaceChildlValue(value,'childList','children','',''));
  //
  //     });
  //     let name = '';
  //
  //     this.selectPersonList.forEach((value,index,arr)=>{
  //
  //         if(value['value'] == event){
  //
  //             name = value['label'];
  //
  //         }
  //
  //     });
  //
  //
  //
  //
  //
  //     if((typeof this.houesList) != 'undefined' && this.houesList.length>0){
  //         this.houesList.push(new TreesData('','','','','','',new Date().getTime(),'','',event,'',[],'','','','','','','','','','','','','','','',name,'','','',''));
  //         this.name_active_data = this.houesList[this.houesList.length-1];
  //         this.name_active_key = this.houesList.length-1;
  //
  //     }else{
  //         this.houesList.push(new TreesData('','','','','','',new Date().getTime(),'','',event,'',[],'','','','','','','','','','','','','','','',name,'','','',''));
  //         this.name_active_data = this.houesList[0];
  //
  //     }
  //
  //
  //
  //
  //     this.selectName(this.name_active_data,this.name_active_key);
  //
  //
  //
  //     if(this.name_active_data.qsrId.toString().length != 32) { // 如果权属人ID等于32位也就是说 在数据库中已经存在的户成员
  //
  //         console.log(this.listHcyAdd);
  //         this.listHcyAdd = this.InputChange.get_add_change(this.childInfo2,this.name_active_data,this.listHcyAdd,'ListFwAdd');
  //
  //         console.log(this.listHcyAdd);
  //
  //     }else{
  //
  //         let res = this.InputChange.get_value_change(this.name_active_data,this.name_active_key,this.init_houses_data,this.update_houses_data,this.add_houses_data);
  //
  //         this.add_houses_data = res['add_data'];
  //         this.update_houses_data = res['update_data'];
  //     }
  //
  //
  //
  //     //将户成员基本信息带到房屋基本信息中
  //     this.childInfo2.forEach((value,index,arr)=>{
  //
  //         if(value['id'] == this.name_active_data['qsrId']){
  //             for(var i in value){
  //                 for(var ii in this.name_active_data){
  //                     if(i == ii && i != 'id' && i != 'cjsj'){
  //                         this.name_active_data[ii] = value[i];
  //                     }
  //                 }
  //             }
  //             if(value['szxzqhdm'] !=null){
  //                 this.name_active_data['swszxzqhdm'] = value['szxzqhdm'];
  //                 this.name_active_data['swszxzqhmc'] = value['xzqhmc'];
  //             }
  //
  //         }
  //
  //
  //     });
  //
  //
  //
  //
  //     //关闭下拉框
  //     this.displaySelectPserson = false;
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // }







}
