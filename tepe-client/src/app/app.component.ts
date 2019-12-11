import {Component, TemplateRef} from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import {Globals} from "./globals";
import {FormBuilder} from "@angular/forms";
import {BsModalService} from "ngx-bootstrap/modal";
import {ServerService} from "./server.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tepe-client';
  currentUser: any = {uid: null, uusername: '', upassword: ''};
  users: any[] = [];

  global: Globals;
  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private server: ServerService,
              globals: Globals) { this.global = globals;}

  ngOnInit() {
    //this.oktaAuth.isAuthenticated().then((auth) => {this.isAuthenticated = auth});
    this.server.getUsers().then((response: any) => {
      this.users = response.map((ev) => {
        ev.body = ev.upassword;
        ev.header = ev.uusername;
        ev.uid = ev.uid;
        return ev;
      });
    });
  }
  private getUser(uid) {
    for (let i = 0; i < this.users.length; i++){
      if (this.users[i].uid === uid){
        this.currentUser = this.users[i];
        break;
      }
    }
    return this.currentUser.uusername == null ? "" : this.currentUser.uusername;
  }
}
