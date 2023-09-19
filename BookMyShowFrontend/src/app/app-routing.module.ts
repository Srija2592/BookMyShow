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
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'sign-up',component:SignupComponent},
{path:'login',component:LoginComponent},
  {path:'',component:HomeComponent},
    {path:'location',component:LocationComponent},
{path:'movie/:location',component:MovieComponent},
{path:'theatre/:location/:movie',component:TheatreComponent},
{path:'seat/:location/:movie/:theatre',component:SeatComponent},
{path:'profile/:id',component:ProfileComponent},
{path:'booking/:id',component:BookingComponent},


{
  path: 'admin',
  loadChildren: () =>
    import('./admin/admin.module').then((m) => m.AdminModule),
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
