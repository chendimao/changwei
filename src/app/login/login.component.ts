import { Component, OnInit } from '@angular/core';
import {Route, Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
    login():void{
        this.router.navigate((['/engmangHome/']));
    }
}
