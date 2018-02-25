import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
    selector: 'app-jmhfjmangsec',
    templateUrl: './jmh_fj_mangsec.component.html',
    styleUrls: ['./jmh.component.css']
})
export class JmhfjmangsecComponent implements OnInit {
    display: boolean = true;

    @ViewChild('imgMang') ImgMang: ElementRef;

    constructor() {
    }

    ngOnInit() {
    }

    close() {
        this.display = false;
    }

    imgOperat(i) {
        if (this.ImgMang.nativeElement.style.transform == '') {
            this.ImgMang.nativeElement.style.transform = 'rotate(0deg)';
        }
        if (this.ImgMang.nativeElement.style.width == "") {
            this.ImgMang.nativeElement.style.width = '110%';
        }
        let widthValue = parseFloat(this.ImgMang.nativeElement.style.width.replace(/[^\d]/ig, ""));
        let rotateValue = parseFloat(this.ImgMang.nativeElement.style.transform.replace(/[^\d.]/ig, ""));
        switch (i) {
            case 1:
                widthValue += 10;
                break;
            case 2:
                widthValue -= 10;
                break;
            case 3:
                widthValue = 100;
                break;
            case 4:
                break;
            case 5:
                rotateValue += 90;
                break;
        }
        this.ImgMang.nativeElement.style.width = widthValue + '%';
        this.ImgMang.nativeElement.style.transform = `rotate(${rotateValue}deg)`;
    }
}
