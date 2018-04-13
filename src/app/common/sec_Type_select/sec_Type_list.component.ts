import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {HttpService} from "../../service/http-service";
import {DataProcessingService} from "../../service/dataProcessing.service";


@Component({
    selector: 'app-sec-type-list',
    templateUrl: './sec_Type_list.component.html',
    styleUrls: ['./sec_Type_list.component.css'],
    providers: [HttpService]
})
export class Sec_Type_listComponent implements OnInit {
    @Input() treeList;
    @Input() tableList;
    @Input() isShow;
    @Output() SelectModel = new EventEmitter;
    public reswidth;

    public selected;
    private show:boolean=true;
    public isdisabled: boolean = false;
    private obj=new Object();
    private msgs:any;

    constructor(private dataProces: DataProcessingService) {

    }

    ngOnInit() {
        console.log(this.treeList);


    }
    ngOnChanges() {
        console.log(this.treeList);
        if(this.treeList){
            this.dataProces.addExpand(this.treeList);
        }
    }

    tab(){
        this.show=this.show?false:true;
    }

    saveAll(){

    }
    getAreaCode(i){
        this.obj['dm']=i.dm;
        this.obj['qc']=i.qc;
        this.obj['mc']=i.label;
    }
    onRowSelect(i){
        console.log(i.data)
        this.obj['dm']=i.data.dm;
        this.obj['qc']=i.data.qc;
        this.obj['mc']=i.data.mc;
    }

    OutPutValue(){
        console.log(this.obj)
        if(JSON.stringify(this.obj)!='{}'){
            this.SelectModel.emit(this.obj);
        }else{
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '填入提醒', detail: '请选择下拉项'});

        }



    }
    close(){
        this.isShow=false;
        // 关闭遮罩层
        this.SelectModel.emit(false);
    }


}
