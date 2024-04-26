import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { Store, select } from '@ngrx/store';
import { UserState } from './user.reducer';
import { userDetails } from './user.action';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Booking } from '../seat/BookingDto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  bookings: any;

  username: any = '';

  open: boolean = false;

  user: User = {
    id: 0,
    username: '',
    email: '',
    fullname: '',
    bookingId: 0,
    roles: [],
    mobile: 0
  };
  noofbookings: number = 0;
  user1Details=new BehaviorSubject<User>(this.user);
  role:String[]=[];

  isLoggedIn!: boolean;
  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private userService: UserService,
    private store:Store<{userState:UserState}>,
    private router:Router
  ) {

  }
  ngOnInit(): void {

    this.username = this.authService.getUserName();
    if (this.username) {
      this.userService.getuser(this.username).subscribe((data) => {
        this.store.dispatch(userDetails({userResponse:data}))

      });
      this.authService.loggedInn.subscribe((data: boolean) => {
        this.isLoggedIn = data;
      });
    }
    this.store.pipe(select('userState')).subscribe((d)=>{
      this.user1Details.next(d.userResponse);
    })
    this.user1Details.subscribe((d)=>{
      this.user=d
    })
    this.role=this.authService.getUserRole();
  }

  allbookings(username: string) {
    this.bookingService
      .allbookings(this.authService.getUserName())
      .subscribe((data) => {
        (this.bookings = data),
          (this.open = true),
          (this.noofbookings = this.bookings.length);
          this.router.navigateByUrl('/booking/'+username);
      });
  }
  openBooking(booking:Booking){
    this.router.navigateByUrl('/booking/'+booking.bookingId);

  }
}
