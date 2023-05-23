import { Component, OnInit } from '@angular/core';
import { SeatService } from '../seat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { count } from 'rxjs';
import { BookingService } from '../booking.service';
import { Booking } from './BookingDto';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit{

  seats:any;

  location:any='';

  movie:any='';

  theatre:any='';

  booking:any;

  bookedSeats:any=[];

  bookinginfo!:Booking;

  selectedSeats:any=[];
  count=0

  username:any='';
  constructor(private seatservice:SeatService,private activatedroute:ActivatedRoute,private router:Router,private bookingService:BookingService,private authService:AuthService){
    this.location=activatedroute.snapshot.params['location'];
    this.movie=activatedroute.snapshot.params['movie'];
    this.theatre=activatedroute.snapshot.params['theatre'];
    this.bookinginfo={
      locationName:this.location,
      movieName:this.movie,
      theatreName:this.theatre,
      username:authService.getUserName(),
      seats:[]
    }

  }

  ngOnInit(): void {
    this.getseats();
  }

  getseats(){
    this.seatservice.allseats(this.theatre,this.movie,this.location).subscribe(data=>{
      this.seats=data
      console.log(this.seats);
    })
  }

  selectseat(seat:any){
    if(seat.seatStatus=='EMPTY'){
      seat.seatStatus='SELECTED';
      if(seat.seatStatus=='SELECTED'){
         this.selectedSeats.push(seat.seatId);
         this.count=this.count+1;}
    }


    console.log(this.selectedSeats);
    console.log(count);
    this.bookinginfo.seats=this.selectedSeats;
    console.log(this.bookinginfo)
  }

  book(selectedSeats:any){
    let seat:any;
    for(let i of this.selectedSeats){
      this.seatservice.updateseat(i).subscribe(data=>{
        seat=data,
        this.bookedSeats.push(seat.seatId);
        this.bookinginfo.seats.push(seat.seatId)
      })
    }
    console.log(this.bookinginfo);
    this.bookingService.book(this.bookinginfo).subscribe(data=>{this.booking=data,console.log(this.booking)});
    console.log(this.bookedSeats);

  }

}
