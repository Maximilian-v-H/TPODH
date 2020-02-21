import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxTimelineModule } from 'ngx-timeline';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule, FlexModule } from "@angular/flex-layout";
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { TepeComponent } from './tepe/tepe.component';

import { OktaAuthModule } from '@okta/okta-angular';

import { MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule, 
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule} from '@angular/material';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';

import {Globals} from "./globals";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { WeatherComponent } from './weather/weather.component';
import { EventsComponent } from './events/events.component';
import {EItemComponent} from 'src/app/e-item/e-item.component';
import { PlacesComponent } from './places/places.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TepeComponent,
    UserComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    WeatherComponent,
    EventsComponent,
    EItemComponent,
    PlacesComponent
  ],
  imports: [
    LeafletModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxTimelineModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FlexModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ModalModule.forRoot(),
    NgbCarouselModule,
    OktaAuthModule.initAuth({
      issuer: 'https://dev-272694.okta.com/oauth2/default',
      redirectUri: 'http://localhost:4200/implicit/callback',
      clientId: '0oa23vqdo9qSNogTJ357'
    })
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
