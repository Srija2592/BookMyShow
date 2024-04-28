import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './tokeninterceptor';
import { HomeComponent } from './home/home.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { LocationComponent } from './location/location.component';
import { MovieComponent } from './movie/movie.component';
import { TheatreComponent } from './theatre/theatre.component';
import { SeatComponent } from './seat/seat.component';
import { UpdateComponent } from './update/update.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './booking/booking.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { UserReducer } from './profile/user.reducer';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { HeaderComponent } from './header/header.component';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { LocationReducer } from './location/location.reducer';
import { MovieReducer } from './movie/movie.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './movie/movie.effects';
import { MovieService } from './movie.service';
import { TheatreReducer } from './theatre/theatre.reducer';
import { AgGridModule } from 'ag-grid-angular';
import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    LocationComponent,
    MovieComponent,
    TheatreComponent,
    SeatComponent,
    UpdateComponent,
    ProfileComponent,
    HeaderComponent,
    BookingModalComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    MatMenuModule,
    MatDialogModule,
    SharedModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot({
      locations: LocationReducer,
      userState: UserReducer,
      movies: MovieReducer,
      theatres: TheatreReducer,
    }),
    // EffectsModule.forRoot([MovieEffects]),
    AppRoutingModule,
    NgxTypeaheadModule,
    AgGridModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    MovieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
