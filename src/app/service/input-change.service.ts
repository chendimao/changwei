import { Injectable } from '@angular/core';
import {ValuChangeService} from "./valuChange.service";

@Injectable()
export class InputChangeService {

    public name_active_data:any;
    public name_active_key:any;
    public init_data:any;
    public update_data:any;
    public add_data:any;

    public childInfo2;
    public listHcyAdd;


    //规格明细
    public list_ggmx_data_copy;
    public list_ggmx_data;
    public update_ggmx_data;
    public add_ggmx_data;


    constructor(public ValueChangeService:ValuChangeService) { }

    get_select_change(name_active_data,name_active_key,init_data,update_data,add_data){


      console.log(name_active_data);
      console.log(name_active_key);

        this.name_active_data=name_active_data;
        this.name_active_key = name_active_key;
        this.init_data = init_data;
        this.update_data = update_data;
        this.add_data = add_data;

        if(this.name_active_data.id != undefined && this.name_active_data.id != null && this.name_active_data.id != ""){

            let linshiPerson = this.init_data['datalist'];

            linshiPerson.forEach((value,index,arr)=>{

                if( this.name_active_data['id'] == value['id'] ){

                    this.update_data[index] = this.ValueChangeService.changeDate(value, this.name_active_data);
                    this.update_data[index]['id'] = this.name_active_data.id;

                }

            });

            console.log(this.update_data);

        }else{

            if(this.add_data[this.name_active_key] ==undefined ){

                this.add_data[this.name_active_key] = new Object();
            }


            for(var i in this.name_active_data){

                if(this.name_active_data[i] != ""){
                    this.add_data[this.name_active_key][i] = this.name_active_data[i];
                }

            }


        }
        console.log(this.name_active_data);
          console.log(this.add_data);
        return {'update_data':this.update_data,'add_data':this.add_data};

    }



    get_value_change(name_active_data,name_active_key,init_data,update_data,add_data){


        console.log(name_active_data);
        console.log(name_active_key);

        this.name_active_data=name_active_data;
        this.name_active_key = name_active_key;
        this.init_data = init_data;
        this.update_data = update_data;
        this.add_data = add_data;

        if( (this.init_data['datalist'] != undefined || this.init_data['listHcy'] != undefined) && this.name_active_data != undefined && this.name_active_data.cjsj != undefined && this.name_active_data.cjsj !=""){
            console.log(this.name_active_data);
            let linshiPerson = new Array();
            if(this.init_data['datalist'] != undefined){
                 linshiPerson = this.init_data['datalist'];
            }else if(this.init_data['listHcy'] != undefined){
                linshiPerson = this.init_data['listHcy'];
            }

            linshiPerson.forEach((value,index,arr)=>{

                if( this.name_active_data['id'] == value['id'] ){
                    console.log(this.name_active_data);
                    console.log(value['id']);


                    this.update_data[index] = this.ValueChangeService.changeDate(value, this.name_active_data);
                    this.update_data[index]['id'] = this.name_active_data.id;

                }

            });


        }else{
            console.log(this.name_active_data);
            if(this.add_data[this.name_active_key] ==undefined ){

                this.add_data[this.name_active_key] = new Array();
            }


            for(var i in this.name_active_data){


                    this.add_data[this.name_active_key][i] = this.name_active_data[i];



            }

            if(this.name_active_data['flbmxList'] instanceof Array){

                this.add_data[this.name_active_key]['flbmxList'] = this.name_active_data['flbmxList'];

            }


        }
        return {'update_data':this.update_data,'add_data':this.add_data};

    }

//分类信息
    get_add_change(childInfo2,name_active_data,listHcyAdd){
            this.childInfo2 = childInfo2;
            this.name_active_data = name_active_data;
            this.listHcyAdd = listHcyAdd;
        this.childInfo2.forEach((value, index, arr) => {
            console.log(value);
            if (value['id'] == this.name_active_data['qsrId']) {

                if (value['ListFwAdd'] == undefined) {
                    value['ListFwAdd'] = new Array();

                }
                console.log(this.name_active_data['id']);
                value['ListFwAdd'][this.name_active_data['id']] = (this.name_active_data);
                this.listHcyAdd[value['id']] = value;

            }


        });

        return this.listHcyAdd;

    }



    //规格明细

    get_ggmx_change(list_ggmx_data_copy,list_ggmx_data,update_ggmx_data,add_ggmx_data){
        this.list_ggmx_data_copy = list_ggmx_data_copy;
        this.list_ggmx_data = list_ggmx_data;
        this.update_ggmx_data = update_ggmx_data;
        this.add_ggmx_data = add_ggmx_data;


        this.list_ggmx_data.forEach((value, index, arr) => {

            //console.log(value);
            //console.log(index);

            if(value['id'] != ""){
                this.list_ggmx_data_copy.forEach((v,i,a)=>{
                    if(value['id'] == v['id']){

                        this.update_ggmx_data[index] = this.ValueChangeService.changeDate(v, value);
                        this.update_ggmx_data[index]['id'] = v.id;
                        //console.log(this.update_ggmx_data[index]);

                    }
                })
            }else{

                this.add_ggmx_data[index]=value;
            }


        });

        return {'update_data':update_ggmx_data,'add_data':add_ggmx_data};
    }
}
