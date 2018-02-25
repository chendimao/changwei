import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template: '<app-header></app-header><router-outlet></router-outlet><loading-bar></loading-bar><popup></popup>',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

}
