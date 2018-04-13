import {Injectable} from '@angular/core';

@Injectable()

export class ValuChangeService {
    public obj = {};




    changeDate(begin, change) {

       // console.log(begin);
       // console.log(change);

            if(change['qcrq'] != undefined && change['qrrq'] != undefined){

                change['qcrq'] = new Date(change['qcrq']);
                change['qcrq'] = change['qcrq'].getTime();

                change['qrrq'] = new Date(change['qrrq']);
                change['qrrq'] = change['qrrq'].getTime();
            }



       // console.log(change['qcrq']);
       // console.log(begin['qcrq']);


       // console.log(change['qrrq']);
       // console.log(begin['qrrq']);

            this.obj = {};

            for(var i in begin){

                if(i != 'list'){

                    if(begin[i] !== change[i]){



                        if(begin[i] !== undefined && change[i] !== undefined){
                            console.log(typeof change[i],change[i]);

                                this.obj[i] = change[i];

                        }
                    }


                }else{

                       // let begin_list = JSON.stringify(begin[i]);
                       // let chang_list = JSON.stringify(change[i]);
                       // if(begin_list != chang_list){

                         //   this.obj[i] = change[i];


                       // }
                }



            }


        return this.obj;
    }



}