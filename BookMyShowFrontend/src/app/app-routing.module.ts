import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './location/location.component';
import { MovieComponent } from './movie/movie.component';
import { TheatreComponent } from './theatre/theatre.component';
import { SeatComponent } from './seat/seat.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './booking/booking.component';
import { AuthGuard } from './shared/auth.guard';
import { UnauthorizedPageComponent } from './shared/unauthorized-page/unauthorized-page.component';

const routes: Routes = [
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'unauthorized', component: UnauthorizedPageComponent },
  {
    path: 'location',
    component: LocationComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_USER'
    },
  },
  {
    path: 'movie/:location',
    component: MovieComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_USER',
    },
  },
  {
    path: 'theatre/:location/:movie',
    component: TheatreComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_USER',
    },
  },
  {
    path: 'seat/:location/:movie/:theatre',
    component: SeatComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_USER',
    },
  },
  { path: 'profile/:id', component: ProfileComponent },
  {
    path: 'booking/:id',
    component: BookingComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_USER',
    },
  },

  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
    },
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
