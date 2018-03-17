import {Injectable} from '@angular/core';
import {HttpService} from "./http-service";
import {DataProcessingService} from "./dataProcessing.service";

@Injectable()
export class SelectListHttpService {

    public url: any;


    constructor(public HttpService: HttpService, public DataProcessing: DataProcessingService) {


    }



    public getSelectList(tableName, column, ssgcdm, szxzqhdm) {

        this.url = `zdk/getZdkByTableAndColumn?tableName=${tableName}&column=${column}&gcdm=${ssgcdm}&xzqhdm=${szxzqhdm}`;

        return new Promise((resolve, reject) => {


            this.HttpService.get(this.url).then((data) => {
                let res = this.DataProcessing.replaceChildlValue(data['returnObject'], 'mc', 'label', 'dm', 'value')

               // console.log(res);
                resolve(res);

            }, err => {
                reject(err);
            });


        });


    }

    //获取民族下拉列表
    // public getMz(ssgcdm, szxzqhdm) {
    //
    //     this.url = `zdk/getZdkByTableAndColumn?tableName=B_HCY&column=MZDM&gcdm=${ssgcdm}&xzqhdm=${szxzqhdm}`;
    //
    //     return new Promise((resolve, reject) => {
    //
    //
    //         this.HttpService.get(this.url).then((data) => {
    //             let res = this.DataProcessing.replaceChildlValue(data['returnObject'], 'mc', 'label', 'dm', 'value')
    //
    //             console.log(res);
    //             resolve(res);
    //
    //         }, err => {
    //             reject(err);
    //         });
    //
    //
    //     });
    //
    //
    // }
    //
    // //文化程度 下拉列表
    // public getWhcd(ssgcdm, szxzqhdm) {
    //
    //     this.url = `zdk/getZdkByTableAndColumn?tableName=B_HCY&column=WHCDDM&gcdm=${ssgcdm}&xzqhdm=${szxzqhdm}`;
    //
    //     return new Promise((resolve, reject) => {
    //
    //
    //         this.HttpService.get(this.url).then((data) => {
    //             let res = this.DataProcessing.replaceChildlValue(data['returnObject'], 'mc', 'label', 'dm', 'value')
    //
    //             console.log(res);
    //             resolve(res);
    //
    //         }, err => {
    //             reject(err);
    //         });
    //
    //
    //     });
    //
    //
    // }
    //
    //
    // //从业状况 下拉列表
    // public getCyzk(ssgcdm, szxzqhdm) {
    //
    //     this.url = `zdk/getZdkByTableAndColumn?tableName=B_HCY&column=CYZKDM&gcdm=${ssgcdm}&xzqhdm=${szxzqhdm}`;
    //
    //     return new Promise((resolve, reject) => {
    //
    //
    //         this.HttpService.get(this.url).then((data) => {
    //             let res = this.DataProcessing.replaceChildlValue(data['returnObject'], 'mc', 'label', 'dm', 'value')
    //
    //             console.log(res);
    //             resolve(res);
    //
    //         }, err => {
    //             reject(err);
    //         });
    //
    //
    //     });
    //
    //
    // }
    //
    //
    // //性别 下拉列表
    // public getXb(ssgcdm, szxzqhdm) {
    //
    //     this.url = `zdk/getZdkByTableAndColumn?tableName=B_HCY&column=XBDM&gcdm=${ssgcdm}&xzqhdm=${szxzqhdm}`;
    //
    //     return new Promise((resolve, reject) => {
    //
    //
    //         this.HttpService.get(this.url).then((data) => {
    //             let res = this.DataProcessing.replaceChildlValue(data['returnObject'], 'mc', 'label', 'dm', 'value')
    //
    //             console.log(res);
    //             resolve(res);
    //
    //         }, err => {
    //             reject(err);
    //         });
    //
    //
    //     });
    //
    //
    // }
    //
    //
    // //专业大类 下拉列表
    // public getZydl(ssgcdm, szxzqhdm) {
    //
    //     this.url = `zdk/getZdkByTableAndColumn?tableName=B_HCY&column=ZYDLDM&gcdm=${ssgcdm}&xzqhdm=${szxzqhdm}`;
    //
    //     return new Promise((resolve, reject) => {
    //
    //
    //         this.HttpService.get(this.url).then((data) => {
    //             let res = this.DataProcessing.replaceChildlValue(data['returnObject'], 'mc', 'label', 'dm', 'value')
    //
    //             console.log(res);
    //             resolve(res);
    //
    //         }, err => {
    //             reject(err);
    //         });
    //
    //
    //     });
    //
    //
    // }
    //
    //
    // //户口情况 下拉列表
    // public getHkqk(ssgcdm, szxzqhdm) {
    //
    //     this.url = `zdk/getZdkByTableAndColumn?tableName=B_HCY&column=HKQKDM&gcdm=${ssgcdm}&xzqhdm=${szxzqhdm}`;
    //
    //     return new Promise((resolve, reject) => {
    //
    //
    //         this.HttpService.get(this.url).then((data) => {
    //             let res = this.DataProcessing.replaceChildlValue(data['returnObject'], 'mc', 'label', 'dm', 'value')
    //
    //             console.log(res);
    //             resolve(res);
    //
    //         }, err => {
    //             reject(err);
    //         });
    //
    //
    //     });
    //
    //
    // }
    //
    //
    // //婚姻状况 下拉列表
    // public getHyzk(ssgcdm, szxzqhdm) {
    //
    //     this.url = `zdk/getZdkByTableAndColumn?tableName=B_HCY&column=HYDM&gcdm=${ssgcdm}&xzqhdm=${szxzqhdm}`;
    //
    //     return new Promise((resolve, reject) => {
    //
    //
    //         this.HttpService.get(this.url).then((data) => {
    //             let res = this.DataProcessing.replaceChildlValue(data['returnObject'], 'mc', 'label', 'dm', 'value')
    //
    //             console.log(res);
    //             resolve(res);
    //
    //         }, err => {
    //             reject(err);
    //         });
    //
    //
    //     });
    //
    //
    // }
    //
    //
    // //户别代码 下拉列表
    // public getHbdm(ssgcdm, szxzqhdm) {
    //
    //     this.url = `zdk/getZdkByTableAndColumn?tableName=B_HCY&column=HBDM&gcdm=${ssgcdm}&xzqhdm=${szxzqhdm}`;
    //
    //     return new Promise((resolve, reject) => {
    //
    //
    //         this.HttpService.get(this.url).then((data) => {
    //             let res = this.DataProcessing.replaceChildlValue(data['returnObject'], 'mc', 'label', 'dm', 'value')
    //
    //             console.log(res);
    //             resolve(res);
    //
    //         }, err => {
    //             reject(err);
    //         });
    //
    //
    //     });
    //
    //
    // }
    //
    // //调查范围 下拉列表
    // public getDcfw(ssgcdm, szxzqhdm) {
    //
    //     this.url = `zdk/getZdkByTableAndColumn?tableName=B_HCY&column=DCFWDM&gcdm=${ssgcdm}&xzqhdm=${szxzqhdm}`;
    //
    //     return new Promise((resolve, reject) => {
    //
    //
    //         this.HttpService.get(this.url).then((data) => {
    //             let res = this.DataProcessing.replaceChildlValue(data['returnObject'], 'mc', 'label', 'dm', 'value')
    //
    //             console.log(res);
    //             resolve(res);
    //
    //         }, err => {
    //             reject(err);
    //         });
    //
    //
    //     });
    //
    //
    // }

}
