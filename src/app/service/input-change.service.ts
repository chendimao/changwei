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
    private sizes = 0;
    private sizes_tag = 1;

    public base_flg ;
    public flxx_arr = new Array();
    public init_flxx_arr = new Array();


    public toggle_flxx_add = new Array();

    public test;
    private base_flg2;



    constructor(public ValueChangeService:ValuChangeService) { }

    get_select_change(name_active_data,name_active_key,init_data,update_data,add_data){


      console.log(name_active_data);
      console.log(name_active_key);

        this.name_active_data=name_active_data;
        this.name_active_key = name_active_key;
        this.init_data = init_data;
        this.update_data = update_data;
        this.add_data = add_data;


        if(this.name_active_data.id != undefined && this.name_active_data.id != null && this.name_active_data.id.toString().length == 32){
            //console.log(this.init_data);
            let linshiPerson = new Array();
            if(this.init_data['datalist'] != undefined){
                linshiPerson = this.init_data['datalist'];
            }else if(this.init_data['listHcy'] != undefined){
                linshiPerson = this.init_data['listHcy'];
            }else{
                linshiPerson = this.init_data;

            }
            linshiPerson.forEach((value,index,arr)=>{

                if( this.name_active_data['id'] == value['id'] ){

                    this.update_data[index] = this.ValueChangeService.changeDate(value, this.name_active_data);
                    this.update_data[index]['id'] = this.name_active_data.id;

                }

            });

           // console.log(this.update_data);

        }else{


                  if(this.add_data[this.name_active_data['id']] ==undefined ){

                this.add_data[this.name_active_data['id']] = new Array();
            }


            for(var i in this.name_active_data){

                if(this.name_active_data[i] != "" && this.name_active_data[i] != null){
                    this.add_data[this.name_active_data['id']][i] = this.name_active_data[i];
                }

            }


        }
        //console.log(this.name_active_data);
        //  console.log(this.add_data);
        return {'update_data':this.update_data,'add_data':this.add_data};

    }



    get_value_change(name_active_data,name_active_key,init_data,update_data,add_data){


        //console.log(name_active_data);
       // console.log(name_active_key);

        this.name_active_data=name_active_data;
        this.name_active_key = name_active_key;
        this.init_data = init_data;
        this.update_data = update_data;
        this.add_data = add_data;

        if( this.init_data != undefined && (this.init_data['datalist'] != undefined || this.init_data['listHcy'] != undefined) && this.name_active_data != undefined && this.name_active_data.cjsj != undefined && this.name_active_data.cjsj !=""){
            //console.log(this.name_active_data);
            //console.log( this.name_active_data.cjsj);
            let linshiPerson = new Array();
            if(this.init_data['datalist'] != undefined){
                 linshiPerson = this.init_data['datalist'];
            }else if(this.init_data['listHcy'] != undefined){
                linshiPerson = this.init_data['listHcy'];
            }else{
                linshiPerson = this.init_data;

            }

            linshiPerson.forEach((value,index,arr)=>{

                if( this.name_active_data['id'] == value['id'] ){
                 //   console.log(this.name_active_data);
                 //   console.log(value['id']);


                    this.update_data[index] = this.ValueChangeService.changeDate(value, this.name_active_data);
                    this.update_data[index]['id'] = this.name_active_data.id;

                }

            });


        }else{

          //  console.log(this.name_active_data);
            if(this.add_data[this.name_active_data['id']] ==undefined ){

                this.add_data[this.name_active_data['id']] = new Array();
            }


            for(var i in this.name_active_data){


                    this.add_data[this.name_active_data['id']][i] = this.name_active_data[i];



            }

            if(this.name_active_data['flbmxList'] instanceof Array){

                this.add_data[this.name_active_data['id']]['flbmxList'] = this.name_active_data['flbmxList'];

            }


        }
        return {'update_data':this.update_data,'add_data':this.add_data};

    }

