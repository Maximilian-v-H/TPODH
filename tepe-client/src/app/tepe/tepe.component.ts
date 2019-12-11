import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ServerService } from '../server.service';
import {Globals} from "../globals";

@Component({
  selector: 'app-tepe',
  templateUrl: './tepe.component.html',
  styleUrls: ['./tepe.component.css']
})
export class TepeComponent implements OnInit {
  form: FormGroup;
  modalRef: BsModalRef;

  events: any[] = [];
  currentEvent: any = {id: null, uid: '', name: '', description: '', date: new Date()};
  currentUser: any = {uid: null, uusername: '', upassword: ''};
  users: any[] = [];

  modalCallback: () => void;
  global: Globals;
  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private server: ServerService,
              globals: Globals) { this.global = globals;}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.currentEvent.name],
      description: this.currentEvent.description,
      date: [this.currentEvent.date],
    });
    this.getEvents();
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
    return this.currentUser.uusername;
  }

  private updateForm() {
    this.form.setValue({
      name: this.currentEvent.name,
      description: this.currentEvent.description,
      date: new Date(this.currentEvent.date)
    });
  }

  private getEvents() {
    this.server.getEvents().then((response: any) => {
      console.log('Response', response);
      this.events = response.map((ev) => {
        ev.body = ev.description;
        ev.header = ev.name;
        ev.icon = 'fa-clock-o';
        return ev;
      });
    });
  }

  addEvent(template) {
    this.currentEvent = {id: null, uid: '', name: '', description: '', date: new Date()};
    this.updateForm();
    this.modalCallback = this.createEvent.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  createEvent() {
    const newEvent = {
      uid: this.global.userid,
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      date: this.form.get('date').value
    };
    this.modalRef.hide();
    this.server.createEvent(newEvent).then(() => {
      this.getEvents();
    });
  }

  editEvent(index, template) {
    this.currentEvent = this.events[index];
    this.updateForm();
    this.modalCallback = this.updateEvent.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  updateEvent() {
    const eventData = {
      id: this.currentEvent.id,
      uid: this.global.userid,
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      date: this.form.get('date').value,
    };
    this.modalRef.hide();
    this.server.updateEvent(eventData).then(() => {
      this.getEvents();
    });
  }

  deleteEvent(index) {
    this.server.deleteEvent(this.events[index]).then(() => {
      this.getEvents();
    });
  }

  onCancel() {
    this.modalRef.hide();
  }

  onSubmit() {
  }

}
