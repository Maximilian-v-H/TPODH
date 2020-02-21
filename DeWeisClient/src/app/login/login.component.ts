import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServerService} from "../server.service";
import {Globals} from "../globals";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  modalRef: BsModalRef;
  form: FormGroup;
  modalCallback: () => void;
  global: Globals;

  newUser: any = {uid: null, uusername: '', upassword: ''};
  users: any[] = [];
  private test: Promise<unknown>;

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private server: ServerService,
              globals: Globals) {
    this.global = globals;
  }

  ngOnInit() {
    this.form = this.fb.group({
      uusername: [this.newUser.uusername, Validators.required],
      upassword: this.newUser.upassword
    });
  }

  onCancel() {

  }

  onSubmit() {

  }

  private updateForm() {
    this.form.setValue({
      uusername: this.newUser.uusername,
      upassword: this.newUser.upassword
    });
  }

  login(template?) {
    const newUser = {
      uusername: this.form.get('uusername').value,
      upassword: this.form.get('upassword').value
    };
    console.log(newUser);
    this.test = this.server.getUser(newUser);
    console.log(this.test);

    /*
    this.newUser = {uid: null, uusername: '', upassword: ''};
    this.updateForm();
    this.modalCallback = this.createUser.bind(this);
    this.modalRef = this.modalService.show(template);*/
  }

  createUser() {
    const newUser = {
      uusername: this.form.get('uusername').value,
      upassword: this.form.get('upassword').value
    };
    console.log(newUser);
    this.server.getUsers();
    this.modalRef.hide();
    if (this.users.includes(newUser)) {
      this.global.userid = this.users[this.users.findIndex(newUser.uusername)].uid;
    }
  }

  private getUsers() {
    this.server.getUsers().then((response: any) => {
      console.log('Response', response);
      this.users = response.map((ev) => {
        ev.body = ev.upassword;
        ev.header = ev.uusername;
        ev.icon = 'fa-clock-o';
        return ev;
      });
    });
  }
}