//分类信息
    get_add_change(childInfo2,name_active_data,listHcyAdd,url){
            this.childInfo2 = childInfo2;
            this.name_active_data = name_active_data;
            this.listHcyAdd = listHcyAdd;
        this.childInfo2.forEach((value, index, arr) => {
         //   console.log(value);
            if (value['id'] == this.name_active_data['qsrId']) {

                if (value[url] == undefined) {
                    value[url] = new Array();

                }
             //   console.log(this.name_active_data['id']);
              //  console.log(value['id']);
                value[url][this.name_active_data['id']] = (this.name_active_data);
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

           // console.log(value);
           // console.log(index);




                if(value['id'] != undefined && value['id'] != "" && value['id'].toString().length == 32){
                    console.log(this.list_ggmx_data_copy);
                    this.list_ggmx_data_copy.forEach((v,i,a)=>{
                        if(value['id'] == v['id'] ){

                            this.update_ggmx_data[v['id']] = this.ValueChangeService.changeDate(v, value);
                            this.update_ggmx_data[v['id']]['id'] = v.id;
                            //console.log(this.update_ggmx_data[index]);

                        }
                    })
                }else{

                    this.add_ggmx_data.forEach((vv,ii,arr2)=>{


                        if(vv['xh'] == value['xh']){
                            arr2[ii] = value;
                        }

                    });

//                console.log(this.add_ggmx_data);
                    // this.add_ggmx_data[index]=value;
                }





        });

        return {'update_data':this.update_ggmx_data,'add_data':this.add_ggmx_data};
    }




    //分类信息 递归计算面积

    get_data(now_data,type){

       // console.log(now_data);
        now_data.data[type] = null;
        now_data.children.forEach((value,index,arr)=>{
           // console.log(isNaN(value['data']['jzmj']));
            if(value['data'] != undefined && (value['data'][type] == null|| value['data'][type].toString().trim() == "" || isNaN(value['data'][type]))){


            }else{

                now_data.data[type] += parseFloat(value['data'][type]);
            }

        });
        if(now_data.parent != undefined){
            this.get_data(now_data.parent,type);
        }
        console.log(now_data);
        return now_data;
    }



    //获取当前分类信息位置,并将规格明细信息放在下面
    get_fxll_id(name_active_base,zbflId,ggmx){

        // console.log(ggmx);
        // console.log(zbflId);
        // console.log(name_active_base);
        // console.log(name_active_base.children);

        name_active_base.forEach((v,i,a)=>{
            console.log(v);
            if(v['data']['zbflId']== zbflId){
                a[i]['data']['ggmxxxList'] = ggmx;
                console.log(v['data']['zbflId']);
                return name_active_base;
            }else{
                //console.log(v);

                if(v.children){

                    return  this.get_fxll_id(v.children,zbflId,ggmx);
                }else{
                    return false;
                }

            }

        });


        console.log(name_active_base);
        return name_active_base;

    }


    //分类明细计算器模式
    calc(now_data,type) {

       // console.log(now_data,type);
        if(now_data.data[type] != null && now_data.data[type].toString().indexOf('=') == 0){
            now_data.data[type] = now_data.data[type].toString().substr(1);

            now_data.data[type] = eval(eval("now_data.data[type]"));

           // console.log(now_data.data);
        }



    }


    //分类明细 递归计算总面积

    CalcSize(list,type,size) {




        for (var i = 0; i < list.length; i++) {
//                console.log(list[i]);
            if (list[i].data[type] != null && list[i].data[type] != "" &&  !isNaN(list[i].data[type] ) && list[i].children == undefined) {
               // console.log(list[i].data[type]);
                this.sizes += parseFloat(list[i].data[type]);
            }else{

                if (list[i].children) {
                    this.CalcSize(list[i].children,type,this.sizes);
                }
            }
        }

        //console.log(list);
        return this.sizes;
    }


    CalcSize2(list,type,size){
        this.sizes = 0;
        console.log(this.sizes);
        let zmj = 0;


            this.CalcSize(list,type,this.sizes);



        return this.sizes;




    }






    //分类信息搜索

    SearhTreeTable(arr, keyword, zd) {

        for (let item of arr) {
            console.log(item);
            if (item.children) {
                if (item.data[zd].match(keyword)) {
                    console.log(`${zd}1有匹配${keyword}`);
                    item.data.searchRsut = true;
                } else {
                    console.log(`${zd}2有匹配值${keyword}`);
                    console.log("1有children没有匹配的");
                }
                this.SearhTreeTable(item.children, keyword, zd)
            } else {

                if (item.data[zd].match(keyword)) {
                    console.log(`${zd}3有匹配${keyword}`);
                    item.data.searchRsut = true;
                } else {
                    console.log(`${zd}4有匹配值${keyword}`);
                    console.log("2有children没有匹配的");
                }
            }
        }

        console.log(arr);
        return arr;
    }


//=================================================

    //分类信息 去除非空项
    showCheck(list,type) {

console.log(list);
        for (var i = 0; i < list.length; i++) {
            console.log(list[i]);


            if ((list[i].data[type] == null || list[i].data[type] == "" )&& list[i].children == undefined) {

                list.splice(i--, 1);
                list = list;
            } else if((list[i].data[type] == null  || list[i].data[type] == "") && list[i].children != undefined){

                console.log(list[i]);

                let f = 0;
                list[i].children.forEach((value,index,arr)=>{

                        if(arr[index]['data'][type] != null && arr[index]['data'][type] != ""){
                                console.log(arr[index]['data'][type]);
                                f = 1;
                        }else{

                        }

                });

                if(f == 0){
                    console.log(list[i]);
                    list.splice(i--,1);
                    //delete list[i];
                    list[i] = list[i];
                }




            }else{

                if (list[i].children) {
                   this.showCheck(list[i].children,type);
                }
            }
        }

        console.log(list);
        return list;
    }


    //分类信息 非空项与初始数据做对比并将非空项赋值给初始数据
    showCheck2(list,type) {

           for(let i in list){
               if(list[i] != undefined && list[i].children== undefined ){

                   this.flxx_arr.push(list[i]['data']);
               }else{
                   if(list[i] != undefined){

                       this.showCheck2(list[i].children,type);
                   }
               }
           }

        return this.flxx_arr;
    }

    showCheck3(list,type){
        this.flxx_arr = new Array();

        list.forEach((value,index,arr)=>{

            this.showCheck2(value,type);

        });
        return this.flxx_arr;
    }

    showCheck4(init_list,list,type){
        this.init_flxx_arr = init_list;
        list.forEach((value,index,arr)=>{

            let res = this.showCheck5(this.init_flxx_arr,value,type);
                this.init_flxx_arr = res;

        });

        console.log(this.init_flxx_arr);
        return this.init_flxx_arr;

    }

    showCheck5(init_list,value,type){
                for(let i in init_list){
                  //  console.log(init_list[i]);
                    if(init_list[i] && (init_list[i].children == undefined || init_list[i].children == null )&& init_list[i]['data'][type] == value[type] && init_list[i]['data']['zbflId'] == value['zbflId']){
                    //    console.log(init_list[i]);
                     //   console.log(value);
                            init_list[i]['data'] = value;

                    }else{
                       if(init_list[i] && init_list[i].children){
                           this.showCheck5(init_list[i].children,value,type);
                       }
                    }
                }

                return init_list;
    }


//=================================================





    //删除naem_active_base中data的指定属性

    delSearchRsut(arr, zd) {
        for (let item of arr) {
            console.log(item);
            if (item.children) {

                if (item.data[zd]) {
                    delete item.data[zd];
                }
                this.delSearchRsut(item.children, zd);
            } else {
                if (item.data[zd]) {
                    delete item.data[zd];
                }
            }
        }
        return arr;
    }


    delete_name_active_attr(name_active_base,type,id){
        console.log(name_active_base);
        name_active_base.forEach((value,index,arr)=>{

          if(value.children && value.data.id == id){
              if(arr[index]['id']){
                  delete arr[index]['id'];
              }
              this.delete_name_active_attr(value.children,type,id);
          }else{

              if(arr[index]['id']){
                  delete arr[index]['id'];
              }

          }



        });

        return name_active_base;
    }


    //查找指定字段是否改变
    IsWith2(name_active_base,dm,ssfwjbxxId,value,zd,zd_dm,zd_id){

        // console.log(name_active_base);
        // console.log(value);

           // console.log(name_active_base);
        for (let item of name_active_base) {
           // console.log(item);
            if (!item.children) {
                   // console.log(item);
                   // console.log(dm);
                   // console.log(item.data[zd_dm]);
                   // console.log(ssfwjbxxId);
                   // console.log(item.data[zd_dm] == dm);
               // console.log(item.data['zbflId'] == ssfwjbxxId);
                if( item.data[zd_dm] == dm && item.data[zd_id] == ssfwjbxxId){
                        console.log(item['data'][zd]);
                    if(item['data'][zd] == value){
                     //   console.log(`1${value}`);
                        this.base_flg = true;
                        return this.base_flg;
                    }else{
                    //    console.log(`2${value}`);
                        this.base_flg = false;
                        return this.base_flg;
                    }

                }else{
                  //  console.log(`3${value}`);

                }

            } else {

                     this.IsWith2(item.children, dm,ssfwjbxxId,value,zd,zd_dm,zd_id);


            }
        }
        return this.base_flg;
    }


    IsWith(name_active_base,dm,ssfwjbxxId,value,zd,zd_dm,zd_id){

       // console.log(dm);
        this.base_flg = true;
        return this.IsWith2(name_active_base,dm,ssfwjbxxId,value,zd,zd_dm,zd_id);



    }


    isWithBz(name_active_base,now_data,value,zd){


        for (let item of name_active_base) {
            //console.log(item);


                if( item.data['id'] == now_data['data']['id']){

                    if(item['data'][zd] == value){
                       // console.log(`1${value}`);
                        this.base_flg2 = true;
                        return this.base_flg2;
                    }else{
                      //  console.log(`2${value}`);
                        this.base_flg2 = false;
                        return this.base_flg2;
                    }

                }else{

                    if(item.children){

                        this.isWithBz(item.children,now_data,value,zd);
                    }
                }

        }

        return this.base_flg2;

    }



    isWithBz2(name_active_base,now_data,value,zd){
       // console.log(now_data);
        this.base_flg2 = true;
        return this.isWithBz(name_active_base,now_data,value,zd);



    }










    //已有房屋切换权属人时将分类信息递归取出放到分类信息新增中

    ToggleFlxxAdd(arr,e,ssfwjbxxId){
        for (let item of arr) {
            console.log(item);
            if (item.children) {

                this.ToggleFlxxAdd(item.children,e,ssfwjbxxId);
            } else {

                if((item['data']['jzmj'] != null && item['data']['jzmj'] != "" )){

                    this.toggle_flxx_add[ssfwjbxxId+item.data['zbflId']] = new Array();
                    this.toggle_flxx_add[ssfwjbxxId+item.data['zbflId']] = {'jzmj':item['data']['jzmj'],'bz':item['data']['bz'],'fwjgdm':item['data']['fwjgdm'],'zbflId':item['data']['zbflId'],'qsrId':e,'ssfwjbxxId':ssfwjbxxId};

                }

            }
        }
        return this.toggle_flxx_add;


    }

    ToggleFlxxAdd2(arr,e,ssfwjbxxId){
        this.toggle_flxx_add = new Array();

        arr.forEach((value,index,arr)=>{
            this.ToggleFlxxAdd(arr[index],e,ssfwjbxxId);

        });

        return this.toggle_flxx_add;

    }













}
