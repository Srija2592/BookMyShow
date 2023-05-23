import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  bookings:any;

  username:any='';

  open:boolean=false;

  user:any;

  constructor(private bookingService:BookingService,private authService:AuthService,private userService:UserService){
    this.username=this.authService.getUserName();
    userService.getuser(this.username).subscribe(data=>{
      this.user=data,console.log(this.user)
    })

  }
  ngOnInit(): void {

  }

  allbookings(username:string){
    this.bookingService.allbookings(this.authService.getUserName()).subscribe(data=>{this.bookings=data,console.log(this.bookings),this.open=true});
  }

}
