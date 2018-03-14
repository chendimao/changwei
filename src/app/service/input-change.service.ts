import { Injectable } from '@angular/core';
import {ValuChangeService} from "./valuChange.service";

@Injectable()
export class InputChangeService {

    public name_active_data:any;
    public name_active_key:any;
    public init_data:any;
    public update_data:any;
    public add_data:any;


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
        if( this.init_data['datalist'] != undefined && this.name_active_data != undefined && this.name_active_data.cjsj !=""){
            console.log(this.name_active_data);
            let linshiPerson = this.init_data['datalist'];
            linshiPerson.forEach((value,index,arr)=>{

                if( this.name_active_data['id'] == value['id'] ){

                    this.update_data[index] = this.ValueChangeService.changeDate(value, this.name_active_data);
                    this.update_data[index]['id'] = this.name_active_data.id;

                }

            });


        }else{

            if(this.add_data[this.name_active_key] ==undefined ){

                this.add_data[this.name_active_key] = new Array();
            }


            for(var i in this.name_active_data){

                if(this.name_active_data[i] != ""){
                    this.add_data[this.name_active_key][i] = this.name_active_data[i];
                }

            }


        }
        return {'update_data':this.update_data,'add_data':this.add_data};

    }
}
