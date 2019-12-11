import { Component, OnInit } from '@angular/core';
import {Globals} from "../globals";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  global: Globals;
  constructor(globals: Globals) {
    this.global = globals;
  }

  ngOnInit() {
    this.global.userid = null;
    window.location.href = 'localhost:4200';
  }

}
