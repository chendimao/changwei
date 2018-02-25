import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-eng-mang',
    templateUrl: './eng-mang.component.html',
    styleUrls: ['./eng-mang.component.css']
})
export class EngMangHomeComponent implements OnInit {
    public Reservoir: any;
    public show: any;
    public ReservoirLList;
    public ReservoirMList;
    public FhydList;
    public CareList;
    private showIndex: string = 'all';


    constructor(private router: Router) {
    }

    ngOnInit() {
        this.ReservoirLList = ReservoirLagList;
        this.ReservoirMList = ReservoirMList;
        this.FhydList = FhydList;
        this.CareList = CareList;
        this.Reservoir = {'count': 98, 'langer': 26, 'small': 15, 'prevent': 43, 'care': 5};
   }

    tab(id): void {
        this.showIndex = id;

    }

    jump(id, name): void {
        // this.router.navigate(['/engmang/'], {queryParams: {id: id}});
        this.router.navigate(['/engmang/'], {queryParams: {id: id, name: name}});
    }


}



const ReservoirLagList: any = [
    {
        id: 'S000001', name: '泉州安溪白濑水库', kurong: '57517', sksw: '643.5', zjrl: '5.4', xs: '混凝土面板堆石坝'
    },
    {
        id: 2, name: '莲花水库', kurong: '1135', sksw: '643.5', zjrl: '7.4', xs: '混凝土面板堆石坝'
    },
    {
        id: 3, name: '澎村水库', kurong: '1135', sksw: '643.5', zjrl: '7.4', xs: '混凝土面板堆石坝'
    },
    {
        id: 4, name: '双溪水库', kurong: '1135', sksw: '643.5', zjrl: '7.4', xs: '混凝土面板堆石坝'
    },
    {
        id: 5, name: '兴头水库', kurong: '1135', sksw: '643.5', zjrl: '7.4', xs: '混凝土面板堆石坝'
    },
    {
        id: 6, name: '王家州水库', kurong: '1135', sksw: '643.5', zjrl: '7.4', xs: '混凝土面板堆石坝'
    },
    {
        id: 7, name: '宁德官昌水库', kurong: '1135', sksw: '643.5', zjrl: '7.4', xs: '混凝土面板堆石坝'
    },
];
const ReservoirMList: any = [
    {
        id: 1, name: '泉州桃源水库扩蓄', kurong: '1135', sksw: '643.5', zjrl: '7.4', xs: '混凝土面板堆石坝'
    },
    {
        id: 2, name: '洛江区八峰水库', kurong: '1135', sksw: '643.5', zjrl: '7.4', xs: '混凝土面板堆石坝'
    },
    {
        id: 3, name: '建宁九华山水库', kurong: '1135', sksw: '643.5', zjrl: '7.4', xs: '混凝土面板堆石坝'
    },
    {
        id: 4, name: '尤溪县桂坑水库', kurong: '1135', sksw: '643.5', zjrl: '7.4', xs: '混凝土面板堆石坝'
    },
    {
        id: 5, name: '沙县松乾谁水库', kurong: '1135', sksw: '643.5', zjrl: '7.4', xs: '混凝土面板堆石坝'
    },
    {
        id: 6, name: '将乐县桃源水库', kurong: '1135', sksw: '643.5', zjrl: '7.4', xs: '混凝土面板堆石坝'
    },
    {
        id: 7, name: '洛阳区市田水库', kurong: '1135', sksw: '643.5', zjrl: '7.4', xs: '混凝土面板堆石坝'
    },
];
const FhydList: any = [
    {
        id: 1, name: '闽江上游富屯溪（邵武段）', kurong: '省发改委', sksw: '20年一遇', zjrl: '四级', xs: '2.45'
    },
    {
        id: 2, name: '武夷山市建溪三期防洪', kurong: '省发改委', sksw: '20年一遇', zjrl: '四级', xs: '0.45'
    },
    {
        id: 3, name: '闽江上游金溪流域上游防洪', kurong: '省发改委', sksw: '20年一遇', zjrl: '四级', xs: '2.45'
    },
    {
        id: 4, name: '闽江防洪一期', kurong: '省发改委', sksw: '20年一遇', zjrl: '四级', xs: '2.45'
    },
    {
        id: 5, name: '泉州市惠女水库引水工程', kurong: '省发改委', sksw: '20年一遇', zjrl: '二级', xs: '2.45'
    },
];
const CareList: any = [
    {
        id: 1, name: '闽江上游富屯溪（邵武段）', kurong: '省发改委', sksw: '20年一遇', zjrl: '四级', xs: '2.45'
    },
    {
        id: 1, name: '葫芦门水库', kurong: '1135', sksw: '643.5', zjrl: '7.4', xs: '混凝土面板堆石坝'
    },
    {
        id: 1, name: '泉州桃源水库扩蓄', kurong: '1135', sksw: '643.5', zjrl: '7.4', xs: '混凝土面板堆石坝'
    },

];

