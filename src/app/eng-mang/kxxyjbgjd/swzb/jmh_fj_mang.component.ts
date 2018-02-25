import {Component, Renderer, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {JmhfjmangsecComponent} from "./jmh_fj_mangsec.component";

@Component({
    selector: 'app-jmhfjmang',
    templateUrl: './jmh_fj_mang.component.html',
    styleUrls: ['./jmh.component.css']
})
export class JmhMangComponent implements OnInit {
    private data: String = "";
    private testStyle: any;
    private contStyle: any;
    display: boolean = true;


    @ViewChild('model', {read: ViewContainerRef}) modelBox: ViewContainerRef;
    @ViewChild('dialog') dialog;

    // @ViewChildren('dialog') defaultPerson: QueryList<ElementRef>;
    constructor(private comAlert: ComponentFactoryResolver, private Renderer: Renderer) {
    }

    ngOnInit() {
    }

    close() {
        this.display = false;
    }

    getSelect(value) {
        console.log(value);
    }


    bigest(e) {
        console.log(this.dialog);
        this.dialog.style = 'width:400px';
        // this.Renderer.setElementStyle(
        //     this.dialog.style
        // );
        // console.log(e);
        //e.target.setAttribute('style', 'width:50px');
        // this.contStyle = "{'width':'100%','height':'100%','margin':'0',left:'0px','overflow':'auto'}";
        // this.testStyle = "{'width':'100%','height':'100%','padding':'0','margin':'0','padding-bottom':'100px'}";
    }

    openModal() {
        console.log(111);
        const com = this.comAlert.resolveComponentFactory(JmhfjmangsecComponent);
        console.log(com);
        console.log(this.modelBox);
        this.modelBox.createComponent(com);
    }
}
