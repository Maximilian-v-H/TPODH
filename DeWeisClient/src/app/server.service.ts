import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient/*, public oktaAuth: OktaAuthService*/) {
  }

  private async request(method: string, url: string, data?: any) {
    //const token = await this.oktaAuth.getAccessToken();

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body'
      /*headers: {
        Authorization: `Bearer ${token}`
      }*/
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  getEvents() {
    return this.request('GET', `${environment.serverUrl}/post`);
  }

  createEvent(post) {
    console.log(post);
    return this.request('POST', `${environment.serverUrl}/post/${post.uid}`, post);
  }

  updateEvent(post) {
    return this.request('PUT', `${environment.serverUrl}/post/${post.uid}/${post.id}`, post);
  }

  deleteEvent(post) {
    return this.request('DELETE', `${environment.serverUrl}/post/${post.uid}/${post.id}`);
  }

  getUsers() {
    return this.request('GET', `${environment.serverUrl}/users`);
  }

  createUser(user) {
    return this.request('POST', `${environment.serverUrl}/user`, user);
  }

  updateUser(user) {
    return this.request('PUT', `${environment.serverUrl}/user/${user.uid}`, user);
  }

  deleteUser(user) {
    return this.request('DELETE', `${environment.serverUrl}/user/${user.uid}`);
  }

  getUser(user) {
    console.log(user);
    return this.request('GET', `${environment.serverUrl}/user`, user);
  }
}
