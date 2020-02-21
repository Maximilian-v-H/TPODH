import { HomeComponent } from './home/home.component';
import { TepeComponent } from './tepe/tepe.component';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {RegisterComponent} from "./register/register.component";
import {WeatherComponent} from './weather/weather.component';
import {EventsComponent} from 'src/app/events/events.component';
import {PlacesComponent} from 'src/app/places/places.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'posts',
    component: TepeComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'weather',
    component: WeatherComponent
  },
  {
    path: 'event/:lat/:lng',
    component: PlacesComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  { path: 'implicit/callback', component: OktaCallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
