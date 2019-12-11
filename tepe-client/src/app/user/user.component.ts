import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import {ServerService} from '../server.service';
import {Globals} from "../globals";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  form: FormGroup;
  modalRef: BsModalRef;

  users: any[] = [];
  currentUser: any = {uid: null, uusername: '', upassword: ''};
  modalCallback: () => void;

  global: Globals;

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private server: ServerService,
              globals: Globals) {
    this.global = globals;
  }

  ngOnInit() {
    this.form = this.fb.group({
      uusername: [this.currentUser.uusername, Validators.required],
      upassword: this.currentUser.upassword
    });
    this.getUsers();
  }

  private updateForm() {
    this.form.setValue({
      uusername: this.currentUser.uusername,
      upassword: this.currentUser.upassword
    });
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

  addUser(template) {
    this.currentUser = {uid: null, uusername: '', upassword: ''};
    this.updateForm();
    this.modalCallback = this.createUser.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  createUser() {
    const newUser = {
      uusername: this.form.get('uusername').value,
      upassword: this.form.get('upassword').value
    };
    console.log(newUser);
    this.modalRef.hide();
    this.server.createUser(newUser).then(() => {
      this.getUsers();
    });
  }

  editUser(index, template) {
    this.currentUser = this.users[index];
    console.log(index);
    this.updateForm();
    this.modalCallback = this.updateUser.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  updateUser() {
    const userData = {
      uid: this.currentUser.uid,
      uusername: this.form.get('uusername').value,
      upassword: this.form.get('upassword').value
    };
    this.modalRef.hide();
    console.log(userData);
    this.server.updateUser(userData).then(() => {
      this.getUsers();
    });
  }

  deleteUser(index) {
    this.server.deleteUser(this.users[index]).then(() => {
      this.getUsers();
    });
    if (this.users[index].uid == this.global.userid)
      this.global.userid = null;
  }

  onCancel() {
    this.modalRef.hide();
  }

  onSubmit() {
    //TODO
  }

  login(template, user) {
    this.currentUser = user;
    this.modalCallback = this.getUser.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  private getUser() {
    this.server.getUsers().then((response: any) => {
      this.users = response.map((ev) => {
        ev.body = ev.upassword;
        ev.header = ev.uusername;
        ev.icon = 'fa-clock-o';
        return ev;
      });
    });
    for (let i = 0; i < this.users.length; i++){
      if (this.users[i].uusername === this.form.get('uusername').value && this.users[i].upassword === this.form.get('upassword').value){
        this.global.userid = this.users[i].uid;
        this.modalRef.hide();
        break;
      }
    }
  }
}
