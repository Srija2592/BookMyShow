import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './tokeninterceptor';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { LocationComponent } from './location/location.component';
import { MovieComponent } from './movie/movie.component';
import { TheatreComponent } from './theatre/theatre.component';
import { SeatComponent } from './seat/seat.component';
import { UpdateComponent } from './update/update.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './booking/booking.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { LoginReducer, LoginStatusReducer } from './auth/login.reducer';
import { UserReducer } from './profile/user.reducer';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    LocationComponent,
    MovieComponent,
    TheatreComponent,
    SeatComponent,
    UpdateComponent,
    ProfileComponent,
    BookingComponent,
    UnauthorizedPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    MatMenuModule,
    MatDialogModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot({loginState:LoginReducer,userState:UserReducer,loginStatusState:LoginStatusReducer})
  ],
  providers: [{provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
