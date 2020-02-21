import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Event} from 'src/app/event';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

    response: Event = new Event();

    nameinput: string;
    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.http.get<Event>("https://tourism.opendatahub.bz.it/api/Event?pagesize=50&pagenumber=1&begindate=2019-11-11&sort=asc"
                            ).subscribe(data => {
                                console.log(data);
                                this.response = Event.convert(data);
                            });
    }
makeName(newValue) {
    this.response.setName(newValue);
}
}
